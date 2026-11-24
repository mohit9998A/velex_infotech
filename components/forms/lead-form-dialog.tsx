"use client";

import { X } from "lucide-react";

import { useLeadModal } from "@/lib/store/lead-modal";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { LeadForm } from "@/components/forms/lead-form";
import { LeadFormAside } from "@/components/forms/lead-form-aside";

/**
 * The actual modal. Split out of `lead-form-modal.tsx` so that
 * react-hook-form, zod, @hookform/resolvers and the UI modules load only when
 * a visitor asks for the form — rather than on every route including
 * /privacy-policy, which is what happened while this was mounted directly in
 * the root layout.
 *
 * Radix portals `DialogContent` and unmounts it while closed, so nothing here
 * ever rendered on those pages; the cost was downloading, parsing and
 * executing the module graph.
 *
 * This file is also the boundary that keeps `LeadFormAside` off /contact —
 * that page renders `<LeadForm />` inline, and the trust panel is modal-only
 * furniture. Import the aside anywhere else and it becomes shared weight.
 */
export default function LeadFormDialog() {
  const { open, setOpen, presetService } = useLeadModal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent size="wide" hideClose className="lead-modal">
        {/* Below `lg` this wrapper is the single scroll container and the two
            children flow through it. From `lg` up the wrapper stops scrolling
            and each column scrolls on its own.

            That handover needs THREE things together, and it silently fails if
            any one is missing:
              - a definite height (`lg:h-full`, resolving against the modal's
                `lg:h-[90dvh]`) — with only a max-height the grid stays
                indefinite and rows size to content;
              - `lg:grid-rows-[minmax(0,1fr)]` — an explicit row exactly the
                container's height, instead of the implicit `auto` row that
                grows to the tallest column;
              - `min-h-0` on each child, or a grid item's automatic minimum
                size pins it to its content height and overflow never engages.

            `data-lenis-prevent` keeps the globally-mounted Lenis from
            swallowing wheel events inside the modal. Radix handles the body
            scroll lock separately. */}
        <div
          data-lenis-prevent
          className="grid max-h-[90dvh] overflow-y-auto overflow-x-hidden lg:h-full lg:max-h-none lg:grid-cols-[38fr_62fr] lg:grid-rows-[minmax(0,1fr)] lg:overflow-hidden"
        >
          {/* Renders first, so on mobile the reading order is brand -> headline
              -> proof -> form, and the dialog's accessible name (the title,
              which lives in here) is the first thing announced. */}
          <aside
            data-lenis-prevent
            className="border-b border-slate-200/80 bg-slate-50/70 p-6 sm:p-7 lg:min-h-0 lg:overflow-hidden lg:border-b-0 lg:border-r lg:border-slate-200/80 lg:p-5 xl:p-6 2xl:p-8 dark:border-white/10 dark:bg-white/[0.02]"
          >
            <LeadFormAside />
          </aside>

          {/* `overflow-x-hidden` is not redundant: per spec, when one overflow
              axis is not `visible` the other computes to `auto`, so
              `overflow-y-auto` alone would give this column a horizontal
              scrollbar the moment anything overflowed — including the
              off-screen honeypot. */}
          {/* `pb-0`, with the bottom padding moved onto the form's sticky
              submit bar. A sticky element is clipped by its containing block,
              which here ends where the <form> ends — so any padding left on
              this column would strand the bar that far above the scrollport
              floor, with content sliding through the gap underneath it. */}
          <div
            data-lenis-prevent
            className="bg-white p-6 pb-0 sm:p-8 sm:pb-0 lg:min-h-0 lg:overflow-y-auto lg:overflow-x-hidden lg:p-10 lg:pb-0 dark:bg-[#0A0818]"
          >
            {/* key forces a fresh form (and reset) each time the modal opens */}
            <LeadForm
              key={open ? `open-${presetService ?? "none"}` : "closed"}
              defaultService={presetService}
              onSuccess={() => undefined}
              stickySubmit
            />
          </div>
        </div>

        {/* Custom close rather than the built-in one: `size="wide"` removes the
            dialog's padding, so the default button would sit flush in the
            corner with panel content running underneath it. */}
        <DialogClose className="absolute right-3 top-3 z-20 inline-flex size-10 items-center justify-center rounded-full bg-slate-100/80 text-slate-500 backdrop-blur-sm transition-all hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7138FF] sm:right-4 sm:top-4 dark:bg-white/10 dark:text-white/60 dark:hover:bg-white/20 dark:hover:text-white">
          <X className="size-5" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
