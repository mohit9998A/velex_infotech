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
    <div className="flex flex-col gap-5">
      {/* Decorative. The dialog is labelled by its title below, and the brand
          is announced by the page behind the overlay. */}
      <div aria-hidden>
        <Logo href={null} />
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]"
          />
          <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
            Free Strategy Call
          </span>
        </div>

        <DialogTitle className="font-serif text-2xl sm:text-3xl lg:text-[2.35rem] font-medium leading-[1.08] text-primary tracking-tight">
          Let&apos;s Build Your
          <br />
          <span className="text-gradient-purple font-serif">AI Advantage</span>
        </DialogTitle>

        <DialogDescription className="font-sans text-sm sm:text-base leading-[1.55] text-secondary font-normal">
          Tell us about your project and our team will come back with a tailored
          plan within one business day. No obligation.
        </DialogDescription>
      </div>

      <ul className="flex flex-col gap-3 sm:gap-3.5">
        {benefits.map(({ icon: Icon, title, note }) => (
          <li key={title} className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#7138FF]/10 text-[#7138FF] dark:bg-[#8B4DFF]/15 dark:text-[#B99CFF]">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-sans text-sm font-semibold text-primary">
                {title}
              </span>
              <span className="block font-sans text-xs text-secondary leading-snug">{note}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="border-t border-slate-200/80 dark:border-white/10" />

      <section className="flex flex-col gap-2.5">
        <h3 className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-[#7138FF] dark:text-[#8B4DFF]">
          Why businesses choose Velex
        </h3>
        <dl className="grid grid-cols-3 gap-2">
          {stats.map((s) => (
            // `flex-col-reverse`: a <dl> requires <dt> before <dd> in the DOM,
            // but the tile reads value-first. Reversing visually keeps the
            // markup valid AND gives a screen reader the better order
            // ("Projects Delivered, 40 plus").
            <div
              key={s.label}
              className="lift-card flex flex-col-reverse items-center gap-1 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] px-2 py-3 text-center shadow-xs"
            >
              <dt className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.12em] uppercase text-secondary mt-1 leading-[1.25]">
                {s.label}
              </dt>
              <dd className="font-sans font-bold text-2xl sm:text-3xl text-[#7138FF] dark:text-[#8B4DFF] tracking-tight">
                {s.value}
                {s.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="lift-card flex flex-col gap-2.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] px-3.5 py-3 shadow-xs">
        <h3 className="text-center font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-secondary">
          Working with businesses in
        </h3>
        <ul className="grid grid-cols-4 gap-2">
          {markets.map((m) => (
            <li key={m.id} className="flex flex-col items-center gap-1">
              <Flag countryCode={m.countryCode} />
              <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-secondary">{m.shortName}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-[#7138FF] dark:text-[#8B4DFF]">
          Selected client work
        </h3>
        <ul className="flex flex-wrap gap-1.5">
          {permittedClients.map((name) => (
            <li
              key={name}
              className="rounded-full border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] px-2.5 py-1 font-mono text-xs font-semibold tracking-wider text-secondary shadow-2xs"
            >
              {name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
