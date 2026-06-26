"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ── Count-up hook ─────────────────────────────────────────────────────────── */
function useCountUp(target: number, triggered: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [triggered, target, duration]);
  return count;
}

/* ── Verse data ─────────────────────────────────────────────────────────────── */
const VERSES = [
  { text: '"As iron sharpens iron, so one man sharpens another."', ref: "Proverbs 27:17" },
  { text: '"Be strong and courageous."',                            ref: "Joshua 1:9" },
  { text: '"He must increase, but I must decrease."',              ref: "John 3:30" },
  { text: '"Whatever you do, work heartily, as for the Lord."',    ref: "Colossians 3:23" },
];

/* ── Strip images ──────────────────────────────────────────────────────────── */
const STRIP = [
  { src: "/images/retreats/emerald-house/pool.jpg",        label: "Pool · Emerald House" },
  { src: "/images/retreats/emerald-house/drone.jpg",       label: "Aerial · 30A" },
  { src: "/images/retreats/emerald-house/living-room.jpg", label: "Living Room" },
  { src: "/images/retreats/emerald-house/top.jpg",         label: "Rooftop" },
  { src: "/images/retreats/emerald-house/kitchen.jpg",     label: "Kitchen" },
  { src: "/images/retreats/emerald-house/theater.jpg",     label: "Theater" },
  { src: "/images/retreats/past/1.jpg",                    label: "Brotherhood" },
  { src: "/images/retreats/past/2.jpg",                    label: "Formation" },
];

/* ── Retreat data ──────────────────────────────────────────────────────────── */
const RETREATS = [
  {
    img: "/images/retreats/emerald-house/cover.jpg",
    badge: "Invite-only", gold: true,
    dates: "Apr 12 — 15, 2026", nights: "3 nights", place: "Santa Rosa Beach · 30A",
    title: "Leadership Retreat", sub: "Emerald House",
    desc: "A quiet, focused retreat for Christian businessmen pursuing depth, responsibility, and kingdom impact. Held in a coastal environment designed to slow you down and sharpen you.",
    pct: 60, spots: "18 of 30 spots remaining",
    cta: "Request Invitation", ctaGold: true,
  },
  {
    img: "/images/retreat-resort.png",
    badge: "Open · Apply", gold: false,
    dates: "Jun 5 — 8, 2026", nights: "3 nights", place: "Santa Rosa Beach · 30A",
    title: "Rising Strong Retreat", sub: "",
    desc: "A faith-fueled men's retreat for those ready to rise from stagnation — addressing the places where life, leadership, and calling feel stuck.",
    pct: 70, spots: "14 of 20 spots remaining",
    cta: "Apply to Attend", ctaGold: false,
  },
];

/* ── Coaching plans ────────────────────────────────────────────────────────── */
const PLANS = [
  {
    ix: "i.", label: "Group", name: "Thrive Groups",
    sub: "Brotherhood with structure and direction.",
    features: ["Group calls + guided framework", "Community accountability", "Hot seats & implementation focus", "Q&A with Josh, monthly"],
    cta: "Sign Up", gold: false, featured: false,
  },
  {
    ix: "ii.", label: "Personal", name: "Thrive Personal",
    sub: "A private container for breakthrough.",
    features: ["Private coaching cadence", "Personal roadmap + accountability", "Faith-first alignment for life & leadership", "Direct text access between calls"],
    cta: "Apply Now", gold: true, featured: true,
  },
  {
    ix: "iii.", label: "Executive", name: "Thrive Executive",
    sub: "High-touch leadership and business support.",
    features: ["Executive-level structure", "Business alignment + leadership systems", "Decision-point strategy calls", "Quarterly in-person reset (30A)"],
    cta: "Inquire", gold: false, featured: false,
  },
];

