import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Heart,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { InquiryModalProvider, InquiryTrigger } from "./InquiryModal";
import { SocialProof } from "./SocialProof";
import { StickyInquiryBar } from "./StickyInquiryBar";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import styles from "./LandingPage.module.css";

const topics = [
  {
    title: "Love & relationships",
    copy: "Bring clarity to a connection, a recurring pattern, or a decision of the heart.",
    image: "/images/love-relationships.webp",
    alt: "A couple in a quiet moment together",
  },
  {
    title: "Career & direction",
    copy: "Look at the choices, transitions and timing shaping your working life.",
    image: "/images/career-business.webp",
    alt: "A professional considering her next step",
  },
  {
    title: "Marriage & compatibility",
    copy: "Understand the questions around commitment and the future you are building.",
    image: "/images/marriage-matchmaking.webp",
    alt: "A couple sharing a wedding moment",
  },
  {
    title: "Family & wellbeing",
    copy: "Find a more considered perspective on home, family and personal balance.",
    image: "/images/child-family.webp",
    alt: "A family sharing time together",
  },
  {
    title: "Money & stability",
    copy: "Explore the wider picture behind financial choices and changing priorities.",
    image: "/images/wealth-finance.webp",
    alt: "A warmly lit space symbolising stability",
  },
  {
    title: "A question of your own",
    copy: "You do not have to fit your story into a category. Tell us what is on your mind.",
    image: "/images/health-wellbeing.webp",
    alt: "A woman taking a reflective pause",
  },
];

const faqs = [
  {
    question: "Is the inquiry free?",
    answer:
      "Yes. Sending this form is free. The team will share the consultation format, availability and any fee before you decide whether to proceed.",
  },
  {
    question: "Does my preferred date reserve a consultation?",
    answer:
      "No. It helps us understand your availability. Your consultation is arranged only after the team contacts you and you confirm the details together.",
  },
  {
    question: "What if I do not know my exact birth time?",
    answer:
      "Enter your best estimate and tick ‘This time is approximate.’ If you have no estimate, explain that in your question and contact the team before submitting, since a time is currently required for this inquiry.",
  },
  {
    question: "What happens after I submit?",
    answer:
      "The team receives your inquiry by email and may reply by WhatsApp, phone or email. They will discuss the right consultation, timing and any fee with you personally.",
  },
  {
    question: "Can I ask about more than one area?",
    answer:
      "Absolutely. Choose the closest topic, then add context in the optional question box. You can discuss the focus of the conversation during follow-up.",
  },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`${styles.eyebrow} ${light ? styles.eyebrowLight : ""}`}>
      <span aria-hidden="true" className={styles.eyebrowLine} />
      <span aria-hidden="true" className={styles.eyebrowStar}>
        ✧
      </span>
      <span>{children}</span>
      <span aria-hidden="true" className={styles.eyebrowStar}>
        ✧
      </span>
      <span aria-hidden="true" className={styles.eyebrowLine} />
    </p>
  );
}
function SectionTitle({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className={styles.sectionTitle}>
      {children}
    </h2>
  );
}
function PillLink({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <InquiryTrigger className={`${styles.pillButton} ${gold ? styles.pillGold : ""}`}>
      <span>{children}</span>
      <span className={styles.pillIcon} aria-hidden="true">
        <ArrowUpRight size={17} strokeWidth={1.8} />
      </span>
    </InquiryTrigger>
  );
}

