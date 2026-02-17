import Link from "next/link";
import { db } from "@/lib/db";

export const runtime = "nodejs";

type SignupRow = Awaited<
  ReturnType<(typeof db)["retreatInquiry"]["findMany"]>
>[number];

async function getRows(slug: string): Promise<SignupRow[]> {
  return db.retreatInquiry.findMany({
    where: { retreat: { slug } },
    orderBy: { inquiry: { createdAt: "desc" } },
    include: {
      inquiry: { include: { contact: true } },
      retreat: true,
    },
  });
}

export default async function AdminRetreatSignupsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rows = await getRows(slug);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-[0.32em] text-white/55">
            Admin
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-white/95">
            Retreat Signups
          </h1>
          <div className="text-white/60">
            <span className="text-white/80">{slug}</span> •{" "}
            <span className="text-white/80">{rows.length}</span> total
          </div>
        </div>

        <Link
          href={`/retreats/${slug}`}
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm tracking-wide text-white/90 hover:bg-white/15 transition"
        >
          Back to retreat
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <table className="w-full">
          <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-[0.22em] text-white/55">
            <tr className="border-b border-white/10">
              <th className="px-5 py-4">Created</th>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Phone</th>
            </tr>
          </thead>

          <tbody className="text-white/75">
            {rows.map((r: SignupRow) => (
              <tr key={r.id} className="border-b border-white/10">
                <td className="px-5 py-4 whitespace-nowrap">
                  {new Date(r.inquiry.createdAt).toLocaleString()}
                </td>
                <td className="px-5 py-4">
                  {r.inquiry.contact?.name ?? "—"}
                </td>
                <td className="px-5 py-4">
                  {r.inquiry.contact?.email ?? "—"}
                </td>
                <td className="px-5 py-4">
                  {r.inquiry.contact?.phone ?? "—"}
                </td>
              </tr>
            ))}

            {rows.length === 0 ? (
              <tr>
                <td className="px-5 py-8 text-white/55" colSpan={4}>
                  No signups found for this retreat.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </main>
  );
}