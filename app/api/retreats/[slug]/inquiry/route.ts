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

    // In your updated UI, you added "What are you looking forward to most?"
    // We'll store it in Inquiry.message (fits your schema).
    const lookingForward = String(body?.lookingForward || body?.message || "").trim();

    // payment (optional)
    const paymentIntentId = body?.paymentIntentId
      ? String(body.paymentIntentId).trim()
      : undefined;
    const paymentAmountCents =
      body?.paymentAmountCents != null ? Number(body.paymentAmountCents) : undefined;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, phone)." },
        { status: 400 }
      );
    }

    // Contact: requires email to be unique in Prisma for where: { email } to work.
    // If you've added @unique to Contact.email, this is correct.
    const contact = await db.contact.upsert({
      where: { email },
      update: { name, phone, address },
      create: { email, name, phone, address },
    });

    // Retreat row in DB (only fields that exist in your schema)
    const retreatRow = await db.retreat.upsert({
      where: { slug: retreat.slug },
      update: { title: retreat.title ?? null },
      create: { slug: retreat.slug, title: retreat.title ?? null },
    });

    // Create inquiry + link it to retreat through RetreatInquiry
    const inquiry = await db.inquiry.create({
      data: {
        type: "RETREAT_REQUEST",
        message: lookingForward || null,
        source: `retreats/${retreat.slug}/apply`,
        donationCents:
          Number.isFinite(paymentAmountCents as any) ? (paymentAmountCents as number) : null,
        contactId: contact.id,

        retreatLink: {
          create: {
            retreatId: retreatRow.id,
          },
        },
      },
    });

    // Email (keep payload minimal; don’t pass fields your email function doesn’t expect)
    await sendRetreatSignupEmail({
      retreatTitle: retreat.title,
      name,
      email,
      phone,
      // Optional helpers if your email template supports them:
      lookingForward: lookingForward || undefined,
      paymentAmountCents:
        Number.isFinite(paymentAmountCents as any) ? (paymentAmountCents as number) : undefined,
      paymentIntentId,
    } as any);

    return NextResponse.json({ ok: true, inquiryId: inquiry.id });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error." }, { status: 500 });
  }
}