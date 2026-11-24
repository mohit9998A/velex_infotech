"use client";

import { Play } from "lucide-react";

import { useLeadModal } from "@/lib/store/lead-modal";
import { prefetchLeadForm } from "@/components/forms/lead-form-modal";

/**
 * The bento's "Watch Our Story" CTA — the only part of that section that needs
 * client JavaScript, split out so the rest of the grid stays a Server
 * Component.
 */
export function BentoStoryButton() {
  const openModal = useLeadModal((s) => s.openModal);

  return (
    <button
      type="button"
      onClick={() => openModal()}
      onPointerEnter={prefetchLeadForm}
      aria-haspopup="dialog"
      aria-label="Start a consultation: Watch our story"
      className="group/story inline-flex items-center gap-1.5 sm:gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-full"
    >
      <span className="size-7 sm:size-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover/story:scale-110 group-hover/story:bg-white/20 group-hover/story:border-white/60 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <Play className="size-2.5 sm:size-3.5 fill-white text-white translate-x-0.5" aria-hidden="true" />
      </span>
      <span className="font-sans text-[9px] sm:text-sm font-medium text-white/90 border-b border-white/40 pb-0.5 transition-colors group-hover/story:border-white group-hover/story:text-white">
        Watch Our Story
      </span>
    </button>
  );
}
