"use client";

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
    <button
      type="button"
      onClick={() => openModal(service.title)}
      onPointerEnter={prefetchLeadForm}
      onFocus={prefetchLeadForm}
      className={cn(
        "reveal-on-scroll group relative flex flex-col overflow-hidden rounded-2xl border border-vx-border bg-surface/60 p-6 text-left backdrop-blur-sm transition-[colors,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-vx-border-bright hover:-translate-y-1.5",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          service.gradient,
        )}
      />

      <div className="relative flex items-center justify-between">
        <span className="inline-flex size-12 items-center justify-center rounded-xl border border-vx-border-bright bg-purple-core/10 text-purple-glow shadow-[0_0_24px_rgba(107,33,255,0.25)]">
          <Icon className="size-6" />
        </span>
        {service.badge && <Badge variant="gold">{service.badge}</Badge>}
      </div>

      <h3 className="relative mt-5 font-display text-xl text-primary">
        {service.title}
      </h3>
      <p className="relative mt-1 text-sm font-medium text-purple-glow">
        {service.tagline}
      </p>
      <p className="relative mt-3 text-sm leading-relaxed text-secondary">
        {service.description}
      </p>

      {/* Hover-revealed highlights */}
      <div className="relative mt-4 grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr]">
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

      <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Learn more
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </button>
  );
}
