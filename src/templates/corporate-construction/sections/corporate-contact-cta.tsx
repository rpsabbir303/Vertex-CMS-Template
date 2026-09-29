import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Company } from "@/templates/shared/cms/types/company";
import type { Contact } from "@/templates/shared/cms/types/contact";
import { ContactForm } from "@/templates/shared/components/forms/contact-form";
import { resolveCorporateContact } from "@/templates/corporate-construction/utils/resolve-corporate-contact";

type CorporateContactCtaProps = {
  company: Company;
  contact: Contact | null;
  mode: TemplateRenderMode;
};

export function CorporateContactCta({
  company,
  contact,
  mode,
}: CorporateContactCtaProps) {
  const resolved = resolveCorporateContact(company, contact);
  const { phone, email, addressInline, hours, form, hasDetails, hasForm } = resolved;

  if (!hasDetails && !hasForm) {
    return null;
  }

  const previewBase =
    mode === "preview" ? "/preview/corporate-construction" : "";
  const contactPageHref = `${previewBase}/contact`;

  return (
    <section
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="corporate-contact-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-12">
          <div className="min-w-0 border-l-2 border-[var(--color-accent)] pl-5 md:pl-7 lg:col-span-5">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
              Project inquiry
            </p>
            <h2
              id="corporate-contact-heading"
              className="mt-3 max-w-md text-balance break-words font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] text-[var(--color-primary)] md:text-5xl"
            >
              Start a project conversation
            </h2>
            <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
              Share scope, schedule, and location details. Our preconstruction team routes
              inquiries to the appropriate estimator or operations lead.
            </p>
            {hasDetails ? (
              <ul className="mt-8 space-y-4 border-t border-[var(--color-border)] pt-8 text-sm md:text-base">
                {phone ? (
                  <li>
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                      Phone
                    </span>
                    <a
                      className="mt-1 inline-flex min-h-11 items-center font-medium text-[var(--color-primary)] hover:underline"
                      href={`tel:${phone.replace(/\s/g, "")}`}
                    >
                      {phone}
                    </a>
                  </li>
                ) : null}
                {email ? (
                  <li>
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                      Email
                    </span>
                    <a
                      className="mt-1 inline-flex min-h-11 items-center break-all font-medium text-[var(--color-primary)] hover:underline"
                      href={`mailto:${email}`}
                    >
                      {email}
                    </a>
                  </li>
                ) : null}
                {addressInline ? (
                  <li>
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                      Office
                    </span>
                    <span className="mt-1 block text-pretty break-words text-[var(--color-text)]">
                      {addressInline}
                    </span>
                  </li>
                ) : null}
                {hours.map((entry) => (
                  <li key={`${entry.days}-${entry.hours}`}>
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                      {entry.days}
                    </span>
                    <span className="mt-1 block text-pretty break-words text-[var(--color-text)]">
                      {entry.hours}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-8 text-sm">
              <Link
                href={contactPageHref}
                className="inline-flex min-h-11 items-center font-medium text-[var(--color-secondary)] underline-offset-4 hover:text-[var(--color-primary)] hover:underline"
              >
                View full contact details
              </Link>
            </p>
          </div>

          {hasForm && form ? (
            <div className="min-w-0 lg:col-span-7">
              <div className="border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6 md:p-8 [&_button]:rounded-none [&_input]:rounded-none [&_select]:rounded-none [&_textarea]:rounded-none">
                <ContactForm config={form} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
