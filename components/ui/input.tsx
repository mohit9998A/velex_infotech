import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * `lg` is the lead form's field size — taller targets and a bigger type size
 * measurably reduce mis-taps on mobile, and this is the form the whole site
 * funnels into. `default` is byte-identical to what shipped before the size
 * variant existed, so no other surface moves.
 */
const inputSizes = {
  default: "h-11 rounded-xl text-sm",
  lg: "h-[3.25rem] rounded-xl text-base sm:h-[3.5rem]",
} as const;

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { inputSize?: keyof typeof inputSizes }
>(({ className, type, inputSize = "default", ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "flex w-full border border-slate-200/90 bg-white/90 px-4 py-2 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-[#7138FF] focus:outline-none focus:ring-2 focus:ring-[#7138FF]/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/35 dark:focus:border-[#8B4DFF] dark:focus:ring-[#8B4DFF]/25",
      inputSizes[inputSize],
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
