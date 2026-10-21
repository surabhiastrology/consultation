import { z } from "zod";

const limited = (max: number) =>
  z.string().trim().min(1, "This field is required.").max(max, `Use ${max} characters or fewer.`);
const optionalAttribution = z.string().trim().max(200).optional().default("");

export const topics = [
  "Love & relationships",
  "Career & direction",
  "Marriage & compatibility",
  "Family & wellbeing",
  "Money & stability",
  "A question of my own",
] as const;
export const timeWindows = [
  "Morning (9am–12pm)",
  "Afternoon (12pm–4pm)",
  "Evening (4pm–8pm)",
] as const;

export const inquirySchema = z
  .object({
    name: limited(100),
    email: z.email("Enter a valid email address.").max(254),
    whatsapp: z
      .string()
      .trim()
      .min(8, "Enter a WhatsApp number with country code.")
      .max(20)
      .regex(/^\+?[0-9][0-9\s().-]{7,19}$/, "Enter a valid WhatsApp number."),
    topic: z.enum(topics, { error: "Choose a consultation topic." }),
    birthDate: z.iso.date("Enter a valid birth date."),
    birthTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Enter a valid birth time."),
    birthTimeApproximate: z.boolean(),
    birthPlace: limited(120),
    preferredDate: z.iso.date("Choose a valid preferred date."),
    preferredWindow: z.enum(timeWindows, { error: "Choose a preferred time window." }),
    question: z.string().trim().max(1000, "Use 1,000 characters or fewer.").optional().default(""),
    consent: z.literal(true, { error: "Please agree to be contacted about your inquiry." }),
    website: z.string().max(200).optional().default(""),
    campaign: z
      .object({
        utm_source: optionalAttribution,
        utm_medium: optionalAttribution,
        utm_campaign: optionalAttribution,
        utm_content: optionalAttribution,
        utm_term: optionalAttribution,
        fbclid: optionalAttribution,
        gclid: optionalAttribution,
      })
      .optional()
      .default({
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_content: "",
        utm_term: "",
        fbclid: "",
        gclid: "",
      }),
  })
  .superRefine((value, context) => {
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    if (value.birthDate > today || value.birthDate < "1900-01-01")
      context.addIssue({
        code: "custom",
        path: ["birthDate"],
        message: "Enter a birth date between 1900 and today.",
      });
    if (value.preferredDate < today)
      context.addIssue({
        code: "custom",
        path: ["preferredDate"],
        message: "Choose today or a future date.",
      });
  });

export type Inquiry = z.infer<typeof inquirySchema>;
