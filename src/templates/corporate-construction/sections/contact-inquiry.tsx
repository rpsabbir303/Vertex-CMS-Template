import { ContactForm } from "@/templates/shared/components/forms/contact-form";
import { ContactDetails } from "@/templates/corporate-construction/components/contact-details";
import { CONTACT_INQUIRY_SECTION_ID } from "@/templates/corporate-construction/components/corporate-contact-hero";
import type { ResolvedCorporateContact } from "@/templates/corporate-construction/utils/resolve-corporate-contact";

type ContactInquirySectionProps = {
  contact: ResolvedCorporateContact;
  companyName?: string;
};

export function ContactInquirySection({
  contact,
  companyName,
}: ContactInquirySectionProps) {
  if (!contact.hasDetails && !contact.hasForm) {
    return (
      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="vertex-container py-14 md:py-16">
          <p className="text-[var(--color-text-muted)]">
            Contact details and the inquiry form are not available for this tenant yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id={CONTACT_INQUIRY_SECTION_ID}
      className="scroll-mt-28 border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      aria-labelledby={
        contact.hasDetails ? "contact-details-heading" : "contact-form-heading"
      }
    >
      <div className="vertex-container grid gap-10 py-12 md:gap-12 md:py-14 lg:grid-cols-12 lg:gap-x-12 lg:py-16">
        {contact.hasDetails ? (
          <div className="min-w-0 lg:col-span-4">
            <ContactDetails contact={contact} companyName={companyName} />
          </div>
        ) : null}

        <div
          className={
            contact.hasDetails
              ? "min-w-0 lg:col-span-8"
              : "min-w-0 lg:col-span-8 lg:col-start-3"
          }
        >
          {contact.hasForm && contact.form ? (
            <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8 [&_button]:rounded-none [&_input]:rounded-none [&_select]:rounded-none [&_textarea]:rounded-none">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
                Inquiry
              </p>
              <h2
                id="contact-form-heading"
                className="mt-3 text-balance break-words font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-primary)] md:text-3xl"
              >
                Project inquiry
              </h2>
              <p className="mt-3 max-w-xl text-pretty break-words text-sm leading-relaxed text-[var(--color-text-muted)]">
                Share scope, schedule, and location details. The team routes inquiries to
                preconstruction or field leadership as needed.
              </p>
              <div className="mt-8">
                <ContactForm config={contact.form} />
              </div>
            </div>
          ) : (
            <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8">
              <h2
                id="contact-form-heading"
                className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-primary)]"
              >
                Inquiry form unavailable
              </h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-[var(--color-text-muted)]">
                The inquiry form is not enabled for this tenant.
                {contact.phone || contact.email
                  ? " Use the phone or email listed here instead."
                  : null}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
