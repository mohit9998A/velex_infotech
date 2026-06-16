import { create } from "zustand";

interface LeadModalState {
  open: boolean;
  /** Optional pre-selected service (e.g. from a service card CTA). */
  presetService?: string;
  openModal: (presetService?: string) => void;
  closeModal: () => void;
  setOpen: (open: boolean) => void;
}

export const useLeadModal = create<LeadModalState>((set) => ({
  open: false,
  presetService: undefined,
  openModal: (presetService) => set({ open: true, presetService }),
  closeModal: () => set({ open: false }),
  setOpen: (open) => set({ open }),
}));
