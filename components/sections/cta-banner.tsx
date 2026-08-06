import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/config/site";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { Button } from "@/components/ui/button";

/**
 * A SERVER component.
 *
 * It was `"use client"` for a framer-motion `whileInView` fade and one
 * `openModal()` call — and it is imported by six pages (`/`, `/about`,
 * `/services`, `/services/[slug]`, `/blog/[slug]`, `/locations/ludhiana`), so
 * that was six client boundaries and a copy of the animation library's entry
 * point for a fade-up that CSS already does elsewhere on the same page.
 *
 * The fade is now `.reveal-on-scroll` (the same class `SectionHeader` uses),
 * and the modal trigger is delegated to the `ConsultButtons` client leaf.
 */
export function CtaBanner() {
  return (
    <section className="defer-paint relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 radial-glow" />
      <div className="pointer-events-none absolute inset-0 noise-overlay" />

      <div className="reveal-on-scroll relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="font-mono-label text-purple-glow">Ready when you are</span>
        <h2 className="mt-4 font-display text-h1 text-balance text-primary">
          Ready to transform <span className="text-gradient">your business?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-secondary">
          Join {siteConfig.stats.clients} companies that chose intelligence over
          mediocrity. Book a free consultation and see what Velex can build for you.
        </p>

        <ConsultButtons
          className="mt-10 items-center justify-center"
          primaryLabel="Schedule a Free Consultation"
          secondary={
            <Button size="lg" variant="crystal" asChild>
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" /> WhatsApp Us Now
              </a>
            </Button>
          }
        />
      </div>
    </section>
  );
}
