import assert from "node:assert/strict";

const baseUrl = process.env.TEST_BASE_URL ?? "http://localhost:3100";
const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

const inquiry = {
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
  question: "",
  consent: true,
  website: "",
  campaign: { utm_source: "meta" },
};

async function post(body) {
  return fetch(`${baseUrl}/api/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

async function check(label, body, expectedStatus) {
  const response = await post(body);
  assert.equal(response.status, expectedStatus, `${label}: unexpected status`);
  console.log(`${label}: ${response.status}`);
}

await check("missing required fields", { ...inquiry, name: "" }, 400);
await check("past preferred date", { ...inquiry, preferredDate: "2020-01-01" }, 400);
await check("honeypot", { ...inquiry, website: "spam.example" }, 400);
await check("malformed JSON", "{", 400);
await check("oversized payload", "x".repeat(16_001), 413);
await check("valid input without email configuration", inquiry, 503);
