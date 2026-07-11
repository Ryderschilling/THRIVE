import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import EventsCalendar from "@/components/events/EventsCalendar";

export const metadata = {
  title: "Events — THRIVE 30A",
  description: "Upcoming events for the THRIVE community on 30A.",
};

export default function EventsPage() {
  return (
    <div style={{ background: "var(--c-black)", minHeight: "100vh", color: "var(--c-white)" }}>
      <SiteNav />
      <main>
        <section style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
          <div className="wrap">

            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{
                fontSize: "var(--body-sm)", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "var(--c-gold)", marginBottom: "0.6rem",
              }}>
                Gather
              </div>
              <h1 style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                color: "var(--c-white)",
              }}>
                Upcoming Events
              </h1>
            </div>

            <EventsCalendar />

          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
