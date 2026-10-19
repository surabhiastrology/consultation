"use client";

import { useEffect, useState } from "react";
import { CalendarCheck2, Check, MessageCircleHeart, X } from "lucide-react";
import styles from "./TrustNotices.module.css";

const DISMISSED_KEY = "consultation-notices-dismissed";
const FIRST_NOTICE_DELAY = 8_000;
const NOTICE_INTERVAL = 20_000;
const NOTICE_DURATION = 8_000;

const notices = [
  {
    label: "A simple first step",
    title: "Your inquiry is free",
    detail: "No payment is collected when you send the form.",
    icon: Check,
  },
  {
    label: "Personal follow-up",
    title: "Your question reaches the team",
    detail: "They can reply by WhatsApp, phone, or email.",
    icon: MessageCircleHeart,
  },
  {
    label: "Before you decide",
    title: "Booking is arranged together",
    detail: "Availability, format, and any fee are discussed first.",
    icon: CalendarCheck2,
  },
] as const;

export function TrustNotices() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed || window.sessionStorage.getItem(DISMISSED_KEY) === "1") return;

    let nextIndex = 0;
    let interval: number | undefined;
    let hideTimeout: number | undefined;

    const showNext = () => {
      if (document.visibilityState !== "visible" || document.querySelector('[role="dialog"]')) {
        return;
      }

      setActiveIndex(nextIndex);
      nextIndex = (nextIndex + 1) % notices.length;
      window.clearTimeout(hideTimeout);
      hideTimeout = window.setTimeout(() => setActiveIndex(null), NOTICE_DURATION);
    };

    const firstTimeout = window.setTimeout(() => {
      showNext();
      interval = window.setInterval(showNext, NOTICE_INTERVAL);
    }, FIRST_NOTICE_DELAY);

    return () => {
      window.clearTimeout(firstTimeout);
      window.clearInterval(interval);
      window.clearTimeout(hideTimeout);
    };
  }, [dismissed]);

  if (dismissed || activeIndex === null) return null;

  const notice = notices[activeIndex];
  const Icon = notice.icon;

  const dismiss = () => {
    window.sessionStorage.setItem(DISMISSED_KEY, "1");
    setDismissed(true);
    setActiveIndex(null);
  };

  return (
    <aside className={styles.notice} aria-label="Consultation information">
      <span className={styles.icon} aria-hidden="true">
        <Icon size={21} strokeWidth={1.8} />
      </span>
      <div className={styles.copy}>
        <span className={styles.label}>{notice.label}</span>
        <strong>{notice.title}</strong>
        <p>{notice.detail}</p>
      </div>
      <button
        className={styles.close}
        type="button"
        onClick={dismiss}
        aria-label="Dismiss consultation notices"
      >
        <X size={17} aria-hidden="true" />
      </button>
    </aside>
  );
}
