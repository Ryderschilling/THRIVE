import Link from "next/link";
import Section from "@/components/site/Section";
import { getRetreatBySlug } from "@/content/retreats";

function formatDateRange(startISO: string, endISO: string) {
  const start = new Date(startISO + "T00:00:00");
  const end = new Date(endISO + "T00:00:00");
  const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
  const fmtYear = new Intl.DateTimeFormat("en-US", { year: "numeric" });
  return `${fmt.format(start)} — ${fmt.format(end)}, ${fmtYear.format(end)}`;
}

export default function RetreatDetailPage(props: { params: { slug: string } }) {
  const retreat = getRetreatBySlug(props.params.slug);

  if (!retreat) {
    return (
      <Section>
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <div className="text-xs uppercase tracking-[0.32em] text-white/60">Not found</div>
          <h1 className="font-display text-4xl md:text-5xl text-white/95">
            This retreat doesn’t exist.
          </h1>
          <Link
            href="/retreats"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm tracking-wide text-white/90 hover:bg-white/15 transition"
          >
            Back to retreats
          </Link>
        </div>
      </Section>
    );
  }

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(retreat.address)}&output=embed`;

  return (
    <>
      <Section>
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-5">
              <div className="text-xs uppercase tracking-[0.32em] text-white/60">
                {retreat.locationLabel}
              </div>
              <h1 className="font-display text-4xl md:text-6xl text-white/95">
                {retreat.title}
              </h1>
              <p className="text-white/65">{retreat.summary}</p>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80">
                  {formatDateRange(retreat.dateStart, retreat.dateEnd)}
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80">
                  {retreat.nightsLabel}
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80">
                  {retreat.spotsRemaining} / {retreat.spotsTotal} spots remaining
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80">
                  Status: {retreat.status}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href={`/retreats/${retreat.slug}/apply`}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm tracking-wide text-white/90 hover:bg-white/15 transition"
                >
                  Sign up
                </Link>
                <Link
                  href={`/retreats/${retreat.slug}/gallery`}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-transparent px-6 py-3 text-sm tracking-wide text-white/80 hover:bg-white/5 transition"
                >
                  Learn more (gallery)
                </Link>
              </div>

              <p className="text-xs text-white/45 pt-1">{retreat.invitationLine}</p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={retreat.coverImage}
                  alt={retreat.title}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <div className="mx-auto max-w-5xl grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl text-white/92">What to expect</h2>
            <ul className="space-y-3">
              {retreat.whatToExpect.map((x) => (
                <li key={x} className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white/75">
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl text-white/92">Location</h2>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
              <div className="aspect-[16/10]">
                <iframe
                  src={mapSrc}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <div className="text-sm text-white/65">{retreat.address}</div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="text-center space-y-3">
            <h2 className="font-display text-2xl md:text-3xl text-white/92">Schedule</h2>
            <p className="text-white/60">
              A clear itinerary with space for silence, brotherhood, and precision.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {retreat.schedule.map((day) => (
              <div
                key={day.dayLabel}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7"
              >
                <div className="text-xs uppercase tracking-[0.32em] text-white/60">
                  {day.dayLabel}
                </div>
                <ul className="mt-4 space-y-2 text-white/75">
                  {day.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span className="mt-[7px] h-[6px] w-[6px] rounded-full bg-white/35 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-center">
            <Link
              href={`/retreats/${retreat.slug}/apply`}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-7 py-3 text-sm tracking-wide text-white/90 hover:bg-white/15 transition"
            >
              Sign up
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}