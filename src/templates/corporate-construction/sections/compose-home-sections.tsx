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
import { CorporateAbout } from "./corporate-about";
import { CorporateDelivery } from "./corporate-delivery";
import { CorporateContactCta } from "./corporate-contact-cta";
import { CorporateHero } from "./corporate-hero";
import { CorporateProjects } from "./corporate-projects";
import { CorporateServices } from "./corporate-services";
import { CorporateTeam } from "./corporate-team";
import { CorporateTestimonials } from "./corporate-testimonials";
import { CorporateTrust } from "./corporate-trust";

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
  const projects = getSortedCollectionItems(payload.projects).filter((p) => p.featured);
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

  const aboutCompany: Company = {
    ...company,
    description: getAboutDescription(company.description),
  };

  const sectionMap: Record<TemplateSectionId, ReactNode | null> = {
    hero: (
      <CorporateHero key="hero" company={getCorporateHeroCompany(company)} mode={mode} />
    ),
    "trust-credentials":
      hasOptionalSection(payload.certifications) && certifications.length ? (
        <CorporateTrust key="trust" certifications={certifications} />
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
    "featured-projects":
      hasOptionalSection(payload.projects) && projects.length ? (
        <CorporateProjects key="projects" projects={projects} mode={mode} />
      ) : null,
    "about-story":
      aboutCompany.description || company.foundedYear ? (
        <CorporateAbout key="about" company={aboutCompany} />
      ) : null,
    "delivery-approach": <CorporateDelivery key="delivery" />,
    team:
      hasOptionalSection(payload.team) && team.length ? (
        <CorporateTeam key="team" members={team} />
      ) : null,
    testimonials:
      hasOptionalSection(payload.testimonials) && testimonials.length ? (
        <CorporateTestimonials key="testimonials" testimonials={testimonials} />
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

function getAboutDescription(description?: string): string | undefined {
  if (!description) {
    return undefined;
  }
  const parts = description.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  if (parts.length <= 1) {
    return undefined;
  }
  return parts.slice(1).join("\n\n");
}

function getHeroDescription(description?: string): string | undefined {
  if (!description) {
    return undefined;
  }
  return description.split(/\n\n+/)[0]?.trim();
}
