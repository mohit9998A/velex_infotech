"use client";

import { ArrowUpRight, CheckCircle2, Lock, Sparkles } from "lucide-react";

import type { PortfolioItem } from "@/types";
import { PortfolioPreview } from "@/components/common/portfolio-preview";

export function PortfolioCard({
  item,
  isLive,
  onActivate,
  onDeactivate,
  index = 0,
  total = 4,
}: {
  item: PortfolioItem;
  isLive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  index?: number;
  total?: number;
}) {
  const isLink = Boolean(item.external && item.href);

  return (
    <article className="group relative">
      {/* Top Progress & Client Header: 01 / 04 · Client | Progress Dash Track */}
      <div className="flex items-center justify-between gap-4 mb-1.5 sm:mb-2.5 font-mono text-[11px] sm:text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[#7138FF] dark:text-[#8B4DFF] font-bold">
            0{index + 1}
          </span>
          <span className="text-slate-400 dark:text-white/40">/</span>
          <span className="text-slate-400 dark:text-white/40">0{total}</span>
          <span className="text-slate-300 dark:text-white/20">&bull;</span>
          <span className="font-sans font-semibold text-slate-900 dark:text-white">
            {item.client}
          </span>
        </div>

        {/* Progress bar pill track */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === index
                  ? "w-7 sm:w-8 bg-[#7138FF] dark:bg-[#8B4DFF]"
                  : "w-3 bg-slate-200 dark:bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Title & Metadata Row: Title on Left | Year & View Project Stacked on Right */}
      <div className="flex items-start justify-between gap-4 mb-3 sm:mb-6">
        <h3 className="font-serif text-xl sm:text-3xl lg:text-[32px] font-medium tracking-tight leading-tight text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-[#7138FF] dark:group-hover:text-[#8B4DFF] max-w-2xl">
          {item.title}
        </h3>

        {/* Right Meta: Year + Link */}
        <div className="flex flex-col items-end shrink-0 font-mono text-[11px] sm:text-sm">
          <span className="text-slate-400 dark:text-white/40">2026</span>
          {isLink ? (
            <a
              href={item.href!}
              target="_blank"
              rel="noopener noreferrer"
              onFocus={onActivate}
              onBlur={onDeactivate}
              className="inline-flex items-center gap-1 font-semibold text-slate-900 dark:text-white hover:text-[#7138FF] dark:hover:text-[#8B4DFF] transition-colors group/link mt-0.5"
            >
              <span>View project</span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 text-slate-400 dark:text-white/40 mt-0.5">
              <Lock className="size-3" /> Under NDA
            </span>
          )}
        </div>
      </div>

      {/* Dual Showcase Canvas: Browser Preview (8 Cols) | Details Card (4 Cols) */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-6 items-stretch"
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
      >
        {/* Main Media Canvas (8 Cols / Left Side) */}
        {isLink ? (
          <a
            href={item.href!}
            target="_blank"
            rel="noopener noreferrer"
            title={`Open ${item.title} in a new tab`}
            className="group/media lg:col-span-8 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-slate-950 text-white shadow-xl relative transition-all duration-500 hover:border-purple-400/80 dark:hover:border-purple-500/50 block cursor-pointer"
          >
            <PortfolioPreview item={item} isLive={isLive} />
          </a>
        ) : (
          <div className="group/media lg:col-span-8 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-slate-950 text-white shadow-xl relative transition-all duration-500 hover:border-purple-400/80 dark:hover:border-purple-500/50">
            <PortfolioPreview item={item} isLive={isLive} />
          </div>
        )}

        {/* Outcome & Details Card (4 Cols / Right Side) */}
        <div className="lg:col-span-4 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/[0.08] bg-white/95 dark:bg-white/[0.03] backdrop-blur-md p-3.5 sm:p-7 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="space-y-2.5 sm:space-y-5">
            {/* Category & Segment Clean Meta */}
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs">
              <span className="font-semibold text-[#7138FF] dark:text-[#8B4DFF] uppercase tracking-wider">
                {item.category}
              </span>
              <span className="text-slate-300 dark:text-white/20">&bull;</span>
              <span className="font-medium text-slate-500 dark:text-white/50 uppercase tracking-wider">
                {item.segment}
              </span>
            </div>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-slate-700 dark:text-white/80 leading-relaxed line-clamp-2 sm:line-clamp-none">
              {item.description}
            </p>

            {/* Key Outcome Quote with Left Accent Bar */}
            <div className="border-l-2 border-[#7138FF] dark:border-[#8B4DFF] pl-2.5 sm:pl-3.5 py-0.5 space-y-0.5 sm:space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/40 block">
                Key Outcome
              </span>
              <p className="font-serif text-xs sm:text-lg font-medium text-slate-900 dark:text-white italic leading-snug">
                &ldquo;{item.result}&rdquo;
              </p>
            </div>

            {/* Deliverable Highlights */}
            {item.highlights && item.highlights.length > 0 && (
              <div className="pt-0.5 sm:pt-2 space-y-1 sm:space-y-2">
                <span className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/40 block">
                  Core Deliverables
                </span>
                <ul className="space-y-1 sm:space-y-1.5">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-600 dark:text-white/70 leading-snug">
                      <CheckCircle2 className="size-3 sm:size-3.5 text-[#7138FF] dark:text-[#8B4DFF] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack - Pills */}
            {item.techStack && item.techStack.length > 0 && (
              <div className="pt-0.5 sm:pt-2 space-y-1 sm:space-y-1.5">
                <span className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/40 block">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/80 border border-slate-200/60 dark:border-white/10 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-3.5 sm:mt-6 pt-1 sm:pt-2">
            {isLink ? (
              <a
                href={item.href!}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 sm:py-3.5 px-4 rounded-full bg-[#7138FF] hover:bg-[#5E2AE2] text-white font-mono text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(113,56,255,0.3)] transition-all duration-300 hover:shadow-[0_6px_24px_rgba(113,56,255,0.45)] active:scale-[0.99]"
              >
                <span>Launch site</span>
                <ArrowUpRight className="size-3.5 sm:size-4" />
              </a>
            ) : (
              <div className="w-full py-2.5 sm:py-3.5 px-4 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/40 font-mono text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 border border-slate-200/60 dark:border-white/10">
                <Lock className="size-3.5 sm:size-4" />
                <span>NDA Protected</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
