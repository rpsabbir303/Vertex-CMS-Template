import { corporateConstructionTheme } from "@/templates/corporate-construction/theme/tokens";
import { industrialCivilTheme } from "@/templates/industrial-civil/theme/tokens";
import { minimalProfessionalTheme } from "@/templates/minimal-professional/theme/tokens";
import { modernContractorTheme } from "@/templates/modern-contractor/theme/tokens";
import { premiumBuilderTheme } from "@/templates/premium-builder/theme/tokens";
import { projectPortfolioTheme } from "@/templates/project-portfolio/theme/tokens";
import { specialtyContractorTheme } from "@/templates/specialty-contractor/theme/tokens";
import { corporateHomeSectionOrder } from "@/templates/corporate-construction/config/home-sections";
import { CorporateConstructionAboutPage } from "@/templates/corporate-construction/pages/about-page";
import { CorporateConstructionBlogPage } from "@/templates/corporate-construction/pages/blog-page";
import { CorporateConstructionBlogPostPage } from "@/templates/corporate-construction/pages/blog-post-page";
import { CorporateConstructionContactPage } from "@/templates/corporate-construction/pages/contact-page";
import { CorporateConstructionHomePage } from "@/templates/corporate-construction/pages/home-page";
import { CorporateConstructionOptionalPage } from "@/templates/corporate-construction/pages/optional-page";
import { CorporateConstructionProjectDetailPage } from "@/templates/corporate-construction/pages/project-detail-page";
import { CorporateConstructionProjectsPage } from "@/templates/corporate-construction/pages/projects-page";
import { CorporateConstructionServicesPage } from "@/templates/corporate-construction/pages/services-page";
import type { TemplateDefinition } from "./template-types";

const registry: TemplateDefinition[] = [
  {
    id: "tpl_corporate_construction",
    name: "Corporate Construction",
    slug: "corporate-construction",
    description:
      "Premium construction editorial template: cinematic storytelling, project photography, and CMS-driven proof.",
    theme: corporateConstructionTheme,
    supportedSections: [
      "hero",
      "trust-credentials",
      "inside-the-work",
      "services",
      "about-story",
      "home-metrics",
      "delivery-approach",
      "home-craftsmanship",
      "featured-projects",
      "project-stories",
      "testimonials",
      "contact-cta",
    ],
    homeSectionOrder: corporateHomeSectionOrder,
    pages: {
      home: CorporateConstructionHomePage,
      about: CorporateConstructionAboutPage,
      services: CorporateConstructionServicesPage,
      projects: CorporateConstructionProjectsPage,
      "project-detail": CorporateConstructionProjectDetailPage,
      blog: CorporateConstructionBlogPage,
      "blog-post": CorporateConstructionBlogPostPage,
      contact: CorporateConstructionContactPage,
    },
    optionalPage: CorporateConstructionOptionalPage,
    preview: {
      thumbnailLabel: "Corporate Construction",
      tags: ["enterprise", "structured", "credible"],
    },
  },
  {
    id: "tpl_modern_contractor",
    name: "Modern Contractor",
    slug: "modern-contractor",
    description:
      "Contemporary, practical, and energetic layouts with compact navigation and strong project imagery.",
    theme: modernContractorTheme,
    supportedSections: [
      "hero",
      "services",
      "featured-projects",
      "about-story",
      "team",
      "testimonials",
      "contact-cta",
    ],
    homeSectionOrder: [
      "hero",
      "featured-projects",
      "services",
      "about-story",
      "testimonials",
      "contact-cta",
    ],
    pages: {},
    preview: {
      thumbnailLabel: "Modern Contractor",
      tags: ["contemporary", "direct", "imagery-forward"],
    },
  },
  {
    id: "tpl_premium_builder",
    name: "Premium Builder",
    slug: "premium-builder",
    description:
      "Luxury editorial presentation with cinematic imagery and refined spacing for high-end builders.",
    theme: premiumBuilderTheme,
    supportedSections: [
      "hero",
      "featured-projects",
      "about-story",
      "services",
      "testimonials",
      "contact-cta",
    ],
    homeSectionOrder: [
      "hero",
      "featured-projects",
      "about-story",
      "services",
      "testimonials",
      "contact-cta",
    ],
    pages: {},
    preview: {
      thumbnailLabel: "Premium Builder",
      tags: ["luxury", "editorial", "cinematic"],
    },
  },
  {
    id: "tpl_industrial_civil",
    name: "Industrial / Civil",
    slug: "industrial-civil",
    description:
      "Technical infrastructure credibility with certifications, safety, and structured information density.",
    theme: industrialCivilTheme,
    supportedSections: [
      "hero",
      "trust-credentials",
      "services",
      "featured-projects",
      "team",
      "contact-cta",
    ],
    homeSectionOrder: [
      "hero",
      "trust-credentials",
      "services",
      "featured-projects",
      "team",
      "contact-cta",
    ],
    pages: {},
    preview: {
      thumbnailLabel: "Industrial / Civil",
      tags: ["infrastructure", "technical", "certifications"],
    },
  },
  {
    id: "tpl_specialty_contractor",
    name: "Specialty Contractor",
    slug: "specialty-contractor",
    description:
      "Expertise-first storytelling with services-led layouts and craftsmanship-focused media.",
    theme: specialtyContractorTheme,
    supportedSections: [
      "hero",
      "services",
      "featured-projects",
      "about-story",
      "testimonials",
      "contact-cta",
    ],
    homeSectionOrder: [
      "hero",
      "services",
      "about-story",
      "featured-projects",
      "testimonials",
      "contact-cta",
    ],
    pages: {},
    preview: {
      thumbnailLabel: "Specialty Contractor",
      tags: ["specialist", "craft", "services-first"],
    },
  },
  {
    id: "tpl_project_portfolio",
    name: "Project Portfolio",
    slug: "project-portfolio",
    description:
      "Project-first editorial portfolio with large imagery and strong project narratives.",
    theme: projectPortfolioTheme,
    supportedSections: [
      "hero",
      "featured-projects",
      "about-story",
      "services",
      "contact-cta",
    ],
    homeSectionOrder: [
      "hero",
      "featured-projects",
      "about-story",
      "services",
      "contact-cta",
    ],
    pages: {},
    preview: {
      thumbnailLabel: "Project Portfolio",
      tags: ["portfolio", "editorial", "visual"],
    },
  },
  {
    id: "tpl_minimal_professional",
    name: "Minimal Professional",
    slug: "minimal-professional",
    description:
      "Clean, efficient, restrained layouts with strong typography and low visual noise.",
    theme: minimalProfessionalTheme,
    supportedSections: [
      "hero",
      "services",
      "featured-projects",
      "team",
      "contact-cta",
    ],
    homeSectionOrder: [
      "hero",
      "services",
      "featured-projects",
      "team",
      "contact-cta",
    ],
    pages: {},
    preview: {
      thumbnailLabel: "Minimal Professional",
      tags: ["minimal", "clean", "efficient"],
    },
  },
];

export function listTemplates(): TemplateDefinition[] {
  return registry;
}

export function getTemplateBySlug(slug: string): TemplateDefinition | undefined {
  return registry.find((t) => t.slug === slug);
}

export function getTemplateById(id: string): TemplateDefinition | undefined {
  return registry.find((t) => t.id === id);
}
