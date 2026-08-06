import { z } from "zod";

/**
 * Must byte-match the `title` of every entry in content/services.json.
 *
 * app/services/[slug]/page.tsx passes `presetService={service.title}` into a
 * `SERVICE_OPTIONS.find(s => s === defaultService)` in the lead form. A
 * one-character drift makes the preselect silently do nothing — no error, no
 * warning. `npm run verify:content` checks this.
 */
export const SERVICE_OPTIONS = [
  "AI Automation",
  "AI Agent Development",
  "AI Receptionist",
  "WhatsApp AI Chatbot",
  "AI Integration",
  "Software Development",
  "Website Development",
  "App Development",
  "Data Analytics",
  "Other",
] as const;

export const CURRENCIES = ["INR", "USD", "GBP", "CAD"] as const;
export type Currency = (typeof CURRENCIES)[number];

/**
 * Budget bands, keyed by a stable id rather than a display string.
 *
 * This used to be a zod enum of INR labels ("₹1L – ₹5L"), which meant the wire
 * format *was* the localised label: changing the wording, or adding a second
 * currency, would have been a schema migration. It also showed rupee ranges to
 * every US, UK and Canadian visitor, which is a real conversion problem on a
 * form about to receive international traffic.
 *
 * Now the enum is on ids and labels are pure presentation, so they can change
 * freely forever. Blast radius of doing this today is zero — leads go to an
 * inbox, there is no CRM yet. It gets expensive later.
 */
export const BUDGET_BANDS = [
  { id: "band-1", INR: "₹25K – ₹1L", USD: "$300 – $1,200", GBP: "£250 – £950", CAD: "C$400 – C$1,600" },
  { id: "band-2", INR: "₹1L – ₹5L", USD: "$1,200 – $6,000", GBP: "£950 – £4,800", CAD: "C$1,600 – C$8,000" },
  { id: "band-3", INR: "₹5L – ₹15L", USD: "$6,000 – $18,000", GBP: "£4,800 – £14,000", CAD: "C$8,000 – C$24,000" },
  { id: "band-4", INR: "₹15L+", USD: "$18,000+", GBP: "£14,000+", CAD: "C$24,000+" },
  { id: "unsure", INR: "Not sure yet", USD: "Not sure yet", GBP: "Not sure yet", CAD: "Not sure yet" },
] as const;

export const BUDGET_OPTIONS = BUDGET_BANDS.map((b) => b.id) as unknown as [
  string,
  ...string[],
];

/** Human-readable budget for the notification email, currency included. */
export function formatBudget(bandId: string, currency: Currency): string {
  const band = BUDGET_BANDS.find((b) => b.id === bandId);
  if (!band) return bandId;
  if (band.id === "unsure") return "Not sure yet";
  return `${currency} ${band[currency]}`;
}

export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter a valid name (at least 2 characters).")
    .max(80, "Name is too long.")
    .regex(/^[a-zA-Z\s.\-']+$/, "Name can only contain letters, spaces, hyphens, and apostrophes."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address."),
  // Allows parentheses and dots, and — critically — a LEADING parenthesis.
  // The previous pattern, /^\+?[\d\s-]{10,20}$/, rejected "(555) 123-4567" and
  // "+1 (555) 123-4567": the two most common US and Canadian formats, on the
  // form we are about to point US traffic at.
  //
  // Shape is checked loosely; the digit count is what actually matters, so it
  // is asserted separately rather than encoded as a length range over a string
  // whose separators vary by country.
  phone: z
    .string()
    .trim()
    .max(24, "Phone number is too long.")
    .regex(/^[+(\d][\d\s().-]*$/, "Please enter a valid phone number.")
    .refine((v) => v.replace(/\D/g, "").length >= 10, {
      message: "Phone number is too short (minimum 10 digits).",
    }),
  company: z.string().trim().max(120, "Company name is too long.").optional().or(z.literal("")),
  service: z.enum(SERVICE_OPTIONS, {
    message: "Please select a service from the list.",
  }),
  budget: z.enum(BUDGET_OPTIONS, {
    message: "Please select a budget range.",
  }),
  // Required rather than `.default("INR")`: a zod default makes the schema's
  // input and output types diverge, which breaks zodResolver's typing in
  // react-hook-form. The form always supplies this, so required is both
  // simpler and stricter.
  currency: z.enum(CURRENCIES),
  message: z.string().trim().max(2000, "Message is too long (maximum 2000 characters).").optional().or(z.literal("")),
  source: z.string().optional(),
  // Honeypot. Real users never see this field, so anything in it is a bot.
  // Named innocuously because scrapers skip fields called "honeypot".
  //
  // Deliberately NOT `.max(0)`: that fails validation and returns a 422 whose
  // error message names the field, which tells a bot author exactly which
  // input to leave alone next time. The route accepts the submission with a
  // 200 and quietly discards it instead.
  website: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
