import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    // Needs ~79px of bottom clearance (bottom-8 plus its own 47px). Below a
    // 40rem-tall viewport that collides with the hero stats row, where the space
    // is worth more as content than as decoration.
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 hidden md:flex flex-col items-center gap-1 [@media(max-height:45rem)]:hidden opacity-60">
      <ChevronDown className="h-5 w-5 text-slate-400 dark:text-white/40 animate-bounce" aria-hidden="true" />
    </div>
  );
}
