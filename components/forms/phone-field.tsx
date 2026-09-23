"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DIAL_COUNTRIES,
  POPULAR_COUNTRY_CODES,
  findDialCountry,
  type DialCountry,
} from "@/lib/dial-codes";
import { PHONE_MAX_LENGTH } from "@/lib/validations/lead";

interface PhoneFieldProps {
  id: string;
  /** The full `phone` value from react-hook-form, dial code included. */
  value: string;
  onChange: (next: string) => void;
  onBlur: () => void;
  /** ISO 3166-1 alpha-2. Owned by the parent so it can be set SSR-safely. */
  country: string;
  onCountryChange: (code: string) => void;
}

/**
 * Searchable country dial-code selector fused to a telephone input.
 *
 * Provides a full searchable directory of international country dial codes,
 * keyboard accessibility, and real-time query filtering by country name, ISO code, or dial code.
 */
export function PhoneField({
  id,
  value,
  onChange,
  onBlur,
  country,
  onCountryChange,
}: PhoneFieldProps) {
  const selected = findDialCountry(country);
  const national = value.startsWith(selected.dial)
    ? value.slice(selected.dial.length).trimStart()
    : value;

  const join = (dial: string, rest: string) =>
    rest.trim() === "" ? "" : `${dial} ${rest}`;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    const cleanQ = q.startsWith("+") ? q.slice(1) : q;
    return DIAL_COUNTRIES.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.dial.includes(cleanQ) ||
        c.dial.replace("+", "").includes(cleanQ)
      );
    });
  }, [searchQuery]);

  const popularCountries = useMemo(() => {
    return POPULAR_COUNTRY_CODES.map((code) => findDialCountry(code));
  }, []);

  const renderCountryItem = (c: DialCountry, keyPrefix = "") => {
    const isSelected = c.code === country;
    return (
      <button
        key={`${keyPrefix}${c.code}`}
        type="button"
        role="option"
        aria-selected={isSelected}
        onClick={() => {
          onCountryChange(c.code);
          onChange(join(c.dial, national));
          setIsOpen(false);
          setSearchQuery("");
        }}
        className={cn(
          "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-colors sm:text-sm",
          isSelected
            ? "bg-[#7138FF]/10 font-semibold text-[#7138FF] dark:bg-[#8B4DFF]/15 dark:text-[#B99CFF]"
            : "text-slate-700 hover:bg-slate-100/80 dark:text-white/85 dark:hover:bg-white/[0.06]",
        )}
      >
        <div className="flex items-center gap-2.5 truncate">
          <span className="font-mono text-[11px] font-bold text-slate-400 w-6 shrink-0 dark:text-white/40">
            {c.code}
          </span>
          <span className="truncate">{c.name}</span>
        </div>
        <div className="ml-2 flex shrink-0 items-center gap-2">
          <span className="font-mono text-xs text-slate-500 dark:text-white/50">
            {c.dial}
          </span>
          {isSelected && (
            <Check className="size-3.5 text-[#7138FF] dark:text-[#8B4DFF]" />
          )}
        </div>
      </button>
    );
  };

  return (
    <div
      ref={dropdownRef}
      className="relative field-group flex h-[3.25rem] rounded-xl bg-white/90 sm:h-[3.5rem] dark:bg-white/[0.03]"
    >
      {/* Country Selector Trigger */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Country dial code"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-full shrink-0 items-center gap-2 rounded-l-xl px-3 text-slate-700 outline-none transition-colors hover:bg-slate-100/60 focus-visible:ring-2 focus-visible:ring-[#7138FF] sm:px-4 dark:text-white/80 dark:hover:bg-white/[0.04]"
      >
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.7rem] font-semibold tracking-wider text-slate-700 dark:bg-white/10 dark:text-white/80">
          {selected.code}
        </span>
        <span className="text-sm font-medium text-slate-600 dark:text-white/70">
          {selected.dial}
        </span>
        <ChevronDown
          className={cn(
            "size-3.5 text-slate-400 transition-transform duration-200 dark:text-white/40",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          data-lenis-prevent
          className="absolute left-0 top-[calc(100%+6px)] z-[120] w-[min(calc(100vw-2.5rem),340px)] rounded-2xl border border-slate-200/90 bg-white/95 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.15)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0E0C22]/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
        >
          {/* Search Input */}
          <div className="p-1.5 pb-2">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 size-3.5 text-slate-400 dark:text-white/40" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code (+91, US)..."
                className="h-9 w-full rounded-xl border border-slate-200/80 bg-slate-50/80 pl-8.5 pr-8 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#7138FF] focus:bg-white focus:ring-2 focus:ring-[#7138FF]/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/40 dark:focus:border-[#8B4DFF] dark:focus:bg-[#16142E] dark:focus:ring-[#8B4DFF]/25"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 flex size-4 items-center justify-center rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>
          </div>

          {/* List of Countries */}
          <div
            role="listbox"
            tabIndex={-1}
            className="max-h-60 overflow-y-auto overscroll-contain p-0.5 text-xs scrollbar-thin sm:max-h-68"
          >
            {filteredCountries !== null ? (
              filteredCountries.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400 dark:text-white/40">
                  No countries matching &quot;{searchQuery}&quot;
                </div>
              ) : (
                <div className="space-y-0.5">
                  {filteredCountries.map((c) => renderCountryItem(c))}
                </div>
              )
            ) : (
              <div className="space-y-3 pb-1">
                <div>
                  <div className="px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
                    Frequently Used
                  </div>
                  <div className="mt-0.5 space-y-0.5">
                    {popularCountries.map((c) => renderCountryItem(c, "popular-"))}
                  </div>
                </div>

                <div>
                  <div className="border-t border-slate-100 px-3 py-1 pt-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:border-white/10 dark:text-white/40">
                    All Countries (A–Z)
                  </div>
                  <div className="mt-0.5 space-y-0.5">
                    {DIAL_COUNTRIES.map((c) => renderCountryItem(c))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Divider */}
      <span aria-hidden="true" className="my-3 w-px shrink-0 bg-slate-200 dark:bg-white/10" />

      {/* Phone Number Input */}
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="Enter your phone number"
        maxLength={PHONE_MAX_LENGTH - selected.dial.length - 1}
        value={national}
        onChange={(e) => onChange(join(selected.dial, e.target.value))}
        onBlur={onBlur}
        className="h-full min-w-0 flex-1 rounded-r-xl border-0 bg-transparent px-3 text-base text-slate-900 outline-none placeholder:text-slate-400 sm:px-4 dark:text-white dark:placeholder:text-white/35"
      />
    </div>
  );
}
