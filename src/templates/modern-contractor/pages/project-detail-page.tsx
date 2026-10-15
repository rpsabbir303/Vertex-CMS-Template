import Link from "next/link";
import type { TemplatePageProps } from "@/registry/template-types";
import { getSortedCollectionItems, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import type { CmsImage } from "@/templates/shared/cms/types/media";
import type { Project, ProjectDeliveryStageSlug } from "@/templates/shared/cms/types/projects";
import {
  deliveryStageDomId,
  projectOverviewFacts,
  resolveDeliveryStages,
  resolveProjectIntroduction,
  resolveRelatedProjects,
  splitNarrative,
  type ResolvedProjectDeliveryStage,
} from "@/templates/corporate-construction/utils/project-delivery";
import { ModernPageFrame } from "@/templates/modern-contractor/components/modern-page-frame";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { pad, ui } from "@/templates/modern-contractor/theme/ui";
import { cn } from "@/utils/cn";

const display = "font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif]";

function statusLabel(status?: "ongoing" | "completed") {
  if (status === "ongoing") return "Ongoing";
  if (status === "completed") return "Completed";
  return undefined;
}

function placeName(location?: string) {
  const city = location?.split(",")[0]?.trim();
  return city || undefined;
}

function uniqueParagraphs(parts: Array<string | undefined>): string[] {
  const seen = new Set<string>();
  const paragraphs: string[] = [];
  for (const part of parts) {
    for (const paragraph of splitNarrative(part)) {
      if (seen.has(paragraph)) continue;
      seen.add(paragraph);
      paragraphs.push(paragraph);
    }
  }
  return paragraphs;
}

export function ModernContractorProjectDetailPage(props: TemplatePageProps) {
  const projects = getSortedCollectionItems(props.payload.projects);
  const company = unwrapEnvelope(props.payload.company);
  const index = projects.findIndex((item) => item.slug === props.entitySlug);
  const project = index >= 0 ? projects[index] : undefined;

  if (!project) {
    return (
      <ModernPageFrame {...props}>
        <section className="vertex-container pt-40 pb-24">
          <p className={ui.eyebrow}>Projects</p>
          <h1 className={cn(ui.h2, "mt-4")}>Project not found</h1>
          <Link href={previewHref(props.mode, "/projects")} className={cn(ui.btnOutline, "mt-8 inline-flex")}>
            Back to projects
          </Link>
        </section>
      </ModernPageFrame>
    );
  }

  const stages = resolveDeliveryStages(project);
  const facts = projectOverviewFacts(project);
  const status = statusLabel(project.metadata?.status);
  const keyStats = [
    project.metadata?.duration ? { label: "Duration", value: project.metadata.duration } : undefined,
    project.year ? { label: "Year", value: String(project.year) } : undefined,
    status ? { label: "Status", value: status } : undefined,
    project.metadata?.sector ? { label: "Sector", value: project.metadata.sector } : undefined,
  ].filter((item): item is { label: string; value: string } => Boolean(item));
  const statistics = keyStats.length ? keyStats : facts.slice(0, 4);
  const story = uniqueParagraphs([resolveProjectIntroduction(project), project.description]);
  const overviewHeading = project.summary?.trim() || story[0] || project.title;
  const overviewBody = project.summary?.trim() ? story : story.slice(1);
  const gallery = project.gallery?.images.filter((image) => image.url) ?? [];
  const images: CmsImage[] = gallery.length ? gallery : project.image?.url ? [project.image] : [];
  const related = resolveRelatedProjects(project, projects, 3);
  const outcomeHeading = project.outcome?.headline?.trim() || project.outcome?.summary?.trim() || project.outcome?.statement?.trim();
  const outcomeBody =
    project.outcome?.headline?.trim() && project.outcome?.summary?.trim()
      ? project.outcome.summary
      : project.outcome?.statement?.trim() && project.outcome.statement.trim() !== outcomeHeading
        ? project.outcome.statement
        : undefined;
  const city = placeName(project.location);
  const homeHref = previewHref(props.mode, "/");
  const projectsHref = previewHref(props.mode, "/projects");
  const contactHref = previewHref(props.mode, "/contact");

  return (
    <ModernPageFrame {...props}>
      <section className="relative min-h-[640px] overflow-hidden bg-[#0a0c0b] text-white min-[960px]:min-h-[684px]">
        {project.image?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
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
            <Link href={projectsHref} className="hover:text-white">
              Projects
            </Link>
            <span aria-hidden>›</span>
            <span className="text-white">{project.title}</span>
          </nav>
          <div className="mt-auto grid items-end gap-10 pt-16 min-[960px]:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
                <span className="h-px w-8 bg-[#C8FF2E]" />
                Project{project.metadata?.sector ? ` / ${project.metadata.sector}` : ""}
              </p>
              <h1 className={`${display} mt-5 text-[clamp(2.5rem,4.2vw,4.2rem)] leading-[1.12] font-semibold tracking-[-0.04em] text-balance`}>
                {project.title}
                {city ? <span className="text-white/80"> / {city}.</span> : null}
              </h1>
              {project.summary ? <p className="mt-6 max-w-[42rem] text-[17px] leading-relaxed text-white/78">{project.summary}</p> : null}
            </div>
            {status || project.year || project.location ? (
              <aside className="border-l border-white/25 py-2 pl-6">
                {status ? <p className="text-[11px] tracking-[0.14em] text-[#9ba49c] uppercase">{status}</p> : null}
                {project.year ? <p className={`${display} mt-2 text-[2.4rem] leading-none font-semibold`}>{project.year}</p> : null}
                {project.location ? <p className="mt-3 text-[13px] tracking-[0.08em] text-white/80 uppercase">{project.location}</p> : null}
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      {statistics.length ? (
        <section className="bg-[#C8FF2E] px-5 py-10 text-[#0a0c0b] min-[960px]:px-8" aria-label="Project key statistics">
          <dl className="mx-auto grid max-w-[1360px] gap-8 sm:grid-cols-2 min-[960px]:grid-cols-4">
            {statistics.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[11px] tracking-[0.14em] uppercase">{fact.label}</dt>
                <dd className={`${display} mt-2 text-[1.35rem] leading-snug font-semibold tracking-[-0.03em]`}>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {overviewHeading || overviewBody.length ? (
        <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="project-story-heading">
          <div className="mx-auto grid max-w-[1360px] gap-10 min-[960px]:grid-cols-2 min-[960px]:gap-16">
            <div className="min-w-0">
              <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
                <span className="h-px w-8 bg-[#0a0c0b]" />
                Project story
              </p>
              <h2 id="project-story-heading" className={`${display} mt-5 text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.12] font-semibold tracking-[-0.04em]`}>
                {overviewHeading}
              </h2>
            </div>
            {overviewBody.length ? (
              <div className="space-y-5 text-[17px] leading-relaxed text-[#3e4438]">
                {overviewBody.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {stages.length ? (
        <nav aria-label="Project stages" className="border-y border-black/15 bg-[#f3f1e9] px-5 py-5 text-[#0a0c0b] min-[960px]:px-8">
          <div className="mx-auto flex max-w-[1360px] gap-2 overflow-x-auto">
            {stages.map((stage) => (
              <a
                key={stage.slug}
                href={`#${deliveryStageDomId(stage.slug)}`}
                className="shrink-0 rounded-full border border-black/15 px-4 py-2 text-[13px] font-semibold hover:border-[#0a0c0b]"
              >
                {pad(stage.number)} {stage.title}
              </a>
            ))}
          </div>
        </nav>
      ) : null}

      {stages.map((stage) => (
        <DeliveryStage
          key={stage.slug}
          stage={stage}
          projectTitle={project.title}
          beforeImage={stage.slug === "deliver" ? project.beforeImage : undefined}
          afterImage={stage.slug === "deliver" ? project.afterImage : undefined}
        />
      ))}

      {outcomeHeading || facts.length ? (
        <section className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="project-summary-heading">
          <div className="mx-auto grid max-w-[1360px] gap-12 min-[960px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-[960px]:gap-16">
            <div className="min-w-0">
              <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
                <span className="h-px w-8 bg-[#C8FF2E]" />
                {project.outcome?.eyebrow?.trim() || "Project summary"}
              </p>
              {outcomeHeading ? (
                <h2 id="project-summary-heading" className={`${display} mt-5 text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.12] font-semibold tracking-[-0.04em]`}>
                  {outcomeHeading}
                </h2>
              ) : (
                <h2 id="project-summary-heading" className={`${display} mt-5 text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.12] font-semibold tracking-[-0.04em]`}>
                  Key information
                </h2>
              )}
              {outcomeBody ? <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/75">{outcomeBody}</p> : null}
            </div>
            {facts.length ? (
              <dl className="divide-y divide-white/15 border-y border-white/15">
                {facts.map((fact) => (
                  <div key={fact.label} className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 py-4">
                    <dt className="text-[12px] tracking-[0.12em] text-[#9ba49c] uppercase">{fact.label}</dt>
                    <dd className="text-[16px] leading-snug">{fact.value}</dd>
                  </div>
                ))}
                {status ? (
                  <div className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 py-4">
                    <dt className="text-[12px] tracking-[0.12em] text-[#9ba49c] uppercase">Status</dt>
                    <dd className="text-[16px] leading-snug">{status}</dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
          </div>
        </section>
      ) : null}

      {images.length ? (
        <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="project-gallery-heading">
          <div className="mx-auto max-w-[1360px]">
            <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
              <span className="h-px w-8 bg-[#0a0c0b]" />
              Project gallery
            </p>
            <h2 id="project-gallery-heading" className={`${display} mt-4 text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.12] font-semibold tracking-[-0.04em]`}>
              {project.title}
            </h2>
            <ul className={`mt-10 grid gap-[14px] ${images.length > 1 ? "min-[960px]:grid-cols-2" : ""}`}>
              {images.map((image, imageIndex) => (
                <li key={image.url ?? imageIndex} className={imageIndex === 0 && images.length > 2 ? "min-[960px]:col-span-2" : undefined}>
                  <figure className="overflow-hidden rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image.url} alt={image.alt || ""} className="aspect-[16/10] w-full object-cover" />
                    {image.caption ? <figcaption className="bg-white/50 px-5 py-3 text-[14px] text-[#3e4438]">{image.caption}</figcaption> : null}
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="bg-[#f3f1e9] px-5 pb-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:pb-24" aria-labelledby="related-projects-heading">
          <div className="mx-auto max-w-[1360px] border-t border-black/15 pt-14 min-[960px]:pt-20">
            <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
              <span className="h-px w-8 bg-[#0a0c0b]" />
              More work
            </p>
            <h2 id="related-projects-heading" className={`${display} mt-4 max-w-3xl text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.12] font-semibold tracking-[-0.04em]`}>
              More work in similar sectors
            </h2>
            <ul className="mt-10 grid gap-[18px] min-[960px]:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    href={previewHref(props.mode, `/projects/${item.slug}`)}
                    className="block h-full overflow-hidden rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] border border-black/15 bg-white/40"
                  >
                    {item.image?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image.url} alt="" className="aspect-[4/3] w-full object-cover" />
                    ) : null}
                    <span className="block p-5">
                      <span className="text-[12px] font-extrabold tracking-[0.12em] text-[#667067] uppercase">
                        {[item.metadata?.sector, item.location, item.year].filter(Boolean).join(" · ")}
                      </span>
                      <span className={`${display} mt-2 block text-[1.35rem] leading-tight font-semibold tracking-[-0.03em]`}>{item.title}</span>
                      {item.summary ? <span className="mt-2 block text-[15px] leading-relaxed text-[#3e4438]">{item.summary}</span> : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24">
        <div className="mx-auto max-w-[1360px] rounded-tl-[34px] rounded-tr-[34px] rounded-br-[34px] rounded-bl-[110px] border border-white/15 bg-[linear-gradient(135deg,#111512,#050706)] px-8 py-14 min-[960px]:px-20 min-[960px]:py-[70px]">
          <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
            <span className="h-px w-8 bg-[#C8FF2E]" />
            Start a project
          </p>
          <h2 className={`${display} mt-5 max-w-3xl text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.12] font-semibold tracking-[-0.04em]`}>
            Talk to the people who will build it.
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
            {company?.name
              ? `Tell ${company.name} about the site, the schedule, and what the building has to do. A preconstruction lead will reply.`
              : "Start a conversation about the site, the schedule, and what the building has to do."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={contactHref} className="inline-flex rounded-full bg-[#C8FF2E] px-6 py-3.5 text-sm font-semibold text-[#0a0c0b]">
              Start a conversation
            </Link>
            <Link href={projectsHref} className="inline-flex rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white">
              See all projects
            </Link>
          </div>
        </div>
      </section>
    </ModernPageFrame>
  );
}

function DeliveryStage({
  stage,
  projectTitle,
  beforeImage,
  afterImage,
}: {
  stage: ResolvedProjectDeliveryStage;
  projectTitle: string;
  beforeImage?: CmsImage;
  afterImage?: CmsImage;
}) {
  const dark = stage.slug === "build" || stage.slug === "deliver";
  const paragraphs = splitNarrative(stage.narrative);
  const images = stage.images?.filter((image) => image.url) ?? [];

  return (
    <section
      id={deliveryStageDomId(stage.slug)}
      className={`scroll-mt-28 px-5 py-16 min-[960px]:px-8 min-[960px]:py-24 ${dark ? "bg-[#0a0c0b] text-white" : "bg-[#f3f1e9] text-[#0a0c0b]"}`}
      aria-labelledby={`${stage.slug}-heading`}
    >
      <div className="mx-auto max-w-[1360px]">
        <p className={`text-[12px] font-extrabold tracking-[0.16em] uppercase ${dark ? "text-[#C8FF2E]" : "text-[#667067]"}`}>
          {pad(stage.number)} {stage.title}
        </p>
        <h2 id={`${stage.slug}-heading`} className={`${display} mt-3 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.08] font-semibold tracking-[-0.04em]`}>
          {stage.title}
        </h2>
        {paragraphs.length ? (
          <div className={`mt-6 max-w-3xl space-y-5 text-[17px] leading-relaxed ${dark ? "text-white/75" : "text-[#3e4438]"}`}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        ) : null}
        {stage.insight?.body?.trim() ? (
          <aside className={`mt-8 max-w-2xl border-l-2 pl-5 ${dark ? "border-[#C8FF2E]" : "border-[#0a0c0b]"}`}>
            <p className={`text-[12px] font-extrabold tracking-[0.14em] uppercase ${dark ? "text-[#C8FF2E]" : "text-[#667067]"}`}>
              {stage.insight.title?.trim() || "Project insight"}
            </p>
            <p className="mt-3 text-[16px] leading-relaxed">{stage.insight.body}</p>
          </aside>
        ) : null}
        <StageProgress stage={stage} dark={dark} />
        {stage.milestones?.length ? (
          <ol className="mt-10 grid gap-6 min-[960px]:grid-cols-4">
            {stage.milestones.map((milestone, milestoneIndex) => (
              <li key={`${milestone.label}-${milestoneIndex}`} className={`border-t pt-4 ${dark ? "border-white/20" : "border-black/15"}`}>
                <p className={`text-[12px] font-extrabold tracking-[0.14em] uppercase ${dark ? "text-white/55" : "text-[#667067]"}`}>
                  {pad(milestoneIndex + 1)} {milestone.label}
                </p>
                {milestone.title ? <p className={`${display} mt-3 text-[1.2rem] leading-tight font-semibold tracking-[-0.03em]`}>{milestone.title}</p> : null}
                {milestone.description ? <p className={`mt-2 text-[14px] leading-snug ${dark ? "text-white/70" : "text-[#3e4438]"}`}>{milestone.description}</p> : null}
              </li>
            ))}
          </ol>
        ) : null}
        {stage.slug === "build" && stage.buildPhases?.length ? (
          <ol className="mt-10 grid gap-6 min-[960px]:grid-cols-4">
            {stage.buildPhases.map((phase, phaseIndex) => (
              <li key={phase.label} className={`border-t pt-4 ${dark ? "border-white/20" : "border-black/15"}`}>
                <p className={`text-[12px] font-extrabold tracking-[0.14em] ${dark ? "text-[#C8FF2E]" : "text-[#667067]"}`}>{pad(phaseIndex + 1)}</p>
                <p className={`${display} mt-3 text-[1.2rem] leading-tight font-semibold tracking-[-0.03em]`}>{phase.label}</p>
                {phase.description ? <p className={`mt-2 text-[14px] leading-snug ${dark ? "text-white/70" : "text-[#3e4438]"}`}>{phase.description}</p> : null}
              </li>
            ))}
          </ol>
        ) : null}
        {stage.slug === "control" && stage.controlPillars?.length ? (
          <ul className="mt-10 grid gap-8 min-[960px]:grid-cols-2 min-[1180px]:grid-cols-3">
            {stage.controlPillars.map((pillar) => (
              <li key={pillar.label} className={`rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] border p-6 ${dark ? "border-white/15" : "border-black/15"}`}>
                <p className={`text-[12px] font-extrabold tracking-[0.14em] uppercase ${dark ? "text-[#C8FF2E]" : "text-[#667067]"}`}>{pillar.label}</p>
                <p className="mt-3 text-[15px] leading-relaxed">{pillar.body}</p>
              </li>
            ))}
          </ul>
        ) : null}
        {stage.metrics?.length ? (
          <dl className="mt-10 grid gap-6 min-[720px]:grid-cols-2 min-[960px]:grid-cols-4">
            {stage.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className={`text-[12px] tracking-[0.12em] uppercase ${dark ? "text-white/55" : "text-[#667067]"}`}>{metric.label}</dt>
                <dd className={`${display} mt-2 text-[1.25rem] leading-snug font-semibold`}>{metric.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {stage.slug === "deliver" && beforeImage?.url && afterImage?.url ? (
          <div className="mt-10 grid gap-[14px] min-[960px]:grid-cols-2">
            {[
              { image: beforeImage, label: "Before" },
              { image: afterImage, label: "Completed" },
            ].map(({ image, label }) => (
              <figure key={label} className="overflow-hidden rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.url} alt={image.alt || ""} className="aspect-[4/3] w-full object-cover" />
                <figcaption className={`px-5 py-3 text-[13px] tracking-[0.08em] uppercase ${dark ? "text-white/70" : "text-[#667067]"}`}>
                  {label} · {projectTitle}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
        {images.length ? (
          <ul className={`mt-10 grid gap-[14px] ${images.length > 1 ? "min-[960px]:grid-cols-2" : ""}`}>
            {images.map((image, imageIndex) => (
              <li key={image.url ?? imageIndex} className={imageIndex === 0 && images.length > 2 ? "min-[960px]:col-span-2" : undefined}>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={image.alt || ""}
                    className="aspect-[16/10] w-full rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] object-cover"
                  />
                  {image.caption ? <figcaption className={`mt-3 text-[14px] ${dark ? "text-white/70" : "text-[#3e4438]"}`}>{image.caption}</figcaption> : null}
                </figure>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

function StageProgress({ stage, dark }: { stage: ResolvedProjectDeliveryStage; dark: boolean }) {
  const progress = stage.progress;
  if (!progress) return null;
  const hasPercent = typeof progress.progressPercent === "number";
  const labels = progress.milestoneLabels ?? [];
  if (!progress.currentPhaseLabel && !hasPercent && !labels.length) return null;

  return (
    <div className={`mt-8 max-w-xl rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] border p-6 ${dark ? "border-white/20" : "border-black/15"}`}>
      {progress.currentPhaseLabel ? (
        <>
          <p className={`text-[12px] font-extrabold tracking-[0.14em] uppercase ${dark ? "text-[#C8FF2E]" : "text-[#667067]"}`}>Current phase</p>
          <p className={`${display} mt-2 text-[1.45rem] leading-tight font-semibold tracking-[-0.03em]`}>{progress.currentPhaseLabel}</p>
        </>
      ) : null}
      {hasPercent ? <p className="mt-3 text-[14px]">Progress · {progress.progressPercent}%</p> : null}
      {labels.length ? (
        <ul className="mt-4 space-y-2">
          {labels.map((label) => (
            <li key={label} className="flex gap-3 text-[15px]">
              <span className={`mt-[0.55rem] h-px w-4 shrink-0 ${dark ? "bg-white" : "bg-[#0a0c0b]"}`} aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export type { ProjectDeliveryStageSlug, Project };
