import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function sendRetreatSignupEmail(args: {
  retreatTitle: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  about?: string;
  why?: string;
  paymentAmountCents?: number;
  paymentIntentId?: string;
}) {
  const to = "josh@thriveco.net";
  const from = process.env.SIGNUP_FROM_EMAIL || "THRIVE <onboarding@thriveco.net>";

  if (!process.env.RESEND_API_KEY) return;

  const donation =
    args.paymentAmountCents && args.paymentAmountCents > 0
      ? `$${(args.paymentAmountCents / 100).toFixed(2)}`
      : "No donation";

  await resend.emails.send({
    from,
    to,
    subject: `New THRIVE Retreat Signup — ${args.retreatTitle}`,
    text: `
RETREAT: ${args.retreatTitle}

NAME: ${args.name}
EMAIL: ${args.email}
PHONE: ${args.phone || "—"}
ADDRESS: ${args.address || "—"}

DONATION: ${donation}
PAYMENT INTENT: ${args.paymentIntentId || "—"}

ABOUT:
${args.about || "—"}

WHY:
${args.why || "—"}
    `.trim(),
  });
}

