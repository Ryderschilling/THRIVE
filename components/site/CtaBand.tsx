import Link from "next/link";
import { site } from "@/content/site";

export default function CtaBand({
  eyebrow = "One step",
  title,
  body,
  image = "/images/retreats/emerald-house/back.jpg",
  primary = site.primaryCta,
  secondary = site.secondaryCta,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body: string;
  image?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section className="t-cta">
      <div className="t-cta-media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" />
      </div>
      <div className="t-cta-scrim" aria-hidden="true" />
      <div className="t-cta-inner t-rv">
        <div className="t-eyebrow" style={{ justifyContent: "center" }}>
          {eyebrow}
        </div>
        <h2 className="t-h2">{title}</h2>
        <p className="t-lede wide">{body}</p>
        <div className="t-btns">
          <Link href={primary.href} className="t-btn t-btn-gold">
            {primary.label} <span className="ar">&rarr;</span>
          </Link>
          {secondary && (
            <Link href={secondary.href} className="t-btn t-btn-ghost">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
