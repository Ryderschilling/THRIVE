import Link from "next/link";

import PageHero from "@/components/site/PageHero";
import Testimonials from "@/components/site/Testimonials";
import CtaBand from "@/components/site/CtaBand";
import { plans } from "@/content/site";
import { coachingProducts } from "@/content/coaching";

export const metadata = {
  title: "Coaching",
  description:
    "Private coaching, group formation, and executive support with Josh Schilling. Faith-first structure for men who carry weight.",
};

export default function CoachingPage() {
  const courses = coachingProducts.find((p) => p.kind === "COURSE");

  return (
    <>
      <PageHero
        eyebrow="Coaching"
        title={<>Structured<br />Support For<br /><em>Real Growth.</em></>}
        lede="For the man who wants more than a monthly table. Clarity, alignment, accountability, and forward motion, grounded in scripture."
        image="/images/retreats/emerald-house/top.jpg"
      >
        <div className="t-btns" style={{ marginTop: "2.25rem" }}>
          <a href="#plans" className="t-btn t-btn-gold">
            See the containers <span className="ar">&rarr;</span>
          </a>
          <Link href="/join" className="t-btn t-btn-ghost">
            Talk to Josh first
          </Link>
        </div>
      </PageHero>

      {/* Plans */}
      <section className="t-sec" id="plans">
        <div className="t-ghost" aria-hidden="true">COACHING</div>
        <div className="t-wrap">
          <div className="t-head t-rv">
            <div>
              <div className="t-eyebrow">Three containers</div>
              <h2 className="t-h2">
                Pick The One<br />That Matches<br /><em>Your Season.</em>
              </h2>
            </div>
            <p className="t-lede">
              Not sure which? Start with a conversation. Josh will tell you honestly
              if none of them fit right now.
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

      {/* How it works */}
      <section className="t-sec cream tight">
        <div className="t-wrap">
          <div className="t-head-center t-rv">
            <div className="t-eyebrow">How it works</div>
            <h2 className="t-h2">
              Four Steps, <em>No Funnel.</em>
            </h2>
          </div>
          <div className="t-pillars t-rvs">
            <div className="t-pillar">
              <div className="t-pillar-n">i.</div>
              <div className="t-pillar-name">You reach out</div>
              <div className="t-pillar-desc">
                Fill in the short form. Tell Josh where you are actually stuck.
              </div>
            </div>
            <div className="t-pillar">
              <div className="t-pillar-n">ii.</div>
              <div className="t-pillar-name">One honest call</div>
              <div className="t-pillar-desc">
                Thirty minutes. If coaching is not the right move, he says so.
              </div>
            </div>
            <div className="t-pillar">
              <div className="t-pillar-n">iii.</div>
              <div className="t-pillar-name">You start</div>
              <div className="t-pillar-desc">
                A roadmap, a cadence, and someone who notices when you go quiet.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      {courses && (
        <section className="t-sec raise tight">
          <div className="t-wrapt">
            <div className="t-head-center t-rv">
              <div className="t-eyebrow">Self-paced</div>
              <h2 className="t-h2">
                Courses On <em>Skool.</em>
              </h2>
              <p className="t-lede">{courses.description}</p>
              <div className="t-btns" style={{ justifyContent: "center", marginTop: "2rem" }}>
                <a
                  href={courses.externalUrl || "https://www.skool.com/"}
                  target="_blank"
                  rel="noreferrer"
                  className="t-btn t-btn-ghost"
                >
                  {courses.ctaLabel} <span className="ar">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stories */}
      <section className="t-sec cream">
        <div className="t-wrap">
          <div className="t-head-center t-rv">
            <div className="t-eyebrow">Hear from the men</div>
            <h2 className="t-h2">
              What It Actually <em>Did.</em>
            </h2>
          </div>
          <div className="t-rv">
            <Testimonials />
          </div>
        </div>
      </section>

      <CtaBand
        image="/images/retreats/emerald-house/pool.jpg"
        title={<>Start With One <em>Conversation.</em></>}
        body="Thirty minutes, no pitch. If coaching is not the right move for your season, Josh will tell you that."
        secondary={{ label: "Back to community", href: "/community" }}
      />
    </>
  );
}
