"use client";

import { useLeadModal } from "@/lib/store/lead-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/forms/lead-form";

/**
 * The actual modal. Split out of `lead-form-modal.tsx` so that
 * react-hook-form, zod, @hookform/resolvers and five UI modules load only when
 * a visitor asks for the form — rather than on every route including
 * /privacy-policy, which is what happened while this was mounted directly in
 * the root layout.
 *
 * Radix portals `DialogContent` and unmounts it while closed, so nothing here
 * ever rendered on those pages; the cost was downloading, parsing and
 * executing the module graph.
 */
export default function LeadFormDialog() {
  const { open, setOpen, presetService } = useLeadModal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-purple-glow">◆</span> Get Your Free Consultation
          </DialogTitle>
          <DialogDescription>
            Tell us what you&apos;re building. We&apos;ll get back within one business day.
          </DialogDescription>
        </DialogHeader>
        {/* key forces a fresh form (and reset) each time the modal opens */}
        <LeadForm
          key={open ? `open-${presetService ?? "none"}` : "closed"}
          defaultService={presetService}
          onSuccess={() => undefined}
        />
      </DialogContent>
    </Dialog>
  );
}
