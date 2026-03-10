import Link from "next/link";

export default function PlanCard(props: {
  title: string;
  subtitle: string;
  bullets: string[];
  priceLine?: string;
  href: string;
  ctaLabel: string;
  featured?: boolean;
}) {
  return (
    <div
      className={
        "relative overflow-hidden rounded-2xl border bg-white/[0.03] p-6 " +
        (props.featured
          ? "border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
          : "border-white/10")
      }
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[28rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      {props.featured ? (
        <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/80 backdrop-blur">
          Most Popular
        </div>
      ) : null}

      <div className="relative space-y-4">
        <div className="space-y-1 text-center">
          <h3 className="font-display text-2xl text-white/95">{props.title}</h3>
          <p className="text-sm text-white/65">{props.subtitle}</p>
        </div>

        <ul className="mx-auto max-w-sm space-y-2 text-sm text-white/70">
          {props.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/45" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {props.priceLine ? (
          <div className="text-center text-sm text-white/70">{props.priceLine}</div>
        ) : null}

        <div className="pt-2">
          <Link
            href={props.href}
            className={
              "inline-flex w-full items-center justify-center rounded-xl border px-5 py-3 text-sm tracking-wide transition " +
              (props.featured
                ? "border-white/20 bg-white/15 text-white hover:bg-white/20"
                : "border-white/15 bg-white/10 text-white/90 hover:bg-white/15")
            }
          >
            {props.ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}