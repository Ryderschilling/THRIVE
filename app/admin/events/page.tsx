import Section from "@/components/site/Section";
import AdminEventsClient from "@/components/events/AdminEventsClient";

export const metadata = {
  title: "Events Admin — THRIVE",
};

export default function AdminEventsPage() {
  return (
    <Section>
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-[0.32em] text-white/55">
            Admin
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-white/95">
            Events
          </h1>
          <p className="text-white/60">
            Add or remove events for the group calendar.
          </p>
        </div>
        <AdminEventsClient />
      </div>
    </Section>
  );
}
