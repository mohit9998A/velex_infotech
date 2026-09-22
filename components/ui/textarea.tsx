import * as React from "react";

import { cn } from "@/lib/utils";

/** Mirrors the `inputSize` variant on <Input> so a form's fields agree. */
const textareaSizes = {
  default: "min-h-[96px] rounded-xl text-sm",
  lg: "min-h-32 sm:min-h-36 rounded-xl text-base",
} as const;

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & { inputSize?: keyof typeof textareaSizes }
>(({ className, inputSize = "default", ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex w-full border border-slate-200/90 bg-white/90 px-4 py-3 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-[#7138FF] focus:outline-none focus:ring-2 focus:ring-[#7138FF]/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/35 dark:focus:border-[#8B4DFF] dark:focus:ring-[#8B4DFF]/25",
      textareaSizes[inputSize],
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
