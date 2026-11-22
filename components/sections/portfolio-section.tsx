"use client";

import { useMemo, useRef, useState } from "react";

import type { PortfolioItem } from "@/types";
import portfolioData from "@/content/portfolio.json";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { PortfolioCard } from "@/components/common/portfolio-card";

/**
 * Real client work only — same reasoning as the testimonials section.
 * Four of the six entries in portfolio.json are flagged `placeholder: true`;
 * presenting invented case studies as real work is a trust problem, and
 * fabricated results are exactly what an E-E-A-T assessment penalises.
 *
 * Drop the `placeholder` flag on an entry to publish it.
 */
const items = (portfolioData as PortfolioItem[]).filter((i) => !i.placeholder);

/**
 * Pinned case-study carousel driven by scroll.
 *
 * Every card in the current filter is rendered once and stacked in a single
 * grid cell. A card before the active one rests "exited" to the left, a card
 * after it waits on the right, so advancing slides the old card out left and
 * the new one in from the right — and scrolling back reverses it — with no
 * direction state at all. The slide is an opacity/translate/scale CSS
 * transition on the compositor.
 *
 * This replaces `AnimatePresence mode="wait"` + motion's `useScroll`, which
 * remounted the whole card (and its screenshot <img>) on every step, fetching
 * and decoding the image mid-scroll.
 */
export function PortfolioSection() {
  const filters = useMemo(() => {
    const cats = Array.from(new Set(items.map((i) => i.category)));
    return ["All", ...cats];
  }, []);
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.category === active)),
    [active],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (f: string) => {
    setActive(f);
    activeRef.current = 0;
    setActiveIndex(0);
  };

  // Scroll-driven step: each card owns an equal slice of the track. Called on
  // every scroll event while the track is near the viewport, so it bails out
  // before touching React state unless the step actually changed.
  useScrollProgress(containerRef, 0, 1, (progress) => {
    if (filtered.length <= 1) return;
    const step = 1 / filtered.length;
    const next = Math.min(Math.floor(progress / step), filtered.length - 1);
    if (next === activeRef.current) return;
    activeRef.current = next;
    setActiveIndex(next);
  });

  return (
    <section
      id="portfolio"
      className="relative py-16 sm:py-24 bg-white dark:bg-[#04040A] text-slate-900 dark:text-white transition-colors duration-500 overflow-x-clip scroll-mt-24"
    >
      {/* Ambient background glow — gradient + soft mask instead of a
          blur-3xl filter (see `.glow-soft` in globals.css). */}
      <div
        aria-hidden="true"
        className="glow-soft pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[48rem] h-[28rem] bg-gradient-to-r from-blue-500/10 via-purple-500/15 to-pink-500/10 opacity-60 dark:opacity-30"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="reveal-on-scroll relative text-center max-w-3xl mx-auto pb-8 sm:pb-12">
          {/* Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-slate-900 dark:text-white">
            Selected work &{" "}
            <span className="italic text-[#7138FF] dark:text-[#8B4DFF]">
              case studies
            </span>
          </h2>

          {/* Subheading */}
          <p className="font-sans text-sm sm:text-base md:text-lg leading-relaxed mt-3 sm:mt-4 max-w-2xl mx-auto text-slate-600 dark:text-white/60">
            Real builds for real businesses — from high-converting luxury storefronts to custom industrial platforms.
          </p>

          {/* Category Filter Bar */}
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center items-center gap-2">
            {filters.map((f) => {
              const isActiveFilter = active === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => handleFilterChange(f)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    isActiveFilter
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md shadow-purple-500/10 scale-105"
                      : "bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-white/60 border border-slate-200/80 dark:border-white/10 hover:bg-slate-200/70 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {isActiveFilter && (
                    <span className="size-1.5 rounded-full bg-purple-500 dark:bg-purple-400 animate-pulse" />
                  )}
                  <span>{f}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scroll Track & Sticky Showcase Frame */}
        <div
          ref={containerRef}
          className="relative"
          style={{ height: filtered.length > 1 ? `${filtered.length * 60 + 20}vh` : "auto" }}
        >
          <div className="sticky top-14 sm:top-24 flex flex-col gap-2 sm:gap-5 py-1 sm:py-4">
            {/* In-Place Animated Project Frame */}
            {filtered.length > 0 && (
              <div className="relative overflow-hidden min-h-[400px] sm:min-h-[480px] grid items-start sm:items-center">
                {filtered.map((item, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <div
                      key={item.id}
                      aria-hidden={!isActive || undefined}
                      inert={!isActive}
                      className={cn(
                        "[grid-area:1/1] w-full transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isActive
                          ? "opacity-100 translate-x-0 scale-100 delay-100"
                          : cn(
                              "opacity-0 scale-[0.98] pointer-events-none",
                              i < activeIndex ? "-translate-x-[140px]" : "translate-x-[140px]",
                            ),
                      )}
                    >
                      <PortfolioCard item={item} index={i} total={filtered.length} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
