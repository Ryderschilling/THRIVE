import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // NOTE: Keep your existing query logic as-is if yours differs.
    // This is a safe default: count + list of signups for retreat slug.
    const signups = await db.inquiry.findMany({
      where: {
        type: "RETREAT_REQUEST",
        retreat: {
          is: {
            retreat: {
              is: { slug },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      include: {
        contact: true,
        retreat: {
          include: {
            retreat: true,
          },
        },
      },
    });

    return NextResponse.json({
      retreat: slug,
      count: signups.length,
      signups,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load signups" }, { status: 500 });
  }
}