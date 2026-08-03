import Link from "next/link";
import { ArrowUpRight, Check, Clock, Mail, MapPin, Phone } from "lucide-react";

import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  localBusinessSchema,
} from "@/lib/schema";
import { getServiceIcon } from "@/lib/icons";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { SectionHeader } from "@/components/common/section-header";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { CtaBanner } from "@/components/sections/cta-banner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = servicesData as ServiceItem[];

export const metadata = pageMetadata({
  path: "/locations/ludhiana",
  title: "AI Automation Company in Ludhiana, Punjab",
  description:
    "Velex Infotech is an AI automation and software development company based in Ludhiana, Punjab. We build AI agents, WhatsApp bots and custom software for manufacturers, exporters and service businesses across Punjab.",
});

/**
 * Deliberately a single, hand-written location page for the city we actually
 * operate in — not a `[city]` template.
 *
 * A dynamic location route is how near-duplicate "doorway" pages get generated
 * for cities a business has no presence in, which Google penalises. If a second
 * city is ever warranted, it should earn its own file and its own genuinely
 * local content.
 */

const localFaqs = [
  {
    question: "Where is your office in Ludhiana?",
    answer:
      "We are based in Ludhiana, Punjab (141001). We meet clients in person across the city and the wider Ludhiana district, and work remotely with clients elsewhere in Punjab and across India. Call +91 89689 35766 to arrange a visit.",
  },
  {
    question: "Do you work with Ludhiana's manufacturing and export businesses?",
    answer:
      "Yes — that is much of the local economy and much of our local work. Hosiery and textile units, bicycle and auto-component manufacturers, and agricultural machinery businesses share a common set of problems we automate: order and enquiry handling over WhatsApp, quotation generation across variable pricing, dispatch and delivery updates, and reconciling paperwork between production, accounts and export documentation.",
  },
  {
    question: "Can you build systems that work in Punjabi and Hindi?",
    answer:
      "Yes. Our voice agents and WhatsApp chatbots handle English, Hindi and Punjabi, including sentences that mix them — which is how most customers and staff in Ludhiana actually communicate. We test on real recordings and real message logs from your business, not on clean samples.",
  },
  {
    question: "Do we need to be a large company to work with you?",
    answer:
      "No, but volume matters more than company size. Automation pays for itself when a process runs often enough — a family-run unit handling hundreds of WhatsApp enquiries a month is a better candidate than a larger firm with a process that runs twice a week. We will tell you honestly if the numbers do not justify a build.",
  },
  {
    question: "Do you only work with clients in Ludhiana?",
    answer:
      "No. Ludhiana is where we are based and where we can meet face to face. We deliver work for clients across India and internationally, and the delivery process is the same either way — the difference is only how often we can be in the room.",
  },
];

const localIndustries = [
  {
    title: "Hosiery, textiles & apparel",
    body: "Ludhiana's hosiery and knitwear cluster runs on high enquiry volume, seasonal peaks and quotations that depend on fabric, quantity, and buyer. We automate enquiry triage over WhatsApp, quote generation against your own rate logic, and order status updates so the sales desk stops re-typing the same answers.",
  },
  {
    title: "Bicycle & auto components",
    body: "Component manufacturing generates constant back-and-forth on specifications, availability and dispatch. AI agents that read incoming enquiries, check stock and respond with accurate lead times remove a large share of that traffic before it reaches a person.",
  },
  {
    title: "Agricultural machinery & agri trade",
    body: "Seasonal demand spikes and a dealer network spread across Punjab make phone and WhatsApp the primary channels. Voice agents that answer in Punjabi and Hindi handle out-of-hours and peak-season overflow that would otherwise go to voicemail.",
  },
  {
    title: "Exporters & trading houses",
    body: "Export work means documentation, multi-party coordination and enquiries across time zones. Automation handles document checks, chases missing paperwork, and keeps buyers updated without someone manually tracking every shipment.",
  },
];

