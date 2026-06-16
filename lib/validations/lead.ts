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
  name: z.string().min(2, "Please enter your full name.").max(80),
  email: z.string().email("Enter a valid email address."),
  phone: z
    .string()
    .min(8, "Enter a valid phone number.")
    .max(20)
    .regex(/^[+\d][\d\s-]{6,}$/, "Enter a valid phone number."),
  company: z.string().max(120).optional().or(z.literal("")),
  service: z.enum(SERVICE_OPTIONS, {
    message: "Select a service.",
  }),
  budget: z.enum(BUDGET_OPTIONS, {
    message: "Select a budget range.",
  }),
  message: z.string().max(2000).optional().or(z.literal("")),
  source: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
