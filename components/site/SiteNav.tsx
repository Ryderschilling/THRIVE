"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className={`t-nav${scrolled || open ? " scrolled" : ""}`}>
        <div className="t-nav-inner">
          <Link href="/" className="t-nav-brand">
            {site.name}
            <span>{site.mark}</span>
          </Link>

          <nav className="t-nav-links">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "active" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="t-nav-right">
            <Link href={site.primaryCta.href} className="t-nav-cta">
              {site.primaryCta.label}
            </Link>
            <button
              type="button"
              className={`t-burger${open ? " open" : ""}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="t-drawer" onClick={() => setOpen(false)}>
          <Link href="/">Home</Link>
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href={site.primaryCta.href} className="t-btn t-btn-gold t-drawer-cta">
            {site.primaryCta.label} <span className="ar">&rarr;</span>
          </Link>
          <div className="t-drawer-foot">
            {site.cityLine}
            <br />
            {site.regionLine}
          </div>
        </div>
      )}
    </>
  );
}
