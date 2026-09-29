import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { ContactForm } from "@/templates/shared/components/forms/contact-form";
import {
  CONTACT_INQUIRY_SECTION_ID,
  CorporateContactHero,
} from "@/templates/corporate-construction/components/corporate-contact-hero";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { formatAddress } from "@/utils/format-address";

const DEFAULT_CONTACT_HERO_TITLE = "Start a project conversation";

function contactPageSeo(payload: TemplatePageProps["payload"]) {
  return unwrapEnvelope(payload.pageSeo)?.find((entry) => entry.pageSlug === "contact");
}

export function CorporateConstructionContactPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const contact = unwrapEnvelope(props.payload.contact);
  const pageSeo = contactPageSeo(props.payload);

  const phone = contact?.phone ?? company?.phone;
  const email = contact?.email ?? company?.email;
  const address = contact?.address ?? company?.address;
  const addressBlock = address ? formatAddress(address) : null;

  const heroEyebrow = pageSeo?.title?.trim();
  const heroDescription = pageSeo?.description?.trim();
  const heroImage = company?.heroImage?.url ? company.heroImage : null;

  return (
    <CorporatePageFrame {...props}>
      <CorporateContactHero
        eyebrow={heroEyebrow}
        title={DEFAULT_CONTACT_HERO_TITLE}
        description={heroDescription}
        image={heroImage}
        phone={phone}
        email={email}
        address={address ?? null}
        inquiryCta={Boolean(contact?.form?.enabled)}
      />
      <section
        id={CONTACT_INQUIRY_SECTION_ID}
        className="bg-[var(--color-surface-muted)] scroll-mt-28"
      >
        <div className="vertex-container grid gap-12 py-[var(--spacing-section-y-lg)] lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-4">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-primary)]">
              Office
            </h2>
            <ul className="mt-6 space-y-5 text-[var(--color-text)]">
              {phone ? (
                <li>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    Phone
                  </p>
                  <a className="mt-1 inline-block hover:underline" href={`tel:${phone.replace(/\s/g, "")}`}>
                    {phone}
                  </a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    Email
                  </p>
                  <a className="mt-1 inline-block break-all hover:underline" href={`mailto:${email}`}>
                    {email}
                  </a>
                </li>
              ) : null}
              {addressBlock ? (
                <li>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    Address
                  </p>
                  <p className="mt-1 whitespace-pre-line text-pretty">{addressBlock}</p>
                </li>
              ) : null}
              {contact?.hours?.map((entry) => (
                <li key={entry.days}>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    {entry.days}
                  </p>
                  <p className="mt-1">{entry.hours}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8 lg:col-span-8">
            {contact?.form?.enabled ? (
              <ContactForm config={contact.form} />
            ) : (
              <p className="text-[var(--color-text-muted)]">
                The inquiry form is not enabled for this tenant. Use the phone or email if they are listed.
              </p>
            )}
          </div>
        </div>
      </section>
    </CorporatePageFrame>
  );
}
