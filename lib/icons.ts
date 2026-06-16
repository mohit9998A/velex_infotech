import {
  Workflow,
  BrainCircuit,
  AudioLines,
  MessagesSquare,
  Globe,
  Smartphone,
  Plug,
  type LucideIcon,
} from "lucide-react";

/** Maps the `icon` string in content/services.json to a Lucide component. */
export const serviceIconMap: Record<string, LucideIcon> = {
  Workflow,
  BrainCircuit,
  AudioLines,
  MessagesSquare,
  Globe,
  Smartphone,
  Plug,
};

export function getServiceIcon(name: string): LucideIcon {
  return serviceIconMap[name] ?? Workflow;
}
