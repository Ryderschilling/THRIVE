import Image from "next/image";
import Section from "@/components/site/Section";

export default function EmailPage() {
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
          <div className="thrive-kicker">Stay connected</div>

          <h1 className="font-display text-5xl md:text-6xl leading-[1.03] text-white">
            Quiet updates.
            <br />
            Real invitations.
          </h1>

          <p className="mx-auto max-w-2xl text-white/70">
            Get first access to gatherings, retreats, and coaching openings — without spam
            or noise.
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* Content */}
      <Section tone="soft">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
          {/* Signup card */}
          <div className="thrive-glass p-6 md:p-7">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-2">
                <div className="thrive-kicker">Email list</div>
                <h2 className="font-display text-3xl md:text-4xl text-white/95">
                  Join the list
                </h2>
                <p className="text-sm text-white/65">
                  You’ll get the invite before we post publicly.
                </p>
              </div>

              {/* Optional photo tile (collage vibe) */}
              <div className="relative hidden md:block h-24 w-40 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
                <Image
                  src="/images/email-window.jpg"
                  alt=""
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55" />
              </div>
            </div>

            <form
              className="mt-6 space-y-4"
              action="/api/subscribe"
              method="post"
            >
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs text-white/60" htmlFor="firstName">
                    First name (optional)
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Josh"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 placeholder:text-white/35 outline-none focus:border-white/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/60" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@domain.com"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 placeholder:text-white/35 outline-none focus:border-white/20"
                  />
                </div>
              </div>

              <button type="submit" className="thrive-btn w-full">
                Subscribe
              </button>

              <p className="text-xs text-white/50">
                No spam. Unsubscribe anytime. We only use your email for THRIVE updates.
              </p>
            </form>
          </div>

          {/* What you’ll get */}
          <div className="thrive-glass p-6 md:p-7">
            <div className="thrive-kicker">What you’ll get</div>

            <div className="mt-5 space-y-4">
              {[
                {
                  t: "Retreat invitations",
                  d: "Early access to dates, locations, and limited spots.",
                },
                {
                  t: "Gatherings + events",
                  d: "Monthly brotherhood dinners, formation rhythm, local meetups.",
                },
                {
                  t: "Coaching openings",
                  d: "New cohorts, group containers, and 1:1 availability.",
                },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="text-sm text-white/90">{x.t}</div>
                  <div className="mt-1 text-xs text-white/60">{x.d}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-white/60">
                Frequency
              </div>
              <p className="mt-2 text-sm text-white/70">
                Low volume. High signal. Typically 1–3 emails/month.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}