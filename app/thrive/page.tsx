import Section from "@/components/site/Section";

export default function ThrivePage() {
  return (
    <>
      <Section>
        <div className="mx-auto max-w-xl text-center space-y-8">
          <div className="text-xs uppercase tracking-[0.28em] text-white/65">
            THRIVE
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-white/95">
            The mission.
          </h1>
          <p className="text-white/65">
            A ministry for Christian businessmen seeking depth, order, and
            kingdom impact through brotherhood.
          </p>
        </div>
      </Section>

      <Section tone="soft">
        <div className="mx-auto max-w-xl text-center space-y-8">
          <h2 className="font-display text-2xl md:text-3xl text-white/90">
            Why it exists.
          </h2>
          <p className="text-white/65">
            Many men are successful—and quietly isolated. THRIVE exists to form
            men who lead with obedience, humility, and courage. Not perfectly.
            Faithfully.
          </p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-xl text-center space-y-8">
          <h2 className="font-display text-2xl md:text-3xl text-white/90">
            What we build.
          </h2>
          <ul className="list-disc list-inside space-y-2 text-white/65">
            <li>Stronger men of faith</li>
            <li>Sharpened leadership at home and in business</li>
            <li>Deep community with accountability</li>
            <li>Kingdom-minded entrepreneurship</li>
          </ul>
        </div>
      </Section>
    </>
  );
}