import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { ButtonLink } from "@/templates/shared/components/ui/button-link";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CorporatePageHero } from "@/templates/corporate-construction/components/corporate-page-hero";
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

  const paragraphs = page.body?.split(/\n\n+/).map((p) => p.trim()).filter(Boolean) ?? [];

  return (
    <CorporatePageFrame {...props}>
      <CorporatePageHero
        eyebrow="Optional page"
        title={page.title}
        summary={paragraphs[0]}
        image={page.heroImage}
      />
      {paragraphs.length > 1 ? (
        <section className="bg-[var(--color-surface)]">
          <div className="vertex-container max-w-3xl space-y-5 py-[var(--spacing-section-y-lg)] text-pretty text-lg leading-relaxed text-[var(--color-text-muted)]">
            {paragraphs.slice(1).map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </section>
      ) : null}
      <section className="border-t border-[var(--color-border)]">
        <div className="vertex-container py-14">
          <ButtonLink href={previewHref(props.mode, "/contact")} variant="outline">
            Contact the project team
          </ButtonLink>
        </div>
      </section>
    </CorporatePageFrame>
  );
}
