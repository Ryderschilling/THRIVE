import Section from "@/components/site/Section";
import { coachingProducts } from "@/content/coaching";
import { OfferingCard } from "@/components/offerings/OfferingCard";

export default function CoachingPage() {
  return (
    <>
      <Section>
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="text-xs uppercase tracking-[0.32em] text-white/70">
            Coaching
          </div>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">
            Coaching & resources
          </h1>
          <p className="text-white/65">
            Four ways to engage — from private coaching to group work and courses.
          </p>
        </div>
      </Section>

      <Section tone="soft">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {coachingProducts.map((p) => (
            <OfferingCard
              key={p.slug}
              title={p.title}
              image={p.heroImage ?? "/images/hero-palm.JPG"}
              metaTop={p.kind === "COURSE" ? "Course" : "Coaching"}
              metaBottom={p.subtitle}
              badge={p.kind === "COURSE" ? "Skool" : undefined}
              href={`/coaching/${p.slug}`}
              ctaLabel={p.ctaLabel}
            />
          ))}
        </div>
      </Section>
    </>
  );
}