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
import { LeadFormAside } from "@/components/forms/lead-form-aside";

const title = "Contact Us — Free AI Consultation";
const description = `Talk to Velex Infotech about AI agents, automation or custom software. We work with teams across the ${marketsShortLine} and reply within one business day.`;

export const metadata = pageMetadata({
  path: "/contact",
  title,
  description,
});

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

      {/* Main Section */}
      <section className="relative overflow-hidden pb-24 pt-28 lg:pt-36">
        {/* Ambient background glow layers */}
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 dark:opacity-20" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[120px] [transform:translateZ(0)]" />
        <div className="pointer-events-none absolute top-1/3 right-0 size-[32rem] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] [transform:translateZ(0)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs trail={trail} className="mb-6 sm:mb-8" />

          {/* Form Card (Exact Image 1 layout: 2-column unified card) */}
          <div id="contact-form" className="mx-auto max-w-5xl scroll-mt-28">
            <div className="overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0A0818] shadow-[0_20px_60px_-15px_rgba(113,56,255,0.12)]">
              <div className="grid lg:grid-cols-[38fr_62fr]">
                {/* Left Aside (Exact Image 1 Aside) */}
                <aside className="border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02] p-6 sm:p-8 lg:p-8 xl:p-10">
                  <LeadFormAside isDialog={false} />
                </aside>

                {/* Right Column (Exact Image 1 Form) */}
                <div className="bg-white dark:bg-[#0A0818] p-6 sm:p-8 lg:p-10">
                  <LeadForm />
                </div>
              </div>
            </div>
          </div>

          {/* Direct Channels & Active Hours Section Below Form */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-6 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7138FF] dark:text-[#8B4DFF]">
                DIRECT COMMUNICATION CHANNELS
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* WhatsApp Live Chat */}
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.02] p-5 shadow-sm transition-all hover:border-[#7138FF]/40 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <MessageCircle className="size-5" />
                  </span>
                  <div>
                    <span className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-white/60">
                      WhatsApp Live Chat
                    </span>
                    <span className="block text-sm font-semibold text-[#0D0A24] dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#B99CFF] transition-colors">
                      Chat instantly with technical leads
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-slate-400 group-hover:text-[#7138FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Direct Telephone */}
              <a
                href={`tel:${siteConfig.phone}`}
                className="group flex items-center justify-between rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.02] p-5 shadow-sm transition-all hover:border-[#7138FF]/40 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[#7138FF]/10 text-[#7138FF] dark:bg-[#8B4DFF]/15 dark:text-[#B99CFF]">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <span className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-white/60">
                      Direct Telephone
                    </span>
                    <span className="block text-sm font-semibold text-[#0D0A24] dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#B99CFF] transition-colors">
                      {siteConfig.phoneDisplay}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-slate-400 group-hover:text-[#7138FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Official Inbox */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center justify-between rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.02] p-5 shadow-sm transition-all hover:border-[#7138FF]/40 hover:-translate-y-0.5 hover:shadow-md sm:col-span-2 lg:col-span-1"
              >
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Mail className="size-5" />
                  </span>
                  <div>
                    <span className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-white/60">
                      Official Inbox
                    </span>
                    <span className="block text-sm font-semibold text-[#0D0A24] dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#B99CFF] transition-colors">
                      {siteConfig.email}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-slate-400 group-hover:text-[#7138FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Working Windows & Timezone Overlap */}
            <div className="mt-6 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white/50 dark:bg-white/[0.02] p-6 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-white/[0.06] pb-4">
                <div className="flex items-center gap-2.5">
                  <Clock className="size-4 text-[#7138FF] dark:text-[#8B4DFF]" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7138FF] dark:text-[#8B4DFF]">
                    ACTIVE ENGINEERING HOURS & OVERSEAS OVERLAP
                  </span>
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-white/60">
                  09:00–19:00 IST · Monday to Friday
                </span>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {coverage.map((c) => (
                  <div
                    key={c.market}
                    className="flex flex-col gap-1 rounded-xl bg-slate-50 dark:bg-white/[0.02] p-3.5 border border-slate-200/50 dark:border-white/[0.04]"
                  >
                    <span className="font-serif text-sm font-bold text-[#0D0A24] dark:text-white">
                      {c.market}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-white/70 font-sans leading-relaxed">
                      {c.overlap}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
