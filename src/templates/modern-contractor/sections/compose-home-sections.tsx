import type { ReactNode } from "react";
import type { TemplateRenderMode, TemplateSectionId } from "@/registry/template-types";
import type { CmsSitePayload } from "@/templates/shared/cms/types";
import type { Company } from "@/templates/shared/cms/types/company";
import {
  getSortedCollectionItems,
  getVisibleServices,
  hasOptionalSection,
  unwrapEnvelope,
} from "@/templates/shared/cms/resolve-content";
import { uniqueSectors } from "@/templates/corporate-construction/sections/corporate-home-metrics";
import { modernHomeSectionOrder } from "@/templates/modern-contractor/config/home-sections";
import { ModernAboutStory } from "./modern-about-story";
import { ModernContactCta } from "./modern-contact-cta";
import { ModernFeaturedProjects } from "./modern-featured-projects";
import { ModernHero } from "./modern-hero";
import { ModernServices } from "./modern-services";
import { ModernTestimonials } from "./modern-testimonials";

type ComposeOptions = {
  order?: TemplateSectionId[];
};

export function composeModernHomeSections(
  payload: CmsSitePayload,
  mode: TemplateRenderMode,
  options?: ComposeOptions,
): ReactNode[] {
  const order = options?.order ?? modernHomeSectionOrder;
  const company = unwrapEnvelope(payload.company);
  const contact = unwrapEnvelope(payload.contact);
  const services = getVisibleServices(payload.services);
  const servicesCopy = unwrapEnvelope(payload.services)?.section;
  const allProjects = getSortedCollectionItems(payload.projects);
  const featuredProjects = allProjects.filter((p) => p.featured);
  const showcaseProjects = (featuredProjects.length ? featuredProjects : allProjects).slice(0, 4);
  const testimonials = getSortedCollectionItems(payload.testimonials);

  if (!company) {
    return [
      <section key="empty" className="vertex-container py-24">
        <p className="text-[var(--color-text-muted)]">
          Company information is unavailable. This template does not display placeholder marketing
          content when CMS data is missing.
        </p>
      </section>,
    ];
  }

  const heroMeta = [
    services.length ? `${services.length} capabilities` : undefined,
    allProjects.length ? `${allProjects.length} projects` : undefined,
  ].filter((v): v is string => Boolean(v));

  const marquee = [...uniqueSectors(allProjects), ...services.map((s) => s.title)];
  const place = [company.address?.city, company.address?.region].filter(Boolean).join(", ");

  const sectionMap: Record<TemplateSectionId, ReactNode | null> = {
    hero: (
      <ModernHero
        key="hero"
        company={getModernHeroCompany(company)}
        mode={mode}
        meta={heroMeta}
        marquee={marquee}
        place={place}
      />
    ),
    "trust-credentials": null,
    "inside-the-work": null,
    services:
      hasOptionalSection(payload.services) && services.length ? (
        <ModernServices key="services" services={services} copy={servicesCopy} mode={mode} />
      ) : null,
    "about-story": (
      <ModernAboutStory key="about" company={company} mode={mode} projectCount={allProjects.length} />
    ),
    "featured-projects":
      hasOptionalSection(payload.projects) && showcaseProjects.length ? (
        <ModernFeaturedProjects key="projects" projects={showcaseProjects} mode={mode} />
      ) : null,
    "project-stories": null,
    "delivery-approach": null,
    "home-craftsmanship": null,
    "home-metrics": null,
    team: null,
    testimonials:
      hasOptionalSection(payload.testimonials) && testimonials.length ? (
        <ModernTestimonials key="testimonials" testimonials={testimonials} />
      ) : null,
    "contact-cta": <ModernContactCta key="cta" company={company} contact={contact} mode={mode} />,
  };

  return order
    .map((id) => sectionMap[id])
    .filter((node): node is ReactNode => node != null);
}

function getModernHeroCompany(company: Company): Company {
  if (!company.description) return company;
  const first = company.description.split(/\n\n+/)[0]?.trim();
  return first ? { ...company, description: first } : company;
}
