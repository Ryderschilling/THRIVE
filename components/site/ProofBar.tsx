"use client";

import { useEffect, useRef, useState } from "react";
import { proof } from "@/content/site";

function useCountUp(target: number, go: boolean, duration = 1500) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    const ms = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : duration;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = ms > 0 ? Math.min(1, (now - start) / ms) : 1;
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, target, duration]);
  return n;
}

function Stat({ n, suffix, label, go }: { n: number; suffix: string; label: string; go: boolean }) {
  const value = useCountUp(n, go);
  return (
    <div className="t-proof-item">
      <div className="t-proof-n">
        {value}
        {suffix ? <em>{suffix}</em> : null}
      </div>
      <div className="t-proof-l">{label}</div>
    </div>
  );
}

export default function ProofBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGo(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="t-proof" ref={ref}>
      {proof.map((p) => (
        <Stat key={p.label} n={p.n} suffix={p.suffix} label={p.label} go={go} />
      ))}
    </div>
  );
}
