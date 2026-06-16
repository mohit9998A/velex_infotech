import { z } from "zod";

export const SERVICE_OPTIONS = [
  "AI Automation",
  "Agentic AI",
  "Voice Agent",
  "Website Development",
  "WhatsApp AI Chatbot",
  "App Development",
  "AI Integration",
  "Other",
] as const;

export const BUDGET_OPTIONS = [
  "₹25K – ₹1L",
  "₹1L – ₹5L",
  "₹5L – ₹15L",
  "₹15L+",
  "Not sure yet",
] as const;

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
  phone: z
    .string()
    .trim()
    .min(10, "Phone number is too short (minimum 10 digits).")
    .max(20, "Phone number is too long.")
    .regex(/^\+?[\d\s-]{10,20}$/, "Please enter a valid phone number (digits, spaces, and dashes only)."),
  company: z.string().trim().max(120, "Company name is too long.").optional().or(z.literal("")),
  service: z.enum(SERVICE_OPTIONS, {
    message: "Please select a service from the list.",
  }),
  budget: z.enum(BUDGET_OPTIONS, {
    message: "Please select a budget range.",
  }),
  message: z.string().trim().max(2000, "Message is too long (maximum 2000 characters).").optional().or(z.literal("")),
  source: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
