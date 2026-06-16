"use client";

import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/config/site";
import { useLeadModal } from "@/lib/store/lead-modal";
import { Button } from "@/components/ui/button";

interface ConsultButtonsProps {
  presetService?: string;
  primaryLabel?: string;
  size?: "default" | "lg";
}

/** Client CTA pair: opens the lead modal (optionally preset to a service) + WhatsApp deep-link. */
export function ConsultButtons({
  presetService,
  primaryLabel = "Get Free Consultation",
  size = "lg",
}: ConsultButtonsProps) {
  const openModal = useLeadModal((s) => s.openModal);

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Button size={size} className="btn-glow" onClick={() => openModal(presetService)}>
        {primaryLabel}
      </Button>
      <Button size={size} variant="crystal" asChild>
        <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="size-4" /> WhatsApp Us
        </a>
      </Button>
    </div>
  );
}
