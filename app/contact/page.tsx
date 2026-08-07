import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

import { siteConfig } from "@/config/site";
import { marketsShortLine, officesLine, pageMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  jsonLd,
  localBusinessSchema,
  webPageSchema,
} from "@/lib/schema";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { LeadForm } from "@/components/forms/lead-form";

const title = "Contact Us — Free AI Consultation";
const description = `Talk to Velex Infotech about AI agents, automation or custom software. We work with teams across the ${marketsShortLine} and reply within one business day.`;

export const metadata = pageMetadata({
  path: "/contact",
  title,
  description,
});

const contactItems = [
  { icon: Phone, label: "Call us", value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone}` },
  { icon: Mail, label: "Email us", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat instantly", href: siteConfig.whatsapp },
  { icon: MapPin, label: "Engineering hubs", value: officesLine, href: undefined },
];

/**
 * Timezone overlap is the single most-asked question by offshore buyers, and
 * before this it was unanswered anywhere on the site. Concrete hours, not
 * "we're flexible".
 */
const coverage = [
  { market: "United Kingdom", overlap: "Full overlap — 09:00–17:00 GMT sits inside our day" },
  { market: "US East Coast", overlap: "09:00–13:00 ET live, same-day replies after" },
  { market: "US West Coast", overlap: "09:00–11:00 PT live, plus async handover each morning" },
  { market: "Canada (ET/PT)", overlap: "Same windows as the equivalent US timezone" },
];

export default function ContactPage() {
  // One value feeds both the visible trail and the schema, so they cannot drift.
  const trail = [{ name: "Contact", path: "/contact" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            webPageSchema({ path: "/contact", title, description }),
            localBusinessSchema("ludhiana"),
            breadcrumbSchema(trail),
          ),
        }}
      />

      <section className="relative overflow-hidden pb-20 pt-36">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 glow-blob" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Breadcrumbs trail={trail} />
          <div className="mx-auto mt-6 max-w-2xl text-center">
            <span className="font-mono-label text-purple-glow">Contact</span>
            <h1 className="mt-4 font-display text-h1 text-balance text-primary">
              Let&apos;s build something
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-secondary md:text-lg">
              Tell us what you&apos;re building and we&apos;ll get back within one
              business day. We work with teams across the {marketsShortLine}.
              Prefer to talk now? Call or message us on WhatsApp.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            {/* Contact details */}
            <div className="flex flex-col gap-4">
              {contactItems.map((c) => {
                const body = (
                  <div className="glass-card flex items-center gap-4 p-5">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl border border-vx-border-bright bg-purple-core/10 text-purple-glow">
                      <c.icon className="size-5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-mono-label text-muted">{c.label}</span>
                      <span className="text-primary">{c.value}</span>
                    </span>
                  </div>
                );
                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="transition-transform hover:-translate-y-0.5"
                  >
                    {body}
                  </a>
                ) : (
                  <div key={c.label}>{body}</div>
                );
              })}

              <div className="glass-card p-5">
                <span className="flex items-center gap-2.5">
                  <Clock className="size-4 shrink-0 text-purple-glow" />
                  <span className="font-mono-label text-muted">
                    Working hours &amp; overlap
                  </span>
                </span>
                <p className="mt-3 text-sm text-secondary">
                  Our team works 09:00–19:00 IST, Monday to Friday.
                </p>
                <dl className="mt-4 flex flex-col gap-3">
                  {coverage.map((c) => (
                    <div key={c.market} className="flex flex-col gap-0.5">
                      <dt className="text-sm text-primary">{c.market}</dt>
                      <dd className="text-sm text-secondary">{c.overlap}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Lead form */}
            <div className="glass-card p-6 sm:p-8">
              <h2 className="font-display text-2xl text-primary">Get your free consultation</h2>
              <p className="mt-1 text-sm text-secondary">
                {/* "One business day", not "24 hours" — this page states
                    09:00-19:00 IST Mon-Fri a few lines above, so a Friday
                    evening enquiry cannot be answered inside 24 hours. Every
                    other surface (the success screen, content/faqs.json, the
                    bento grid, content/stats.json) already says one business
                    day; these were the last two that did not. */}
                No spam, ever. We reply within one business day.
              </p>
              <div className="mt-6">
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
