# Surabhi Astrology consultation site

A standalone Next.js App Router project for `consultation.surabhiastrology.com`. This repository is independent of the main Surabhi site and the Kundali report portal. It collects free consultation inquiries; the team arranges appointments and discusses fees manually. There is no payment flow or lead database.

The implementation uses Next.js 16.4.2 instead of the planned 16.2.1 because the production dependency audit reported a critical advisory in 16.2.1. The patched version has zero production audit findings at implementation time.

## Run locally

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The page can be previewed without email credentials. Submitting the form requires the Resend settings below.

A desktop preview of the implemented hero is saved at `previews/desktop.png`.

## Email configuration

Set `RESEND_API_KEY`, `EMAIL_FROM` and `LEAD_NOTIFICATION_TO` in `.env.local` or the Vercel project environment. `EMAIL_FROM` must use a domain verified in the owner’s Resend account. The example recipient list contains the two requested team inboxes. `CUSTOMER_REPLY_TO` is optional and defaults to the client inbox. The endpoint sends a branded team notification first, then a branded confirmation to the visitor. It returns an error and preserves the form if the team notification is not accepted. If only the visitor confirmation fails, the inquiry still succeeds so the visitor does not create a duplicate lead by retrying.

Before running ads, send a real test inquiry and check arrival in **both team inboxes and the visitor inbox**, including spam folders. Check that the logo and photo load from the public site URL. An accepted Resend API request is not proof of final inbox delivery. No lead is stored elsewhere in this version.

## Ad measurement

Optional `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID` and `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` are left blank by default. When configured, the site asks visitors to allow optional measurement before loading the tags. A Meta `Lead` event and Google Ads conversion event fire only after an accepted inquiry, and contain no form fields. UTM parameters and click IDs are included in the team notification email.

## Design and assets

Global colors and typography live in `app/globals.css`. The page uses Cormorant Garamond and Karla via `next/font`, matching the Kundali report portal. Reusable layout, heading, button and field styles are centralized; section layouts use CSS Modules.

The logo and photographs of Surbhi came from the Kundali portal project. The photographs were only resized and compressed for web delivery; no AI editing or face changes were made. Consultation topic images were also copied from the portal’s existing image collection. The full-resolution source photographs remain in the portal project for identity comparison.

## Review before launch

- Have the owner review and complete the privacy and terms drafts, including legal identity, contact details and retention policy.
- Verify the Resend sender, API key, and both test inbox deliveries.
- Confirm the consultation copy, availability windows, ad IDs and tracking consent language.
- Review image usage rights for the existing portal assets.
- Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.
- Deploy to Vercel, configure DNS and add the main-site link when authorized. These are not configured by this project.
