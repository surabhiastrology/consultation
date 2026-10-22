import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Heart,
  MessageCircleHeart,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Video,
  Zap,
} from "lucide-react";
import { InquiryModalProvider, InquiryTrigger } from "./InquiryModal";
import { SocialProof } from "./SocialProof";
import { CustomerMessages } from "./CustomerMessages";
import { StickyInquiryBar } from "./StickyInquiryBar";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { consultationServices, formatRupees, urgentConsultationPrice } from "@/lib/inquiry";
import styles from "./LandingPage.module.css";

const topics = [
  {
    title: "Love & relationships",
    copy: "Is this relationship right for you? Where might it be going?",
    image: "/images/love-relationships.webp",
    alt: "A couple in a quiet moment together",
  },
  {
    title: "Marriage",
    copy: "Ask about timing, compatibility, or a delay you keep facing.",
    image: "/images/marriage-matchmaking.webp",
    alt: "A couple sharing a wedding moment",
  },
  {
    title: "Career & business",
    copy: "Should you stay, switch, start something new, or wait?",
    image: "/images/career-business.webp",
    alt: "A professional considering her next step",
  },
  {
    title: "Money & stability",
    copy: "Talk through a financial choice and your sense of security.",
    image: "/images/wealth-finance.webp",
    alt: "A warmly lit space symbolising stability",
  },
  {
    title: "Family & children",
    copy: "Bring questions about home, children, or responsibilities.",
    image: "/images/child-family.webp",
    alt: "A family sharing time together",
  },
  {
    title: "One important decision",
    copy: "When you simply cannot tell which path to choose.",
    image: "/images/health-wellbeing.webp",
    alt: "A woman taking a reflective pause",
  },
];

const reasonsToTalk = [
  {
    title: "“I’m torn between two choices.”",
    copy: "You can talk through the decision before you feel ready to make it.",
  },
  {
    title: "“Everyone has a different opinion.”",
    copy: "Make space for your own question and what matters to you.",
  },
  {
    title: "“The same problem keeps coming back.”",
    copy: "Explore the pattern you have noticed and the context around it.",
  },
  {
    title: "“I need a clearer next step.”",
    copy: "Bring the real situation, even if you cannot put it into one neat question.",
  },
];

