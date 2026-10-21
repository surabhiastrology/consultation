import { NextResponse } from "next/server";
import { Resend } from "resend";
import { inquirySchema } from "@/lib/inquiry";
import { confirmationEmail, inquiryEmail } from "@/lib/inquiry-email";
import { deliverInquiryEmails } from "@/lib/email-delivery";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    const body = await request.text();
    if (body.length > 16_000)
      return NextResponse.json({ error: "The inquiry is too long." }, { status: 413 });
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      { error: "Please correct the highlighted fields.", fieldErrors },
      { status: 400 },
    );
  }
  if (parsed.data.website)
    return NextResponse.json({ error: "Unable to submit this inquiry." }, { status: 400 });

  const recipients = (process.env.LEAD_NOTIFICATION_TO ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  const sender = process.env.EMAIL_FROM?.trim();
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey || !sender || recipients.length === 0) {
    return NextResponse.json(
      { error: "Inquiry email is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  const baseUrl = new URL(request.url).origin;
  const mail = inquiryEmail(parsed.data, baseUrl);
  const confirmation = confirmationEmail(parsed.data, baseUrl);
  const resend = new Resend(apiKey);
  const delivery = await deliverInquiryEmails(
    (message) => resend.emails.send(message),
    {
      from: sender,
      to: recipients,
      replyTo: parsed.data.email,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    },
    {
      from: sender,
      to: [parsed.data.email],
      replyTo: process.env.CUSTOMER_REPLY_TO?.trim() || "surabhiastrology9@gmail.com",
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    },
  );
  if (!delivery.leadAccepted)
    return NextResponse.json(
      {
        error:
          "We could not send your inquiry. Your details are still in the form; please try again.",
      },
      { status: 502 },
    );
  if (!delivery.confirmationAccepted) {
    console.warn("Inquiry was accepted, but the confirmation email was not accepted by Resend.");
  }
  return NextResponse.json({ success: true, confirmationSent: delivery.confirmationAccepted });
}
