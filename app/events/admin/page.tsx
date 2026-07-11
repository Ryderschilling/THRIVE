import AdminCalendar from "@/components/events/AdminCalendar";

export const metadata = {
  title: "Events Admin — THRIVE",
};

export default function EventsAdminPage() {
  return (
    <div style={{ background: "var(--c-black)", minHeight: "100vh", color: "var(--c-white)", display: "flex", flexDirection: "column" }}>
      <main style={{ maxWidth: "960px", width: "100%", margin: "0 auto", padding: "2.5rem 1.5rem 5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>

        <div style={{ marginBottom: "2rem" }}>
          <a href="/" className="admin-back-link">← Back to site</a>
          <style>{`.admin-back-link { display:inline-flex; align-items:center; gap:0.4rem; font-size:0.75rem; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.35); text-decoration:none; margin-bottom:1.25rem; transition:color 0.15s; } .admin-back-link:hover { color:rgba(255,255,255,0.75); }`}</style>
          <div style={{
            fontSize: "10px", fontWeight: 600, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "var(--c-gold)",
            marginBottom: "0.4rem",
          }}>
            Admin
          </div>
          <h1 style={{
            fontFamily: "var(--font-display), system-ui, sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
            fontWeight: 800, letterSpacing: "-0.02em", textTransform: "uppercase",
            color: "var(--c-white)",
          }}>
            Event Calendar
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.875rem", marginTop: "0.4rem" }}>
            Click any day to add a one-time event. Use "+ Add Event" for recurring series.
          </p>
        </div>

        <AdminCalendar />

      </main>
    </div>
  );
}
