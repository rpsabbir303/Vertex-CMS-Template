import Link from "next/link";
import type { TemplatePageProps } from "@/registry/template-types";
import type { CmsImage } from "@/templates/shared/cms/types/media";
import type { Project, ProjectDeliveryStage } from "@/templates/shared/cms/types/projects";
import {
  deliveryStageDomId,
  projectOverviewFacts,
  resolveDeliveryStages,
  resolveProjectIntroduction,
} from "@/templates/corporate-construction/utils/project-delivery";
import { ArrowIcon, Eyebrow, PillLink } from "@/templates/industrial-civil/components/pill-link";
import { IndustrialFrame } from "@/templates/industrial-civil/components/industrial-frame";
import { RecordHeading, bodyCopy, pageContainer, sectionTitle } from "@/templates/industrial-civil/components/record-heading";
import { readIndustrialSite, splitParagraphs } from "@/templates/industrial-civil/utils/site-content";
import { previewHref } from "@/templates/industrial-civil/utils/preview-href";

const KEY_FACT_LABELS = new Set(["Year", "Duration", "Sector", "Location", "Status"]);

export function IndustrialCivilProjectDetailPage(props: TemplatePageProps) {
  const { projects } = readIndustrialSite(props.payload);
  const project = projects.find((item) => item.slug === props.entitySlug);
  const href = (path: string) => previewHref(props.mode, path);

  if (!project) {
    return (
      <IndustrialFrame {...props}>
        <RecordHeading title="Project unavailable" primaryHref={href("/contact")} secondaryHref={href("/projects")} />
      </IndustrialFrame>
    );
  }

  const facts = [
    ...projectOverviewFacts(project),
    ...(project.metadata?.status
      ? [{ label: "Status", value: project.metadata.status === "ongoing" ? "Ongoing" : "Completed" }]
      : []),
  ];
  const keyFacts = facts.filter((fact) => KEY_FACT_LABELS.has(fact.label));
  const introduction = resolveProjectIntroduction(project);
  const stages = resolveDeliveryStages(project);
  const gallery = project.gallery?.images.filter((image) => image.url) ?? [];
  const related = similarSectorProjects(project, projects);
  const outcome = project.outcome;
  const summary = outcome?.summary?.trim() || outcome?.statement?.trim();
  const showBeforeAfter = Boolean(project.beforeImage?.url && project.afterImage?.url);

  return (
    <IndustrialFrame {...props}>
      <RecordHeading
        eyebrow={project.metadata?.sector ?? "Projects"}
        title={project.title}
        lead={project.summary}
        image={project.image}
        primaryHref={href("/contact")}
        secondaryHref={href("/projects")}
      />

      {facts.length ? (
        <section className="bg-[#F6F8FA] py-[100px]" aria-labelledby="project-stats-heading">
          <div className={pageContainer}>
            <Eyebrow>Project overview</Eyebrow>
            <h2 id="project-stats-heading" className={sectionTitle}>
              Key statistics
            </h2>
            <dl className="mt-12 grid gap-4 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="rounded-[8px] bg-white p-6">
                  <dt className="text-sm font-semibold text-[#5c6570]">{fact.label}</dt>
                  <dd
                    className={
                      fact.value.length > 24
                        ? "mt-3 text-xl leading-snug font-bold text-[#03071E]"
                        : "mt-3 text-[clamp(1.25rem,2vw,1.75rem)] leading-tight font-bold text-[#FF6610]"
                    }
                  >
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {introduction ? (
        <section className="bg-white py-[100px]" aria-labelledby="project-story-heading">
          <div className={`${pageContainer} grid items-start gap-12 min-[960px]:grid-cols-[0.85fr_1.15fr]`}>
            <div>
              <Eyebrow>Project story</Eyebrow>
              <h2 id="project-story-heading" className={sectionTitle}>
                Project overview
              </h2>
            </div>
            <div className="space-y-5">
              {splitParagraphs(introduction).map((paragraph) => (
                <p key={paragraph} className={bodyCopy}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {stages.map((stage, index) => (
        <DeliverySection
          key={stage.slug}
          stage={stage}
          index={index}
          beforeAfter={
            stage.slug === "deliver" && showBeforeAfter
              ? { before: project.beforeImage, after: project.afterImage }
              : undefined
          }
        />
      ))}

      {summary || outcome?.headline || keyFacts.length ? (
        <section className="bg-[#F6F6F6] py-[100px]" aria-labelledby="project-summary-heading">
          <div className={`${pageContainer} grid gap-12 min-[960px]:grid-cols-[0.8fr_1.2fr]`}>
            <div>
              <Eyebrow>{outcome?.eyebrow?.trim() || "Project outcome"}</Eyebrow>
              <h2 id="project-summary-heading" className={sectionTitle}>
                {outcome?.headline?.trim() || "Project summary"}
              </h2>
              {summary ? <p className={`mt-5 ${bodyCopy}`}>{summary}</p> : null}
              {outcome?.statement && outcome.statement.trim() !== summary ? (
                <p className="mt-4 text-xl font-bold text-[#03071E]">{outcome.statement}</p>
              ) : null}
            </div>
            {keyFacts.length ? (
              <div>
                <p className="text-sm font-bold tracking-[0.12em] text-[#5c6570] uppercase">Key information</p>
                <dl className="mt-6 divide-y divide-[#e6e8ec]">
                  {keyFacts.map((fact) => (
                    <div key={fact.label} className="grid grid-cols-[8rem_minmax(0,1fr)] gap-4 py-4">
                      <dt className="text-sm font-semibold text-[#5c6570]">{fact.label}</dt>
                      <dd className="text-lg font-bold text-[#03071E]">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {gallery.length ? (
        <section className="bg-white py-[100px]" aria-labelledby="project-gallery-heading">
          <div className={pageContainer}>
            <Eyebrow>Selected work</Eyebrow>
            <h2 id="project-gallery-heading" className={sectionTitle}>
              Project gallery
            </h2>
            <div className="mt-12 grid gap-4 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-3">
              {gallery.map((image) => (
                <figure key={image.id} className="overflow-hidden rounded-[12px]">
                  <img src={image.url} alt={image.alt} className="h-[260px] w-full object-cover min-[1180px]:h-[320px]" />
                  {image.caption ? <figcaption className="bg-[#F6F8FA] px-4 py-3 text-sm text-[#5c6570]">{image.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="bg-[#F6F8FA] py-[100px]" aria-labelledby="related-projects-heading">
          <div className={pageContainer}>
            <Eyebrow>Selected projects</Eyebrow>
            <h2 id="related-projects-heading" className={`max-w-[16ch] ${sectionTitle}`}>
              More work in similar sectors
            </h2>
            <ul className="mt-12 grid gap-6 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-3">
              {related.map((item) => {
                const meta = [item.metadata?.sector, item.location].filter(Boolean).join(" · ");
                return (
                  <li key={item.id} className="overflow-hidden rounded-[8px] bg-white">
                    {item.image?.url ? (
                      <Link href={href(`/projects/${item.slug}`)} className="block h-[220px] overflow-hidden">
                        <img src={item.image.url} alt={item.image.alt} className="h-full w-full object-cover" />
                      </Link>
                    ) : null}
                    <div className="p-6">
                      {meta ? <p className="text-sm font-bold text-[#FF6610]">{meta}</p> : null}
                      <h3 className="mt-2 text-[22px] leading-snug font-bold text-[#03071E]">
                        <Link href={href(`/projects/${item.slug}`)} className="hover:text-[#FF6610]">
                          {item.title}
                        </Link>
                      </h3>
                      <Link href={href(`/projects/${item.slug}`)} className="mt-4 inline-flex items-center gap-1.5 font-bold text-[#03071E] hover:text-[#FF6610]">
                        View Project <ArrowIcon />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="bg-[#03071E]" aria-labelledby="project-cta-heading">
        <div className={`${pageContainer} flex flex-wrap items-end justify-between gap-8 py-20`}>
          <div>
            <Eyebrow light>Next project</Eyebrow>
            <h2 id="project-cta-heading" className="mt-4 max-w-[14ch] text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.05] font-bold text-white">
              Talk to the people who will build it.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/70">
              Start a conversation about your project, constraints and delivery requirements.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <PillLink href={href("/contact")}>Start a project</PillLink>
            <PillLink href={href("/projects")} variant="outline-light">
              See all projects
            </PillLink>
          </div>
        </div>
      </section>
    </IndustrialFrame>
  );
}

function similarSectorProjects(project: Project, all: Project[], limit = 3): Project[] {
  const picked: Project[] = [];
  for (const slug of project.relatedProjectSlugs ?? []) {
    const match = all.find((item) => item.slug === slug && item.id !== project.id);
    if (match && !picked.some((item) => item.id === match.id)) picked.push(match);
    if (picked.length >= limit) return picked;
  }
  const sector = project.metadata?.sector;
  if (!sector) return picked;
  for (const item of all) {
    if (item.id === project.id || picked.some((entry) => entry.id === item.id)) continue;
    if (item.metadata?.sector !== sector) continue;
    picked.push(item);
    if (picked.length >= limit) break;
  }
  return picked;
}

function DeliverySection({
  stage,
  index,
  beforeAfter,
}: {
  stage: ProjectDeliveryStage & { number: number; title: string };
  index: number;
  beforeAfter?: { before?: CmsImage; after?: CmsImage };
}) {
  const images = stage.images?.filter((image) => image.url) ?? [];
  const tone = index % 2 === 0 ? "bg-white" : "bg-[#F6F8FA]";
  const card = index % 2 === 0 ? "bg-[#F6F8FA]" : "bg-white";
  const progress = stage.progress;

  return (
    <section id={deliveryStageDomId(stage.slug)} className={`${tone} py-[100px]`} aria-labelledby={`stage-${stage.slug}`}>
      <div className={`${pageContainer} grid items-start gap-12 ${images.length ? "min-[960px]:grid-cols-[1.05fr_0.95fr]" : ""}`}>
        <div>
          <p className="text-sm font-bold tracking-[0.14em] text-[#FF6610]">{String(stage.number).padStart(2, "0")}</p>
          <h2 id={`stage-${stage.slug}`} className={sectionTitle}>
            {stage.title}
          </h2>
          {splitParagraphs(stage.narrative).map((paragraph) => (
            <p key={paragraph} className={`mt-5 max-w-3xl ${bodyCopy}`}>
              {paragraph}
            </p>
          ))}
          {stage.insight?.body ? (
            <p className="mt-6 max-w-3xl rounded-[8px] bg-[#FFF1E8] px-5 py-4 text-[#03071E]">
              {stage.insight.title ? <span className="font-bold">{stage.insight.title}. </span> : null}
              {stage.insight.body}
            </p>
          ) : null}
          {stage.milestones?.length ? (
            <ul className="mt-8 grid gap-3 min-[720px]:grid-cols-2">
              {stage.milestones.map((milestone, milestoneIndex) => (
                <li key={milestone.label} className={`rounded-[8px] p-5 ${card}`}>
                  <p className="text-sm font-bold text-[#FF6610]">{String(milestoneIndex + 1).padStart(2, "0")}</p>
                  <p className="mt-2 font-bold text-[#03071E]">{milestone.title || milestone.label}</p>
                  {milestone.description ? <p className={`mt-1 ${bodyCopy}`}>{milestone.description}</p> : null}
                </li>
              ))}
            </ul>
          ) : null}
          {stage.buildPhases?.length ? (
            <ol className="mt-8 space-y-4">
              {stage.buildPhases.map((phase, phaseIndex) => (
                <li key={phase.label} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-3">
                  <span className="font-bold text-[#FF6610]">{String(phaseIndex + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-bold text-[#03071E]">{phase.label}</span>
                    {phase.description ? <span className={`mt-1 block ${bodyCopy}`}>{phase.description}</span> : null}
                  </span>
                </li>
              ))}
            </ol>
          ) : null}
          {stage.controlPillars?.length ? (
            <ul className="mt-8 grid gap-4 min-[720px]:grid-cols-2">
              {stage.controlPillars.map((pillar) => (
                <li key={pillar.label} className={`rounded-[8px] p-5 ${card}`}>
                  <p className="font-bold text-[#03071E]">{pillar.label}</p>
                  <p className={`mt-2 ${bodyCopy}`}>{pillar.body}</p>
                </li>
              ))}
            </ul>
          ) : null}
          {stage.metrics?.length ? (
            <dl className="mt-8 grid gap-4 min-[720px]:grid-cols-3">
              {stage.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="text-sm text-[#5c6570]">{metric.label}</dt>
                  <dd className="mt-1 text-2xl font-bold text-[#FF6610]">{metric.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {progress && (progress.currentPhaseLabel || progress.milestoneLabels?.length) ? (
            <div className="mt-8">
              {progress.currentPhaseLabel ? (
                <p className="font-bold text-[#03071E]">Current phase: {progress.currentPhaseLabel}</p>
              ) : null}
              {progress.milestoneLabels?.length ? (
                <ul className="mt-3 space-y-2">
                  {progress.milestoneLabels.map((label) => (
                    <li key={label} className={bodyCopy}>
                      {label}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
        {images.length || beforeAfter ? (
          <div className="grid gap-4">
            {images.map((image) => (
              <img key={image.id} src={image.url} alt={image.alt} className="h-[280px] w-full rounded-[12px] object-cover" />
            ))}
            {beforeAfter?.before?.url && beforeAfter.after?.url ? (
              <div className="grid gap-4 min-[720px]:grid-cols-2">
                <figure>
                  <img src={beforeAfter.before.url} alt={beforeAfter.before.alt} className="h-[180px] w-full rounded-[12px] object-cover" />
                  <figcaption className="mt-2 text-sm font-bold tracking-[0.08em] text-[#03071E] uppercase">Before</figcaption>
                </figure>
                <figure>
                  <img src={beforeAfter.after.url} alt={beforeAfter.after.alt} className="h-[180px] w-full rounded-[12px] object-cover" />
                  <figcaption className="mt-2 text-sm font-bold tracking-[0.08em] text-[#03071E] uppercase">After</figcaption>
                </figure>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
