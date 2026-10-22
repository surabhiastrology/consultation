import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Terms Draft | Surabhi Astrology",
  robots: { index: false, follow: false },
};

export default function Terms() {
  return (
    <LegalShell title="Terms & conditions">
      <p>
        These consultation terms are a working draft for the site owner to review before launch.
      </p>
      <h2>Inquiry and booking</h2>
      <p>
        Submitting the form does not reserve a consultation slot. A member of the team will contact
        you to confirm availability, format, duration and the listed price. A consultation is
        confirmed only when the terms are agreed directly with you.
      </p>
      <h2>Information you submit</h2>
      <p>
        Please provide accurate contact and birth details to the best of your knowledge. If your
        birth time is estimated, mark it as approximate. Do not include another person’s sensitive
        information in the open question field without their permission.
      </p>
      <h2>Nature of the service</h2>
      <p>
        Astrology guidance is a personal interpretive service. It does not guarantee a particular
        event or result and should not replace qualified medical, legal, financial or mental health
        advice. You remain responsible for your decisions.
      </p>
      <h2>Fees and changes</h2>
      <p>
        The listed price is ₹11,000 for a 30-minute audio call, ₹15,000 for a 30-minute video call,
        or ₹24,000 for a 30-minute one-to-one consultation online or in person. An urgent request
        for any format is ₹51,000, subject to availability. The team will confirm the final
        appointment details and payment arrangements before a booking is made. The owner should
        publish final cancellation and rescheduling policies before accepting paid appointments.
      </p>
      <h2>Contact and governing details</h2>
      <p>
        The owner should add its verified business name, contact address, support channel and
        applicable governing law before launch.
      </p>
    </LegalShell>
  );
}
