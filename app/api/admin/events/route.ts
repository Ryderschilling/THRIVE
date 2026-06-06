import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return !!process.env.ADMIN_ACCESS_TOKEN && token === process.env.ADMIN_ACCESS_TOKEN;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const events = await db.event.findMany({ orderBy: { startAt: "asc" } });
    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ error: "Failed to load events" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const description =
      typeof body?.description === "string" ? body.description.trim() : null;
    const location =
      typeof body?.location === "string" ? body.location.trim() : null;
    const startAtRaw = body?.startAt;
    const endAtRaw = body?.endAt;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const startAt = startAtRaw ? new Date(startAtRaw) : null;
    if (!startAt || Number.isNaN(startAt.getTime())) {
      return NextResponse.json(
        { error: "Valid startAt is required" },
        { status: 400 }
      );
    }
    let endAt: Date | null = null;
    if (endAtRaw) {
      endAt = new Date(endAtRaw);
      if (Number.isNaN(endAt.getTime())) {
        return NextResponse.json({ error: "Invalid endAt" }, { status: 400 });
      }
    }

    const event = await db.event.create({
      data: {
        title,
        description: description || null,
        location: location || null,
        startAt,
        endAt,
      },
    });
    return NextResponse.json({ event }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
