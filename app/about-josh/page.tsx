import Section from "@/components/site/Section";

export default function AboutJoshPage() {
  return (
    <>
      <Section>
        <div className="mx-auto max-w-xl text-center space-y-8">
          <div className="text-xs uppercase tracking-[0.28em] text-white/65">
            About
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-white/95">
            Led with stewardship.
          </h1>
          <p className="text-white/65">
            THRIVE is led by Josh Schilling with a focus on formation,
            faithfulness, and men who carry responsibility well.
          </p>
        </div>
      </Section>

      <Section tone="soft">
        <div className="mx-auto max-w-xl text-center space-y-86">
          <h2 className="font-display text-2xl md:text-3xl text-white/90">
            The posture.
          </h2>
          <p className="text-white/65">
            No performance. No branding of spirituality. Just steady obedience,
            brotherhood, and responsibility.
          </p>
        </div>
      </Section>
    </>
  );
}