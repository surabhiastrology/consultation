"use client";

import { useEffect, useState } from "react";
import styles from "./TrackingConsent.module.css";

const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const googleId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const googleLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;

type TrackingWindow = Window & {
  fbq?: PixelFunction;
  _fbq?: PixelFunction;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

type PixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: (...args: unknown[]) => void;
  loaded: boolean;
  version: string;
};

function loadScript(src: string) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function TrackingConsent() {
  const [choice, setChoice] = useState<"accepted" | "declined" | null>(null);
  const enabled = Boolean(metaId || googleId);

  useEffect(() => {
    if (!enabled) return;
    const stored = localStorage.getItem("surabhi-analytics-consent");
    if (stored === "accepted" || stored === "declined") queueMicrotask(() => setChoice(stored));
  }, [enabled]);

  useEffect(() => {
    if (choice !== "accepted") return;
    const tracked = window as TrackingWindow;
    if (metaId && !tracked.fbq) {
      const pixel = ((...args: unknown[]) => {
        if (pixel.callMethod) pixel.callMethod(...args);
        else pixel.queue.push(args);
      }) as PixelFunction;
      pixel.queue = [];
      pixel.push = pixel;
      pixel.loaded = true;
      pixel.version = "2.0";
      tracked.fbq = pixel;
      tracked._fbq = pixel;
      loadScript("https://connect.facebook.net/en_US/fbevents.js");
      pixel("init", metaId);
      pixel("track", "PageView");
    }
    if (googleId && !tracked.gtag) {
      tracked.dataLayer = tracked.dataLayer ?? [];
      tracked.gtag = (...args: unknown[]) => {
        tracked.dataLayer?.push(args);
      };
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleId)}`);
      tracked.gtag("js", new Date());
      tracked.gtag("config", googleId);
    }

    const onLead = () => {
      if (metaId) tracked.fbq?.("track", "Lead");
      if (googleId && googleLabel)
        tracked.gtag?.("event", "conversion", { send_to: `${googleId}/${googleLabel}` });
    };
    window.addEventListener("surabhi:lead-success", onLead);
    return () => window.removeEventListener("surabhi:lead-success", onLead);
  }, [choice]);

  if (!enabled || choice) return null;
  const decide = (value: "accepted" | "declined") => {
    localStorage.setItem("surabhi-analytics-consent", value);
    setChoice(value);
  };
  return (
    <div className={styles.banner} role="region" aria-label="Optional ad measurement">
      <p>
        May we use optional ad measurement cookies? They help us understand which ads lead to
        inquiries. Birth and contact details are never sent in conversion events.{" "}
        <a href="/privacy-policy">Privacy details</a>
      </p>
      <div>
        <button onClick={() => decide("declined")}>Decline</button>
        <button onClick={() => decide("accepted")}>Allow measurement</button>
      </div>
    </div>
  );
}
