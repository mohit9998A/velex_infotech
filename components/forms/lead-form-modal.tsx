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

/** Global lead-capture modal, controlled by the Zustand store. */
export function LeadFormModal() {
  const { open, setOpen, presetService } = useLeadModal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-purple-glow">◆</span> Get Your Free Consultation
          </DialogTitle>
          <DialogDescription>
            Tell us what you&apos;re building. We&apos;ll get back within 24 hours.
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
