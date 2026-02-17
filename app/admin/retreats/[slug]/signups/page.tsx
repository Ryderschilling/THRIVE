import Link from "next/link";
import Section from "@/components/site/Section";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * NOTE:
 * We intentionally avoid Prisma.<Model>GetPayload types here because Vercel's
 * generated Prisma client can differ from local generation, which breaks builds.
 * This local type matches exactly what this page renders.
 */
type SignupRow = {
  id: string;
  inquiry: {
    createdAt: string | Date;
    contact: {
      name: string | null;
      email: string | null;
      phone: string | null;
    } | null;
  };
  retreat: {
    slug: string;
  };
};

export default async function AdminRetreatSignupsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const rows = (await db.retreatInquiry.findMany({
    where: { retreat: { slug } },
    orderBy: { inquiry: { createdAt: "desc" } },
    include: {
      inquiry: { include: { contact: true } },
      retreat: true,
    },
  })) as unknown as SignupRow[];

  return (
    <Section>
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.32em] text-white/55">Admin</div>
            <h1 className="font-display text-3xl md:text-5xl text-white/95">Signups</h1>
            <div className="text-white/60">
              <span className="text-white/80">{slug}</span> •{" "}
              <span className="text-white/80">{rows.length}</span> total
            </div>
          </div>

          <Link
            href={`/retreats/${slug}/gallery`}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-transparent px-5 py-2.5 text-sm tracking-wide text-white/80 hover:bg-white/5 transition"
          >
            Back to gallery
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.22em] text-white/50">
                <tr className="border-b border-white/10">
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Phone</th>
                </tr>
              </thead>

              <tbody className="text-white/75">
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-white/10">
                    <td className="px-5 py-4 whitespace-nowrap">
                      {new Date(r.inquiry.createdAt).toLocaleString()}
                    </td>
                    <td className="px-5 py-4">{r.inquiry.contact?.name ?? "—"}</td>
                    <td className="px-5 py-4">{r.inquiry.contact?.email ?? "—"}</td>
                    <td className="px-5 py-4">{r.inquiry.contact?.phone ?? "—"}</td>
                  </tr>
                ))}

                {rows.length === 0 ? (
                  <tr>
                    <td className="px-5 py-8 text-white/55" colSpan={4}>
                      No signups yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Section>
  );
}