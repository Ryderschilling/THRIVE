"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Section from "@/components/site/Section";
import { retreats } from "@/content/retreats";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function normalizeSlug(v: unknown) {
  return decodeURIComponent(String(v))
    .trim()
    .toLowerCase()
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, "-")
    .replace(/[\u200B-\u200D\uFEFF]/g, "");
}

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  why: string;
};

const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
const stripePromise =
  pk.startsWith("pk_test_") || pk.startsWith("pk_live_") ? loadStripe(pk) : null;

function dollarsToCents(v: string) {
  const n = Number(String(v || "").replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.round(n * 100);
}

function InnerForm({ slug }: { slug: string }) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const retreat = useMemo(
    () => retreats.find((r) => normalizeSlug(r.slug) === slug),
    [slug]
  );

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    address: "",
    about: "",
    why: "",
  });

  const [amount, setAmount] = useState<string>("100");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setBusy(true);

      const amountCents = dollarsToCents(amount);

      let paymentIntentId: string | undefined;
      let paymentStatus: string | undefined;

      // Optional inline payment
      if (amountCents > 0) {
        if (!stripe || !elements) {
          throw new Error("Payments are still loading. Try again in a second.");
        }

        const card = elements.getElement(CardElement);
        if (!card) throw new Error("Card input is not ready.");

        const piRes = await fetch(
          `/api/retreats/${encodeURIComponent(slug)}/payment-intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amountCents, email: form.email || undefined }),
          }
        );

        const piData = await piRes.json();
        if (!piRes.ok) throw new Error(piData?.error || "Failed to create payment.");

        const clientSecret = String(piData?.clientSecret || "");
        if (!clientSecret) throw new Error("Missing Stripe client secret.");

        const confirm = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card,
              billing_details: {
                name: form.name,
                email: form.email,
                phone: form.phone,
              },
            },
          },
          { handleActions: true }
        );

        if (confirm.error) {
          throw new Error(confirm.error.message || "Payment failed.");
        }

        if (confirm.paymentIntent?.status !== "succeeded") {
          throw new Error(`Payment not completed (status: ${confirm.paymentIntent?.status}).`);
        }

        paymentIntentId = confirm.paymentIntent.id;
        paymentStatus = confirm.paymentIntent.status;
      }

      // Save signup
      const res = await fetch(`/api/retreats/${encodeURIComponent(slug)}/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paymentIntentId,
          paymentAmountCents: amountCents > 0 ? amountCents : undefined,
          paymentCurrency: amountCents > 0 ? "usd" : undefined,
          paymentStatus: paymentStatus,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to submit.");

      router.push(`/retreats/${slug}/apply/received`);
    } catch (e: any) {
      setError(e?.message || "Submission failed.");
    } finally {
      setBusy(false);
    }
  };

  if (!retreat) {
    return (
      <Section>
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <div className="text-xs uppercase tracking-[0.32em] text-white/60">
            Retreat not found
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-white/95">
            This link doesn’t match a published retreat.
          </h1>
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section>
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="text-xs uppercase tracking-[0.32em] text-white/60">Sign up</div>
          <h1 className="font-display text-4xl md:text-5xl text-white/95">
            {retreat.title}
          </h1>
          <p className="text-white/65">
            Enter your information. Optional: add a donation and pay securely below (inline).
          </p>
        </div>
      </Section>

      <Section tone="soft">
        <div className="mx-auto max-w-4xl -mt-50 md:-mt-70">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur">
            <form onSubmit={onSubmit} className="space-y-6">
<div className="grid gap-4 md:grid-cols-2">
  <div className="space-y-4">
    <input
      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/90 placeholder:text-white/35"
      placeholder="Name"
      value={form.name}
      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
      required
    />
    <input
      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/90 placeholder:text-white/35"
      placeholder="Email"
      type="email"
      value={form.email}
      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
      required
    />
  </div>

  <div className="space-y-4">
    <input
      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/90 placeholder:text-white/35"
      placeholder="Phone"
      value={form.phone}
      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
      required
    />
    <input
      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/90 placeholder:text-white/35"
      placeholder="Address"
      value={form.address}
      onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
      required
    />
  </div>
</div>

              <textarea
                className="min-h-[110px] w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/90 placeholder:text-white/35"
                placeholder="About you"
                value={form.about}
                onChange={(e) => setForm((p) => ({ ...p, about: e.target.value }))}
                required
              />

              <textarea
                className="min-h-[110px] w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/90 placeholder:text-white/35"
                placeholder="Why would you like to join?"
                value={form.why}
                onChange={(e) => setForm((p) => ({ ...p, why: e.target.value }))}
                required
              />

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-4">
                <div className="text-xs uppercase tracking-[0.32em] text-white/60 text-center">
                  Optional donation
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white/40 text-sm">
                      $
                    </div>
                    <input
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-12 pr-4 py-3 text-white/90 placeholder:text-white/35"
                      placeholder="Amount (optional)"
                      inputMode="decimal"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <CardElement
                    options={{
                      hidePostalCode: true,
                      style: {
                        base: {
                          color: "rgba(255,255,255,0.9)",
                          fontSize: "16px",
                          "::placeholder": { color: "rgba(255,255,255,0.35)" },
                        },
                        invalid: { color: "rgba(248,113,113,0.95)" },
                      },
                    }}
                  />
                </div>

                <div className="text-xs text-white/45">
                  Some banks may require an in-page verification step.
                </div>
              </div>

              {error ? (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm tracking-wide text-white/90 hover:bg-white/15 transition disabled:opacity-60"
              >
                {busy ? "Submitting…" : "Submit"}
              </button>

              <p className="text-center text-xs text-white/45">
                Your request is saved internally so Josh can see who signed up.
              </p>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}

export default function RetreatApplyPage() {
  const params = useParams();
  const slug = normalizeSlug(params?.slug);

  // If Stripe isn't configured, allow submissions (no payments)
  if (!stripePromise) {
    return <InnerForm slug={slug} />;
  }

  return (
    <Elements stripe={stripePromise}>
      <InnerForm slug={slug} />
    </Elements>
  );
}