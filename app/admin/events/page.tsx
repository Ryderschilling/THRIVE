import AdminCalendar from "@/components/events/AdminCalendar";

export const metadata = {
  title: "Events Admin — THRIVE",
};

export default function AdminEventsPage() {
  return (
    <div style={{ background: "#111111", minHeight: "100vh", color: "#F0ECE4" }}>
      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>

        <div style={{ marginBottom: "2.5rem", paddingTop: "1.5rem" }}>
          <div style={{
            fontSize: "10px", fontWeight: 600, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "rgba(240,236,228,0.35)",
            marginBottom: "0.5rem",
          }}>
            Admin
          </div>
          <h1 style={{
            fontFamily: "var(--font-display), system-ui, sans-serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "rgba(240,236,228,0.95)",
          }}>
            Event Calendar
          </h1>
          <p style={{ color: "rgba(240,236,228,0.45)", marginTop: "0.5rem", fontSize: "0.9rem" }}>
            Click any day to add an event. Click an event to edit or delete it.
          </p>
        </div>

        <AdminCalendar />

      </main>
    </div>
  );
}
