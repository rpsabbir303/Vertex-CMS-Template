import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { isLegalPageSlug } from "@/templates/shared/cms/types/pages";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CtaBand } from "@/templates/corporate-construction/components/ui/cta-band";
import { PageIntro } from "@/templates/corporate-construction/components/ui/page-intro";
import { CorporateConstructionLegalPage } from "@/templates/corporate-construction/pages/legal-page";
import { CorporateConstructionSafetyPage } from "@/templates/corporate-construction/pages/safety-page";
import { splitParagraphs } from "@/templates/corporate-construction/utils/page-seo";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

export function CorporateConstructionOptionalPage(props: TemplatePageProps) {
  const pages = unwrapEnvelope(props.payload.optionalPages) ?? [];
  const page = pages.find((item) => item.slug === props.entitySlug);

  if (!page) {
    return (
      <CorporatePageFrame {...props}>
        <section className="vertex-container pt-40 pb-24">
          <h1 className={ui.h2}>Page unavailable</h1>
          <p className={cn(ui.body, "mt-4")}>This optional page is not in the current CMS payload.</p>
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

  const paragraphs = splitParagraphs(page.body);

  return (
    <CorporatePageFrame {...props}>
      <PageIntro
        eyebrow={page.title}
        title={page.headline?.trim() || page.title}
        lead={paragraphs[0]}
        image={page.heroImage?.url ? page.heroImage : null}
      />
      {paragraphs.length > 1 ? (
        <section className="bg-[var(--color-surface)]">
          <div className="vertex-container grid gap-10 py-20 md:py-28 lg:grid-cols-12">
            <div className="max-w-2xl space-y-5 lg:col-span-8 lg:col-start-4">
              {paragraphs.slice(1).map((p) => (
                <p key={p.slice(0, 32)} className={cn(ui.body, "text-lg")}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <CtaBand mode={props.mode} title="Questions about this page?" primaryLabel="Contact the team" />
    </CorporatePageFrame>
  );
}
