import Link from "next/link";
import Container from "./Container";
import { site } from "@/content/site";

export default function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur">
      <Container>
        <div className="flex h-12 items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="text-xs tracking-[0.32em] text-white/80 hover:text-white transition"
          >
            {site.name}
          </Link>

          {/* Primary Nav */}
          <nav className="hidden gap-6 md:flex">
            {site.nav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs tracking-wide text-white/60 hover:text-white/90 transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href={site.primaryCta.href}
            className="text-xs tracking-wide text-white/70 hover:text-white transition"
          >
            {site.primaryCta.label}
          </Link>
        </div>
      </Container>
    </header>
  );
}