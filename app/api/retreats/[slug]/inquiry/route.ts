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
    const lookingForward = String(body?.lookingForward || body?.message || "").trim();

    const paymentIntentId = body?.paymentIntentId
      ? String(body.paymentIntentId).trim()
      : undefined;

    const paymentAmountCentsRaw =
      body?.paymentAmountCents != null ? Number(body.paymentAmountCents) : undefined;

    const hasValidDonation =
      !!paymentIntentId &&
      typeof paymentAmountCentsRaw === "number" &&
      Number.isFinite(paymentAmountCentsRaw) &&
      paymentAmountCentsRaw > 0;

    const donationCents = hasValidDonation ? paymentAmountCentsRaw : null;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, phone)." },
        { status: 400 }
      );
    }

    let inquiryId: string | null = null;

    try {
      const contact = await db.contact.upsert({
        where: { email },
        update: { name, phone, address },
        create: { email, name, phone, address },
      });

      const retreatRow = await db.retreat.upsert({
        where: { slug: retreat.slug },
        update: { title: retreat.title ?? null },
        create: { slug: retreat.slug, title: retreat.title ?? null },
      });

      const inquiry = await db.inquiry.create({
        data: {
          type: "RETREAT_REQUEST",
          message: lookingForward || null,
          source: `retreats/${retreat.slug}/apply`,
          donationCents,
          contactId: contact.id,
          retreatLink: {
            create: { retreatId: retreatRow.id },
          },
        },
      });

      inquiryId = inquiry.id;
    } catch (dbError) {
      console.error("Retreat inquiry DB write failed:", dbError);
    }

    try {
      await sendRetreatSignupEmail({
        retreatTitle: retreat.title,
        name,
        email,
        phone,
        address: address || undefined,
        about: about || undefined,
        why: why || undefined,
        lookingForward: lookingForward || undefined,
        paymentAmountCents: donationCents ?? undefined,
        paymentIntentId,
      });
    } catch (emailError) {
      console.error("Retreat signup email failed:", emailError);
    }

    return NextResponse.json({ ok: true, inquiryId });
  } catch (e) {
    console.error("Retreat inquiry route error:", e);

    return NextResponse.json(
      { error: "Unable to submit signup right now." },
      { status: 500 }
    );
  }
}