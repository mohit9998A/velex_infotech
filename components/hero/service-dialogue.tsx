"use client";

import { memo } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import type { ServiceShowcaseItem } from "@/config/service-showcase";
import { ServiceIcon } from "@/components/hero/service-icons";
import { cn } from "@/lib/utils";

interface ServiceDialogueProps {
  service: ServiceShowcaseItem | null;
  isVisible: boolean;
  isSpeaking: boolean;
  totalServices: number;
  currentIndex: number;
  onClose?: () => void;
  className?: string;
}

export const ServiceDialogue = memo(function ServiceDialogue({
  service,
  isVisible,
  isSpeaking,
  totalServices,
  currentIndex,
  onClose,
  className,
}: ServiceDialogueProps) {
  if (!service) return null;

  return (
    <div
      role="region"
      aria-label="AI Assistant Service Introduction"
      aria-live="polite"
      className={cn(
        "transition-all duration-400 ease-out z-30 pointer-events-auto",
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 -translate-y-2 scale-95 pointer-events-none",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-xl p-3 sm:p-3.5",
          "backdrop-blur-xl bg-white/92 dark:bg-[#120B24]/92",
          "border border-purple-500/30 dark:border-purple-400/35",
          "shadow-[0_8px_30px_rgba(113,56,255,0.16)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.65)]",
          "w-full max-w-[260px] sm:max-w-[285px]"
        )}
      >
        {/* Subtle top purple gradient rim light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#7138FF] dark:via-[#A855F7] to-transparent opacity-80"
        />

        {/* Header: Service number, title, and speaking indicator */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            {/* Compact Service Icon Badge */}
            <div className="flex items-center justify-center size-6.5 shrink-0 rounded-md bg-[#7138FF]/10 dark:bg-[#7138FF]/20 text-[#7138FF] dark:text-[#A855F7] border border-[#7138FF]/20">
              <ServiceIcon name={service.iconName} className="size-3.5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-mono text-[9px] font-bold text-[#7138FF] dark:text-[#A855F7] uppercase tracking-wider">
                  {service.number} / 0{totalServices}
                </span>
                <span className="inline-block size-0.5 rounded-full bg-purple-400" />
                <span className="text-[9px] text-muted-foreground uppercase tracking-tight truncate">
                  {service.tagline}
                </span>
              </div>
              <h3 className="font-heading text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-tight truncate">
                {service.title}
              </h3>
            </div>
          </div>

          {/* Speaking Audio Wave Indicator */}
          <div className="flex items-center gap-1 shrink-0">
            <div
              className="flex items-end gap-[1.5px] h-3 px-1 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-400/15"
              title={isSpeaking ? "AI Assistant Presenting" : "Paused"}
            >
              <span
                className={cn(
                  "w-[2px] rounded-full bg-[#7138FF] dark:bg-[#A855F7] transition-all",
                  isSpeaking ? "h-2.5 animate-pulse" : "h-1"
                )}
              />
              <span
                className={cn(
                  "w-[2px] rounded-full bg-[#7138FF] dark:bg-[#A855F7] transition-all",
                  isSpeaking ? "h-1.5 animate-pulse delay-75" : "h-1"
                )}
              />
              <span
                className={cn(
                  "w-[2px] rounded-full bg-[#7138FF] dark:bg-[#A855F7] transition-all",
                  isSpeaking ? "h-2.5 animate-pulse delay-150" : "h-1"
                )}
              />
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Dismiss message"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5 rounded"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
        </div>

        {/* Dialogue Body (compact, crisp typography) */}
        <p className="text-[11px] sm:text-[11.5px] leading-relaxed text-slate-700 dark:text-slate-300 font-normal mb-2.5">
          &ldquo;{service.dialogue}&rdquo;
        </p>

        {/* Footer: Explore Service link and mini step dots */}
        <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/60 dark:border-white/10">
          <Link
            href={service.href}
            className="group/link inline-flex items-center gap-1 text-[11px] font-semibold text-[#7138FF] dark:text-[#A855F7] hover:text-[#5B21B6] dark:hover:text-white transition-colors"
          >
            <span>Explore Service</span>
            <ArrowRight className="size-3 transition-transform group-hover/link:translate-x-0.5" />
          </Link>

          {/* Mini step dots */}
          <div className="flex items-center gap-1" aria-hidden="true">
            {Array.from({ length: totalServices }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === currentIndex
                    ? "w-3 bg-[#7138FF] dark:bg-[#A855F7]"
                    : "w-1 bg-slate-300 dark:bg-white/25"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
