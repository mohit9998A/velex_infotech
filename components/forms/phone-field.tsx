"use client";

import { DIAL_COUNTRIES, findDialCountry } from "@/lib/dial-codes";
import { PHONE_MAX_LENGTH } from "@/lib/validations/lead";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

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
 * Dial-code selector fused to a tel input.
 *
 * The two controls write ONE value. `phone` in react-hook-form stays a single
 * string of the form "+44 7911 123456", which is what lib/validations/lead.ts
 * already validates (loose on shape, strict on digit count) and what the
 * notification email already prints. Splitting it into two schema fields would
 * have meant a validation rewrite, a mail-template change, and a second thing
 * that can disagree with itself.
 *
 * The visible input therefore shows the value with the dial code stripped off
 * the front, and every edit — typing or changing country — re-joins the two.
 * Clearing the number clears the whole field rather than leaving a bare "+44",
 * so an untouched field reports "enter a valid phone number" rather than the
 * confusing "too short".
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

  return (
    <div className="field-group flex h-[3.25rem] overflow-hidden rounded-xl bg-white/90 sm:h-[3.5rem] dark:bg-white/[0.03]">
      <Select
        value={country}
        onValueChange={(next) => {
          onCountryChange(next);
          onChange(join(findDialCountry(next).dial, national));
        }}
      >
        {/* An ISO-code chip, not a flag. The four markets have real SVG flags
            in components/common/flag.tsx, but drawing 29 of them is not worth
            it, and a list where four rows are colourful and twenty-five are
            grey placeholders looks broken. A code renders identically on every
            platform, which emoji flags do not (Windows has no flag glyphs). */}
        <SelectTrigger
          aria-label="Country dial code"
          className="h-full w-auto shrink-0 gap-2 rounded-none border-0 bg-transparent px-3 text-slate-700 focus:ring-0 sm:px-4 dark:text-white/80"
        >
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.7rem] font-semibold tracking-wider text-slate-700 dark:bg-white/10 dark:text-white/80">
            {selected.code}
          </span>
          <span className="text-sm text-slate-600 dark:text-white/70">{selected.dial}</span>
        </SelectTrigger>
        <SelectContent>
          {DIAL_COUNTRIES.map((c) => (
            <SelectItem key={c.code} value={c.code}>
              <span className="mr-2 font-semibold tracking-wider text-slate-700 dark:text-white/80">
                {c.code}
              </span>
              {c.name} <span className="text-slate-500 dark:text-white/60">{c.dial}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span aria-hidden="true" className="my-3 w-px shrink-0 bg-slate-200 dark:bg-white/10" />

      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="Enter your phone number"
        // The schema caps the JOINED string, so the national part gets
        // whatever the dial code and its separator leave behind.
        maxLength={PHONE_MAX_LENGTH - selected.dial.length - 1}
        value={national}
        onChange={(e) => onChange(join(selected.dial, e.target.value))}
        onBlur={onBlur}
        className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-base text-slate-900 outline-none placeholder:text-slate-400 sm:px-4 dark:text-white dark:placeholder:text-white/35"
      />
    </div>
  );
}
