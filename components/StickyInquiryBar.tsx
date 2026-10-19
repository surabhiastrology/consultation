"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { InquiryTrigger } from "./InquiryModal";
import styles from "./StickyInquiryBar.module.css";

export function StickyInquiryBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("consultation-hero");
    if (!hero) return;

    const updateVisibility = () => setVisible(hero.getBoundingClientRect().bottom < 0);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${visible ? styles.visible : ""}`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className={styles.bar}>
        <div className={styles.inner}>
          <div className={styles.portrait} aria-hidden="true">
            <Image
              src="/images/surbhi-gupta.webp"
              alt=""
              width={120}
              height={120}
              sizes="(max-width: 639px) 72px, 110px"
            />
          </div>
          <div className={styles.copy}>
            <p className={styles.title}>Personal consultation with Surbhi Gupta</p>
            <p className={styles.detail}>
              <CheckCircle2 aria-hidden="true" size={19} /> Free inquiry · personally arranged
            </p>
          </div>
          <div className={styles.status}>
            <strong>Free inquiry</strong>
            <span>No slot booked yet</span>
          </div>
          <InquiryTrigger className={styles.button}>
            <span>Enquire now</span>
            <ArrowRight aria-hidden="true" size={21} strokeWidth={1.8} />
          </InquiryTrigger>
        </div>
      </div>
    </div>
  );
}
