import type { CSSProperties } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Clock,
  Gem,
  MessageSquareReply,
  Globe2,
  Zap,
} from "lucide-react";

import type { StatItem } from "@/types";
import statsData from "@/content/stats.json";
import { CountUp } from "@/components/common/stat-card";
import { Logo } from "@/components/common/logo";
import { RevealGroup } from "@/components/common/reveal-group";
import { BentoStoryButton } from "@/components/sections/bento-story-button";

const stats = statsData as StatItem[];

// No `backdrop-blur-md`: every card sits on the section's flat white /
// #04040A fill, so the frosted-glass pass had nothing to blur — it was a
// per-frame GPU readback while scrolling with no visible result.
const cardBaseClass =
  "group relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 " +
  "bg-white/80 dark:bg-white/[0.03] " +
  "border border-slate-200/90 dark:border-white/[0.08] " +
  "shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.4)] " +
  "hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(107,33,255,0.08)] dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_36px_rgba(107,33,255,0.2)] " +
  "hover:border-purple-300/80 dark:hover:border-purple-500/30 overflow-hidden flex flex-col justify-between";

/** Staggered entrance, consumed by `[data-reveal]` in globals.css. */
const reveal = (delayMs: number) =>
  ({ "--reveal-delay": `${delayMs}ms` }) as CSSProperties;

/**
 * A SERVER component.
 *
 * It was `"use client"` for nine framer-motion `whileInView` fades and one
 * `openModal()` call. The fades are now CSS (`RevealGroup` only flips a data
 * attribute), the modal trigger is the `BentoStoryButton` client leaf, and
 * `CountUp` was already its own client component — so the grid markup no
 * longer hydrates at all.
 */
