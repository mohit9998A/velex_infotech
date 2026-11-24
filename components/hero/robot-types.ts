import type { ServiceShowcaseItem } from "@/config/service-showcase";

export type InteractionMode = "idle" | "cursor" | "auto-discovery" | "manual-inspect";

export interface RobotTarget {
  /** Normalized -1 to 1 coordinates for 3D rotation */
  normalizedX: number;
  normalizedY: number;
  /** Screen clientX and clientY for pointer events */
  screenX: number;
  screenY: number;
  /** Distance or weight */
  intensity: number;
}

export interface ShowcaseState {
  activeServiceIndex: number | null;
  activeService: ServiceShowcaseItem | null;
  interactionMode: InteractionMode;
  isPaused: boolean;
  isSpeaking: boolean;
  targetPos: RobotTarget;
  isHovered: boolean;
}
