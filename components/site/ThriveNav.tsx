"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ThriveNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`th-nav${scrolled ? " scrolled" : ""}`}>
      <div className="th-nav-inner">
        <Link href="/" className="th-nav-brand">
          THRIVE<span>·30A</span>
        </Link>
        <nav className="th-nav-links">
          <Link href="/#community">Community</Link>
          <Link href="/#coaching">Coaching</Link>
          <Link href="/#josh">Josh</Link>
          <Link href="/events">Events</Link>
        </nav>
        <Link href="/#connect" className="th-nav-cta">
          Get Involved
        </Link>
      </div>
    </header>
  );
}
