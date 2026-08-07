/**
 * Country dial codes for the lead form's phone field.
 *
 * A hand-kept list rather than a phone-number library. The obvious candidates
 * (react-international-phone, libphonenumber-js) cost 35-100 KiB gzipped, and
 * the cost is NOT confined to the lazily-loaded modal: /contact renders the
 * same <LeadForm /> inline and is statically prerendered, so the whole site's
 * highest-intent page would pay for it on first load. What we actually need is
 * a dial code prefixed onto a string that lib/validations/lead.ts already
 * validates loosely on shape and strictly on digit count.
 *
 * The four `markets` in config/site.ts lead, in the order they appear there;
 * the rest are the markets that show up in analytics and in the diaspora
 * around them. Adding a row is a one-line edit — do that rather than reaching
 * for a dependency.
 */
export interface DialCountry {
  /** ISO 3166-1 alpha-2. The select's value: US and CA share +1. */
  code: string;
  name: string;
  dial: string;
}

export const DIAL_COUNTRIES: DialCountry[] = [
  { code: "US", name: "United States", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "BD", name: "Bangladesh", dial: "+880" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "IE", name: "Ireland", dial: "+353" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "KE", name: "Kenya", dial: "+254" },
  { code: "LK", name: "Sri Lanka", dial: "+94" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "NZ", name: "New Zealand", dial: "+64" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "PK", name: "Pakistan", dial: "+92" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "ZA", name: "South Africa", dial: "+27" },
];

/**
 * No flag emoji here, deliberately.
 *
 * Unicode regional-indicator pairs have no colour glyph on Windows — every
 * browser there renders the two letters instead, so a flag beside a label came
 * out as "US / US". The four markets get real inline SVGs from
 * components/common/flag.tsx; this list, being 29 long, uses the ISO code
 * itself, which renders identically everywhere.
 */
export function findDialCountry(code: string): DialCountry {
  return DIAL_COUNTRIES.find((c) => c.code === code) ?? DIAL_COUNTRIES[0];
}
