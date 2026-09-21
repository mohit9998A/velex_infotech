"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig, markets } from "@/config/site";
import { getServiceIconByTitle } from "@/lib/icons";
import {
  leadFormSchema,
  type Currency,
  type LeadFormValues,
  SERVICE_OPTIONS,
  BUDGET_BANDS,
  CURRENCIES,
  MESSAGE_MAX_LENGTH,
} from "@/lib/validations/lead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChoiceGroup } from "@/components/forms/choice-group";
import { PhoneField } from "@/components/forms/phone-field";

interface LeadFormProps {
  defaultService?: string;
  onSuccess?: () => void;
  /**
   * Pins the submit block to the bottom of the nearest scrolling ancestor.
   * Only meaningful when the form is inside its own scroll container — i.e.
   * the modal's right column. /contact leaves it off.
   */
  stickySubmit?: boolean;
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

/**
 * The phone country rides the SAME guess, mapped through `markets`, rather
 * than parsing the timezone a second time — one signal, one place to be wrong.
 * Constant on the server for the reason above; corrected in the mount effect.
 */
const DEFAULT_PHONE_COUNTRY = "US";

function countryForCurrency(currency: Currency): string {
  return (
    markets.find((m) => m.currency === currency)?.countryCode ??
    DEFAULT_PHONE_COUNTRY
  );
}

export function LeadForm({
  defaultService,
  onSuccess,
  stickySubmit,
}: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [phoneCountry, setPhoneCountry] = useState(DEFAULT_PHONE_COUNTRY);
  /** Set once the visitor picks a currency, so the mount effect can't override them. */
  const userPickedCurrency = useRef(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
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
  const message = useWatch({ control, name: "message" }) ?? "";

  // Timezone and location are CLIENT facts. Reading them after mount is what
  // guarantees the server HTML and the first client render are identical.
  useEffect(() => {
    if (!userPickedCurrency.current) {
      const guess = guessCurrency();
      setPhoneCountry(countryForCurrency(guess));
      if (guess !== DEFAULT_CURRENCY) {
        setValue("currency", guess, { shouldDirty: false, shouldValidate: false });
      }
    }
    setValue("source", window.location.href, { shouldDirty: false });
  }, [setValue]);

  const serviceOptions = useMemo(
    () =>
      SERVICE_OPTIONS.map((title) => ({
        value: title,
        label: title,
        icon: getServiceIconByTitle(title),
      })),
    [],
  );

  const budgetOptions = useMemo(
    () =>
      BUDGET_BANDS.map((b) => ({ value: b.id, label: b[currency] })),
    [currency],
  );

  const onSubmit = async (values: LeadFormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setSubmitted(true);
        onSuccess?.();
        return;
      }

      // The route's 422 carries `issues: parsed.error.flatten()`, which this
      // form used to throw away — every server-side rejection surfaced as the
      // same generic banner with no indication of which field was wrong. That
      // matters more now that the phone value is composed from two controls,
      // so client and server have one more way to disagree.
      if (res.status === 422) {
        const body = (await res.json().catch(() => null)) as {
          issues?: {
            fieldErrors?: Record<string, string[]>;
            formErrors?: string[];
          };
        } | null;
        const fieldErrors = body?.issues?.fieldErrors ?? {};
        let mapped = false;
        for (const [field, messages] of Object.entries(fieldErrors)) {
          if (!messages?.length) continue;
          // The honeypot is never shown, so an error on it has nowhere to go.
          if (field === "website") continue;
          setError(field as keyof LeadFormValues, {
            type: "server",
            message: messages[0],
          });
          mapped = true;
        }
        setServerError(
          mapped ? null : "Please check the highlighted fields and try again.",
        );
        return;
      }

      if (res.status === 429) {
        setServerError(
          "Too many submissions from this connection. Please try WhatsApp or email us directly.",
        );
        return;
      }

      throw new Error("Request failed");
    } catch {
      setServerError(
        "Something went wrong. Please try WhatsApp or email us directly.",
      );
    }
  };

