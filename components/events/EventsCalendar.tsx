"use client";

import { useEffect, useMemo, useState } from "react";

type EventItem = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  startAt: string;
  endAt: string | null;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatTime(d: Date) {
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDateLong(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function EventsCalendar() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [cursor, setCursor] = useState<{ year: number; month: number }>(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [selected, setSelected] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/events", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        if (!cancelled) setEvents(data.events ?? []);
      } catch {
        if (!cancelled) setError("Could not load events.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Group events by yyyy-mm-dd for quick lookup
  const eventsByDay = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const e of events) {
      const d = new Date(e.startAt);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      const arr = map.get(key) ?? [];
      arr.push(e);
      map.set(key, arr);
    }
    return map;
  }, [events]);

  const upcoming = useMemo(() => {
    const now = new Date();
    return events
      .filter((e) => new Date(e.endAt ?? e.startAt) >= now)
      .sort(
        (a, b) =>
          new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
      );
  }, [events]);

  const firstOfMonth = new Date(cursor.year, cursor.month, 1);
  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate();
  const startWeekday = firstOfMonth.getDay();
  const totalCells = Math.ceil((startWeekday + daysInMonth) / 7) * 7;

  const cells: Array<{ date: Date | null }> = [];
  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - startWeekday + 1;
    if (dayNum < 1 || dayNum > daysInMonth) {
      cells.push({ date: null });
    } else {
      cells.push({ date: new Date(cursor.year, cursor.month, dayNum) });
    }
  }

  function shiftMonth(delta: number) {
    setCursor((c) => {
      const d = new Date(c.year, c.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  const selectedKey = selected
    ? `${selected.getFullYear()}-${selected.getMonth()}-${selected.getDate()}`
    : null;
  const selectedEvents = selectedKey ? eventsByDay.get(selectedKey) ?? [] : [];

  return (
    <div className="space-y-10">
      {/* Calendar */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => shiftMonth(-1)}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/75 transition hover:bg-white/5"
            aria-label="Previous month"
          >
            ‹
          </button>
          <div className="text-center">
            <div className="font-display text-xl md:text-2xl text-white/95">
              {MONTHS[cursor.month]} {cursor.year}
            </div>
          </div>
          <button
            onClick={() => shiftMonth(1)}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/75 transition hover:bg-white/5"
            aria-label="Next month"
          >
            ›
          </button>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-[0.2em] text-white/45">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-2">
              {d}
            </div>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((cell, i) => {
            if (!cell.date) {
              return (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-transparent"
                />
              );
            }
            const d = cell.date;
            const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
            const dayEvents = eventsByDay.get(key) ?? [];
            const isToday = sameDay(d, today);
            const isSelected = selected && sameDay(d, selected);
            const isPast = d < today;

            return (
              <button
                key={i}
                onClick={() => setSelected(d)}
                className={[
                  "relative aspect-square rounded-lg border text-left p-1.5 md:p-2 transition",
                  isSelected
                    ? "border-white/40 bg-white/10"
                    : "border-white/8 bg-white/[0.02] hover:bg-white/5",
                  isPast ? "opacity-60" : "",
                ].join(" ")}
              >
                <div
                  className={[
                    "text-xs md:text-sm",
                    isToday ? "text-white font-semibold" : "text-white/80",
                  ].join(" ")}
                >
                  {d.getDate()}
                </div>
                {dayEvents.length > 0 ? (
                  <div className="mt-1 hidden md:block space-y-0.5">
                    {dayEvents.slice(0, 2).map((e) => (
                      <div
                        key={e.id}
                        className="truncate rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/85"
                        title={e.title}
                      >
                        {e.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 ? (
                      <div className="text-[10px] text-white/55">
                        +{dayEvents.length - 2} more
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {dayEvents.length > 0 ? (
                  <div className="absolute bottom-1 right-1 md:hidden h-1.5 w-1.5 rounded-full bg-white/70" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected day detail */}
      {selected ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="font-display text-xl text-white/95">
              {formatDateLong(selected)}
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-xs uppercase tracking-[0.22em] text-white/55 hover:text-white/85"
            >
              Clear
            </button>
          </div>
          <div className="mt-5 space-y-4">
            {selectedEvents.length === 0 ? (
              <div className="text-white/55">Nothing scheduled on this day.</div>
            ) : (
              selectedEvents.map((e) => (
                <EventCard key={e.id} event={e} />
              ))
            )}
          </div>
        </div>
      ) : null}

      {/* Upcoming list */}
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl md:text-3xl text-white/95">
            Upcoming
          </h2>
          <div className="text-white/55 text-sm">{upcoming.length} planned</div>
        </div>

        {loading ? (
          <div className="text-white/55">Loading events…</div>
        ) : error ? (
          <div className="text-red-300/80">{error}</div>
        ) : upcoming.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-white/60">
            Nothing on the calendar yet — check back soon.
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({ event }: { event: EventItem }) {
  const start = new Date(event.startAt);
  const end = event.endAt ? new Date(event.endAt) : null;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5 md:flex-row md:items-center md:gap-6">
      <div className="md:w-32 shrink-0">
        <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">
          {start.toLocaleDateString(undefined, { weekday: "short" })}
        </div>
        <div className="font-display text-2xl text-white/95">
          {start.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
        </div>
        <div className="text-sm text-white/65">
          {formatTime(start)}
          {end ? ` – ${formatTime(end)}` : ""}
        </div>
      </div>
      <div className="flex-1 space-y-1">
        <div className="font-display text-lg text-white/95">{event.title}</div>
        {event.location ? (
          <div className="text-sm text-white/65">{event.location}</div>
        ) : null}
        {event.description ? (
          <p className="text-sm text-white/70 whitespace-pre-wrap">
            {event.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
