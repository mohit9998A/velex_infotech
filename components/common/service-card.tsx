"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/types";
import { getServiceIcon } from "@/lib/icons";
import { useLeadModal } from "@/lib/store/lead-modal";
import { Badge } from "@/components/ui/badge";

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
    <motion.button
      type="button"
      onClick={() => openModal(service.title)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-vx-border bg-surface/60 p-6 text-left backdrop-blur-sm transition-colors hover:border-vx-border-bright",
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
    </motion.button>
  );
}
