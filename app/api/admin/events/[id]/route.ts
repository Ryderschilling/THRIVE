import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return !!process.env.ADMIN_ACCESS_TOKEN && token === process.env.ADMIN_ACCESS_TOKEN;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    await db.event.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const body = await req.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: Record<string, any> = {};

    if (typeof body?.title === "string") {
      const t = body.title.trim();
      if (!t) return NextResponse.json({ error: "Title cannot be empty" }, { status: 400 });
      data.title = t;
    }
    if ("description" in body)
      data.description = typeof body.description === "string" ? body.description.trim() || null : null;
    if ("location" in body)
      data.location = typeof body.location === "string" ? body.location.trim() || null : null;
    if ("photos" in body)
      data.photos = Array.isArray(body.photos)
        ? body.photos.filter((p: unknown) => typeof p === "string" && p.trim()).map((p: string) => p.trim())
        : [];
    if ("startAt" in body && body.startAt) {
      const d = new Date(body.startAt);
      if (isNaN(d.getTime())) return NextResponse.json({ error: "Invalid startAt" }, { status: 400 });
      data.startAt = d;
    }
    if ("endAt" in body) {
      data.endAt = body.endAt ? new Date(body.endAt) : null;
      if (data.endAt && isNaN(data.endAt.getTime())) return NextResponse.json({ error: "Invalid endAt" }, { status: 400 });
    }
    if ("isRecurring" in body) data.isRecurring = body.isRecurring === true;
    if ("rrule" in body)
      data.rrule = body.isRecurring && typeof body.rrule === "string" ? body.rrule.trim() || null : null;
    // Add a single exception date (ISO string) to the exceptions array
    if ("addException" in body && typeof body.addException === "string") {
      const existing = await db.event.findUnique({ where: { id }, select: { exceptions: true } });
      const exArr = (existing as { exceptions?: string[] } | null)?.exceptions ?? [];
      if (!exArr.includes(body.addException)) {
        data.exceptions = [...exArr, body.addException];
      }
    }
    if ("exceptions" in body && Array.isArray(body.exceptions)) {
      data.exceptions = body.exceptions.filter((x: unknown) => typeof x === "string");
    }

    const event = await db.event.update({ where: { id }, data });
    return NextResponse.json({ event });
  } catch {
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}
