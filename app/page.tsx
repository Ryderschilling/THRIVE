import Link from "next/link";

import Ticker from "@/components/site/Ticker";
import ProofBar from "@/components/site/ProofBar";
import UpcomingEvents from "@/components/site/UpcomingEvents";
import Testimonials from "@/components/site/Testimonials";
import JoinForm from "@/components/site/JoinForm";
import Faq from "@/components/site/Faq";
import VerseBand from "@/components/site/VerseBand";
import CtaBand from "@/components/site/CtaBand";

import { access, fit, pillars, plans, rhythm, site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      {/* ── 01 · HERO ─────────────────────────────────────────────────── */}
      <section className="t-hero" id="top">
        <div className="t-hero-media" aria-hidden="true">
          <video autoPlay muted loop playsInline poster="/images/home-hero-sunset.PNG">
            <source src="/images/hero-drone-web.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="t-hero-scrim" aria-hidden="true" />

        <div className="t-hero-inner">
          <div className="t-hero-tag">
            <i />
            Christian Brotherhood &middot; Santa Rosa Beach, FL
          </div>

          <h1 className="t-hero-title">
            <span className="line">Thrive.</span>
            <span className="line outline">30A.</span>
            <span className="line">Built</span>
            <span className="line outline">For Men.</span>
          </h1>

          <div className="t-hero-foot">
            <p>
              Two hundred men on the Emerald Coast who decided that faith, family,
              and business grow from the same root. Brotherhood you can drive to.
            </p>
            <div className="t-btns">
              <Link href={site.primaryCta.href} className="t-btn t-btn-gold">
                {site.primaryCta.label} <span className="ar">&rarr;</span>
              </Link>
              <Link href="/events" className="t-btn t-btn-ghost">
                See the calendar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Ticker />

      {/* ── 02 · PROOF ────────────────────────────────────────────────── */}
      <section className="t-sec tight">
        <div className="t-wrap t-rv">
          <ProofBar />
        </div>
      </section>

      {/* ── 03 · WHY / PILLARS ────────────────────────────────────────── */}
      <section className="t-sec cream" id="about">
        <div className="t-ghost" aria-hidden="true">FORMATION</div>
        <div className="t-wrap">
          <div className="t-head t-rv">
            <div>
              <div className="t-eyebrow">Why THRIVE</div>
              <h2 className="t-h2">
                Faith, Family,<br />
                <em>&amp; Business</em><br />
                On One Root.
              </h2>
            </div>
            <div>
              <p className="t-lede">
                THRIVE is a community of Christian businessmen rooted on 30A,
                pursuing brotherhood, formation, leadership, and kingdom impact.
                Not a conference. Not a club. A formation.
              </p>
              <p className="t-body" style={{ marginTop: "1.25rem" }}>
                Built for the man who wants his faith and his work to grow from the
                same place. Honest, scripture-anchored, allergic to fluff.
              </p>
            </div>
          </div>

          <div className="t-pillars t-rvs">
            {pillars.map((p) => (
              <div key={p.name} className="t-pillar">
                <div className="t-pillar-n">{p.ix}</div>
                <div className="t-pillar-name">{p.name}</div>
                <div className="t-pillar-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · WHAT'S ACTUALLY HERE ─────────────────────────────────── */}
      <section className="t-sec" id="whats-here">
        <div className="t-wrap">
          <div className="t-access">
            <div className="t-rv">
              <div className="t-eyebrow">What&rsquo;s actually here</div>
              <h2 className="t-h2">
                Everything<br />You Get<br /><em>Access To.</em>
              </h2>
              <p className="t-body" style={{ marginTop: "1.5rem" }}>
                No tiers, no gate, no membership fee to walk in the door. Show up to
                one thing and you are part of it.
              </p>
              <Link
                href={site.primaryCta.href}
                className="t-btn t-btn-gold"
                style={{ marginTop: "2rem" }}
              >
                Get Involved <span className="ar">&rarr;</span>
              </Link>
            </div>

            <div className="t-access-list t-rv">
              {access.map((a) => (
                <div key={a.title} className="t-access-item">
                  <i />
                  <span>
                    {a.title}
                    <em>{a.note}</em>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 · IS THIS YOU ──────────────────────────────────────────── */}
      <section className="t-sec raise tight" id="fit">
        <div className="t-wrap">
          <div className="t-head-center t-rv">
            <div className="t-eyebrow">Am I a fit?</div>
            <h2 className="t-h2">
              Is This <em>You?</em>
            </h2>
            <p className="t-lede">
              We would rather you know before you drive out here. Read both columns
              honestly.
            </p>
          </div>

          <div className="t-fit t-rvs">
            <div className="t-fit-col yes">
              <div className="t-fit-title">{fit.yes.title}</div>
              <ul className="t-fit-list">
                {fit.yes.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div className="t-fit-col no">
              <div className="t-fit-title">{fit.no.title}</div>
              <ul className="t-fit-list">
                {fit.no.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 · THE RHYTHM ───────────────────────────────────────────── */}
      <section className="t-sec" id="community">
        <div className="t-ghost" aria-hidden="true">GATHER</div>
        <div className="t-wrap">
          <div className="t-head t-rv">
            <div>
              <div className="t-eyebrow">Coast Connects</div>
              <h2 className="t-h2">
                Brotherhood<br />With Your<br /><em>Backyard.</em>
              </h2>
            </div>
            <p className="t-lede">
              A rhythm you can actually keep. Weekly, monthly, quarterly, and twice
              a year off the grid.
            </p>
          </div>

          <div className="t-rows t-rv">
            {rhythm.map((r) => (
              <div key={r.title} className="t-row">
                <div className="t-row-when">{r.when}</div>
                <div>
                  <div className="t-row-title">{r.title}</div>
                  <div className="t-row-desc">{r.desc}</div>
                </div>
                <div className="t-row-meta">{r.meta}</div>
              </div>
            ))}
          </div>

          <div
            className="t-rv"
            style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            <div className="t-eyebrow">Next on the calendar</div>
            <UpcomingEvents limit={3} />
            <Link
              href="/events"
              className="t-btn t-btn-ghost"
              style={{ marginTop: "1.75rem" }}
            >
              View full calendar <span className="ar">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 07 · RETREATS ─────────────────────────────────────────────── */}
      <section className="t-sec raise" id="retreats">
        <div className="t-wrap">
          <div className="t-head t-rv">
            <div>
              <div className="t-eyebrow">Retreats</div>
              <h2 className="t-h2">
                Slowed Down.<br /><em>Sharpened.</em>
              </h2>
            </div>
            <p className="t-lede">
              Three days in coastal quiet, built to reset your compass and deepen
              your formation. Invite-only and open-apply.
            </p>
          </div>

          <div className="t-rgrid t-rvs">
            <Link href="/retreats" className="t-rcard tall">
              <div className="t-rcard-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/retreats/emerald-house/cover.jpg" alt="Leadership Retreat" />
              </div>
              <div className="t-rcard-scrim" aria-hidden="true" />
              <div className="t-rcard-info">
                <span className="t-badge gold">Invite-Only</span>
                <div className="t-rcard-title">Leadership Retreat</div>
                <div className="t-rcard-meta">
                  Apr 12&ndash;15 &middot; Emerald House &middot; 30A &middot; 18 spots
                </div>
              </div>
            </Link>

            <div className="t-rstack">
              <Link href="/retreats" className="t-rcard">
                <div className="t-rcard-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/retreats/emerald-house/pool.jpg" alt="Rising Strong" />
                </div>
                <div className="t-rcard-scrim" aria-hidden="true" />
                <div className="t-rcard-info">
                  <span className="t-badge">Open &middot; Apply</span>
                  <div className="t-rcard-title">Rising Strong</div>
                  <div className="t-rcard-meta">
                    Jun 5&ndash;8 &middot; Santa Rosa Beach &middot; 14 spots
                  </div>
                </div>
              </Link>

              <Link href="/retreats" className="t-rcard">
                <div className="t-rcard-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/retreats/emerald-house/drone.jpg" alt="Fall Retreat" />
                </div>
                <div className="t-rcard-scrim" aria-hidden="true" />
                <div className="t-rcard-info">
                  <span className="t-badge mute">Coming Soon</span>
                  <div className="t-rcard-title">Fall Retreat</div>
                  <div className="t-rcard-meta">Oct &middot; Emerald Coast &middot; TBA</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08 · COACHING ─────────────────────────────────────────────── */}
      <section className="t-sec" id="coaching">
        <div className="t-ghost" aria-hidden="true">COACHING</div>
        <div className="t-wrap">
          <div className="t-head t-rv">
            <div>
              <div className="t-eyebrow">Go deeper</div>
              <h2 className="t-h2">
                Structured<br />Support For<br /><em>Real Growth.</em>
              </h2>
            </div>
            <p className="t-lede">
              For the man who wants more than a monthly table. Private coaching,
              group sharpening, executive-level structure.
            </p>
          </div>

          <div className="t-plans t-rvs">
            {plans.map((plan) => (
              <div key={plan.name} className={`t-plan${plan.featured ? " featured" : ""}`}>
                {plan.flag && <div className="t-plan-flag">{plan.flag}</div>}
                <div className="t-plan-ix">{plan.ix}</div>
                <div className="t-plan-name">{plan.name}</div>
                <div className="t-plan-sub">{plan.sub}</div>
                <ul className="t-plan-features">
                  {plan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`t-btn ${plan.featured ? "t-btn-gold" : "t-btn-ghost"}`}
                >
                  {plan.cta} <span className="ar">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 09 · JOSH ─────────────────────────────────────────────────── */}
      <section className="t-sec cream" id="josh">
        <div className="t-wrap">
          <div className="t-split">
            <div className="t-figure t-rv">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/email-window.JPG" alt="Josh Schilling" />
              <div className="t-stamp">
                THRIVE
                <br />
                <em>&middot; 30A &middot;</em>
                <br />
                EST. 2024
              </div>
            </div>

            <div className="t-rv">
              <div className="t-eyebrow">About Josh Schilling</div>
              <h2 className="t-h2">
                A Father<br />In The Field,<br /><em>Under Authority.</em>
              </h2>

              <blockquote className="t-quote">
                Most men aren&rsquo;t asking for another podcast. They&rsquo;re asking
                for a table, a bible, and three men who&rsquo;ll tell them the truth.
              </blockquote>

              <p className="t-body">
                After fifteen years building businesses on the Emerald Coast, Josh
                founded THRIVE as the kind of brotherhood he wishes had existed when
                he was twenty-eight. Honest, scripture-anchored, allergic to fluff.
              </p>

              <div className="t-sig-name">Josh</div>
              <div className="t-sig-role">Founder &middot; Pastor &middot; 30A</div>
            </div>
          </div>
        </div>
      </section>

      <VerseBand />

      {/* ── 10 · THE FORM ─────────────────────────────────────────────── */}
      <section className="t-sec" id="connect">
        <div className="t-wrap">
          <div className="t-access">
            <div className="t-rv">
              <div className="t-eyebrow">One step</div>
              <h2 className="t-h2">
                Put Your<br />Name In.<br /><em>That&rsquo;s It.</em>
              </h2>
              <p className="t-body" style={{ marginTop: "1.5rem" }}>
                No application to pass, no fee to walk in. Tell Josh what you are
                drawn to and he will point you at the next gathering that fits.
              </p>
            </div>
            <div className="t-rv">
              <JoinForm source="home" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 11 · TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="t-sec cream" id="stories">
        <div className="t-wrap">
          <div className="t-head-center t-rv">
            <div className="t-eyebrow">Hear from the men</div>
            <h2 className="t-h2">
              What It Actually <em>Did.</em>
            </h2>
            <p className="t-lede">
              In their words, not ours.
            </p>
          </div>
          <div className="t-rv">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* ── 12 · FAQ ──────────────────────────────────────────────────── */}
      <section className="t-sec tight" id="faq">
        <div className="t-wrapt">
          <div className="t-head-center t-rv">
            <div className="t-eyebrow">Questions</div>
            <h2 className="t-h2">
              Before You <em>Ask.</em>
            </h2>
          </div>
          <div className="t-rv">
            <Faq />
          </div>
        </div>
      </section>

      <CtaBand
        title={<>Come Sit At The <em>Table.</em></>}
        body="The next gathering is already on the calendar. Show up once and see if these are your men."
      />
    </>
  );
}
