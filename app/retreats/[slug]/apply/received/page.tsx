import Section from "@/components/site/Section";

export default async function ReceivedPage(props: {
  params: Promise<{ slug: string }>;
}) {
  await props.params;

  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center space-y-6 py-10 md:py-12">
        <div className="text-xs uppercase tracking-[0.32em] text-white/60">
          Donation Received
        </div>

        <h1 className="font-display text-4xl md:text-5xl text-white/95">
          Thank you!!
        </h1>
      </div>
    </Section>
  );
}
