"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "./Container";
import { site } from "@/content/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const launchMode = process.env.NEXT_PUBLIC_LAUNCH_MODE === "retreat";
  if (launchMode) return null;

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/30 backdrop-blur-sm">
        <Container>
          <div className="flex h-12 items-center justify-between">
            {/* Brand */}
            <Link
              href="/"
              className="text-xs tracking-[0.32em] text-white/80 transition hover:text-white"
              onClick={() => setOpen(false)}
            >
              {site.name}
            </Link>

            {/* Primary Nav */}
            <nav className="hidden gap-6 md:flex">
              {site.nav.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs tracking-wide text-white/60 transition hover:text-white/90"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* CTA */}
              <Link href={site.primaryCta.href} className="thrive-btnGhost">
                {site.primaryCta.label}
              </Link>

              <button
                onClick={() => setOpen((v) => !v)}
                className="flex flex-col gap-[5px] p-2 md:hidden"
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                <span
                  className={`block h-px w-5 bg-white/70 transition-all ${open ? "translate-y-[6px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-px w-5 bg-white/70 transition-all ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-px w-5 bg-white/70 transition-all ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
                />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {open && (
        <div className="fixed inset-0 top-12 z-40 flex flex-col gap-1 bg-black/95 px-6 pt-8 backdrop-blur-md md:hidden">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/8 py-3 text-base text-white/80 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={site.primaryCta.href}
            onClick={() => setOpen(false)}
            className="thrive-btnGhost mt-6 self-start"
          >
            {site.primaryCta.label}
          </Link>
        </div>
      )}
    </>
  );
}