export default function LudhianaPage() {
  const featured = services.filter((s) =>
    ["ai-automation", "whatsapp-bot", "voice-agent", "web-development"].includes(s.slug),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            localBusinessSchema(),
            faqSchema(localFaqs),
            // No /locations hub exists yet, so the trail is Home > Ludhiana.
            // Add the hub crumb here if a second location is ever built.
            breadcrumbSchema([{ name: "Ludhiana", path: "/locations/ludhiana" }]),
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-36">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-purple-core/15 blur-[140px]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumbs trail={[{ name: "Ludhiana", path: "/locations/ludhiana" }]} />

          <span className="badge-pill w-fit">
            <MapPin className="size-3.5 text-gold" />
            <span className="font-mono-label text-primary">Ludhiana, Punjab</span>
          </span>

          <h1 className="mt-6 font-display text-h1 text-balance text-primary">
            AI Automation Company in Ludhiana
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-secondary md:text-lg">
            Velex Infotech is based in Ludhiana. We build AI automation, voice agents,
            WhatsApp chatbots and custom software for the manufacturers, exporters and
            service businesses that run this city — and for clients across India from here.
          </p>

          <div className="mt-9">
            <ConsultButtons />
          </div>

          {/* Real contact detail — this is a location page for an office that exists */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="glass-card flex items-start gap-3 p-5">
              <MapPin className="mt-0.5 size-5 shrink-0 text-purple-glow" />
              <span className="flex flex-col">
                <span className="font-mono-label text-muted">Office</span>
                <span className="text-primary">Ludhiana, Punjab 141001</span>
              </span>
            </div>
            <a
              href={`tel:${siteConfig.phone}`}
              className="glass-card flex items-start gap-3 p-5 transition-transform hover:-translate-y-0.5"
            >
              <Phone className="mt-0.5 size-5 shrink-0 text-purple-glow" />
              <span className="flex flex-col">
                <span className="font-mono-label text-muted">Call</span>
                <span className="text-primary">{siteConfig.phoneDisplay}</span>
              </span>
            </a>
            <div className="glass-card flex items-start gap-3 p-5">
              <Clock className="mt-0.5 size-5 shrink-0 text-purple-glow" />
              <span className="flex flex-col">
                <span className="font-mono-label text-muted">Hours</span>
                <span className="text-primary">Mon–Fri, 9am–7pm</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Local industries */}
      <section className="section-pad relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Local context"
            title="What we automate for Ludhiana businesses"
            subtitle="Ludhiana runs on manufacturing, export and trade. These are the processes we are asked to automate most often here."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {localIndustries.map((item) => (
              <div key={item.title} className="glass-card p-6">
                <h2 className="font-display text-xl text-primary">{item.title}</h2>
                <p className="mt-2 text-secondary">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why local */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-h3 text-primary">
            What being based here actually changes
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "We can sit in your office and watch the process before quoting on it",
              "Punjabi, Hindi and English handled as they are actually spoken — mixed",
              "Same working hours, same holidays, no overnight handover delays",
              "Face-to-face handover and training when a system goes live",
            ].map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-xl border border-vx-border bg-surface/50 p-4 text-sm text-secondary"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="section-pad relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader eyebrow="Services" title="What we build" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((s) => {
              const Icon = getServiceIcon(s.icon);
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group glass-card flex flex-col p-6"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-vx-border-bright bg-purple-core/10 text-purple-glow">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg text-primary">{s.title}</h3>
                  <p className="mt-1 text-sm text-secondary">{s.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Local FAQ */}
      <section className="section-pad relative">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeader eyebrow="FAQ" title="Working with us in Ludhiana" />
          <Accordion type="single" collapsible className="mt-12 flex flex-col gap-3">
            {localFaqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="rounded-xl border border-vx-border bg-surface/50 px-6 transition-colors data-[state=open]:border-vx-border-bright"
              >
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="mt-10 text-center text-secondary">
            Prefer email?{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-1.5 text-purple-glow hover:text-primary"
            >
              <Mail className="size-4" />
              {siteConfig.email}
            </a>
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
