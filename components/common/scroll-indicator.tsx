import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2">
      <span className="font-mono-label text-muted">Scroll</span>
      <ChevronDown className="size-5 animate-bob text-purple-glow" />
    </div>
  );
}