  if (submitted) {
    return (
      // `role="status"` because the form is REPLACED rather than added to — a
      // screen-reader user otherwise gets no confirmation at all, just a
      // vanished form.
      <div
        role="status"
        className="flex flex-col items-center gap-4 py-8 text-center"
      >
        <CheckCircle2 className="size-12 text-success" />
        <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-primary">
          Request received
        </h3>
        <p className="max-w-xs font-sans text-sm text-secondary leading-relaxed">
          Thank you. The Velex team will respond within one business day. For
          anything urgent, reach us on WhatsApp.
        </p>
        <Button variant="gold" className="font-sans font-semibold rounded-full" asChild>
          <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
            Message us on WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  return (
    // `@container`, not viewport breakpoints. This form renders in two columns
    // of very different widths — ~713px in the modal, ~497px on /contact
    // (max-w-6xl split 1fr/1.1fr) — so any `sm:`/`lg:` grid that suits one is
    // wrong in the other. Sizing off the column makes both correct from one
    // implementation. `container-type: inline-size` makes this a containing
    // block for absolute children, but the form was already `relative`, so the
    // honeypot's -9999px offset resolves exactly as before.
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="@container relative flex flex-col gap-5"
      noValidate
    >
      <Field label="Full Name" required error={errors.name?.message} htmlFor="lead-name">
        <Input
          id="lead-name"
          inputSize="lg"
          placeholder="Your full name"
          autoComplete="name"
          {...register("name")}
        />
      </Field>

      <Field label="Email" required error={errors.email?.message} htmlFor="lead-email">
        <Input
          id="lead-email"
          inputSize="lg"
          type="email"
          inputMode="email"
          placeholder="you@company.com"
          autoComplete="email"
          {...register("email")}
        />
      </Field>

      <Field
        label="Phone (WhatsApp preferred)"
        required
        error={errors.phone?.message}
        htmlFor="lead-phone"
      >
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <PhoneField
              id="lead-phone"
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              country={phoneCountry}
              onCountryChange={setPhoneCountry}
            />
          )}
        />
      </Field>

      {/* Honeypot. Hidden from humans and from assistive tech, but a bot that
          fills every input will fill this one — and the API drops any
          submission that has it set. `hidden` is avoided in favour of
          off-screen positioning because some bots skip hidden inputs. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="lead-website">Website</label>
        <input id="lead-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <Field label="Company (optional)" htmlFor="lead-company">
        <Input
          id="lead-company"
          inputSize="lg"
          placeholder="Company name"
          autoComplete="organization"
          {...register("company")}
        />
      </Field>

      {/* Every SERVICE_OPTIONS entry gets a card, and the label is the constant
          VERBATIM. Shortening "AI Agent Development" to "AI Agent" for the tile
          would create a second source of truth for a string that has to
          byte-match content/services.json — which is exactly the silent drift
          `npm run verify:content` exists to catch. */}
      <ChoiceGroup
        legend="What are you looking for?"
        required
        options={serviceOptions}
        registration={register("service")}
        error={errors.service?.message}
        gridClassName="grid-cols-2 @2xl:grid-cols-3"
      />

      <ChoiceGroup
        legend="Project budget"
        required
        variant="pill"
        options={budgetOptions}
        registration={register("budget")}
        error={errors.budget?.message}
        gridClassName="grid-cols-2 @2xl:grid-cols-4 [&>*:last-child]:col-span-full"
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
                className="rounded-md border border-slate-200 bg-white/80 px-2 py-0.5 text-xs text-slate-700 outline-none focus-visible:border-[#7138FF] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/80 dark:focus-visible:border-[#8B4DFF]"
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c} className="bg-white text-slate-900 dark:bg-[#0A0818] dark:text-white">
                    {c}
                  </option>
                ))}
              </select>
            )}
          />
        }
      />

      <Field
        label="Tell us about your project"
        htmlFor="lead-message"
        action={
          <span
            className={cn(
              "text-xs tabular-nums",
              message.length > MESSAGE_MAX_LENGTH * 0.9
                ? "text-warning"
                : "text-slate-500 dark:text-white/50",
            )}
          >
            {message.length} / {MESSAGE_MAX_LENGTH}
          </span>
        }
      >
        <Textarea
          id="lead-message"
          inputSize="lg"
          maxLength={MESSAGE_MAX_LENGTH}
          placeholder={
            'Example: "I want to automate customer support using an AI chatbot integrated with WhatsApp and our CRM."'
          }
          {...register("message")}
        />
      </Field>

      {serverError && (
        <p role="alert" className="text-sm text-error">
          {serverError}
        </p>
      )}

      {/* Each line below is a claim the /privacy-policy page can be checked
          against in one click, which is the bar AGENTS.md sets. "Only our team
          sees it" is §4 ("access is limited to team members who need it"); the
          footer line is §3 ("solely to respond to your enquiry… we do not sell
          your personal information"). Do not upgrade either to "we never share
          your information" — the site runs Google Analytics and sends lead mail
          through an SMTP provider, so that one is falsifiable. */}
      <ul className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        {[
          { icon: ShieldCheck, title: "100% confidential", note: "Only our team sees it" },
          { icon: Mail, title: "No spam, ever", note: "We respect your inbox" },
          { icon: Zap, title: "Quick response", note: "Within one business day" },
        ].map(({ icon: Icon, title, note }) => (
          <li key={title} className="flex items-center gap-2">
            <Icon className="size-4 shrink-0 text-[#7138FF] dark:text-[#8B4DFF]" aria-hidden="true" />
            <span className="text-xs leading-tight">
              <span className="block font-medium text-slate-800 dark:text-white/90">{title}</span>
              <span className="block text-slate-500 dark:text-white/60">{note}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* The submit block pins to the bottom of the scrolling column inside the
          modal, so the CTA is on screen from the moment the form opens rather
          than one full scroll below the fold.
          Gated on the prop rather than always-on: on /contact the nearest
          scrollport is the PAGE, so an unconditional `sticky bottom-0` would
          float the button over the page while the form is in view. The negative
          margins bleed the bar to the column's edges, cancelling the column's
          own padding. */}
      <div
        className={cn(
          "flex flex-col gap-3",
          stickySubmit &&
            "sticky bottom-0 z-10 -mx-5 mt-1 border-t border-slate-200/80 bg-white/95 px-5 pb-5 pt-4 backdrop-blur-md sm:-mx-8 sm:px-8 sm:pb-8 lg:-mx-10 lg:px-10 lg:pb-8 dark:border-white/10 dark:bg-[#0A0818]/95",
        )}
      >
        <Button
          type="submit"
          size="xl"
          className="btn-gradient btn-glow w-full flex-col gap-0.5 rounded-xl py-3.5"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" /> Sending...
            </span>
          ) : (
            <>
              <span className="flex items-center gap-2 font-semibold tracking-wide">
                <Sparkles className="size-4" /> Get My Free Strategy Call
              </span>
              <span className="text-xs font-normal opacity-85">
                No obligation. We reply within one business day.
              </span>
            </>
          )}
        </Button>

        <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-xs text-slate-500 dark:text-white/60">
          <Lock className="size-3.5 shrink-0 text-slate-400 dark:text-white/40" aria-hidden="true" />
          <span>
            Your details are only used to answer your enquiry, and we never sell
            them.
          </span>
          {/* Opens in a new tab on purpose: the alternative is navigating a
              visitor away from a half-filled form to read a privacy policy. */}
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-slate-700 hover:text-[#7138FF] transition-colors dark:text-white/80 dark:hover:text-[#8B4DFF]"
          >
            Privacy policy
          </a>
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  action,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  /** Optional control rendered inline with the label, e.g. a character count. */
  action?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={htmlFor} className="text-xs sm:text-sm font-medium text-slate-800 dark:text-white/90">
          {label}
          {required && (
            <span className="ml-0.5 text-error" aria-hidden="true">
              *
            </span>
          )}
        </Label>
        {action}
      </div>
      {children}
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
}
