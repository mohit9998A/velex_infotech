import { Clock3, FileCheck2, ShieldCheck, Sparkles } from "lucide-react";

import statsData from "@/content/stats.json";
import { markets } from "@/config/site";
import { permittedClients } from "@/lib/clients";
import { Flag } from "@/components/common/flag";
import { Logo } from "@/components/common/logo";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

/**
 * The lead modal's trust column.
 *
 * Imported ONLY by lead-form-dialog.tsx, which is the lazy chunk boundary. It
 * must never be pulled into lead-form.tsx: app/contact/page.tsx renders that
 * form inline and is statically prerendered, so anything reachable from it is
 * paid for on first load of the site's highest-intent page.
 *
 * EVERY claim here is traceable, per AGENTS.md:
 *   - the three stats come from content/stats.json, the same file /about and
 *     the bento grid read — they are not retyped here
 *   - the countries are `markets` from config/site.ts, not a decorative flag row
 *   - the client names come from lib/clients.ts, which is gated on written
 *     permission from the client
 *   - "one business day" and "09:00-19:00 IST" match /contact and
 *     content/faqs.json verbatim, which AGENTS.md rule 7 requires
 *
 * There is deliberately NO testimonial and NO star rating. Every entry in
 * content/testimonials.json is `placeholder: true` and is filtered out
 * everywhere on the site; a rating with no displayed reviews behind it is the
 * exact claim lib/schema.ts refuses to emit. When real, permitted quotes
 * exist, they belong in the client block at the bottom.
 */

const benefits = [
  {
    icon: Clock3,
    title: "Reply within one business day",
    note: "We work 09:00-19:00 IST, Monday to Friday.",
  },
  {
    icon: ShieldCheck,
    title: "100% confidential",
    note: "Your details are only used to answer your enquiry.",
  },
  {
    icon: FileCheck2,
    title: "NDA on request",
    note: "Happy to sign before you share anything sensitive.",
  },
];

/** Three tiles, so the fourth stat ("1 day Reply Time") is dropped — the first
 *  benefit above already says it, and saying it twice reads as padding. */
const stats = statsData.slice(0, 3);

export function LeadFormAside() {
  return (
    <div className="flex flex-col justify-between gap-4 lg:h-full lg:gap-2.5 xl:gap-3.5">
      {/* Top group: Brand lockup, headline, benefits */}
      <div className="flex flex-col gap-3 sm:gap-3.5 lg:gap-2 xl:gap-3">
        {/* Decorative. The dialog is labelled by its title below, and the brand
            is announced by the page behind the overlay. */}
        <div aria-hidden>
          <Logo href={null} />
        </div>

        <div className="flex flex-col gap-2 sm:gap-2.5 lg:gap-1.5 xl:gap-2">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-[2px] w-5 sm:w-6 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]"
            />
            <span className="font-mono text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7138FF] dark:text-[#8B4DFF]">
              Free Strategy Call
            </span>
          </div>

          <DialogTitle className="font-serif text-2xl sm:text-3xl lg:text-[1.75rem] xl:text-[2rem] 2xl:text-[2.25rem] font-medium leading-[1.1] text-primary tracking-tight">
            Let&apos;s Build Your
            <br />
            <span className="text-gradient-purple font-serif">AI Advantage</span>
          </DialogTitle>

          <DialogDescription className="font-sans text-xs sm:text-sm lg:text-[12.5px] xl:text-sm leading-[1.45] text-secondary font-normal">
            Tell us about your project and our team will come back with a tailored
            plan within one business day. No obligation.
          </DialogDescription>
        </div>

        <ul className="flex flex-col gap-2 sm:gap-2.5 lg:gap-1.5 xl:gap-2">
          {benefits.map(({ icon: Icon, title, note }) => (
            <li key={title} className="flex items-start gap-2.5">
              <span className="flex size-7.5 sm:size-8 lg:size-7 xl:size-8 shrink-0 items-center justify-center rounded-lg bg-[#7138FF]/10 text-[#7138FF] dark:bg-[#8B4DFF]/15 dark:text-[#B99CFF] mt-0.5">
                <Icon className="size-3.5 sm:size-4 lg:size-3.5 xl:size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-sans text-xs sm:text-[13px] font-semibold text-primary leading-tight">
                  {title}
                </span>
                <span className="block font-sans text-[11px] sm:text-xs text-secondary leading-tight mt-0.5">
                  {note}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
