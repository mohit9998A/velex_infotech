"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { navGroups } from "@/config/navigation";
import { useScrolled } from "@/hooks/use-scroll";
import { useLeadModal } from "@/lib/store/lead-modal";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Navbar() {
  const scrolled = useScrolled(80);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openModal = useLeadModal((s) => s.openModal);

  return (
    <header
      className={cn(
        // Explicit property list, not `transition-all`. `all` included
        // `backdrop-filter`, so adding `.glassmorphism` animated the blur from
        // 0 to 20px over 300ms — 18 frames of full-width backdrop re-blur on a
        // fixed element, on the scroll frame. The blur now appears at once;
        // padding still animates, so the shrink-on-scroll is unchanged.
        "fixed inset-x-0 top-0 z-[100] transition-[background-color,box-shadow,padding] duration-300",
        scrolled ? "glassmorphism py-[0.6rem]" : "bg-transparent py-[1.2rem]",
      )}
    >
      {/* Bar geometry is one 20%-up scale of the original 48px row / 8px / 16px
          padding pair: 96px tall at rest, 76.8px scrolled. `hero-section.tsx`
          pads for the resting height — the two values move together. */}
      <div className="mx-auto flex h-[3.6rem] max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {/*
              The one header link that survives server rendering.
              NavigationMenuLink renders Primitive.a directly, with no Presence
              gate — unlike NavigationMenuContent below, whose 16 links are
              unmounted until a hover and so are invisible to a crawler, which
              does not hover. `forceMount` is not the fix: once the Viewport
              mounts, Radix renders every panel through
              `Presence present={forceMount || isActive}`, so all three would
              show at once inside a container sized from only the active one,
              with no data-state to hide them by. The dropdown links stay
              crawlable via the footer, which renders the same navGroups.
            */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/services" className={navigationMenuTriggerStyle()}>
                  Services
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {navGroups.map((group) => (
              <NavigationMenuItem key={group.label}>
                <NavigationMenuTrigger>{group.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[420px] gap-1 p-3">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="block rounded-xl px-4 py-3 transition-colors hover:bg-purple-core/10"
                          >
                            <span className="text-sm font-medium text-primary">
                              {link.label}
                            </span>
                            {link.description && (
                              <span className="mt-0.5 block text-xs text-secondary">
                                {link.description}
                              </span>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions */}
        <div className="flex items-center gap-[0.6rem] sm:gap-[0.9rem]">
          <ThemeToggle className="hidden size-[2.7rem] sm:inline-flex [&_svg]:size-[1.2rem]" />
          <Button
            variant="crystal"
            size="sm"
            className="hidden h-[2.7rem] px-[1.2rem] text-[0.9rem] md:inline-flex"
            asChild
          >
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
          </Button>
          <Button
            size="sm"
            className="btn-glow hidden h-[2.7rem] px-[1.2rem] text-[0.9rem] sm:inline-flex"
            onClick={() => openModal()}
          >
            Get Started
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="inline-flex size-[2.7rem] items-center justify-center rounded-full border border-vx-border text-primary lg:hidden"
              >
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <Logo />
              <SheetClose asChild>
                <Link
                  href="/services"
                  className="mt-2 block border-b border-vx-border py-4 text-sm font-medium text-primary"
                >
                  All Services
                </Link>
              </SheetClose>
              <Accordion type="single" collapsible className="flex-1 overflow-y-auto">
                {navGroups.map((group) => (
                  <AccordionItem
                    key={group.label}
                    value={group.label}
                    className="border-b border-vx-border"
                  >
                    <AccordionTrigger>{group.label}</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-1">
                        {group.links.map((link) => (
                          <SheetClose asChild key={link.label}>
                            <Link
                              href={link.href}
                              className="rounded-lg px-2 py-2 text-sm text-secondary transition-colors hover:bg-purple-core/10 hover:text-primary"
                            >
                              {link.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="flex flex-col gap-3 pt-2">
                <Button
                  className="btn-glow w-full"
                  onClick={() => {
                    setMobileOpen(false);
                    openModal();
                  }}
                >
                  Get Started
                </Button>
                <ThemeToggle className="self-start" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
