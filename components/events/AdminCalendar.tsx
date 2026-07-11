"use client";

import { useEffect, useMemo, useState } from "react";
import { describeRrule, parseRrule, buildRrule } from "@/lib/recurrence";

/* ── Types ─────────────────────────────────────────────────────────────────── */
type DbEvent = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  photos: string[];
  startAt: string;
  endAt: string | null;
  isRecurring: boolean;
  rrule: string | null;
};

type FormData = {
  title: string;
  description: string;
  location: string;
  photos: string[];          // list of URL strings
  startAt: string;           // datetime-local value
  endAt: string;
  isRecurring: boolean;
  rruleType: "monthly" | "weekly";
  rruleWeekdays: number[];   // for weekly
  rruleNths: number[];       // for monthly: which occurrences
  rruleWeekday: number;      // for monthly: which weekday
};

type PanelState =
  | { mode: "add"; date: Date }
  | { mode: "edit"; event: DbEvent; instanceDate?: Date }  // instanceDate = the specific occurrence clicked
  | null;

/* ── Constants ──────────────────────────────────────────────────────────────── */
const TOKEN_KEY  = "thrive_admin_token";
const MONTHS     = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAYS   = ["Mo","Tu","We","Th","Fr","Sa","Su"];
const WD_NAMES   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const NTH_LABELS = ["1st","2nd","3rd","4th","5th"];

/* ── Helpers ────────────────────────────────────────────────────────────────── */
function pad(n: number) { return String(n).padStart(2, "0"); }
function toInputValue(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function fmtTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
function emptyForm(date?: Date): FormData {
  const base = date
    ? new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0)
    : new Date(Date.now() + 3_600_000);
  return {
    title: "", description: "", location: "", photos: [],
    startAt: toInputValue(base), endAt: "",
    isRecurring: false,
    rruleType: "monthly", rruleWeekdays: [], rruleNths: [1], rruleWeekday: 3,
  };
}
function formToRrule(form: FormData): string | null {
  if (!form.isRecurring) return null;
  if (form.rruleType === "weekly") {
    return buildRrule({ type: "weekly", weekdays: form.rruleWeekdays });
  }
  return buildRrule({ type: "monthly", nths: form.rruleNths, weekday: form.rruleWeekday });
}
function eventToForm(ev: DbEvent): FormData {
  const rule = ev.rrule ? parseRrule(ev.rrule) : null;
  return {
    title:       ev.title,
    description: ev.description ?? "",
    location:    ev.location ?? "",
    photos:      ev.photos ?? [],
    startAt:     toInputValue(new Date(ev.startAt)),
    endAt:       ev.endAt ? toInputValue(new Date(ev.endAt)) : "",
    isRecurring: ev.isRecurring,
    rruleType:   rule?.type === "weekly" ? "weekly" : "monthly",
    rruleWeekdays: rule?.type === "weekly"  ? rule.weekdays : [],
    rruleNths:   rule?.type === "monthly" ? rule.nths     : [1],
    rruleWeekday:rule?.type === "monthly" ? rule.weekday  : 3,
  };
}

