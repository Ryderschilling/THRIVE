"use client";

import { useEffect, useState } from "react";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-pill">
        <a href="/" className="nav-brand">THRIVE<span>·30A</span></a>
        <nav className="nav-links">
          <a href="/#mission">About</a>
          <a href="/#community">Community</a>
          <a href="/#coaching">Coaching</a>
          <a href="/#retreats">Retreats</a>
          <a href="/events">Events</a>
        </nav>
        <a href="/#connect" className="nav-cta">Get Involved</a>
      </div>
    </header>
  );
}
