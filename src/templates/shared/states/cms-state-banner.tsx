import type { TemplateRenderMode } from "@/registry/template-types";
import type { CmsFieldMeta } from "@/templates/shared/cms/types/cms-state";
import { cn } from "@/utils/cn";

type CmsStateBannerProps = {
  meta: CmsFieldMeta;
  label: string;
  mode: TemplateRenderMode;
  className?: string;
};

/** Visible only in preview/builder — never pollutes public layout semantics */
export function CmsStateBanner({
  meta,
  label,
  mode,
  className,
}: CmsStateBannerProps) {
  if (mode === "public") {
    return null;
  }
  if (meta.state === "available" || meta.state === "partial") {
    return null;
  }

  return (
    <div
      role="status"
      className={cn(
        "border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-950",
        className,
      )}
    >
      <strong>{label}:</strong> {meta.state}
      {meta.errorMessage ? ` — ${meta.errorMessage}` : null}
    </div>
  );
}
