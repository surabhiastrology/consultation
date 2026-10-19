"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, LockKeyhole } from "lucide-react";
import { Checkbox, MenuItem, Select, TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs, { type Dayjs } from "dayjs";
import { inquirySchema, timeWindows, topics } from "@/lib/inquiry";
import styles from "./InquiryForm.module.css";

type FieldErrors = Record<string, string[] | undefined>;

// These are the outlined control treatments used in the Kundali checkout.
const controlSx = {
  width: "100%",
  "&.MuiOutlinedInput-root": {
    minHeight: 52,
    borderRadius: "0.5rem",
    backgroundColor: "#FCF7EE",
    color: "#2A1400",
    fontFamily: "var(--font-body)",
    fontSize: 16,
  },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E8D8B8" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#C8A84B" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#C8A84B", borderWidth: 1 },
  "&.Mui-focused": { boxShadow: "0 0 0 2px rgba(200,168,75,.35)" },
  "& .MuiOutlinedInput-root": {
    minHeight: 52,
    borderRadius: "0.5rem",
    backgroundColor: "#FCF7EE",
    color: "#2A1400",
    fontFamily: "var(--font-body)",
    fontSize: 16,
    "& fieldset": { borderColor: "#E8D8B8" },
    "&:hover fieldset": { borderColor: "#C8A84B" },
    "&.Mui-focused": { boxShadow: "0 0 0 2px rgba(200,168,75,.35)" },
    "&.Mui-focused fieldset": { borderColor: "#C8A84B", borderWidth: 1 },
    "&.Mui-error fieldset": { borderColor: "#DC2626" },
  },
  "& .MuiPickersInputBase-root": {
    minHeight: 52,
    borderRadius: "0.5rem",
    backgroundColor: "#FCF7EE",
    color: "#2A1400",
  },
  "& .MuiPickersOutlinedInput-notchedOutline": { borderColor: "#E8D8B8" },
  "& .MuiPickersInputBase-root:hover .MuiPickersOutlinedInput-notchedOutline": {
    borderColor: "#C8A84B",
  },
  "& .MuiPickersInputBase-root.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
    borderColor: "#C8A84B",
  },
  "& .MuiPickersInputBase-root.Mui-focused": { boxShadow: "0 0 0 2px rgba(200,168,75,.35)" },
  "& .MuiPickersSectionList-root": { fontFamily: "var(--font-body)", fontSize: 16 },
  "& .MuiSelect-icon, & .MuiIconButton-root": { color: "#8B1E1E" },
};

const menuProps = {
  slotProps: {
    paper: {
      sx: {
        maxHeight: 320,
        border: "1px solid #E8D8B8",
        borderRadius: "12px",
        boxShadow: "0 12px 32px rgba(61,22,0,.16)",
        "& .MuiMenuItem-root.Mui-selected": { backgroundColor: "#F4EAD6" },
        "& .MuiMenuItem-root:hover": { backgroundColor: "#FFFBF0" },
      },
    },
  },
};

function dateInIndia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function FieldError({ name, errors }: { name: string; errors: FieldErrors }) {
  return errors[name]?.[0] ? (
    <span className={styles.fieldError} id={`${name}-error`}>
      {errors[name]?.[0]}
    </span>
  ) : null;
}

const stepFields = [
  ["name", "email", "whatsapp", "topic"],
  ["birthDate", "birthTime", "birthPlace"],
  ["preferredDate", "preferredWindow", "question", "consent"],
] as const;

const stepLabels = ["Contact", "Birth details", "Your request"] as const;