/* ── Auth Gate ──────────────────────────────────────────────────────────────── */
export default function AdminCalendar() {
  const [tokenInput, setTokenInput] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) ?? "" : "";
    if (t) { setToken(t); setTokenInput(t); }
  }, []);

  function signIn() {
    const t = tokenInput.trim();
    if (!t) return;
    localStorage.setItem(TOKEN_KEY, t);
    setToken(t);
  }
  function signOut() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(""); setTokenInput("");
  }

  if (!token) return (
    <>
      <style>{STYLES}</style>
      <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="ac-card" style={{ maxWidth: 400, width: "100%" }}>
        <div className="ac-month-label" style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>Admin Sign In</div>
        <p style={{ color: "rgba(240,236,228,0.45)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
          Enter the admin token to manage events.
        </p>
        <input type="password" className="ac-field-input" value={tokenInput}
          onChange={e => setTokenInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && signIn()} placeholder="admin token" />
        <button className="ac-submit-btn" style={{ marginTop: "1rem", width: "100%" }} onClick={signIn}>
          Continue →
        </button>
      </div>
      </div>
    </>
  );

  return <CalendarView token={token} onSignOut={signOut} />;
}

/* ── Calendar View ──────────────────────────────────────────────────────────── */
function CalendarView({ token, onSignOut }: { token: string; onSignOut: () => void }) {
  const [events, setEvents] = useState<DbEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor,  setCursor]  = useState(() => { const d = new Date(); return { year: d.getFullYear(), month: d.getMonth() }; });
  const [panel,   setPanel]   = useState<PanelState>(null);

  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/events", { headers: { "x-admin-token": token }, cache: "no-store" });
      if (res.status === 401) { onSignOut(); return; }
      const data = await res.json();
      setEvents(data.events ?? []);
    } finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []); // eslint-disable-line

  const recurringEvents = useMemo(() => events.filter(e => e.isRecurring), [events]);

  /* Group ALL events by day — expand recurring into the visible month */
  const eventsByDay = useMemo(() => {
    const map = new Map<string, DbEvent[]>();

    // One-time events
    for (const e of events) {
      if (e.isRecurring) continue;
      const d = new Date(e.startAt);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      map.set(key, [...(map.get(key) ?? []), e]);
    }

    // Expand recurring events for the visible month
    const rangeStart = new Date(cursor.year, cursor.month, 1);
    const rangeEnd   = new Date(cursor.year, cursor.month + 1, 0, 23, 59, 59);

    for (const e of recurringEvents) {
      const rule = parseRrule(e.rrule ?? "");
      if (!rule) continue;

      const base = new Date(e.startAt);
      const hour = base.getHours(), min = base.getMinutes();
      // Respect startAt — never show before series begins
      const seriesStart = new Date(base); seriesStart.setHours(0,0,0,0);
      const effectiveStart = seriesStart > rangeStart ? seriesStart : rangeStart;
      // Build exception set
      const exceptedKeys = new Set(
        ((e as DbEvent & { exceptions?: string[] }).exceptions ?? [])
          .map(iso => { const d = new Date(iso); return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; })
      );

      if (rule.type === "weekly") {
        const cursor2 = new Date(effectiveStart); cursor2.setHours(0,0,0,0);
        while (cursor2 <= rangeEnd) {
          if (rule.weekdays.includes(cursor2.getDay())) {
            const day = new Date(cursor2); day.setHours(hour, min, 0, 0);
            const dayKey = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
            if (!exceptedKeys.has(dayKey)) {
              const key = dayKey;
              map.set(key, [...(map.get(key) ?? []), e]);
            }
          }
          cursor2.setDate(cursor2.getDate() + 1);
        }
      } else {
        for (const nth of rule.nths) {
          const first = new Date(cursor.year, cursor.month, 1);
          const firstWd = first.getDay();
          const dayNum = 1 + ((rule.weekday - firstWd + 7) % 7) + (nth - 1) * 7;
          const date = new Date(cursor.year, cursor.month, dayNum);
          if (date.getMonth() === cursor.month) {
            date.setHours(hour, min, 0, 0);
            const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            if (date >= effectiveStart && date <= rangeEnd && !exceptedKeys.has(dayKey)) {
              map.set(dayKey, [...(map.get(dayKey) ?? []), e]);
            }
          }
        }
      }
    }

    return map;
  }, [events, recurringEvents, cursor]);

  const upcoming = useMemo(() => {
    const now = new Date();
    return events.filter(e => !e.isRecurring && new Date(e.endAt ?? e.startAt) >= now)
      .sort((a,b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  }, [events]);

  /* Monday-first grid */
  const firstOfMonth = new Date(cursor.year, cursor.month, 1);
  const daysInMonth  = new Date(cursor.year, cursor.month+1, 0).getDate();
  const rawStart     = firstOfMonth.getDay();
  const startWD      = (rawStart + 6) % 7;
  const totalCells   = Math.ceil((startWD + daysInMonth) / 7) * 7;
  const cells: Array<Date|null> = [];
  for (let i = 0; i < totalCells; i++) {
    const dn = i - startWD + 1;
    cells.push(dn >= 1 && dn <= daysInMonth ? new Date(cursor.year, cursor.month, dn) : null);
  }

  function shiftMonth(delta: number) {
    setCursor(c => { const d = new Date(c.year, c.month+delta, 1); return { year: d.getFullYear(), month: d.getMonth() }; });
  }

  async function handleSave(form: FormData, editId?: string, scope?: "this" | "all", instanceDate?: Date) {
    const payload = {
      title:       form.title,
      description: form.description || null,
      location:    form.location || null,
      photos:      form.photos.filter(Boolean),
      startAt:     form.startAt ? new Date(form.startAt).toISOString() : null,
      endAt:       form.endAt   ? new Date(form.endAt).toISOString()   : null,
      isRecurring: form.isRecurring,
      rrule:       formToRrule(form),
    };

    if (editId && scope === "this" && instanceDate) {
      // 1. Add this date to parent's exceptions so recurring series skips it
      const isoDate = instanceDate.toISOString();
      await fetch(`/api/admin/events/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ addException: isoDate }),
      });
      // 2. Create a new one-time event for this specific occurrence
      const d = new Date(instanceDate);
      const formStart = form.startAt ? new Date(form.startAt) : d;
      d.setHours(formStart.getHours(), formStart.getMinutes(), 0, 0);
      const oneTimePayload = {
        ...payload,
        startAt: d.toISOString(),
        endAt: form.endAt ? (() => {
          const e = new Date(form.endAt);
          const od = new Date(instanceDate);
          od.setHours(e.getHours(), e.getMinutes(), 0, 0);
          return od.toISOString();
        })() : null,
        isRecurring: false,
        rrule: null,
      };
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify(oneTimePayload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? `Save failed (${res.status})`);
      }
    } else {
      // Update all (or one-time event)
      const url    = editId ? `/api/admin/events/${editId}` : "/api/admin/events";
      const method = editId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? `Save failed (${res.status})`);
      }
    }
    setPanel(null);
    load();
  }

  async function handleDelete(id: string, scope?: "this" | "all", instanceDate?: Date) {
    if (scope === "this" && instanceDate) {
      // Just skip this occurrence — add to exceptions
      await fetch(`/api/admin/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ addException: instanceDate.toISOString() }),
      });
      setPanel(null); load();
    } else {
      if (!confirm("Delete this entire event series?")) return;
      await fetch(`/api/admin/events/${id}`, { method: "DELETE", headers: { "x-admin-token": token } });
      setPanel(null); load();
    }
  }

  return (
    <>
      <style>{STYLES}</style>

      {/* Toolbar */}
      <div className="ac-toolbar">
        <div style={{ fontSize: "0.75rem", color: "rgba(240,236,228,0.35)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Admin · Events
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button className="ac-submit-btn" onClick={() => setPanel({ mode: "add", date: new Date() })}>+ Add Event</button>
          <button onClick={onSignOut} className="ac-text-btn">Sign out</button>
        </div>
      </div>

      {/* Recurring series banner */}
      {recurringEvents.length > 0 && (
        <div className="ac-recurring-banner">
          <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(240,236,228,0.35)", marginBottom: "0.5rem" }}>
            Recurring Series
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {recurringEvents.map(ev => (
              <button key={ev.id} className="ac-recurring-chip" onClick={() => setPanel({ mode: "edit", event: ev })}>
                <span className="ac-recur-icon">↻</span>
                {ev.title}
                {ev.rrule && <span style={{ color: "rgba(240,236,228,0.4)", marginLeft: "0.35rem", fontSize: "10px" }}>
                  · {describeRrule(ev.rrule)}
                </span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Month calendar */}
      <div className="ac-card">
        <div className="ac-nav">
          <button className="ac-nav-btn" onClick={() => shiftMonth(-1)}>‹</button>
          <span className="ac-month-label">{MONTHS[cursor.month]}  {cursor.year}</span>
          <button className="ac-nav-btn" onClick={() => shiftMonth(1)}>›</button>
        </div>
        <div className="ac-weekdays">{WEEKDAYS.map(d => <div key={d}>{d}</div>)}</div>
        <div className="ac-grid">
          {cells.map((date, i) => {
            if (!date) return <div key={i} className="ac-cell" />;
            const key       = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            const dayEvents = eventsByDay.get(key) ?? [];
            const isToday   = sameDay(date, today);
            const isPast    = date < today;
            return (
              <button key={i}
                className={["ac-cell ac-day", isToday ? "is-today" : "", isPast ? "is-past" : ""].join(" ")}
                onClick={() => setPanel({ mode: "add", date })}
                title={`Add event · ${date.toLocaleDateString()}`}
              >
                <span className="ac-num">{date.getDate()}</span>
                {dayEvents.length > 0 && (
                  <span className="ac-pills">
                    {dayEvents.slice(0,2).map(ev => (
                      <button key={ev.id} className="ac-pill"
                        onClick={e => {
                          e.stopPropagation();
                          setPanel({ mode: "edit", event: ev, instanceDate: ev.isRecurring ? date : undefined });
                        }}
                        title={ev.title}>{ev.title}</button>
                    ))}
                    {dayEvents.length > 2 && <span className="ac-pill-more">+{dayEvents.length-2}</span>}
                  </span>
                )}
                {dayEvents.length > 0 && <span className="ac-dot-mobile" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming one-time events */}
      <div className="ac-upcoming">
        <div className="ac-upcoming-head">
          <span className="ac-upcoming-title">Upcoming</span>
          <span className="ac-upcoming-count">{upcoming.length} event{upcoming.length !== 1 ? "s" : ""}</span>
        </div>
        {loading ? <div className="ac-empty">Loading…</div> :
         upcoming.length === 0 ? <div className="ac-empty-box">No upcoming events — click any day or "+ Add Event".</div> : (
          <div className="ac-list">
            {upcoming.map(ev => {
              const start = new Date(ev.startAt);
              const end   = ev.endAt ? new Date(ev.endAt) : null;
              return (
                <button key={ev.id} className="ac-event-row" onClick={() => setPanel({ mode: "edit", event: ev })}>
                  {ev.photos?.[0] && (
                    <div className="ac-event-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ev.photos[0]} alt="" />
                    </div>
                  )}
                  <div className="ac-event-date-col">
                    <div className="ac-event-mon">{start.toLocaleDateString([],{month:"short"})}</div>
                    <div className="ac-event-day">{start.getDate()}</div>
                  </div>
                  <div className="ac-event-info">
                    <div className="ac-event-title">{ev.title}</div>
                    <div className="ac-event-meta">
                      {fmtTime(start)}{end ? ` – ${fmtTime(end)}` : ""}
                      {ev.location ? ` · ${ev.location}` : ""}
                    </div>
                  </div>
                  <div className="ac-edit-hint">Edit →</div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {panel && (
        <EventPanel
          mode={panel.mode}
          initialDate={panel.mode === "add" ? panel.date : undefined}
          event={panel.mode === "edit" ? panel.event : undefined}
          instanceDate={panel.mode === "edit" ? panel.instanceDate : undefined}
          onSave={handleSave}
          onDelete={panel.mode === "edit"
            ? (scope, iDate) => handleDelete(panel.event.id, scope, iDate)
            : undefined}
          onClose={() => setPanel(null)}
        />
      )}
    </>
  );
}

/* ── Event Panel (Drawer) ───────────────────────────────────────────────────── */
type EditScope = "this" | "all";

function EventPanel({ mode, initialDate, event, instanceDate, onSave, onDelete, onClose }: {
  mode: "add" | "edit";
  initialDate?: Date;
  event?: DbEvent;
  instanceDate?: Date;  // the specific occurrence that was clicked (recurring only)
  onSave: (form: FormData, editId?: string, scope?: EditScope, instanceDate?: Date) => Promise<void>;
  onDelete?: (scope: EditScope, instanceDate?: Date) => void;
  onClose: () => void;
}) {
  const isRecurringEdit = mode === "edit" && event?.isRecurring && !!instanceDate;
  const [scope,  setScope]  = useState<EditScope>("all");
  const [form,   setForm]   = useState<FormData>(() => mode === "edit" && event ? eventToForm(event) : emptyForm(initialDate));
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState<string | null>(null);
  const [newPhoto, setNewPhoto] = useState("");

  function addPhoto() {
    const url = newPhoto.trim();
    if (!url) return;
    setForm(f => ({ ...f, photos: [...f.photos, url] }));
    setNewPhoto("");
  }
  function removePhoto(i: number) {
    setForm(f => ({ ...f, photos: f.photos.filter((_, idx) => idx !== i) }));
  }
  function toggleNth(n: number) {
    setForm(f => ({
      ...f,
      rruleNths: f.rruleNths.includes(n) ? f.rruleNths.filter(x => x !== n) : [...f.rruleNths, n].sort(),
    }));
  }
  function toggleWd(n: number) {
    setForm(f => ({
      ...f,
      rruleWeekdays: f.rruleWeekdays.includes(n) ? f.rruleWeekdays.filter(x => x !== n) : [...f.rruleWeekdays, n].sort(),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    try { await onSave(form, mode === "edit" ? event?.id : undefined, isRecurringEdit ? scope : undefined, instanceDate); }
    catch (err) { setError(err instanceof Error ? err.message : "Save failed. Try again."); }
    finally { setSaving(false); }
  }

  const heading = mode === "add"
    ? `New Event${initialDate ? " · " + initialDate.toLocaleDateString([],{month:"short",day:"numeric"}) : ""}`
    : instanceDate
      ? `Edit · ${instanceDate.toLocaleDateString([],{month:"short",day:"numeric"})}`
      : "Edit Event";

  const rruleSummary = form.isRecurring ? formToRrule(form) : null;

  return (
    <>
      <div onClick={onClose} className="ac-backdrop" />
      <div className="ac-drawer">
        <div className="ac-drawer-head">
          <span className="ac-month-label" style={{ fontSize: "1.05rem" }}>{heading}</span>
          <button onClick={onClose} className="ac-close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} className="ac-drawer-form">

          {/* Scope selector for recurring edits */}
          {isRecurringEdit && (
            <div className="ac-scope-box">
              <div className="ac-field-label" style={{ marginBottom: "0.5rem" }}>Edit which events?</div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button type="button"
                  className={scope === "this" ? "ac-tag-btn active" : "ac-tag-btn"}
                  onClick={() => setScope("this")}>
                  This occurrence only
                </button>
                <button type="button"
                  className={scope === "all" ? "ac-tag-btn active" : "ac-tag-btn"}
                  onClick={() => setScope("all")}>
                  All events in series
                </button>
              </div>
            </div>
          )}

          {/* Title */}
          <label className="ac-field">
            <span className="ac-field-label">Event Name *</span>
            <input required type="text" className="ac-field-input" value={form.title}
              onChange={e => setForm({...form, title: e.target.value})} placeholder="Brotherhood Dinner" />
          </label>

          {/* Location */}
          <label className="ac-field">
            <span className="ac-field-label">Location</span>
            <input type="text" className="ac-field-input" value={form.location}
              onChange={e => setForm({...form, location: e.target.value})} placeholder="Santa Rosa Beach, FL" />
          </label>

          {/* Time row */}
          <div className="ac-field-row">
            <label className="ac-field" style={{ flex: 1 }}>
              <span className="ac-field-label">Start *</span>
              <input required type="datetime-local" className="ac-field-input" value={form.startAt}
                onChange={e => setForm({...form, startAt: e.target.value})} />
            </label>
            <label className="ac-field" style={{ flex: 1 }}>
              <span className="ac-field-label">End</span>
              <input type="datetime-local" className="ac-field-input" value={form.endAt}
                onChange={e => setForm({...form, endAt: e.target.value})} />
            </label>
          </div>

          {/* Description */}
          <label className="ac-field">
            <span className="ac-field-label">Description</span>
            <textarea className="ac-field-input" rows={3} value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              style={{ resize: "vertical" }} placeholder="What to expect, dress code, what to bring…" />
          </label>

          {/* Photos */}
          <div className="ac-field">
            <span className="ac-field-label">Photos (paste image URLs)</span>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <input type="url" className="ac-field-input" style={{ flex: 1 }} value={newPhoto}
                onChange={e => setNewPhoto(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addPhoto())}
                placeholder="https://…" />
              <button type="button" onClick={addPhoto} className="ac-submit-btn" style={{ flexShrink: 0 }}>Add</button>
            </div>
            {form.photos.length > 0 && (
              <div className="ac-photo-grid">
                {form.photos.map((url, i) => (
                  <div key={i} className="ac-photo-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" onError={e => (e.currentTarget.style.display = "none")} />
                    <button type="button" className="ac-photo-remove" onClick={() => removePhoto(i)}>×</button>
                  </div>
                ))}
              </div>
            )}
            <p style={{ fontSize: "11px", color: "rgba(240,236,228,0.3)", marginTop: "0.35rem" }}>
              Tip: Upload to Google Photos, copy the share link, paste here.
            </p>
          </div>

          {/* Recurring toggle */}
          <div className="ac-field">
            <label className="ac-checkbox-row">
              <input type="checkbox" checked={form.isRecurring}
                onChange={e => setForm({...form, isRecurring: e.target.checked})} />
              <span className="ac-field-label" style={{ marginBottom: 0 }}>Recurring event</span>
            </label>
          </div>

          {/* Recurring options */}
          {form.isRecurring && (
            <div className="ac-recur-box">
              {/* Type toggle */}
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                {(["monthly","weekly"] as const).map(t => (
                  <button key={t} type="button"
                    className={form.rruleType === t ? "ac-tag-btn active" : "ac-tag-btn"}
                    onClick={() => setForm({...form, rruleType: t})}>
                    {t === "monthly" ? "Monthly" : "Weekly"}
                  </button>
                ))}
              </div>

              {form.rruleType === "monthly" && (
                <>
                  <div style={{ marginBottom: "0.6rem" }}>
                    <span className="ac-field-label">Which occurrences</span>
                    <div className="ac-tag-row">
                      {NTH_LABELS.map((lbl,i) => (
                        <button key={i} type="button"
                          className={form.rruleNths.includes(i+1) ? "ac-tag-btn active" : "ac-tag-btn"}
                          onClick={() => toggleNth(i+1)}>{lbl}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="ac-field-label">Day of week</span>
                    <div className="ac-tag-row">
                      {WD_NAMES.map((n,i) => (
                        <button key={i} type="button"
                          className={form.rruleWeekday === i ? "ac-tag-btn active" : "ac-tag-btn"}
                          onClick={() => setForm({...form, rruleWeekday: i})}>{n}</button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {form.rruleType === "weekly" && (
                <div>
                  <span className="ac-field-label">Every</span>
                  <div className="ac-tag-row">
                    {WD_NAMES.map((n,i) => (
                      <button key={i} type="button"
                        className={form.rruleWeekdays.includes(i) ? "ac-tag-btn active" : "ac-tag-btn"}
                        onClick={() => toggleWd(i)}>{n}</button>
                    ))}
                  </div>
                </div>
              )}

              {rruleSummary && (
                <div className="ac-recur-summary">
                  ↻ {describeRrule(rruleSummary)}
                </div>
              )}
            </div>
          )}

          {error && <div className="ac-error">{error}</div>}

          <div className="ac-drawer-actions">
            {onDelete && (
              <button type="button"
                onClick={() => onDelete(isRecurringEdit ? scope : "all", instanceDate)}
                className="ac-delete-btn">
                {isRecurringEdit && scope === "this" ? "Remove this date" : "Delete series"}
              </button>
            )}
            <button type="submit" disabled={saving} className="ac-submit-btn"
              style={{ flex: 1, padding: "0.75rem", opacity: saving ? 0.55 : 1 }}>
              {saving ? "Saving…" : mode === "add" ? "Add Event" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

/* ── Styles ──────────────────────────────────────────────────────────────────── */
const STYLES = `
  .ac-toolbar { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; }
  .ac-text-btn { font-size:0.72rem; letter-spacing:0.15em; text-transform:uppercase; color:rgba(240,236,228,0.32); cursor:pointer; background:none; border:none; padding:0; font-family:inherit; transition:color 0.15s; }
  .ac-text-btn:hover { color:rgba(240,236,228,0.65); }

  /* Recurring banner */
  .ac-recurring-banner { border-radius:1rem; border:1px solid rgba(184,137,58,0.2); background:rgba(184,137,58,0.06); padding:1rem 1.25rem; margin-bottom:1.25rem; }
  .ac-recurring-chip { display:inline-flex; align-items:center; gap:0.35rem; border-radius:100px; border:1px solid rgba(184,137,58,0.3); background:rgba(184,137,58,0.12); padding:0.35rem 0.85rem; font-size:0.82rem; color:rgba(240,236,228,0.85); cursor:pointer; font-family:inherit; transition:background 0.15s; }
  .ac-recurring-chip:hover { background:rgba(184,137,58,0.22); }
  .ac-recur-icon { color:#b8893a; font-size:1rem; }

  /* Card */
  .ac-card { border-radius:1.25rem; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.025); padding:1.5rem 1.25rem; margin-bottom:1.5rem; }
  @media(min-width:640px){ .ac-card { padding:2rem; } }

  /* Nav */
  .ac-nav { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.75rem; }
  .ac-month-label { font-family:var(--font-display),"Barlow",system-ui,sans-serif; font-size:1.15rem; font-weight:700; letter-spacing:0.01em; color:rgba(240,236,228,0.92); }
  .ac-nav-btn { width:2.25rem; height:2.25rem; display:flex; align-items:center; justify-content:center; border-radius:50%; border:1px solid rgba(255,255,255,0.09); background:transparent; color:rgba(240,236,228,0.55); font-size:1.2rem; line-height:1; cursor:pointer; transition:background 0.15s,color 0.15s; }
  .ac-nav-btn:hover { background:rgba(255,255,255,0.07); color:rgba(240,236,228,0.9); }

  /* Weekdays */
  .ac-weekdays { display:grid; grid-template-columns:repeat(7,1fr); text-align:center; font-size:11px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase; color:rgba(240,236,228,0.28); margin-bottom:0.5rem; }
  .ac-weekdays>div { padding:0.3rem 0; }

  /* Grid */
  .ac-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:2px; }
  .ac-cell { aspect-ratio:1; border-radius:10px; border:none; background:transparent; padding:0; display:flex; flex-direction:column; align-items:center; justify-content:flex-start; cursor:default; overflow:hidden; padding-top:6px; }
  .ac-day { cursor:pointer; transition:background 0.15s; position:relative; }
  .ac-day:hover { background:rgba(255,255,255,0.04); }
  .ac-num { font-size:clamp(0.7rem,2vw,0.9rem); font-weight:400; color:rgba(240,236,228,0.72); line-height:1; width:1.9rem; height:1.9rem; display:flex; align-items:center; justify-content:center; border-radius:50%; flex-shrink:0; transition:background 0.15s,color 0.15s; }
  .ac-day.is-today .ac-num { background:#b8893a; color:#fff; font-weight:700; }
  .ac-day.is-past .ac-num { color:rgba(240,236,228,0.26); }
  .ac-day.is-past:hover { background:transparent; }
  .ac-pills { display:none; flex-direction:column; gap:2px; width:100%; padding:2px 3px; margin-top:2px; }
  @media(min-width:640px){ .ac-pills { display:flex; } }
  .ac-pill { display:block; width:100%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; border-radius:4px; background:rgba(184,137,58,0.22); border:none; padding:2px 5px; font-size:9px; color:rgba(240,236,228,0.88); text-align:left; cursor:pointer; font-family:inherit; transition:background 0.12s; }
  .ac-pill:hover { background:rgba(184,137,58,0.40); }
  .ac-pill-more { font-size:9px; color:rgba(240,236,228,0.35); padding:0 3px; }
  .ac-dot-mobile { display:block; width:4px; height:4px; border-radius:50%; background:#b8893a; margin-top:3px; flex-shrink:0; }
  @media(min-width:640px){ .ac-dot-mobile { display:none; } }
  .ac-day.is-today .ac-dot-mobile { background:rgba(255,255,255,0.6); }

  /* Upcoming */
  .ac-upcoming { display:flex; flex-direction:column; gap:1rem; }
  .ac-upcoming-head { display:flex; align-items:baseline; justify-content:space-between; }
  .ac-upcoming-title { font-family:var(--font-display),"Barlow",system-ui,sans-serif; font-size:1.5rem; font-weight:700; color:rgba(240,236,228,0.9); }
  .ac-upcoming-count { font-size:0.78rem; color:rgba(240,236,228,0.35); }
  .ac-list { display:flex; flex-direction:column; gap:0.5rem; }
  .ac-empty { color:rgba(240,236,228,0.38); font-size:0.875rem; padding:0.5rem 0; }
  .ac-empty-box { border-radius:1rem; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02); padding:2rem; text-align:center; color:rgba(240,236,228,0.35); font-size:0.875rem; }
  .ac-event-row { display:flex; align-items:center; gap:0.75rem; border-radius:1rem; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02); padding:0.85rem 1.1rem; text-align:left; cursor:pointer; width:100%; font-family:inherit; transition:background 0.15s; }
  .ac-event-row:hover { background:rgba(255,255,255,0.05); }
  .ac-event-thumb { width:3rem; height:3rem; border-radius:0.5rem; overflow:hidden; flex-shrink:0; }
  .ac-event-thumb img { width:100%; height:100%; object-fit:cover; }
  .ac-event-date-col { width:3rem; flex-shrink:0; text-align:center; }
  .ac-event-mon { font-size:10px; text-transform:uppercase; letter-spacing:0.15em; color:rgba(240,236,228,0.35); }
  .ac-event-day { font-family:var(--font-display),"Barlow",system-ui,sans-serif; font-size:1.6rem; font-weight:700; color:rgba(240,236,228,0.88); line-height:1; }
  .ac-event-info { flex:1; min-width:0; }
  .ac-event-title { font-weight:600; color:rgba(240,236,228,0.9); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; margin-bottom:0.15rem; }
  .ac-event-meta { font-size:0.8rem; color:rgba(240,236,228,0.42); }
  .ac-edit-hint { font-size:0.78rem; color:rgba(240,236,228,0.28); flex-shrink:0; }

  /* Submit */
  .ac-submit-btn { border-radius:0.6rem; border:1px solid rgba(255,255,255,0.14); background:rgba(255,255,255,0.10); padding:0.55rem 1.2rem; font-size:0.875rem; font-family:inherit; color:rgba(240,236,228,0.90); cursor:pointer; transition:background 0.15s; display:inline-flex; align-items:center; justify-content:center; }
  .ac-submit-btn:hover { background:rgba(255,255,255,0.16); }

  /* Drawer */
  .ac-backdrop { position:fixed; inset:0; background:rgba(0,0,0,0.60); backdrop-filter:blur(3px); z-index:40; }
  .ac-drawer { position:fixed; top:0; right:0; height:100%; width:100%; max-width:480px; background:#141414; border-left:1px solid rgba(255,255,255,0.07); z-index:50; display:flex; flex-direction:column; overflow-y:auto; }
  .ac-drawer-head { display:flex; align-items:center; justify-content:space-between; padding:1.25rem 1.5rem; border-bottom:1px solid rgba(255,255,255,0.07); position:sticky; top:0; background:#141414; }
  .ac-close-btn { font-size:1.5rem; line-height:1; color:rgba(240,236,228,0.35); background:none; border:none; cursor:pointer; padding:0.25rem; transition:color 0.15s; }
  .ac-close-btn:hover { color:rgba(240,236,228,0.75); }
  .ac-drawer-form { display:flex; flex-direction:column; gap:1.1rem; padding:1.5rem; flex:1; }
  .ac-field { display:flex; flex-direction:column; gap:0.4rem; }
  .ac-field-row { display:flex; gap:0.75rem; }
  .ac-field-label { font-size:10px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; color:rgba(240,236,228,0.38); margin-bottom:0.1rem; }
  .ac-field-input { width:100%; border-radius:0.6rem; border:1px solid rgba(255,255,255,0.09); background:rgba(0,0,0,0.35); padding:0.65rem 0.9rem; color:rgba(240,236,228,0.92); font-size:0.9375rem; outline:none; font-family:inherit; }
  .ac-field-input:focus { border-color:rgba(255,255,255,0.25); }
  .ac-field-input::placeholder { color:rgba(240,236,228,0.2); }
  input[type="datetime-local"].ac-field-input::-webkit-calendar-picker-indicator { filter:invert(1) opacity(0.3); cursor:pointer; }

  /* Photos */
  .ac-photo-grid { display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.25rem; }
  .ac-photo-thumb { position:relative; width:4rem; height:4rem; border-radius:0.5rem; overflow:hidden; border:1px solid rgba(255,255,255,0.1); }
  .ac-photo-thumb img { width:100%; height:100%; object-fit:cover; }
  .ac-photo-remove { position:absolute; top:2px; right:2px; width:1.25rem; height:1.25rem; border-radius:50%; background:rgba(0,0,0,0.7); border:none; color:#fff; font-size:0.8rem; cursor:pointer; display:flex; align-items:center; justify-content:center; line-height:1; padding:0; }

  /* Checkbox */
  .ac-checkbox-row { display:flex; align-items:center; gap:0.6rem; cursor:pointer; }
  .ac-checkbox-row input[type="checkbox"] { width:1rem; height:1rem; accent-color:#b8893a; cursor:pointer; }

  /* Scope box */
  .ac-scope-box {
    border-radius: 0.75rem;
    border: 1px solid rgba(184,137,58,0.25);
    background: rgba(184,137,58,0.07);
    padding: 0.9rem 1rem;
  }

  /* Recurring box */
  .ac-recur-box { border-radius:0.75rem; border:1px solid rgba(184,137,58,0.2); background:rgba(184,137,58,0.05); padding:1rem; display:flex; flex-direction:column; gap:0.75rem; }
  .ac-tag-row { display:flex; flex-wrap:wrap; gap:0.4rem; margin-top:0.4rem; }
  .ac-tag-btn { border-radius:100px; border:1px solid rgba(255,255,255,0.12); background:transparent; padding:0.3rem 0.7rem; font-size:0.78rem; color:rgba(240,236,228,0.6); cursor:pointer; font-family:inherit; transition:all 0.15s; }
  .ac-tag-btn:hover { border-color:rgba(255,255,255,0.25); color:rgba(240,236,228,0.85); }
  .ac-tag-btn.active { border-color:#b8893a; background:rgba(184,137,58,0.2); color:rgba(240,236,228,0.95); }
  .ac-recur-summary { font-size:0.82rem; color:#b8893a; padding:0.5rem 0 0; }

  /* Actions */
  .ac-error { color:rgba(248,113,113,0.8); font-size:0.875rem; }
  .ac-drawer-actions { display:flex; gap:0.75rem; margin-top:auto; padding-top:0.75rem; }
  .ac-delete-btn { flex:1; padding:0.75rem; border-radius:0.6rem; border:1px solid rgba(248,113,113,0.22); background:rgba(248,113,113,0.07); color:rgba(248,113,113,0.75); cursor:pointer; font-size:0.9rem; font-family:inherit; transition:background 0.15s; }
  .ac-delete-btn:hover { background:rgba(248,113,113,0.15); }
`;
