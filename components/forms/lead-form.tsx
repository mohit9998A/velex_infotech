"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import {
  leadFormSchema,
  type Currency,
  type LeadFormValues,
  SERVICE_OPTIONS,
  BUDGET_BANDS,
  CURRENCIES,
} from "@/lib/validations/lead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LeadFormProps {
  defaultService?: string;
  onSuccess?: () => void;
}

/**
 * Best-guess currency from the browser's own timezone.
 *
 * A client-side hint, deliberately not IP geolocation: geo needs middleware,
 * breaks static rendering of this page, and is wrong for VPN users and for an
 * Indian founder demoing to a US prospect. The user can always override, and
 * the currency travels with the submission, so the stored value is never
 * ambiguous.
 */
function guessCurrency(): Currency {
  if (typeof Intl === "undefined") return "INR";
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  if (tz.startsWith("America/Toronto") || tz.startsWith("America/Vancouver") || tz.startsWith("America/Edmonton") || tz.startsWith("America/Winnipeg") || tz.startsWith("America/Halifax")) return "CAD";
  if (tz.startsWith("Europe/London")) return "GBP";
  if (tz.startsWith("America/")) return "USD";
  if (tz.startsWith("Asia/Kolkata") || tz.startsWith("Asia/Calcutta")) return "INR";
  return "USD";
}

/**
 * What the SERVER renders.
 *
 * `/contact` is statically prerendered, so anything derived from the
 * environment during render is the BUILD machine's answer — a UTC container,
 * which falls through every branch above to "USD". The visitor's browser then
 * says something else.
 *
 * That divergence throws no hydration error, because React skips `value` /
 * `checked` / `selected` when diffing and never re-applies a controlled value
 * to a hydrated <select>. So the wrong value simply sticks: the picker read
 * USD while the budget list showed ₹ bands and the payload said INR.
 *
 * The server value must therefore be a constant, and the correction has to
 * happen after mount. USD rather than INR because USD is already
 * `guessCurrency`'s own "I don't recognise this timezone" answer; INR is its
 * "there is no Intl at all" answer, which is a different question.
 */
const DEFAULT_CURRENCY: Currency = "USD";

export function LeadForm({ defaultService, onSuccess }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  /** Set once the visitor picks a currency, so the mount effect can't override them. */
  const userPickedCurrency = useRef(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: (SERVICE_OPTIONS.find((s) => s === defaultService) ??
        undefined) as LeadFormValues["service"],
      currency: DEFAULT_CURRENCY,
      message: "",
      // Filled in after mount — `window` does not exist during the prerender,
      // so this silently shipped "" and every lead from /contact reported
      // "Source: Not provided".
      source: "",
      website: "",
    },
  });

  /**
   * One source of truth. This previously lived in BOTH local state and the RHF
   * field, kept in sync by hand — which is the shape the bug grew in.
   */
  const currency = (useWatch({ control, name: "currency" }) ??
    DEFAULT_CURRENCY) as Currency;

  // Timezone and location are CLIENT facts. Reading them after mount is what
  // guarantees the server HTML and the first client render are identical.
  useEffect(() => {
    if (!userPickedCurrency.current) {
      const guess = guessCurrency();
      if (guess !== DEFAULT_CURRENCY) {
        setValue("currency", guess, { shouldDirty: false, shouldValidate: false });
      }
    }
    setValue("source", window.location.href, { shouldDirty: false });
  }, [setValue]);

  const onSubmit = async (values: LeadFormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      onSuccess?.();
    } catch {
      setServerError(
        "Something went wrong. Please try WhatsApp or email us directly.",
      );
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <CheckCircle2 className="size-12 text-success" />
        <h3 className="font-display text-2xl text-primary">Request received</h3>
        <p className="max-w-xs text-sm text-secondary">
          Thank you. The Velex team will respond within one business day. For
          anything urgent, reach us on WhatsApp.
        </p>
        <Button variant="gold" asChild>
          <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
            Message us on WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col gap-4" noValidate>
      <Field label="Full Name" error={errors.name?.message} htmlFor="lead-name">
        <Input id="lead-name" placeholder="Your name" autoComplete="name" {...register("name")} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" error={errors.email?.message} htmlFor="lead-email">
          <Input
            id="lead-email"
            type="email"
            inputMode="email"
            placeholder="you@company.com"
            autoComplete="email"
            {...register("email")}
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message} htmlFor="lead-phone">
          <Input
            id="lead-phone"
            type="tel"
            inputMode="tel"
            placeholder="+1 (555) 123-4567"
            autoComplete="tel"
            {...register("phone")}
          />
        </Field>
      </div>

      {/* Honeypot. Hidden from humans and from assistive tech, but a bot that
          fills every input will fill this one — and the API drops any
          submission that has it set. `hidden` is avoided in favour of
          off-screen positioning because some bots skip hidden inputs. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="lead-website">Website</label>
        <input id="lead-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <Field label="Company (optional)" htmlFor="lead-company">
        <Input id="lead-company" placeholder="Company name" autoComplete="organization" {...register("company")} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Service Needed" error={errors.service?.message} htmlFor="lead-service">
          <Controller
            control={control}
            name="service"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="lead-service" aria-label="Service needed">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field
          label="Budget Range"
          error={errors.budget?.message}
          htmlFor="lead-budget"
          action={
            <Controller
              control={control}
              name="currency"
              render={({ field }) => (
                <select
                  aria-label="Budget currency"
                  value={field.value}
                  onChange={(e) => {
                    // Marks the choice as deliberate so the mount effect's
                    // timezone guess can never overwrite it.
                    userPickedCurrency.current = true;
                    field.onChange(e.target.value as Currency);
                  }}
                  className="rounded-md border border-vx-border bg-transparent px-1.5 py-0.5 text-xs text-secondary outline-none focus-visible:border-purple-glow"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c} className="bg-surface text-primary">
                      {c}
                    </option>
                  ))}
                </select>
              )}
            />
          }
        >
          <Controller
            control={control}
            name="budget"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="lead-budget" aria-label="Budget range">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_BANDS.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b[currency]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>

      <Field label="Message (optional)" htmlFor="lead-message">
        <Textarea id="lead-message" placeholder="Tell us about your project..." {...register("message")} />
      </Field>

      {serverError && <p className="text-sm text-error">{serverError}</p>}

      <Button type="submit" size="lg" className="btn-glow mt-1 w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Let&apos;s Build Something <Sparkles className="size-4" />
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted">
        We respond within 24 hours. No spam, ever.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  action,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  /** Optional control rendered inline with the label, e.g. a currency picker. */
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={htmlFor}>{label}</Label>
        {action}
      </div>
      {children}
      {error && <span className={cn("text-xs text-error")}>{error}</span>}
    </div>
  );
}
