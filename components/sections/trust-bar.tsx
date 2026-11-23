import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

import type { PortfolioItem } from "@/types";
import portfolioData from "@/content/portfolio.json";
import statsData from "@/content/stats.json";
import { markets } from "@/config/site";
import { permittedClients } from "@/lib/clients";
import { marketsShortLine } from "@/lib/seo";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

/**
 * Same source as the hero, bento and lead-form stats, so the figures cannot
 * drift apart between sections (AGENTS.md rule 7).
 */
const stats = statsData as StatItem[];

/**
 * A brand appears here only if it is BOTH permitted to be named
 * (lib/clients.ts) AND has a published case study in content/portfolio.json.
 * The row's CTA is "View case studies", so every name in it has to lead to one.
 */
const permitted = new Set<string>(permittedClients);
const brands = (portfolioData as PortfolioItem[])
  .filter((item) => !item.placeholder && permitted.has(item.client))
  .map((item) => item.client);

/**
 * Typographic wordmarks echoing each client's own type: Didone caps for DAUR,
 * spaced serif caps as on La Romaire's labels, and so on. Rendered in one ink
 * so the row reads as a set. Unknown names fall back to plain text, so a newly
 * published case study still shows up here without an edit to this file.
 */
const wordmarks: Record<string, ReactNode> = {
  DAUR: (
    <span className="font-serif text-[1.45rem] font-semibold uppercase leading-none tracking-[0.08em] sm:text-[1.6rem]">
      Daur
    </span>
  ),
  Laromaire: (
    // Trailing tracking would push the word off-centre; the left pad balances it.
    <span className="pl-[0.26em] font-serif text-[0.82rem] uppercase leading-none tracking-[0.26em] sm:text-[0.92rem]">
      La Romaire
    </span>
  ),
  "Shudhi Herbals": (
    <span className="flex flex-col items-center leading-none">
      <span className="font-serif text-[1.3rem] font-medium italic sm:text-[1.42rem]">Shudhi</span>
      <span className="mt-1 pl-[0.45em] font-sans text-[0.5rem] uppercase tracking-[0.45em] sm:text-[0.55rem]">
        Herbals
      </span>
    </span>
  ),
  "FabXpert Metal": (
    <span className="font-sans text-[1.25rem] font-semibold leading-none tracking-tight sm:text-[1.38rem]">
      fab<span className="font-extrabold text-[#7138FF] dark:text-[#8B4DFF]">X</span>pert
    </span>
  ),
};

/*
 * Grid hairlines: a short vertical line on a cell's left edge (::before) and a
 * short horizontal one on its top edge (::after), shown only BETWEEN cells.
 *
 * Both grids are 2 columns on phones and a single row from a breakpoint up, so
 * which cells get which line is a function of index alone. Picking them per
 * index is deliberate: the alternative of clipping first-row/first-column lines
 * with a 1px negative offset leaks a faint sliver whenever the panel lands on a
 * fractional pixel, which it does at most widths.
 *
 * The breakpoint classes are spelled out in full so Tailwind can see them.
 */
const vLine =
  "before:absolute before:left-0 before:top-1/2 before:h-10 before:w-px before:-translate-y-1/2 before:bg-slate-200 dark:before:bg-white/10";
const hLine =
  "after:absolute after:left-1/2 after:top-0 after:h-px after:w-3/4 after:-translate-x-1/2 after:bg-slate-200 dark:after:bg-white/10";

const singleRowFrom = {
  sm: { showV: "sm:before:block", hideH: "sm:after:hidden" },
  md: { showV: "md:before:block", hideH: "md:after:hidden" },
} as const;

function cellLines(i: number, bp: keyof typeof singleRowFrom) {
  // Phones: odd indexes are the right-hand column. Single row: all but the first.
  const v = i === 0 ? "before:hidden" : i % 2 === 1 ? "" : `before:hidden ${singleRowFrom[bp].showV}`;
  // Phones: everything past the first row. Single row: nothing.
  const h = i < 2 ? "after:hidden" : singleRowFrom[bp].hideH;
  return `${vLine} ${hLine} ${v} ${h}`;
}

/**
 * The stats + markets + client-brands card. Rendered inside the hero
 * (components/sections/hero-section.tsx) so it sits in the first view; the
 * `TrustBar` wrapper below keeps the standalone-section version available.
 */
