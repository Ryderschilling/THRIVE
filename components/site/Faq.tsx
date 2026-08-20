import { faq } from "@/content/site";

export default function Faq() {
  return (
    <div className="t-faq">
      {faq.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
