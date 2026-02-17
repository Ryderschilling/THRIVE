"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import Section from "@/components/site/Section";
import { getRetreatBySlug } from "@/content/retreats";

function normalizeSlug(v: unknown) {
  return decodeURIComponent(String(v)).trim().toLowerCase();
}

export default function RetreatGalleryPage() {
  const params = useParams();
  const slug = normalizeSlug((params as any)?.slug);

  const retreat = useMemo(() => {
    return getRetreatBySlug(slug);
  }, [slug]);

  if (!retreat) {
    return (
      <Section>
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <div className="text-xs uppercase tracking-[0.32em] text-white/60">Not found</div>
          <h1 className="font-display text-4xl md:text-5xl text-white/95">Gallery unavailable</h1>
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

  return (
    <Section>
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="font-display text-3xl md:text-5xl text-white/95">{retreat.title}</h1>
          </div>

          <div className="flex gap-3">
            <Link
              href="/retreats"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-transparent px-5 py-2.5 text-sm tracking-wide text-white/80 hover:bg-white/5 transition"
            >
              Back
            </Link>
            <Link
              href={`/retreats/${retreat.slug}/apply`}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm tracking-wide text-white/90 hover:bg-white/15 transition"
            >
              Sign up
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />

          <div
            className="flex gap-6 overflow-x-auto pb-6 pt-6 px-6 rounded-3xl border border-white/10 bg-white/[0.02]"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {retreat.galleryImages.map((src, idx) => (
              <div
                key={`${src}-${idx}`}
                className="shrink-0 w-[78vw] sm:w-[54vw] md:w-[38vw]"
                style={{ scrollSnapAlign: "center" }}
              >
                <div
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/20"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={src}
                      alt={`Retreat gallery image ${idx + 1}`}
                      className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/65" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Retreat Description */}
        <div className="mx-auto max-w-4xl pt-12">
          <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.05] px-8 py-10 md:px-12 md:py-14">
            {/* subtle glass glow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-transparent" />
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[70%] -translate-x-1/2 rounded-full bg-white/[0.08] blur-3xl" />

            <div className="relative mx-auto max-w-[68ch]">
              {/* Editorial label */}
              <div className="mb-8 text-[11px] uppercase tracking-[0.32em] text-white/55">Retreat Overview</div>

              {/* Paragraphs */}
              <div className="space-y-7 text-[15.5px] leading-[1.9] text-white/80 md:text-[16.5px]">
                {/* Drop-cap paragraph */}
                <p>
                  <span className="float-left mr-3 mt-1 font-display text-[56px] leading-none text-white/90">T</span>
                  he THRIVE Retreat is a gathering designed for Christian entrepreneurs and businessmen seeking
                  spiritual renewal, personal growth, and meaningful connection with like-minded brothers.
                </p>

                <p>
                  Set in Santa Rosa Beach, Florida (30A), this two-night experience is intentionally crafted to create
                  space for rest, reflection, and alignment with God’s purpose—both personally and professionally.
                  While rooted in the local THRIVE community, men will be joining from across the country, creating a
                  unique and divinely aligned intersection of faith, leadership, and brotherhood.
                </p>

                <p>
                  Throughout the retreat, attendees will experience a balance of structured formation and unhurried
                  presence. The itinerary includes times of worship, shared meals, group workshops, prayer and
                  prophetic ministry, as well as relaxed moments at the beach and pool. Recreational activities such as
                  pickleball, beach bonfires, and intentional downtime are woven in to foster authentic connection and
                  conversation.
                </p>

                <p>
                  Every detail is designed to support depth, responsibility, and kingdom-minded impact—creating an
                  environment where men can be refreshed, encouraged, and strengthened in Christ alongside other
                  leaders walking a similar path.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}