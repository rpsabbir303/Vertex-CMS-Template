import type { ResolvedCorporateContact } from "@/templates/corporate-construction/utils/resolve-corporate-contact";

type ContactDetailsProps = {
  contact: ResolvedCorporateContact;
  companyName?: string;
  headingId?: string;
};

export function ContactDetails({
  contact,
  companyName,
  headingId = "contact-details-heading",
}: ContactDetailsProps) {
  if (!contact.hasDetails) {
    return null;
  }

  return (
    <div className="min-w-0">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
        Reach the office
      </p>
      <h2
        id={headingId}
        className="mt-3 max-w-sm text-balance break-words font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-primary)] md:text-3xl"
      >
        {companyName ? `${companyName} contact` : "Project contact"}
      </h2>
      <p className="mt-3 max-w-sm text-pretty break-words text-sm leading-relaxed text-[var(--color-text-muted)]">
        Call, email, or visit the office before or after submitting an inquiry.
      </p>

      <ul className="mt-8 space-y-0 border-t border-[var(--color-border)]">
        {contact.phone ? (
          <li className="min-w-0 border-b border-[var(--color-border)] py-4">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
              Phone
            </p>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="mt-1.5 inline-flex min-h-11 max-w-full items-center break-words text-base font-medium text-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:underline"
            >
              {contact.phone}
            </a>
          </li>
        ) : null}

        {contact.email ? (
          <li className="min-w-0 border-b border-[var(--color-border)] py-4">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
              Email
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-1.5 inline-flex min-h-11 max-w-full items-center break-all text-base font-medium text-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:underline"
            >
              {contact.email}
            </a>
          </li>
        ) : null}

        {contact.addressBlock ? (
          <li className="min-w-0 border-b border-[var(--color-border)] py-4">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
              Office
            </p>
            <p className="mt-1.5 whitespace-pre-line text-pretty break-words text-base leading-relaxed text-[var(--color-text)]">
              {contact.addressBlock}
            </p>
          </li>
        ) : null}

        {contact.hours.map((entry) => (
          <li
            key={`${entry.days}-${entry.hours}`}
            className="min-w-0 border-b border-[var(--color-border)] py-4"
          >
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
              {entry.days}
            </p>
            <p className="mt-1.5 text-pretty break-words text-base leading-relaxed text-[var(--color-text)]">
              {entry.hours}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
