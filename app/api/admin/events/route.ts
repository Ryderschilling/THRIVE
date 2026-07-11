import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return !!process.env.ADMIN_ACCESS_TOKEN && token === process.env.ADMIN_ACCESS_TOKEN;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const events = await db.event.findMany({ orderBy: { startAt: "asc" } });
    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ error: "Failed to load events" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();

    const title = typeof body?.title === "string" ? body.title.trim() : "";
    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const startAt = body?.startAt ? new Date(body.startAt) : null;
    if (!startAt || isNaN(startAt.getTime()))
      return NextResponse.json({ error: "Valid startAt is required" }, { status: 400 });

    const endAt = body?.endAt ? new Date(body.endAt) : null;
    if (endAt && isNaN(endAt.getTime()))
      return NextResponse.json({ error: "Invalid endAt" }, { status: 400 });

    const photos = Array.isArray(body?.photos)
      ? body.photos.filter((p: unknown) => typeof p === "string" && p.trim()).map((p: string) => p.trim())
      : [];

    const isRecurring = body?.isRecurring === true;
    const rrule = isRecurring && typeof body?.rrule === "string" ? body.rrule.trim() || null : null;

    const event = await db.event.create({
      data: {
        title,
        description: typeof body?.description === "string" ? body.description.trim() || null : null,
        location:    typeof body?.location    === "string" ? body.location.trim()    || null : null,
        photos,
        startAt,
        endAt,
        isRecurring,
        rrule,
      },
    });
    return NextResponse.json({ event }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
