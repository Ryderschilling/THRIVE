import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendJoinEmail } from "@/lib/email";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  found?: string;
  message?: string;
  source?: string;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const phone = (body.phone || "").trim();
  const interest = (body.interest || "").trim();
  const found = (body.found || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Name and a valid email are required." },
      { status: 422 }
    );
  }

  const notes = [
    interest ? `Interested in: ${interest}` : "",
    found ? `Found us via: ${found}` : "",
    message ? `Message: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const contact = await db.contact.upsert({
      where: { email },
      update: { name: name || undefined, phone: phone || undefined },
      create: { email, name, phone: phone || null },
    });

    await db.inquiry.create({
      data: {
        type: "JOIN_REQUEST",
        message: notes || null,
        source: body.source || "join",
        contactId: contact.id,
      },
    });
  } catch (err) {
    console.error("[join] db error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Try again or email josh@thriveco.net." },
      { status: 500 }
    );
  }

  try {
    await sendJoinEmail({ name, email, phone, interest, found, message });
  } catch (err) {
    // never fail the user because the notification email hiccuped
    console.error("[join] email error", err);
  }

  return NextResponse.json({ ok: true });
}
