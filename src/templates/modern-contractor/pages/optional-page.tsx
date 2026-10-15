import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { isLegalPageSlug } from "@/templates/shared/cms/types/pages";
import { splitParagraphs } from "@/templates/corporate-construction/utils/page-seo";
import { ModernPageFrame } from "@/templates/modern-contractor/components/modern-page-frame";
import { ModernContractorLegalPage } from "@/templates/modern-contractor/pages/legal-page";
import { ModernPageHero } from "@/templates/modern-contractor/components/modern-page-hero";
import { ModernContractorSafetyPage } from "@/templates/modern-contractor/pages/safety-page";
import {
  ModernContractorSpecialtyPage,
  SPECIALTY_CONTRACTOR_PAGE_SLUG,
} from "@/templates/modern-contractor/pages/specialty-contractor-page";
import { ui } from "@/templates/modern-contractor/theme/ui";
import { cn } from "@/utils/cn";

export function ModernContractorOptionalPage(props: TemplatePageProps) {
  const pages = unwrapEnvelope(props.payload.optionalPages) ?? [];
  const page = pages.find((item) => item.slug === props.entitySlug);

  if (!page) {
    return (
      <ModernPageFrame {...props}>
        <section className="vertex-container pt-40 pb-24">
          <h1 className={ui.h2}>Page unavailable</h1>
          <p className={cn(ui.body, "mt-4")}>This optional page is not in the current CMS payload.</p>
        </section>
      </ModernPageFrame>
    );
  }

  if (page.slug === SPECIALTY_CONTRACTOR_PAGE_SLUG) {
    return <ModernContractorSpecialtyPage {...props} page={page} />;
  }

  if (page.slug === "safety") {
    return <ModernContractorSafetyPage {...props} page={page} />;
  }

  if (isLegalPageSlug(page.slug)) {
    return <ModernContractorLegalPage {...props} page={page} />;
  }

  const paragraphs = splitParagraphs(page.body);

  return (
    <ModernPageFrame {...props}>
      <ModernPageHero eyebrow={page.title} title={page.headline?.trim() || page.title} lead={paragraphs[0]} />
      {paragraphs.slice(1).length ? (
        <section className={cn(ui.section, "pt-0")}>
          <div className="vertex-container max-w-3xl space-y-4">
            {paragraphs.slice(1).map((p) => (
              <p key={p.slice(0, 32)} className={ui.body}>
                {p}
              </p>
            ))}
          </div>
        </section>
      ) : null}
    </ModernPageFrame>
  );
}
