import Section from "@/components/site/Section";
import { getCoachingProductBySlug } from "@/content/coaching";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type MaybePromise<T> = T | Promise<T>;

export default async function CoachingDetailPage(props: {
  params: MaybePromise<{ slug: string }>;
}) {
  const { slug } = await Promise.resolve(props.params);
  const product = getCoachingProductBySlug(slug);

  if (!product) {
    return (
      <Section>
        <div className="mx-auto max-w-xl text-center space-y-4">
          <div className="text-xs uppercase tracking-[0.32em] text-white/70">
            Not found
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-white">
            This coaching link doesn’t match a published offering.
          </h1>
          <div className="pt-4">
            <Link
              href="/coaching"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/80 hover:bg-white/10"
            >
              Back to coaching
            </Link>
          </div>
        </div>
      </Section>
    );
  }

  // Courses live on Skool — send them out.
  if (product.kind === "COURSE" && product.externalUrl) {
    redirect(product.externalUrl);
  }

  return (
    <>
      <Section>
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <div className="text-xs uppercase tracking-[0.32em] text-white/70">
            COACHING
          </div>

          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">
            {product.title}
          </h1>

          <p className="text-white/65">{product.description}</p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href={`/coaching/${product.slug}/apply`}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm text-white hover:bg-white/15"
            >
              {product.ctaLabel}
            </Link>
            <Link
              href="/coaching"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-transparent px-6 py-3 text-sm text-white/70 hover:bg-white/5"
            >
              View all
            </Link>
          </div>

          <div className="text-xs text-white/50">
            By invitation • If accepted, we’ll email registration details and pricing.
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-white/90">
              What this includes
            </h2>
            <ul className="space-y-2 text-white/65">
              {product.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {product.heroImage ? (
              <div className="relative aspect-[16/10]">
                <Image
                  src={product.heroImage}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ) : (
              <div className="aspect-[16/10] flex items-center justify-center text-white/40">
                Add a hero image later
              </div>
            )}

            <div className="p-6 text-center space-y-3">
              <div className="text-sm text-white/70">{product.subtitle}</div>
              <Link
                href={`/coaching/${product.slug}/apply`}
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm text-white hover:bg-white/15"
              >
                {product.ctaLabel}
              </Link>
              <div className="text-xs text-white/50">
                You’re requesting an invitation. We’ll follow up via email.
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}