import Section from "@/components/site/Section";
import EventsCalendar from "@/components/events/EventsCalendar";

export const metadata = {
  title: "Events — THRIVE",
  description: "Upcoming events for the THRIVE community.",
};

export default function EventsPage() {
  return (
    <Section>
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-[0.32em] text-white/55">
            Gather
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-white/95">
            Upcoming Events
          </h1>
          <p className="max-w-2xl text-white/65">
            What&apos;s planned for the group. Tap any day to see what&apos;s on
            — or scroll the list below for everything coming up.
          </p>
        </div>

        <EventsCalendar />
      </div>
    </Section>
  );
}
