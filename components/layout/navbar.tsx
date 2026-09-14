"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  ArrowRight,
  Check,
  Building2,
  FolderKanban,
  LayoutGrid,
  BookOpen,
  MapPin,
  Mail,
  Sparkles,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { navGroups } from "@/config/navigation";
import { useScrolled } from "@/hooks/use-scroll";
import { useLeadModal } from "@/lib/store/lead-modal";
import { getServiceIconByTitle } from "@/lib/icons";
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

const extraNavIcons: Record<string, LucideIcon> = {
  "WhatsApp Chatbot": MessagesSquare,
  "All Services": LayoutGrid,
  "About Us": Building2,
  Industries: FolderKanban,
  Portfolio: Sparkles,
  Blog: BookOpen,
  Locations: MapPin,
  Contact: Mail,
};

function getNavIcon(label: string): LucideIcon {
  return extraNavIcons[label] || getServiceIconByTitle(label);
}

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
                  <div className="w-[460px] p-3.5 bg-white/95 dark:bg-[#070611]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/12 rounded-3xl shadow-2xl shadow-purple-500/10">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between px-1">
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/40">
                          {group.label} Capabilities
                        </span>
                      </div>

                      <div
                        className={cn(
                          "grid gap-1",
                          group.links.length > 3 ? "grid-cols-2" : "grid-cols-1",
                        )}
                      >
                        {group.links.map((link) => {
                          const Icon = getNavIcon(link.label);
                          return (
                            <NavigationMenuLink asChild key={link.label}>
                              <Link
                                href={link.href}
                                className="group flex items-start gap-2.5 rounded-2xl p-2.5 transition-all duration-200 hover:bg-[#7138FF]/8 dark:hover:bg-[#8B4DFF]/12"
                              >
                                <div className="flex size-8.5 shrink-0 items-center justify-center rounded-xl border border-[#7138FF]/15 bg-[#7138FF]/5 text-[#7138FF] group-hover:bg-[#7138FF] group-hover:text-white dark:border-[#8B4DFF]/25 dark:bg-[#8B4DFF]/10 dark:text-[#8B4DFF] dark:group-hover:bg-[#8B4DFF] dark:group-hover:text-white transition-all mt-0.5">
                                  <Icon className="size-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-xs sm:text-sm font-sans font-semibold text-slate-900 dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#8B4DFF] transition-colors block truncate">
                                    {link.label}
                                  </span>
                                  {link.description && (
                                    <p className="mt-0.5 text-[11px] font-sans text-slate-500 dark:text-white/60 leading-snug line-clamp-1">
                                      {link.description}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Footer Bar */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/10 px-1 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400 dark:text-white/40 flex items-center gap-1.5">
                        
                        Need a custom AI or software solution?
                      </span>
                      <button
                        type="button"
                        onClick={() => openModal()}
                        className="text-[11px] font-sans font-semibold text-[#7138FF] dark:text-[#8B4DFF] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        Book a call <ArrowRight className="size-3" />
                      </button>
                    </div>
                  </div>
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
