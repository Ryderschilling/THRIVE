import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getRetreatBySlug } from "@/content/retreats";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(
  req: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
    }

    const { slug: rawSlug } = await ctx.params;
    const slug = decodeURIComponent(String(rawSlug)).trim().toLowerCase();

    const retreat = getRetreatBySlug(slug);
    if (!retreat) {
      return NextResponse.json({ error: "Retreat not found." }, { status: 404 });
    }

    const body = await req.json();
    const amountCents = Number(body?.amountCents || 0);
    const email = body?.email ? String(body.email).trim().toLowerCase() : undefined;

    if (!Number.isFinite(amountCents) || amountCents < 100) {
      return NextResponse.json({ error: "Amount must be at least $1.00." }, { status: 400 });
    }

    const intent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "usd",
      receipt_email: email,
      description: `THRIVE Donation — ${retreat.title}`,
      metadata: {
        retreatSlug: retreat.slug,
        type: "donation",
      },
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: intent.client_secret, id: intent.id });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Stripe error." }, { status: 500 });
  }
}