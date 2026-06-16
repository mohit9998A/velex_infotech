"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import {
  leadFormSchema,
  type LeadFormValues,
  SERVICE_OPTIONS,
  BUDGET_OPTIONS,
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

export function LeadForm({ defaultService, onSuccess }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
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
      message: "",
      source: typeof window !== "undefined" ? window.location.href : "",
    },
  });

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
          Thank you. The Velex team will respond within 24 hours. For anything
          urgent, reach us on WhatsApp.
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
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
            placeholder="+91 ..."
            autoComplete="tel"
            {...register("phone")}
          />
        </Field>
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
        <Field label="Budget Range" error={errors.budget?.message} htmlFor="lead-budget">
          <Controller
            control={control}
            name="budget"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="lead-budget" aria-label="Budget range">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_OPTIONS.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
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
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <span className={cn("text-xs text-error")}>{error}</span>}
    </div>
  );
}
