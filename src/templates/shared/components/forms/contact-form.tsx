"use client";

import { useState } from "react";
import type { ContactFormConfig } from "@/templates/shared/cms/types/contact";
import { cn } from "@/utils/cn";

type ContactFormProps = {
  config?: ContactFormConfig | null;
  className?: string;
};

type FieldErrors = Record<string, string>;

function validateField(
  value: string,
  type: string,
  required: boolean,
): string | null {
  if (required && !value.trim()) {
    return "This field is required.";
  }
  if (type === "email" && value.trim()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      return "Enter a valid email address.";
    }
  }
  return null;
}

export function ContactForm({ config, className }: ContactFormProps) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  if (!config?.enabled || !config.fields.length) {
    return null;
  }

  if (submitted) {
    return (
      <div
        role="status"
        className={cn(
          "rounded border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6 text-[var(--color-text)]",
          className,
        )}
      >
        <p className="text-pretty font-medium">
          {config.successMessage ?? "Thank you. Your message has been received."}
        </p>
      </div>
    );
  }

  return (
    <form
      className={cn("grid gap-4", className)}
      action="#"
      method="post"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const nextErrors: FieldErrors = {};

        for (const field of config.fields) {
          const el = form.elements.namedItem(field.name);
          const value =
            el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement
              ? el.value
              : el instanceof HTMLSelectElement
                ? el.value
                : "";
          const message = validateField(value, field.type, field.required);
          if (message) {
            nextErrors[field.id] = message;
          }
        }

        setErrors(nextErrors);
        if (Object.keys(nextErrors).length === 0) {
          setSubmitted(true);
        }
      }}
    >
      {config.fields.map((field) => {
        const error = errors[field.id];
        const inputClass = cn(
          "w-full min-h-11 rounded border bg-[var(--color-surface)] px-3 py-2 text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          error
            ? "border-red-600 focus-visible:outline-red-600"
            : "border-[var(--color-border)] focus-visible:outline-[var(--color-focus)]",
        );

        return (
          <div key={field.id} className="grid gap-1.5">
            <label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {field.required ? (
                <span className="text-[var(--color-text-muted)]"> (required)</span>
              ) : null}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                name={field.name}
                required={field.required}
                rows={5}
                aria-required={field.required}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${field.id}-error` : undefined}
                className={inputClass}
              />
            ) : field.type === "select" ? (
              <select
                id={field.id}
                name={field.name}
                required={field.required}
                defaultValue=""
                aria-required={field.required}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${field.id}-error` : undefined}
                className={inputClass}
              >
                <option value="" disabled>
                  Select…
                </option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.id}
                name={field.name}
                type={field.type}
                required={field.required}
                aria-required={field.required}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${field.id}-error` : undefined}
                className={inputClass}
              />
            )}
            {error ? (
              <p id={`${field.id}-error`} className="text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}
          </div>
        );
      })}
      <button
        type="submit"
        className="min-h-11 rounded bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-inverse)] hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
      >
        {config.submitLabel ?? "Submit"}
      </button>
    </form>
  );
}
