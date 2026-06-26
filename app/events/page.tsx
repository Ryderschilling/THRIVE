import ThriveNav from "@/components/site/ThriveNav";
import ThriveFooter from "@/components/site/ThriveFooter";
import EventsGate from "@/components/events/EventsGate";

export const metadata = {
  title: "Events — THRIVE",
  description: "Upcoming events for the THRIVE community.",
};

export default function EventsPage() {
  return (
    <>
      <ThriveNav />
      <main>
        <section className="py-28 md:py-36">
          <div className="th-wrap">
            <div className="mx-auto max-w-6xl space-y-10">
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-[0.32em] text-white/55">
                  Gather
                </div>
                <h1 className="font-display text-3xl md:text-5xl text-white/95">
                  Upcoming Events
                </h1>
              </div>

              <EventsGate />
            </div>
          </div>
        </section>
      </main>
      <ThriveFooter />
    </>
  );
}
