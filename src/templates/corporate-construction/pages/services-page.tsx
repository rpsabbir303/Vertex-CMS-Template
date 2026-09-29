import type { TemplatePageProps } from "@/registry/template-types";
import { getVisibleServices, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { ButtonLink } from "@/templates/shared/components/ui/button-link";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CorporatePageHero } from "@/templates/corporate-construction/components/corporate-page-hero";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";

export function CorporateConstructionServicesPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const services = getVisibleServices(props.payload.services);

  return (
    <CorporatePageFrame {...props}>
      <CorporatePageHero
        eyebrow="Services"
        title="Delivery disciplines for commercial and institutional work"
        summary="Each service is scoped to the project. The list below comes from the tenant's CMS services collection."
        image={services[0]?.image ?? company?.heroImage}
      />
      {services.length ? (
        <section aria-labelledby="services-list-heading">
          <h2 id="services-list-heading" className="sr-only">
            Service list
          </h2>
          <ol>
            {services.map((service, index) => (
              <li
                key={service.id}
                id={service.slug}
                className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <div className="vertex-container grid gap-8 py-14 lg:grid-cols-12 lg:py-20">
                  <p className="text-sm font-semibold tabular-nums text-[var(--color-secondary)] lg:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="min-w-0 lg:col-span-5">
                    <h3 className="text-balance font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-primary)]">
                      {service.title}
                    </h3>
                    {service.summary ? (
                      <p className="mt-4 text-pretty text-lg text-[var(--color-text)]">
                        {service.summary}
                      </p>
                    ) : null}
                    {service.description ? (
                      <p className="mt-4 text-pretty leading-relaxed text-[var(--color-text-muted)]">
                        {service.description}
                      </p>
                    ) : null}
                  </div>
                  {service.image?.url ? (
                    <div className="min-w-0 lg:col-span-6">
                      <CmsImageMedia
                        image={service.image}
                        aspect="card"
                        className="w-full"
                        sizes="(max-width: 1024px) 100vw, 42vw"
                      />
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : (
        <section className="vertex-container py-20">
          <p className="text-[var(--color-text-muted)]">Services have not been published yet.</p>
        </section>
      )}
      <section className="bg-[var(--color-primary)] text-[var(--color-text-inverse)]">
        <div className="vertex-container flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold">
            Not sure which service fits the site?
          </h2>
          <ButtonLink href={previewHref(props.mode, "/contact")}>Describe the project</ButtonLink>
        </div>
      </section>
    </CorporatePageFrame>
  );
}
