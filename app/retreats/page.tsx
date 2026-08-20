import Link from "next/link";

import PageHero from "@/components/site/PageHero";
import Testimonials from "@/components/site/Testimonials";
import CtaBand from "@/components/site/CtaBand";
import VerseBand from "@/components/site/VerseBand";
import { retreats, pastRetreats } from "@/content/retreats";

export const metadata = {
  title: "Retreats",
  description:
    "Quiet, focused retreats for Christian businessmen on 30A. Three days built to reset your compass and deepen your formation.",
};

function dateRange(startISO: string, endISO: string) {
  const start = new Date(startISO + "T00:00:00");
  const end = new Date(endISO + "T00:00:00");
  const md = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
  const y = new Intl.DateTimeFormat("en-US", { year: "numeric" });
  return `${md.format(start)} – ${md.format(end)}, ${y.format(end)}`;
}

const badgeClass = (status: string) =>
  status === "Invite-only" ? "t-badge gold" : status === "Waitlist" ? "t-badge mute" : "t-badge";

export default function RetreatsPage() {
  const featured = retreats[0];
  const rest = retreats.slice(1);

  return (
    <>
      <PageHero
        eyebrow="Retreats"
        title={<>Slowed Down.<br /><em>Sharpened.</em></>}
        lede="Three days in coastal quiet with men who carry the same weight you do. No stage, no schedule you have to perform inside of."
        image="/images/retreats/emerald-house/drone.jpg"
      >
        <div className="t-btns" style={{ marginTop: "2.25rem" }}>
          <a href="#upcoming" className="t-btn t-btn-gold">
            See what&rsquo;s open <span className="ar">&rarr;</span>
          </a>
          <Link href="/join" className="t-btn t-btn-ghost">
            Ask Josh a question
          </Link>
        </div>
      </PageHero>

      {/* Upcoming */}
      <section className="t-sec" id="upcoming">
        <div className="t-wrap">
          <div className="t-head t-rv">
            <div>
              <div className="t-eyebrow">Upcoming</div>
              <h2 className="t-h2">
                What&rsquo;s <em>Open.</em>
              </h2>
            </div>
            <p className="t-lede">
              Spots are limited on purpose. Small rooms are the whole point.
            </p>
          </div>

          <div className="t-rgrid t-rvs">
            <Link href={`/retreats/${featured.slug}`} className="t-rcard tall">
              <div className="t-rcard-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.coverImage} alt={featured.title} />
              </div>
              <div className="t-rcard-scrim" aria-hidden="true" />
              <div className="t-rcard-info">
                <span className={badgeClass(featured.status)}>{featured.status}</span>
                <div className="t-rcard-title">{featured.title}</div>
                <div className="t-rcard-meta">
                  {dateRange(featured.dateStart, featured.dateEnd)} &middot;{" "}
                  {featured.locationLabel} &middot; {featured.spotsRemaining} spots left
                </div>
              </div>
            </Link>

            <div className="t-rstack">
              {rest.map((r) => (
                <Link key={r.slug} href={`/retreats/${r.slug}`} className="t-rcard">
                  <div className="t-rcard-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.coverImage} alt={r.title} />
                  </div>
                  <div className="t-rcard-scrim" aria-hidden="true" />
                  <div className="t-rcard-info">
                    <span className={badgeClass(r.status)}>{r.status}</span>
                    <div className="t-rcard-title">{r.title}</div>
                    <div className="t-rcard-meta">
                      {dateRange(r.dateStart, r.dateEnd)} &middot; {r.spotsRemaining} spots left
                    </div>
                  </div>
                </Link>
              ))}

              <div className="t-rcard">
                <div className="t-rcard-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/retreats/emerald-house/back.jpg" alt="Fall retreat" />
                </div>
                <div className="t-rcard-scrim" aria-hidden="true" />
                <div className="t-rcard-info">
                  <span className="t-badge mute">Coming Soon</span>
                  <div className="t-rcard-title">Fall Retreat</div>
                  <div className="t-rcard-meta">October &middot; Emerald Coast &middot; TBA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="t-sec raise">
        <div className="t-wrap">
          <div className="t-access">
            <div className="t-rv">
              <div className="t-eyebrow">What to expect</div>
              <h2 className="t-h2">
                Three Days.<br />No Phone.<br /><em>No Performing.</em>
              </h2>
              <p className="t-body" style={{ marginTop: "1.5rem" }}>
                {featured.summary}
              </p>
            </div>
            <div className="t-access-list t-rv">
              {featured.whatToExpect.map((item) => (
                <div key={item} className="t-access-item">
                  <i />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Past */}
      <section className="t-sec cream tight">
        <div className="t-wrap">
          <div className="t-head-center t-rv">
            <div className="t-eyebrow">Already happened</div>
            <h2 className="t-h2">
              Where We&rsquo;ve <em>Been.</em>
            </h2>
          </div>
          <div className="t-pillars t-rvs">
            {pastRetreats.map((p) => (
              <div key={p.title} className="t-rcard">
                <div className="t-rcard-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.title} />
                </div>
                <div className="t-rcard-scrim" aria-hidden="true" />
                <div className="t-rcard-info">
                  <div className="t-rcard-title">{p.title}</div>
                  <div className="t-rcard-meta">
                    {p.locationLabel} &middot; {p.dateLabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VerseBand />

      <section className="t-sec cream">
        <div className="t-wrap">
          <div className="t-head-center t-rv">
            <div className="t-eyebrow">Hear from the men</div>
            <h2 className="t-h2">
              What Three Days <em>Did.</em>
            </h2>
          </div>
          <div className="t-rv">
            <Testimonials />
          </div>
        </div>
      </section>

      <CtaBand
        image="/images/retreats/emerald-house/cover.jpg"
        title={<>Request A <em>Spot.</em></>}
        body={featured.invitationLine}
        primary={{ label: "Request to join", href: `/retreats/${featured.slug}/apply` }}
        secondary={{ label: "All retreats", href: "#upcoming" }}
      />
    </>
  );
}
