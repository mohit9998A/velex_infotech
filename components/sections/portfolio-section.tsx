"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/types";
import portfolioData from "@/content/portfolio.json";
import { SectionHeader } from "@/components/common/section-header";
import { PortfolioCard } from "@/components/common/portfolio-card";

const items = portfolioData as PortfolioItem[];

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

  return (
    <section id="portfolio" className="section-pad relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Our Work"
          title="Selected work & case studies"
          subtitle="Real builds for real businesses — from luxury brand sites to autonomous AI systems."
        />

        {/* Filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={cn(
                "relative rounded-full border px-4 py-1.5 text-sm transition-colors",
                active === f
                  ? "border-vx-border-bright text-primary"
                  : "border-vx-border text-secondary hover:text-primary",
              )}
            >
              {active === f && (
                <motion.span
                  layoutId="portfolio-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-purple-core/15"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
