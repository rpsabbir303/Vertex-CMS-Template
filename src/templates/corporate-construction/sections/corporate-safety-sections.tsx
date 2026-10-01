import type { SafetySection } from "@/templates/shared/cms/types/pages";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { ArchitecturalGrid } from "@/templates/corporate-construction/components/ui/architectural-grid";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { splitSafetyContent } from "@/templates/corporate-construction/utils/safety-sections";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateSafetySectionsProps = {
  sections: SafetySection[];
};

function SectionNumber({ n }: { n: number }) {
  return (
    <span className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,4vw,4rem)] font-semibold leading-none tracking-[-0.05em] text-[var(--color-text)]/15">
      {pad(n)}
    </span>
  );
}

function EditorialSplit({ section }: { section: SafetySection }) {
  const n = section.number ?? 1;
  const extra = splitSafetyContent(section.content);
  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby={`safety-${section.slug}`}>
      <div className="vertex-container grid gap-12 py-28 md:grid-cols-12 md:items-center md:gap-14 md:py-36 lg:py-40">
        {section.image?.url ? (
          <Reveal plate className="md:col-span-6 lg:col-span-7">
            <div className={cn(ui.plate, "aspect-[4/3] min-h-[16rem] md:aspect-[16/11]")}>
              <CmsImageMedia image={section.image} aspect="auto" className="h-full w-full object-cover" sizes="(min-width: 768px) 55vw, 100vw" />
            </div>
          </Reveal>
        ) : null}
        <div className={cn(section.image?.url ? "md:col-span-6 lg:col-span-5" : "md:col-span-12")}>
          <SectionNumber n={n} />
          <p className={cn(ui.mono, "mt-4 text-[var(--color-accent)]")}>{section.title}</p>
          <h2 id={`safety-${section.slug}`} className={cn(ui.h3, "mt-4 max-w-[16ch] text-balance")}>
            {section.headline ?? section.title}
          </h2>
          {section.description ? <p className={cn(ui.lead, "mt-6 max-w-lg")}>{section.description}</p> : null}
          {extra.map((p) => (
            <p key={p.slice(0, 40)} className={cn(ui.body, "mt-4 max-w-lg")}>
              {p}
            </p>
          ))}
          {section.supportingItems?.length ? (
            <ul className="mt-8 space-y-3 border-t border-[var(--color-border)] pt-8">
              {section.supportingItems.map((item) => (
                <li key={item} className={cn(ui.mono, "text-[var(--color-text-muted)]")}>
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ImmersiveDark({ section }: { section: SafetySection }) {
  const n = section.number ?? 2;
  const items = section.supportingItems ?? [];
  return (
    <section className="relative overflow-hidden bg-[var(--color-primary)] text-white" aria-labelledby={`safety-${section.slug}`}>
      <ArchitecturalGrid tone="dark" className="pointer-events-none absolute inset-0 opacity-35" />
      {section.image?.url ? (
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <CmsImageMedia image={section.image} aspect="auto" className="h-full w-full object-cover" sizes="100vw" />
        </div>
      ) : null}
      <div className="vertex-container relative py-28 md:py-36 lg:py-40">
        <p className={cn(ui.mono, "text-white/55")}>{pad(n)}</p>
        <h2 id={`safety-${section.slug}`} className={cn(ui.h2, "mt-4 max-w-[14ch] !text-white text-balance")}>
          {section.headline ?? "Daily coordination keeps the site moving."}
        </h2>
        {section.description ? <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-white/75">{section.description}</p> : null}
        {items.length ? (
          <ol className="mt-14 grid gap-8 border-t border-white/15 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => (
              <li key={item}>
                <span className={cn(ui.mono, "text-white/50")}>{pad(index + 1)}</span>
                <p className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em]">{item}</p>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}

function PeopleFeature({ section }: { section: SafetySection }) {
  const n = section.number ?? 3;
  return (
    <section className="bg-[var(--color-surface-muted)]" aria-labelledby={`safety-${section.slug}`}>
      <div className="vertex-container grid gap-12 py-28 md:grid-cols-12 md:items-center md:gap-14 md:py-36 lg:py-40">
        <div className="md:col-span-5 md:order-2">
          <SectionNumber n={n} />
          <p className={cn(ui.mono, "mt-4 text-[var(--color-accent)]")}>{section.title}</p>
          <h2 id={`safety-${section.slug}`} className="mt-4 max-w-[14ch] text-balance font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
            {section.headline ?? section.title}
          </h2>
          {section.description ? <p className={cn(ui.body, "mt-6 max-w-md text-lg")}>{section.description}</p> : null}
          {section.supportingItems?.length ? (
            <ul className="mt-8 space-y-2">
              {section.supportingItems.map((item) => (
                <li key={item} className="text-base leading-relaxed text-[var(--color-text-muted)]">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {section.image?.url ? (
          <Reveal plate className="md:col-span-7 md:order-1">
            <div className={cn(ui.plate, "aspect-[4/5] max-h-[32rem] w-full md:max-h-none")}>
              <CmsImageMedia image={section.image} aspect="auto" className="h-full w-full object-cover" sizes="(min-width: 768px) 45vw, 100vw" />
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function TechnicalList({ section }: { section: SafetySection }) {
  const n = section.number ?? 4;
  const items = section.supportingItems ?? [];
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]" aria-labelledby={`safety-${section.slug}`}>
      <div className="vertex-container grid gap-12 py-28 md:grid-cols-12 md:gap-16 md:py-36 lg:py-40">
        <div className="md:col-span-5 lg:col-span-4">
          <p className={cn(ui.mono, "text-[var(--color-accent)]")}>{pad(n)}</p>
          <h2
            id={`safety-${section.slug}`}
            className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-[var(--color-text)]"
          >
            {section.title.split(/\s+/).slice(0, 2).join(" ")}
            <br />
            {section.title.split(/\s+/).slice(2).join(" ") || " "}
          </h2>
          {section.description ? <p className={cn(ui.body, "mt-8 max-w-sm")}>{section.description}</p> : null}
        </div>
        <div className="md:col-span-7 lg:col-span-8">
          {items.length ? (
            <ul className="divide-y border-t border-[var(--color-border)]">
              {items.map((item) => (
                <li key={item} className="py-5 font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-[var(--color-text)] md:text-2xl">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
          {section.image?.url ? (
            <div className={cn(ui.plate, "mt-10 aspect-[16/9] max-w-md overflow-hidden")}>
              <CmsImageMedia image={section.image} aspect="auto" className="h-full w-full object-cover" sizes="28vw" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function TimelineFlow({ section }: { section: SafetySection }) {
  const n = section.number ?? 5;
  const steps = section.timelineSteps ?? [];
  return (
    <section className="bg-[var(--color-surface-muted)]" aria-labelledby={`safety-${section.slug}`}>
      <div className="vertex-container py-28 md:py-36 lg:py-40">
        <p className={cn(ui.mono, "text-[var(--color-accent)]")}>{pad(n)} · {section.title}</p>
        <h2 id={`safety-${section.slug}`} className={cn(ui.h2, "mt-5 max-w-[16ch] text-balance")}>
          {section.headline ?? "Prepared before the unexpected happens."}
        </h2>
        {section.description ? <p className={cn(ui.body, "mt-6 max-w-2xl text-lg")}>{section.description}</p> : null}
        {steps.length ? (
          <ol className="mt-16 flex flex-col gap-0 md:flex-row md:items-start md:justify-between md:gap-4">
            {steps.map((step, index) => (
              <li key={step.label} className="relative flex flex-1 flex-col border-t border-[var(--color-border)] pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-6 md:first:border-l-0 md:first:pl-0">
                {index < steps.length - 1 ? (
                  <span className="absolute right-0 top-8 hidden text-[var(--color-text-muted)] md:block" aria-hidden>
                    →
                  </span>
                ) : null}
                <span className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{pad(index + 1)}</span>
                <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.02em]">{step.label}</p>
                {step.title ? <p className={cn(ui.small, "mt-2")}>{step.title}</p> : null}
              </li>
            ))}
          </ol>
        ) : null}
        {section.supportingItems?.length ? (
          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-border)] pt-8">
            {section.supportingItems.map((item) => (
              <li key={item} className={cn(ui.mono, "text-[var(--color-text-muted)]")}>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

function EvidenceReview({ section }: { section: SafetySection }) {
  const n = section.number ?? 6;
  const flow = section.evidenceFlow ?? [];
  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby={`safety-${section.slug}`}>
      <div className="vertex-container grid gap-12 py-28 md:grid-cols-12 md:py-36 lg:py-40">
        <div className="md:col-span-5">
          <SectionNumber n={n} />
          <p className={cn(ui.mono, "mt-4 text-[var(--color-accent)]")}>{section.title}</p>
          <h2 id={`safety-${section.slug}`} className={cn(ui.h2, "mt-4 max-w-[14ch]")}>
            {section.headline ?? "Safety is reviewed throughout the work."}
          </h2>
          {section.description ? <p className={cn(ui.body, "mt-6 max-w-md")}>{section.description}</p> : null}
        </div>
        <div className="md:col-span-7">
          {flow.length ? (
            <ol className="border-l border-[var(--color-border)] pl-6">
              {flow.map((step, index) => (
                <li key={step} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[1.625rem] top-1 h-2 w-2 rounded-full bg-[var(--color-accent)]" aria-hidden />
                  <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{pad(index + 1)}</p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em]">{step}</p>
                </li>
              ))}
            </ol>
          ) : null}
          {section.image?.url ? (
            <div className={cn(ui.plate, "mt-10 aspect-[16/10] max-h-72 overflow-hidden")}>
              <CmsImageMedia image={section.image} aspect="auto" className="h-full w-full object-cover" sizes="40vw" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function SafetySectionBlock({ section }: { section: SafetySection }) {
  switch (section.layoutType) {
    case "immersiveDark":
      return <ImmersiveDark section={section} />;
    case "peopleFeature":
      return <PeopleFeature section={section} />;
    case "technicalList":
      return <TechnicalList section={section} />;
    case "timeline":
      return <TimelineFlow section={section} />;
    case "evidence":
      return <EvidenceReview section={section} />;
    case "editorialSplit":
    default:
      return <EditorialSplit section={section} />;
  }
}

export function CorporateSafetySections({ sections }: CorporateSafetySectionsProps) {
  if (!sections.length) return null;
  return (
    <div>
      {sections.map((section) => (
        <SafetySectionBlock key={section.slug} section={section} />
      ))}
    </div>
  );
}
