import PageHero from "@/components/site/PageHero";
import ProofBar from "@/components/site/ProofBar";
import CtaBand from "@/components/site/CtaBand";
import VerseBand from "@/components/site/VerseBand";
import Faq from "@/components/site/Faq";
import { access, fit, pillars } from "@/content/site";

export const metadata = {
  title: "About",
  description:
    "THRIVE is a ministry and growth ecosystem for Christian businessmen on 30A. Ministry, discipleship, encouragement.",
};

export default function ThrivePage() {
  return (
    <>
      <PageHero
        eyebrow="About THRIVE"
        title={<>Ministry.<br />Discipleship.<br /><em>Encouragement.</em></>}
        lede="A community of Christian businessmen rooted on Florida's Emerald Coast, pursuing brotherhood, formation, leadership, and kingdom impact."
        image="/images/palm-leaves-bg.png"
      />

      <section className="t-sec tight">
        <div className="t-wrap t-rv">
          <ProofBar />
        </div>
      </section>

      <section className="t-sec cream">
        <div className="t-ghost" aria-hidden="true">ROOT</div>
        <div className="t-wrap">
          <div className="t-head t-rv">
            <div>
              <div className="t-eyebrow">The mission</div>
              <h2 className="t-h2">
                Faith, Family,<br /><em>&amp; Business</em><br />On One Root.
              </h2>
            </div>
            <div>
              <p className="t-lede">
                Not a conference. Not a club. A formation.
              </p>
              <p className="t-body" style={{ marginTop: "1.25rem" }}>
                Most men have a version of themselves for church, a version for work,
                and a version for home. THRIVE exists to collapse those into one man
                who is the same in every room. That happens slowly, in person, next to
                other men who will not let you perform.
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

      <section className="t-sec">
        <div className="t-wrap">
          <div className="t-split flip">
            <div className="t-rv">
              <div className="t-eyebrow">The posture</div>
              <h2 className="t-h2">
                No Performance.<br />No Branding Of<br /><em>Spirituality.</em>
              </h2>
              <blockquote className="t-quote">
                Most men aren&rsquo;t asking for another podcast. They&rsquo;re asking
                for a table, a bible, and three men who&rsquo;ll tell them the truth.
              </blockquote>
              <p className="t-body">
                Steady obedience, brotherhood, and responsibility. We open scripture,
                we ask real questions, and we go back to work different. There is no
                stage here and nobody is building a following.
              </p>
              <div className="t-sig-name">Josh</div>
              <div className="t-sig-role">Founder &middot; Pastor &middot; 30A</div>
            </div>
            <div className="t-figure t-rv">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/community/2.jpg" alt="Men gathered on 30A" />
            </div>
          </div>
        </div>
      </section>

      <section className="t-sec raise">
        <div className="t-wrap">
          <div className="t-access">
            <div className="t-rv">
              <div className="t-eyebrow">What&rsquo;s actually here</div>
              <h2 className="t-h2">
                Everything<br />You Get<br /><em>Access To.</em>
              </h2>
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

      <section className="t-sec tight">
        <div className="t-wrap">
          <div className="t-head-center t-rv">
            <div className="t-eyebrow">Am I a fit?</div>
            <h2 className="t-h2">
              Is This <em>You?</em>
            </h2>
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

      <CtaBand
        title={<>Start With One <em>Table.</em></>}
        body="You do not have to commit to anything. Come to one gathering and see if these are your men."
      />
    </>
  );
}
