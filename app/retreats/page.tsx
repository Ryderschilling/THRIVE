import Section from "@/components/site/Section";
import { retreats } from "@/content/retreats";
import RetreatWideCard from "@/components/retreats/RetreatWideCard";

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
        <div className="mx-auto max-w-3xl text-center space-y-5">
          <div className="text-xs uppercase tracking-[0.32em] text-white/60">
            Retreats
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-white/95">
            Upcoming retreats
          </h1>
          <p className="text-white/65">
            Quiet, focused gatherings for Christian businessmen pursuing depth,
            brotherhood, and kingdom impact.
          </p>
        </div>
      </Section>

      <Section tone="soft">
        <div className="mx-auto max-w-6xl space-y-6">
          <RetreatWideCard
            title={featured.title}
            image={featured.coverImage}
            location={featured.locationLabel}
            dateLine={`${formatDateRange(featured.dateStart, featured.dateEnd)} · ${featured.nightsLabel}`}
            status={featured.status}
            spotsLine={`${featured.spotsRemaining} of ${featured.spotsTotal} spots remaining`}
            summary={featured.summary}
            href={`/retreats/${featured.slug}`}
            ctaLabel="Learn more"
          />

          <RetreatWideCard
            title="Brotherhood + Coastal Reset"
            image="/images/retreat-group.png"
            location="30A"
            dateLine="More dates coming soon"
            status="Waitlist"
            summary="Join the list to get first access to the next dates and locations."
            href="/email"
            ctaLabel="Join the list"
          />
        </div>
      </Section>
    </>
  );
}