"use client";

import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";

import type { PortfolioItem } from "@/types";
import portfolioData from "@/content/portfolio.json";
import { cn } from "@/lib/utils";
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

/** How long each case study stays on screen before the next slides in. */
const SLIDE_MS = 5000;

/**
 * Case-study carousel that advances on its own every 5 seconds.
 *
 * It used to pin itself for (cards x 60 + 20)vh of scrolling and step through
 * the cards as the visitor scrolled, so the page was locked here until every
 * case study had been shown. It is now an ordinary section the page scrolls
 * straight past, and the cards rotate on a timer instead — only while the
 * section is on screen and the tab is visible, and held while a KEYBOARD user
 * is tabbing inside the active card. The pills in each card's header jump to
 * a case study; the active pill fills over the 5 s.
 *
 * Every card in the current filter is rendered once and stacked in a single
 * grid cell. The card just left slides out to the left, the next comes in
 * from the right; opacity/translate/scale CSS transitions on the compositor.
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

  const [{ activeIndex, prevIndex }, setSlide] = useState({ activeIndex: 0, prevIndex: -1 });
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [focusedWithin, setFocusedWithin] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const goTo = (next: number) =>
    setSlide((cur) =>
      cur.activeIndex === next ? cur : { activeIndex: next, prevIndex: cur.activeIndex },
    );

  const handleFilterChange = (f: string) => {
    setActive(f);
    setSlide({ activeIndex: 0, prevIndex: -1 });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.25 },
    );
    io.observe(el);
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const running = inView && tabVisible && !focusedWithin && filtered.length > 1;

  // One timeout per slide: a slide change (auto or a pill click), a filter
  // change, or a change of `running` restarts the full 5 s.
  const advance = useEffectEvent(() => goTo((activeIndex + 1) % filtered.length));
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(advance, SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [activeIndex, running, active]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Case studies"
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
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-slate-900 dark:text-white">
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
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-xs font-semibold transition-all duration-300 cursor-pointer ${
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

        {/* Showcase frame (no scroll pinning: the page scrolls straight past) */}
        <div
          className="relative"
          onFocusCapture={(e) => {
            // Keyboard focus only: a mouse click also focuses, and must not
            // freeze the rotation.
            if ((e.target as HTMLElement).matches(":focus-visible")) setFocusedWithin(true);
          }}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusedWithin(false);
          }}
        >
          <div className="flex flex-col gap-2 sm:gap-5 py-1 sm:py-4">
            {/* In-Place Animated Project Frame */}
            {filtered.length > 0 && (
              <div className="relative overflow-hidden min-h-[400px] sm:min-h-[480px] grid items-start sm:items-center">
                {filtered.map((item, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <div
                      key={item.id}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${i + 1} of ${filtered.length}: ${item.client}`}
                      aria-hidden={!isActive || undefined}
                      inert={!isActive}
                      className={cn(
                        "[grid-area:1/1] w-full transition-[opacity,translate,scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isActive
                          ? "opacity-100 translate-x-0 scale-100 delay-100"
                          : cn(
                              "opacity-0 scale-[0.98] pointer-events-none",
                              i === prevIndex ? "-translate-x-[140px]" : "translate-x-[140px]",
                            ),
                      )}
                    >
                      <PortfolioCard
                        item={item}
                        index={i}
                        total={filtered.length}
                        onSelect={goTo}
                        progress={isActive ? (running ? "running" : "paused") : undefined}
                      />
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
