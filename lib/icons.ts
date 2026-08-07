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
