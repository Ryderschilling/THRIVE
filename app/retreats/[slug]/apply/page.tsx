"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Section from "@/components/site/Section";
import { retreats } from "@/content/retreats";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function normalizeSlug(v: unknown) {
  return decodeURIComponent(String(v)).trim().toLowerCase();
}

const stripePromise =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    : null;

type FormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  whyJoin: string;
};

function FormShell({
  slug,
  withStripe,
  stripe,
  elements,
}: {
  slug: string;
  withStripe: boolean;
  stripe?: ReturnType<typeof useStripe>;
  elements?: ReturnType<typeof useElements>;
}) {
  const router = useRouter();

  const retreat = useMemo(() => {
    return retreats.find((r) => normalizeSlug(r.slug) === normalizeSlug(slug));
  }, [slug]);

  const [donation, setDonation] = useState<string>("");

  const donationCents = (() => {
    const raw = donation.trim();
    if (!raw) return 0;
    const n = Number(raw);
    if (!Number.isFinite(n) || n <= 0) return 0;
    return Math.round(n * 100);
  })();

  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    address: "",
    whyJoin: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!retreat) {
    return (
      <Section>
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <div className="text-xs uppercase tracking-[0.32em] text-white/60">Not found</div>
          <h1 className="font-display text-4xl md:text-5xl text-white/95">Signup unavailable</h1>
          <Link
            href="/retreats"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm tracking-wide text-white/90 hover:bg-white/15 transition"
          >
            Back to retreats
          </Link>
        </div>
      </Section>
    );
  }

  const retreatSlug = retreat.slug;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (withStripe && donationCents > 0) {
        if (!stripe || !elements) {
          throw new Error("Payments are not ready. Please refresh and try again.");
        }
      }

      router.push(`/retreats/${retreatSlug}/apply/received`);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section>
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.32em] text-white/60">Signup</div>
            <h1 className="font-display text-3xl md:text-5xl text-white/95">{retreat.title}</h1>
          </div>
          <Link
            href={`/retreats/${retreat.slug}/gallery`}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-transparent px-5 py-2.5 text-sm tracking-wide text-white/80 hover:bg-white/5 transition"
          >
            Back
          </Link>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-white/12 bg-white/[0.03] p-6 md:p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2">
              <div className="text-xs uppercase tracking-[0.24em] text-white/60">Name</div>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white/90 outline-none focus:border-white/25"
                required
              />
            </label>

            <label className="space-y-2">
              <div className="text-xs uppercase tracking-[0.24em] text-white/60">Phone</div>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white/90 outline-none focus:border-white/25"
                required
              />
            </label>

            <label className="space-y-2">
              <div className="text-xs uppercase tracking-[0.24em] text-white/60">Email</div>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white/90 outline-none focus:border-white/25"
                required
              />
            </label>

            <label className="space-y-2">
              <div className="text-xs uppercase tracking-[0.24em] text-white/60">Address</div>
              <input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white/90 outline-none focus:border-white/25"
              />
            </label>
          </div>

          <label className="space-y-2 block">
            <div className="text-xs uppercase tracking-[0.24em] text-white/60">
              What are you looking forward to most?
            </div>
            <textarea
              value={form.whyJoin}
              onChange={(e) => setForm({ ...form, whyJoin: e.target.value })}
              className="w-full min-h-[120px] resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white/90 outline-none focus:border-white/25"
              required
            />
          </label>

          <label className="space-y-2 block">
            <div className="text-xs uppercase tracking-[0.24em] text-white/60">Donation amount</div>
            <div className="flex items-center gap-3">
              <span className="text-white/70">$</span>
              <input
                inputMode="decimal"
                placeholder="Donation"
                value={donation}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "" || /^[0-9]*\.?[0-9]*$/.test(v)) setDonation(v);
                }}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white/90 outline-none focus:border-white/25 placeholder:text-white/35"
              />
            </div>
          </label>

          {withStripe && donationCents > 0 && (
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-[0.24em] text-white/60">Card</div>
              <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
              <CardElement
  options={{
    hidePostalCode: true,
    style: {
      base: {
        color: "#ffffff",
        fontFamily: "inherit",
        fontSize: "16px",
        "::placeholder": {
          color: "rgba(255,255,255,0.4)",
        },
      },
      invalid: {
        color: "#f87171",
      },
    },
  }}
/>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm tracking-wide text-white/90 hover:bg-white/15 transition disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </Section>
  );
}

function InnerFormWithStripe({ slug }: { slug: string }) {
  const stripe = useStripe();
  const elements = useElements();
  return <FormShell slug={slug} withStripe stripe={stripe} elements={elements} />;
}

function InnerFormNoStripe({ slug }: { slug: string }) {
  return <FormShell slug={slug} withStripe={false} />;
}

export default function RetreatApplyPage() {
  const params = useParams();
  const slug = normalizeSlug((params as any)?.slug);

  if (!stripePromise) {
    return <InnerFormNoStripe slug={slug} />;
  }

  return (
    <Elements stripe={stripePromise}>
      <InnerFormWithStripe slug={slug} />
    </Elements>
  );
}