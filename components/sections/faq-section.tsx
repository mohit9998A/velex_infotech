import type { FaqItem } from "@/types";
import faqsData from "@/content/faqs.json";
import { faqSchema, jsonLd } from "@/lib/schema";
import { SectionHeader } from "@/components/common/section-header";
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
 *
 * Was hardcoded to content/faqs.json, which is why app/locations/ludhiana
 * previously had to hand-roll a duplicate accordion to get local questions.
 */
export function FaqSection({
  faqs = siteFaqs,
  eyebrow = "FAQ",
  title = "Common questions",
  subtitle,
}: FaqSectionProps) {
  if (faqs.length === 0) return null;

  return (
    // `.defer-paint` only — this section stays fully server-rendered. The FAQ
    // JSON-LD below and the rendered accordion must travel together
    // (AGENTS.md rule 2), so it must never be dynamic-imported or ssr:false'd.
    <section className="defer-paint section-pad relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(faqs)) }}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <Accordion type="single" collapsible className="mt-12 flex flex-col gap-3">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id ?? faq.question}
              value={faq.id ?? faq.question}
              className="rounded-xl border border-vx-border bg-surface/50 px-6 transition-colors data-[state=open]:border-vx-border-bright"
            >
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
