"use client";

import type { CSSProperties, ReactNode } from "react";
import { MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { useLeadModal } from "@/lib/store/lead-modal";
import { prefetchLeadForm } from "@/components/forms/lead-form-modal";
import { Button } from "@/components/ui/button";

interface ConsultButtonsProps {
  presetService?: string;
  primaryLabel?: string;
  primaryVariant?:
    | "primary"
    | "blue"
    | "gold"
    | "outline"
    | "ghost"
    | "link"
    | "crystal";
  primaryClassName?: string;
  primaryIcon?: ReactNode;
  /**
   * Replaces the default WhatsApp button entirely. Lets a Server Component
   * keep its own secondary CTA (the hero's "View Our Work" anchor, say) while
   * still delegating the modal trigger — which is the only part that actually
   * needs to be a client component.
   */
  secondary?: ReactNode;
  size?: "default" | "lg";
  className?: string;
  /** Lets a caller drive the hero's `--i` animation-delay custom property. */
  style?: CSSProperties;
}

/** Client CTA pair: opens the lead modal (optionally preset to a service) + WhatsApp deep-link. */
export function ConsultButtons({
  presetService,
  primaryLabel = "Get Free Consultation",
  primaryVariant = "primary",
  primaryClassName,
  primaryIcon,
  secondary,
  size = "lg",
  className,
  style,
}: ConsultButtonsProps) {
  const openModal = useLeadModal((s) => s.openModal);

  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row", className)} style={style}>
      <Button
        size={size}
        variant={primaryVariant}
        className={cn(primaryVariant === "primary" ? "btn-glow" : "", primaryClassName)}
        onClick={() => openModal(presetService)}
        // The dialog is a separate chunk (see lead-form-modal.tsx). Warm it on
        // intent so the first open never waits on a network round-trip.
        onPointerEnter={prefetchLeadForm}
        onFocus={prefetchLeadForm}
      >
        <span>{primaryLabel}</span>
        {primaryIcon}
      </Button>
      {secondary ?? (
        <Button size={size} variant="crystal" asChild>
          <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" /> WhatsApp Us
          </a>
        </Button>
      )}
    </div>
  );
}
