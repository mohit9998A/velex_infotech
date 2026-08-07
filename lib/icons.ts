import {
  Workflow,
  BrainCircuit,
  AudioLines,
  MessagesSquare,
  Globe,
  Smartphone,
  Plug,
  BarChart3,
  Code2,
  Compass,
  HeartPulse,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps the `icon` string in content/services.json to a Lucide component.
 *
 * Every service's icon must appear here AND in the import above. Miss either
 * and `getServiceIcon` silently returns `Workflow` — no error, no warning, no
 * build failure, just the wrong icon shipped to production. `npm run
 * verify:content` checks this.
 */
export const serviceIconMap: Record<string, LucideIcon> = {
  Workflow,
  BrainCircuit,
  AudioLines,
  MessagesSquare,
  Globe,
  Smartphone,
  Plug,
  BarChart3,
  Code2,
  Compass,
  HeartPulse,
};

export function getServiceIcon(name: string): LucideIcon {
  return serviceIconMap[name] ?? Workflow;
}

/**
 * Service TITLE -> icon, for surfaces that only have the title to go on.
 *
 * The lead form's service picker is one: it renders SERVICE_OPTIONS from
 * lib/validations/lead.ts, which is a list of titles with no slug and no icon
 * field. Importing content/services.json to look the icon up would pull 39 KB
 * of overview copy, benefits and FAQ answers into both the modal chunk and
 * /contact, for eleven icon names.
 *
 * Values must agree with the `icon` field of the matching entry in
 * services.json. "Other" has no service entry — it is the escape hatch in
 * SERVICE_OPTIONS, so it gets its own icon here.
 *
 * `npm run verify:content` fails if a SERVICE_OPTIONS entry is missing a key.
 */
export const serviceTitleIconMap: Record<string, LucideIcon> = {
  "AI Automation": Workflow,
  "AI Agent Development": BrainCircuit,
  "AI Consulting": Compass,
  "AI Receptionist": AudioLines,
  "WhatsApp AI Chatbot": MessagesSquare,
  "AI Integration": Plug,
  "Software Development": Code2,
  "Website Development": Globe,
  "App Development": Smartphone,
  "Data Analytics": BarChart3,
  Other: Sparkles,
};

export function getServiceIconByTitle(title: string): LucideIcon {
  return serviceTitleIconMap[title] ?? Workflow;
}
