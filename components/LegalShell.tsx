import Image from "next/image";
import Link from "next/link";
import styles from "@/app/legal.module.css";

export function LegalShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <div className={`siteContainer ${styles.barInner}`}>
          <Link href="/">
            <Image
              src="/images/surbhi-astrology-logo.png"
              alt="Surabhi Astrology"
              width={171}
              height={57}
            />
          </Link>
          <Link href="/">Back to consultation</Link>
        </div>
      </header>
      <main className={styles.content}>
        <p className={styles.eyebrow}>Surabhi Astrology / consultation</p>
        <h1>{title}</h1>
        <p className={styles.notice}>
          <strong>Draft for owner review before launch.</strong> Confirm the legal business
          identity, contact address, retention period, service terms and applicable law before
          publishing this site.
        </p>
        {children}
      </main>
      <footer className={styles.foot}>
        <div className="siteContainer">
          © {new Date().getFullYear()} Surabhi Astrology ·{" "}
          <Link href="https://surabhiastrology.com/">Main website</Link>
        </div>
      </footer>
    </div>
  );
}
