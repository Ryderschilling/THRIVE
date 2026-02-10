import Link from "next/link";
import Container from "./Container";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="relative">
        <div className="pointer-events-none absolute -top-10 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-black" />
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="tracking-[0.22em] text-sm text-white/90">
              {site.name}
            </div>
            <p className="max-w-sm text-sm text-white/60">{site.footerLine}</p>
          </div>

          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.22em] text-white/50">
              Navigate
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/60 hover:text-white/90 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.22em] text-white/50">
              Stay Connected
            </div>
            <p className="text-sm text-white/60">
              Quiet updates. Invitations. Reflections.
            </p>
            <Link
              href="/email"
              className="inline-block text-sm text-white/80 hover:text-white/95 transition"
            >
              Enter →
            </Link>
          </div>
        </div>

        <div className="mt-12 text-xs text-white/40">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </div>
      </Container>
    </footer>
  );
}