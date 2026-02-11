"use server";

import { db } from "@/lib/db";

function splitAddress(raw?: string) {
  if (!raw) return {};
  // Keep simple for now. Admin can clean up later.
  return { address1: raw.trim() };
}

export async function createEmailOptin(args: {
  email: string;
  name?: string;
  source?: string;
}) {
  const email = args.email.trim().toLowerCase();
  const name = args.name?.trim() || null;

  const contact = await db.contact.upsert({
    where: { email },
    update: { name: name ?? undefined },
    create: { email, name },
  });

  await db.inquiry.create({
    data: {
      type: "EMAIL_OPTIN",
      status: "NEW",
      source: args.source ?? "email-optin",
      contactId: contact.id,
    },
  });

  return { ok: true };
}

export async function createRetreatRequest(args: {
  retreatSlug: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  why: string;
  source?: string;
}) {
  const retreatSlug = args.retreatSlug.trim();
  const email = args.email.trim().toLowerCase();
  const addr = splitAddress(args.address);

  const contact = await db.contact.upsert({
    where: { email },
    update: {
      name: args.name.trim(),
      phone: args.phone.trim(),
      ...addr,
    },
    create: {
      email,
      name: args.name.trim(),
      phone: args.phone.trim(),
      ...addr,
    },
  });

  const retreat = await db.retreat.upsert({
    where: { slug: retreatSlug },
    update: {},
    create: {
      slug: retreatSlug,
      title: retreatSlug, // can be updated later from content/admin
    },
  });

  const inquiry = await db.inquiry.create({
    data: {
      type: "RETREAT_REQUEST",
      status: "NEW",
      about: args.about.trim(),
      why: args.why.trim(),
      source: args.source ?? `retreats/${retreatSlug}/apply`,
      contactId: contact.id,
      retreat: {
        create: {
          retreatId: retreat.id,
        },
      },
    },
  });

  return { ok: true, inquiryId: inquiry.id };
}

export async function createCoachingRequest(args: {
  productSlug: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  why: string;
  source?: string;
}) {
  const productSlug = args.productSlug.trim();
  const email = args.email.trim().toLowerCase();
  const addr = splitAddress(args.address);

  const contact = await db.contact.upsert({
    where: { email },
    update: {
      name: args.name.trim(),
      phone: args.phone.trim(),
      ...addr,
    },
    create: {
      email,
      name: args.name.trim(),
      phone: args.phone.trim(),
      ...addr,
    },
  });

  const inquiry = await db.inquiry.create({
    data: {
      type: "COACHING_REQUEST",
      status: "NEW",
      about: args.about.trim(),
      why: args.why.trim(),
      source: args.source ?? `coaching/${productSlug}/apply`,
      contactId: contact.id,
    },
  });

  return { ok: true, inquiryId: inquiry.id };
}