import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapCollectionItems, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import type { OptionalPage } from "@/templates/shared/cms/types/pages";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { planSafetyPageContent } from "@/templates/corporate-construction/components/safety-page-content";
import { CorporateSafetyRecords } from "@/templates/corporate-construction/sections/corporate-safety-records";
import { CorporateSafetySections } from "@/templates/corporate-construction/sections/corporate-safety-sections";
import { CtaBand } from "@/templates/corporate-construction/components/ui/cta-band";
import { PageIntro } from "@/templates/corporate-construction/components/ui/page-intro";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateSafetyPageProps = TemplatePageProps & {
  page: OptionalPage;
};

export function CorporateConstructionSafetyPage({ page, ...props }: CorporateSafetyPageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const certifications = unwrapCollectionItems(props.payload.certifications);
  const content = planSafetyPageContent(page, certifications);

  const hasPhilosophy = Boolean(content.approachHeading || content.approachParagraphs.length);
  const sectionCount = content.safetySections.length;

  return (
    <CorporatePageFrame {...props}>
      <PageIntro
        eyebrow={content.title}
        title={content.headline}
        lead={content.heroDescription}
        meta={sectionCount ? [`${sectionCount} focus areas`] : []}
        image={content.heroImage}
      />

      {hasPhilosophy ? (
        <section className="bg-[var(--color-surface)]" aria-labelledby="safety-philosophy-heading">
          <div className="vertex-container grid gap-10 py-24 md:py-32 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className={ui.eyebrow}>Safety philosophy</p>
              {content.approachHeading ? (
                <h2 id="safety-philosophy-heading" className={cn(ui.h3, "mt-4 max-w-[14ch]")}>
                  {content.approachHeading}
                </h2>
              ) : (
                <h2 id="safety-philosophy-heading" className="sr-only">
                  Safety philosophy
                </h2>
              )}
            </div>
            <Reveal className="space-y-5 lg:col-span-7">
              {content.approachParagraphs.map((p, i) => (
                <p key={p.slice(0, 32)} className={i === 0 ? ui.lead : ui.body}>
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}

      <CorporateSafetySections sections={content.safetySections} />

      <CorporateSafetyRecords records={content.records} headline={content.commitmentHeading} />

      <CtaBand
        mode={props.mode}
        title="Questions about site safety?"
        body={company?.name ? `Field leadership at ${company.name} will walk you through the program.` : undefined}
      />
    </CorporatePageFrame>
  );
}
