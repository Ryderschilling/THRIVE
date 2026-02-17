import Section from "@/components/site/Section";
import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export const runtime = "nodejs";

type SignupRow = Prisma.RetreatInquiryGetPayload<{
  include: {
    inquiry: { include: { contact: true } };
    retreat: true;
  };
}>;

export default async function SignupsPage(props: {
  params: { slug: string };
  searchParams: { token?: string };
}) {
  const token = props.searchParams?.token || "";
  if (!process.env.ADMIN_ACCESS_TOKEN || token !== process.env.ADMIN_ACCESS_TOKEN) {
    return (
      <Section>
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <div className="text-xs uppercase tracking-[0.32em] text-white/60">Unauthorized</div>
          <h1 className="font-display text-4xl md:text-5xl text-white/95">Access denied</h1>
        </div>
      </Section>
    );
  }

  const slug = decodeURIComponent(String(props.params.slug)).trim().toLowerCase();

  const rows: SignupRow[] = await db.retreatInquiry.findMany({
    where: { retreat: { slug } },
    orderBy: { inquiry: { createdAt: "desc" } },
    include: {
      inquiry: { include: { contact: true } },
      retreat: true,
    },
  });

  return (
    <Section>
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-[0.32em] text-white/60">Admin</div>
          <h1 className="font-display text-3xl md:text-5xl text-white/95">Signups — {slug}</h1>
          <p className="text-white/60">{rows.length} total</p>
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
                  <th className="px-5 py-4">Address</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-white/75">
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-white/10">
                    <td className="px-5 py-4 whitespace-nowrap">
                      {new Date(r.inquiry.createdAt).toLocaleString()}
                    </td>
                    <td className="px-5 py-4">{r.inquiry.contact.name || "-"}</td>
                    <td className="px-5 py-4">{r.inquiry.contact.email}</td>
                    <td className="px-5 py-4">{r.inquiry.contact.phone || "-"}</td>
                    <td className="px-5 py-4">{r.inquiry.contact.address1 || "-"}</td>
                    <td className="px-5 py-4">{r.inquiry.status}</td>
                  </tr>
                ))}

                {rows.length === 0 ? (
                  <tr>
                    <td className="px-5 py-8 text-white/50" colSpan={6}>
                      No signups yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-xs text-white/45">
          (This page is token-gated via <code>ADMIN_ACCESS_TOKEN</code>.)
        </div>
      </div>
    </Section>
  );
}