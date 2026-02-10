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
    const x = (e.clientX - r.left) / r.width; // 0..1
    const y = (e.clientY - r.top) / r.height; // 0..1
    const px = (x - 0.5) * 2; // -1..1
    const py = (y - 0.5) * 2; // -1..1

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
      {/* Background blur layer (adds depth) */}
      <div className="thrive-heroLayer thrive-heroBg">
        <Image
          src="/images/hero-palm.JPG"
          alt=""
          fill
          priority
          className="object-cover object-left-top"
        />
      </div>

      {/* Main photo layer */}
      <div className="thrive-heroLayer thrive-heroMid">
        <Image
          src="/images/hero-palm.JPG"
          alt="Palm canopy"
          fill
          priority
          className="object-cover object-left-top thrive-bg-anim"
        />
      </div>

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 [background:radial-gradient(80%_60%_at_50%_30%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.78)_100%)]" />

      {/* Text */}
      <div className="thrive-heroText absolute inset-0 flex items-center justify-center px-6">
        <div className="mx-auto max-w-xl text-center space-y-6">
          <div className="text-xs uppercase tracking-[0.32em] text-white/75">
            THRIVE · 30A
          </div>

          <h1 className="thrive-heroTitle font-display text-5xl md:text-7xl leading-[1.05] text-white">
            Brotherhood. Formation. Leadership.
          </h1>

          <p className="text-base md:text-lg text-white/75">
            A ministry and growth ecosystem for Christian businessmen pursuing
            depth, responsibility, and kingdom impact.
          </p>
        </div>
      </div>

      {/* Foreground leaves cutout (THIS is what makes the text feel “inside” the palms) */}
      <div className="thrive-heroLayer thrive-heroFg pointer-events-none">
        <Image
          src="/images/hero-palm-foreground.webp"
          alt=""
          fill
          className="object-cover object-left-top"
        />
      </div>

      {/* Bottom fade into black page */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}