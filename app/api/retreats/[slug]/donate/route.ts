import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { retreats } from "@/content/retreats";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const retreat = retreats.find((r) => String(r.slug).toLowerCase() === String(slug).toLowerCase());
    if (!retreat) {
      return NextResponse.json({ error: "Retreat not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => ({} as any));
    const amountRaw = body?.amount;

    // amount is optional; if missing or invalid, treat as 0 and still return url null
    const amountNum = typeof amountRaw === "number" ? amountRaw : Number(amountRaw);
    const amountCents = Number.isFinite(amountNum) && amountNum > 0 ? Math.round(amountNum * 100) : 0;

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    // If no donation, your client can just skip redirect/confirm and proceed
    if (amountCents <= 0) {
      return NextResponse.json({ url: null });
    }

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Donation — ${retreat.title}` },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/retreats/${retreat.slug}/apply?donation=success`,
      cancel_url: `${origin}/retreats/${retreat.slug}/apply?donation=cancel`,
      metadata: {
        retreatSlug: retreat.slug,
        type: "donation",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
}