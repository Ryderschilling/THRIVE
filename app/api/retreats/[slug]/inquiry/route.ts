import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getRetreatBySlug } from "@/content/retreats";
import { sendRetreatSignupEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(
  req: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: rawSlug } = await ctx.params;
    const slug = decodeURIComponent(String(rawSlug)).trim().toLowerCase();

    const retreat = getRetreatBySlug(slug);
    if (!retreat) {
      return NextResponse.json({ error: "Retreat not found." }, { status: 404 });
    }

    const body = await req.json();

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const phone = String(body?.phone || "").trim();
    const address = String(body?.address || "").trim();
    const about = String(body?.about || "").trim();
    const why = String(body?.why || "").trim();

    // payment (optional)
    const paymentIntentId = body?.paymentIntentId ? String(body.paymentIntentId).trim() : null;
    const paymentAmountCents =
      body?.paymentAmountCents != null ? Number(body.paymentAmountCents) : null;
    const paymentCurrency = body?.paymentCurrency
      ? String(body.paymentCurrency).trim().toLowerCase()
      : null;
    const paymentStatus = body?.paymentStatus
      ? String(body.paymentStatus).trim().toLowerCase()
      : null;

    if (!name || !email || !phone || !address || !about || !why) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const contact = await db.contact.upsert({
      where: { email },
      update: { name, phone, address1: address },
      create: { email, name, phone, address1: address },
    });

    const retreatRow = await db.retreat.upsert({
      where: { slug: retreat.slug },
      update: { title: retreat.title, address: retreat.address },
      create: {
        slug: retreat.slug,
        title: retreat.title,
        address: retreat.address,
        spots: retreat.spotsTotal,
      },
    });

    const inquiry = await db.inquiry.create({
      data: {
        type: "RETREAT_REQUEST",
        status: "NEW",
        about,
        why,
        source: `retreats/${retreat.slug}/apply`,
        contactId: contact.id,

        paymentIntentId: paymentIntentId || undefined,
        paymentAmountCents:
          Number.isFinite(paymentAmountCents as any) ? (paymentAmountCents as number) : undefined,
        paymentCurrency: paymentCurrency || undefined,
        paymentStatus: paymentStatus || undefined,

        retreat: { create: { retreatId: retreatRow.id } },
      },
    });

await sendRetreatSignupEmail({
    retreatTitle: retreat.title,
    name,
    email,
    phone,
    about,
    why,
    paymentAmountCents: Number.isFinite(paymentAmountCents as any) ? (paymentAmountCents as number) : undefined,
    paymentIntentId: paymentIntentId || undefined,
  });

    return NextResponse.json({ ok: true, inquiryId: inquiry.id });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error." }, { status: 500 });
  }
}