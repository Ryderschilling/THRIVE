import PageHero from "@/components/site/PageHero";
import JoinForm from "@/components/site/JoinForm";
import VerseBand from "@/components/site/VerseBand";
import CtaBand from "@/components/site/CtaBand";

export const metadata = {
  title: "The Monthly Letter",
  description:
    "One letter a month from Josh. Retreat openings, formation prompts, and the occasional verse. No noise.",
};

const INSIDE = [
  { title: "Retreat openings first", note: "Before they go on the site" },
  { title: "A formation prompt", note: "Something to actually do this month" },
  { title: "What Josh is sitting in", note: "A verse and a paragraph, not a sermon" },
  { title: "Gathering dates", note: "So you can put them on the calendar" },
];

export default function EmailPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay connected"
        title={<>Quiet Updates.<br />Invitations.<br /><em>Reflections.</em></>}
        lede="One letter a month. No sequence, no funnel, no pressure. Unsubscribe in one click and nobody will chase you."
        image="/images/hero-palm-foreground.webp"
      />

      <section className="t-sec">
        <div className="t-wrap">
          <div className="t-access">
            <div className="t-rv">
              <div className="t-eyebrow">What&rsquo;s inside</div>
              <h2 className="t-h2">
                Four Things,<br /><em>Once A Month.</em>
              </h2>
              <p className="t-body" style={{ marginTop: "1.5rem" }}>
                It goes out the first week of the month and takes about two minutes
                to read.
              </p>
            </div>
            <div className="t-access-list t-rv">
              {INSIDE.map((i) => (
                <div key={i.title} className="t-access-item">
                  <i />
                  <span>
                    {i.title}
                    <em>{i.note}</em>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="t-sec raise" id="signup">
        <div className="t-wrapt">
          <div className="t-head-center t-rv">
            <div className="t-eyebrow">Get the letter</div>
            <h2 className="t-h2">
              Put Your Name <em>In.</em>
            </h2>
          </div>
          <div className="t-rv" style={{ display: "flex", justifyContent: "center" }}>
            <JoinForm source="email-page" compact />
          </div>
        </div>
      </section>

      <VerseBand />

      <CtaBand
        title={<>Rather Meet In <em>Person?</em></>}
        body="The letter is good. A table is better. Come to one gathering and see."
        primary={{ label: "See the calendar", href: "/events" }}
        secondary={{ label: "Get involved", href: "/join" }}
      />
    </>
  );
}
