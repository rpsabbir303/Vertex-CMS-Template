import type { TemplatePageProps } from "@/registry/template-types";
import type { SafetySection } from "@/templates/shared/cms/types/pages";
import { planSafetyPageContent } from "@/templates/corporate-construction/components/safety-page-content";
import { Eyebrow, PillLink } from "@/templates/industrial-civil/components/pill-link";
import { IndustrialFrame } from "@/templates/industrial-civil/components/industrial-frame";
import { RecordHeading, bodyCopy, pageContainer, sectionTitle } from "@/templates/industrial-civil/components/record-heading";
import { readIndustrialSite, splitParagraphs } from "@/templates/industrial-civil/utils/site-content";
import { previewHref } from "@/templates/industrial-civil/utils/preview-href";

export function IndustrialCivilSafetyPage(props: TemplatePageProps) {
  const { company, optionalPages } = readIndustrialSite(props.payload);
  const page = optionalPages.find((item) => item.slug === "safety");
  const href = (path: string) => previewHref(props.mode, path);

  if (!page) {
    return (
      <IndustrialFrame {...props}>
        <RecordHeading title="Safety" primaryHref={href("/contact")} secondaryHref={href("/projects")} />
      </IndustrialFrame>
    );
  }

  const content = planSafetyPageContent(page);

  return (
    <IndustrialFrame {...props}>
      <RecordHeading
        eyebrow={content.title}
        title={content.headline}
        lead={content.heroDescription}
        image={content.heroImage ?? company?.heroImage}
        primaryHref={href("/contact")}
        secondaryHref={href("/projects")}
      />

      {content.approachHeading || content.approachParagraphs.length ? (
        <section className="bg-white py-[100px]" aria-labelledby="safety-approach-heading">
          <div className={`${pageContainer} grid items-start gap-12 min-[960px]:grid-cols-[0.8fr_1.2fr]`}>
            <div>
              <Eyebrow>Safety philosophy</Eyebrow>
              <h2 id="safety-approach-heading" className={sectionTitle}>
                {content.approachHeading || "How safety is managed on site"}
              </h2>
            </div>
            <div className="space-y-5">
              {content.approachParagraphs.map((paragraph) => (
                <p key={paragraph} className={bodyCopy}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {content.safetySections.map((section, index) => (
        <SafetyTopic key={section.slug} section={section} index={index} />
      ))}

      {content.commitmentHeading || content.commitmentBody ? (
        <section className="bg-[#F6F6F6] py-[100px]" aria-labelledby="safety-commitment-heading">
          <div className={`${pageContainer} max-w-4xl`}>
            <Eyebrow>Commitment</Eyebrow>
            {content.commitmentHeading ? (
              <h2 id="safety-commitment-heading" className={sectionTitle}>
                {content.commitmentHeading}
              </h2>
            ) : (
              <h2 id="safety-commitment-heading" className="sr-only">
                Safety commitment
              </h2>
            )}
            {content.commitmentBody ? <p className={`mt-5 ${bodyCopy}`}>{content.commitmentBody}</p> : null}
          </div>
        </section>
      ) : null}

      <section className="bg-[#03071E]" aria-labelledby="safety-cta-heading">
        <div className={`${pageContainer} flex flex-wrap items-end justify-between gap-8 py-20`}>
          <div>
            <Eyebrow light>Site safety</Eyebrow>
            <h2 id="safety-cta-heading" className="mt-4 max-w-[14ch] text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.05] font-bold text-white">
              Questions about site safety?
            </h2>
            {company?.name ? (
              <p className="mt-5 max-w-md text-base leading-7 text-white/70">
                Field leadership at {company.name} will walk you through the program.
              </p>
            ) : null}
          </div>
          <PillLink href={href("/contact")}>Start a project</PillLink>
        </div>
      </section>
    </IndustrialFrame>
  );
}

function SafetyTopic({ section, index }: { section: SafetySection; index: number }) {
  const dark = section.layoutType === "immersiveDark";
  const heading = section.headline?.trim() || section.title;
  const tone = dark ? "bg-[#03071E] text-white" : index % 2 === 0 ? "bg-[#F6F8FA]" : "bg-white";
  const card = dark ? "bg-white/10 text-white" : index % 2 === 0 ? "bg-white text-[#03071E]" : "bg-[#F6F8FA] text-[#03071E]";
  const copy = dark ? "text-base leading-[26px] text-white/75" : bodyCopy;

  return (
    <section id={section.slug} className={`scroll-mt-[140px] py-[100px] ${tone}`} aria-labelledby={`safety-${section.slug}`}>
      <div className={`${pageContainer} grid items-start gap-12 ${section.image?.url ? "min-[960px]:grid-cols-2" : ""}`}>
        <div>
          <p className="text-sm font-bold tracking-[0.14em] text-[#FF6610]">
            {section.number ? String(section.number).padStart(2, "0") : String(index + 1).padStart(2, "0")}
            {section.headline ? <span className={dark ? "ml-3 text-white/70" : "ml-3 text-[#5c6570]"}>{section.title}</span> : null}
          </p>
          <h2 id={`safety-${section.slug}`} className={dark ? "mt-4 max-w-[16ch] text-[clamp(2rem,3.1vw,2.75rem)] leading-[1.2] font-bold text-white" : `max-w-[18ch] ${sectionTitle}`}>
            {heading}
          </h2>
          {section.description ? <p className={`mt-5 max-w-3xl ${copy}`}>{section.description}</p> : null}
          {splitParagraphs(section.content).map((paragraph) => (
            <p key={paragraph} className={`mt-4 max-w-3xl ${copy}`}>
              {paragraph}
            </p>
          ))}
          {section.supportingItems?.length ? (
            <ul className="mt-8 grid gap-3 min-[720px]:grid-cols-2">
              {section.supportingItems.map((item) => (
                <li key={item} className={`rounded-[8px] px-4 py-3 font-semibold ${card}`}>
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
          {section.timelineSteps?.length ? (
            <ol className="mt-8 grid gap-4 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-5">
              {section.timelineSteps.map((step, stepIndex) => (
                <li key={step.label} className={`rounded-[8px] p-5 ${card}`}>
                  <p className="text-[32px] leading-none font-bold text-[#FF6610]/50">{String(stepIndex + 1).padStart(2, "0")}</p>
                  <p className={`mt-3 font-bold ${dark ? "text-white" : "text-[#03071E]"}`}>{step.label}</p>
                  {step.title ? <p className={`mt-1 ${copy}`}>{step.title}</p> : null}
                </li>
              ))}
            </ol>
          ) : null}
          {section.evidenceFlow?.length ? (
            <ol className="mt-8 grid gap-3">
              {section.evidenceFlow.map((step, stepIndex) => (
                <li key={step} className="grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-3">
                  <span className="font-bold text-[#FF6610]">{String(stepIndex + 1).padStart(2, "0")}</span>
                  <span className={`font-bold ${dark ? "text-white" : "text-[#03071E]"}`}>{step}</span>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
        {section.image?.url ? (
          <img src={section.image.url} alt={section.image.alt} className="h-[320px] w-full rounded-[12px] object-cover min-[960px]:h-[460px]" />
        ) : null}
      </div>
    </section>
  );
}
