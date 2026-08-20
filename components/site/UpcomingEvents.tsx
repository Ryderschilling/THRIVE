"use client";

import { useEffect, useState } from "react";
import { rhythm } from "@/content/site";

type EventItem = {
  id: string;
  title: string;
  location: string | null;
  startAt: string;
  endAt: string | null;
};

export default function UpcomingEvents({ limit = 3 }: { limit?: number }) {
  const [events, setEvents] = useState<EventItem[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        const now = new Date();
        const list = ((data?.events ?? []) as EventItem[])
          .filter((e) => new Date(e.endAt ?? e.startAt) >= now)
          .sort(
            (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
          )
          .slice(0, limit);
        setEvents(list);
      })
      .catch(() => {
        if (alive) setEvents([]);
      });
    return () => {
      alive = false;
    };
  }, [limit]);

  // Nothing scheduled yet (or still loading): show the standing rhythm instead
  // of an empty box, so the section never looks broken.
  if (!events || events.length === 0) {
    return (
      <div className="t-evs">
        {rhythm.slice(0, limit).map((r) => (
          <div key={r.title} className="t-ev">
            <div className="t-ev-date standing">
              <span className="t-ev-m">{r.when}</span>
            </div>
            <div>
              <div className="t-ev-name">{r.title}</div>
              <div className="t-ev-meta">{r.meta}</div>
            </div>
            <div className="t-ev-ar">&rarr;</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="t-evs">
      {events.map((ev) => {
        const d = new Date(ev.startAt);
        const day = String(d.getDate()).padStart(2, "0");
        const mon = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
        const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
        const meta = [time, ev.location].filter(Boolean).join(" · ");
        return (
          <a key={ev.id} href="/events" className="t-ev">
            <div className="t-ev-date">
              <span className="t-ev-d">{day}</span>
              <span className="t-ev-m">{mon}</span>
            </div>
            <div>
              <div className="t-ev-name">{ev.title}</div>
              <div className="t-ev-meta">{meta}</div>
            </div>
            <div className="t-ev-ar">&rarr;</div>
          </a>
        );
      })}
    </div>
  );
}
