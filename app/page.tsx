import Section from "@/components/site/Section";
import HeroInteractive from "@/components/site/HeroInteractive";

export default function HomePage() {
  return (
    <>
    <HeroInteractive />
      <Section tone="soft">
        <div className="mx-auto max-w-xl text-center space-y-8">
          <h2 className="font-display text-2xl md:text-3xl text-white/90">
            The tension we name.
          </h2>
          <p className="text-white/65">
            Successful men carry weight—responsibility, vision, and the demand
            to provide. But depth, alignment, and brotherhood don’t happen by
            accident. A man can build and still feel spiritually thin.
          </p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-xl text-center space-y-8">
          <h2 className="font-display text-2xl md:text-3xl text-white/90">
            What THRIVE is.
          </h2>
          <p className="text-white/65">
            THRIVE is a ministry built for builders. We gather men who want
            their faith to govern their leadership—at home, in business, and in
            private.
          </p>
        </div>
      </Section>
    </>
  );
}

