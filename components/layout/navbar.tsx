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
        "fixed inset-x-0 top-0 z-[100] transition-all duration-300",
        scrolled ? "glassmorphism py-2" : "bg-transparent py-4",
      )}
    >
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
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
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Button
            variant="crystal"
            size="sm"
            className="hidden md:inline-flex"
            asChild
          >
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
          </Button>
          <Button
            size="sm"
            className="btn-glow hidden sm:inline-flex"
            onClick={() => openModal()}
          >
            Get Started
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="inline-flex size-9 items-center justify-center rounded-full border border-vx-border text-primary lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <Logo />
              <Accordion type="single" collapsible className="mt-2 flex-1 overflow-y-auto">
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
