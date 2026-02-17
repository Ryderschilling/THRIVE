import Link from "next/link";
import Section from "@/components/site/Section";
import { getRetreatBySlug } from "@/content/retreats";

function normalizeSlug(v: unknown) {
  try {
    return decodeURIComponent(String(v)).trim().toLowerCase();
  } catch {
    return String(v).trim().toLowerCase();
  }
}

export default async function ReceivedPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await props.params;

  const slug = normalizeSlug(rawSlug);
  const retreat = getRetreatBySlug(slug);
  const backSlug = retreat?.slug ?? slug;

  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center space-y-6 py-10 md:py-12">
        <div className="text-xs uppercase tracking-[0.32em] text-white/60">
          Request received
        </div>

        <h1 className="font-display text-4xl md:text-5xl text-white/95">
          Thank you.
        </h1>

        <p className="text-white/70 leading-relaxed">
          We’re looking forward to seeing you at {retreat?.title ?? "the retreat"}.
          Josh will reach out with next steps and details.
        </p>

        <div className="pt-2">
          <Link
            href={`/retreats/${encodeURIComponent(backSlug)}/gallery`}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm tracking-wide text-white/90 hover:bg-white/15 transition"
          >
            Back to gallery
          </Link>
        </div>
      </div>
    </Section>
  );
}