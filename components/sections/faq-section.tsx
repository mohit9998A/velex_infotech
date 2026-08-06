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

const faqs = faqsData as FaqItem[];

export function FaqSection() {
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
        <SectionHeader eyebrow="FAQ" title="Common questions" />

        <Accordion type="single" collapsible className="mt-12 flex flex-col gap-3">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
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
