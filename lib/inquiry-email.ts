import { consultationPrice, consultationServices, formatRupees, type Inquiry } from "./inquiry.ts";

type EmailContent = { subject: string; html: string; text: string };

const colors = {
  ivory: "#fcf7ee",
  paper: "#fffdf8",
  ink: "#2a1400",
  maroon: "#800000",
  deepMaroon: "#4a0404",
  gold: "#c8a84b",
  border: "#e8d8b8",
  muted: "#695b4f",
};

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ??
      character,
  );
}

function withLineBreaks(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

function asset(baseUrl: string, path: string): string {
  return escapeHtml(new URL(path, baseUrl).href);
}

function emailFrame({
  baseUrl,
  preheader,
  label,
  title,
  body,
}: {
  baseUrl: string;
  preheader: string;
  label: string;
  title: string;
  body: string;
}): string {
  const logo = asset(baseUrl, "/images/surbhi-email-logo.png");
  const portrait = asset(baseUrl, "/images/surbhi-email-office.jpg");
  const home = escapeHtml(new URL("/", baseUrl).href);
  const whatsapp = "https://wa.me/919251151330";
  const instagram = "https://www.instagram.com/celebrity_astrologer_surbhi/";

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${colors.ivory};color:${colors.ink};font-family:Arial,Helvetica,sans-serif;">
<span style="display:none;font-size:1px;color:${colors.ivory};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${escapeHtml(preheader)}</span>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background:${colors.ivory};"><tr><td align="center" style="padding:28px 12px 36px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="width:100%;max-width:640px;border-collapse:collapse;background:${colors.paper};border:1px solid ${colors.border};">
<tr><td height="5" style="height:5px;background:${colors.gold};font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td align="center" style="padding:23px 24px 19px;background:${colors.paper};"><a href="${home}" style="text-decoration:none;"><img src="${logo}" width="220" height="73" alt="Surabhi Astrology" style="display:block;width:220px;max-width:100%;height:auto;border:0;"></a></td></tr>
<tr><td style="padding:27px 30px 30px;background:${colors.deepMaroon};text-align:center;">
<p style="margin:0 0 10px;color:#e2c06a;font-size:11px;font-weight:700;letter-spacing:2.2px;text-transform:uppercase;">${escapeHtml(label)}</p>
<h1 style="margin:0;color:#fffaf1;font-family:Georgia,'Times New Roman',serif;font-size:34px;font-weight:400;line-height:1.15;">${escapeHtml(title)}</h1>
</td></tr>
<tr><td><img src="${portrait}" width="640" alt="Surbhi Gupta in her office" style="display:block;width:100%;max-width:640px;height:auto;border:0;"></td></tr>
<tr><td style="padding:31px 30px 34px;">${body}</td></tr>
<tr><td style="padding:23px 30px 27px;border-top:1px solid ${colors.border};background:#f8f0e3;text-align:center;">
<p style="margin:0 0 9px;color:${colors.deepMaroon};font-family:Georgia,'Times New Roman',serif;font-size:20px;">Surabhi Astrology</p>
<p style="margin:0;color:${colors.muted};font-size:12px;line-height:1.6;">Personal guidance, arranged with care.<br><a href="${home}" style="color:${colors.maroon};text-decoration:underline;">Visit the consultation site</a></p>
<p style="margin:15px 0 0;color:${colors.muted};font-size:12px;line-height:1.6;"><a href="${whatsapp}" style="color:${colors.maroon};text-decoration:underline;">WhatsApp</a><span style="padding:0 12px;color:${colors.gold};">✦</span><a href="${instagram}" style="color:${colors.maroon};text-decoration:underline;">Instagram</a></p>
</td></tr></table>
<p style="max-width:640px;margin:16px 0 0;color:#776e62;font-size:11px;line-height:1.5;text-align:center;">This is an email about a consultation inquiry submitted through Surabhi Astrology.</p>
</td></tr></table></body></html>`;
}

function sectionHeading(title: string): string {
  return `<h2 style="margin:28px 0 12px;color:${colors.deepMaroon};font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;line-height:1.2;">${escapeHtml(title)}</h2>`;
}

function detailTable(fields: [string, string][]): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;border:1px solid ${colors.border};">${fields
    .map(
      ([label, value], index) =>
        `<tr><th scope="row" style="width:37%;padding:12px 13px;border-bottom:1px solid ${colors.border};background:${index % 2 ? "#fffaf3" : colors.ivory};color:${colors.muted};font-size:12px;font-weight:700;line-height:1.4;text-align:left;vertical-align:top;">${escapeHtml(label)}</th><td style="padding:12px 13px;border-bottom:1px solid ${colors.border};color:${colors.ink};font-size:13px;line-height:1.5;text-align:left;vertical-align:top;overflow-wrap:break-word;">${withLineBreaks(value)}</td></tr>`,
    )
    .join("")}</table>`;
}

function notice(text: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:22px 0 0;border-collapse:collapse;background:#f6ead5;border-left:4px solid ${colors.gold};"><tr><td style="padding:15px 18px;color:${colors.deepMaroon};font-size:13px;line-height:1.6;">${escapeHtml(text)}</td></tr></table>`;
}

