"use client";

import { useEffect, useMemo, useState } from "react";

type EventItem = {
  id: string;
  parentId?: string;
  title: string;
  description: string | null;
  location: string | null;
  photos: string[];
  startAt: string;
  endAt: string | null;
  isRecurring: boolean;
  rrule: string | null;
};

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}
function formatTime(d: Date) {
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}
function formatDateLong(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

export default function EventsCalendar() {
  const [events, setEvents]   = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const today = useMemo(() => {
    const d = new Date(); d.setHours(0, 0, 0, 0); return d;
  }, []);

  const [cursor, setCursor] = useState<{ year: number; month: number }>(() => {
    const d = new Date(); return { year: d.getFullYear(), month: d.getMonth() };
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
    return () => { cancelled = true; };
  }, []);

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
      .filter(e => new Date(e.endAt ?? e.startAt) >= now)
      .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  }, [events]);

  // Build calendar grid (Monday-first)
  const firstOfMonth  = new Date(cursor.year, cursor.month, 1);
  const daysInMonth   = new Date(cursor.year, cursor.month + 1, 0).getDate();
  // 0=Sun…6=Sat → shift so Monday=0
  const rawStart      = firstOfMonth.getDay();
  const startWeekday  = (rawStart + 6) % 7; // Mon-first offset
  const totalCells    = Math.ceil((startWeekday + daysInMonth) / 7) * 7;

  const cells: Array<{ date: Date | null }> = [];
  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - startWeekday + 1;
    cells.push({ date: dayNum >= 1 && dayNum <= daysInMonth ? new Date(cursor.year, cursor.month, dayNum) : null });
  }

  function shiftMonth(delta: number) {
    setCursor(c => {
      const d = new Date(c.year, c.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  const selectedKey    = selected ? `${selected.getFullYear()}-${selected.getMonth()}-${selected.getDate()}` : null;
  const selectedEvents = selectedKey ? eventsByDay.get(selectedKey) ?? [] : [];

  const rightTitle = selected ? formatDateLong(selected) : "Upcoming";
  const rightCount = selected ? selectedEvents.length : upcoming.length;
  const rightEvents = selected ? selectedEvents : upcoming;
  const isEmpty = !loading && !error && rightEvents.length === 0;

  return (
    <>
      <style>{CAL_STYLES}</style>
      <div className="ec-root">

        {/* ── Two-column layout ────────────────────────────── */}
        <div className="ec-layout">

          {/* LEFT: Month calendar */}
          <div className="ec-card">
            <div className="ec-nav">
              <button className="ec-nav-btn" onClick={() => shiftMonth(-1)} aria-label="Previous month">‹</button>
              <span className="ec-month-label">{MONTHS[cursor.month]}  {cursor.year}</span>
              <button className="ec-nav-btn" onClick={() => shiftMonth(1)}  aria-label="Next month">›</button>
            </div>

            <div className="ec-weekdays">
              {WEEKDAYS.map(d => <div key={d}>{d}</div>)}
            </div>

            <div className="ec-grid">
              {cells.map(({ date }, i) => {
                if (!date) return <div key={i} className="ec-cell" />;

                const key        = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                const dayEvents  = eventsByDay.get(key) ?? [];
                const isToday    = sameDay(date, today);
                const isSelected = !!selected && sameDay(date, selected);
                const isPast     = date < today;

                return (
                  <button
                    key={i}
                    onClick={() => setSelected(isSelected ? null : date)}
                    className={[
                      "ec-cell ec-day",
                      isToday    ? "is-today"    : "",
                      isSelected ? "is-selected" : "",
                      isPast     ? "is-past"     : "",
                    ].join(" ")}
                  >
                    <span className="ec-num">{date.getDate()}</span>
                    {dayEvents.length > 0 && (
                      <span className="ec-event-dots">
                        {dayEvents.slice(0, 3).map((_, di) => (
                          <span key={di} className="ec-dot" />
                        ))}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Selected day or Upcoming */}
          <div className="ec-sidebar">
            <div className="ec-sidebar-head">
              <span className="ec-upcoming-title">{rightTitle}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span className="ec-upcoming-count">{rightCount} {selected ? "event" + (rightCount !== 1 ? "s" : "") : "planned"}</span>
                {selected && (
                  <button className="ec-clear-btn" onClick={() => setSelected(null)}>Clear</button>
                )}
              </div>
            </div>

            <div className="ec-sidebar-body">
              {loading ? (
                <div className="ec-empty">Loading events…</div>
              ) : error ? (
                <div className="ec-empty" style={{ color: "rgba(248,113,113,0.8)" }}>{error}</div>
              ) : isEmpty ? (
                <div className="ec-empty-box">
                  {selected ? "Nothing scheduled on this day." : "Nothing on the calendar yet — check back soon."}
                </div>
              ) : (
                <div className="ec-list">
                  {rightEvents.map(e => <EventCard key={e.id} event={e} />)}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

function EventCard({ event }: { event: EventItem }) {
  const start  = new Date(event.startAt);
  const end    = event.endAt ? new Date(event.endAt) : null;
  const photos = (event as EventItem & { photos?: string[] }).photos ?? [];
  const isRecurring = (event as EventItem & { isRecurring?: boolean }).isRecurring;

  return (
    <div className="ec-event-card">
      {/* Cover photo */}
      {photos[0] && (
        <div className="ec-event-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos[0]} alt={event.title} />
        </div>
      )}
      <div className="ec-event-body">
        <div className="ec-event-date-col">
          <div className="ec-event-weekday">
            {start.toLocaleDateString(undefined, { weekday: "short" })}
          </div>
          <div className="ec-event-date">
            {start.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
          </div>
          <div className="ec-event-time">
            {formatTime(start)}{end ? ` – ${formatTime(end)}` : ""}
          </div>
        </div>
        <div className="ec-event-info">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
            <div className="ec-event-title">{event.title}</div>
            {isRecurring && <span className="ec-recur-badge">↻ Recurring</span>}
          </div>
          {event.location    && (
            <div className="ec-event-meta">
              <span className="ec-meta-icon">📍</span> {event.location}
            </div>
          )}
          {event.description && <p className="ec-event-desc">{event.description}</p>}
          {/* Extra photos */}
          {photos.length > 1 && (
            <div className="ec-extra-photos">
              {photos.slice(1, 4).map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={url} alt="" />
              ))}
              {photos.length > 4 && (
                <div className="ec-extra-more">+{photos.length - 4}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Styles ────────────────────────────────────────────────────────────────── */
const CAL_STYLES = `
  .ec-root { display: flex; flex-direction: column; gap: 2rem; }

  /* Two-column layout */
  .ec-layout {
    display: grid;
    grid-template-columns: 520px 1fr;
    gap: 1.5rem;
    align-items: stretch;
  }
  @media (max-width: 900px) {
    .ec-layout { grid-template-columns: 1fr; }
  }

  /* Sidebar */
  .ec-sidebar {
    border-radius: 1.25rem;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.025);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .ec-sidebar-head {
    display: flex; align-items: baseline; justify-content: space-between;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .ec-sidebar-body { display: flex; flex-direction: column; gap: 0.625rem; flex: 1; }

  /* Card shell */
  .ec-card {
    border-radius: 1.25rem;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.025);
    padding: 1.25rem 1rem;
  }
  @media (min-width: 640px) { .ec-card { padding: 1.5rem 1.5rem; } }

  /* Nav */
  .ec-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.75rem;
  }
  .ec-month-label {
    font-family: var(--font-display), "Barlow", system-ui, sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: rgba(240,236,228,0.92);
  }
  .ec-nav-btn {
    width: 2.25rem; height: 2.25rem;
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.09);
    background: transparent;
    color: rgba(240,236,228,0.55);
    font-size: 1.2rem;
    line-height: 1;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .ec-nav-btn:hover { background: rgba(255,255,255,0.07); color: rgba(240,236,228,0.9); }

  /* Weekdays */
  .ec-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(240,236,228,0.30);
    margin-bottom: 0.5rem;
  }
  .ec-weekdays > div { padding: 0.3rem 0; }

  /* Grid */
  .ec-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  /* Day cell */
  .ec-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: none;
    background: transparent;
    cursor: default;
    padding: 0;
  }
  .ec-day {
    cursor: pointer;
    transition: background 0.15s;
    position: relative;
  }
  .ec-day:hover .ec-num { opacity: 1; }
  .ec-day:hover { background: rgba(255,255,255,0.05); }

  .ec-num {
    font-size: 0.875rem;
    font-weight: 400;
    color: rgba(240,236,228,0.75);
    line-height: 1;
    transition: color 0.15s;
    width: 1.75rem; height: 1.75rem;
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
  }

  /* Today — gold circle */
  .ec-day.is-today .ec-num {
    background: #b8893a;
    color: #fff;
    font-weight: 700;
  }

  /* Selected — light circle */
  .ec-day.is-selected:not(.is-today) .ec-num {
    background: rgba(255,255,255,0.15);
    color: rgba(240,236,228,0.95);
    font-weight: 600;
  }

  /* Past */
  .ec-day.is-past .ec-num { color: rgba(240,236,228,0.28); }
  .ec-day.is-past:hover { background: transparent; }
  .ec-day.is-past:hover .ec-num { color: rgba(240,236,228,0.40); }

  /* Event dots */
  .ec-event-dots {
    display: flex; gap: 3px; align-items: center; justify-content: center;
  }
  .ec-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: #b8893a;
    flex-shrink: 0;
  }
  .ec-day.is-today .ec-dot { background: rgba(255,255,255,0.7); }

  /* Selected day detail */
  .ec-detail {
    border-radius: 1.25rem;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.025);
    padding: 1.5rem;
  }
  .ec-detail-head {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1.25rem;
  }
  .ec-detail-title {
    font-family: var(--font-display), "Barlow", system-ui, sans-serif;
    font-size: 1.1rem; font-weight: 700;
    color: rgba(240,236,228,0.9);
  }
  .ec-clear-btn {
    font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.18em;
    color: rgba(240,236,228,0.35); cursor: pointer;
    border: none; background: none; padding: 0;
    transition: color 0.15s;
  }
  .ec-clear-btn:hover { color: rgba(240,236,228,0.7); }
  .ec-detail-body { display: flex; flex-direction: column; gap: 0.75rem; }

  /* Upcoming */
  .ec-upcoming { display: flex; flex-direction: column; gap: 1rem; }
  .ec-upcoming-head {
    display: flex; align-items: baseline; justify-content: space-between;
  }
  .ec-upcoming-title {
    font-family: var(--font-display), "Barlow", system-ui, sans-serif;
    font-size: 1.6rem; font-weight: 700;
    color: rgba(240,236,228,0.9);
  }
  .ec-upcoming-count { font-size: 0.8rem; color: rgba(240,236,228,0.35); }
  .ec-list { display: flex; flex-direction: column; gap: 0.625rem; }
  .ec-empty { color: rgba(240,236,228,0.40); font-size: 0.9rem; padding: 0.5rem 0; }
  .ec-empty-box {
    border-radius: 1rem;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.02);
    padding: 2rem; text-align: center;
    color: rgba(240,236,228,0.38); font-size: 0.9rem;
  }

  /* Event card */
  .ec-event-card {
    border-radius: 1rem;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.025);
    overflow: hidden;
  }
  .ec-event-cover {
    width: 100%; aspect-ratio: 16/6; overflow: hidden;
  }
  .ec-event-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .ec-event-body {
    display: flex; gap: 1.25rem;
    padding: 1.1rem 1.25rem;
    align-items: flex-start;
  }
  .ec-event-date-col { width: 5.5rem; flex-shrink: 0; }
  .ec-event-weekday {
    font-size: 10px; text-transform: uppercase; letter-spacing: 0.18em;
    color: rgba(240,236,228,0.35); margin-bottom: 0.2rem;
  }
  .ec-event-date {
    font-family: var(--font-display), "Barlow", system-ui, sans-serif;
    font-size: 1.2rem; font-weight: 700;
    color: rgba(240,236,228,0.9); margin-bottom: 0.2rem;
  }
  .ec-event-time { font-size: 0.78rem; color: rgba(240,236,228,0.45); }
  .ec-event-info { flex: 1; min-width: 0; }
  .ec-event-title {
    font-family: var(--font-display), "Barlow", system-ui, sans-serif;
    font-size: 1.05rem; font-weight: 600;
    color: rgba(240,236,228,0.92);
  }
  .ec-recur-badge {
    font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
    color: #b8893a; border: 1px solid rgba(184,137,58,0.35);
    border-radius: 100px; padding: 0.1rem 0.5rem; white-space: nowrap; flex-shrink: 0;
  }
  .ec-event-meta {
    font-size: 0.82rem; color: rgba(240,236,228,0.45);
    margin-top: 0.2rem; margin-bottom: 0.25rem;
  }
  .ec-meta-icon { font-size: 0.75rem; }
  .ec-event-desc { font-size: 0.82rem; color: rgba(240,236,228,0.55); line-height: 1.6; white-space: pre-wrap; }
  .ec-extra-photos {
    display: flex; gap: 0.4rem; margin-top: 0.6rem; flex-wrap: wrap;
  }
  .ec-extra-photos img {
    width: 3.5rem; height: 3.5rem; object-fit: cover;
    border-radius: 0.4rem; border: 1px solid rgba(255,255,255,0.08);
  }
  .ec-extra-more {
    width: 3.5rem; height: 3.5rem; border-radius: 0.4rem;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; color: rgba(240,236,228,0.5);
  }
`;
