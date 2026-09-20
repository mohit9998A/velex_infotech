import { MessageCircle, Sparkles } from "lucide-react";

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
    <section className="defer-paint relative overflow-hidden py-20 sm:py-28 bg-white dark:bg-[#04040A] text-slate-900 dark:text-white transition-colors duration-500">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52rem] h-[30rem] bg-gradient-to-r from-blue-600/15 via-purple-600/25 to-pink-600/15 blur-3xl rounded-full opacity-70 dark:opacity-40"
      />

      <div className="reveal-on-scroll relative mx-auto max-w-4xl px-4 text-center sm:px-6">
       

        {/* Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight text-slate-900 dark:text-white max-w-3xl mx-auto">
          Ready to transform{" "}
          <span className="italic text-[#7138FF] dark:text-[#8B4DFF]">
            your business?
          </span>
        </h2>

        {/* Subheading */}
        <p className="font-sans text-base sm:text-lg md:text-xl leading-relaxed mt-4 sm:mt-6 max-w-2xl mx-auto text-slate-600 dark:text-white/70">
          Join high-growth companies that chose intelligence over mediocrity. Book a free consultation and see what Velex can build for you.
        </p>

        {/* Consult Actions */}
        <ConsultButtons
          className="mt-8 sm:mt-10 items-center justify-center gap-4"
          primaryLabel="Schedule a Free Consultation"
          secondary={
            <Button size="lg" variant="crystal" asChild className="rounded-full px-6 py-3 font-sans font-semibold border-slate-300 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4 text-emerald-500" /> WhatsApp Us Now
              </a>
            </Button>
          }
        />
      </div>
    </section>
  );
}