const faqs = [
  {
    question: "Will I speak directly with Surbhi Gupta?",
    answer:
      "Yes. The consultation is intended as a personal conversation with Surbhi Gupta, once the team confirms her availability and the appointment details with you.",
  },
  {
    question: "What can I ask about?",
    answer:
      "You can bring a question about relationships, marriage, career, business, family, finances, or another important decision. Share the context that matters to you.",
  },
  {
    question: "What does a consultation cost?",
    answer:
      "A 30-minute audio call is ₹11,000, a video call is ₹15,000, and a one-to-one consultation online or in person is ₹24,000. Urgent consultations are ₹51,000 for any format, subject to availability. The team confirms the details before you book.",
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
      "The team receives your inquiry by email and may reply by WhatsApp, phone or email. They will confirm the selected format, price, timing and next steps with you personally.",
  },
  {
    question: "How is my information handled?",
    answer:
      "Your inquiry is emailed to the Surabhi Astrology team for personal follow-up. The site does not keep a separate lead database. The privacy policy linked in the footer explains the current handling.",
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
        <span className={styles.topbarPrimary}>Personal guidance by Surbhi Gupta</span>
        <span className={styles.topbarSecondary}>
          <span aria-hidden="true">✦</span> Share your question
        </span>
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
            Sometimes You Just Need Someone to Help You <em>See Clearly</em>
          </h1>
          <p className={styles.heroLead}>
            Talk Directly with Celebrity Astrologer Surbhi Gupta About the Question You Can’t Stop
            Thinking About
          </p>
          <div className={styles.heroActions}>
            <PillLink>Share Your Question</PillLink>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroArch} aria-hidden="true" />
          <Image
            src="/images/surbhi-namaste-cutout-refined.webp"
            alt="Surbhi Gupta greeting visitors with folded hands"
            width={820}
            height={1610}
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 800px) 52vw, 27vw"
            className={styles.heroPortrait}
          />
          <div className={styles.heroOrbit} aria-hidden="true">
            ✧
          </div>
          <div className={styles.heroNote} aria-hidden="true">
            <Sparkles size={27} strokeWidth={1.5} />
            <p>
              Personal
              <br />
              <strong>guidance</strong>
            </p>
          </div>
          <div className={styles.heroSeal} aria-hidden="true">
            <MessageCircleHeart size={27} strokeWidth={1.5} />
            <span>
              One-on-one
              <br />
              consultation
            </span>
          </div>
        </div>
        <div className={styles.heroTrust} aria-label="What to expect from your consultation">
          <div className={styles.heroTrustItem}>
            <span className={styles.heroTrustIcon} aria-hidden="true">
              <MessageCircleHeart size={24} strokeWidth={1.7} />
            </span>
            <p>
              <strong>One-to-one</strong>
              <span>With Surbhi Gupta</span>
            </p>
          </div>
          <div className={styles.heroTrustItem}>
            <span className={styles.heroTrustIcon} aria-hidden="true">
              <Sparkles size={24} strokeWidth={1.7} />
            </span>
            <p>
              <strong>Your birth chart</strong>
              <span>Personal context</span>
            </p>
          </div>
          <div className={styles.heroTrustItem}>
            <span className={styles.heroTrustIcon} aria-hidden="true">
              <CalendarDays size={24} strokeWidth={1.7} />
            </span>
            <p>
              <strong>Personally arranged</strong>
              <span>By her team</span>
            </p>
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
            What’s Been <em>On Your Mind Lately?</em>
          </SectionTitle>
          <p>
            Start with the question that feels most important. You can tell us the full story in
            your inquiry.
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
          <PillLink>Share Your Question</PillLink>
          <p>Not sure which topic fits? Choose the closest one and add your context.</p>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const options = [
    {
      key: "audio",
      Icon: PhoneCall,
      image: "/images/consultation-audio-surbhi-v2.webp",
      imageAlt: "Surbhi Gupta listening on a phone call while making notes",
      description: "A personal conversation by voice, wherever you are.",
      detail: "By phone",
      includes: [
        "Your question in the context of your birth chart",
        "Timing and patterns relevant to your situation",
        "Possible next steps and remedies, where appropriate",
      ],
    },
    {
      key: "video",
      Icon: Video,
      image: "/images/consultation-video-surbhi-v3.webp",
      imageAlt: "Surbhi Gupta greeting a client during a video consultation",
      description: "Speak face to face from the comfort of your own space.",
      detail: "Online video",
      includes: [
        "A chart-led conversation about your concerns",
        "Space to discuss choices and timing together",
        "Practical guidance and relevant remedies",
      ],
    },
    {
      key: "oneToOne",
      Icon: UsersRound,
      image: "/images/surbhi-office.webp",
      imageAlt: "Surbhi Gupta at her consultation desk",
      description: "A one-to-one session online or in person in Jaipur, Mumbai or Dubai.",
      detail: "Online or in person",
      includes: [
        "A personal reading shaped around your question",
        "Discussion of patterns, timing and possible ways forward",
        "Guidance and traditional remedies where relevant",
      ],
    },
  ] as const;

  return (
    <section
      id="pricing"
      className={`${styles.pricingSection} sectionSpace`}
      aria-labelledby="pricing-title"
    >
      <div className="siteContainer">
        <div className={styles.centerHeading}>
          <Eyebrow>Consultation formats</Eyebrow>
          <SectionTitle id="pricing-title">
            Choose how you’d <em>like to talk.</em>
          </SectionTitle>
          <p>Three ways to have a personal conversation with Surbhi. Each session is 30 minutes.</p>
        </div>
        <div className={styles.pricingGrid}>
          {options.map((option) => (
            <article
              className={`${styles.pricingCard} ${option.key === "oneToOne" ? styles.pricingFeatured : ""} ${option.key === "video" ? styles.pricingVideo : ""}`}
              key={option.key}
            >
              <div className={styles.pricingImage}>
                <Image
                  src={option.image}
                  alt={option.imageAlt}
                  fill
                  unoptimized={option.key !== "oneToOne"}
                  sizes={
                    option.key === "oneToOne"
                      ? "(max-width: 900px) 90vw, 48vw"
                      : "(max-width: 900px) 90vw, 60vw"
                  }
                />
              </div>
              <div className={styles.pricingContent}>
                <div className={styles.pricingCardTop}>
                  <span className={styles.pricingIcon} aria-hidden="true">
                    <option.Icon size={21} strokeWidth={1.6} />
                  </span>
                </div>
                <h3>{consultationServices[option.key].label}</h3>
                <p>{option.description}</p>
                <div className={styles.pricingIncludes}>
                  <h4>What we’ll cover</h4>
                  <ul>
                    {option.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.pricingFacts}>
                  <span>30 minutes</span>
                  <span>{option.detail}</span>
                </div>
                <div className={styles.pricingCardBottom}>
                  <strong>{formatRupees(consultationServices[option.key].price)}</strong>
                  <InquiryTrigger className={styles.pricingButton} service={option.key}>
                    Ask about this <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
                  </InquiryTrigger>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.urgentBand}>
          <span className={styles.urgentIcon} aria-hidden="true">
            <Zap size={22} strokeWidth={1.7} />
          </span>
          <div>
            <span>NEED TO SPEAK SOONER?</span>
            <h3>Urgent consultation</h3>
            <p>Available for any of the three formats, subject to confirmation by the team.</p>
          </div>
          <strong>{formatRupees(urgentConsultationPrice)}</strong>
        </div>
        <p className={styles.pricingNote}>
          In-person sessions are offered in Jaipur, Mumbai and Dubai. Share your preferred format,
          city and time; the team will confirm availability and booking details with you.
        </p>
      </div>
    </section>
  );
}

function WhyConsult() {
  return (
    <section className={`${styles.whySection} sectionSpace`} aria-labelledby="why-title">
      <div className={`siteContainer ${styles.whyGrid}`}>
        <div className={styles.whyIntro}>
          <Eyebrow light>Why speak one-on-one</Eyebrow>
          <h2 id="why-title">
            You don’t need to have <em>everything figured out.</em>
          </h2>
          <p>
            You can arrive with uncertainty, two choices, or a story that is hard to summarise. That
            is enough to begin the conversation.
          </p>
          <PillLink gold>Share Your Question</PillLink>
          <span className={styles.whyMark} aria-hidden="true">
            ✧
          </span>
        </div>
        <div className={styles.whyList}>
          {reasonsToTalk.map((reason, index) => (
            <article className={styles.whyItem} key={reason.title}>
              <span className={styles.whyNumber}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{reason.title}</h3>
                <p>{reason.copy}</p>
              </div>
            </article>
          ))}
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
          <Eyebrow>What the conversation can offer</Eyebrow>
          <SectionTitle id="explore-title">
            A clearer view <em>to take forward.</em>
          </SectionTitle>
          <p>
            Explore your situation, its timing, and the choices in front of you without expecting a
            single answer to make the decision for you.
          </p>
        </div>
        <div className={styles.exploreGrid}>
          <article className={`${styles.exploreCard} ${styles.exploreWine}`}>
            <div className={styles.cardTop}>
              <span>01 / YOUR SITUATION</span>
              <Heart size={24} />
            </div>
            <div>
              <h3>
                Understand what
                <br />
                is happening.
              </h3>
              <p>Discuss the circumstances behind your question, not only a date or prediction.</p>
            </div>
            <span className={styles.exploreSymbol} aria-hidden="true">
              ✺
            </span>
          </article>
          <article className={`${styles.exploreCard} ${styles.exploreBlue}`}>
            <div className={styles.cardTop}>
              <span>02 / YOUR TIMING</span>
              <Sparkles size={24} />
            </div>
            <div>
              <h3>
                Consider the
                <br />
                timing.
              </h3>
              <p>Explore periods for action, patience, or reflection through your birth chart.</p>
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
                See a clearer
                <br />
                next step.
              </h3>
              <p>Take away practical points to consider after the conversation.</p>
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
          <h2 id="conversation-title">
            Your chart is the starting point. <em>Your life is the conversation.</em>
          </h2>
          <p>
            Surbhi uses your birth chart to explore timing and patterns, then discusses them in the
            context of what you are actually going through.
          </p>
          <div className={styles.quoteBlock}>
            <span aria-hidden="true">✦</span>
            <p>
              This is a personal conversation with Surbhi Gupta, arranged by her team after your
              inquiry.
            </p>
          </div>
          <PillLink>Share Your Question</PillLink>
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
          <Eyebrow>Three clear steps</Eyebrow>
          <SectionTitle id="steps-title">
            How Your <em>Consultation Starts.</em>
          </SectionTitle>
          <p>
            Tell us what is on your mind, then arrange the conversation personally with the team.
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
            <h3>Share your question</h3>
            <p>Tell us what is on your mind and share your contact and birth details.</p>
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
            <p>The team contacts you to confirm availability, format and the listed price.</p>
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
            <h3>Speak with Surbhi</h3>
            <p>Have your one-on-one conversation at the time you confirm together.</p>
          </article>
        </div>
        <p className={styles.stepNote}>
          Sending an inquiry does not book a consultation. Your preferred time is confirmed
          separately.
        </p>
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
            Meet the person <em>you’ll speak with.</em>
          </h2>
          <p>
            Celebrity Astrologer Surbhi Gupta brings a personal approach to questions about
            relationships, career, family and important life decisions. Your conversation is shaped
            around your birth chart and the situation you bring.
          </p>
          <div className={styles.aboutValues}>
            <span>
              <MessageCircleHeart size={20} /> Personal conversation
            </span>
            <span>
              <ShieldCheck size={20} /> Details handled with care
            </span>
          </div>
          <PillLink gold>Share Your Question</PillLink>
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
              Still thinking about the same question?
            </h2>
            <p className={styles.inquiryIntro}>
              Share what is on your mind and take the first step toward a personal conversation with
              Surbhi. Her team will contact you to confirm availability, format and pricing.
            </p>
          </div>
          <PillLink gold>Share Your Question</PillLink>
          <p className={styles.inquiryAside}>
            The team will discuss the consultation details with you.
          </p>
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
          <a
            className={styles.footerInstagram}
            href="https://www.instagram.com/celebrity_astrologer_surbhi/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Surabhi Astrology on Instagram"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
        <nav className={styles.footerColumn} aria-label="Explore">
          <h3>Explore</h3>
          <a href="#consultations">Consultations</a>
          <a href="#pricing">Pricing</a>
          <a href="#how-it-works">How it works</a>
          <a href="#about">About Surbhi</a>
          <InquiryTrigger className={styles.footerInquiryButton}>
            Share your question
          </InquiryTrigger>
        </nav>
        <nav className={styles.footerColumn} aria-label="Information">
          <h3>Information</h3>
          <Link href="/privacy-policy">Privacy policy</Link>
          <Link href="/terms-and-conditions">Terms & conditions</Link>
          <a
            href="https://kundalireport.surabhiastrology.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kundali Report Portal <ArrowRight size={13} />
          </a>
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
        <Topics />
        <Pricing />
        <Conversation />
        <Steps />
        <SocialProof />
        <WhyConsult />
        <Explore />
        <CustomerMessages />
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
