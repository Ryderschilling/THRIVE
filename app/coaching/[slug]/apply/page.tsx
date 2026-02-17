"use client";

import Section from "@/components/site/Section";
import { coachingProducts } from "@/content/coaching";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createCoachingRequest } from "@/src/actions/inquiries";

export default function CoachingApplyPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const product = useMemo(() => {
    if (!slug) return null;
    return coachingProducts.find((p) => p.slug === slug) || null;
  }, [slug]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    about: "",
    why: "",
  });

  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

  if (!product) {
    return (
      <Section>
        <div className="mx-auto max-w-xl text-center space-y-4">
          <div className="text-xs uppercase tracking-[0.32em] text-white/70">
            Not found
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-white">
            This coaching link doesn’t match a published offering.
          </h1>
          <button
            onClick={() => router.push("/coaching")}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/80 hover:bg-white/10"
          >
            Back to coaching
          </button>
        </div>
      </Section>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setError("");
  
if (!product) {
    setError("This coaching offer could not be found. Please go back and try again.");
    setState("error");
    return;
  }
  
  try {
    await createCoachingRequest({
        productSlug: product.slug,
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        about: form.about,
        why: form.why,
      });

      setState("success");
    } catch (err: any) {
      setState("error");
      setError(err?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center space-y-4">
        <div className="text-xs uppercase tracking-[0.32em] text-white/70">
          Request to join
        </div>
        <h1 className="font-display text-3xl md:text-5xl text-white">
          {product.title}
        </h1>
        <p className="text-white/65">
          By invitation only. If accepted, we’ll reach out with pricing, scheduling,
          and next steps.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          {state === "success" ? (
            <div className="text-center space-y-3">
              <div className="text-xs uppercase tracking-[0.32em] text-white/70">
                Received
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-white">
                Thank you for your interest.
              </h2>
              <p className="text-white/65">
                We’ll reach out when it’s time to schedule and book your coaching.
              </p>
              <button
                onClick={() => router.push("/coaching")}
                className="mt-4 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm text-white hover:bg-white/15"
              >
                Back to coaching
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <div className="text-sm text-white/70">Name</div>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-white/20"
                    placeholder="Your full name"
                  />
                </label>

                <label className="space-y-2">
                  <div className="text-sm text-white/70">Email</div>
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    type="email"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-white/20"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="space-y-2">
                  <div className="text-sm text-white/70">Phone</div>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-white/20"
                    placeholder="(xxx) xxx-xxxx"
                  />
                </label>

                <label className="space-y-2">
                  <div className="text-sm text-white/70">Address</div>
                  <input
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-white/20"
                    placeholder="City, State"
                  />
                </label>
              </div>

              <label className="space-y-2 block">
                <div className="text-sm text-white/70">About you</div>
                <textarea
                  value={form.about}
                  onChange={(e) => setForm({ ...form, about: e.target.value })}
                  required
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-white/20"
                  placeholder="Tell us a little about you."
                />
              </label>

              <label className="space-y-2 block">
                <div className="text-sm text-white/70">Why do you want to join?</div>
                <textarea
                  value={form.why}
                  onChange={(e) => setForm({ ...form, why: e.target.value })}
                  required
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-white/20"
                  placeholder="What are you hoping to get out of this?"
                />
              </label>

              {state === "error" ? (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <button
                disabled={state === "submitting"}
                className="w-full rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm text-white hover:bg-white/15 disabled:opacity-60"
              >
                {state === "submitting" ? "Submitting..." : "Submit request"}
              </button>

              <div className="text-center text-xs text-white/50">
                By invitation only. If accepted, we’ll email scheduling and pricing.
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}