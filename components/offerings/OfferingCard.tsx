import Link from "next/link";
import Image from "next/image";

export function OfferingCard(props: {
  title: string;
  image: string;
  metaTop: string; // location
  metaBottom: string; // dates or cadence
  badge?: string; // Invite-only / Open / etc.
  spots?: string; // “5 spots remaining”
  href: string;
  ctaLabel?: string; // “Learn more”
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={props.image}
          alt={props.title}
          fill
          className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

        {props.badge ? (
          <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/80 backdrop-blur">
            {props.badge}
          </div>
        ) : null}
      </div>

      <div className="px-6 py-5 text-center space-y-4">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-[0.32em] text-white/55">
            {props.metaTop}
          </div>
          <h3 className="font-display text-2xl text-white/92">{props.title}</h3>
          <div className="text-sm text-white/60">{props.metaBottom}</div>
        </div>

        {props.spots ? (
          <div className="text-sm text-white/60">{props.spots}</div>
        ) : null}

        <div className="pt-2">
          <Link
            href={props.href}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm tracking-wide text-white/85 hover:bg-white/15 transition"
          >
            {props.ctaLabel ?? "Learn more"}
          </Link>
        </div>
      </div>
    </div>
  );
}