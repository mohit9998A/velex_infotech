"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { HeroServiceShowcase } from "@/components/hero/hero-service-showcase";
import { ScrollIndicator } from "@/components/common/scroll-indicator";
import { TrustPanel } from "@/components/sections/trust-bar";
import {
  HERO_SERVICES,
  DEFAULT_HERO_HEADLINE,
  DEFAULT_HERO_LEDE,
  DEFAULT_HERO_SHORT_LEDE,
  DEFAULT_HERO_EYEBROW,
} from "@/config/service-showcase";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(null);

  const currentService =
    activeServiceIndex !== null ? (HERO_SERVICES[activeServiceIndex] ?? null) : null;
  const currentHeadline = currentService ? currentService.headline : DEFAULT_HERO_HEADLINE;
  const currentLede = currentService ? currentService.dialogue : DEFAULT_HERO_LEDE;
  const currentShortLede = currentService?.shortDialogue ?? DEFAULT_HERO_SHORT_LEDE;

  return (
    // `svh`, not `dvh`: svh is stable during mobile address bar appearance
    <section
      suppressHydrationWarning
      className="relative flex min-h-svh w-full flex-col justify-between overflow-hidden pt-16 sm:pt-20 pb-4 sm:pb-6 md:pt-[clamp(5.5rem,8.5svh,6.8rem)] md:pb-[clamp(2.5rem,7svh,4.5rem)]"
    >
      {/* Readability + ambient gradients */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-void via-void/49 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-void via-transparent to-void/28 pointer-events-none" />
      <div className="pointer-events-none absolute -left-40 top-1/3 z-[1] size-[36rem] glow-blob" />

      {/* Main Content Container */}
      <div
        suppressHydrationWarning
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 flex-1 flex flex-col justify-between"
      >
        {/* Two-Column Grid: Copy on Left, Interactive Robot Showcase on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-center flex-1 my-auto pt-1 pb-3 md:py-0">
          {/* Left Column: Eyebrow, Headline, Lede, Stepper, CTAs */}
          <div className="md:col-span-6 lg:col-span-6 xl:col-span-6 z-10 flex flex-col justify-center">
            {/* Eyebrow / Kicker */}
            <div
              className="hero-fade mb-1.5 sm:mb-[clamp(0.85rem,2.4svh,1.75rem)] flex items-center gap-2.5 sm:gap-3"
              style={{ "--i": 0 } as CSSProperties}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-[2px] sm:h-[2.5px] rounded-full transition-all duration-300",
                  currentService
                    ? "w-6 sm:w-7 bg-[#7138FF] dark:bg-[#8B4DFF] animate-pulse"
                    : "w-5 sm:w-7 bg-[#7138FF] dark:bg-[#8B4DFF]"
                )}
              />
              {currentService ? (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-mono text-[9.5px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded bg-[#7138FF]/15 text-[#7138FF] dark:text-[#A855F7] border border-[#7138FF]/20">
                    {currentService.number} / 06
                  </span>
                  <span className="font-sans text-[10.5px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#7138FF] dark:text-[#8B4DFF]">
                    {currentService.tagline}
                  </span>
                </div>
              ) : (
                <span className="font-sans text-[10.5px] sm:text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
                  {DEFAULT_HERO_EYEBROW}
                </span>
              )}
            </div>

            {/* Headline H1 with responsive spans and stable min-height to eliminate CLS */}
            <div className="min-h-[58px] sm:min-h-[110px] md:min-h-[175px] lg:min-h-[205px] flex flex-col justify-center">
              <h1
                key={activeServiceIndex ?? "default"}
                aria-live="polite"
                className="animate-hero-swap"
              >
                {/* Mobile Headline (< md): Proportional scale fitting perfectly in 2-3 clean lines */}
                <span className="block md:hidden font-heading text-[clamp(1.55rem,6.8vw,2.25rem)] font-bold tracking-tight text-primary leading-[1.08]">
                  <span className="block">{currentHeadline.line1}</span>
                  <span className="block">{currentHeadline.line2}</span>
                  <span className="block text-[#7138FF] dark:text-[#8B4DFF]">
                    {currentHeadline.highlight}
                  </span>
                </span>

                {/* Desktop Headline (>= md) */}
                <span className="hidden md:block font-heading text-[clamp(2.35rem,4.8vw,4.1rem)] font-bold tracking-tight text-primary leading-[1.08]">
                  <span className="block overflow-hidden py-0.5">
                    <span className="inline-block">{currentHeadline.line1}</span>
                  </span>
                  <span className="block overflow-hidden py-0.5">
                    <span className="inline-block">{currentHeadline.line2}</span>
                  </span>
                  <span className="block overflow-hidden py-0.5">
                    <span className="inline-block text-[#7138FF] dark:text-[#8B4DFF]">
                      {currentHeadline.highlight}
                    </span>
                  </span>
                </span>
              </h1>
            </div>

            {/* Subheadline / Lede paragraph with responsive density */}
            <div className="min-h-[36px] sm:min-h-[72px] mt-1.5 sm:mt-3 max-w-[340px] sm:max-w-xl flex items-start">
              {/* Mobile: 1-sentence punchline (reduces lengthy paragraph copy) */}
              <p
                key={activeServiceIndex !== null ? `m-${activeServiceIndex}` : "m-default"}
                className="block sm:hidden animate-hero-swap text-[12.5px] text-secondary leading-snug font-normal line-clamp-2"
              >
                {currentShortLede}
              </p>
              {/* Desktop: Full descriptive lede */}
              <p
                key={activeServiceIndex !== null ? `d-${activeServiceIndex}` : "d-default"}
                className="hidden sm:block animate-hero-swap text-base md:text-xl text-secondary leading-[1.55] font-normal"
              >
                {currentLede}
              </p>
            </div>

            {/* Interactive Service Dots / Stepper */}
            <div className="mt-2.5 sm:mt-4 flex items-center justify-between sm:justify-start gap-2">
              <div className="flex items-center gap-1.5">
                <div
                  className="flex items-center gap-1.5 p-1 rounded-full bg-slate-100/90 dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/10 backdrop-blur-sm"
                  role="tablist"
                  aria-label="Highlighted services"
                >
                  {HERO_SERVICES.map((item, idx) => {
                    const isSelected = activeServiceIndex === idx;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        aria-label={`Show ${item.title}`}
                        onClick={() => setActiveServiceIndex(idx)}
                        className={cn(
                          "h-1.5 sm:h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
                          isSelected
                            ? "w-5 sm:w-6 bg-[#7138FF] dark:bg-[#A855F7]"
                            : "w-1.5 sm:w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40"
                        )}
                      />
                    );
                  })}
                </div>

                {activeServiceIndex !== null && (
                  <button
                    type="button"
                    onClick={() => setActiveServiceIndex(null)}
                    className="text-[10.5px] sm:text-[11px] font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors ml-1 px-2 py-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10"
                    title="Reset to default overview"
                  >
                    ✕ Reset
                  </button>
                )}
              </div>

              {/* Subtle mobile status indicator */}
              <span className="sm:hidden text-[11px] font-medium text-purple-600/90 dark:text-purple-300/90 flex items-center gap-1.5 pr-1">
                <span className="size-1.5 rounded-full bg-[#7138FF] animate-pulse" />
                {currentService ? currentService.shortTitle : "Interactive Orbit"}
              </span>
            </div>

            {/* CTA Buttons: Compact side-by-side row on mobile for high conversion and zero wasted vertical space */}
            <ConsultButtons
              className="flex-row items-center gap-2 sm:gap-4 w-full sm:w-fit mt-3 sm:mt-5"
              presetService={currentService?.leadPresetService}
              primaryLabel="Book Consultation"
              primaryVariant="blue"
              primaryClassName="relative before:absolute before:-inset-1 before:content-[''] h-9 sm:h-12 px-3 sm:px-8 text-[12px] sm:text-base font-semibold bg-[#7138FF] hover:bg-[#6228EE] text-white shadow-[0_4px_14px_rgba(113,56,255,0.32)] sm:shadow-[0_6px_20px_rgba(113,56,255,0.38)] hover:shadow-[0_10px_28px_rgba(113,56,255,0.55)] rounded-full flex-1 sm:flex-initial text-center justify-center whitespace-nowrap"
              primaryIcon={
                <ArrowRight className="size-3.5 sm:size-4 ml-1 transition-transform group-hover:translate-x-0.5" />
              }
              secondary={
                <Button
                  size="lg"
                  variant="outline"
                  className="relative before:absolute before:-inset-1 before:content-[''] h-9 sm:h-12 px-3 sm:px-8 text-[12px] sm:text-base font-semibold rounded-full border border-slate-200/90 dark:border-white/15 bg-white dark:bg-white/[0.04] text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/[0.08] shadow-sm flex-1 sm:flex-initial text-center justify-center whitespace-nowrap"
                  asChild
                >
                  <Link href={currentService ? currentService.href : "#portfolio"}>
                    <span className="truncate">
                      {currentService ? `Explore ${currentService.shortTitle}` : "See Work"}
                    </span>
                    {currentService && (
                      <ArrowRight className="size-3 sm:size-3.5 ml-1 transition-transform group-hover:translate-x-0.5 shrink-0" />
                    )}
                  </Link>
                </Button>
              }
            />
          </div>

          {/* Right Column: Interactive AI Robot Service Showcase (Properly sized and scaled) */}
          <div className="md:col-span-6 lg:col-span-6 xl:col-span-6 relative z-10 w-full flex items-center justify-center h-[340px] sm:h-[420px] md:h-full min-h-[320px] sm:min-h-[400px] md:min-h-[560px] lg:min-h-[620px]">
            <HeroServiceShowcase
              className="w-full h-full"
              activeServiceIndex={activeServiceIndex}
              onActiveServiceChange={setActiveServiceIndex}
            />
          </div>
        </div>

        {/* Trust panel: stats, markets and client brands */}
        <TrustPanel
          className="hero-fade mt-4 md:mt-[clamp(1.2rem,3.2svh,2.2rem)]"
          style={{ "--i": 2 } as CSSProperties}
        />
      </div>

      <ScrollIndicator />
    </section>
  );
}
