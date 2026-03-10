import Image from "next/image";
import Section from "@/components/site/Section";
import { coachingProducts } from "@/content/coaching";
import PlanCard from "@/components/coaching/PlanCard";

export default function CoachingPage() {
  const plans = coachingProducts;

  return (
    <>
      <section className="relative overflow-hidden pt-24 md:pt-28">
        <div className="absolute inset-0">
          <Image
            src="/images/ui/palm-leaves-bg.png"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 [background:radial-gradient(70%_60%_at_50%_35%,rgba(255,255,255,0.10)_0%,rgba(0,0,0,0.65)_70%,rgba(0,0,0,0.9)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pb-14 text-center space-y-4">
          <div className="text-xs uppercase tracking-[0.32em] text-white/70">
            Coaching
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.03] text-white">
            Coaching programs
          </h1>
          <p className="mx-auto max-w-2xl text-white/70">
            Choose the container that fits your season — private depth, group
            sharpening, tactical calls, or self-paced courses.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-20">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.slice(0, 3).map((p, idx) => (
              <PlanCard
                key={p.slug}
                title={p.title}
                subtitle={p.subtitle}
                bullets={p.bullets}
                href={`/coaching/${p.slug}`}
                ctaLabel={p.ctaLabel}
                featured={idx === 1}
              />
            ))}
          </div>

          <div className="mt-6">
            {plans[3] ? (
              <div className="mx-auto max-w-3xl">
                <PlanCard
                  title={plans[3].title}
                  subtitle={plans[3].subtitle}
                  bullets={plans[3].bullets}
                  href={`/coaching/${plans[3].slug}`}
                  ctaLabel={plans[3].ctaLabel}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black" />
      </section>

      <Section>
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h2 className="font-display text-3xl md:text-4xl text-white/95">
            What to expect
          </h2>
          <div className="grid gap-4 md:grid-cols-3 text-left">
            {[
              {
                k: "Clarity",
                v: "We name the real constraint and turn it into a plan you can execute.",
              },
              {
                k: "Alignment",
                v: "Faith-first leadership that touches business, home, and private life.",
              },
              {
                k: "Accountability",
                v: "Simple rhythm, measurable commitments, and follow-through.",
              },
            ].map((x) => (
              <div
                key={x.k}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="text-xs uppercase tracking-[0.32em] text-white/60">
                  {x.k}
                </div>
                <p className="mt-3 text-sm text-white/70">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}