import Image from "next/image";
import styles from "./SocialProof.module.css";

const people = [
  "/celebs/4.jpeg",
  "/celebs/7.jpeg",
  "/celebs/6.jpeg",
  "/celebs/11.png",
  "/celebs/8.jpg",
  "/celebs/8.png",
  "/celebs/9.jpeg",
  "/celebs/9.png",
  "/celebs/10.jpg",
  "/celebs/13.jpeg",
  "/celebs/14.jpeg",
  "/celebs/1.jpeg",
  "/celebs/2.jpeg",
  "/celebs/3.jpeg",
];

const coverage = [
  { image: "/news/002.jpg", publisher: "Hindustan Times" },
  { image: "/news/003.jpg", publisher: "Mid-Day" },
  { image: "/news/004.jpg", publisher: "Zee News" },
  { image: "/narendra-modi.jpg", publisher: "India Today" },
  { image: "/news/009.png", publisher: "Firstpost" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className={styles.eyebrow}>
      <span aria-hidden="true" /> ✧ {children} ✧ <span aria-hidden="true" />
    </p>
  );
}

export function SocialProof() {
  return (
    <section className={styles.section} aria-label="Surbhi Gupta's public work and press coverage">
      <div className={styles.heading}>
        <Eyebrow>Celebrity consultations</Eyebrow>
        <h2>
          Trusted by <em>1,50,000+</em> individuals for
          <span>Surbhi Kundali reports</span>
        </h2>
      </div>
      <div className={styles.marquee} aria-label="Photographs from Surbhi Gupta's public work">
        <div className={`${styles.track} ${styles.peopleTrack}`}>
          {[...people, ...people].map((image, index) => (
            <div
              className={styles.personCard}
              key={`${image}-${index}`}
              aria-hidden={index >= people.length}
            >
              <Image
                src={image}
                alt={index < people.length ? "Surbhi Gupta with a public figure" : ""}
                fill
                sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 220px"
              />
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.heading} ${styles.pressHeading}`}>
        <Eyebrow>As featured in</Eyebrow>
        <h2>
          Making headlines.
          <span>Trusted by the press.</span>
        </h2>
      </div>
      <div className={styles.marquee} aria-label="Press coverage featuring Surbhi Gupta">
        <div className={`${styles.track} ${styles.pressTrack}`}>
          {[...coverage, ...coverage].map((item, index) => (
            <div
              className={styles.pressCard}
              key={`${item.publisher}-${index}`}
              aria-hidden={index >= coverage.length}
            >
              <Image
                src={item.image}
                alt={index < coverage.length ? `Press coverage from ${item.publisher}` : ""}
                fill
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 380px"
              />
              <div className={styles.pressCaption} aria-hidden="true">
                <small>Media coverage</small>
                <strong>{item.publisher}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
