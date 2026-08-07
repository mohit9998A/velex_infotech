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
    <div className="flex flex-col gap-6">
      {/* Decorative. The dialog is labelled by its title below, and the brand
          is announced by the page behind the overlay. */}
      <div aria-hidden>
        <Logo href={null} />
      </div>

      <div className="flex flex-col gap-4">
        {/* text-purple-ink, not text-purple-glow: #a855f7 is only 3.9:1 on
            white, which fails AA for a label this size in the light theme. */}
        <span className="badge-pill w-fit font-mono-label text-purple-ink">
          <Sparkles className="size-3.5" aria-hidden="true" />
          Free strategy call
        </span>

        <DialogTitle className="font-display text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
          Let&apos;s Build Your
          <br />
          <span className="text-gradient-purple">AI Advantage</span>
        </DialogTitle>

        <DialogDescription className="text-base">
          Tell us about your project and our team will come back with a tailored
          plan within one business day. No obligation.
        </DialogDescription>
      </div>

      <ul className="flex flex-col gap-4">
        {benefits.map(({ icon: Icon, title, note }) => (
          <li key={title} className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-purple-core/12 text-purple-glow">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-primary">
                {title}
              </span>
              <span className="block text-sm text-secondary">{note}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* Bare `border-t`: the unlayered `* { border-color: var(--vx-border) }`
          in globals.css supplies the colour and beats any border utility. */}
      <div className="border-t" />

      <section className="flex flex-col gap-3">
        <h3 className="font-mono-label text-secondary">Why businesses choose Velex</h3>
        <dl className="grid grid-cols-3 gap-2">
          {stats.map((s) => (
            // `flex-col-reverse`: a <dl> requires <dt> before <dd> in the DOM,
            // but the tile reads value-first. Reversing visually keeps the
            // markup valid AND gives a screen reader the better order
            // ("Projects Delivered, 40 plus").
            <div
              key={s.label}
              className="lift-card flex flex-col-reverse items-center gap-1 rounded-2xl bg-card px-2 py-4 text-center"
            >
              <dt className="text-[0.7rem] leading-tight text-secondary">
                {s.label}
              </dt>
              <dd className="font-display text-2xl text-gradient">
                {s.value}
                {s.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="lift-card flex flex-col gap-3 rounded-2xl bg-card px-4 py-4">
        <h3 className="text-center font-mono-label text-secondary">
          Working with businesses in
        </h3>
        <ul className="grid grid-cols-4 gap-2">
          {markets.map((m) => (
            <li key={m.id} className="flex flex-col items-center gap-1.5">
              <Flag countryCode={m.countryCode} />
              <span className="text-[0.7rem] text-secondary">{m.shortName}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="font-mono-label text-secondary">Selected client work</h3>
        <ul className="flex flex-wrap gap-x-2 gap-y-1.5">
          {permittedClients.map((name) => (
            <li
              key={name}
              className="rounded-full border border-vx-border bg-card px-3 py-1 font-display text-sm text-secondary"
            >
              {name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
