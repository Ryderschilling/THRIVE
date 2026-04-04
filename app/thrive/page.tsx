import Image from "next/image";
import Link from "next/link";
import Section from "@/components/site/Section";

export default function ThrivePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 md:pt-28">
        <div className="absolute inset-0">
          <Image
            src="/images/palm-leaves-bg.png"
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
            THRIVE · 30A
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.03] text-white">
            Ministry. Discipleship.
            <br />
            Encouragement.
          </h1>
          <p className="mx-auto max-w-2xl text-white/70">
            A ministry and growth ecosystem for Christian businessmen pursuing depth,
            responsibility, and kingdom impact.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href="/community"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm text-white/90 hover:bg-white/15 transition"
            >
              Join the community
            </Link>
            <Link
              href="/retreats"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-transparent px-6 py-3 text-sm text-white/70 hover:bg-white/5 transition"
            >
              View retreats
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* Pillars */}
      <Section tone="soft">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="text-center space-y-2">
            <div className="text-xs uppercase tracking-[0.32em] text-white/60">
              The foundation
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white/95">
              What we’re building
            </h2>
            <p className="mx-auto max-w-2xl text-white/65">
              THRIVE is a container for men who want structure, brotherhood, and spiritual
              formation — without hype.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 text-left">
            {[
              {
                k: "Brotherhood",
                v: "A tight circle of men who sharpen each other and carry responsibility well.",
              },
              {
                k: "Formation",
                v: "Faith-first identity, discipline, and inner life — built through repetition.",
              },
              {
                k: "Leadership",
                v: "Decisive, humble leadership at home and in business — aligned to kingdom impact.",
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

      {/* “How it works” + CTA cards (glass) */}
      <Section>
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
          {/* Left card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.32em] text-white/60">
              How it works
            </div>

            <div className="mt-5 space-y-4">
              {[
                {
                  t: "Monthly gatherings",
                  d: "In-person dinners + formation rhythm with practical leadership application.",
                },
                {
                  t: "Retreats",
                  d: "Invite-only, focused environments for depth, brotherhood, and reset.",
                },
                {
                  t: "Coaching access",
                  d: "Structured options depending on your season — private or group container.",
                },
              ].map((row) => (
                <div
                  key={row.t}
                  className="rounded-xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="text-sm text-white/90">{row.t}</div>
                  <div className="mt-1 text-xs text-white/60">{row.d}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/email"
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm text-white/90 hover:bg-white/15 transition"
              >
                Stay connected
              </Link>
              <Link
                href="/coaching"
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/10 bg-transparent px-5 py-3 text-sm text-white/70 hover:bg-white/5 transition"
              >
                Coaching
              </Link>
            </div>
          </div>

          {/* Right card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.32em] text-white/60">
              Next step
            </div>

            <h3 className="mt-4 font-display text-2xl text-white/95">
              Get invited to what’s next
            </h3>

            <p className="mt-2 text-sm text-white/65">
              Join the email list so you’re first to know about gatherings, retreats, and
              openings.
            </p>

            <Link
              href="/email"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm text-white/90 hover:bg-white/15 transition"
            >
              Join the list
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}