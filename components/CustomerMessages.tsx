"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./CustomerMessages.module.css";

const messages = [
  "kundali-whatsapp-review-01.jpeg",
  "kundali-whatsapp-review-02.jpeg",
  "kundali-whatsapp-review-03.jpeg",
  "kundali-whatsapp-review-04.jpeg",
  "kundali-whatsapp-review-05-redacted.jpeg",
  "kundali-whatsapp-review-06.jpeg",
  "kundali-whatsapp-review-07.jpeg",
  "kundali-whatsapp-review-08.jpeg",
  "kundali-whatsapp-review-09.jpeg",
  "kundali-whatsapp-review-10.jpeg",
  "kundali-whatsapp-review-11.jpeg",
  "kundali-whatsapp-review-12.jpeg",
];

export function CustomerMessages() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      const nearest = cards.reduce(
        (best, card, index) => {
          const distance = Math.abs(card.offsetLeft - track.scrollLeft - track.offsetLeft);
          return distance < best.distance ? { index, distance } : best;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      );
      setActiveIndex(nearest.index);
      setCanGoBack(track.scrollLeft > 2);
      setCanGoForward(track.scrollLeft + track.clientWidth < track.scrollWidth - 2);
    };

    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <section className={`${styles.section} sectionSpace`} aria-labelledby="customer-messages-title">
      <div className="siteContainer">
        <div className={styles.headingRow}>
          <div>
            <p className={styles.eyebrow}>Customer messages</p>
            <h2 id="customer-messages-title" className={styles.title}>
              Their Words, <span>Their Experience</span>
            </h2>
            <p className={styles.intro}>
              A look at WhatsApp messages shared after customers received their Surbhi Kundali
              reports.
            </p>
          </div>
          <div className={styles.desktopControls}>
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={!canGoBack}
              aria-label="Previous message"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={!canGoForward}
              aria-label="Next message"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className={styles.track}
          role="region"
          aria-label="Customer WhatsApp messages"
        >
          {messages.map((file, index) => {
            const src = `/customer-reviews/${file}`;
            return (
              <a
                className={styles.card}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open Kundali report customer message ${index + 1} at full size`}
                key={file}
              >
                <Image
                  src={src}
                  alt={`Customer WhatsApp message about a Surbhi Kundali report, ${index + 1} of ${messages.length}`}
                  width={738}
                  height={1600}
                  sizes="(max-width: 680px) 78vw, 290px"
                  draggable={false}
                />
              </a>
            );
          })}
        </div>
        <div className={styles.mobileControls}>
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={!canGoBack}
            aria-label="Previous message"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <span aria-live="polite">
            {activeIndex + 1} / {messages.length}
          </span>
          <button
            type="button"
            onClick={() => move(1)}
            disabled={!canGoForward}
            aria-label="Next message"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
