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
import { CorporateInsideWork } from "./corporate-inside-work";
import { CorporateCredentials, uniqueSectors } from "./corporate-home-metrics";
import { selectLeadProject } from "./corporate-projects";
import { HomeSelectedWorkShowcase } from "@/templates/corporate-construction/components/home-selected-work-showcase";
import { selectHomeSelectedWorkProjects } from "@/templates/corporate-construction/utils/home-selected-work";
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
  const selectedWorkProjects = selectHomeSelectedWorkProjects(allProjects);
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

  const heroMeta = [
    services.length ? `${services.length} ${services.length === 1 ? "capability" : "capabilities"}` : undefined,
    allProjects.length ? `${allProjects.length} ${allProjects.length === 1 ? "project" : "projects"} published` : undefined,
  ].filter((v): v is string => Boolean(v));

  // Live spec strip: sectors and capabilities straight from the CMS.
  const marquee = [...uniqueSectors(allProjects), ...services.map((s) => s.title)];

  const leadProject = selectLeadProject(featuredProjects.length ? featuredProjects : allProjects);
  // Keep the collage distinct from the Selected Work plate when there is enough material.
  const insideCandidates = allProjects.filter((p) => p.id !== leadProject?.id && p.image?.url);
  const insideProjects = insideCandidates.length >= 2 ? insideCandidates : allProjects;

  const sectionMap: Record<TemplateSectionId, ReactNode | null> = {
    hero: (
      <CorporateHero
        key="hero"
        company={getCorporateHeroCompany(company)}
        mode={mode}
        meta={heroMeta}
        marquee={marquee}
      />
    ),
    "trust-credentials": (
      <CorporateProofStrip
        key="proof"
        company={company}
        certifications={certifications}
        serviceCount={services.length}
        projectCount={allProjects.length}
      />
    ),
    "inside-the-work": (
      <CorporateInsideWork
        key="inside"
        projects={insideProjects}
        narrative={company.description?.split(/\n\n+/)[1]?.trim()}
      />
    ),
    services:
      hasOptionalSection(payload.services) && services.length ? (
        <CorporateServices key="services" services={services} copy={servicesCopy} mode={mode} />
      ) : null,
    // Kept in type map for registry compatibility; not in homepage order.
    "about-story": null,
    "featured-projects": null,
    "project-stories":
      hasOptionalSection(payload.projects) && selectedWorkProjects.length ? (
        <HomeSelectedWorkShowcase key="stories" projects={selectedWorkProjects} mode={mode} />
      ) : null,
    "delivery-approach": <CorporateDelivery key="delivery" />,
    "home-craftsmanship": (
      <CorporateCraftsmanship key="craft" company={company} projects={allProjects} />
    ),
    "home-metrics": (
      <CorporateCredentials key="credentials" certifications={certifications} projects={allProjects} />
    ),
    team: null,
    testimonials:
      hasOptionalSection(payload.testimonials) && testimonials.length ? (
        <CorporateTestimonials key="testimonials" testimonials={testimonials} />
      ) : null,
    "contact-cta": <CorporateContactCta key="contact" company={company} contact={contact} mode={mode} />,
  };

  return order
    .map((id) => sectionMap[id])
    .filter((node): node is ReactNode => node != null);
}

function getHeroDescription(description?: string): string | undefined {
  if (!description) return undefined;
  return description.split(/\n\n+/)[0]?.trim();
}
