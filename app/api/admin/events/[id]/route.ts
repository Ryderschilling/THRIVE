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
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const data: {
      title?: string;
      description?: string | null;
      location?: string | null;
      startAt?: Date;
      endAt?: Date | null;
    } = {};

    if (typeof body?.title === "string") {
      const t = body.title.trim();
      if (!t) {
        return NextResponse.json({ error: "Title cannot be empty" }, { status: 400 });
      }
      data.title = t;
    }
    if ("description" in body) {
      data.description =
        typeof body.description === "string" && body.description.trim()
          ? body.description.trim()
          : null;
    }
    if ("location" in body) {
      data.location =
        typeof body.location === "string" && body.location.trim()
          ? body.location.trim()
          : null;
    }
    if ("startAt" in body && body.startAt) {
      const d = new Date(body.startAt);
      if (Number.isNaN(d.getTime())) {
        return NextResponse.json({ error: "Invalid startAt" }, { status: 400 });
      }
      data.startAt = d;
    }
    if ("endAt" in body) {
      if (body.endAt) {
        const d = new Date(body.endAt);
        if (Number.isNaN(d.getTime())) {
          return NextResponse.json({ error: "Invalid endAt" }, { status: 400 });
        }
        data.endAt = d;
      } else {
        data.endAt = null;
      }
    }

    const event = await db.event.update({ where: { id }, data });
    return NextResponse.json({ event });
  } catch {
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}
