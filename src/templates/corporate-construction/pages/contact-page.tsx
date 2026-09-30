import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { ContactForm } from "@/templates/shared/components/forms/contact-form";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { PageIntro } from "@/templates/corporate-construction/components/ui/page-intro";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { pageSeoDescription } from "@/templates/corporate-construction/utils/page-seo";
import { resolveCorporateContact } from "@/templates/corporate-construction/utils/resolve-corporate-contact";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

export function CorporateConstructionContactPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const contact = resolveCorporateContact(company, unwrapEnvelope(props.payload.contact));
  const lead =
    pageSeoDescription(props.payload, "contact") ||
    (company?.name ? `Share scope, schedule, and site conditions with ${company.name}.` : undefined);

  const meta = [contact.phone, contact.email].filter((v): v is string => Boolean(v));

  return (
    <CorporatePageFrame {...props}>
      <PageIntro eyebrow="Contact" title="Start a project." lead={lead} meta={meta} compact />

      {!contact.hasAny ? (
        <section className="vertex-container pb-24">
          <p className="text-[var(--color-text-muted)]">
            Contact details and the inquiry form are not available for this tenant yet.
          </p>
        </section>
      ) : null}

      {contact.hasAny ? (
        <section className="bg-[var(--color-surface)]" aria-label="Contact">
          <div className="vertex-container grid gap-10 pb-24 lg:grid-cols-12 lg:gap-16 md:pb-32">
            {contact.hasDetails ? (
              <div className="lg:col-span-5">
                <dl className={cn("divide-y border-t", ui.rule)}>
                  {contact.phone ? (
                    <div className="grid grid-cols-[6rem_1fr] gap-4 py-5">
                      <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>Phone</dt>
                      <dd>
                        <a
                          href={`tel:${contact.phone.replace(/\s/g, "")}`}
                          className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)] hover:text-[var(--color-accent)]"
                        >
                          {contact.phone}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  {contact.email ? (
                    <div className="grid grid-cols-[6rem_1fr] gap-4 py-5">
                      <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>Email</dt>
                      <dd className="min-w-0">
                        <a
                          href={`mailto:${contact.email}`}
                          className="break-all font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-[var(--color-primary)] hover:text-[var(--color-accent)]"
                        >
                          {contact.email}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  {contact.addressBlock ? (
                    <div className="grid grid-cols-[6rem_1fr] gap-4 py-5">
                      <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>Office</dt>
                      <dd className="whitespace-pre-line text-base leading-relaxed text-[var(--color-primary)]">
                        {contact.addressBlock}
                      </dd>
                    </div>
                  ) : null}
                  {contact.hours.length ? (
                    <div className="grid grid-cols-[6rem_1fr] gap-4 py-5">
                      <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>Hours</dt>
                      <dd>
                        <ul className="space-y-1 text-base leading-relaxed text-[var(--color-primary)]">
                          {contact.hours.map((h) => (
                            <li key={h.days} className="flex justify-between gap-6">
                              <span>{h.days}</span>
                              <span className="text-[var(--color-text-muted)]">{h.hours}</span>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  ) : null}
                </dl>

                {contact.hasMap && contact.mapEmbedUrl ? (
                  <div className={cn(ui.plate, "mt-10 h-64")}>
                    <iframe
                      title="Office map"
                      src={contact.mapEmbedUrl}
                      className="h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                ) : null}
              </div>
            ) : null}

            <Reveal className={cn("lg:col-span-7", !contact.hasDetails && "lg:col-span-8 lg:col-start-3")}>
              {contact.hasForm && contact.form ? (
                <div className="rounded-[1.25rem] bg-[var(--color-surface-muted)] p-6 md:p-10 [&_button]:rounded-full [&_input]:rounded-lg [&_select]:rounded-lg [&_textarea]:rounded-lg">
                  <p className={ui.eyebrow}>Inquiry</p>
                  <h2 className={cn(ui.h3, "mt-3")}>Tell us about the project</h2>
                  <p className={cn(ui.small, "mt-3 max-w-lg")}>
                    Scope, schedule, and location are enough to start. Inquiries route to preconstruction or
                    field leadership.
                  </p>
                  <div className="mt-8">
                    <ContactForm config={contact.form} />
                  </div>
                </div>
              ) : (
                <div className="rounded-[1.25rem] bg-[var(--color-surface-muted)] p-6 md:p-10">
                  <h2 className={ui.h3}>Inquiry form unavailable</h2>
                  <p className={cn(ui.small, "mt-3")}>
                    The inquiry form is not enabled for this tenant.
                    {contact.phone || contact.email ? " Use the phone or email listed here instead." : null}
                  </p>
                </div>
              )}
            </Reveal>
          </div>
        </section>
      ) : null}
    </CorporatePageFrame>
  );
}
