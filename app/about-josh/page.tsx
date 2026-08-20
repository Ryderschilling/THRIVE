import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import VerseBand from "@/components/site/VerseBand";
import ProofBar from "@/components/site/ProofBar";

export const metadata = {
  title: "About Josh Schilling",
  description:
    "Josh Schilling leads THRIVE with a focus on formation, faithfulness, and men who carry responsibility well.",
};

export default function AboutJoshPage() {
  return (
    <>
      <PageHero
        eyebrow="About Josh Schilling"
        title={<>Led With<br /><em>Stewardship.</em></>}
        lede="Fifteen years building businesses on the Emerald Coast, and one conviction: men do not change from more content. They change at a table."
        image="/images/home-hero-sunset.PNG"
      />

      <section className="t-sec">
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
              <div className="t-eyebrow">The story</div>
              <h2 className="t-h2">
                A Father<br />In The Field,<br /><em>Under Authority.</em>
              </h2>
              <blockquote className="t-quote">
                Most men aren&rsquo;t asking for another podcast. They&rsquo;re asking
                for a table, a bible, and three men who&rsquo;ll tell them the truth.
              </blockquote>
              <p className="t-body">
                Josh founded THRIVE as the kind of brotherhood he wishes had existed
                when he was twenty-eight. Honest, scripture-anchored, allergic to
                fluff. What started as a handful of men meeting before work has become
                a weekly rhythm, a retreat calendar, and a coaching practice.
              </p>
              <p className="t-body" style={{ marginTop: "1rem" }}>
                He still leads every morning formation he can make, and he still reads
                every message that comes through this site himself.
              </p>
              <div className="t-sig-name">Josh</div>
              <div className="t-sig-role">Founder &middot; Pastor &middot; 30A</div>
            </div>
          </div>
        </div>
      </section>

      <section className="t-sec tight raise">
        <div className="t-wrap t-rv">
          <ProofBar />
        </div>
      </section>

      <VerseBand />

      <CtaBand
        title={<>Talk To <em>Josh.</em></>}
        body="Put your name in and he will reply personally, usually within a day."
        secondary={{ label: "See coaching", href: "/coaching" }}
      />
    </>
  );
}
