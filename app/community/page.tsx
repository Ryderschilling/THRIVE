import Image from "next/image";
import Link from "next/link";
import Section from "@/components/site/Section";

export default function CommunityPage() {
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
          <div className="thrive-kicker">Community</div>

          <h1 className="font-display text-5xl md:text-6xl leading-[1.03] text-white">
            Connect with the THRIVE
            <br />
            Community
          </h1>

          <p className="mx-auto max-w-2xl text-white/70">
            Brotherhood, gatherings, and events for men who want faith to govern leadership.
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* Moments + Events */}
      <Section tone="soft">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-[1.35fr_1fr]">
          {/* Moments */}
          <div className="thrive-glass p-6">
            <div className="flex items-center justify-between">
              <div className="thrive-kicker">Moments</div>

              <Link
                href="/email"
                className="text-xs text-white/70 hover:text-white transition"
              >
                Stay connected →
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                "/images/community/1.jpg",
                "/images/community/2.jpg",
                "/images/community/3.jpg",
                "/images/community/4.jpg",
              ].map((src) => (
                <div key={src} className="relative h-32 md:h-40 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover object-center transition-transform duration-[1400ms] ease-out hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm text-white/65">
              Real moments from gatherings, brotherhood dinners, and coastal meetups.
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="thrive-glass p-6">
            <div className="thrive-kicker">Upcoming events</div>

            <div className="mt-5 space-y-4">
              {[
                { title: "Monthly Brotherhood Dinner", meta: "30A · Monthly" },
                { title: "Morning Formation", meta: "Inlet Beach · Weekly" },
                {
                  title: "Business & Faith Roundtable",
                  meta: "Santa Rosa · Quarterly",
                },
              ].map((e) => (
                <div
                  key={e.title}
                  className="rounded-xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="text-sm text-white/90">{e.title}</div>
                  <div className="mt-1 text-xs text-white/60">{e.meta}</div>
                </div>
              ))}
            </div>

            <Link
              href="/email"
              className="mt-4 block text-right text-xs text-white/60 transition hover:text-white"
            >
              View all events →
            </Link>

            <Link href="/email" className="thrive-btn w-full mt-6">
              Join for event invites
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
