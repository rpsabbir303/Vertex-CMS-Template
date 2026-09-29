import type { TemplateDefinition, TemplatePageKey, TemplateRenderMode } from "@/registry/template-types";
import type { CmsSitePayload } from "@/templates/shared/cms/types";
import { buildBrandingStyle } from "@/templates/shared/branding/apply-branding";
import type { TenantBranding } from "@/templates/shared/branding/types";
import { SkipLink } from "@/templates/shared/components/ui/skip-link";
import { CmsStateBanner } from "@/templates/shared/states/cms-state-banner";
import { cn } from "@/utils/cn";

type TemplateShellProps = {
  definition: TemplateDefinition;
  payload: CmsSitePayload;
  mode?: TemplateRenderMode;
  branding?: TenantBranding;
  className?: string;
  page?: TemplatePageKey;
  entitySlug?: string;
  currentPath?: string;
};

export function TemplateShell({
  definition,
  payload,
  mode = "public",
  branding,
  className,
  page = "home",
  entitySlug,
  currentPath = "/",
}: TemplateShellProps) {
  const Page =
    page === "optional"
      ? definition.optionalPage
      : page === "project-detail"
        ? definition.pages["project-detail"]
        : definition.pages[page];
  const rootStyle = buildBrandingStyle(definition.theme, branding);

  return (
    <div
      data-template={definition.slug}
      data-template-mode={mode}
      className={cn("min-h-dvh bg-[var(--color-surface)] text-[var(--color-text)]", className)}
      style={rootStyle}
    >
      <SkipLink />
      {mode === "builder" ? (
        <div className="vertex-container space-y-2 py-2">
          <CmsStateBanner mode={mode} meta={payload.company.meta} label="Company" />
        </div>
      ) : null}
      {Page ? (
        <Page
          payload={payload}
          mode={mode}
          currentPath={currentPath}
          entitySlug={entitySlug}
        />
      ) : (
        <main id="main-content" className="vertex-container py-24">
          <p className="text-[var(--color-text-muted)]">
            Home page implementation pending for <strong>{definition.name}</strong>.
          </p>
        </main>
      )}
    </div>
  );
}
