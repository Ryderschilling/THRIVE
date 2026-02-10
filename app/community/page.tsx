import Section from "@/components/site/Section";

export default function CommunityPage() {
  return (
    <>
      <Section>
        <div className="mx-auto max-w-xl text-center space-y-8">
          <div className="text-xs uppercase tracking-[0.28em] text-white/65">
            Community
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-white/95">
            Brotherhood with depth.
          </h1>
          <p className="text-white/65">
            A steady place for men who want their faith to govern their
            leadership.
          </p>
        </div>
      </Section>

      <Section tone="soft">
        <div className="mx-auto max-w-xl text-center space-y-8">
          <h2 className="font-display text-2xl md:text-3xl text-white/90">
            How we walk together.
          </h2>
          <p className="text-white/65">
            Presence over polish. Truth over image. Consistency over intensity.
            Brotherhood is formed through scripture, conversation, prayer, and
            accountability.
          </p>
        </div>
      </Section>
    </>
  );
}