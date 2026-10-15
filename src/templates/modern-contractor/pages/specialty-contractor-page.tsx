import Link from "next/link";
import type { TemplatePageProps } from "@/registry/template-types";
import { getSortedCollectionItems, getVisibleServices, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import type { OptionalPage, OptionalPagePractice, SpecialtySection } from "@/templates/shared/cms/types/pages";
import { ModernPageFrame } from "@/templates/modern-contractor/components/modern-page-frame";
import { planSpecialtyPageContent } from "@/templates/modern-contractor/utils/specialty-page-content";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { pad } from "@/templates/modern-contractor/theme/ui";

const display = "font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif]";

type ModernSpecialtyContractorPageProps = TemplatePageProps & {
  page: OptionalPage;
};

function paragraphsOf(content?: string): string[] {
  if (!content?.trim()) return [];
  return content
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function orderedPractices(practices?: OptionalPagePractice[]): OptionalPagePractice[] {
  return [...(practices ?? [])]
    .filter((item) => item.title?.trim())
    .sort((a, b) => (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER));
}

export function ModernContractorSpecialtyPage({ page, ...props }: ModernSpecialtyContractorPageProps) {
  const content = planSpecialtyPageContent(page);
  const company = unwrapEnvelope(props.payload.company);
  const homeHref = previewHref(props.mode, "/");
  const contactHref = previewHref(props.mode, "/contact");
  const practices = orderedPractices(page.practices);
  const topicCount = content.specialtySections.length;
  const services = getVisibleServices(props.payload.services);
  const projects = getSortedCollectionItems(props.payload.projects);
  const safetyPage = (unwrapEnvelope(props.payload.optionalPages) ?? []).find((item) => item.slug === "safety");
  const safetyLead = safetyPage?.body?.split(/\n\n+/)[0]?.trim();

  return (
    <ModernPageFrame {...props}>
      <section className="relative min-h-[640px] overflow-hidden bg-[#0a0c0b] text-white min-[960px]:min-h-[684px]">
        {content.heroImage?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={content.heroImage.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#0a0c0b_8%,rgba(10,12,11,0.82)_42%,rgba(10,12,11,0.38)_100%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="relative mx-auto flex min-h-[640px] max-w-[1360px] flex-col px-5 pt-32 pb-14 min-[960px]:min-h-[684px] min-[960px]:px-8 min-[960px]:pt-36">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 text-[12px] tracking-[0.16em] text-white/70 uppercase">
            <Link href={homeHref} className="hover:text-white">
              Home
            </Link>
            <span aria-hidden>›</span>
            <span className="text-white">Specialty</span>
          </nav>
          <div className="mt-auto grid items-end gap-10 pt-16 min-[960px]:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
                <span className="h-px w-8 bg-[#C8FF2E]" />
                Specialty
              </p>
              <h1 className={`${display} mt-5 text-[clamp(2.5rem,3.8vw,3.6rem)] leading-[1.28] font-semibold tracking-[-0.04em] text-balance`}>
                {content.headline}
              </h1>
              {content.heroDescription ? (
                <p className="mt-6 max-w-[40rem] text-[17px] leading-relaxed text-white/78">{content.heroDescription}</p>
              ) : null}
            </div>
            {topicCount ? (
              <aside className="border-l border-white/25 py-2 pl-6">
                <p className="text-[11px] tracking-[0.14em] text-[#9ba49c] uppercase">Topics on record</p>
                <p className={`${display} mt-2 text-[2.4rem] leading-none font-semibold`}>{pad(topicCount)}</p>
                <p className="mt-3 text-[13px] tracking-[0.08em] text-white/80 uppercase">
                  {practices.length ? `${pad(practices.length)} field practices` : content.title}
                </p>
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      {content.approachHeading || content.approachParagraphs.length ? (
        <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24">
          <div className="mx-auto grid max-w-[1360px] gap-10 min-[960px]:grid-cols-2 min-[960px]:gap-16">
            {content.approachHeading ? (
              <h2 className={`${display} text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.12] font-semibold tracking-[-0.04em]`}>
                {content.approachHeading}
              </h2>
            ) : (
              <div />
            )}
            {content.approachParagraphs.length ? (
              <div className="space-y-5 text-[17px] leading-relaxed text-[#3e4438]">
                {content.approachParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {content.specialtySections.length ? (
        <nav aria-label="On this page" className="border-b border-black/15 bg-[#f3f1e9] px-5 py-5 text-[#0a0c0b] min-[960px]:px-8">
          <div className="mx-auto flex max-w-[1360px] gap-2 overflow-x-auto">
            {content.specialtySections.map((section, index) => (
              <a
                key={section.slug}
                href={`#${section.slug}`}
                className="shrink-0 rounded-full border border-black/15 px-4 py-2 text-[13px] font-semibold tracking-[-0.01em] hover:border-[#0a0c0b]"
              >
                {pad(section.number ?? index + 1)} {section.title}
              </a>
            ))}
          </div>
        </nav>
      ) : null}

      {content.specialtySections.map((section, index) => (
        <SpecialtyTopic key={section.slug} section={section} index={index} practices={practices} />
      ))}

      {services.length || projects.length || safetyPage ? (
        <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24">
          <div className="mx-auto max-w-[1360px] border-t border-black/15 pt-14 min-[960px]:pt-20">
            <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
              <span className="h-px w-8 bg-[#0a0c0b]" />
              On this site
            </p>
            <h2 className={`${display} mt-4 max-w-3xl text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.12] font-semibold tracking-[-0.04em]`}>
              Capabilities and projects this coordination sits inside.
            </h2>
            {services.length ? (
              <ul className="mt-10 divide-y divide-black/15 border-y border-black/15">
                {services.map((service, index) => (
                  <li key={service.id}>
                    <Link
                      href={previewHref(props.mode, service.href || `/services/${service.slug}`)}
                      className="grid gap-3 py-5 min-[960px]:grid-cols-[72px_minmax(0,0.8fr)_minmax(0,1.4fr)_auto] min-[960px]:items-baseline min-[960px]:gap-8"
                    >
                      <span className="text-[12px] font-extrabold tracking-[0.16em] text-[#667067]">{pad(index + 1)}</span>
                      <span className={`${display} text-[1.35rem] leading-tight font-semibold tracking-[-0.03em]`}>{service.title}</span>
                      {service.summary ? <span className="text-[15px] leading-relaxed text-[#3e4438]">{service.summary}</span> : <span />}
                      <span aria-hidden className="text-[15px]">
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            {projects.length ? (
              <ul className="mt-10 grid gap-[18px] min-[960px]:grid-cols-2">
                {projects.map((project) => (
                  <li key={project.id}>
                    <Link
                      href={previewHref(props.mode, `/projects/${project.slug}`)}
                      className="grid h-full overflow-hidden rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] border border-black/15 bg-white/40 min-[720px]:grid-cols-[148px_minmax(0,1fr)]"
                    >
                      {project.image?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={project.image.url} alt="" className="h-36 w-full object-cover min-[720px]:h-full" />
                      ) : null}
                      <span className="block p-5">
                        <span className="text-[12px] font-extrabold tracking-[0.12em] text-[#667067] uppercase">
                          {[project.metadata?.sector, project.location, project.year].filter(Boolean).join(" · ")}
                        </span>
                        <span className={`${display} mt-2 block text-[1.35rem] leading-tight font-semibold tracking-[-0.03em]`}>
                          {project.title}
                        </span>
                        {project.summary ? <span className="mt-2 block text-[15px] leading-relaxed text-[#3e4438]">{project.summary}</span> : null}
                        {project.metadata?.scope ? (
                          <span className="mt-3 block text-[13px] tracking-[0.04em] text-[#667067]">{project.metadata.scope}</span>
                        ) : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            {safetyPage ? (
              <Link
                href={previewHref(props.mode, "/safety")}
                className="mt-10 grid gap-4 rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] border border-black/15 p-7 min-[960px]:grid-cols-[minmax(0,1fr)_auto] min-[960px]:items-end"
              >
                <span>
                  <span className="text-[12px] font-extrabold tracking-[0.16em] uppercase">Safety program</span>
                  <span className={`${display} mt-3 block text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.12] font-semibold tracking-[-0.04em]`}>
                    {safetyPage.headline?.trim() || safetyPage.title}
                  </span>
                  {safetyLead ? <span className="mt-3 block max-w-3xl text-[16px] leading-relaxed text-[#3e4438]">{safetyLead}</span> : null}
                </span>
                <span className="text-sm font-semibold">Read the safety page ↗</span>
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}

      {content.commitmentHeading || content.commitmentBody ? (
        <section className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24">
          <div className="mx-auto max-w-[1360px]">
            <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
              <span className="h-px w-8 bg-[#C8FF2E]" />
              Commitment
            </p>
            {content.commitmentHeading ? (
              <h2 className={`${display} mt-5 max-w-4xl text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.12] font-semibold tracking-[-0.04em]`}>
                {content.commitmentHeading}
              </h2>
            ) : null}
            {content.commitmentBody ? (
              <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/75">{content.commitmentBody}</p>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="bg-[#0a0c0b] px-5 pb-16 text-white min-[960px]:px-8 min-[960px]:pb-24">
        <div className="mx-auto max-w-[1360px] rounded-tl-[34px] rounded-tr-[34px] rounded-br-[34px] rounded-bl-[110px] border border-white/15 bg-[linear-gradient(135deg,#111512,#050706)] px-8 py-14 min-[960px]:px-20 min-[960px]:py-[70px]">
          <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
            <span className="h-px w-8 bg-[#C8FF2E]" />
            Start a project
          </p>
          <h2 className={`${display} mt-5 max-w-[12ch] text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.92] font-semibold tracking-[-0.045em]`}>
            Let’s build.
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
            {company?.name
              ? `Tell ${company.name} about the site, the schedule, and what the building has to do. A preconstruction lead will reply.`
              : "Tell us about the site, the schedule, and what the building has to do."}
          </p>
          <Link href={contactHref} className="mt-8 inline-flex rounded-full bg-[#C8FF2E] px-6 py-3.5 text-sm font-semibold text-[#0a0c0b]">
            Start a conversation
          </Link>
        </div>
      </section>
    </ModernPageFrame>
  );
}

function SpecialtyTopic({
  section,
  index,
  practices,
}: {
  section: SpecialtySection;
  index: number;
  practices: OptionalPagePractice[];
}) {
  const number = section.number ?? index + 1;
  const paragraphs = paragraphsOf(section.content);

  if (section.layoutType === "darkSpotlight") {
    return <DarkTopic section={section} number={number} paragraphs={paragraphs} />;
  }

  if (section.layoutType === "metricsBand") {
    return <MetricsTopic section={section} number={number} />;
  }

  if (section.layoutType === "practiceCards") {
    return <PracticeTopic section={section} number={number} practices={practices} />;
  }

  if (section.layoutType === "processRail") {
    return <ProcessTopic section={section} number={number} />;
  }

  return <SplitTopic section={section} number={number} index={index} paragraphs={paragraphs} />;
}

function TopicHeading({ number, label, title }: { number: number; label: string; title: string }) {
  return (
    <>
      <p className="text-[12px] font-extrabold tracking-[0.16em] text-[#667067] uppercase">
        {pad(number)}
        {title !== label ? <span className="ml-3">{label}</span> : null}
      </p>
      <h3 className={`${display} mt-3 text-[clamp(1.8rem,2.6vw,2.6rem)] leading-[1.12] font-semibold tracking-[-0.04em]`}>
        {title}
      </h3>
    </>
  );
}

function SplitTopic({
  section,
  number,
  index,
  paragraphs,
}: {
  section: SpecialtySection;
  number: number;
  index: number;
  paragraphs: string[];
}) {
  const hasImage = Boolean(section.image?.url);
  const imageFirst = index % 2 === 1;
  const wideItems = section.layoutType === "integrationSplit";

  return (
    <section id={section.slug} className="bg-[#f3f1e9] px-5 text-[#0a0c0b] min-[960px]:px-8">
      <article
        className={`mx-auto grid max-w-[1360px] items-center gap-8 border-t border-black/15 py-14 min-[960px]:gap-16 min-[960px]:py-20 ${hasImage ? "min-[960px]:grid-cols-2" : ""}`}
      >
        <div className={hasImage && imageFirst ? "min-[960px]:order-2" : undefined}>
          <TopicHeading number={number} label={section.title} title={section.headline?.trim() || section.title} />
          {section.description ? <p className="mt-4 text-[17px] leading-relaxed text-[#3e4438]">{section.description}</p> : null}
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-4 text-[17px] leading-relaxed text-[#3e4438]">
              {paragraph}
            </p>
          ))}
          {section.supportingItems?.length && section.layoutType !== "tradeGrid" ? (
            <ul className={wideItems ? "mt-6 space-y-3" : "mt-6 grid gap-2 min-[720px]:grid-cols-2"}>
              {section.supportingItems.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-snug">
                  <span className="mt-[0.55rem] h-px w-4 shrink-0 bg-[#0a0c0b]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {hasImage && section.image?.url ? (
          <div className={imageFirst ? "min-[960px]:order-1" : undefined}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={section.image.url}
              alt={section.image.alt || ""}
              className="aspect-[4/3] w-full rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] object-cover"
            />
          </div>
        ) : null}
      </article>
      {section.layoutType === "tradeGrid" && section.supportingItems && section.supportingItems.length > 0 ? (
        <ul className="mx-auto -mt-6 grid max-w-[1360px] gap-x-8 gap-y-3 pb-14 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-3 min-[960px]:pb-20">
          {section.supportingItems.map((item, itemIndex) => (
            <li key={item} className="flex gap-3 border-t border-black/15 pt-3 text-[15px] leading-snug">
              <span className="text-[12px] font-extrabold tracking-[0.12em] text-[#667067]">{pad(itemIndex + 1)}</span>
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function ProcessTopic({ section, number }: { section: SpecialtySection; number: number }) {
  return (
    <section id={section.slug} className="bg-[#f3f1e9] px-5 text-[#0a0c0b] min-[960px]:px-8">
      <div className="mx-auto max-w-[1360px] border-t border-black/15 py-14 min-[960px]:py-20">
        <TopicHeading number={number} label={section.title} title={section.headline?.trim() || section.title} />
        {section.description ? <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-[#3e4438]">{section.description}</p> : null}
        {paragraphsOf(section.content).map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-4 max-w-3xl text-[17px] leading-relaxed text-[#3e4438]">
            {paragraph}
          </p>
        ))}
        {section.timelineSteps?.length ? (
          <ol className="mt-10 grid gap-6 min-[960px]:grid-cols-5">
            {section.timelineSteps.map((step, stepIndex) => (
              <li key={`${step.label}-${stepIndex}`} className="border-t border-black/15 pt-4">
                <p className="text-[12px] font-extrabold tracking-[0.16em] text-[#667067]">{pad(stepIndex + 1)}</p>
                <p className={`${display} mt-3 text-[1.25rem] leading-tight font-semibold tracking-[-0.03em]`}>{step.label}</p>
                {step.title ? <p className="mt-2 text-[14px] leading-snug text-[#3e4438]">{step.title}</p> : null}
              </li>
            ))}
          </ol>
        ) : null}
        {section.supportingItems?.length ? (
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {section.supportingItems.map((item) => (
              <li key={item} className="flex gap-3 text-[15px]">
                <span className="mt-[0.55rem] h-px w-4 shrink-0 bg-[#0a0c0b]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

function DarkTopic({
  section,
  number,
  paragraphs,
}: {
  section: SpecialtySection;
  number: number;
  paragraphs: string[];
}) {
  return (
    <section id={section.slug} className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24">
      <article className="mx-auto grid max-w-[1360px] items-center gap-10 min-[960px]:grid-cols-2 min-[960px]:gap-16">
        <div className="min-w-0">
          <p className="text-[12px] font-extrabold tracking-[0.16em] text-[#C8FF2E] uppercase">
            {pad(number)} {section.title}
          </p>
          <h3 className={`${display} mt-3 text-[clamp(1.8rem,2.6vw,2.6rem)] leading-[1.12] font-semibold tracking-[-0.04em]`}>
            {section.headline?.trim() || section.title}
          </h3>
          {section.description ? <p className="mt-4 text-[17px] leading-relaxed text-white/75">{section.description}</p> : null}
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-4 text-[17px] leading-relaxed text-white/75">
              {paragraph}
            </p>
          ))}
        </div>
        {section.image?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={section.image.url}
            alt={section.image.alt || ""}
            className="aspect-[4/3] w-full rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] object-cover"
          />
        ) : null}
      </article>
    </section>
  );
}

function MetricsTopic({ section, number }: { section: SpecialtySection; number: number }) {
  return (
    <section id={section.slug} className="bg-[#f3f1e9] px-5 text-[#0a0c0b] min-[960px]:px-8">
      <div className="mx-auto max-w-[1360px] border-t border-black/15 py-14 min-[960px]:py-20">
        <TopicHeading number={number} label={section.title} title={section.headline?.trim() || section.title} />
        {section.description ? <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-[#3e4438]">{section.description}</p> : null}
        {paragraphsOf(section.content).map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-4 max-w-3xl text-[17px] leading-relaxed text-[#3e4438]">
            {paragraph}
          </p>
        ))}
        {section.metrics?.length ? (
          <ul className="mt-10 grid gap-[18px] min-[720px]:grid-cols-2 min-[1180px]:grid-cols-4">
            {section.metrics.map((metric) => (
              <li key={metric.label} className="rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] border border-black/15 p-6">
                <p className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067] uppercase">{metric.label}</p>
                <p className={`${display} mt-4 text-[1.45rem] leading-[1.2] font-semibold tracking-[-0.03em]`}>{metric.value}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

function PracticeTopic({
  section,
  number,
  practices,
}: {
  section: SpecialtySection;
  number: number;
  practices: OptionalPagePractice[];
}) {
  return (
    <section id={section.slug} className="bg-[#f3f1e9] px-5 text-[#0a0c0b] min-[960px]:px-8">
      <div className="mx-auto max-w-[1360px] border-t border-black/15 py-14 min-[960px]:py-20">
        <TopicHeading number={number} label={section.title} title={section.headline?.trim() || section.title} />
        {section.description ? <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-[#3e4438]">{section.description}</p> : null}
        {paragraphsOf(section.content).map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-4 max-w-3xl text-[17px] leading-relaxed text-[#3e4438]">
            {paragraph}
          </p>
        ))}
        {practices.length ? (
          <ul className="mt-10 grid gap-[18px] min-[960px]:grid-cols-2 min-[1180px]:grid-cols-3">
            {practices.map((practice) => (
              <li key={practice.id} className="overflow-hidden rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] border border-black/15 bg-white/40">
                {practice.image?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={practice.image.url} alt={practice.image.alt || ""} className="aspect-[4/3] w-full object-cover" />
                ) : null}
                <div className="p-6">
                  <h4 className={`${display} text-[1.35rem] leading-tight font-semibold tracking-[-0.03em]`}>{practice.title}</h4>
                  {practice.description ? <p className="mt-3 text-[15px] leading-relaxed text-[#3e4438]">{practice.description}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export const SPECIALTY_CONTRACTOR_PAGE_SLUG = "specialty-contractor" as const;
