import Link from "next/link";

import PageHero from "@/components/site/PageHero";
import ProofBar from "@/components/site/ProofBar";
import JoinForm from "@/components/site/JoinForm";
import Testimonials from "@/components/site/Testimonials";
import Faq from "@/components/site/Faq";
import VerseBand from "@/components/site/VerseBand";
import UpcomingEvents from "@/components/site/UpcomingEvents";
import { access, fit, pillars } from "@/content/site";

export const metadata = {
  title: "Get Involved",
  description:
    "Put your name in and Josh will point you at the next THRIVE gathering that fits you. No fee, no application to pass.",
};

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title={<>Come Sit At<br />The <em>Table.</em></>}
        lede="Two hundred men on the Emerald Coast who decided faith, family, and business grow from the same root. Showing up costs nothing but the drive."
        image="/images/community/1.jpg"
      >
        <div className="t-btns" style={{ marginTop: "2.25rem" }}>
          <a href="#form" className="t-btn t-btn-gold">
            Put my name in <span className="ar">&rarr;</span>
          </a>
          <Link href="/events" className="t-btn t-btn-ghost">
            See the calendar
          </Link>
        </div>
      </PageHero>

      {/* Proof */}
      <section className="t-sec tight">
        <div className="t-wrap t-rv">
          <ProofBar />
        </div>
      </section>

      {/* Why */}
      <section className="t-sec cream">
        <div className="t-ghost" aria-hidden="true">WHY</div>
        <div className="t-wrap">
          <div className="t-head-center t-rv">
            <div className="t-eyebrow">Why men come</div>
            <h2 className="t-h2">
              Three Things You <em>Actually Get.</em>
            </h2>
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

      {/* Access list */}
      <section className="t-sec">
        <div className="t-wrap">
          <div className="t-access">
            <div className="t-rv">
              <div className="t-eyebrow">Access to</div>
              <h2 className="t-h2">
                Everything<br /><em>Inside.</em>
              </h2>
              <p className="t-body" style={{ marginTop: "1.5rem" }}>
                Gatherings are free and always will be. Retreats and coaching are
                paid, and the price is listed on those pages. Nothing is hidden
                behind a call.
              </p>
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

      {/* Fit */}
      <section className="t-sec raise tight">
        <div className="t-wrap">
          <div className="t-head-center t-rv">
            <div className="t-eyebrow">Am I a fit?</div>
            <h2 className="t-h2">
              Read Both <em>Columns.</em>
            </h2>
            <p className="t-lede">
              We would rather you know before you make the drive.
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

      <VerseBand />

      {/* Form */}
      <section className="t-sec" id="form">
        <div className="t-wrap">
          <div className="t-access">
            <div className="t-rv">
              <div className="t-eyebrow">One step</div>
              <h2 className="t-h2">
                Put Your<br />Name In.<br /><em>That&rsquo;s It.</em>
              </h2>
              <p className="t-body" style={{ marginTop: "1.5rem" }}>
                Josh reads every one of these himself and replies personally. Usually
                within a day.
              </p>
              <div style={{ marginTop: "2.25rem" }}>
                <div className="t-eyebrow">Next on the calendar</div>
                <UpcomingEvents limit={2} />
              </div>
            </div>
            <div className="t-rv">
              <JoinForm source="join-page" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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

      {/* FAQ */}
      <section className="t-sec tight">
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
    </>
  );
}
