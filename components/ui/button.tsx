import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-glow/60 focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[#7138FF] text-white shadow-[0_4px_20px_rgba(113,56,255,0.35)] hover:bg-[#5424D6] hover:shadow-[0_6px_28px_rgba(113,56,255,0.5)] hover:-translate-y-0.5",
        blue:
          "bg-[#7138FF] text-white shadow-[0_4px_20px_rgba(113,56,255,0.35)] hover:bg-[#5424D6] hover:shadow-[0_6px_28px_rgba(113,56,255,0.5)] hover:-translate-y-0.5",
        gold: "bg-gold text-void shadow-[0_0_40px_rgba(228,199,107,0.3)] hover:shadow-[0_0_60px_rgba(228,199,107,0.45)] hover:-translate-y-0.5",
        outline:
          "border border-vx-border-bright bg-white/[0.02] text-primary backdrop-blur-sm hover:bg-purple-core/10 hover:border-purple-glow",
        ghost: "text-secondary hover:text-primary hover:bg-white/[0.04]",
        link: "text-purple-glow underline-offset-4 hover:underline",
        crystal:
          "border border-vx-border bg-white/[0.03] text-primary backdrop-blur-md hover:border-gold/50 hover:text-gold",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6",
        lg: "h-14 px-8 text-base",
        /** Primary conversion CTAs only — currently just the lead form submit. */
        xl: "h-16 px-8 text-base",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
