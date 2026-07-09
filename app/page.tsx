"use client";

import { useEffect, useRef, useState } from "react";

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

/* ── Data ───────────────────────────────────────────────────────────────────── */
const TICKER_ITEMS = [
  { text: "Iron Sharpens Iron", ref: "Prov 27:17" },
  { text: "Brotherhood · Formation · Kingdom Impact" },
  { text: "Santa Rosa Beach · 30A · Florida" },
  { text: "Be Strong and Courageous", ref: "Josh 1:9" },
  { text: "Ministry · Discipleship · Encouragement" },
  { text: "Christian Businessmen · Emerald Coast" },
];

const PLANS = [
  {
    ix: "i.", label: "Group",
    name: "Thrive Groups",
    sub: "Brotherhood with structure and direction.",
    features: [
      "Group calls + guided framework",
      "Community accountability",
      "Hot seats & implementation focus",
      "Q&A with Josh, monthly",
    ],
    cta: "Sign Up", primary: false, featured: false,
  },
  {
    ix: "ii.", label: "Personal",
    name: "Thrive Personal",
    sub: "A private container for breakthrough.",
    features: [
      "Private coaching cadence",
      "Personal roadmap + accountability",
      "Faith-first alignment for life & leadership",
      "Direct text access between calls",
    ],
    cta: "Apply Now", primary: true, featured: true,
  },
  {
    ix: "iii.", label: "Executive",
    name: "Thrive Executive",
    sub: "High-touch leadership and business support.",
    features: [
      "Executive-level structure",
      "Business alignment + leadership systems",
      "Decision-point strategy calls",
      "Quarterly in-person reset (30A)",
    ],
    cta: "Inquire", primary: false, featured: false,
  },
];

