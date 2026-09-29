import type { ReactNode } from "react";
import type { CmsEnvelope } from "@/templates/shared/cms/types/cms-state";
import { hasOptionalSection } from "@/templates/shared/cms/resolve-content";

type OptionalSectionProps<T> = {
  envelope: CmsEnvelope<T>;
  children: (data: T) => ReactNode;
};

/** Omits entire section when CMS has no renderable optional content */
export function OptionalSection<T>({ envelope, children }: OptionalSectionProps<T>) {
  if (!hasOptionalSection(envelope)) {
    return null;
  }
  if (envelope.data === null) {
    return null;
  }
  return <>{children(envelope.data)}</>;
}
