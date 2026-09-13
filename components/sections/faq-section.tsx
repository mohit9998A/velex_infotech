import { HelpCircle } from "lucide-react";

import type { FaqItem } from "@/types";
import faqsData from "@/content/faqs.json";
import { faqSchema, jsonLd } from "@/lib/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const siteFaqs = faqsData as FaqItem[];

interface FaqSectionProps {
  /** Defaults to the site-wide set in content/faqs.json (the homepage case). */
  faqs?: { question: string; answer: string; id?: string }[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

/**
 * FAQ accordion and its FAQPage markup, always together.
 *
 * This component emits the JSON-LD itself, deliberately: AGENTS.md rule 2 says
 * schema must never describe content a visitor cannot see, and the only way to
 * guarantee that is to make one component own both. A page that renders this
 * must therefore NOT also pass `faqSchema()` into its own @graph — that would
 * publish the same FAQPage twice.
 */
export function FaqSection({
  faqs = siteFaqs,
  eyebrow = "FAQ",
  title = "Common questions",
  subtitle = "Everything you need to know about our engineering process, pricing, and timelines.",
}: FaqSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="defer-paint relative py-16 sm:py-24 bg-white dark:bg-[#04040A] text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden scroll-mt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(faqs)) }}
      />

      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[28rem] bg-gradient-to-r from-blue-500/10 via-purple-500/15 to-pink-500/10 blur-3xl rounded-full opacity-60 dark:opacity-30"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="relative text-center max-w-3xl mx-auto pb-10 sm:pb-14">
          {/* Eyebrow badge */}
          

          {/* Title */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-slate-900 dark:text-white">
            {title === "Common questions" ? (
              <>
                Common{" "}
                <span className="italic text-[#7138FF] dark:text-[#8B4DFF]">
                  questions
                </span>
              </>
            ) : (
              title
            )}
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <p className="font-sans text-sm sm:text-base md:text-lg leading-relaxed mt-3 sm:mt-4 max-w-2xl mx-auto text-slate-600 dark:text-white/60">
              {subtitle}
            </p>
          )}
        </div>

        {/* Accordion Stack */}
        <Accordion type="single" collapsible className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id ?? faq.question}
              value={faq.id ?? faq.question}
              className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] backdrop-blur-md px-6 sm:px-8 transition-all duration-300 data-[state=open]:border-purple-400/80 dark:data-[state=open]:border-purple-500/50 data-[state=open]:bg-white dark:data-[state=open]:bg-white/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <AccordionTrigger className="font-serif text-lg sm:text-xl font-medium text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-300 py-6 text-left leading-snug">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-sm sm:text-base text-slate-600 dark:text-white/70 leading-relaxed pb-6 pr-4 sm:pr-8">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
