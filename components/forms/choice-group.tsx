import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

export interface ChoiceOption {
  /** Submitted value. Must match the zod enum member exactly. */
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface ChoiceGroupProps {
  /** Visible group label. Also what a screen reader announces on entry. */
  legend: string;
  options: ChoiceOption[];
  /** `register("service")` — spread onto every radio in the group. */
  registration: UseFormRegisterReturn;
  variant?: "card" | "pill";
  error?: string;
  required?: boolean;
  /** Grid classes for the option container, e.g. "grid-cols-2 lg:grid-cols-3". */
  gridClassName?: string;
  action?: React.ReactNode;
}

/**
 * A radio group rendered as tappable cards or pills.
 *
 * Native `<input type="radio">` inside a `<label>`, visually hidden, styled via
 * `:has(:checked)` on the label. Deliberately NOT a row of buttons with roving
 * tabindex: the native control already gives arrow-key navigation within the
 * group, a single Tab stop for the whole group, and "AI Automation, radio
 * button, 3 of 11, selected" from a screen reader — all of which the button
 * version has to reimplement in JS and usually gets subtly wrong. There is also
 * no radio-group primitive in components/ui to build on.
 *
 * The container is `role="radiogroup"` + `aria-labelledby` rather than
 * `<fieldset>` + `<legend>`, because the budget group needs a currency picker
 * on the label row. A `<legend>` only labels its fieldset when it is the
 * fieldset's FIRST child, so the moment anything shares that row the legend
 * stops naming the group and it announces as unlabelled — with no visible
 * symptom. `role="radiogroup"` maps to the identical `group` node in the
 * accessibility tree and lets the label row be an ordinary flex box.
 *
 * react-hook-form's `register` handles same-named radios natively, so neither
 * group needs a Controller.
 *
 * The selected/hover BORDER colours live in `.option-card` / `.option-pill` in
 * globals.css, not in `has-[:checked]:border-*` utilities here. See the comment
 * on those classes: the unlayered `* { border-color }` rule beats any layered
 * border utility, so the Tailwind version silently does nothing.
 */
export function ChoiceGroup({
  legend,
  options,
  registration,
  variant = "card",
  error,
  required,
  gridClassName,
  action,
}: ChoiceGroupProps) {
  const errorId = `${registration.name}-error`;
  const labelId = `${registration.name}-label`;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span id={labelId} className="text-sm font-medium text-slate-800 dark:text-white/90">
          {legend}
          {required && (
            <span className="ml-0.5 text-error" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {action}
      </div>

      <div
        role="radiogroup"
        aria-labelledby={labelId}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        className={cn("grid gap-2", gridClassName)}
      >
        {options.map(({ value, label, icon: Icon }) => (
          <label
            key={value}
            className={cn(
              "group relative cursor-pointer select-none",
              variant === "card"
                ? "option-card flex min-h-[4.25rem] flex-col items-center justify-center gap-1.5 rounded-xl px-2.5 py-3 text-center text-slate-800 dark:text-white/90"
                : "option-pill flex min-h-10 items-center justify-center rounded-full px-3.5 py-2 text-center text-xs font-medium sm:text-sm text-slate-700 dark:text-white/80",
            )}
          >
            <input
              type="radio"
              value={value}
              className="sr-only"
              {...registration}
            />

            {Icon && (
              <Icon
                className="size-5 text-[#7138FF] transition-transform duration-[200ms] group-hover:scale-110 dark:text-[#8B4DFF]"
                aria-hidden="true"
              />
            )}

            <span
              className={cn(
                "font-medium leading-tight",
                variant === "card" ? "text-[0.72rem] sm:text-xs" : "text-sm",
              )}
            >
              {label}
            </span>

            {variant === "card" && (
              <span
                aria-hidden="true"
                className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-[#7138FF] opacity-0 shadow-xs transition-opacity duration-[200ms] group-has-[:checked]:opacity-100 dark:bg-[#8B4DFF]"
              >
                <Check className="size-2.5 text-white" strokeWidth={3} />
              </span>
            )}
          </label>
        ))}
      </div>

      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}
