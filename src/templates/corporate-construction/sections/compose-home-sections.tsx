import type { ReactNode } from "react";
import type { TemplateRenderMode, TemplateSectionId } from "@/registry/template-types";
import type { CmsSitePayload } from "@/templates/shared/cms/types";
import type { Company } from "@/templates/shared/cms/types/company";
import {
  getSortedCollectionItems,
  getVisibleServices,
  hasOptionalSection,
  unwrapCollectionItems,
  unwrapEnvelope,
} from "@/templates/shared/cms/resolve-content";
import { corporateHomeSectionOrder } from "@/templates/corporate-construction/config/home-sections";
import { CorporateCraftsmanship } from "./corporate-craftsmanship";
import { CorporateDelivery } from "./corporate-delivery";
import { CorporateContactCta } from "./corporate-contact-cta";
import { CorporateHero } from "./corporate-hero";
import { CorporateHomeMetrics, buildHomeMetrics } from "./corporate-home-metrics";
import { CorporateLeadership } from "./corporate-leadership";
import { CorporateProjects } from "./corporate-projects";
import { CorporateProofStrip } from "./corporate-proof-strip";
import { CorporateServices } from "./corporate-services";
import { CorporateTestimonials } from "./corporate-testimonials";

type ComposeOptions = {
  order?: TemplateSectionId[];
};

export function getCorporateHeroCompany(company: Company): Company {
  return {
    ...company,
    description: getHeroDescription(company.description),
  };
}

export function composeCorporateHomeSections(
  payload: CmsSitePayload,
  mode: TemplateRenderMode,
  options?: ComposeOptions,
): ReactNode[] {
  const order = options?.order ?? corporateHomeSectionOrder;
  const company = unwrapEnvelope(payload.company);
  const contact = unwrapEnvelope(payload.contact);
  const services = getVisibleServices(payload.services);
  const servicesCopy = unwrapEnvelope(payload.services)?.section;
  const allProjects = getSortedCollectionItems(payload.projects);
  const featuredProjects = allProjects.filter((p) => p.featured);
  const team = getSortedCollectionItems(payload.team);
  const testimonials = getSortedCollectionItems(payload.testimonials);
  const certifications = unwrapCollectionItems(payload.certifications);

  if (!company) {
    return [
      <section key="empty" className="vertex-container py-24">
        <p className="text-[var(--color-text-muted)]">
          Company information is unavailable. This template does not display placeholder
          marketing content when CMS data is missing.
        </p>
      </section>,
    ];
  }

  const capabilityMeta =
    services.length > 0
      ? `${services.length} ${services.length === 1 ? "capability" : "capabilities"}`
      : undefined;

  const proofVisible =
    Boolean(company.foundedYear) ||
    Boolean(company.address) ||
    certifications.length > 0 ||
    services.length > 0;

  const metricItems = buildHomeMetrics({
    foundedYear: company.foundedYear,
    projectCount: allProjects.length,
    serviceCount: services.length,
    teamCount: team.length,
  });

  // Leadership image: prefer a featured project photo so the section differs from the hero.
  const leadershipImage =
    featuredProjects.find((p) => p.image?.url)?.image ??
    allProjects.find((p) => p.image?.url)?.image ??
    (company.heroImage?.url ? company.heroImage : null);

  const sectionMap: Record<TemplateSectionId, ReactNode | null> = {
    hero: (
      <CorporateHero
        key="hero"
        company={getCorporateHeroCompany(company)}
        mode={mode}
        capabilityMeta={capabilityMeta}
      />
    ),
    "trust-credentials": proofVisible ? (
      <CorporateProofStrip
        key="proof"
        company={company}
        certifications={certifications}
        serviceCount={services.length}
      />
    ) : null,
    services:
      hasOptionalSection(payload.services) && services.length ? (
        <CorporateServices
          key="services"
          services={services}
          copy={servicesCopy}
          mode={mode}
        />
      ) : null,
    // Kept in type map for registry compatibility; not in homepage order.
    "about-story": null,
    "featured-projects":
      hasOptionalSection(payload.projects) && featuredProjects.length ? (
        <CorporateProjects key="projects" projects={featuredProjects} mode={mode} />
      ) : null,
    "delivery-approach": <CorporateDelivery key="delivery" />,
    "home-craftsmanship": (() => {
      const hasProjectVisual = allProjects.some((p) => Boolean(p.image?.url));
      const hasHeroVisual = Boolean(company.heroImage?.url);
      const hasCopy = Boolean(company.description?.trim());
      if (!hasProjectVisual && !hasHeroVisual && !hasCopy) {
        return null;
      }
      return (
        <CorporateCraftsmanship
          key="craft"
          company={company}
          projects={allProjects}
        />
      );
    })(),
    "home-metrics": <CorporateHomeMetrics key="metrics" items={metricItems} />,
    team:
      company.description || company.foundedYear || leadershipImage ? (
        <CorporateLeadership
          key="leadership"
          company={company}
          mode={mode}
          image={leadershipImage}
        />
      ) : null,
    testimonials:
      hasOptionalSection(payload.testimonials) && testimonials.length ? (
        <CorporateTestimonials
          key="testimonials"
          testimonials={testimonials}
          projectImage={featuredProjects.find((p) => p.image?.url)?.image}
        />
      ) : null,
    "contact-cta": (
      <CorporateContactCta
        key="contact"
        company={company}
        contact={contact}
        mode={mode}
      />
    ),
  };

  return order
    .map((id) => sectionMap[id])
    .filter((node): node is ReactNode => node != null);
}

function getHeroDescription(description?: string): string | undefined {
  if (!description) {
    return undefined;
  }
  return description.split(/\n\n+/)[0]?.trim();
}
