import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { expandAllEvents } from "@/lib/recurrence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await db.event.findMany({ orderBy: { startAt: "asc" } });
    const events = expandAllEvents(rows as Parameters<typeof expandAllEvents>[0]);
    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ error: "Failed to load events" }, { status: 500 });
  }
}