function readableDate(value: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

export function inquiryEmail(inquiry: Inquiry, baseUrl: string): EmailContent {
  const format: [string, string][] = [
    ["Selected service", consultationServices[inquiry.service].label],
    ["Duration", "30 minutes"],
    ...(inquiry.service === "oneToOne"
      ? [
          ["Meeting mode", inquiry.meetingMode === "inPerson" ? "In person" : "Online"] as [
            string,
            string,
          ],
        ]
      : []),
    ...(inquiry.service === "oneToOne" && inquiry.meetingMode === "inPerson"
      ? [["Preferred city", inquiry.consultationLocation ?? "Not provided"] as [string, string]]
      : []),
    ["Urgent request", inquiry.urgent ? "Yes — subject to availability" : "No"],
    ["Listed price", formatRupees(consultationPrice(inquiry.service, inquiry.urgent))],
  ];
  const contact: [string, string][] = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["WhatsApp", inquiry.whatsapp],
    ["Consultation topic", inquiry.topic],
  ];
  const birth: [string, string][] = [
    ["Birth date", inquiry.birthDate],
    ["Birth time", `${inquiry.birthTime}${inquiry.birthTimeApproximate ? " (approximate)" : ""}`],
    ["Birth place", inquiry.birthPlace],
  ];
  const appointment: [string, string][] = [
    ["Preferred date", readableDate(inquiry.preferredDate)],
    ["Preferred time window", inquiry.preferredWindow],
  ];
  const attribution = Object.entries(inquiry.campaign).filter(([, value]) => value) as [
    string,
    string,
  ][];
  const body = `<p style="margin:0;color:${colors.ink};font-size:15px;line-height:1.7;">A new visitor has requested a personal consultation. Please review the details and contact them directly to arrange the next step.</p>
${notice("The preferred time is not booked; confirm availability, format and the listed price personally before arranging the consultation.")}
${sectionHeading("Selected consultation")}${detailTable(format)}
${sectionHeading("Contact & question")}${detailTable(contact)}
${sectionHeading("Birth details")}${detailTable(birth)}
${sectionHeading("Appointment preference")}${detailTable(appointment)}
${sectionHeading("Their question")}<p style="margin:0;padding:17px 18px;border:1px solid ${colors.border};background:#fffaf3;color:${colors.ink};font-size:14px;line-height:1.65;overflow-wrap:break-word;">${withLineBreaks(inquiry.question || "Not provided")}</p>
${attribution.length ? `${sectionHeading("Campaign attribution")}${detailTable(attribution)}` : ""}`;
  const text = [
    "New consultation inquiry",
    "Follow up personally to confirm availability, format and the listed price. No slot has been booked.",
    ...format,
    ...contact,
    ...birth,
    ...appointment,
    ["Question", inquiry.question || "Not provided"],
    ...attribution,
  ]
    .map((entry) => (Array.isArray(entry) ? `${entry[0]}: ${entry[1]}` : entry))
    .join("\n");
  return {
    subject: `🔔 NEW CONSULTATION INQUIRY: ${inquiry.name} | ${inquiry.topic}`,
    html: emailFrame({
      baseUrl,
      preheader: `New inquiry from ${inquiry.name} about ${inquiry.topic}.`,
      label: "New personal consultation inquiry",
      title: "A new conversation begins.",
      body,
    }),
    text,
  };
}

