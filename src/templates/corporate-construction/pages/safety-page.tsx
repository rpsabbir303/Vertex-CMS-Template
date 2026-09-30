import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapCollectionItems, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import type { OptionalPage } from "@/templates/shared/cms/types/pages";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { planSafetyPageContent } from "@/templates/corporate-construction/components/safety-page-content";
import { CtaBand } from "@/templates/corporate-construction/components/ui/cta-band";
import { PageIntro } from "@/templates/corporate-construction/components/ui/page-intro";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateSafetyPageProps = TemplatePageProps & {
  page: OptionalPage;
};

export function CorporateConstructionSafetyPage({ page, ...props }: CorporateSafetyPageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const certifications = unwrapCollectionItems(props.payload.certifications);
  const content = planSafetyPageContent(page, certifications);

  const hasApproach = Boolean(content.approachHeading || content.approachParagraphs.length);

  return (
    <CorporatePageFrame {...props}>
      <PageIntro
        eyebrow={content.title}
        title={content.headline}
        lead={content.heroDescription}
        meta={content.practices.length ? [`${content.practices.length} practices`] : []}
        image={content.heroImage}
      />

      {hasApproach ? (
        <section className="bg-[var(--color-surface)]" aria-labelledby="approach-heading">
          <div className="vertex-container grid gap-10 py-24 md:py-32 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className={ui.eyebrow}>Approach</p>
              {content.approachHeading ? (
                <h2 id="approach-heading" className={cn(ui.h3, "mt-4 max-w-[14ch]")}>
                  {content.approachHeading}
                </h2>
              ) : null}
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

      {content.practices.length ? (
        <section className="bg-[var(--color-surface-muted)]" aria-labelledby="practices-heading">
          <div className="vertex-container py-24 md:py-32">
            <h2 id="practices-heading" className={ui.h2}>
              On every site.
            </h2>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-[1.25rem] bg-[var(--color-primary)]/10 sm:grid-cols-2 lg:grid-cols-3">
              {content.practices.map((practice, i) => (
                <Reveal as="li" key={practice.id} delay={(i % 4) as 0 | 1 | 2 | 3} className="flex min-h-[16rem] flex-col justify-between bg-[var(--color-surface-muted)] p-6 md:p-8">
                  <span className={cn(ui.mono, "text-[var(--color-accent)]")}>{pad(i + 1)}</span>
                  {practice.image?.url ? (
                    <div className={cn(ui.plateSm, "my-6 h-40")}>
                      <CmsImageMedia image={practice.image} aspect="auto" className="h-full" sizes="33vw" />
                    </div>
                  ) : null}
                  <div className="mt-8">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                      {practice.title}
                    </h3>
                    {practice.description ? <p className={cn(ui.small, "mt-3")}>{practice.description}</p> : null}
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {content.records.length ? (
        <section className="bg-[var(--color-surface)]" aria-labelledby="records-heading">
          <div className="vertex-container grid gap-10 py-24 md:py-32 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className={ui.eyebrow}>On file</p>
              <h2 id="records-heading" className={cn(ui.h3, "mt-4")}>
                Records and credentials
              </h2>
            </div>
            <ul className={cn("divide-y border-t lg:col-span-8", ui.rule)}>
              {content.records.map((record) => (
                <li key={record.id} className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline">
                  <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                    {record.name}
                  </p>
                  <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>
                    {[record.issuer, record.year].filter(Boolean).join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {content.commitmentHeading ? (
        <section className="relative overflow-hidden bg-[#070c16] text-white" aria-labelledby="commitment-heading">
          <div className="cc-grid cc-grid-dark pointer-events-none absolute inset-0" aria-hidden />
          <div className="vertex-container relative py-28 md:py-40">
            <p className={ui.eyebrow}>Commitment</p>
            <h2
              id="commitment-heading"
              className="mt-6 max-w-5xl text-balance font-[family-name:var(--font-display)] text-[clamp(2rem,4.4vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em]"
            >
              {content.commitmentHeading}
            </h2>
            {content.commitmentBody ? (
              <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-white/70">{content.commitmentBody}</p>
            ) : null}
          </div>
        </section>
      ) : null}

      <CtaBand
        mode={props.mode}
        title="Questions about site safety?"
        body={company?.name ? `Field leadership at ${company.name} will walk you through the program.` : undefined}
      />
    </CorporatePageFrame>
  );
}