function Header() {
  return (
    <>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <div className={styles.topbar}>
        Personal guidance by Surbhi Gupta <span aria-hidden="true">✦</span> Send a free consultation
        inquiry
      </div>
      <header className={styles.header}>
        <div className={`siteContainer ${styles.headerInner}`}>
          <Link
            className={styles.logoLink}
            href="/"
            aria-label="Surabhi Astrology consultation home"
          >
            <Image
              src="/images/surbhi-astrology-logo.png"
              alt="Surabhi Astrology"
              width={180}
              height={60}
              loading="eager"
              className={styles.logo}
            />
          </Link>
          <InquiryTrigger className={styles.headerCta}>
            Ask Surbhi <ArrowUpRight size={16} />
          </InquiryTrigger>
        </div>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section id="consultation-hero" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={`siteContainer ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <h1 id="hero-title">
            Discover what your birth chart <span className={styles.heroGold}>reveals about</span>{" "}
            <em>your path.</em>
          </h1>
          <p className={styles.heroLead}>
            Get personal astrology guidance from Surbhi Gupta for the questions shaping your life.
            Start with a free inquiry; the conversation is arranged with you personally.
          </p>
          <div className={styles.heroActions}>
            <PillLink>Ask about a consultation</PillLink>
            <a href="#consultations" className={styles.textLink}>
              Explore consultations <ArrowDownRight size={18} />
            </a>
          </div>
          <div className={styles.heroTopics} aria-label="Consultation topics">
            <span>Love &amp; relationships</span>
            <span>Marriage</span>
            <span>Career</span>
            <span>Family</span>
            <span>Wealth</span>
          </div>
          <p className={styles.microcopy}>
            <Check size={15} aria-hidden="true" /> Free inquiry <span aria-hidden="true">·</span>{" "}
            Your preferred time is a request, not a booking
          </p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroArch}>
            <Image
              src="/images/surbhi-gupta.webp"
              alt="Surbhi Gupta, astrologer and founder of Surabhi Astrology"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 800px) 90vw, 47vw"
              className={styles.heroPortrait}
            />
          </div>
          <div className={styles.heroOrbit} aria-hidden="true">
            ✧
          </div>
          <div className={styles.heroNote}>
            <span>✦</span>
            <p>
              A space to ask.
              <br />
              <strong>A way to see more clearly.</strong>
            </p>
          </div>
          <div className={styles.heroSeal} aria-hidden="true">
            <Sparkles size={24} />
            <span>
              PERSONAL
              <br />
              GUIDANCE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Topics() {
  return (
    <section
      id="consultations"
      className={`${styles.topicsSection} sectionSpace`}
      aria-labelledby="topics-title"
    >
      <div className="siteContainer">
        <div className={styles.centerHeading}>
          <Eyebrow>Where your story begins</Eyebrow>
          <SectionTitle id="topics-title">
            What would you like <em>clarity on?</em>
          </SectionTitle>
          <p>
            Every person arrives with a different question. These are some of the conversations we
            can begin together.
          </p>
        </div>
        <div className={styles.topicGrid}>
          {topics.map((topic, index) => (
            <article className={styles.topicCard} key={topic.title}>
              <div className={styles.topicImage}>
                <Image
                  src={topic.image}
                  alt={topic.alt}
                  fill
                  sizes="(max-width: 620px) 90vw, (max-width: 960px) 45vw, 31vw"
                />
              </div>
              <div className={styles.topicText}>
                <span className={styles.topicNumber}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{topic.title}</h3>
                  <p>{topic.copy}</p>
                </div>
                <ArrowUpRight className={styles.topicArrow} size={19} aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
        <div className={styles.centerAction}>
          <PillLink>Begin a free inquiry</PillLink>
          <p>We will help you decide the best focus during follow-up.</p>
        </div>
      </div>
    </section>
  );
}

function Explore() {
  return (
    <section className={`${styles.exploreSection} sectionSpace`} aria-labelledby="explore-title">
      <div className="siteContainer">
        <div className={styles.centerHeading}>
          <Eyebrow>Beyond a quick answer</Eyebrow>
          <SectionTitle id="explore-title">
            Make room for <em>understanding.</em>
          </SectionTitle>
          <p>
            A consultation is shaped around your circumstances, your questions and what matters to
            you now.
          </p>
        </div>
        <div className={styles.exploreGrid}>
          <article className={`${styles.exploreCard} ${styles.exploreWine}`}>
            <div className={styles.cardTop}>
              <span>01 / YOUR STORY</span>
              <Heart size={24} />
            </div>
            <div>
              <h3>
                Start with what
                <br />
                you are living.
              </h3>
              <p>Share the situation behind the question, not only a date or a prediction.</p>
            </div>
            <span className={styles.exploreSymbol} aria-hidden="true">
              ✺
            </span>
          </article>
          <article className={`${styles.exploreCard} ${styles.exploreBlue}`}>
            <div className={styles.cardTop}>
              <span>02 / YOUR CHART</span>
              <Sparkles size={24} />
            </div>
            <div>
              <h3>
                See the wider
                <br />
                picture.
              </h3>
              <p>
                Explore patterns and possibilities through an individual reading of your birth
                details.
              </p>
            </div>
            <span className={styles.exploreSymbol} aria-hidden="true">
              ✧
            </span>
          </article>
          <article className={`${styles.exploreCard} ${styles.exploreOlive}`}>
            <div className={styles.cardTop}>
              <span>03 / YOUR NEXT STEP</span>
              <ArrowUpRight size={24} />
            </div>
            <div>
              <h3>
                Leave with a more
                <br />
                considered view.
              </h3>
              <p>Use the conversation to reflect on decisions with greater awareness.</p>
            </div>
            <span className={styles.exploreSymbol} aria-hidden="true">
              ✳
            </span>
          </article>
        </div>
        <p className={styles.exploreFootnote}>
          Astrology offers perspective. Your choices remain your own.
        </p>
      </div>
    </section>
  );
}

function Conversation() {
  return (
    <section
      className={`${styles.conversationSection} sectionSpace`}
      aria-labelledby="conversation-title"
    >
      <div className={`siteContainer ${styles.conversationGrid}`}>
        <div className={styles.conversationImage}>
          <Image
            src="/images/surbhi-office.webp"
            alt="Surbhi Gupta at her consultation desk"
            fill
            sizes="(max-width: 800px) 90vw, 44vw"
          />
        </div>
        <div className={styles.conversationCopy}>
          <Eyebrow>One person. One real conversation.</Eyebrow>
          <h2 id="conversation-title">
            A little more than <em>“what will happen?”</em>
          </h2>
          <p>
            There are moments when a generic answer does not feel enough. A personal consultation
            gives your question the time, context and attention it deserves.
          </p>
          <div className={styles.quoteBlock}>
            <span aria-hidden="true">“</span>
            <p>
              The most useful question is often the one that helps you understand your path more
              clearly.
            </p>
          </div>
          <PillLink>Tell us what is on your mind</PillLink>
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section
      id="how-it-works"
      className={`${styles.stepsSection} sectionSpace`}
      aria-labelledby="steps-title"
    >
      <div className="siteContainer">
        <div className={styles.centerHeading}>
          <Eyebrow>Simple, personal and unhurried</Eyebrow>
          <SectionTitle id="steps-title">
            From your first question <em>to a conversation.</em>
          </SectionTitle>
          <p>
            Three clear steps. The final appointment and any fee are confirmed with you personally.
          </p>
        </div>
        <div className={styles.stepGrid}>
          <article className={styles.stepCard}>
            <div className={styles.stepImage}>
              <Image
                src="/images/share-details.webp"
                alt="Someone writing down details before asking a question"
                fill
                sizes="(max-width: 700px) 80vw, 30vw"
              />
              <span>01</span>
            </div>
            <h3>Tell us about you</h3>
            <p>
              Share your contact and birth details, the subject on your mind and a preferred time.
            </p>
          </article>
          <article className={styles.stepCard}>
            <div className={styles.stepImage}>
              <Image
                src="/images/personal-analysis.webp"
                alt="An astrologer studying a chart"
                fill
                sizes="(max-width: 700px) 80vw, 30vw"
              />
              <span>02</span>
            </div>
            <h3>We review your inquiry</h3>
            <p>The team reads your request and gets in touch to understand how best to help.</p>
          </article>
          <article className={styles.stepCard}>
            <div className={`${styles.stepImage} ${styles.stepVisual}`}>
              <div className={styles.dateIllustration}>
                <CalendarDays size={36} strokeWidth={1.4} />
                <span>YOUR CONVERSATION</span>
                <strong>At a time that works</strong>
                <i aria-hidden="true">✦</i>
              </div>
              <span>03</span>
            </div>
            <h3>Confirm together</h3>
            <p>Agree on the format, time and any fee directly with the team before booking.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className={`${styles.aboutSection} sectionSpace`}
      aria-labelledby="about-title"
    >
      <div className={`siteContainer ${styles.aboutGrid}`}>
        <div className={styles.aboutCopy}>
          <Eyebrow>Meet your astrologer</Eyebrow>
          <h2 id="about-title">
            Guidance with <em>Surbhi Gupta.</em>
          </h2>
          <p>
            Behind every inquiry is a person looking for perspective. Surbhi brings an attentive,
            individual approach to the questions people carry about relationships, work, family and
            change.
          </p>
          <p>
            This is a space for a considered reading and an honest conversation, shaped around your
            own chart and circumstances.
          </p>
          <div className={styles.aboutValues}>
            <span>
              <MessageCircleHeart size={20} /> Personal conversation
            </span>
            <span>
              <ShieldCheck size={20} /> Details handled with care
            </span>
          </div>
          <PillLink gold>Request a consultation</PillLink>
        </div>
        <div className={styles.aboutVisual}>
          <div className={styles.aboutPortrait}>
            <Image
              src="/images/surbhi-gupta.webp"
              alt="Original photograph of Surbhi Gupta"
              fill
              sizes="(max-width: 800px) 90vw, 42vw"
            />
          </div>
          <div className={styles.aboutSignature}>
            Surbhi Gupta <span>Surabhi Astrology</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section
      id="questions"
      className={`${styles.faqSection} sectionSpace`}
      aria-labelledby="faq-title"
    >
      <div className={`siteContainer ${styles.faqGrid}`}>
        <div className={styles.faqVisual}>
          <Image
            src="/images/surbhi-news.webp"
            alt="Surbhi Gupta seated in her office"
            fill
            sizes="(max-width: 800px) 90vw, 40vw"
          />
        </div>
        <div className={styles.faqCopy}>
          <Eyebrow>Frequently asked questions</Eyebrow>
          <h2 id="faq-title">
            A few things to know <em>before you begin.</em>
          </h2>
          <p>Clear answers to the practical questions about your inquiry.</p>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>
                  <span>{faq.question}</span>
                  <ChevronDown size={19} aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Inquiry() {
  return (
    <section
      id="inquiry"
      className={`${styles.inquirySection} sectionSpace`}
      aria-labelledby="inquiry-title"
    >
      <div className="siteContainer">
        <div className={styles.inquiryPanel}>
          <div className={styles.centerHeading}>
            <Eyebrow light>Begin the conversation</Eyebrow>
            <h2 id="inquiry-title" className={styles.inquiryTitle}>
              Tell us what brings you here.
            </h2>
            <p className={styles.inquiryIntro}>
              This inquiry is free. Share a preferred time and the team will contact you to discuss
              availability, format and any fee. No appointment is booked by submitting this form.
            </p>
          </div>
          <PillLink gold>Begin my free inquiry</PillLink>
          <p className={styles.inquiryAside}>Three short steps · No payment · Personal follow-up</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`siteContainer ${styles.footerMain}`}>
        <div className={styles.footerBrand}>
          <Link href="/" aria-label="Surabhi Astrology consultation home">
            <Image
              src="/images/surbhi-astrology-logo.png"
              alt="Surabhi Astrology"
              width={189}
              height={63}
              className={styles.footerLogo}
            />
          </Link>
          <p>Personal guidance begins with a conversation.</p>
        </div>
        <nav className={styles.footerColumn} aria-label="Explore">
          <h3>Explore</h3>
          <a href="#consultations">Consultations</a>
          <a href="#how-it-works">How it works</a>
          <a href="#about">About Surbhi</a>
          <InquiryTrigger className={styles.footerInquiryButton}>Send an inquiry</InquiryTrigger>
        </nav>
        <nav className={styles.footerColumn} aria-label="Information">
          <h3>Information</h3>
          <Link href="/privacy-policy">Privacy policy</Link>
          <Link href="/terms-and-conditions">Terms & conditions</Link>
          <a href="https://surabhiastrology.com/" target="_blank" rel="noopener noreferrer">
            Main Surabhi website <ArrowRight size={13} />
          </a>
        </nav>
      </div>
      <div className={`siteContainer ${styles.footerBottom}`}>
        <span>© {new Date().getFullYear()} Surabhi Astrology. All rights reserved.</span>
        <div className={styles.footerCredit}>
          <span>Designed &amp; promoted by</span>
          <a href="https://synergyinfosoft.com/" target="_blank" rel="noopener noreferrer">
            Synergy
          </a>
        </div>
      </div>
    </footer>
  );
}

export function LandingPage() {
  return (
    <InquiryModalProvider>
      <Header />
      <main id="main-content">
        <Hero />
        <SocialProof />
        <Topics />
        <Explore />
        <Conversation />
        <Steps />
        <About />
        <Faq />
        <Inquiry />
      </main>
      <Footer />
      <StickyInquiryBar />
      <FloatingWhatsApp />
    </InquiryModalProvider>
  );
}
