"use client";

import { useEffect, useState } from "react";

type EventItem = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  startAt: string;
  endAt: string | null;
};

type MemberItem = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  createdAt: string;
};

const TOKEN_KEY = "thrive_admin_token";
type Tab = "events" | "members";

function toLocalInputValue(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function AdminEventsClient() {
  const [token, setToken] = useState<string>("");
  const [tokenInput, setTokenInput] = useState<string>("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("events");

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [members, setMembers] = useState<MemberItem[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);

  const now = new Date();
  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
    startAt: toLocalInputValue(new Date(now.getTime() + 60 * 60 * 1000)),
    endAt: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : "";
    if (t) {
      setToken(t);
      setTokenInput(t);
    }
  }, []);

  async function fetchEvents(withToken: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/events", {
        headers: { "x-admin-token": withToken },
        cache: "no-store",
      });
      if (res.status === 401) {
        setAuthed(false);
        setError("Unauthorized — check your admin token.");
        setEvents([]);
        return;
      }
      if (!res.ok) throw new Error("load failed");
      const data = await res.json();
      setEvents(data.events ?? []);
      setAuthed(true);
    } catch {
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchMembers(withToken: string) {
    setMembersLoading(true);
    try {
      const res = await fetch("/api/admin/event-members", {
        headers: { "x-admin-token": withToken },
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = await res.json();
      setMembers(data.members ?? []);
    } catch {
      // silent — members list is secondary
    } finally {
      setMembersLoading(false);
    }
  }

  async function deleteMember(id: string) {
    if (!confirm("Remove this member?")) return;
    try {
      await fetch("/api/admin/event-members", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({ id }),
      });
      setMembers((m) => m.filter((x) => x.id !== id));
    } catch {
      // silent
    }
  }

  useEffect(() => {
    if (token) {
      fetchEvents(token);
      fetchMembers(token);
    }
  }, [token]);

  function saveToken() {
    const t = tokenInput.trim();
    if (!t) return;
    localStorage.setItem(TOKEN_KEY, t);
    setToken(t);
  }

  function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setTokenInput("");
    setAuthed(false);
    setEvents([]);
  }

  async function createEvent(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setNotice(null);
    try {
      const payload = {
        title: form.title,
        location: form.location || null,
        description: form.description || null,
        startAt: form.startAt ? new Date(form.startAt).toISOString() : null,
        endAt: form.endAt ? new Date(form.endAt).toISOString() : null,
      };
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Create failed");
      }
      setNotice("Event added.");
      setForm({
        title: "",
        location: "",
        description: "",
        startAt: toLocalInputValue(new Date(Date.now() + 60 * 60 * 1000)),
        endAt: "",
      });
      fetchEvents(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add event.");
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteEvent(id: string) {
    if (!confirm("Delete this event?")) return;
    setError(null);
    setNotice(null);
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      if (!res.ok) throw new Error("Delete failed");
      setNotice("Event deleted.");
      fetchEvents(token);
    } catch {
      setError("Failed to delete event.");
    }
  }

  if (!token) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-4">
        <div className="font-display text-xl text-white/95">Sign in</div>
        <p className="text-white/65 text-sm">
          Enter the admin access token to manage events.
        </p>
        <div className="flex gap-2">
          <input
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="admin token"
            className="flex-1 rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-white/90 outline-none focus:border-white/30"
          />
          <button
            onClick={saveToken}
            className="rounded-lg border border-white/15 bg-white/10 px-5 py-2.5 text-sm text-white/90 hover:bg-white/15"
          >
            Continue
          </button>
        </div>
        {error ? <div className="text-sm text-red-300/80">{error}</div> : null}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between text-sm text-white/55">
        <div>
          Signed in {authed ? "✓" : "…"}
        </div>
        <button
          onClick={clearToken}
          className="text-xs uppercase tracking-[0.22em] hover:text-white/85"
        >
          Sign out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
        {(["events", "members"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              "flex-1 rounded-lg py-2 text-sm capitalize transition",
              tab === t
                ? "bg-white/10 text-white/90"
                : "text-white/50 hover:text-white/75",
            ].join(" ")}
          >
            {t === "members" ? `Members (${members.length})` : "Events"}
          </button>
        ))}
      </div>

      {tab === "members" ? (
        <MembersPanel
          members={members}
          loading={membersLoading}
          onDelete={deleteMember}
        />
      ) : null}

      {tab !== "events" ? null : (
      <>
      {/* Add form */}
      <form
        onSubmit={createEvent}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-5"
      >
        <div className="font-display text-xl text-white/95">New event</div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title">
            <input
              required
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="thrive-input"
            />
          </Field>
          <Field label="Location">
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="thrive-input"
              placeholder="optional"
            />
          </Field>
          <Field label="Starts">
            <input
              required
              type="datetime-local"
              value={form.startAt}
              onChange={(e) => setForm({ ...form, startAt: e.target.value })}
              className="thrive-input"
            />
          </Field>
          <Field label="Ends">
            <input
              type="datetime-local"
              value={form.endAt}
              onChange={(e) => setForm({ ...form, endAt: e.target.value })}
              className="thrive-input"
            />
          </Field>
        </div>

        <Field label="Description">
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="thrive-input resize-y"
            placeholder="optional"
          />
        </Field>

        <div className="flex items-center justify-between gap-4">
          <div className="text-sm">
            {error ? <span className="text-red-300/80">{error}</span> : null}
            {notice ? <span className="text-emerald-300/80">{notice}</span> : null}
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg border border-white/15 bg-white/10 px-5 py-2.5 text-sm text-white/90 hover:bg-white/15 disabled:opacity-50"
          >
            {submitting ? "Adding…" : "Add event"}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl text-white/95">All events</h2>
          <div className="text-sm text-white/55">{events.length} total</div>
        </div>

        {loading ? (
          <div className="text-white/55">Loading…</div>
        ) : events.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-white/60">
            No events yet.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.22em] text-white/50">
                <tr className="border-b border-white/10">
                  <th className="px-5 py-4">When</th>
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4" />
                </tr>
              </thead>
              <tbody className="text-white/80">
                {events.map((e) => {
                  const start = new Date(e.startAt);
                  return (
                    <tr key={e.id} className="border-b border-white/10 align-top">
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div>{start.toLocaleDateString()}</div>
                        <div className="text-white/55">
                          {start.toLocaleTimeString(undefined, {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div>{e.title}</div>
                        {e.description ? (
                          <div className="text-white/55 text-xs mt-1 whitespace-pre-wrap">
                            {e.description}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-5 py-4 text-white/70">
                        {e.location ?? "—"}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => deleteEvent(e.id)}
                          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/75 hover:bg-white/5"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        .thrive-input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(0,0,0,0.40);
          padding: 0.625rem 0.875rem;
          color: rgba(255,255,255,0.92);
          outline: none;
        }
        .thrive-input:focus { border-color: rgba(255,255,255,0.30); }
      `}</style>
      </>
      )}
    </div>
  );
}

function MembersPanel({
  members,
  loading,
  onDelete,
}: {
  members: MemberItem[];
  loading: boolean;
  onDelete: (id: string) => void;
}) {
  if (loading) return <div className="text-white/55">Loading members…</div>;

  if (members.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-white/60">
        No members yet — they&apos;ll appear here after signing up on the Events page.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-[0.22em] text-white/50">
          <tr className="border-b border-white/10">
            <th className="px-5 py-4">Name</th>
            <th className="px-5 py-4">Email</th>
            <th className="px-5 py-4">Phone</th>
            <th className="px-5 py-4">Joined</th>
            <th className="px-5 py-4" />
          </tr>
        </thead>
        <tbody className="text-white/80">
          {members.map((m) => (
            <tr key={m.id} className="border-b border-white/10 align-middle">
              <td className="px-5 py-4">{m.name}</td>
              <td className="px-5 py-4 text-white/70">{m.email}</td>
              <td className="px-5 py-4 text-white/70">{m.phone ?? "—"}</td>
              <td className="px-5 py-4 text-white/55 text-xs whitespace-nowrap">
                {new Date(m.createdAt).toLocaleDateString()}
              </td>
              <td className="px-5 py-4 text-right">
                <button
                  onClick={() => onDelete(m.id)}
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/75 hover:bg-white/5"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
