"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Adds `.in` to every .t-rv / .t-rvs element once it enters the viewport.
 *
 * Deliberately uses a rAF-throttled rect check rather than IntersectionObserver:
 * IO can miss a target entirely if the user (or a scroll-restore jump) moves past
 * it between two frames, which leaves a whole section stuck at opacity 0. The rect
 * check re-evaluates everything still hidden on every frame that scrolls, so a
 * section can never be skipped.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    let pending = Array.from(
      document.querySelectorAll<HTMLElement>(".t-rv, .t-rvs")
    );
    if (pending.length === 0) return;

    const reveal = (el: HTMLElement) => el.classList.add("in");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pending.forEach(reveal);
      return;
    }

    let frame = 0;
    let alive = true;

    const check = () => {
      frame = 0;
      if (!alive) return;
      const trigger = window.innerHeight - 60;
      const still: HTMLElement[] = [];
      for (const el of pending) {
        const r = el.getBoundingClientRect();
        // visible, or already scrolled past
        if (r.top < trigger && r.bottom > 0) reveal(el);
        else if (r.bottom <= 0) reveal(el);
        else still.push(el);
      }
      pending = still;
      if (pending.length === 0) detach();
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(check);
    };

    const detach = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    check();

    // catch late layout shifts (fonts, images) without waiting for a scroll
    const timers = [150, 600, 1600, 3200].map((ms) => window.setTimeout(schedule, ms));

    return () => {
      alive = false;
      if (frame) cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      detach();
    };
  }, [pathname]);

  // smooth in-page hash scrolling that clears the fixed nav
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest(
        'a[href^="#"], a[href^="/#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const raw = anchor.getAttribute("href") || "";
      const hash = raw.slice(raw.indexOf("#"));
      if (hash.length <= 1) return;
      if (raw.startsWith("/#") && window.location.pathname !== "/") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 88,
        behavior: "smooth",
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
