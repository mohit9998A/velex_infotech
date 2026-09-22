import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  ShieldCheck,
  Clock3,
  FileCheck2,
  ArrowUpRight,
} from "lucide-react";

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
  {
    icon: MessageCircle,
    label: "WhatsApp Live Chat",
    value: "Chat instantly with technical leads",
    href: siteConfig.whatsapp,
    isExternal: true,
    highlight: true,
  },
  {
    icon: Phone,
    label: "Direct Telephone",
    value: siteConfig.phoneDisplay,
    href: `tel:${siteConfig.phone}`,
    isExternal: false,
    highlight: false,
  },
  {
    icon: Mail,
    label: "Official Inbox",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    isExternal: false,
    highlight: false,
  },
  {
    icon: MapPin,
    label: "Engineering Hubs",
    value: officesLine,
    href: undefined,
    isExternal: false,
    highlight: false,
  },
];

/**
 * Concrete hours and working windows across overseas target markets.
 */
const coverage = [
  {
    market: "United Kingdom (GMT)",
    overlap: "Full overlap — 09:00–17:00 GMT sits inside our day",
  },
  {
    market: "US East Coast (ET)",
    overlap: "09:00–13:00 ET live window, same-day replies after",
  },
  {
    market: "US West Coast (PT)",
    overlap: "09:00–11:00 PT live window, plus morning async handover",
  },
  {
    market: "Canada (ET/PT)",
    overlap: "Synchronous with corresponding US Eastern/Pacific windows",
  },
];

const assurances = [
  {
    icon: Clock3,
    title: "1 business day reply",
    detail: "Direct evaluation by senior systems engineers, not sales reps.",
  },
  {
    icon: ShieldCheck,
    title: "100% confidential",
    detail: "Your project details and data remain completely confidential.",
  },
  {
    icon: FileCheck2,
    title: "Mutual NDA on request",
    detail: "We're glad to sign an NDA before you share sensitive system specs.",
  },
];

