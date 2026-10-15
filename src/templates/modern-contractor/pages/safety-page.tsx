import Link from "next/link";
import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapCollectionItems, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import type { OptionalPage, SafetySection } from "@/templates/shared/cms/types/pages";
import { planSafetyPageContent } from "@/templates/corporate-construction/components/safety-page-content";
import { ModernPageFrame } from "@/templates/modern-contractor/components/modern-page-frame";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { pad } from "@/templates/modern-contractor/theme/ui";

const display = "font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif]";
const heading = `${display} text-[clamp(2.2rem,3.6vw,3.35rem)] leading-[1.32] font-semibold tracking-[-0.04em]`;

type ModernSafetyPageProps = TemplatePageProps & {
  page: OptionalPage;
};

function paragraphsOf(content?: string): string[] {
  if (!content?.trim()) return [];
  return content
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function ModernContractorSafetyPage({ page, ...props }: ModernSafetyPageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const certifications = unwrapCollectionItems(props.payload.certifications);
  const content = planSafetyPageContent(page, certifications);
  const homeHref = previewHref(props.mode, "/");
  const contactHref = previewHref(props.mode, "/contact");
  const topicCount = content.safetySections.length;

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
            <span className="text-white">Safety</span>
          </nav>
          <div className="mt-auto grid items-end gap-10 pt-16 min-[960px]:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
                <span className="h-px w-8 bg-[#C8FF2E]" />
                Safety
              </p>
              <h1 className={`${display} mt-5 text-[clamp(2.4rem,3.6vw,3.5rem)] leading-[1.28] font-semibold tracking-[-0.04em] text-balance`}>
                {content.headline}
              </h1>
              {content.heroDescription ? (
                <p className="mt-6 max-w-[40rem] text-[17px] leading-relaxed text-white/78">{content.heroDescription}</p>
              ) : null}
            </div>
            {topicCount ? (
              <aside className="border-l border-white/25 py-2 pl-6">
                <p className="text-[11px] tracking-[0.14em] text-[#9ba49c] uppercase">Focus areas</p>
                <p className={`${display} mt-2 text-[2.4rem] leading-none font-semibold`}>{pad(topicCount)}</p>
                <p className="mt-3 text-[13px] tracking-[0.08em] text-white/80 uppercase">Site safety program</p>
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      {content.approachHeading || content.approachParagraphs.length ? (
        <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="safety-approach-heading">
          <div className="mx-auto grid max-w-[1360px] gap-8 min-[960px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[960px]:gap-16">
            <div className="min-w-0">
              <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
                <span className="h-px w-8 bg-[#0a0c0b]" />
                On site
              </p>
              <h2 id="safety-approach-heading" className={`${heading} mt-5`}>
                {content.approachHeading || "How safety is managed on site"}
              </h2>
            </div>
            {content.approachParagraphs.length ? (
              <div className="space-y-5 text-[17px] leading-relaxed text-[#3e4438]">
                {content.approachParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {content.safetySections.map((section) => (
        <SafetyTopic key={section.slug} section={section} />
      ))}

      {content.commitmentHeading || content.commitmentBody ? (
        <section className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="safety-commitment-heading">
          <div className="mx-auto max-w-[1360px]">
            <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
              <span className="h-px w-8 bg-[#C8FF2E]" />
              Commitment
            </p>
            {content.commitmentHeading ? (
              <h2 id="safety-commitment-heading" className={`${heading} mt-5 max-w-4xl`}>
                {content.commitmentHeading}
              </h2>
            ) : null}
            {content.commitmentBody ? <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/75">{content.commitmentBody}</p> : null}
          </div>
        </section>
      ) : null}

      <section className="bg-[#0a0c0b] px-5 pb-16 text-white min-[960px]:px-8 min-[960px]:pb-24">
        <div className="mx-auto max-w-[1360px] rounded-tl-[34px] rounded-tr-[34px] rounded-br-[34px] rounded-bl-[110px] border border-white/15 bg-[linear-gradient(135deg,#111512,#050706)] px-8 py-14 min-[960px]:px-20 min-[960px]:py-[70px]">
          <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
            <span className="h-px w-8 bg-[#C8FF2E]" />
            Site safety
          </p>
          <h2 className={`${display} mt-5 max-w-3xl text-[clamp(2.4rem,4vw,3.8rem)] leading-[1.32] font-semibold tracking-[-0.04em]`}>
            Questions about site safety?
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
            {company?.name
              ? `Field leadership at ${company.name} will walk you through the program.`
              : "Field leadership will walk you through the program."}
          </p>
          <Link href={contactHref} className="mt-8 inline-flex rounded-full bg-[#C8FF2E] px-6 py-3.5 text-sm font-semibold text-[#0a0c0b]">
            Contact us
          </Link>
        </div>
      </section>
    </ModernPageFrame>
  );
}

function SafetyTopic({ section }: { section: SafetySection }) {
  switch (section.layoutType) {
    case "immersiveDark":
      return <DarkTopic section={section} />;
    case "peopleFeature":
      return <PeopleTopic section={section} />;
    case "technicalList":
      return <ListTopic section={section} />;
    case "timeline":
      return <TimelineTopic section={section} />;
    case "evidence":
      return <EvidenceTopic section={section} />;
    case "editorialSplit":
    default:
      return <SplitTopic section={section} />;
  }
}

function SplitTopic({ section }: { section: SafetySection }) {
  const extra = paragraphsOf(section.content);
  return (
    <section id={section.slug} className="bg-[#f3f1e9] px-5 text-[#0a0c0b] min-[960px]:px-8" aria-labelledby={`safety-${section.slug}`}>
      <article className="mx-auto grid max-w-[1360px] items-center gap-8 border-t border-black/15 py-14 min-[960px]:grid-cols-2 min-[960px]:gap-16 min-[960px]:py-20">
        <div className="min-w-0">
          <p className="text-[12px] font-extrabold tracking-[0.16em] text-[#667067]">{pad(section.number ?? 1)}</p>
          <h2 id={`safety-${section.slug}`} className={`${heading} mt-3`}>
            {section.headline?.trim() || section.title}
          </h2>
          {section.description ? <p className="mt-4 text-[17px] leading-relaxed text-[#3e4438]">{section.description}</p> : null}
          {extra.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-4 text-[17px] leading-relaxed text-[#3e4438]">
              {paragraph}
            </p>
          ))}
          <ItemList items={section.supportingItems} />
        </div>
        <TopicImage section={section} />
      </article>
    </section>
  );
}

function DarkTopic({ section }: { section: SafetySection }) {
  const items = section.supportingItems ?? [];
  return (
    <section id={section.slug} className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24" aria-labelledby={`safety-${section.slug}`}>
      <div className="mx-auto max-w-[1360px]">
        <div className="grid items-center gap-10 min-[960px]:grid-cols-2 min-[960px]:gap-16">
          <div className="min-w-0">
            <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
              <span className="h-px w-8 bg-[#C8FF2E]" />
              {pad(section.number ?? 2)} · {section.title}
            </p>
            <h2 id={`safety-${section.slug}`} className={`${heading} mt-5`}>
              {section.headline?.trim() || section.title}
            </h2>
            {section.description ? <p className="mt-5 text-[17px] leading-relaxed text-white/75">{section.description}</p> : null}
          </div>
          <TopicImage section={section} />
        </div>
        {items.length ? (
          <ol className="mt-12 grid gap-6 border-t border-white/15 pt-8 min-[960px]:grid-cols-4">
            {items.map((item, index) => (
              <li key={item}>
                <p className="text-[12px] font-extrabold tracking-[0.14em] text-[#C8FF2E]">{pad(index + 1)}</p>
                <p className={`${display} mt-3 text-[1.25rem] leading-tight font-semibold tracking-[-0.03em]`}>{item}</p>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}

function PeopleTopic({ section }: { section: SafetySection }) {
  return (
    <section id={section.slug} className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby={`safety-${section.slug}`}>
      <article className="mx-auto grid max-w-[1360px] items-center gap-10 min-[960px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[960px]:gap-16">
        <TopicImage section={section} />
        <div className="min-w-0">
          <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
            <span className="h-px w-8 bg-[#0a0c0b]" />
            {pad(section.number ?? 3)} · {section.title}
          </p>
          <h2 id={`safety-${section.slug}`} className={`${heading} mt-5`}>
            {section.headline?.trim() || section.title}
          </h2>
          {section.description ? <p className="mt-5 text-[17px] leading-relaxed text-[#3e4438]">{section.description}</p> : null}
          <ItemList items={section.supportingItems} />
        </div>
      </article>
    </section>
  );
}

function ListTopic({ section }: { section: SafetySection }) {
  const items = section.supportingItems ?? [];
  return (
    <section id={section.slug} className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby={`safety-${section.slug}`}>
      <div className="mx-auto grid max-w-[1360px] gap-10 border-t border-black/15 pt-14 min-[960px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[960px]:gap-16 min-[960px]:pt-20">
        <div className="min-w-0">
          <p className="text-[12px] font-extrabold tracking-[0.16em] text-[#667067]">{pad(section.number ?? 4)}</p>
          <h2 id={`safety-${section.slug}`} className={`${heading} mt-3`}>
            {section.title}
          </h2>
          {section.description ? <p className="mt-5 text-[17px] leading-relaxed text-[#3e4438]">{section.description}</p> : null}
          <div className="mt-8 max-w-sm">
            <TopicImage section={section} />
          </div>
        </div>
        {items.length ? (
          <ol className="border-t border-black/15">
            {items.map((item, index) => (
              <li key={item} className="grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-4 border-b border-black/15 py-5">
                <span className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067]">{pad(index + 1)}</span>
                <span className={`${display} text-[1.35rem] leading-tight font-semibold tracking-[-0.03em]`}>{item}</span>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}

function TimelineTopic({ section }: { section: SafetySection }) {
  const steps = section.timelineSteps ?? [];
  return (
    <section id={section.slug} className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24" aria-labelledby={`safety-${section.slug}`}>
      <div className="mx-auto max-w-[1360px]">
        <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
          <span className="h-px w-8 bg-[#C8FF2E]" />
          {pad(section.number ?? 5)} · {section.title}
        </p>
        <h2 id={`safety-${section.slug}`} className={`${heading} mt-5 max-w-3xl`}>
          {section.headline?.trim() || section.title}
        </h2>
        {section.description ? <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/75">{section.description}</p> : null}
        {steps.length ? (
          <ol className="mt-12 grid gap-6 min-[960px]:grid-cols-5">
            {steps.map((step, index) => (
              <li key={step.label} className="border-t border-[#C8FF2E] pt-4">
                <p className="text-[12px] font-extrabold tracking-[0.14em] text-[#C8FF2E]">{pad(index + 1)}</p>
                <p className={`${display} mt-4 text-[1.35rem] leading-tight font-semibold tracking-[-0.03em]`}>{step.label}</p>
                {step.title ? <p className="mt-3 text-[14px] leading-relaxed text-white/72">{step.title}</p> : null}
              </li>
            ))}
          </ol>
        ) : null}
        {section.supportingItems?.length ? (
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-6">
            {section.supportingItems.map((item) => (
              <li key={item} className="text-[13px] tracking-[0.08em] text-white/70 uppercase">
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

function EvidenceTopic({ section }: { section: SafetySection }) {
  const flow = section.evidenceFlow ?? [];
  return (
    <section id={section.slug} className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby={`safety-${section.slug}`}>
      <div className="mx-auto grid max-w-[1360px] gap-10 min-[960px]:grid-cols-2 min-[960px]:gap-16">
        <div className="min-w-0">
          <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
            <span className="h-px w-8 bg-[#0a0c0b]" />
            {pad(section.number ?? 6)} · {section.title}
          </p>
          <h2 id={`safety-${section.slug}`} className={`${heading} mt-5`}>
            {section.headline?.trim() || section.title}
          </h2>
          {section.description ? <p className="mt-5 text-[17px] leading-relaxed text-[#3e4438]">{section.description}</p> : null}
          <div className="mt-8">
            <TopicImage section={section} />
          </div>
        </div>
        {flow.length ? (
          <ol className="border-t border-black/15">
            {flow.map((step, index) => (
              <li key={step} className="grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-4 border-b border-black/15 py-5">
                <span className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067]">{pad(index + 1)}</span>
                <span className={`${display} text-[1.35rem] leading-tight font-semibold tracking-[-0.03em]`}>{step}</span>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}

function ItemList({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-6 grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-snug">
          <span className="mt-[0.55rem] h-px w-4 shrink-0 bg-[#0a0c0b]" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

function TopicImage({ section }: { section: SafetySection }) {
  if (!section.image?.url) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={section.image.url}
      alt={section.image.alt || ""}
      className="aspect-[4/3] w-full rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] object-cover"
    />
  );
}
