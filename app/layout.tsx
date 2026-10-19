import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TrackingConsent } from "@/components/TrackingConsent";
import { Providers } from "./providers";

const cormorant = localFont({
  src: "../assets/fonts/cormorant-garamond-latin.woff2",
  weight: "300 700",
  variable: "--font-serif",
  display: "swap",
});
const karla = localFont({
  src: "../assets/fonts/karla-latin.woff2",
  weight: "300 700",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://consultation.surabhiastrology.com"),
  title: "Personal Astrology Consultation | Surabhi Astrology",
  description:
    "Explore a personal astrology consultation with Surbhi Gupta. Share your questions and preferred time through a free inquiry; the team will follow up to confirm next steps.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "A conversation for the questions that matter | Surabhi Astrology",
    description: "Personal astrology guidance with Surbhi Gupta. Begin with a free inquiry.",
    url: "/",
    siteName: "Surabhi Astrology",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${karla.variable}`}>
      <body>
        <Providers>
          {children}
          <TrackingConsent />
        </Providers>
      </body>
    </html>
  );
}
