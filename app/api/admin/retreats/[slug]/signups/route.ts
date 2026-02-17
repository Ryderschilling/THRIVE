import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const token = req.headers.get("x-admin-token");
  if (!process.env.ADMIN_ACCESS_TOKEN || token !== process.env.ADMIN_ACCESS_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = await params;

    const rows = await db.retreatInquiry.findMany({
      where: {
        retreat: { slug },
      },
      orderBy: {
        inquiry: { createdAt: "desc" },
      },
      include: {
        inquiry: { include: { contact: true } },
        retreat: true,
      },
    });

    return NextResponse.json({
      retreat: slug,
      count: rows.length,
      signups: rows,
    });
  } catch {
    return NextResponse.json({ error: "Failed to load signups" }, { status: 500 });
  }
}