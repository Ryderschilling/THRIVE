import Section from "@/components/site/Section";
import { retreats, pastRetreats } from "@/content/retreats";
import { OfferingCard } from "@/components/offerings/OfferingCard";

function formatDateRange(startISO: string, endISO: string) {
  const start = new Date(startISO + "T00:00:00");
  const end = new Date(endISO + "T00:00:00");
  const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
  const fmtYear = new Intl.DateTimeFormat("en-US", { year: "numeric" });

  return `${fmt.format(start)} — ${fmt.format(end)}, ${fmtYear.format(end)}`;
}

export default function RetreatsPage() {
  const featured = retreats[0];

  return (
    <>
      <Section>
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <div className="text-xs uppercase tracking-[0.32em] text-white/60">
            Retreats
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-white/95">
            Join the first ever THRIVE retreat!
          </h1>
          <p className="text-white/65">
            THRIVE retreats are the perfect way to join a great group of christian men. We will dive deep into the word and community to grow closer to gether.
          </p>
        </div>
      </Section>

<Section tone="soft">
  <div className="mx-auto max-w-4xl -mt-20 md:-mt-40">
    <div className="grid gap-4 md:grid-cols-1">
      <OfferingCard
              title={featured.title}
              image={featured.coverImage || "/images/hero-palm.JPG"}
              metaTop={featured.locationLabel}
              metaBottom={`${formatDateRange(featured.dateStart, featured.dateEnd)} · ${featured.nightsLabel}`}
              badge={featured.status}
              spots={`${featured.spotsRemaining} of ${featured.spotsTotal} spots remaining`}
              href={`/retreats/${featured.slug}/gallery`}
              ctaLabel="Learn more"
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-5xl text-center space-y-8">
          <div className="space-y-2">
            <h2 className="font-display text-2xl md:text-3xl text-white/92">
              Previous retreats
            </h2>
            <p className="text-white/60">
              A glimpse into the environments we’ve built and the kind of depth we pursue.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {pastRetreats.map((r) => (
              <div
                key={r.title}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* simple image background */}
                  {/* using next/image via plain img keeps this file server-only; ok for now */}
                  {typeof r.image === "string" && r.image.trim().length > 0 ? (
                    <img
                      src={r.image}
                      alt={r.title}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />
                </div>

                <div className="px-5 py-5 text-center space-y-1">
                  <div className="text-xs uppercase tracking-[0.32em] text-white/55">
                    {r.locationLabel} · {r.dateLabel}
                  </div>
                  <div className="font-display text-lg text-white/90">{r.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}