import test from "node:test";
import assert from "node:assert/strict";
import { inquiryEmail, inquirySchema } from "../lib/inquiry.ts";
import { emailAccepted } from "../lib/email-delivery.ts";

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
  const email = inquiryEmail(result.data);
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

test("limits open text and escapes HTML in the notification", () => {
  assert.equal(inquirySchema.safeParse(sample({ question: "a".repeat(1001) })).success, false);
  const parsed = inquirySchema.parse(sample({ question: "<script>alert('x')</script>" }));
  const email = inquiryEmail(parsed);
  assert.doesNotMatch(email.html, /<script>/);
  assert.match(email.html, /&lt;script&gt;/);
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
