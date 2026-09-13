"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/types";
import { getServiceIcon } from "@/lib/icons";
import { useLeadModal } from "@/lib/store/lead-modal";
import { prefetchLeadForm } from "@/components/forms/lead-form-modal";
import { Badge } from "@/components/ui/badge";

/**
 * Still a client component — `openModal` genuinely needs one — but no longer a
 * framer-motion one. `whileInView` is `.reveal-on-scroll` (the CSS class that
 * already replaced this exact pattern in SectionHeader) and `whileHover={{y:-6}}`
 * is `hover:-translate-y-1.5`, which is the same 6px.
 *
 * Note the reveal now reverses on scroll-up, where framer's `viewport.once`
 * did not. There is no CSS-only "once" — and since every SectionHeader on the
 * site already behaves this way, matching it is the more consistent choice.
 *
 * The whole card used to be a <button> that opened the lead modal, so the
 * homepage linked to ZERO service pages — every one of the ten inbound links
 * came from the footer, and "Learn more" was a <span>. It is now an <article>
 * whose <h3> is a real <Link>, stretched over the card by the same
 * `after:absolute after:inset-0` trick PortfolioCard uses. The heading carries
 * the link because the service name is the anchor text worth having; "Learn
 * more" would have been worth nothing.
 *
 * The gradient moved to `-z-10` inside an `isolate` stacking context, which is
 * why no content node needs `relative` any more. That is load-bearing, not
 * tidying: `after:inset-0` resolves against the nearest *positioned* ancestor,
 * so a `relative` on the <h3> would have collapsed the overlay onto the
 * heading instead of the card.
 *
 * Trade-off inherited from the pattern: text in the card is no longer
 * selectable, because the overlay sits above it.
 */
export function ServiceCard({
  service,
  index,
  className,
}: {
  service: ServiceItem;
  index?: number;
  className?: string;
}) {
  const Icon = getServiceIcon(service.icon);
  const openModal = useLeadModal((s) => s.openModal);

  const formattedIndex =
    index !== undefined ? String(index + 1).padStart(2, "0") : null;

  return (
    <article
      onPointerEnter={prefetchLeadForm}
      onFocus={prefetchLeadForm}
      className={cn(
        "reveal-on-scroll group relative isolate flex flex-col justify-between overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-surface/50 p-6 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#0055FF]/40 dark:hover:border-[#3B82F6]/40 hover:shadow-xl hover:-translate-y-1.5 focus-within:border-[#0055FF]",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          service.gradient,
        )}
      />

      <div>
        <div className="flex items-center justify-between">
          <span className="inline-flex size-11 items-center justify-center rounded-xl border border-[#0055FF]/20 bg-[#0055FF]/5 text-[#0055FF] dark:text-[#3B82F6]">
            <Icon className="size-5.5" />
          </span>
          <div className="flex items-center gap-2">
            {service.badge && <Badge variant="gold">{service.badge}</Badge>}
            {formattedIndex && (
              <span className="font-mono text-xs font-semibold text-secondary/60">
                {formattedIndex}
              </span>
            )}
          </div>
        </div>

        <h3 className="mt-5 font-serif text-xl sm:text-2xl font-semibold text-primary">
          <Link
            href={service.href}
            className="underline-offset-4 outline-none after:absolute after:inset-0 after:content-[''] hover:text-[#0055FF] dark:hover:text-[#3B82F6] transition-colors"
          >
            {service.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-secondary">
          {service.description}
        </p>

        {/* Hover-revealed highlights */}
        <div className="mt-4 grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <ul className="flex flex-col gap-1.5 border-t border-black/10 dark:border-white/10 pt-3">
              {service.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-xs text-secondary">
                  <Check className="size-3.5 text-[#0055FF] dark:text-[#3B82F6]" /> {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 pt-3 border-t border-black/5 dark:border-white/5">
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-[#0055FF] dark:group-hover:text-[#3B82F6] transition-colors">
          Learn more
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openModal(service.title)}
            className="relative z-10 shrink-0 rounded-full border border-black/15 dark:border-white/15 px-3 py-1 text-xs font-medium text-secondary transition-colors hover:border-[#0055FF] hover:text-primary dark:hover:border-[#3B82F6] focus-visible:outline-none"
          >
            <span className="sr-only">{service.title}: </span>Get a quote
          </button>

          <span className="inline-flex size-9 items-center justify-center rounded-full border border-black/15 dark:border-white/15 text-primary group-hover:bg-[#0055FF] dark:group-hover:bg-[#3B82F6] group-hover:text-white group-hover:border-transparent transition-all duration-300">
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
