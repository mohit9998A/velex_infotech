"use client";

import { ArrowUpRight, CheckCircle2, Lock, Sparkles } from "lucide-react";

import type { PortfolioItem } from "@/types";
import { PortfolioPreview } from "@/components/common/portfolio-preview";

export function PortfolioCard({
  item,
  isLive,
  onActivate,
  onDeactivate,
}: {
  item: PortfolioItem;
  isLive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const isLink = Boolean(item.external && item.href);

  return (
    <article className="group relative">
      {/* Konpo Top Info Row: Client Name | Large Editorial Title | Year & View Link */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 mb-5 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5">
          
          {/* Main Title */}
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-medium tracking-tight leading-tight text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-300">
            {item.title}
          </h3>
        </div>

        {/* Right Meta: Year + Link */}
        <div className="flex items-center gap-4 shrink-0 font-mono text-xs sm:text-sm">
          <span className="text-slate-400 dark:text-white/40">2026</span>
          {isLink ? (
            <a
              href={item.href!}
              target="_blank"
              rel="noopener noreferrer"
              onFocus={onActivate}
              onBlur={onDeactivate}
              className="inline-flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors group/link"
            >
              <span>View project</span>
              <ArrowUpRight className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-slate-400 dark:text-white/40">
              <Lock className="size-3.5" /> Under NDA
            </span>
          )}
        </div>
      </div>

      {/* Konpo Dual Showcase Canvas */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch"
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
      >
        {/* Main Media Canvas (8 Cols / Left Side) */}
        <div className="lg:col-span-8 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-slate-950 text-white shadow-xl group/media relative transition-all duration-500 hover:border-purple-400/80 dark:hover:border-purple-500/50">
          <PortfolioPreview item={item} isLive={isLive} />
        </div>

        {/* Outcome & Details Card (4 Cols / Right Side) */}
        <div className="lg:col-span-4 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/[0.08] bg-white/90 dark:bg-white/[0.03] backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="space-y-4">
            {/* Category & Segment Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-purple-500/10 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                {item.category}
              </span>
              <span className="px-3 py-1 rounded-full font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/60">
                {item.segment}
              </span>
            </div>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed">
              {item.description}
            </p>

            {/* Result Callout Quote */}
            <div className="pt-3.5 border-t border-slate-200/80 dark:border-white/10">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 block mb-1">
                KEY OUTCOME
              </span>
              <p className="font-serif text-base sm:text-lg font-semibold text-slate-900 dark:text-white italic leading-snug">
                &ldquo;{item.result}&rdquo;
              </p>
            </div>

            {/* Deliverable Highlights */}
            {item.highlights && item.highlights.length > 0 && (
              <div className="pt-3.5 border-t border-slate-200/80 dark:border-white/10">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 block mb-2">
                  CORE DELIVERABLES
                </span>
                <ul className="space-y-1.5">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-xs text-slate-700 dark:text-white/80 leading-snug">
                      <CheckCircle2 className="size-3.5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Badges */}
            {item.techStack && item.techStack.length > 0 && (
              <div className="pt-3.5 border-t border-slate-200/80 dark:border-white/10">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 block mb-2">
                  TECH STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md font-mono text-[10px] font-semibold bg-purple-500/10 dark:bg-white/5 text-purple-700 dark:text-purple-300 border border-purple-500/20 dark:border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-white/50">
            <span className="inline-flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-semibold">
              <Sparkles className="size-3 animate-pulse" /> PROD BUILD
            </span>
            {isLink ? (
              <a
                href={item.href!}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-900 dark:text-white font-semibold hover:text-purple-600 dark:hover:text-purple-400 transition-colors inline-flex items-center gap-1"
              >
                Launch site <ArrowUpRight className="size-3.5" />
              </a>
            ) : (
              <span className="text-slate-400 dark:text-white/40">NDA Protected</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