export function TrustPanel({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
        <div
          role="region"
          aria-labelledby="trusted-brands-heading"
          style={style}
          className={cn(
            "relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_40px_-16px_rgba(113,56,255,0.18)] sm:rounded-3xl dark:border-white/10 dark:bg-[#0A0818] dark:shadow-none",
            className,
          )}
        >
          {/* Ambient glow behind the stats row (gradient + soft mask, not a
              blur filter: this now paints in the hero's first frame) */}
          <div
            aria-hidden="true"
            className="glow-soft pointer-events-none absolute -top-24 left-1/2 h-44 w-[70%] -translate-x-1/2 bg-[#7138FF]/10 dark:bg-[#7138FF]/30"
          />

          {/* Row 1: stats + markets */}
          <dl
            style={{ "--n": stats.length } as CSSProperties}
            className="relative grid grid-cols-2 sm:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:grid-cols-[repeat(var(--n),minmax(0,1fr))_auto]"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`relative flex flex-col items-center justify-center px-3 py-5 text-center lg:items-start lg:px-4 lg:text-left xl:px-7 ${cellLines(i, "sm")}`}
              >
                {/* dt precedes dd in the DOM; `order` flips them visually. */}
                <dt className="order-2 mt-1.5 whitespace-nowrap text-xs text-slate-500 sm:text-[13px] dark:text-white/55">
                  {s.label}
                </dt>
                <dd className="order-1 font-sans text-2xl font-bold leading-none tracking-tight text-slate-900 sm:text-[1.75rem] dark:text-white">
                  {s.value}
                  <span className="text-[#7138FF] dark:text-[#8B4DFF]">{s.suffix}</span>
                </dd>
              </div>
            ))}

            {/* Own row below the stats until lg, then joins them. */}
            <div
              className={`relative col-span-full flex items-center justify-center px-4 py-4 lg:col-span-1 lg:px-5 lg:py-5 xl:px-7 ${vLine} ${hLine} before:hidden lg:before:block lg:after:hidden`}
            >
              <dt className="sr-only">Markets</dt>
              <dd className="flex items-center gap-3">
                <span aria-hidden="true" className="flex shrink-0 -space-x-2">
                  {markets.map((m) => (
                    <span
                      key={m.id}
                      className="grid size-8 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-[#8B4DFF] to-[#5424D6] font-sans text-[10px] font-bold text-white sm:size-9 dark:border-[#0A0818]"
                    >
                      {m.shortName.length <= 3 ? m.shortName : m.countryCode}
                    </span>
                  ))}
                </span>
                <span className="text-xs leading-snug text-slate-600 sm:text-[13px] dark:text-white/65">
                  Building for businesses in
                  <br className="hidden lg:block" /> the {marketsShortLine}
                </span>
              </dd>
            </div>
          </dl>

          {/* Row 2: brands. Stacked on phones, label + CTA over the logos on
              tablets, one row from xl up. */}
          <div className="relative grid gap-5 border-t border-slate-200/80 px-4 py-6 [grid-template-areas:'label'_'logos'_'cta'] sm:px-6 md:grid-cols-[1fr_auto] md:items-center md:[grid-template-areas:'label_cta'_'logos_logos'] xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:gap-0 xl:px-8 xl:py-5 xl:[grid-template-areas:'label_logos_cta'] dark:border-white/10">
            <h2
              id="trusted-brands-heading"
              className="text-center text-sm font-semibold text-slate-900 [grid-area:label] md:text-left xl:whitespace-nowrap xl:pr-6 xl:leading-snug dark:text-white"
            >
              Trusted by <br className="hidden xl:block" />
              leading brands
            </h2>

            <div className="relative [grid-area:logos] xl:px-6 xl:before:absolute xl:before:left-0 xl:before:top-1/2 xl:before:h-10 xl:before:w-px xl:before:-translate-y-1/2 xl:before:bg-slate-200 xl:after:absolute xl:after:right-0 xl:after:top-1/2 xl:after:h-10 xl:after:w-px xl:after:-translate-y-1/2 xl:after:bg-slate-200 dark:xl:before:bg-white/10 dark:xl:after:bg-white/10">
              <ul
                style={{ "--n": brands.length } as CSSProperties}
                className="grid grid-cols-2 md:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
              >
                {brands.map((name, i) => (
                  <li
                    key={name}
                    className={`relative flex min-h-16 items-center justify-center px-3 py-4 text-slate-800 transition-colors duration-300 hover:text-[#7138FF] [&:last-child:nth-child(odd)]:col-span-2 md:[&:last-child:nth-child(odd)]:col-span-1 dark:text-white/80 dark:hover:text-white ${cellLines(i, "md")}`}
                  >
                    <span className="sr-only">{name}</span>
                    <span aria-hidden="true" className="whitespace-nowrap">
                      {wordmarks[name] ?? (
                        <span className="font-display text-lg">{name}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="#portfolio"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-800 transition-colors duration-300 [grid-area:cta] hover:border-[#7138FF] hover:bg-[#7138FF] hover:text-white md:w-auto md:py-2.5 xl:ml-6 dark:border-white/15 dark:text-white dark:hover:border-[#8B4DFF] dark:hover:bg-[#8B4DFF]"
            >
              View case studies
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
  );
}

/** Standalone section version of the panel (not used on the homepage). */
export function TrustBar() {
  return (
    <section className="relative border-y border-vx-border bg-surface/50 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <TrustPanel />
      </div>
    </section>
  );
}
