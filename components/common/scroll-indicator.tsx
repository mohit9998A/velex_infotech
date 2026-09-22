import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    // Needs ~79px of bottom clearance (bottom-8 plus its own 47px). Below a
    // 40rem-tall viewport that collides with the hero stats row, where the space
    // is worth more as content than as decoration.
    <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 [@media(max-height:40rem)]:hidden">

    </div>
  );
}
