import test from "node:test";
import assert from "node:assert/strict";
import { consultationPrice, inquirySchema } from "../lib/inquiry.ts";
import { confirmationEmail, inquiryEmail } from "../lib/inquiry-email.ts";
import { deliverInquiryEmails, emailAccepted } from "../lib/email-delivery.ts";

const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

function sample(overrides = {}) {
  return {
    name: "Test Inquiry",
    email: "test@example.com",
    whatsapp: "+919876543210",
    topic: "Career & direction",
    service: "audio",
    urgent: false,
    birthDate: "1990-05-20",
    birthTime: "09:30",
    birthTimeApproximate: true,
    birthPlace: "Jaipur, India",
    preferredDate: today,
    preferredWindow: "Morning (9am–12pm)",
    question: "A question",
    consent: true,
    website: "",
    campaign: {
      utm_source: "meta",
      utm_medium: "paid",
      utm_campaign: "autumn",
      utm_content: "",
      utm_term: "",
      fbclid: "",
      gclid: "",
    },
    ...overrides,
  };
}

test("accepts a complete inquiry and marks an approximate birth time", () => {
  const result = inquirySchema.safeParse(sample());
  assert.equal(result.success, true);
  const email = inquiryEmail(result.data, "https://consultation.example.com");
  assert.match(email.text, /Birth time: 09:30 \(approximate\)/);
  assert.match(email.text, /utm_source: meta/);
});

test("rejects missing required fields and invalid contact values", () => {
  assert.equal(
    inquirySchema.safeParse(sample({ name: "", email: "bad", whatsapp: "x", consent: false }))
      .success,
    false,
  );
});

test("rejects a past preferred date and a future birth date", () => {
  assert.equal(inquirySchema.safeParse(sample({ preferredDate: "2020-01-01" })).success, false);
  assert.equal(inquirySchema.safeParse(sample({ birthDate: "2099-01-01" })).success, false);
});

test("requires a format and an in-person city, and applies the urgent price", () => {
  assert.equal(inquirySchema.safeParse(sample({ service: "" })).success, false);
  assert.equal(inquirySchema.safeParse(sample({ service: "oneToOne" })).success, false);
  assert.equal(
    inquirySchema.safeParse(sample({ service: "oneToOne", meetingMode: "inPerson" })).success,
    false,
  );
  assert.equal(
    inquirySchema.safeParse(
      sample({ service: "audio", meetingMode: "inPerson", consultationLocation: "Dubai" }),
    ).success,
    false,
  );
  const inPerson = inquirySchema.parse(
    sample({
      service: "oneToOne",
      meetingMode: "inPerson",
      consultationLocation: "Dubai",
      urgent: true,
    }),
  );
  assert.equal(consultationPrice(inPerson.service, inPerson.urgent), 51_000);
  assert.equal(consultationPrice("audio", false), 11_000);
  assert.equal(consultationPrice("video", false), 15_000);
  assert.equal(consultationPrice("oneToOne", false), 24_000);
  const email = inquiryEmail(inPerson, "https://consultation.example.com");
  assert.match(email.text, /Preferred city: Dubai/);
  assert.match(email.text, /Listed price: ₹51,000/);
  const confirmation = confirmationEmail(inPerson, "https://consultation.example.com");
  assert.match(confirmation.text, /Your selected price: ₹51,000/);
});

test("limits open text and escapes HTML in the notification", () => {
  assert.equal(inquirySchema.safeParse(sample({ question: "a".repeat(1001) })).success, false);
  const parsed = inquirySchema.parse(sample({ question: "<script>alert('x')</script>" }));
  const email = inquiryEmail(parsed, "https://consultation.example.com");
  assert.doesNotMatch(email.html, /<script>/);
  assert.match(email.html, /&lt;script&gt;/);
});

test("branded emails use public assets and keep private birth details out of the visitor copy", () => {
  const inquiry = inquirySchema.parse(
    sample({ name: "Asha <Visitor>", question: "Private question" }),
  );
  const baseUrl = "https://consultation.example.com";
  const team = inquiryEmail(inquiry, baseUrl);
  const visitor = confirmationEmail(inquiry, baseUrl);

  assert.equal(team.subject, "🔔 NEW CONSULTATION INQUIRY: Asha <Visitor> | Career & direction");
  assert.match(visitor.subject, /^✨ We received your consultation inquiry/);

  for (const email of [team, visitor]) {
    assert.match(
      email.html,
      /https:\/\/consultation\.example\.com\/images\/surbhi-email-logo\.png/,
    );
    assert.match(
      email.html,
      /https:\/\/consultation\.example\.com\/images\/surbhi-email-office\.jpg/,
    );
    assert.doesNotMatch(email.html, /Asha <Visitor>/);
    assert.match(email.html, /https:\/\/wa\.me\/919251151330/);
    assert.match(email.html, /https:\/\/www\.instagram\.com\/celebrity_astrologer_surbhi\//);
  }
  assert.match(team.html, /Private question/);
  assert.match(team.html, /Birth date/);
  assert.match(visitor.text, /not a reserved appointment/);
  assert.doesNotMatch(visitor.html, /Private question|Birth date|Birth time|Jaipur, India/);
});

test("reports success only when the email provider accepts the notification", async () => {
  const message = {
    from: "team@example.com",
    to: ["first@example.com", "second@example.com"],
    replyTo: "test@example.com",
    subject: "Test",
    html: "<p>Test</p>",
    text: "Test",
  };
  assert.equal(
    await emailAccepted(async () => ({ data: { id: "accepted-id" }, error: null }), message),
    true,
  );
  assert.equal(
    await emailAccepted(async () => ({ data: null, error: new Error("failed") }), message),
    false,
  );
  assert.equal(
    await emailAccepted(async () => {
      throw new Error("network");
    }, message),
    false,
  );
});

test("sends the visitor confirmation only after the team email is accepted", async () => {
  const teamMessage = { to: ["team@example.com"] };
  const customerMessage = { to: ["visitor@example.com"] };
  const sent = [];

  const rejectedTeam = await deliverInquiryEmails(
    async (message) => {
      sent.push(message.to[0]);
      return { data: null, error: new Error("rejected") };
    },
    teamMessage,
    customerMessage,
  );
  assert.deepEqual(rejectedTeam, { leadAccepted: false, confirmationAccepted: false });
  assert.deepEqual(sent, ["team@example.com"]);

  sent.length = 0;
  const rejectedConfirmation = await deliverInquiryEmails(
    async (message) => {
      sent.push(message.to[0]);
      return message === teamMessage
        ? { data: { id: "team-id" }, error: null }
        : { data: null, error: new Error("rejected") };
    },
    teamMessage,
    customerMessage,
  );
  assert.deepEqual(rejectedConfirmation, { leadAccepted: true, confirmationAccepted: false });
  assert.deepEqual(sent, ["team@example.com", "visitor@example.com"]);
});