export function InquiryForm({ onBusyChange }: { onBusyChange: (busy: boolean) => void }) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const sending = useRef(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const minDate = dateInIndia();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [topic, setTopic] = useState("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [birthTime, setBirthTime] = useState<Dayjs | null>(null);
  const [birthTimeApproximate, setBirthTimeApproximate] = useState(false);
  const [birthPlace, setBirthPlace] = useState("");
  const [preferredDate, setPreferredDate] = useState<Dayjs | null>(null);
  const [preferredWindow, setPreferredWindow] = useState("");
  const [question, setQuestion] = useState("");
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (step > 0) {
      progressRef.current?.focus({ preventScroll: true });
      progressRef.current?.closest('[role="dialog"]')?.scrollTo({ top: 0 });
    }
  }, [step]);

  function payload() {
    const params = new URLSearchParams(window.location.search);
    const campaign = Object.fromEntries(
      [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
        "fbclid",
        "gclid",
      ].map((key) => [key, params.get(key) ?? ""]),
    );
    return {
      name,
      email,
      whatsapp,
      topic,
      birthDate: birthDate?.isValid() ? birthDate.format("YYYY-MM-DD") : "",
      birthTime: birthTime?.isValid() ? birthTime.format("HH:mm") : "",
      birthTimeApproximate,
      birthPlace,
      preferredDate: preferredDate?.isValid() ? preferredDate.format("YYYY-MM-DD") : "",
      preferredWindow,
      question,
      consent,
      website: honeypotRef.current?.value ?? "",
      campaign,
    };
  }

  function validateStep(index: number): boolean {
    const parsed = inquirySchema.safeParse(payload());
    if (parsed.success) {
      setFieldErrors({});
      return true;
    }
    const errors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "");
      if (stepFields[index].some((name) => name === field) && !errors[field]) {
        errors[field] = [issue.message];
      }
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function advance() {
    if (!validateStep(step)) return;
    setError("");
    setStep((current) => Math.min(current + 1, 2));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 2) {
      advance();
      return;
    }
    if (!validateStep(2)) return;
    if (sending.current) return;
    sending.current = true;
    onBusyChange(true);
    setState("sending");
    setError("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload()),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(
          typeof result.error === "string"
            ? result.error
            : "We could not send your inquiry. Please try again.",
        );
        if (result.fieldErrors && typeof result.fieldErrors === "object") {
          setFieldErrors(result.fieldErrors);
          const firstInvalidStep = stepFields.findIndex((fields) =>
            fields.some((field) => result.fieldErrors[field]),
          );
          if (firstInvalidStep >= 0) setStep(firstInvalidStep);
        }
        setState("idle");
        return;
      }
      setState("success");
      window.dispatchEvent(new CustomEvent("surabhi:lead-success"));
    } catch {
      setError("We could not send your inquiry. Please check your connection and try again.");
      setState("idle");
    } finally {
      sending.current = false;
      onBusyChange(false);
    }
  }

  if (state === "success") {
    return (
      <div className={styles.success} role="status">
        <CheckCircle2 size={46} strokeWidth={1.5} />
        <h3>Thank you for reaching out.</h3>
        <p>
          Your inquiry has been sent to the Surabhi Astrology team. They will review it and contact
          you to discuss the consultation and a suitable time.
        </p>
        <p className={styles.successFine}>
          Your preferred time is not a confirmed booking. Please wait for personal confirmation from
          the team.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.formTop} ref={progressRef} tabIndex={-1}>
        <div className={styles.progressMeta}>
          <span className={styles.formIndex}>STEP {String(step + 1).padStart(2, "0")} / 03</span>
          <span>{Math.round(((step + 1) / 3) * 100)}% complete</span>
        </div>
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-label="Inquiry progress"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={step + 1}
        >
          <span style={{ width: `${((step + 1) / 3) * 100}%` }} />
        </div>
        <ol className={styles.stepLabels} aria-label="Inquiry steps">
          {stepLabels.map((label, index) => (
            <li
              key={label}
              className={
                index === step ? styles.currentStep : index < step ? styles.completedStep : ""
              }
              aria-current={index === step ? "step" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {label}
            </li>
          ))}
        </ol>
      </div>
      {step === 0 && (
        <fieldset className={styles.group}>
          <legend>
            <span>01</span> Contact details
          </legend>
          <p className={styles.groupHint}>So the team can get back to you personally.</p>
          <div className={styles.grid}>
            <label className={styles.field}>
              Your name <span>*</span>
              <TextField
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
                error={!!fieldErrors.name}
                slotProps={{
                  htmlInput: {
                    maxLength: 100,
                    "aria-describedby": fieldErrors.name ? "name-error" : undefined,
                  },
                }}
                placeholder="Your full name"
                sx={controlSx}
              />
              <FieldError name="name" errors={fieldErrors} />
            </label>
            <label className={styles.field}>
              Email address <span>*</span>
              <TextField
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                autoComplete="email"
                required
                error={!!fieldErrors.email}
                slotProps={{
                  htmlInput: {
                    maxLength: 254,
                    "aria-describedby": fieldErrors.email ? "email-error" : undefined,
                  },
                }}
                placeholder="you@example.com"
                sx={controlSx}
              />
              <FieldError name="email" errors={fieldErrors} />
            </label>
            <label className={styles.field}>
              WhatsApp number <span>*</span>
              <TextField
                name="whatsapp"
                value={whatsapp}
                onChange={(event) => setWhatsapp(event.target.value)}
                type="tel"
                autoComplete="tel"
                required
                error={!!fieldErrors.whatsapp}
                slotProps={{
                  htmlInput: {
                    maxLength: 20,
                    "aria-describedby": fieldErrors.whatsapp ? "whatsapp-error" : undefined,
                  },
                }}
                placeholder="+91 98765 43210"
                sx={controlSx}
              />
              <FieldError name="whatsapp" errors={fieldErrors} />
            </label>
            <label className={styles.field}>
              Consultation topic <span>*</span>
              <Select
                name="topic"
                value={topic}
                onChange={(event) => setTopic(String(event.target.value))}
                displayEmpty
                required
                error={!!fieldErrors.topic}
                inputProps={{
                  "aria-label": "Consultation topic",
                  "aria-describedby": fieldErrors.topic ? "topic-error" : undefined,
                }}
                MenuProps={menuProps}
                sx={controlSx}
              >
                <MenuItem value="" disabled>
                  Choose the closest topic
                </MenuItem>
                {topics.map((topic) => (
                  <MenuItem key={topic} value={topic}>
                    {topic}
                  </MenuItem>
                ))}
              </Select>
              <FieldError name="topic" errors={fieldErrors} />
            </label>
          </div>
        </fieldset>
      )}
      {step === 1 && (
        <fieldset className={styles.group}>
          <legend>
            <span>02</span> Birth details
          </legend>
          <p className={styles.groupHint}>
            These details help us understand the birth chart relevant to your question.
          </p>
          <div className={styles.grid}>
            <label className={styles.field}>
              Date of birth <span>*</span>
              <MobileDatePicker
                value={birthDate}
                onChange={(value) => setBirthDate(value?.isValid() ? value : null)}
                format="DD/MM/YYYY"
                views={["year", "month", "day"]}
                openTo="year"
                yearsOrder="desc"
                minDate={dayjs("1900-01-01")}
                maxDate={dayjs(minDate)}
                slotProps={{
                  textField: {
                    required: true,
                    error: !!fieldErrors.birthDate,
                    sx: controlSx,
                    slotProps: {
                      htmlInput: {
                        "aria-label": "Date of birth",
                        "aria-describedby": fieldErrors.birthDate ? "birthDate-error" : undefined,
                      },
                    },
                  },
                }}
              />
              <FieldError name="birthDate" errors={fieldErrors} />
            </label>
            <div className={styles.field}>
              <label htmlFor="birthTime">
                Time of birth <span>*</span>
              </label>
              <MobileTimePicker
                value={birthTime}
                onChange={(value) => setBirthTime(value?.isValid() ? value : null)}
                ampm
                format="hh:mm A"
                views={["hours", "minutes"]}
                slotProps={{
                  textField: {
                    id: "birthTime",
                    required: true,
                    error: !!fieldErrors.birthTime,
                    sx: controlSx,
                    slotProps: {
                      htmlInput: {
                        "aria-describedby": fieldErrors.birthTime ? "birthTime-error" : undefined,
                      },
                    },
                  },
                }}
              />
              <FieldError name="birthTime" errors={fieldErrors} />
              <label className={styles.checkboxSmall}>
                <Checkbox
                  name="birthTimeApproximate"
                  checked={birthTimeApproximate}
                  onChange={(event) => setBirthTimeApproximate(event.target.checked)}
                  size="small"
                  sx={{ color: "#8B1E1E", p: 0, "&.Mui-checked": { color: "#8B1E1E" } }}
                />{" "}
                This time is approximate
              </label>
            </div>
            <label className={`${styles.field} ${styles.full}`}>
              Place of birth <span>*</span>
              <TextField
                name="birthPlace"
                value={birthPlace}
                onChange={(event) => setBirthPlace(event.target.value)}
                autoComplete="off"
                required
                error={!!fieldErrors.birthPlace}
                slotProps={{
                  htmlInput: {
                    maxLength: 120,
                    "aria-describedby": fieldErrors.birthPlace ? "birthPlace-error" : undefined,
                  },
                }}
                placeholder="City, state and country"
                sx={controlSx}
              />
              <FieldError name="birthPlace" errors={fieldErrors} />
            </label>
          </div>
        </fieldset>
      )}
      {step === 2 && (
        <fieldset className={styles.group}>
          <legend>
            <span>03</span> Your preferred time
          </legend>
          <p className={styles.groupHint}>
            This is a request for follow-up, not a booked consultation slot.
          </p>
          <div className={styles.grid}>
            <label className={styles.field}>
              Preferred date <span>*</span>
              <MobileDatePicker
                value={preferredDate}
                onChange={(value) => setPreferredDate(value?.isValid() ? value : null)}
                format="DD/MM/YYYY"
                views={["year", "month", "day"]}
                minDate={dayjs(minDate)}
                slotProps={{
                  textField: {
                    required: true,
                    error: !!fieldErrors.preferredDate,
                    sx: controlSx,
                    slotProps: {
                      htmlInput: {
                        "aria-label": "Preferred appointment date",
                        "aria-describedby": fieldErrors.preferredDate
                          ? "preferredDate-error"
                          : undefined,
                      },
                    },
                  },
                }}
              />
              <FieldError name="preferredDate" errors={fieldErrors} />
            </label>
            <label className={styles.field}>
              Preferred time window <span>*</span>
              <Select
                name="preferredWindow"
                value={preferredWindow}
                onChange={(event) => setPreferredWindow(String(event.target.value))}
                displayEmpty
                required
                error={!!fieldErrors.preferredWindow}
                inputProps={{
                  "aria-label": "Preferred time window",
                  "aria-describedby": fieldErrors.preferredWindow
                    ? "preferredWindow-error"
                    : undefined,
                }}
                MenuProps={menuProps}
                sx={controlSx}
              >
                <MenuItem value="" disabled>
                  Choose a time window
                </MenuItem>
                {timeWindows.map((window) => (
                  <MenuItem key={window} value={window}>
                    {window}
                  </MenuItem>
                ))}
              </Select>
              <FieldError name="preferredWindow" errors={fieldErrors} />
            </label>
            <label className={`${styles.field} ${styles.full}`}>
              Your main question <span className={styles.optional}>(optional)</span>
              <TextField
                name="question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                multiline
                minRows={4}
                error={!!fieldErrors.question}
                slotProps={{
                  htmlInput: {
                    maxLength: 1000,
                    "aria-describedby": fieldErrors.question ? "question-error" : undefined,
                  },
                }}
                placeholder="What would you most like to understand?"
                sx={controlSx}
              />
              <FieldError name="question" errors={fieldErrors} />
            </label>
          </div>
        </fieldset>
      )}
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Website
          <input ref={honeypotRef} name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {step === 2 && (
        <>
          <label className={styles.consent}>
            <Checkbox
              name="consent"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              required
              slotProps={{
                input: {
                  "aria-invalid": !!fieldErrors.consent,
                  "aria-describedby": fieldErrors.consent ? "consent-error" : undefined,
                },
              }}
              sx={{ color: "#8B1E1E", p: 0, mt: "2px", "&.Mui-checked": { color: "#8B1E1E" } }}
            />
            <span>
              I agree that Surabhi Astrology may use the details in this form to respond to my
              inquiry by email, WhatsApp or phone. I have read the{" "}
              <Link href="/privacy-policy" target="_blank">
                privacy policy
              </Link>
              . <strong>*</strong>
            </span>
          </label>
          <FieldError name="consent" errors={fieldErrors} />
        </>
      )}
      {error ? (
        <p className={styles.submitError} role="alert">
          {error}
        </p>
      ) : null}
      <div className={styles.submitRow}>
        <div className={styles.actions}>
          {step > 0 && (
            <button
              className={styles.backButton}
              type="button"
              disabled={state === "sending"}
              onClick={() => {
                setStep(step - 1);
                setFieldErrors({});
                setError("");
              }}
            >
              <ArrowLeft size={17} /> Back
            </button>
          )}
          <button
            className={styles.submitButton}
            type={step === 2 ? "submit" : "button"}
            onClick={step < 2 ? advance : undefined}
            disabled={state === "sending"}
          >
            <span>
              {state === "sending"
                ? "Sending your inquiry…"
                : step === 2
                  ? "Send my free inquiry"
                  : "Continue"}
            </span>
            <span className={styles.submitIcon}>
              <ArrowUpRight size={18} />
            </span>
          </button>
        </div>
        <p>
          <LockKeyhole size={15} aria-hidden="true" />{" "}
          Your details are sent only when you finish all three steps.
        </p>
      </div>
    </form>
  );
}
