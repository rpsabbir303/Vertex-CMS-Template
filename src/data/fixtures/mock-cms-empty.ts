import type { CmsSitePayload } from "@/templates/shared/cms/types";

const noDataMeta = { state: "no-data" as const, source: "none" as const };

export const mockCmsSitePayloadEmpty: CmsSitePayload = {
  company: { data: null, meta: noDataMeta },
  services: { data: null, meta: noDataMeta },
  projects: { data: null, meta: noDataMeta },
  team: { data: null, meta: noDataMeta },
  testimonials: { data: null, meta: noDataMeta },
  blog: { data: null, meta: noDataMeta },
  certifications: { data: null, meta: noDataMeta },
  contact: { data: null, meta: noDataMeta },
  optionalPages: { data: [], meta: noDataMeta },
  navigation: { data: [], meta: noDataMeta },
  siteSeo: { data: null, meta: noDataMeta },
  pageSeo: { data: [], meta: noDataMeta },
};
