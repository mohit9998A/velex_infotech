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
  Home,
  Brain,
  Layers,
  Users,
  Sun,
  Moon,
  X,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

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
  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

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
                className="inline-flex size-10 items-center justify-center rounded-full border border-black/15 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.04] text-primary hover:bg-black/[0.07] dark:hover:bg-white/[0.08] lg:hidden transition-colors"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="p-0 gap-0 w-[92vw] sm:w-[420px] max-w-[420px] h-full flex flex-row overflow-hidden rounded-l-3xl border-l border-slate-200/80 dark:border-white/10 shadow-2xl bg-white dark:bg-[#070611] [&>button:last-child]:hidden"
            >
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>

              {/* Left Vertical Ribbon / Banner */}
              <div className="w-16 sm:w-20 shrink-0 relative flex flex-col justify-between items-center py-6 px-1 bg-gradient-to-b from-[#EAE2FF] via-[#E2D4FF] to-[#D5C2FF] dark:from-[#211047] dark:via-[#180A34] dark:to-[#0F0523] border-r border-[#7138FF]/15 dark:border-white/10 overflow-hidden select-none">
                {/* Subtle silk wave / light reflection overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.7),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.1),transparent_70%)]" />

                {/* Top / Middle Rotated Text */}
                <div className="flex flex-col items-center gap-3 pt-6 z-10">
                  <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#7138FF]/75 dark:text-[#B99CFF]/75 font-bold">
                    BUILD WHAT&apos;S NEXT
                  </span>
                  <div className="w-px h-10 bg-[#7138FF]/30 dark:bg-[#B99CFF]/30" />
                </div>

                {/* Bottom Slogan & Avatar */}
                <div className="flex flex-col items-center gap-4 pb-2 z-10">
                  <div className="font-mono text-[8px] sm:text-[8.5px] tracking-[0.2em] uppercase text-[#7138FF]/70 dark:text-[#B99CFF]/70 text-center leading-tight">
                    <div>SMARTER</div>
                    <div>FASTER</div>
                    <div>TOGETHER</div>
                  </div>

                  {/* Circle Avatar matching screenshot */}
                  <div className="size-8 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs flex items-center justify-center shadow-md">
                    N
                  </div>
                </div>
              </div>

              {/* Right Content Area */}
              <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 bg-white dark:bg-[#070611] overflow-y-auto">
                <div className="space-y-4">
                  {/* Header: Logo + Tagline + Close */}
                  <div className="flex items-start justify-between">
                    <div>
                      <Logo />
                      <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.22em] uppercase text-slate-400 dark:text-white/40 mt-1 pl-0.5">
                        IDEAS &bull; ENGINEERING &bull; IMPACT
                      </p>
                    </div>
                    <SheetClose asChild>
                      <button
                        type="button"
                        aria-label="Close menu"
                        className="p-1.5 rounded-full text-slate-700 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                      >
                        <X className="size-5" />
                      </button>
                    </SheetClose>
                  </div>

                  {/* "All Services" Card */}
                  <SheetClose asChild>
                    <Link
                      href="/services"
                      className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#7138FF]/10 hover:bg-[#7138FF]/15 dark:bg-[#8B4DFF]/15 dark:hover:bg-[#8B4DFF]/20 border border-[#7138FF]/15 dark:border-[#8B4DFF]/25 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <Home className="size-5 text-[#7138FF] dark:text-[#8B4DFF]" />
                        <span className="font-sans font-bold text-sm text-slate-900 dark:text-white">
                          All Services
                        </span>
                      </div>
                      <ChevronRight className="size-4 text-slate-400 dark:text-white/40 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </SheetClose>

                  {/* Accordion Menu: AI, Build, Company */}
                  <Accordion type="single" collapsible className="space-y-1">
                    {/* AI */}
                    <AccordionItem value="AI" className="border-none">
                      <AccordionTrigger className="py-3 px-1 hover:no-underline text-left group">
                        <div className="flex items-center gap-3">
                          <Brain className="size-5 text-slate-800 dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#8B4DFF] transition-colors" />
                          <span className="font-sans font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#8B4DFF] transition-colors">
                            AI
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-2">
                        <div className="bg-slate-50/80 dark:bg-white/[0.03] rounded-2xl p-3.5 space-y-2 border border-slate-100/80 dark:border-white/5">
                          {navGroups
                            .find((g) => g.label === "AI")
                            ?.links.map((link) => (
                              <SheetClose asChild key={link.label}>
                                <Link
                                  href={link.href}
                                  className="block text-xs font-medium text-slate-700 dark:text-white/80 hover:text-[#7138FF] dark:hover:text-[#8B4DFF] transition-colors py-1"
                                >
                                  {link.label}
                                </Link>
                              </SheetClose>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Build */}
                    <AccordionItem value="Build" className="border-none">
                      <AccordionTrigger className="py-3 px-1 hover:no-underline text-left group">
                        <div className="flex items-center gap-3">
                          <Layers className="size-5 text-slate-800 dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#8B4DFF] transition-colors" />
                          <span className="font-sans font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#8B4DFF] transition-colors">
                            Build
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-2">
                        <div className="bg-slate-50/80 dark:bg-white/[0.03] rounded-2xl p-3.5 space-y-2 border border-slate-100/80 dark:border-white/5">
                          {navGroups
                            .find((g) => g.label === "Build")
                            ?.links.map((link) => (
                              <SheetClose asChild key={link.label}>
                                <Link
                                  href={link.href}
                                  className="block text-xs font-medium text-slate-700 dark:text-white/80 hover:text-[#7138FF] dark:hover:text-[#8B4DFF] transition-colors py-1"
                                >
                                  {link.label}
                                </Link>
                              </SheetClose>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Company */}
                    <AccordionItem value="Company" className="border-none">
                      <AccordionTrigger className="py-3 px-1 hover:no-underline text-left group">
                        <div className="flex items-center gap-3">
                          <Users className="size-5 text-slate-800 dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#8B4DFF] transition-colors" />
                          <span className="font-sans font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#8B4DFF] transition-colors">
                            Company
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-2">
                        <div className="bg-slate-50/80 dark:bg-white/[0.03] rounded-2xl p-3.5 space-y-2 border border-slate-100/80 dark:border-white/5">
                          {navGroups
                            .find((g) => g.label === "Company")
                            ?.links.filter((l) => l.label !== "All Services")
                            .map((link) => (
                              <SheetClose asChild key={link.label}>
                                <Link
                                  href={link.href}
                                  className="block text-xs font-medium text-slate-700 dark:text-white/80 hover:text-[#7138FF] dark:hover:text-[#8B4DFF] transition-colors py-1"
                                >
                                  {link.label}
                                </Link>
                              </SheetClose>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Bottom Area */}
                <div className="pt-6 space-y-3 shrink-0">
                  <Button
                    variant="blue"
                    size="default"
                    className="w-full h-12 rounded-full bg-[#7138FF] hover:bg-[#5E2AE2] text-white font-semibold text-sm shadow-[0_8px_25px_rgba(113,56,255,0.4)] flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                    onClick={() => {
                      setMobileOpen(false);
                      openModal();
                    }}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="size-4" />
                  </Button>

                  {/* Switch Theme Row */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={toggleTheme}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") toggleTheme();
                    }}
                    className="flex items-center justify-between py-2 px-1 text-xs font-semibold text-slate-700 dark:text-white/80 hover:text-[#7138FF] dark:hover:text-[#8B4DFF] transition-colors cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <Sun className="size-4 text-slate-600 dark:text-white/70" />
                      <span>Switch Theme</span>
                    </div>
                    <ChevronRight className="size-4 text-slate-400 dark:text-white/40" />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
