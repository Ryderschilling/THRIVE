"use client";

import { useEffect, useState } from "react";
import EventsCalendar from "./EventsCalendar";

const MEMBER_KEY = "thrive_member_email";

type FormState = {
  name: string;
  email: string;
  phone: string;
};

export default function EventsGate() {
  const [memberEmail, setMemberEmail] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(MEMBER_KEY);
    setMemberEmail(stored ?? null);
    setChecking(false);
  }, []);

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/events/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim() || null,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong");
      }

      localStorage.setItem(MEMBER_KEY, form.email.trim().toLowerCase());
      setMemberEmail(form.email.trim().toLowerCase());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
    } finally {
      setSubmitting(false);
    }
  }

  // Still checking localStorage — avoid flash
  if (checking) return null;

  // Already registered — show calendar
  if (memberEmail) return <EventsCalendar />;

  // Gate — show signup form
  return (
    <div className="mx-auto max-w-md space-y-8 py-8">
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-[0.32em] text-white/55">
          Join the group
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-white/95">
          Get access to the calendar
        </h2>
        <p className="text-white/65">
          Drop your info and you&apos;re in. Josh will have your number when
          it&apos;s time to send out a reminder.
        </p>
      </div>

      <form onSubmit={handleJoin} className="space-y-4">
        <Field label="Your name">
          <input
            required
            type="text"
            autoComplete="name"
            placeholder="First Last"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="thrive-gate-input"
          />
        </Field>

        <Field label="Email">
          <input
            required
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="thrive-gate-input"
          />
        </Field>

        <Field label="Phone number">
          <input
            type="tel"
            autoComplete="tel"
            placeholder="(optional — for text reminders later)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="thrive-gate-input"
          />
        </Field>

        {error ? (
          <div className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300/90">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl border border-white/15 bg-white/10 py-3.5 text-sm font-medium text-white/90 transition hover:bg-white/15 disabled:opacity-50"
        >
          {submitting ? "Getting you in…" : "View the calendar →"}
        </button>
      </form>

      <style>{`
        .thrive-gate-input {
          width: 100%;
          border-radius: 0.625rem;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(0,0,0,0.40);
          padding: 0.75rem 1rem;
          color: rgba(255,255,255,0.92);
          outline: none;
          font-size: 0.9375rem;
        }
        .thrive-gate-input::placeholder { color: rgba(255,255,255,0.30); }
        .thrive-gate-input:focus { border-color: rgba(255,255,255,0.30); }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">
        {label}
      </span>
      {children}
    </label>
  );
}
