import * as React from "react";

import { cn } from "@/lib/utils";

/** Mirrors the `inputSize` variant on <Input> so a form's fields agree. */
const textareaSizes = {
  default: "min-h-[96px] rounded-xl text-sm",
  lg: "min-h-40 rounded-2xl text-base",
} as const;

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & { inputSize?: keyof typeof textareaSizes }
>(({ className, inputSize = "default", ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex w-full border border-vx-border bg-surface/60 px-4 py-3 text-primary transition-colors placeholder:text-muted focus:border-purple-glow focus:outline-none focus:ring-2 focus:ring-purple-glow/30 disabled:cursor-not-allowed disabled:opacity-50",
      textareaSizes[inputSize],
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
