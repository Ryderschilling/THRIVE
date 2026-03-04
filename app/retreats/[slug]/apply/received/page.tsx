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
          Donation Received
        </div>

        <h1 className="font-display text-4xl md:text-5xl text-white/95">
          Thank you!!
        </h1>
      </div>
    </Section>
  );
}