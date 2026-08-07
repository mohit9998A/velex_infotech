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
  lg: "h-[3.25rem] rounded-2xl text-base sm:h-[3.75rem]",
} as const;

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { inputSize?: keyof typeof inputSizes }
>(({ className, type, inputSize = "default", ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "flex w-full border border-vx-border bg-surface/60 px-4 py-2 text-primary transition-colors placeholder:text-muted focus:border-purple-glow focus:outline-none focus:ring-2 focus:ring-purple-glow/30 disabled:cursor-not-allowed disabled:opacity-50",
      inputSizes[inputSize],
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
