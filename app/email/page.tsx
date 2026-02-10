import Image from "next/image";

export default function EmailPage() {
  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-[var(--wall)]">
      {/* LAYER 1 (BACK): Ocean photo fills entire viewport (no bars) */}
      <div className="absolute inset-0 thrive-bg-anim">
        <Image
          src="/images/email-window.jpg"
          alt="Looking through a window toward the ocean and palm trees"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Subtle global grade for readability (not “faded out”) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_60%_at_50%_45%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.18)_72%,rgba(0,0,0,0.48)_100%)]" />

      {/* LAYER 2 (MIDDLE): Email form (glass card) */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="thrive-form-anim w-full max-w-md text-center">
          <div className="rounded-2xl border border-white/15 bg-black/35 backdrop-blur-xl px-7 py-8 shadow-[0_20px_70px_rgba(0,0,0,0.55)]">
            <div className="space-y-6">
              <div className="text-xs uppercase tracking-[0.32em] text-white/80">
                Stay Connected
              </div>

              <h1 className="font-display text-4xl md:text-5xl leading-[1.08] text-white/95">
                Quiet updates.
              </h1>

              <p className="text-white/78">
                Invitations, reflections, and announcements for gatherings,
                retreats, and coaching.
              </p>

              <form className="space-y-3 pt-1">
                <label className="sr-only" htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white/90 placeholder:text-white/45 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/20"
                />

                <button
                  type="button"
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm tracking-wide text-white/92 hover:bg-white/15 transition"
                >
                  Join the list
                </button>

                <p className="pt-2 text-xs text-white/55">
                  No spam. No daily emails. Quiet, intentional updates.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 3 (FRONT): Wall mask creating the “window frame” */}
      {/* This SVG paints the wall color over everything, with a cutout arch window */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="var(--wall)"
          fillRule="evenodd"
          d="
            M0 0 H100 V100 H0 Z
            M20 90
            V45
            A30 30 0 0 1 80 45
            V90
            Z
          "
        />
      </svg>
    </section>
  );
}