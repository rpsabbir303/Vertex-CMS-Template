import type { CmsEnvelope } from "./cms-state";
import type { CertificationsCollection } from "./certifications";
import type { Company } from "./company";
import type { Contact } from "./contact";
import type { OptionalPage, SiteNavigationItem } from "./pages";
import type { ProjectsCollection } from "./projects";
import type { PageSeo, SeoMetadata } from "./seo";
import type { ServicesCollection } from "./services";
import type { TeamCollection } from "./team";
import type { TestimonialsCollection } from "./testimonials";

export type CmsSitePayload = {
  company: CmsEnvelope<Company>;
  services: CmsEnvelope<ServicesCollection>;
  projects: CmsEnvelope<ProjectsCollection>;
  team: CmsEnvelope<TeamCollection>;
  testimonials: CmsEnvelope<TestimonialsCollection>;
  certifications: CmsEnvelope<CertificationsCollection>;
  contact: CmsEnvelope<Contact>;
  optionalPages: CmsEnvelope<OptionalPage[]>;
  navigation: CmsEnvelope<SiteNavigationItem[]>;
  siteSeo: CmsEnvelope<SeoMetadata>;
  pageSeo: CmsEnvelope<PageSeo[]>;
};
