import Link from "next/link";

import PageHero from "@/components/site/PageHero";
import UpcomingEvents from "@/components/site/UpcomingEvents";
import Testimonials from "@/components/site/Testimonials";
import CtaBand from "@/components/site/CtaBand";
import { rhythm } from "@/content/site";

export const metadata = {
  title: "Community",
  description:
    "Weekly formations, monthly dinners, and quarterly roundtables for men on 30A. Brotherhood you can drive to.",
};

const MOMENTS = [
  { src: "/images/community/1.jpg", label: "Brotherhood dinner" },
  { src: "/images/community/2.jpg", label: "Morning formation" },
  { src: "/images/community/3.jpg", label: "Roundtable" },
  { src: "/images/community/4.jpg", label: "On the coast" },
];

export default function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="Coast Connects"
        title={<>Brotherhood<br />With Your<br /><em>Backyard.</em></>}
        lede="A rhythm you can actually keep. Weekly, monthly, quarterly, and twice a year off the grid, all within a short drive of 30A."
        image="/images/community/3.jpg"
      >
        <div className="t-btns" style={{ marginTop: "2.25rem" }}>
          <Link href="/join" className="t-btn t-btn-gold">
            Get Involved <span className="ar">&rarr;</span>
          </Link>
          <Link href="/events" className="t-btn t-btn-ghost">
            Full calendar
          </Link>
        </div>
      </PageHero>

      {/* The rhythm */}
      <section className="t-sec">
        <div className="t-ghost" aria-hidden="true">GATHER</div>
        <div className="t-wrap">
          <div className="t-head t-rv">
            <div>
              <div className="t-eyebrow">The rhythm</div>
              <h2 className="t-h2">
                What Happens,<br /><em>And How Often.</em>
              </h2>
            </div>
            <p className="t-lede">
              Nothing here requires you to rearrange your life. It requires you to
              show up.
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
        </div>
      </section>

      {/* Next up */}
      <section className="t-sec raise tight">
        <div className="t-wrap">
          <div className="t-head t-rv">
            <div>
              <div className="t-eyebrow">Next up</div>
              <h2 className="t-h2">
                On The <em>Calendar.</em>
              </h2>
            </div>
            <p className="t-lede">
              Dates land here as they are set. Anyone is welcome at the open
              gatherings.
            </p>
          </div>
          <div className="t-rv">
            <UpcomingEvents limit={4} />
            <Link href="/events" className="t-btn t-btn-ghost" style={{ marginTop: "1.75rem" }}>
              View full calendar <span className="ar">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Moments */}
      <section className="t-sec">
        <div className="t-wrap">
          <div className="t-head-center t-rv">
            <div className="t-eyebrow">Moments</div>
            <h2 className="t-h2">
              What It Looks <em>Like.</em>
            </h2>
          </div>
          <div className="t-rgrid t-rvs">
            <div className="t-rcard tall">
              <div className="t-rcard-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={MOMENTS[0].src} alt={MOMENTS[0].label} />
              </div>
              <div className="t-rcard-scrim" aria-hidden="true" />
              <div className="t-rcard-info">
                <div className="t-rcard-title">{MOMENTS[0].label}</div>
              </div>
            </div>
            <div className="t-rstack">
              {MOMENTS.slice(1).map((m) => (
                <div key={m.src} className="t-rcard">
                  <div className="t-rcard-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.src} alt={m.label} />
                  </div>
                  <div className="t-rcard-scrim" aria-hidden="true" />
                  <div className="t-rcard-info">
                    <div className="t-rcard-title">{m.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
        image="/images/community/4.jpg"
        title={<>Pull Up A <em>Chair.</em></>}
        body="Tell Josh what you are drawn to and he will point you at the next gathering that fits."
      />
    </>
  );
}