/* ══════════════════════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [scrolled,      setScrolled]      = useState(false);
  const [loaded,        setLoaded]        = useState(false);
  const [submitted,     setSubmitted]     = useState(false);
  const [statsVisible,  setStatsVisible]  = useState(false);

  const rootRef     = useRef<HTMLDivElement>(null);
  const stripRef    = useRef<HTMLDivElement>(null);
  const stripOuter  = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  const men     = useCountUp(200, statsVisible, 1800);
  const retr    = useCountUp(12,  statsVisible, 1400);
  const yrs     = useCountUp(4,   statsVisible, 1000);

  /* Hero entrance */
  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(id);
  }, []);

  /* Nav scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Section reveals */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    root.querySelectorAll(".reveal, .reveal-stagger > *").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Stats counter trigger */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsVisible(true); io.disconnect(); } },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Horizontal scroll strip */
  const onScroll = useCallback(() => {
    const outer = stripOuter.current;
    const strip = stripRef.current;
    if (!outer || !strip) return;
    const rect       = outer.getBoundingClientRect();
    const totalTrack = outer.offsetHeight - window.innerHeight;
    const progress   = Math.max(0, Math.min(1, -rect.top / totalTrack));
    const maxX       = strip.scrollWidth - strip.clientWidth;
    strip.style.transform = `translateX(-${progress * maxX}px)`;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  /* Smooth hash scroll */
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id.length <= 1) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
    };
    document.addEventListener("click", fn);
    return () => document.removeEventListener("click", fn);
  }, []);

  return (
    <div ref={rootRef} className="th">

      {/* ══ NAV ══════════════════════════════════════════════════════════════ */}
      <header className={`th-nav${scrolled ? " scrolled" : ""}`}>
        <div className="th-nav-inner">
          <a href="#" className="th-nav-brand">THRIVE<span>·30A</span></a>
          <nav className="th-nav-links">
            <a href="#community">Community</a>
            <a href="#coaching">Coaching</a>
            <a href="#josh">Josh</a>
            <a href="/events">Events</a>
          </nav>
          <a href="#connect" className="th-nav-cta">Get Involved</a>
        </div>
      </header>

      {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
      <section className="th-hero" id="hero">

        {/* Background photo — shifted left so palms sit on left half */}
        <div className="th-hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/palm-leaves-bg.png" alt="30A palm leaves" />
        </div>

        {/* Gradient overlay — dark on right for text, open on left for palms */}
        <div className="th-hero-overlay" />

        {/* Text — right side */}
        <div className={`th-hero-content${loaded ? " loaded" : ""}`}>
          <div className="th-hero-eyebrow">
            <span className="th-dot" />
            Christian Brotherhood · Santa Rosa Beach, FL
          </div>
          <h1 className="th-hero-title">THRIVE</h1>
          <div className="th-hero-subtitle">30a</div>
          <div className="th-hero-divider" />
          <p className="th-hero-tag">Ministry · Discipleship · Encouragement</p>
          <div className="th-hero-cta">
            <a href="#connect" className="th-btn th-btn-primary">Get Involved →</a>
          </div>
        </div>

<div className="th-scroll-hint">
          <span>Scroll</span>
          <div className="th-scroll-line" />
        </div>
      </section>

      {/* ══ VERSE TICKER ═════════════════════════════════════════════════════ */}
      <div className="th-ticker">
        <div className="th-ticker-track">
          {[...VERSES, ...VERSES].map((v, i) => (
            <span key={i} className="th-ticker-item">
              {v.text}&nbsp;<span className="th-ticker-ref">{v.ref}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ MISSION ══════════════════════════════════════════════════════════ */}
      <section className="th-mission" id="about">
        <div className="th-wrap">
          <div className="th-mission-top">
            <div className="reveal">
              <div className="th-eyebrow"><span className="th-dot" />The Mission</div>
              <div className="th-label">— Built for depth</div>
            </div>
            <div className="reveal">
              <h2 className="th-h2">
                A ministry for men who want their{" "}
                <em>faith, family,</em> and business to grow on the same root.
              </h2>
              <p className="th-body" style={{ marginTop: "1.25rem" }}>
                THRIVE is a community of Christian businessmen rooted in the 30A coast of
                Florida — pursuing brotherhood, formation, leadership, and kingdom impact.
                Not a conference. Not a club. A formation.
              </p>
            </div>
          </div>

          <div className="th-pillars reveal-stagger">
            {[
              { n: "i.",    name: "Brotherhood",    desc: "Honest tables, morning formations, men who actually call you back." },
              { n: "ii.",   name: "Formation",      desc: "Scripture-led rhythms for leadership, fatherhood, and stewardship of work." },
              { n: "iii.",  name: "Kingdom Impact", desc: "Business as a vehicle for obedience, generosity, and lasting witness." },
            ].map(p => (
              <div key={p.n} className="th-pillar">
                <div className="th-pillar-num">{p.n}</div>
                <div className="th-pillar-name">{p.name}</div>
                <div className="th-pillar-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COMMUNITY ════════════════════════════════════════════════════════ */}
      <section className="th-section th-community" id="community">
        <div className="th-wrap">
          <div className="th-community-grid">
            <div className="th-community-photo reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/community/1.jpg" alt="30A Brotherhood gathering" />
              <div className="th-photo-cap">
                <div>Inlet Beach · 30A</div>
                <div className="th-coords">30.2769° N · 86.0080° W</div>
              </div>
            </div>

            <div className="reveal">
              <div className="th-eyebrow"><span className="th-dot" />Coast Connects</div>
              <h2 className="th-h2">Brotherhood with <em>your</em> backyard.</h2>
              <p className="th-body" style={{ marginTop: "1rem" }}>
                Monthly dinners, weekly formations, and quarterly roundtables for men
                rooted in 30A. Built for the man who wants depth where he already lives.
              </p>

              <div className="th-events">
                {[
                  { d: "14", m: "Jun", name: "Brotherhood Dinner",          meta: "7:00 PM · Santa Rosa Beach · 12 men" },
                  { d: "22", m: "Jun", name: "Morning Formation",            meta: "6:30 AM · Inlet Beach · Weekly" },
                  { d: "06", m: "Jul", name: "Business & Faith Roundtable", meta: "9:00 AM · Watersound · Quarterly" },
                ].map(ev => (
                  <div key={ev.name} className="th-event">
                    <div className="th-event-date">
                      <span className="th-event-d">{ev.d}</span>
                      <span className="th-event-m">{ev.m}</span>
                    </div>
                    <div className="th-event-info">
                      <div className="th-event-name">{ev.name}</div>
                      <div className="th-event-meta">{ev.meta}</div>
                    </div>
                    <div className="th-event-arrow">→</div>
                  </div>
                ))}
              </div>

              <div className="th-community-cta">
                <a href="#connect" className="th-btn th-btn-primary">Stay Connected →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ COACHING ═════════════════════════════════════════════════════════ */}
      <section className="th-section th-coaching" id="coaching">
        <div className="th-wrap">
          <div className="th-coaching-head reveal">
            <div>
              <div className="th-eyebrow"><span className="th-dot" />Coaching</div>
              <h2 className="th-h2">
                Structured support<br />for <em>real</em> growth.
              </h2>
            </div>
            <p className="th-body">
              Private coaching, group sharpening, executive calls, and self-paced coursework —
              built around the man who wants alignment, accountability, and forward motion.
            </p>
          </div>

          <div className="th-plans reveal-stagger">
            {PLANS.map(plan => (
              <div key={plan.name} className={`th-plan${plan.featured ? " featured" : ""}`}>
                <div className="th-plan-ix">{plan.ix} — {plan.label}</div>
                <div className="th-plan-name">{plan.name}</div>
                <div className="th-plan-sub">{plan.sub}</div>
                <ul className="th-plan-features">
                  {plan.features.map(f => <li key={f}>{f}</li>)}
                </ul>
                <a href="#" className={`th-btn${plan.gold ? " th-btn-primary" : ""}`}>
                  {plan.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT JOSH ═══════════════════════════════════════════════════════ */}
      <section className="th-section th-josh" id="josh">
        <div className="th-wrap">
          <div className="th-josh-grid">
            <div className="th-josh-photo reveal">
              <div className="th-josh-arch">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/email-window.JPG" alt="Josh Schilling" />
              </div>
              <div className="th-josh-stamp">THRIVE<br />· 30a ·<br />EST. 2024</div>
            </div>

            <div className="th-josh-body reveal">
              <div className="th-eyebrow"><span className="th-dot" />About Josh Schilling</div>
              <h2 className="th-h2">
                A pastor at a desk, a father in the field,
                a businessman <em>under authority.</em>
              </h2>

              <blockquote className="th-quote">
                "Most men aren&apos;t asking for another podcast. They&apos;re asking
                for a table, a bible, and three men who&apos;ll tell them the truth."
              </blockquote>

              <p className="th-body">
                After fifteen years building businesses on the Emerald Coast, Josh founded
                THRIVE as the kind of brotherhood he wishes had existed when he was
                twenty-eight. Honest, scripture-anchored, allergic to fluff.
              </p>

              <div className="th-sig">
                <div className="th-sig-name">Josh</div>
                <div className="th-sig-role">Founder · Pastor · 30A</div>
              </div>

              <div className="th-stats" ref={statsRef}>
                <div className="th-stat">
                  <div className="th-stat-n">{men}<em>+</em></div>
                  <div className="th-stat-l">Men formed</div>
                </div>
                <div className="th-stat">
                  <div className="th-stat-n">{retr}</div>
                  <div className="th-stat-l">Retreats hosted</div>
                </div>
                <div className="th-stat">
                  <div className="th-stat-n">{yrs}</div>
                  <div className="th-stat-l">Years on 30A</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONNECT ══════════════════════════════════════════════════════════ */}
      <section className="th-connect" id="connect">
        <div className="th-connect-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/retreats/emerald-house/back.jpg" alt="" />
        </div>
        <div className="th-connect-overlay" />

        <div className="th-connect-inner reveal">
          <div className="th-eyebrow"><span className="th-dot" />Stay Connected</div>
          <h2 className="th-h2">Quiet updates. Invitations. <em>Reflections.</em></h2>
          <p className="th-body">
            One letter a month. No noise. Retreat openings, formation prompts, and the
            occasional verse that&apos;s been running through Josh&apos;s head.
          </p>

          <form
            className="th-form"
            onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
          >
            <div className="th-form-row">
              <input type="text"  placeholder="First name"     required />
              <input type="email" placeholder="Email address"  required />
            </div>
            <select defaultValue="">
              <option value="" disabled>How did you find THRIVE?</option>
              <option>A friend in the brotherhood</option>
              <option>Search</option>
              <option>Instagram / Social</option>
              <option>Met Josh in person</option>
              <option>Other</option>
            </select>
            <button type="submit" className="th-btn th-btn-primary">
              {submitted ? "You're in. Check your inbox →" : "Get the Letter →"}
            </button>
            <div className="th-form-foot">
              No spam. Unsubscribe in one click.
            </div>
          </form>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer className="th-footer">
        <div className="th-wrap">
          <div className="th-footer-grid">
            <div>
              <div className="th-footer-brand">THRIVE<span>·30A</span></div>
              <p className="th-footer-tag">
                A ministry and growth ecosystem for Christian businessmen on the
                30A coast of Florida.
              </p>
            </div>
            <div className="th-footer-col">
              <h4>Navigate</h4>
              <a href="#about">About</a>
              <a href="#community">Community</a>
              <a href="#coaching">Coaching</a>
            </div>
            <div className="th-footer-col">
              <h4>Connect</h4>
              <a href="#connect">Newsletter</a>
              <a href="#">Instagram</a>
              <a href="#">Skool</a>
              <a href="#">Contact</a>
            </div>
            <div className="th-footer-col">
              <h4>Located</h4>
              <a href="#">Santa Rosa Beach, FL</a>
              <a href="#">30A · Emerald Coast</a>
              <a href="#">30.2769° N</a>
              <a href="#">86.0080° W</a>
            </div>
          </div>

          <div className="th-footer-bottom">
            <span>© 2026 THRIVE 30A · All rights reserved</span>
            <span>Santa Rosa Beach, FL · Emerald Coast</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
