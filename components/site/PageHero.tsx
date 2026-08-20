export default function PageHero({
  eyebrow,
  title,
  lede,
  image = "/images/palm-leaves-bg.png",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="t-phero">
      <div className="t-phero-media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" />
      </div>
      <div className="t-phero-scrim" aria-hidden="true" />
      <div className="t-phero-inner t-rv">
        <div className="t-eyebrow">{eyebrow}</div>
        <h1 className="t-h1">{title}</h1>
        {lede && <p className="t-lede wide">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
