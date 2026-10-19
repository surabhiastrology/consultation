"use client";

import { useEffect, useState } from "react";
import styles from "./FloatingWhatsApp.module.css";

export function FloatingWhatsApp() {
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
    <a
      href="https://wa.me/919251151330?text=Hi"
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.button} ${visible ? styles.visible : ""}`}
      aria-label="Chat with Surabhi Astrology on WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.01 2.67A13.2 13.2 0 0 0 4.6 22.5L2.67 29.33l7.01-1.84a13.19 13.19 0 0 0 6.33 1.62h.01A13.22 13.22 0 0 0 16.01 2.67Zm0 24.22a10.98 10.98 0 0 1-5.6-1.53l-.4-.24-4.16 1.09 1.11-4.05-.26-.42a11 11 0 1 1 9.31 5.15Zm6.03-8.24c-.33-.17-1.95-.96-2.25-1.07-.3-.11-.52-.16-.74.17-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.16-1.39-.51-2.65-1.63-.98-.87-1.64-1.94-1.83-2.27-.19-.33-.02-.51.14-.67.15-.15.33-.38.5-.58.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.58-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.58.08-.88.41-.3.33-1.15 1.12-1.15 2.73s1.18 3.17 1.34 3.39c.16.22 2.31 3.53 5.59 4.95.78.34 1.39.54 1.86.69.78.25 1.5.21 2.06.13.63-.09 1.95-.8 2.22-1.57.27-.77.27-1.43.19-1.57-.08-.14-.3-.22-.63-.38Z" />
      </svg>
    </a>
  );
}
