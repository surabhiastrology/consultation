import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Privacy Policy Draft | Surabhi Astrology",
  robots: { index: false, follow: false },
};

export default function PrivacyPolicy() {
  return (
    <LegalShell title="Privacy policy">
      <p>
        This page explains how information submitted through the consultation inquiry site is
        expected to be handled. It is a working draft and needs review by the site owner before the
        site goes live.
      </p>
      <h2>Information you provide</h2>
      <p>
        The inquiry form asks for your name, email address, WhatsApp number, consultation topic,
        birth date, birth time, birth place, preferred date and time window, and any optional
        question. We also receive campaign parameters attached to the page link, such as UTM tags,
        gclid or fbclid, when present.
      </p>
      <h2>Why we use it</h2>
      <p>
        The team uses these details to review your inquiry and contact you about a possible
        consultation. Your preferred time is used to discuss availability; it does not reserve an
        appointment. The site does not collect payment.
      </p>
      <h2>How the inquiry is stored</h2>
      <p>
        When the email provider accepts your inquiry, the form contents are sent to designated team
        inboxes. This version does not use a separate lead database. Email copies may remain in the
        provider and recipient inboxes under their retention settings. The site owner should set and
        publish a retention period before launch.
      </p>
      <h2>Ad measurement</h2>
      <p>
        Optional Meta Pixel and Google Ads tags load only if configured and you allow measurement. A
        lead event is sent only after a successful inquiry. The conversion event does not include
        your name, contact details, birth information or question. You may decline optional
        measurement.
      </p>
      <h2>Sharing and contact</h2>
      <p>
        The inquiry goes to Surabhi Astrology’s team and its email delivery provider. We send a
        confirmation to the email address you provide, summarising your topic and preferred time
        without repeating your birth details or question. The team may contact you by email,
        WhatsApp or phone about your inquiry. This form does not sign you up for general marketing
        messages.
      </p>
      <h2>Your choices</h2>
      <p>
        You may ask the owner to access, correct or remove your inquiry details from the team’s
        records, subject to applicable obligations. The owner should add a verified privacy contact
        address here before launch.
      </p>
      <h2>Changes</h2>
      <p>
        The owner may update this policy as the consultation service and its tools change. The final
        policy should include an effective date and owner contact details.
      </p>
    </LegalShell>
  );
}
