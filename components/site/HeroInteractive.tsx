"use client";

import { useRef } from "react";
import Image from "next/image";

export default function HeroInteractive() {
  const ref = useRef<HTMLElement | null>(null);
  const raf = useRef<number | null>(null);

  function setVars(px: number, py: number) {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--px", String(px));
    el.style.setProperty("--py", String(py));
  }

  function onMove(e: React.PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const px = (x - 0.5) * 2;
    const py = (y - 0.5) * 2;

    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => setVars(px, py));
  }

  function onLeave() {
    if (raf.current) cancelAnimationFrame(raf.current);
    setVars(0, 0);
  }

  return (
    <section
      ref={(node) => {
        ref.current = node;
      }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="thrive-heroScene relative overflow-hidden"
    >
      {/* Background */}
      <div className="thrive-heroLayer thrive-heroMid">
        <Image
          src="/images/home-hero-sunset.png"
          alt="THRIVE coastal sunset"
          fill
          priority
          className="object-cover object-center thrive-bg-anim"
        />
      </div>

      {/* Blur + darken like reference */}
      <div className="absolute inset-0 backdrop-blur-[5px]" />
<div className="absolute inset-0 bg-black/25" />
<div className="absolute inset-0 [background:radial-gradient(90%_80%_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.45)_58%,rgba(0,0,0,0.82)_100%)]" />

      {/* Hero content (NO bordered panel) */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="w-full max-w-4xl text-center">
          <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-white/55">
            Home
          </div>

          {/* THRIVE + 30a overlay */}
          <div className="relative inline-block">
          <div className="thrive-wordmark text-[92px] leading-none text-white md:text-[152px]">
              THRIVE
            </div>

            <div className="thrive-wordmarkScript absolute left-1/2 top-[72%] -translate-x-1/2 -translate-y-1/2 text-[44px] md:text-[60px]">
              30a
            </div>
          </div>

          {/* subtitle spacing matches reference */}
          <div className="mx-auto mt-6 max-w-2xl text-[14px] leading-relaxed text-white/60 md:text-[16px]">
            Ministry | Discipleship | Encouragement
            <br />
            for the Entrepreneur &amp; Businessman
          </div>

          <div className="mt-8">
            <a href="/community" className="thrive-heroBtn">
              Get Involved
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}