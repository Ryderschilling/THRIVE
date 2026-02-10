import Link from "next/link";

export default function ReceivedPage(props: { params: { slug: string } }) {
  return (
    <div className="mx-auto max-w-xl shown-center py-24 px-6 text-center space-y-6">
      <div className="text-xs uppercase tracking-[0.32em] text-white/60">
        Request received
      </div>
      <h1 className="font-display text-4xl md:text-5xl text-white/95">
        You’re on the list.
      </h1>
      <p className="text-white/60">
        Josh will review and reach out personally with next steps and final details.
      </p>

      <div className="pt-2">
        <Link
          href={`/retreats/${props.params.slug}`}
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm tracking-wide text-white/90 hover:bg-white/15 transition"
        >
          Back to retreat
        </Link>
      </div>
    </div>
  );
}