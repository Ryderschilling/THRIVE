import Link from "next/link";

import EventsCalendar from "@/components/events/EventsCalendar";
import CtaBand from "@/components/site/CtaBand";
import { rhythm } from "@/content/site";

export const metadata = {
  title: "Events",
  description: "Upcoming gatherings for the THRIVE community on 30A.",
};

export default function EventsPage() {
  return (
    <>
      <section className="t-sec t-pagetop tight">
        <div className="t-wrap">
          <div className="t-head t-rv">
            <div>
              <div className="t-eyebrow">Gather</div>
              <h1 className="t-h1">
                The <em>Calendar.</em>
              </h1>
            </div>
            <p className="t-lede">
              Everything on the books. Open gatherings are exactly that: show up, no
              RSVP required unless a date says otherwise.
            </p>
          </div>

          <div className="t-rv">
            <EventsCalendar />
          </div>
        </div>
      </section>

      <section className="t-sec raise tight">
        <div className="t-wrap">
          <div className="t-head t-rv">
            <div>
              <div className="t-eyebrow">The standing rhythm</div>
              <h2 className="t-h2">
                What Repeats <em>Every Month.</em>
              </h2>
            </div>
            <p className="t-lede">
              Even when the calendar is quiet, these keep running.
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
          <div className="t-btns t-rv" style={{ marginTop: "2.5rem" }}>
            <Link href="/join" className="t-btn t-btn-gold">
              Get on the list <span className="ar">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        image="/images/community/2.jpg"
        title={<>See You <em>There.</em></>}
        body="Put your name in and Josh will tell you which gathering to start with."
        secondary={{ label: "About THRIVE", href: "/thrive" }}
      />
    </>
  );
}
