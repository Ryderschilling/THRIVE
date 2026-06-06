import Image from "next/image";
import Link from "next/link";

export default function CoachingPage() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-28">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/coaching-hero.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 [background:radial-gradient(80%_70%_at_50%_25%,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.65)_60%,rgba(0,0,0,0.88)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 pb-20">
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <div className="text-xs uppercase tracking-[0.32em] text-white/70">
            Coaching
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-white/95">
            Coach with Josh
          </h1>
          <p className="text-sm md:text-base text-white/70">
            Structured containers for faith-first leadership, clarity, and execution.
          </p>
        </div>

        {/* 3 plan cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {/* Thrive Groups */}
          <div className="thrive-glassStrong p-6 text-center">
            <h3 className="font-display text-2xl text-white/95">Thrive Groups</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70 text-left">
              <li>✓ Group call cadence</li>
              <li>✓ Guided framework</li>
              <li>✓ Community accountability</li>
              <li>✓ Hot seats + implementation focus</li>
              <li>✓ 30A network</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/coaching/group-coaching"
                className="thrive-heroBtn w-full"
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* Thrive Personal */}
          <div className="thrive-glassStrong p-6 text-center">
            <h3 className="font-display text-2xl text-white/95">Thrive Personal</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70 text-left">
              <li>✓ Private coaching cadence</li>
              <li>✓ Personal roadmap + accountability</li>
              <li>✓ Faith-first alignment</li>
              <li>✓ Direct support</li>
              <li>✓ Clear outcomes</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/coaching/personal-coaching-program"
                className="thrive-heroBtn w-full"
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* Thrive Executive */}
          <div className="thrive-glassStrong p-6 text-center">
            <h3 className="font-display text-2xl text-white/95">Thrive Executive</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70 text-left">
              <li>✓ Executive structure</li>
              <li>✓ Decision clarity</li>
              <li>✓ Business alignment</li>
              <li>✓ Leadership systems</li>
              <li>✓ High-touch support</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/coaching/personal-coaching-calls"
                className="thrive-heroBtn w-full"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA like the mock */}
        <div className="mt-10 flex justify-center">
          <Link href="/email" className="thrive-heroBtn">
            Sign up
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}
