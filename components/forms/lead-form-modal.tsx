"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

import { useLeadModal } from "@/lib/store/lead-modal";

const LeadFormDialog = dynamic(() => import("./lead-form-dialog"), {
  ssr: false,
});

/**
 * Warms the dialog chunk before it is needed.
 *
 * The dynamic import above is what keeps react-hook-form + zod + the Radix
 * form primitives off every route — but it also means the first open would
 * otherwise wait on a network round-trip. That is fine on warm HTTP/2 and a
 * conversion regression on cold 3G, so the prefetch is not optional.
 *
 * Called from pointer-enter / focus on every CTA (see consult-buttons.tsx and
 * the navbar), plus an idle warm-up below for keyboard and touch users who
 * never hover.
 */
export function prefetchLeadForm() {
  void import("./lead-form-dialog");
}

/**
 * Global lead-capture modal, controlled by the Zustand store.
 *
 * Renders literally nothing — and requests no chunk — until someone opens it.
 * `open` is a Zustand selector, so only this leaf re-renders when it flips.
 */
export function LeadFormModal() {
  const open = useLeadModal((s) => s.open);

  useEffect(() => {
    const ric =
      window.requestIdleCallback ??
      ((cb: IdleRequestCallback) =>
        window.setTimeout(
          () => cb({ didTimeout: true, timeRemaining: () => 0 }),
          3000,
        ));
    const id = ric(() => prefetchLeadForm(), { timeout: 5000 });
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
      else window.clearTimeout(id as number);
    };
  }, []);

  return open ? <LeadFormDialog /> : null;
}
