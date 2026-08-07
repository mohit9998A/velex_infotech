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
  className,
}: {
  service: ServiceItem;
  className?: string;
}) {
  const Icon = getServiceIcon(service.icon);
  const openModal = useLeadModal((s) => s.openModal);

  return (
    <article
      onPointerEnter={prefetchLeadForm}
      onFocus={prefetchLeadForm}
      className={cn(
        "reveal-on-scroll group relative isolate flex flex-col overflow-hidden rounded-2xl border border-vx-border bg-surface/60 p-6 backdrop-blur-sm transition-[colors,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-vx-border-bright hover:-translate-y-1.5 focus-within:border-vx-border-bright",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          service.gradient,
        )}
      />

      <div className="flex items-center justify-between">
        <span className="inline-flex size-12 items-center justify-center rounded-xl border border-vx-border-bright bg-purple-core/10 text-purple-glow shadow-[0_0_24px_rgba(107,33,255,0.25)]">
          <Icon className="size-6" />
        </span>
        {service.badge && <Badge variant="gold">{service.badge}</Badge>}
      </div>

      {/*
        Deliberately not `relative` — see the note above. The card is the
        positioned ancestor the stretched overlay must resolve against.
      */}
      <h3 className="mt-5 font-display text-xl text-primary">
        <Link
          href={service.href}
          className="underline-offset-4 outline-none after:absolute after:inset-0 after:content-[''] hover:underline focus-visible:underline"
        >
          {service.title}
        </Link>
      </h3>

      <p className="mt-1 text-sm font-medium text-purple-glow">
        {service.tagline}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-secondary">
        {service.description}
      </p>

      {/* Hover-revealed highlights */}
      <div className="mt-4 grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-1.5 border-t border-vx-border pt-4">
            {service.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-xs text-secondary">
                <Check className="size-3.5 text-success" /> {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        {/* Visual affordance for the stretched link above, so it stays a <span>
            rather than nesting a second anchor over the same target. */}
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
          Learn more
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>

        {/* `relative z-10` lifts this above the stretched-link overlay. Without
            it the overlay swallows the click and the modal never opens. */}
        <button
          type="button"
          onClick={() => openModal(service.title)}
          className="relative z-10 shrink-0 rounded-full border border-vx-border-bright px-3 py-1.5 text-xs font-medium text-secondary transition-colors hover:border-purple-glow hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-glow/60"
        >
          <span className="sr-only">{service.title}: </span>Get a quote
        </button>
      </div>
    </article>
  );
}