/* ══════════════════════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [scrolled,     setScrolled]     = useState(false);
  const [submitted,    setSubmitted]    = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  const rootRef  = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const men  = useCountUp(200, statsVisible, 1800);
  const retr = useCountUp(12,  statsVisible, 1400);
  const yrs  = useCountUp(4,   statsVisible, 1000);

  /* Nav scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Section reveal observer */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    root.querySelectorAll(".reveal, .stagger").forEach(el => io.observe(el));
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
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    };
    document.addEventListener("click", fn);
    return () => document.removeEventListener("click", fn);
  }, []);

  return (
    <div ref={rootRef}>

      {/* ══ NAV ══════════════════════════════════════════════════════════════ */}
      <header className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-pill">
          <a href="#" className="nav-brand">THRIVE<span>·30A</span></a>
          <nav className="nav-links">
            <a href="#mission">About</a>
            <a href="#community">Community</a>
            <a href="#coaching">Coaching</a>
            <a href="#retreats">Retreats</a>
          </nav>
          <a href="#connect" className="nav-cta">Get Involved</a>
        </div>
      </header>

      {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/images/hero-drone-web.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Christian Brotherhood · Santa Rosa Beach, FL
          </div>
          <h1 className="hero-title">
            <span className="hero-title-line">THRIVE.</span>
            <span className="hero-title-line outline">30A.</span>
            <span className="hero-title-line">BUILT</span>
            <span className="hero-title-line outline">FOR MEN.</span>
          </h1>
          <div className="hero-sub">
            <p>
              A ministry and growth ecosystem for Christian businessmen rooted in the
              Emerald Coast. Faith, formation, and kingdom impact.
            </p>
            <a href="#connect" className="hero-cta-btn">Get Involved →</a>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* ══ TICKER ═══════════════════════════════════════════════════════════ */}
      <div className="ticker">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">
              {item.text}
              {item.ref && <em> · {item.ref}</em>}
              <span className="ticker-sep"> ✦ </span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ MISSION ══════════════════════════════════════════════════════════ */}
      <section className="mission" id="mission">
        <div className="mission-ghost" aria-hidden="true">FORMATION</div>
        <div className="wrap">
          <div className="mission-inner">
            <div className="reveal">
              <div className="label">
                <span className="label-dot" />
                The Mission
              </div>
              <h2 className="mission-headline">
                Faith, Family,<br />
                <em>&amp; Business</em><br />
                On One Root.
              </h2>
            </div>

            <div className="mission-body reveal">
              <p>
                THRIVE is a community of Christian businessmen rooted in the 30A coast of
                Florida — pursuing brotherhood, formation, leadership, and kingdom impact.
                Not a conference. Not a club. A formation.
              </p>
              <p>
                Built for the man who wants his faith and his work to grow from the same
                place — honest, scripture-anchored, and allergic to fluff.
              </p>
            </div>
          </div>

          <div className="pillars stagger">
            {[
              { n: "i.",   name: "Brotherhood",    desc: "Honest tables, morning formations, men who actually show up." },
              { n: "ii.",  name: "Formation",      desc: "Scripture-led rhythms for leadership, fatherhood, and stewardship of work." },
              { n: "iii.", name: "Kingdom Impact", desc: "Business as a vehicle for obedience, generosity, and lasting witness." },
            ].map(p => (
              <div key={p.n} className="pillar">
                <div className="pillar-num">{p.n}</div>
                <div className="pillar-name">{p.name}</div>
                <div className="pillar-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COMMUNITY ════════════════════════════════════════════════════════ */}
      <section className="community" id="community">
        <div className="wrap">
          <div className="community-grid">

            <div className="community-photos reveal">
              <div className="community-photo-main">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/community/1.jpg" alt="Brotherhood gathering" />
              </div>
              <div className="community-photo-float">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/retreats/past/1.jpg" alt="Men in formation" />
              </div>
            </div>

            <div className="reveal">
              <div className="label">
                <span className="label-dot" />
                Coast Connects
              </div>
              <h2 className="community-headline">
                Brotherhood<br />With Your<br /><em>Backyard.</em>
              </h2>
              <p className="community-body">
                Monthly dinners, weekly formations, and quarterly roundtables for men
                rooted in 30A. Built for the man who wants depth where he already lives.
              </p>

              <div className="events">
                {[
                  { d: "14", m: "Jul", name: "Brotherhood Dinner",          meta: "7:00 PM · Santa Rosa Beach · 12 men" },
                  { d: "22", m: "Jul", name: "Morning Formation",            meta: "6:30 AM · Inlet Beach · Weekly" },
                  { d: "06", m: "Aug", name: "Business & Faith Roundtable", meta: "9:00 AM · Watersound · Quarterly" },
                ].map(ev => (
                  <div key={ev.name} className="event">
                    <div className="event-date">
                      <span className="event-d">{ev.d}</span>
                      <span className="event-m">{ev.m}</span>
                    </div>
                    <div className="event-info">
                      <div className="event-name">{ev.name}</div>
                      <div className="event-meta">{ev.meta}</div>
                    </div>
                    <div className="event-arrow">→</div>
                  </div>
                ))}
              </div>

              <a href="#connect" className="hero-cta-btn" style={{ background: "var(--c-black)", color: "var(--c-white)" }}>
                Stay Connected →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ COACHING ═════════════════════════════════════════════════════════ */}
      <section className="coaching" id="coaching">
        <div className="coaching-ghost" aria-hidden="true">COACHING</div>
        <div className="wrap">
          <div className="coaching-head reveal">
            <div>
              <div className="label" style={{ color: "rgba(255,255,255,0.3)" }}>
                <span className="label-dot" />
                Coaching
              </div>
              <h2 className="coaching-headline">
                Structured<br />Support For<br /><em>Real Growth.</em>
              </h2>
            </div>
            <p className="coaching-intro">
              Private coaching, group sharpening, executive calls — built around the man
              who wants alignment, accountability, and forward motion.
            </p>
          </div>

          <div className="plans stagger">
            {PLANS.map(plan => (
              <div key={plan.name} className={`plan${plan.featured ? " featured" : ""}`}>
                <div className="plan-ix">{plan.ix} — {plan.label}</div>
                <div className="plan-name">{plan.name}</div>
                <div className="plan-sub">{plan.sub}</div>
                <ul className="plan-features">
                  {plan.features.map(f => <li key={f}>{f}</li>)}
                </ul>
                <a href="#connect" className={`plan-btn${plan.primary ? " primary" : ""}`}>
                  {plan.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RETREATS ═════════════════════════════════════════════════════════ */}
      <section className="retreats" id="retreats">
        <div className="retreats-ghost" aria-hidden="true">RETREATS</div>
        <div className="wrap">
          <div className="retreats-head reveal">
            <div>
              <div className="label">
                <span className="label-dot" />
                Retreats
              </div>
              <h2 className="retreats-headline">
                Slowed Down.<br /><em>Sharpened.</em>
              </h2>
            </div>
            <p className="retreats-intro">
              Invite-only and open-apply retreats held in coastal environments
              designed to reset your compass and deepen your formation.
            </p>
          </div>

          <div className="retreats-grid stagger">
            <div className="retreat-card tall">
              <div className="retreat-card-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/retreats/emerald-house/cover.jpg" alt="Leadership Retreat" />
              </div>
              <div className="retreat-card-info">
                <span className="retreat-badge gold">Invite-Only</span>
                <div className="retreat-title">Leadership Retreat</div>
                <div className="retreat-meta">Apr 12–15 · Emerald House · 30A · 18 spots</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="retreat-card">
                <div className="retreat-card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/retreats/emerald-house/pool.jpg" alt="Rising Strong Retreat" />
                </div>
                <div className="retreat-card-info">
                  <span className="retreat-badge">Open · Apply</span>
                  <div className="retreat-title">Rising Strong</div>
                  <div className="retreat-meta">Jun 5–8 · Santa Rosa Beach · 14 spots</div>
                </div>
              </div>

              <div className="retreat-card">
                <div className="retreat-card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/retreats/emerald-house/drone.jpg" alt="30A Aerial" />
                </div>
                <div className="retreat-card-info">
                  <span className="retreat-badge" style={{ background: "var(--c-muted)" }}>Coming Soon</span>
                  <div className="retreat-title">Fall Retreat 2026</div>
                  <div className="retreat-meta">Oct · Emerald Coast · TBA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT JOSH ═══════════════════════════════════════════════════════ */}
      <section className="josh" id="josh">
        <div className="wrap">
          <div className="josh-grid">

            <div className="josh-photo-wrap reveal">
              <div className="josh-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/email-window.JPG" alt="Josh Schilling" />
              </div>
              <div className="josh-stamp">
                THRIVE<br />
                <em>· 30A ·</em><br />
                EST. 2024
              </div>
            </div>

            <div className="reveal">
              <div className="label">
                <span className="label-dot" />
                About Josh Schilling
              </div>
              <h2 className="josh-headline">
                A Father<br />In The Field,<br /><em>Under Authority.</em>
              </h2>

              <blockquote className="josh-quote">
                &ldquo;Most men aren&apos;t asking for another podcast. They&apos;re asking
                for a table, a bible, and three men who&apos;ll tell them the truth.&rdquo;
              </blockquote>

              <p className="josh-body">
                After fifteen years building businesses on the Emerald Coast, Josh founded
                THRIVE as the kind of brotherhood he wishes had existed when he was
                twenty-eight. Honest, scripture-anchored, allergic to fluff.
              </p>

              <div className="josh-sig-name">Josh</div>
              <div className="josh-sig-role">Founder · Pastor · 30A</div>

              <div className="stats" ref={statsRef}>
                <div>
                  <div className="stat-n">{men}<em>+</em></div>
                  <div className="stat-l">Men formed</div>
                </div>
                <div>
                  <div className="stat-n">{retr}</div>
                  <div className="stat-l">Retreats hosted</div>
                </div>
                <div>
                  <div className="stat-n">{yrs}</div>
                  <div className="stat-l">Years on 30A</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ CONNECT ══════════════════════════════════════════════════════════ */}
      <section className="connect" id="connect">
        <div className="connect-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/retreats/emerald-house/back.jpg" alt="" />
        </div>
        <div className="connect-bg-overlay" />

        <div className="wrap">
          <div className="connect-inner reveal">
            <div className="label" style={{ color: "rgba(255,255,255,0.28)" }}>
              <span className="label-dot" />
              Stay Connected
            </div>
            <h2 className="connect-headline">
              Quiet Updates.<br />Invitations.<br /><em>Reflections.</em>
            </h2>
            <p className="connect-body">
              One letter a month. No noise. Retreat openings, formation prompts,
              and the occasional verse that&apos;s been running through Josh&apos;s head.
            </p>

            <form
              className="form"
              onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
            >
              <div className="form-row">
                <input type="text"  placeholder="First name"    required />
                <input type="email" placeholder="Email address" required />
              </div>
              <select defaultValue="">
                <option value="" disabled>How did you find THRIVE?</option>
                <option>A friend in the brotherhood</option>
                <option>Search</option>
                <option>Instagram / Social</option>
                <option>Met Josh in person</option>
                <option>Other</option>
              </select>
              <button type="submit" className="form-submit">
                {submitted ? "You're in. Check your inbox →" : "Get the Letter →"}
              </button>
              <div className="form-foot">No spam. Unsubscribe in one click.</div>
            </form>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">THRIVE<span>·30A</span></div>
              <p className="footer-tag">
                A ministry and growth ecosystem for Christian businessmen on the
                30A coast of Florida.
              </p>
            </div>
            <div className="footer-col">
              <h4>Navigate</h4>
              <a href="#mission">About</a>
              <a href="#community">Community</a>
              <a href="#coaching">Coaching</a>
              <a href="#retreats">Retreats</a>
            </div>
            <div className="footer-col">
              <h4>Connect</h4>
              <a href="#connect">Newsletter</a>
              <a href="#">Instagram</a>
              <a href="#">Skool</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer-col">
              <h4>Located</h4>
              <a href="#">Santa Rosa Beach, FL</a>
              <a href="#">30A · Emerald Coast</a>
              <a href="#">30.2769° N</a>
              <a href="#">86.0080° W</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 THRIVE 30A · All rights reserved</span>
            <span>Santa Rosa Beach, FL · Emerald Coast</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
