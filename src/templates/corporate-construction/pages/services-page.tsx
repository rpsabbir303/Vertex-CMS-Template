import type { TemplatePageProps } from "@/registry/template-types";
import { getVisibleServices, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CorporateServicesHero } from "@/templates/corporate-construction/components/corporate-services-hero";
import { ServicesCapabilityField } from "@/templates/corporate-construction/components/services-capability-field";
import { ServicesFeatured } from "@/templates/corporate-construction/components/services-featured";
import {
  planServicesField,
  planServicesPair,
} from "@/templates/corporate-construction/components/services-field-plan";
import { CorporateServicesCta } from "@/templates/corporate-construction/sections/services-cta";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";

const DEFAULT_TITLE = "Capabilities";
const DEFAULT_DESCRIPTION =
  "Each service is scoped to the project. Offerings below come from the tenant services collection.";

export function CorporateConstructionServicesPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const collection = unwrapEnvelope(props.payload.services);
  const services = getVisibleServices(props.payload.services);
  const section = collection?.section;
  const count = services.length;

  const title = section?.title?.trim() || DEFAULT_TITLE;
  const eyebrow = section?.eyebrow?.trim() || "Services";
  const description = section?.description?.trim() || DEFAULT_DESCRIPTION;
  const heroImage = services.find((s) => s.image?.url)?.image ?? company?.heroImage ?? null;
  const contactHref = previewHref(props.mode, "/contact");

  return (
    <CorporatePageFrame {...props}>
      <CorporateServicesHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        image={heroImage}
        ctaHref={contactHref}
        ctaLabel="Start a conversation"
      />

      {!count ? (
        <section className="vertex-container py-16 md:py-20">
          <p className="text-[var(--color-text-muted)]">
            Services have not been published yet.
          </p>
        </section>
      ) : null}

      {count === 1 && services[0] ? (
        <ServicesFeatured service={services[0]} index={0} />
      ) : null}

      {count === 2 ? (
        <ServicesCapabilityField
          services={services}
          startIndex={0}
          plan={planServicesPair()}
          heading="Service offering"
        />
      ) : null}

      {count >= 3 && services[0] ? (
        <>
          <ServicesFeatured service={services[0]} index={0} />
          <ServicesCapabilityField
            services={services.slice(1)}
            startIndex={1}
            plan={planServicesField(services.length - 1)}
            heading="Additional capabilities"
          />
        </>
      ) : null}

      {count > 0 ? (
        <CorporateServicesCta mode={props.mode} companyName={company?.name} />
      ) : null}
    </CorporatePageFrame>
  );
}
