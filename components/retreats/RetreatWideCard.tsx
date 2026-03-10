import Link from "next/link";
import Image from "next/image";

export default function RetreatWideCard(props: {
  title: string;
  image: string;
  location: string;
  dateLine: string;
  status?: string;
  spotsLine?: string;
  summary?: string;
  href: string;
  ctaLabel?: string;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <div className="grid md:grid-cols-[1.2fr_1fr]">
        <div className="relative min-h-[240px] md:min-h-[320px] overflow-hidden">
          <Image
            src={props.image}
            alt={props.title}
            fill
            className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/65" />

          {props.status ? (
            <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/80 backdrop-blur">
              {props.status}
            </div>
          ) : null}
        </div>

        <div className="p-6 md:p-7 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.32em] text-white/60">
              {props.location}
            </div>
            <h3 className="font-display text-3xl leading-[1.05] text-white/95">
              {props.title}
            </h3>
            <div className="text-sm text-white/70">{props.dateLine}</div>
            {props.spotsLine ? (
              <div className="text-sm text-white/60">{props.spotsLine}</div>
            ) : null}
            {props.summary ? (
              <p className="pt-1 text-sm text-white/65">{props.summary}</p>
            ) : null}
          </div>

          <div className="pt-6">
            <Link
              href={props.href}
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm tracking-wide text-white/90 hover:bg-white/15 transition"
            >
              {props.ctaLabel ?? "Learn more"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}