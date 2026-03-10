import Link from "next/link";
import HeroInteractive from "@/components/site/HeroInteractive";
import Section from "@/components/site/Section";
import { retreats } from "@/content/retreats";
import { coachingProducts } from "@/content/coaching";
import RetreatWideCard from "@/components/retreats/RetreatWideCard";
import PlanCard from "@/components/coaching/PlanCard";

export default function HomePage() {
  const featuredRetreat = retreats[0];
  const featuredPlans = coachingProducts.slice(0, 3);

  return (
    <>
      <HeroInteractive />

      <Section>
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className="text-xs uppercase tracking-[0.32em] text-white/60">
            Built for depth
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white/95">
            Faith-driven growth for business and life.
          </h2>
          <p className="mx-auto max-w-2xl text-white/70">
            THRIVE is a ministry and growth ecosystem for Christian businessmen
            pursuing brotherhood, formation, leadership, and kingdom impact.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Link
              href="/retreats"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm tracking-wide text-white/90 transition hover:bg-white/15"
            >
              Explore retreats
            </Link>
            <Link
              href="/coaching"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 px-6 py-3 text-sm tracking-wide text-white/75 transition hover:border-white/15 hover:text-white"
            >
              View coaching
            </Link>
          </div>
        </div>
      </Section>

      {featuredRetreat ? (
        <Section tone="soft">
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <div className="text-xs uppercase tracking-[0.32em] text-white/60">
                Featured retreat
              </div>
              <h3 className="font-display text-3xl md:text-5xl text-white/95">
                Upcoming experience
              </h3>
            </div>

            <RetreatWideCard
              title={featuredRetreat.title}
              image={featuredRetreat.coverImage}
              location={featuredRetreat.locationLabel}
              dateLine={`${featuredRetreat.dateStart} → ${featuredRetreat.dateEnd}`}
              status={featuredRetreat.status}
              spotsLine={`${featuredRetreat.spotsRemaining} of ${featuredRetreat.spotsTotal} spots remaining`}
              summary={featuredRetreat.summary}
              href={`/retreats/${featuredRetreat.slug}`}
              ctaLabel="View retreat"
            />
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="space-y-8">
          <div className="mx-auto max-w-3xl text-center space-y-3">
            <div className="text-xs uppercase tracking-[0.32em] text-white/60">
              Coaching
            </div>
            <h3 className="font-display text-3xl md:text-5xl text-white/95">
              Structured support for real growth
            </h3>
            <p className="text-white/70">
              Private coaching, group sharpening, tactical calls, and
              self-paced coursework.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredPlans.map((plan, idx) => (
              <PlanCard
                key={plan.slug}
                title={plan.title}
                subtitle={plan.subtitle}
                bullets={plan.bullets}
                href={`/coaching/${plan.slug}`}
                ctaLabel={plan.ctaLabel}
                featured={idx === 1}
              />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}