import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { isLegalPageSlug } from "@/templates/shared/cms/types/pages";
import { ButtonLink } from "@/templates/shared/components/ui/button-link";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CorporatePageHero } from "@/templates/corporate-construction/components/corporate-page-hero";
import { CorporateConstructionLegalPage } from "@/templates/corporate-construction/pages/legal-page";
import { CorporateConstructionSafetyPage } from "@/templates/corporate-construction/pages/safety-page";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";

export function CorporateConstructionOptionalPage(props: TemplatePageProps) {
  const pages = unwrapEnvelope(props.payload.optionalPages) ?? [];
  const page = pages.find((item) => item.slug === props.entitySlug);

  if (!page) {
    return (
      <CorporatePageFrame {...props}>
        <section className="vertex-container py-24">
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-primary)]">
            Page unavailable
          </h1>
          <p className="mt-4 text-[var(--color-text-muted)]">
            This optional page is not in the current CMS payload.
          </p>
        </section>
      </CorporatePageFrame>
    );
  }

  if (page.slug === "safety") {
    return <CorporateConstructionSafetyPage {...props} page={page} />;
  }

  if (isLegalPageSlug(page.slug)) {
    return <CorporateConstructionLegalPage {...props} page={page} />;
  }

  const paragraphs = page.body?.split(/\n\n+/).map((p) => p.trim()).filter(Boolean) ?? [];

  return (
    <CorporatePageFrame {...props}>
      <CorporatePageHero
        eyebrow={page.title}
        title={page.title}
        summary={paragraphs[0]}
        image={page.heroImage}
      />
      {paragraphs.length > 1 ? (
        <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="vertex-container max-w-3xl space-y-5 py-12 text-pretty text-lg leading-relaxed text-[var(--color-text-muted)] md:py-14">
            {paragraphs.slice(1).map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="break-words">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ) : null}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="vertex-container flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between md:py-14">
          <p className="max-w-md text-pretty text-sm text-[var(--color-text-muted)] md:text-base">
            Questions about this page can be directed to the project team.
          </p>
          <ButtonLink href={previewHref(props.mode, "/contact")} className="shrink-0 rounded-none">
            Contact the project team
          </ButtonLink>
        </div>
      </section>
    </CorporatePageFrame>
  );
}
