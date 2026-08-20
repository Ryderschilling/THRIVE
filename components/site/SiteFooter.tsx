import Link from "next/link";
import { site } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="t-footer">
      <div className="t-wrap">
        <div className="t-footer-grid">
          <div>
            <div className="t-footer-brand">
              {site.name}
              <span>{site.mark}</span>
            </div>
            <p className="t-footer-tag">{site.footerLine}</p>
          </div>

          <div className="t-footer-col">
            <h4>Navigate</h4>
            <Link href="/">Home</Link>
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="t-footer-col">
            <h4>Connect</h4>
            <Link href={site.primaryCta.href}>Get Involved</Link>
            <Link href="/email">The Monthly Letter</Link>
            {site.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>

          <div className="t-footer-col">
            <h4>Located</h4>
            <span>{site.cityLine}</span>
            <span>{site.regionLine}</span>
            <span>30.2769&deg; N</span>
            <span>86.0080&deg; W</span>
          </div>
        </div>

        <div className="t-footer-bottom">
          <span>
            &copy; {new Date().getFullYear()} {site.name} {site.location} &middot; All rights reserved
          </span>
          <span>
            {site.cityLine} &middot; {site.regionLine}
          </span>
        </div>
      </div>
    </footer>
  );
}
