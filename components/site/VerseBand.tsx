import { site } from "@/content/site";

export default function VerseBand() {
  const [before, after] = site.verse.text.split("THRIVE");
  return (
    <section className="t-verse">
      <p>
        &ldquo;{before}
        <b>THRIVE</b>
        {after}&rdquo;
      </p>
      <cite>{site.verse.ref}</cite>
    </section>
  );
}
