import { testimonials, type Testimonial } from "@/content/site";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function Testimonials({ items = testimonials }: { items?: Testimonial[] }) {
  return (
    <div className="t-tw">
      {items.map((t, i) => (
        <figure key={i} className={`t-tcard${t.placeholder ? " placeholder" : ""}`}>
          {t.placeholder && <div className="t-tcard-flag">Placeholder</div>}
          <div className="t-tcard-mark">&ldquo;</div>
          <blockquote className="t-tcard-quote">{t.quote}</blockquote>
          <figcaption className="t-tcard-person">
            <div className="t-tcard-av">
              {t.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.photo} alt={t.name} />
              ) : (
                initials(t.name)
              )}
            </div>
            <div>
              <div className="t-tcard-name">{t.name}</div>
              <div className="t-tcard-role">{t.role}</div>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
