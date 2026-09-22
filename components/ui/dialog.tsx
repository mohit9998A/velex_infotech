"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[120] bg-void/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

/**
 * Layout overrides for a full-bleed panel dialog.
 *
 * A `size` prop rather than className overrides at the call site: the default
 * below carries eight layout decisions (`grid`, `gap-4`, `p-6`, `max-w-lg`,
 * `max-h-[92vh]`, `overflow-y-auto`, `rounded-2xl`, the width calc) and every
 * one of them has to be undone together for a two-column layout that scrolls
 * per column. twMerge resolves each conflict, but spreading that list across
 * call sites means the next person only undoes six of the eight.
 *
 * `dvh` not `vh` — on mobile Safari `vh` is the *largest* viewport height, so
 * the bottom of a 92vh modal sits under the browser chrome. That is where the
 * submit button is.
 *
 * `lg:h-[90dvh]` is a DEFINITE height, and it is load-bearing rather than
 * cosmetic. `max-height` alone leaves the height indefinite, so a grid inside
 * still sizes its rows to content, the row grows past the modal, and
 * `overflow-hidden` here clips it — the columns never scroll and everything
 * below the fold becomes unreachable. Below `lg` the layout is a single
 * scroller, so `max-h` is correct there and the modal shrinks to its content.
 */
const dialogSizes = {
  default: "",
  wide: "block w-[calc(100vw-1.5rem)] max-w-[1280px] gap-0 rounded-[28px] p-0 max-h-[90dvh] overflow-hidden lg:h-[90dvh]",
} as const;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    hideClose?: boolean;
    size?: keyof typeof dialogSizes;
  }
>(({ className, children, hideClose, size = "default", ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-lenis-prevent
      className={cn(
        "fixed left-1/2 top-1/2 z-[130] grid w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#080614] p-6 shadow-[0_25px_70px_rgba(113,56,255,0.12),0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.8),0_0_80px_rgba(113,56,255,0.25)] backdrop-blur-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 max-h-[92vh] overflow-y-auto",
        dialogSizes[size],
        className,
      )}
      {...props}
    >
      {children}
      {!hideClose && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-1 text-secondary opacity-80 transition hover:bg-white/5 hover:text-primary focus:outline-none">
          <X className="size-5" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-display text-2xl text-primary", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-secondary", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
};
