import type { CmsSitePayload } from "@/templates/shared/cms/types";
import { createEnvelope } from "@/templates/shared/cms/types/cms-state";
import { mockCmsSitePayload } from "../mock-cms-site";

/** Partial CMS: company + contact available; optional sections omitted */
export const mockCmsSitePayloadPartial: CmsSitePayload = {
  ...mockCmsSitePayload,
  company: createEnvelope(
    {
      ...mockCmsSitePayload.company.data!,
      logo: undefined,
      heroImage: undefined,
    },
    { state: "partial", source: "imported" },
  ),
  services: createEnvelope({ items: [] }, { state: "no-data", source: "none" }),
  projects: createEnvelope({ items: [] }, { state: "no-data", source: "none" }),
  team: createEnvelope({ items: [] }, { state: "no-data", source: "none" }),
  testimonials: createEnvelope({ items: [] }, { state: "no-data", source: "none" }),
  blog: createEnvelope({ items: [] }, { state: "no-data", source: "none" }),
  certifications: createEnvelope({ items: [] }, { state: "no-data", source: "none" }),
};
