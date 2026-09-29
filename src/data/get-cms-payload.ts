import type { CmsSitePayload } from "@/templates/shared/cms/types";
import { createEnvelope } from "@/templates/shared/cms/types/cms-state";
import { mockCmsSitePayload } from "./mock-cms-site";
import { mockCmsSitePayloadEmpty } from "./fixtures/mock-cms-empty";
import { mockCmsSitePayloadPartial } from "./fixtures/mock-cms-partial";

export type CmsFixtureId = "default" | "empty" | "partial";

export function getCmsPayload(fixture: CmsFixtureId = "default"): CmsSitePayload {
  switch (fixture) {
    case "empty":
      return mockCmsSitePayloadEmpty;
    case "partial":
      return mockCmsSitePayloadPartial;
    default:
      return mockCmsSitePayload;
  }
}

/** Development helper — swap company fields without touching template code */
export function withCompanyOverride(
  payload: CmsSitePayload,
  patch: Partial<NonNullable<CmsSitePayload["company"]["data"]>>,
): CmsSitePayload {
  const current = payload.company.data;
  if (!current) {
    return payload;
  }
  return {
    ...payload,
    company: createEnvelope({ ...current, ...patch }, payload.company.meta),
  };
}
