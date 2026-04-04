import Link from "next/link";
import Container from "./Container";
import { site } from "@/content/site";

export default function Nav() {
  const launchMode = process.env.NEXT_PUBLIC_LAUNCH_MODE === "retreat";
  if (launchMode) return null;

  return (
<header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/30 backdrop-blur-sm">
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
            className="thrive-btnGhost"
          >
            {site.primaryCta.label}
          </Link>
        </div>
      </Container>
    </header>
  );
}