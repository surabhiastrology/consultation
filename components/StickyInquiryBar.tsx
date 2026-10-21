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
              src="/images/surbhi-sticky-namaste.webp"
              alt=""
              width={120}
              height={120}
              sizes="(max-width: 639px) 72px, 110px"
            />
          </div>
          <div className={styles.copy}>
            <p className={styles.title}>Personal consultation with Surbhi Gupta</p>
            <p className={styles.detail}>
              <CheckCircle2 aria-hidden="true" size={19} /> Arranged personally with the team
            </p>
          </div>
          <div className={styles.status}>
            <strong>Personal guidance</strong>
            <span>Arranged with you</span>
          </div>
          <InquiryTrigger className={styles.button}>
            <span>Ask Surbhi</span>
            <ArrowRight aria-hidden="true" size={21} strokeWidth={1.8} />
          </InquiryTrigger>
        </div>
      </div>
    </div>
  );
}
