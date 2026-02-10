import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getRetreatBySlug } from "@/content/retreats";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: Request, ctx: { params: { slug: string } }) {
  try {
    const slug = decodeURIComponent(String(ctx.params.slug)).trim().toLowerCase();
    const retreat = getRetreatBySlug(slug);
    if (!retreat) return NextResponse.json({ error: "Retreat not found." }, { status: 404 });

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const body = await req.json();

    const amountCents = Number(body?.amountCents || 0);
    const email = body?.email ? String(body.email).trim().toLowerCase() : undefined;

    if (!Number.isFinite(amountCents) || amountCents < 100) {
      return NextResponse.json({ error: "Donation must be at least $1.00." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountCents,
            product_data: {
              name: "THRIVE Donation",
              description: `Optional donation — ${retreat.title}`,
            },
          },
        },
      ],
      success_url: `${siteUrl}/retreats/${encodeURIComponent(retreat.slug)}/apply?donation=success`,
      cancel_url: `${siteUrl}/retreats/${encodeURIComponent(retreat.slug)}/apply?donation=cancel`,
      metadata: { retreatSlug: retreat.slug },
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Stripe error." }, { status: 500 });
  }
}