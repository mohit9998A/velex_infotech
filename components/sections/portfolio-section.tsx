"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";

import type { PortfolioItem } from "@/types";
import portfolioData from "@/content/portfolio.json";
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
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Safe active project item
  const currentItem = filtered[activeIndex] || filtered[0];

  const handleFilterChange = (f: string) => {
    setActive(f);
    setActiveIndex(0);
    setDirection(1);
  };

  // Pure scroll-driven sticky listener
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (filtered.length <= 1) return;
    const step = 1 / filtered.length;
    const targetIdx = Math.min(
      Math.floor(latest / step),
      filtered.length - 1,
    );
    if (targetIdx !== activeIndex && targetIdx >= 0) {
      setDirection(targetIdx > activeIndex ? 1 : -1);
      setActiveIndex(targetIdx);
    }
  });

  // Only the hovered card may hold a live embed, so at most one iframe is ever
  // mounted no matter how many previewable projects are on screen.
  const [liveId, setLiveId] = useState<string | null>(null);
  const deactivate = useCallback(
    (id: string) => setLiveId((current) => (current === id ? null : current)),
    [],
  );

  return (
    <section
      id="portfolio"
      className="defer-paint relative py-16 sm:py-24 bg-white dark:bg-[#04040A] text-slate-900 dark:text-white transition-colors duration-500 overflow-x-clip scroll-mt-24"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[48rem] h-[28rem] bg-gradient-to-r from-blue-500/10 via-purple-500/15 to-pink-500/10 blur-3xl rounded-full opacity-60 dark:opacity-30"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="relative text-center max-w-3xl mx-auto pb-8 sm:pb-12">
          {/* Headline */}
          <motion.h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            Selected work &{" "}
            <span className="italic text-[#7138FF] dark:text-[#8B4DFF]">
              case studies
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="font-sans text-sm sm:text-base md:text-lg leading-relaxed mt-3 sm:mt-4 max-w-2xl mx-auto text-slate-600 dark:text-white/60"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            Real builds for real businesses — from high-converting luxury storefronts to custom industrial platforms.
          </motion.p>

          {/* Category Filter Bar */}
          <motion.div
            className="mt-6 sm:mt-8 flex flex-wrap justify-center items-center gap-2"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
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
          </motion.div>
        </div>

        {/* Scroll Track & Sticky Showcase Frame */}
        <div
          ref={containerRef}
          className="relative"
          style={{ height: filtered.length > 1 ? `${filtered.length * 60 + 20}vh` : "auto" }}
        >
          <div className="sticky top-20 sm:top-24 flex flex-col gap-5 py-4">
            {/* Minimal Scroll Progress Indicator */}
            {filtered.length > 1 && (
              <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-slate-500 dark:text-white/50">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">
                    0{activeIndex + 1}
                  </span>
                  <span>/</span>
                  <span>0{filtered.length}</span>
                  <span className="text-slate-300 dark:text-white/20">|</span>
                  <span className="font-sans font-medium text-slate-900 dark:text-white">
                    {currentItem.client}
                  </span>
                </div>

                {/* Progress bar track */}
                <div className="flex items-center gap-1.5">
                  {filtered.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeIndex
                          ? "w-8 bg-purple-600 dark:bg-purple-400"
                          : "w-3 bg-slate-200 dark:bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* In-Place Animated Project Frame */}
            {currentItem && (
              <div className="relative overflow-hidden min-h-[480px] flex items-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentItem.id}
                    custom={direction}
                    variants={{
                      enter: (dir: number) => ({
                        x: dir > 0 ? 140 : -140,
                        opacity: 0,
                        scale: 0.98,
                      }),
                      center: {
                        x: 0,
                        opacity: 1,
                        scale: 1,
                      },
                      exit: (dir: number) => ({
                        x: dir > 0 ? -140 : 140,
                        opacity: 0,
                        scale: 0.98,
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="w-full"
                  >
                    <PortfolioCard
                      item={currentItem}
                      isLive={liveId === currentItem.id}
                      onActivate={() => setLiveId(currentItem.id)}
                      onDeactivate={() => deactivate(currentItem.id)}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
