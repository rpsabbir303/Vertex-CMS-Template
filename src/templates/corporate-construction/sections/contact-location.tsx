import type { ResolvedCorporateContact } from "@/templates/corporate-construction/utils/resolve-corporate-contact";

type ContactLocationSectionProps = {
  contact: ResolvedCorporateContact;
};

/**
 * Optional map embed only. Address/hours live in ContactDetails to avoid duplication.
 */
export function ContactLocationSection({ contact }: ContactLocationSectionProps) {
  if (!contact.hasMap || !contact.mapEmbedUrl) {
    return null;
  }

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="contact-location-heading"
    >
      <div className="vertex-container py-12 md:py-14">
        <div className="max-w-xl border-l-2 border-[var(--color-accent)] pl-5 md:pl-6">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
            Location
          </p>
          <h2
            id="contact-location-heading"
            className="mt-3 text-balance break-words font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-primary)] md:text-3xl"
          >
            Office location
          </h2>
          {contact.addressInline ? (
            <p className="mt-3 text-pretty break-words text-sm leading-relaxed text-[var(--color-text-muted)]">
              {contact.addressInline}
            </p>
          ) : null}
        </div>
        <div className="mt-8 overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <iframe
            title="Office map"
            src={contact.mapEmbedUrl}
            className="aspect-[16/9] w-full min-h-[14rem] border-0 md:min-h-[18rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
