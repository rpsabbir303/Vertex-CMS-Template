import type { ComponentType } from "react";
import type { CmsSitePayload } from "@/templates/shared/cms/types";
import type { PageSlug } from "@/templates/shared/cms/types/pages";
import type { TemplateThemeTokens } from "@/templates/shared/theme/types";

export type TemplateSectionId =
  | "hero"
  | "services"
  | "featured-projects"
  | "about-story"
  | "delivery-approach"
  | "trust-credentials"
  | "team"
  | "testimonials"
  | "contact-cta";

export type TemplateRenderMode = "public" | "preview" | "builder";

export type TemplatePageKey = PageSlug | "optional";

export type TemplatePageProps = {
  payload: CmsSitePayload;
  mode: TemplateRenderMode;
  currentPath?: string;
  entitySlug?: string;
};

export type TemplatePageComponent = ComponentType<TemplatePageProps>;

export type TemplatePagesMap = Partial<Record<PageSlug, TemplatePageComponent>>;

export type TemplateDefinition = {
  id: string;
  name: string;
  slug: string;
  description: string;
  theme: TemplateThemeTokens;
  supportedSections: TemplateSectionId[];
  /** Home section order — template-specific composition */
  homeSectionOrder: TemplateSectionId[];
  pages: TemplatePagesMap;
  optionalPage?: TemplatePageComponent;
  preview: {
    thumbnailLabel: string;
    tags: string[];
  };
};
