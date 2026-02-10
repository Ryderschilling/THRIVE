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
      className={
        tone === "soft"
          ? "py-16 md:py-24"
          : "py-20 md:py-28"
      }
    >
      <Container>{children}</Container>
    </section>
  );
}
