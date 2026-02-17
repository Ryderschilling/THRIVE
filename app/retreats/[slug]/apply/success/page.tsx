import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/site/Section";
import { retreats } from "@/content/retreats";

function normalizeSlug(v: unknown) {
  try {
    return decodeURIComponent(String(v)).trim().toLowerCase();
  } catch {
    return String(v).trim().toLowerCase();
  }
}

export default function RetreatApplySuccessPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = normalizeSlug(params.slug);
  const retreat = retreats.find((r) => normalizeSlug(r.slug) === slug);

  if (!retreat) return notFound();

  return (
    <Section>
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <div className="text-xs uppercase tracking-[0.32em] text-white/60">
            Submission received
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-white/95">
            Thank you.
          </h1>
          <p className="mx-auto max-w-[60ch] text-white/75 leading-relaxed">
            We’re looking forward to seeing you at the {retreat.title}. If you
            have any questions, reach out anytime.
          </p>
        </div>

        <div className="rounded-3xl border border-white/12 bg-white/[0.03] p-6 md:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href={`/retreats/${retreat.slug}`}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-transparent px-6 py-3 text-sm tracking-wide text-white/80 hover:bg-white/5 transition"
            >
              Back to retreat
            </Link>

            <Link
              href="/retreats"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm tracking-wide text-white/90 hover:bg-white/15 transition"
            >
              View all retreats
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}