export function BentoSection() {
  return (
    <section
      id="why-us"
      className="relative w-full pt-8 sm:pt-14 pb-20 sm:pb-28 bg-white dark:bg-[#04040A] text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden"
    >
      {/* Ambient background glow (gradient + soft mask, not a blur filter) */}
      <div
        aria-hidden="true"
        className="glow-soft pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[45rem] h-[25rem] bg-gradient-to-b from-purple-500/10 via-indigo-500/5 to-transparent opacity-70 dark:opacity-40"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="reveal-on-scroll text-center max-w-3xl mx-auto pb-6 sm:pb-12">

          {/* Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-slate-900 dark:text-white">
            Why{" "}
            <span className="italic text-[#7138FF] dark:text-[#8B4DFF]">
              Velex Infotech
            </span>
          </h2>

          {/* Subheading */}
          <p className="font-sans text-sm sm:text-base md:text-lg leading-relaxed mt-4 sm:mt-5 max-w-2xl mx-auto text-slate-600 dark:text-white/60">
            Not all agencies are created equal. We engineer intelligence — and
            back it with proof.
          </p>
        </div>

        {/* Bento Grid */}
        <RevealGroup className="grid auto-rows-[minmax(90px,auto)] sm:auto-rows-[minmax(120px,auto)] grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* 1. Featured Philosophy Quote (2 cols x 2 rows) */}
          <div
            data-reveal
            style={reveal(0)}
            className="group relative col-span-2 sm:row-span-2 p-4 sm:p-7 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 bg-[#070913] text-white border border-purple-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_16px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:border-purple-400/60 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_20px_50px_rgba(107,33,255,0.3)]"
          >
            {/* Cosmic Planet Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <Image
                src="https://res.cloudinary.com/d0grbozz/image/upload/v1789797044/cosmic-planet.png"
                alt="Velex Cosmos"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                className="object-cover object-right-bottom transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              {/* Contrast gradients for crystal-clear readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#070913]/90 via-[#070913]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070913]/70 via-transparent to-transparent" />
            </div>

            {/* Top row */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono text-[9px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-purple-200/80">
                OUR PHILOSOPHY
              </span>

              {/* VELEX Logo mark only */}
              <Logo href={null} showWordmark={false} />
            </div>

            {/* Quote body */}
            <blockquote className="relative z-10 my-auto py-1 sm:py-3.5">
              <p className="font-serif text-[19px] sm:text-[28px] lg:text-[32px] leading-[1.15] sm:leading-[1.2] font-normal text-white max-w-md">
                &ldquo;We don&apos;t just
                <br />
                build software.
                <br />
                We engineer
                <br />
                <span className="italic text-[#8B4DFF] drop-shadow-[0_0_24px_rgba(139,77,255,0.6)]">
                  intelligence.
                </span>
                &rdquo;
              </p>
              <footer className="mt-1.5 sm:mt-3">
                <p className="font-sans text-[9px] sm:text-sm text-slate-300/80 tracking-wide">
                  — The Velex Infotech philosophy
                </p>
              </footer>
            </blockquote>

            {/* Bottom Row */}
            <div className="relative z-10 flex items-end justify-between gap-4 pt-1 sm:pt-3">
              {/* Watch Our Story CTA */}
              <BentoStoryButton />

              {/* Ideas / Products / People / Progress */}
              <div className="flex flex-col items-start text-left shrink-0">
                <div className="font-mono text-[7px] sm:text-[10px] font-medium tracking-[0.22em] text-white/60 space-y-[1px] sm:space-y-0.5 uppercase">
                  <div>IDEAS</div>
                  <div>PRODUCTS</div>
                  <div>PEOPLE</div>
                  <div>PROGRESS</div>
                </div>
                <div className="w-4 sm:w-7 h-[1.5px] sm:h-[2px] bg-purple-400/90 rounded-full mt-1 sm:mt-2" />
              </div>
            </div>
          </div>

          {/* 2. Stat: 40+ Projects Delivered */}
          <div data-reveal style={reveal(100)} className={cardBaseClass + " col-span-1"}>
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <span className="font-mono text-[9px] sm:text-xs font-semibold tracking-wider text-slate-500 dark:text-white/50 uppercase">
                {stats[0]?.label ?? ""}
              </span>

            </div>
            <div>
              <span className="font-serif text-[32px] sm:text-5xl font-bold text-[#7138FF] dark:text-[#8B4DFF]">
                <CountUp value={stats[0]?.value ?? 0} suffix={stats[0]?.suffix ?? ""} />
              </span>
            </div>
          </div>

          {/* 3. Stat: 20+ Clients Served */}
          <div data-reveal style={reveal(200)} className={cardBaseClass + " col-span-1"}>
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <span className="font-mono text-[9px] sm:text-xs font-semibold tracking-wider text-slate-500 dark:text-white/50 uppercase">
                {stats[1]?.label ?? ""}
              </span>
            </div>
            <div>
              <span className="font-serif text-[32px] sm:text-5xl font-bold text-[#7138FF] dark:text-[#8B4DFF]">
                <CountUp value={stats[1]?.value ?? 0} suffix={stats[1]?.suffix ?? ""} />
              </span>
            </div>
          </div>

          {/* 4. Crystal Quality */}
          <div data-reveal style={reveal(250)} className={cardBaseClass + " col-span-1"}>
            <div className="size-8 sm:size-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-2 sm:mb-3">
              <Gem className="size-4 sm:size-5 text-amber-500 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-serif text-[15px] sm:text-lg font-bold text-slate-900 dark:text-white">
                Crystal Quality
              </h4>
              <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-slate-600 dark:text-white/70 leading-relaxed">
                Guaranteed on every build.
              </p>
            </div>
          </div>

          {/* 5. Timezone coverage: UK & US Overlap */}
          <div data-reveal style={reveal(300)} className={cardBaseClass + " col-span-1"}>
            <div className="size-8 sm:size-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2 sm:mb-3">
              <Clock className="size-4 sm:size-5" />
            </div>
            <div>
              <h4 className="font-serif text-[15px] sm:text-lg font-bold text-slate-900 dark:text-white">
                UK &amp; US overlap
              </h4>
              <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-slate-600 dark:text-white/70 leading-relaxed">
                Live hours with London, New York and Toronto.
              </p>
            </div>
          </div>

          {/* 6. Stat: 4 Markets Served */}
          <div data-reveal style={reveal(350)} className={cardBaseClass + " col-span-1"}>
            <div className="size-8 sm:size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-2 sm:mb-3">
              <Globe2 className="size-4 sm:size-5 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <span className="font-mono text-[9px] sm:text-xs font-semibold tracking-wider text-slate-500 dark:text-white/50 uppercase">
                {stats[2]?.label ?? ""}
              </span>

            </div>
            <div>
              <span className="font-serif text-[32px] sm:text-5xl font-bold text-[#7138FF] dark:text-[#8B4DFF]">
                <CountUp value={stats[2]?.value ?? 0} suffix={stats[2]?.suffix ?? ""} />
              </span>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-white/50 mt-0.5 sm:mt-1.5">
                Global delivery presence.
              </p>
            </div>
          </div>

          {/* 7. Stat: 1 Day Reply Time */}
          <div data-reveal style={reveal(400)} className={cardBaseClass + " col-span-1"}>
            <div className="size-8 sm:size-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mb-2 sm:mb-3">
              <Zap className="size-4 sm:size-5 text-red-500 dark:text-red-400" />
            </div>
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <span className="font-mono text-[9px] sm:text-xs font-semibold tracking-wider text-slate-500 dark:text-white/50 uppercase">
                {stats[3]?.label ?? ""}
              </span>

            </div>
            <div>
              <span className="font-serif text-[32px] sm:text-5xl font-bold text-[#7138FF] dark:text-[#8B4DFF]">
                <CountUp value={stats[3]?.value ?? 0} suffix={stats[3]?.suffix ?? ""} />
              </span>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-white/50 mt-0.5 sm:mt-1.5">
                Average initial response.
              </p>
            </div>
          </div>

          {/* 8. SLA / Security: Enterprise-grade */}
          <div data-reveal style={reveal(450)} className={cardBaseClass + " hidden sm:flex"}>
            <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                Enterprise-grade
              </h4>
              <p className="mt-1 text-xs text-slate-600 dark:text-white/70 leading-relaxed">
                Secure, compliant, reliable.
              </p>
            </div>
          </div>

          {/* 9. Response Commitment: 1 business day */}
          <div data-reveal style={reveal(500)} className={cardBaseClass + " hidden sm:flex"}>
            <div className="size-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-3">
              <MessageSquareReply className="size-5 text-amber-500 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                1 business day
              </h4>
              <p className="mt-1 text-xs text-slate-600 dark:text-white/70 leading-relaxed">
                Every enquiry answered by a person.
              </p>
            </div>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
