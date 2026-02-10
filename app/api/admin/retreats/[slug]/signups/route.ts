import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: Request, ctx: { params: { slug: string } }) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") || "";

  if (!process.env.ADMIN_ACCESS_TOKEN || token !== process.env.ADMIN_ACCESS_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = decodeURIComponent(String(ctx.params.slug)).trim().toLowerCase();

  const rows = await db.retreatInquiry.findMany({
    where: { retreat: { slug } },
    orderBy: { inquiry: { createdAt: "desc" } },
    include: {
      inquiry: {
        include: {
          contact: true,
        },
      },
      retreat: true,
    },
  });

  return NextResponse.json({
    retreat: slug,
    count: rows.length,
    signups: rows.map((r) => ({
      createdAt: r.inquiry.createdAt,
      status: r.inquiry.status,
      name: r.inquiry.contact.name,
      email: r.inquiry.contact.email,
      phone: r.inquiry.contact.phone,
      address: r.inquiry.contact.address1,
      about: r.inquiry.about,
      why: r.inquiry.why,
      source: r.inquiry.source,
    })),
  });
}