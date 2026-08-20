"use client";

import { useState } from "react";

const INTERESTS = [
  "A morning formation",
  "The monthly brotherhood dinner",
  "The business & faith roundtable",
  "A retreat",
  "Coaching with Josh",
  "Not sure yet, just want in",
];

const SOURCES = [
  "A friend in the brotherhood",
  "Met Josh in person",
  "Instagram or social",
  "Search",
  "Church",
  "Other",
];

export default function JoinForm({
  source = "join",
  compact = false,
}: {
  source?: string;
  compact?: boolean;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    setError(null);
    setState("sending");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      interest: String(fd.get("interest") || ""),
      found: String(fd.get("found") || ""),
      message: String(fd.get("message") || ""),
      source,
    };

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Try again.");
      }
      setState("done");
    } catch (err) {
      setState("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  }

  if (state === "done") {
    return (
      <div className={`t-form${compact ? "" : " wide"}`}>
        <div className="t-form-ok">
          You are in. Josh reads every one of these himself and will reply with the
          next gathering that fits you.
        </div>
      </div>
    );
  }

  return (
    <form className={`t-form${compact ? "" : " wide"}`} onSubmit={onSubmit} noValidate>
      <div className="t-form-row">
        <input name="name" type="text" placeholder="First and last name" required autoComplete="name" />
        <input name="email" type="email" placeholder="Email address" required autoComplete="email" />
      </div>

      <div className="t-form-row">
        <input name="phone" type="tel" placeholder="Phone (optional)" autoComplete="tel" />
        <select name="interest" defaultValue="">
          <option value="" disabled>
            What are you drawn to?
          </option>
          {INTERESTS.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </div>

      <select name="found" defaultValue="">
        <option value="" disabled>
          How did you find THRIVE?
        </option>
        {SOURCES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      {!compact && (
        <textarea
          name="message"
          placeholder="Anything you want Josh to know? Optional, and nobody else reads it."
        />
      )}

      <button type="submit" className="t-form-submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending..." : "Send it to Josh →"}
      </button>

      {error && (
        <div className="t-form-foot" style={{ color: "var(--c-gold-lift)" }}>
          {error}
        </div>
      )}
      <div className="t-form-foot">
        No spam, no sales sequence. A real reply from a real person.
      </div>
    </form>
  );
}