export default function ContactPage() {
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

      {/* Main Section (design.md 2.1, 2.2, 3.1, 7.2) */}
      <section className="relative overflow-hidden pb-24 pt-28 lg:pt-36">
        {/* Soft background ambient layers with hardware acceleration (design.md 7.2) */}
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 dark:opacity-20" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[120px] [transform:translateZ(0)]" />
        <div className="pointer-events-none absolute top-1/3 right-0 size-[32rem] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] [transform:translateZ(0)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs trail={trail} className="mb-6 sm:mb-8" />

          <div className="mx-auto max-w-3xl text-center">
            {/* Aesthetic Kicker (design.md 4.2) */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
                GET IN TOUCH
              </span>
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
            </div>

            {/* Main Headline (design.md 3.1 & 2.1) */}
            <h1 className="mt-4 font-serif text-[clamp(2.35rem,5.2vw,4.25rem)] font-bold tracking-tight text-balance leading-[1.08] text-[#0D0A24] dark:text-white">
              Let&apos;s build your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5424D6] via-[#7138FF] to-[#8B4DFF] dark:from-[#A87FFF] dark:via-[#B99CFF] dark:to-white">
                AI advantage
              </span>
            </h1>

            {/* Lede (design.md 3.1) */}
            <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 dark:text-white/70 font-sans leading-relaxed text-pretty">
              Tell us what you&apos;re looking to automate, architect, or scale. We work with businesses
              across the {marketsShortLine} and respond with technical scoping within one business day.
            </p>
          </div>

          {/* Two-Column Revamped Contact Layout (design.md 4.3 & 4.4) */}
          <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-start xl:gap-10">
            {/* Left Column: Channels & Operational Overlap & Assurances (5 cols) */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              {/* Direct Channels Card */}
              <div className="rounded-3xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="h-[2px] w-5 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#7138FF] dark:text-[#8B4DFF]">
                    DIRECT CHANNELS
                  </span>
                </div>
                <h2 className="mt-2.5 font-serif text-2xl font-bold text-[#0D0A24] dark:text-white">
                  Speak directly with us
                </h2>

                <div className="mt-6 flex flex-col gap-3">
                  {contactItems.map((c) => {
                    const content = (
                      <div className="group flex items-center justify-between rounded-2xl border border-slate-200/80 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] p-4 transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-500/40 hover:-translate-y-0.5">
                        <div className="flex items-center gap-3.5">
                          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 bg-[#7138FF]/10 dark:bg-[#8B4DFF]/15 text-[#7138FF] dark:text-[#8B4DFF]">
                            <c.icon className="size-5" />
                          </span>
                          <div>
                            <span className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-white/60">
                              {c.label}
                            </span>
                            <span className="block text-sm sm:text-base font-semibold text-[#0D0A24] dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#B99CFF] transition-colors">
                              {c.value}
                            </span>
                          </div>
                        </div>

                        {c.href && (
                          <ArrowUpRight className="size-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#7138FF] dark:group-hover:text-[#B99CFF]" />
                        )}
                      </div>
                    );

                    return c.href ? (
                      <a
                        key={c.label}
                        href={c.href}
                        target={c.isExternal ? "_blank" : undefined}
                        rel={c.isExternal ? "noopener noreferrer" : undefined}
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={c.label}>{content}</div>
                    );
                  })}
                </div>
              </div>

              {/* Working Hours & Overlap Card */}
              <div className="rounded-3xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
                <div className="flex items-center gap-2.5">
                  <Clock className="size-4 text-[#7138FF] dark:text-[#8B4DFF]" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7138FF] dark:text-[#8B4DFF]">
                    LIVE TIMEZONE OVERLAP
                  </span>
                </div>
                <h3 className="mt-2.5 font-serif text-xl font-bold text-[#0D0A24] dark:text-white">
                  Active engineering hours
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-white/60 font-mono uppercase tracking-wider">
                  09:00–19:00 IST (Mon–Fri)
                </p>

                <div className="mt-5 flex flex-col gap-2.5 border-t border-slate-200/80 dark:border-white/[0.08] pt-4">
                  {coverage.map((c) => (
                    <div
                      key={c.market}
                      className="flex flex-col gap-0.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] p-3 border border-slate-200/60 dark:border-white/[0.04]"
                    >
                      <span className="font-serif text-sm font-bold text-[#0D0A24] dark:text-white">
                        {c.market}
                      </span>
                      <span className="text-xs text-slate-600 dark:text-white/70 font-sans">
                        {c.overlap}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantees & Assurances Card */}
              <div className="rounded-3xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
                <div className="flex flex-col gap-4">
                  {assurances.map((a) => (
                    <div key={a.title} className="flex items-start gap-3.5">
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#7138FF]/10 dark:bg-[#8B4DFF]/15 text-[#7138FF] dark:text-[#8B4DFF] mt-0.5">
                        <a.icon className="size-4.5" />
                      </span>
                      <div>
                        <span className="block font-serif text-base font-bold text-[#0D0A24] dark:text-white">
                          {a.title}
                        </span>
                        <span className="block text-xs text-slate-600 dark:text-white/70 font-sans mt-0.5 leading-relaxed">
                          {a.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form Card (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/[0.08] bg-white/85 dark:bg-white/[0.03] p-7 sm:p-10 lg:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl">
                {/* Subtle Radial Glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-[#7138FF]/15 dark:bg-[#8B4DFF]/20 blur-3xl [transform:translateZ(0)]" />

                <div className="flex items-center gap-3">
                  <span className="h-[2px] w-6 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7138FF] dark:text-[#8B4DFF]">
                    DISCOVERY &amp; CONSULTATION
                  </span>
                </div>

                <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
                  Request custom architectural scoping
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-white/70 font-sans leading-relaxed">
                  No generic marketing templates or offshore junior handoffs. Tell us your requirements
                  and our systems engineers will provide clear technical direction.
                </p>

                <div className="mt-8">
                  <LeadForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
