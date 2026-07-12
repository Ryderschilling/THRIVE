"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const periodRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  const letters = ["T", "H", "R", "I", "V", "E"];

  useEffect(() => {
    if (done) return;

    const els = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    const period = periodRef.current;
    const container = containerRef.current;
    if (!container || !period || els.length === 0) return;

    // Set initial state
    gsap.set(els, { opacity: 0, y: 24, filter: "blur(8px)" });
    gsap.set(period, { opacity: 0, scale: 0.4, filter: "blur(6px)" });
    gsap.set(container, { opacity: 1 });

    const tl = gsap.timeline({
      delay: 0.1,
      onComplete: () => {
        // Hold for a beat, then fade the whole screen out
        gsap.to(container, {
          opacity: 0,
          duration: 0.55,
          ease: "power2.inOut",
          delay: 0.3,
          onComplete: () => setDone(true),
        });
      },
    });

    // Stagger each letter in
    tl.to(els, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.55,
      stagger: 0.11,
      ease: "power3.out",
    });

    // Gold period pops in after last letter
    tl.to(
      period,
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.35,
        ease: "back.out(2)",
      },
      "-=0.05"
    );

    // Subtle glow pulse on the full word
    tl.to(
      [...els, period],
      {
        textShadow: "0 0 40px rgba(255,255,255,0.12)",
        duration: 0.4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      },
      "+=0.1"
    );

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      style={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      <div className="flex items-end select-none" aria-hidden="true">
        {letters.map((letter, i) => (
          <span
            key={i}
            ref={(el) => { lettersRef.current[i] = el; }}
            style={{
              fontFamily: "var(--font-display), Barlow, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(72px, 14vw, 160px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              display: "inline-block",
            }}
          >
            {letter}
          </span>
        ))}
        <span
          ref={periodRef}
          style={{
            fontFamily: "var(--font-display), Barlow, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(72px, 14vw, 160px)",
            lineHeight: 1,
            color: "#C9A84C",
            display: "inline-block",
            marginLeft: "0.02em",
          }}
        >
          .
        </span>
      </div>
    </div>
  );
}