export function confirmationEmail(inquiry: Inquiry, baseUrl: string): EmailContent {
  const firstName = inquiry.name.trim().split(/\s+/)[0] || inquiry.name;
  const summary: [string, string][] = [
    ["Your topic", inquiry.topic],
    ["Consultation", consultationServices[inquiry.service].label],
    ...(inquiry.service === "oneToOne"
      ? [
          ["Meeting mode", inquiry.meetingMode === "inPerson" ? "In person" : "Online"] as [
            string,
            string,
          ],
        ]
      : []),
    ...(inquiry.service === "oneToOne" && inquiry.meetingMode === "inPerson"
      ? [["Preferred city", inquiry.consultationLocation ?? "Not provided"] as [string, string]]
      : []),
    ["Duration", "30 minutes"],
    ["Your selected price", formatRupees(consultationPrice(inquiry.service, inquiry.urgent))],
    ...(inquiry.urgent
      ? [["Urgent request", "Yes — subject to availability"] as [string, string]]
      : []),
    ["Preferred date", readableDate(inquiry.preferredDate)],
    ["Preferred time", inquiry.preferredWindow],
  ];
  const body = `<p style="margin:0 0 16px;color:${colors.ink};font-size:16px;line-height:1.65;">Dear ${escapeHtml(firstName)},</p>
<p style="margin:0;color:${colors.ink};font-size:15px;line-height:1.75;">Thank you for sharing what is on your mind. We have received your consultation inquiry, and the Surabhi Astrology team will review it with care.</p>
${sectionHeading("What happens next")}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
<tr><td style="width:35px;padding:10px 0;vertical-align:top;color:${colors.maroon};font-family:Georgia,serif;font-size:22px;">01</td><td style="padding:10px 0;color:${colors.ink};font-size:14px;line-height:1.6;">Our team reviews your question and preferred time.</td></tr>
<tr><td style="padding:10px 0;vertical-align:top;color:${colors.maroon};font-family:Georgia,serif;font-size:22px;">02</td><td style="padding:10px 0;color:${colors.ink};font-size:14px;line-height:1.6;">We contact you by WhatsApp, phone or email to confirm availability, format and the listed price.</td></tr>
<tr><td style="padding:10px 0;vertical-align:top;color:${colors.maroon};font-family:Georgia,serif;font-size:22px;">03</td><td style="padding:10px 0;color:${colors.ink};font-size:14px;line-height:1.6;">Your consultation is arranged only after you confirm the details with the team.</td></tr>
</table>
${sectionHeading("Your request at a glance")}${detailTable(summary)}
${notice("Your preferred time is a request, not a reserved appointment. The team will discuss consultation details with you.")}
<p style="margin:23px 0 0;color:${colors.muted};font-size:13px;line-height:1.65;">If you did not submit this inquiry, please reply to this email so our team can check it.</p>`;
  return {
    subject: "✨ We received your consultation inquiry | Surabhi Astrology",
    html: emailFrame({
      baseUrl,
      preheader: "Your inquiry has reached us. Our team will contact you to arrange the next step.",
      label: "A note from Surabhi Astrology",
      title: "Your question has reached us.",
      body,
    }),
    text: `Dear ${firstName},\n\nThank you for sharing what is on your mind. We have received your consultation inquiry. Our team will review it and contact you by WhatsApp, phone or email to confirm availability, format and the listed price.\n\n${summary.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nYour preferred time is a request, not a reserved appointment. The team will discuss consultation details with you.\n\nIf you did not submit this inquiry, please reply to this email.\n\nSurabhi Astrology`,
  };
}
