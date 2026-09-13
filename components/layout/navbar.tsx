"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ArrowRight } from "lucide-react";

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
        "fixed inset-x-0 top-0 z-[100] transition-[background-color,border-color,box-shadow,padding] duration-300",
        scrolled
          ? "border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-void/80 backdrop-blur-md shadow-sm py-[0.65rem]"
          : "bg-transparent py-[1.1rem]",
      )}
    >
      <div className="mx-auto flex h-[3.6rem] max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
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
                  <ul className="grid w-[420px] gap-1 p-3 bg-white/95 dark:bg-void/95 backdrop-blur-xl border border-black/10 dark:border-white/15 rounded-2xl shadow-xl">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="group block rounded-xl px-4 py-3 transition-colors hover:bg-[#7138FF]/10 dark:hover:bg-[#8B4DFF]/10"
                          >
                            <span className="text-sm font-semibold text-primary transition-colors group-hover:text-[#7138FF] dark:group-hover:text-[#8B4DFF]">
                              {link.label}
                            </span>
                            {link.description && (
                              <span className="mt-0.5 block text-xs text-secondary leading-normal">
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
        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden size-10 rounded-full border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.04] text-primary hover:bg-black/[0.07] dark:hover:bg-white/[0.08] sm:inline-flex [&_svg]:size-4" />
          <Button
            variant="outline"
            size="sm"
            className="hidden h-10 px-5 text-sm font-medium rounded-full border border-black/15 bg-black/[0.03] text-primary hover:bg-black/[0.07] hover:border-black/25 dark:border-white/15 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] md:inline-flex"
            asChild
          >
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
          </Button>
          <Button
            variant="blue"
            size="sm"
            className="group hidden h-10 px-6 text-sm font-semibold rounded-full shadow-[0_4px_20px_rgba(113,56,255,0.35)] hover:shadow-[0_6px_28px_rgba(113,56,255,0.5)] sm:inline-flex"
            onClick={() => openModal()}
          >
            Get Started
            <ArrowRight className="size-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="inline-flex size-10 items-center justify-center rounded-full border border-black/15 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.04] text-primary lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col bg-white dark:bg-void border-l border-black/10 dark:border-white/10 p-6">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <Logo />
              <SheetClose asChild>
                <Link
                  href="/services"
                  className="mt-4 block border-b border-black/10 dark:border-white/10 pb-4 text-base font-semibold text-primary hover:text-[#7138FF] dark:hover:text-[#8B4DFF]"
                >
                  All Services
                </Link>
              </SheetClose>
              <Accordion type="single" collapsible className="flex-1 overflow-y-auto my-2">
                {navGroups.map((group) => (
                  <AccordionItem
                    key={group.label}
                    value={group.label}
                    className="border-b border-black/10 dark:border-white/10"
                  >
                    <AccordionTrigger className="text-base font-semibold text-primary hover:no-underline hover:text-[#7138FF] dark:hover:text-[#8B4DFF]">
                      {group.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-1.5 pt-1 pb-2">
                        {group.links.map((link) => (
                          <SheetClose asChild key={link.label}>
                            <Link
                              href={link.href}
                              className="rounded-lg px-3 py-2 text-sm text-secondary transition-colors hover:bg-[#7138FF]/10 dark:hover:bg-[#8B4DFF]/10 hover:text-primary"
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
              <div className="flex flex-col gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                <Button
                  variant="blue"
                  size="default"
                  className="w-full h-11 text-base font-semibold shadow-[0_4px_20px_rgba(113,56,255,0.35)]"
                  onClick={() => {
                    setMobileOpen(false);
                    openModal();
                  }}
                >
                  Get Started
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-medium text-secondary">Switch Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
