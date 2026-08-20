import { ticker } from "@/content/site";

export default function Ticker() {
  const items = [...ticker, ...ticker];
  return (
    <div className="t-ticker" aria-hidden="true">
      <div className="t-ticker-track">
        {items.map((item, i) => (
          <span key={i} className="t-ticker-item">
            {item.text}
            {item.ref ? <em> &middot; {item.ref}</em> : null}
            <span className="t-ticker-sep">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
