import { notFound } from "next/navigation";
import type { TemplatePageProps } from "@/registry/template-types";
import { isLegalPageSlug, type OptionalPage } from "@/templates/shared/cms/types/pages";
import { planLegalPage } from "@/templates/shared/legal/plan-legal-page";
import { PageClose } from "@/templates/industrial-civil/components/page-close";
import { IndustrialFrame } from "@/templates/industrial-civil/components/industrial-frame";
import { IndustrialCivilSafetyPage } from "@/templates/industrial-civil/pages/safety-page";
import { RecordHeading, bodyCopy, pageContainer, sectionTitle } from "@/templates/industrial-civil/components/record-heading";
import { readIndustrialSite, splitParagraphs } from "@/templates/industrial-civil/utils/site-content";
import { previewHref } from "@/templates/industrial-civil/utils/preview-href";

function LegalDocument({ page }: { page: OptionalPage }) {
  const planned = planLegalPage(page);
  if (!planned.isPublished) {
    return <p className={`${pageContainer} py-16 ${bodyCopy}`}>This page has not yet been published.</p>;
  }
  return (
    <div className={`${pageContainer} max-w-3xl space-y-10 py-[100px]`}>
      {planned.effectiveDate ? <p className="text-sm font-semibold text-[#FF6610]">Effective {planned.effectiveDate}</p> : null}
      {planned.intro && planned.intro !== page.intro ? <p className={bodyCopy}>{planned.intro}</p> : null}
      {planned.sections.map((section, index) => (
        <section key={section.id} id={section.id}>
          <h2 className="text-[28px] leading-snug font-bold text-[#03071E]">
            <span className="mr-3 text-[#FF6610]">{String(index + 1).padStart(2, "0")}</span>
            {section.heading}
          </h2>
          {splitParagraphs(section.content).map((paragraph) => (
            <p key={paragraph} className={`mt-4 whitespace-pre-line ${bodyCopy}`}>
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}

export function IndustrialCivilOptionalPage(props: TemplatePageProps) {
  const { company, optionalPages } = readIndustrialSite(props.payload);
  const page = optionalPages.find((item) => item.slug === props.entitySlug);

  if (!page) {
    notFound();
  }

  const lead = splitParagraphs(page.body)[0];
  const legal = isLegalPageSlug(page.slug);

  if (page.slug === "safety") {
    return <IndustrialCivilSafetyPage {...props} />;
  }

  return (
    <IndustrialFrame {...props}>
      <RecordHeading
        eyebrow={page.title}
        title={page.headline || page.title}
        lead={legal ? page.intro : lead}
        image={page.heroImage ?? company?.heroImage}
        primaryHref={previewHref(props.mode, "/contact")}
        secondaryHref={previewHref(props.mode, "/projects")}
      />
      {legal ? (
        <LegalDocument page={page} />
      ) : (
        <>
          <div className="bg-white py-[100px]">
            <div className={`${pageContainer} space-y-14`}>
              {splitParagraphs(page.body).slice(1).length ? (
                <div className="max-w-3xl space-y-4">
                  {splitParagraphs(page.body)
                    .slice(1)
                    .map((paragraph) => (
                      <p key={paragraph} className={bodyCopy}>
                        {paragraph}
                      </p>
                    ))}
                </div>
              ) : null}

              {page.approachHeading ? <h2 className={sectionTitle}>{page.approachHeading}</h2> : null}

              {page.practices?.length ? (
                <div className="grid gap-4 min-[720px]:grid-cols-2">
                  {page.practices.map((practice, index) => (
                    <article key={practice.id} className="rounded-[8px] bg-[#F6F8FA] p-6">
                      <p className="text-sm font-bold text-[#FF6610]">{String(index + 1).padStart(2, "0")}</p>
                      <h2 className="mt-3 text-[22px] font-bold text-[#03071E]">{practice.title}</h2>
                      {practice.description ? <p className={`mt-3 ${bodyCopy}`}>{practice.description}</p> : null}
                    </article>
                  ))}
                </div>
              ) : null}

              {page.safetySections?.map((section) => (
                <article key={section.slug} id={section.slug} className="grid items-start gap-8 border-t border-[#e6e8ec] pt-10 min-[960px]:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
                  <div>
                  <p className="text-sm font-bold tracking-[0.14em] text-[#FF6610]">
                    {section.number ? String(section.number).padStart(2, "0") : section.layoutType}
                  </p>
                  <h2 className={`max-w-[20ch] ${sectionTitle}`}>{section.headline || section.title}</h2>
                  {section.description ? <p className={`mt-4 max-w-3xl ${bodyCopy}`}>{section.description}</p> : null}
                  {splitParagraphs(section.content).map((paragraph) => (
                    <p key={paragraph} className={`mt-4 max-w-3xl ${bodyCopy}`}>
                      {paragraph}
                    </p>
                  ))}
                  {section.supportingItems?.length ? (
                    <ul className="mt-6 grid gap-3 min-[720px]:grid-cols-2">
                      {section.supportingItems.map((item) => (
                        <li key={item} className="rounded-[8px] bg-[#F6F8FA] px-4 py-3 text-[#03071E]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.timelineSteps?.length ? (
                    <ol className="mt-6 grid gap-4 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-4">
                      {section.timelineSteps.map((step, index) => (
                        <li key={step.label} className="rounded-[8px] bg-[#F6F8FA] p-5">
                          <p className="text-[32px] leading-none font-bold text-[#FF6610]/40">{String(index + 1).padStart(2, "0")}</p>
                          <p className="mt-3 font-bold text-[#03071E]">{step.label}</p>
                          {step.title ? <p className={`mt-1 ${bodyCopy}`}>{step.title}</p> : null}
                        </li>
                      ))}
                    </ol>
                  ) : null}
                  {section.evidenceFlow?.length ? (
                    <p className="mt-6 text-sm font-semibold text-[#03071E]">{section.evidenceFlow.join(" → ")}</p>
                  ) : null}
                  </div>
                  {section.image?.url ? (
                    <img src={section.image.url} alt={section.image.alt} className="h-[280px] w-full rounded-[16px] object-cover min-[960px]:h-[360px]" />
                  ) : null}
                </article>
              ))}
            </div>
          </div>

          {page.commitmentHeading || page.commitmentBody ? (
            <section className="bg-[#03071E] py-[100px] text-white">
              <div className={pageContainer}>
                {page.commitmentHeading ? <h2 className="max-w-[16ch] text-[clamp(2rem,3.1vw,2.75rem)] leading-[1.2] font-bold">{page.commitmentHeading}</h2> : null}
                {page.commitmentBody ? <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">{page.commitmentBody}</p> : null}
              </div>
            </section>
          ) : null}

          <PageClose name={company?.name} href={previewHref(props.mode, "/contact")} />
        </>
      )}
    </IndustrialFrame>
  );
}
