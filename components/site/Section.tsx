import Container from "./Container";

export default function Section({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "soft";
}) {
  return (
    <section
      className={tone === "soft" ? "py-16 md:py-24" : "py-20 md:py-28"}
    >
      <Container>
        <div className={tone === "soft" ? "thrive-frame p-6 md:p-8" : ""}>
          {children}
        </div>
      </Container>
    </section>
  );
}