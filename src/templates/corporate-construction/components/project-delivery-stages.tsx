import type { ReactNode } from "react";
import type { CmsImage } from "@/templates/shared/cms/types/media";
import type { ProjectDeliveryStageSlug } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { ArchitecturalGrid } from "@/templates/corporate-construction/components/ui/architectural-grid";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import {
  deliveryStageDomId,
  splitNarrative,
  type ResolvedProjectDeliveryStage,
} from "@/templates/corporate-construction/utils/project-delivery";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectDeliveryStagesProps = {
  stages: ResolvedProjectDeliveryStage[];
  deliverBeforeAfter?: { before?: CmsImage | null; after?: CmsImage | null };
  projectTitle: string;
};

function StageShell({
  stage,
  tone,
  children,
}: {
  stage: ResolvedProjectDeliveryStage;
  tone: "light" | "muted" | "dark";
  children: ReactNode;
}) {
  const bg =
    tone === "dark"
      ? "bg-[var(--color-primary)] text-white"
      : tone === "muted"
        ? "bg-[var(--color-surface-muted)]"
        : "bg-[var(--color-surface)]";

  return (
    <section
      id={deliveryStageDomId(stage.slug)}
      data-delivery-stage={stage.slug}
      className={cn("relative overflow-hidden scroll-mt-36", bg)}
      aria-labelledby={`${stage.slug}-heading`}
    >
      {tone === "dark" ? <ArchitecturalGrid tone="dark" className="pointer-events-none absolute inset-0 opacity-40" /> : null}
      <div className="vertex-container relative py-28 md:py-36 lg:py-40">{children}</div>
    </section>
  );
}

function StageHeader({ stage, dark }: { stage: ResolvedProjectDeliveryStage; dark?: boolean }) {
  return (
    <header className="max-w-3xl">
      <p className={cn(ui.mono, dark ? "text-white/60" : "text-[var(--color-accent)]")}>{pad(stage.number)}</p>
      <h2
        id={`${stage.slug}-heading`}
        className={cn(
          ui.h2,
          "mt-4 max-w-[12ch]",
          dark ? "!text-white" : "",
        )}
      >
        {stage.title}
      </h2>
    </header>
  );
}

function NarrativeBlock({ narrative, dark }: { narrative?: string; dark?: boolean }) {
  const paragraphs = splitNarrative(narrative);
  if (!paragraphs.length) return null;
  return (
    <div className={cn("mt-10 max-w-2xl space-y-5", dark ? "text-white/75" : "")}>
      {paragraphs.map((p) => (
        <p key={p.slice(0, 40)} className={cn(ui.body, dark ? "!text-white/75 md:text-lg" : "md:text-lg")}>
          {p}
        </p>
      ))}
    </div>
  );
}

function InsightBlock({ stage, dark }: { stage: ResolvedProjectDeliveryStage; dark?: boolean }) {
  if (!stage.insight?.body?.trim()) return null;
  return (
    <aside
      className={cn(
        "mt-12 max-w-xl border-l-2 pl-6",
        dark ? "border-white/30" : "border-[var(--color-accent)]",
      )}
    >
      {stage.insight.title ? (
        <p className={cn(ui.mono, dark ? "text-white/60" : "text-[var(--color-text-muted)]")}>{stage.insight.title}</p>
      ) : (
        <p className={cn(ui.mono, dark ? "text-white/60" : "text-[var(--color-text-muted)]")}>Project insight</p>
      )}
      <p className={cn("mt-3 text-pretty text-base leading-relaxed", dark ? "text-white/85" : "text-[var(--color-text)]")}>
        {stage.insight.body}
      </p>
    </aside>
  );
}

function MilestonesBlock({ stage, dark }: { stage: ResolvedProjectDeliveryStage; dark?: boolean }) {
  if (!stage.milestones?.length) return null;
  return (
    <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {stage.milestones.map((m) => (
        <li key={`${m.label}-${m.title ?? ""}`} className="border-t border-[var(--color-border)] pt-5 dark:border-white/20">
          <p className={cn(ui.mono, dark ? "text-white/55" : "text-[var(--color-text-muted)]")}>{m.label}</p>
          <p className={cn("mt-2 font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.02em]", dark ? "text-white" : "")}>
            {m.title ?? m.description}
          </p>
          {m.title && m.description ? (
            <p className={cn(ui.small, "mt-2", dark ? "text-white/65" : "")}>{m.description}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function ImagesEditorial({ images, dark, sizes }: { images: CmsImage[]; dark?: boolean; sizes: string }) {
  const valid = images.filter((i) => i.url);
  if (!valid.length) return null;

  if (valid.length === 1) {
    return (
      <Reveal plate className={cn(ui.plate, "mt-14 aspect-[16/10] max-h-[32rem] w-full")}>
        <CmsImageMedia image={valid[0]} aspect="auto" className="h-full w-full object-cover" sizes={sizes} />
      </Reveal>
    );
  }

  return (
    <div className="mt-14 grid gap-4 md:grid-cols-12 md:gap-6">
      <Reveal plate className={cn(ui.plate, "md:col-span-8 md:row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[24rem]")}>
        <CmsImageMedia image={valid[0]} aspect="auto" className="h-full w-full object-cover" sizes={sizes} />
      </Reveal>
      {valid.slice(1, 3).map((img, i) => (
        <Reveal key={img.id} plate className={cn(ui.plate, i === 0 ? "md:col-span-4 aspect-[4/3]" : "md:col-span-4 aspect-[4/3]")}>
          <CmsImageMedia image={img} aspect="auto" className="h-full w-full object-cover" sizes="(min-width: 1024px) 28vw, 100vw" />
        </Reveal>
      ))}
    </div>
  );
}

function BuildPhasesRail({ stage, dark }: { stage: ResolvedProjectDeliveryStage; dark?: boolean }) {
  if (!stage.buildPhases?.length) return null;
  return (
    <ol className="mt-16 flex flex-col gap-0 border-l border-[var(--color-border)] dark:border-white/20 md:ml-2">
      {stage.buildPhases.map((phase, index) => (
        <li key={phase.label} className="relative pl-8 pb-10 last:pb-0">
          <span
            className={cn(
              "absolute left-0 top-0.5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full text-[0.625rem] font-bold",
              dark ? "bg-white/15 text-white" : "bg-[var(--color-surface-muted)] text-[var(--color-text)]",
            )}
            aria-hidden
          >
            {index + 1}
          </span>
          <p className={cn(ui.mono, dark ? "text-white/55" : "text-[var(--color-text-muted)]")}>{phase.label}</p>
          {phase.description ? (
            <p className={cn(ui.small, "mt-2 max-w-md", dark ? "text-white/70" : "")}>{phase.description}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function ControlPillars({ stage, dark }: { stage: ResolvedProjectDeliveryStage; dark?: boolean }) {
  if (!stage.controlPillars?.length) return null;
  return (
    <ul className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {stage.controlPillars.map((pillar) => (
        <li key={pillar.label} className="max-w-sm">
          <p className={cn(ui.mono, dark ? "text-white/55" : "text-[var(--color-accent)]")}>{pillar.label}</p>
          <p className={cn("mt-3 text-pretty text-base leading-relaxed", dark ? "text-white/80" : "text-[var(--color-text)]")}>
            {pillar.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

function ProgressBlock({ stage, dark }: { stage: ResolvedProjectDeliveryStage; dark?: boolean }) {
  const { progress } = stage;
  if (!progress) return null;
  const hasPercent = typeof progress.progressPercent === "number";
  const hasLabels = progress.milestoneLabels?.length;
  if (!progress.currentPhaseLabel && !hasPercent && !hasLabels) return null;

  return (
    <div className={cn("mt-12 max-w-xl rounded-[1rem] border p-6", dark ? "border-white/20 bg-white/5" : "border-[var(--color-border)] bg-[var(--color-surface-muted)]")}>
      {progress.currentPhaseLabel ? (
        <p className={cn(ui.mono, dark ? "text-white/60" : "text-[var(--color-text-muted)]")}>Current phase</p>
      ) : null}
      {progress.currentPhaseLabel ? (
        <p className={cn("mt-2 font-[family-name:var(--font-display)] text-xl font-semibold", dark ? "text-white" : "")}>
          {progress.currentPhaseLabel}
        </p>
      ) : null}
      {hasPercent ? (
        <p className={cn(ui.mono, "mt-4", dark ? "text-white/70" : "")}>
          Progress · {progress.progressPercent}%
        </p>
      ) : null}
      {hasLabels ? (
        <ul className="mt-4 space-y-2">
          {progress.milestoneLabels!.map((label) => (
            <li key={label} className={cn(ui.small, dark ? "text-white/70" : "")}>
              {label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function DeliverBeforeAfter({
  before,
  after,
  title,
}: {
  before?: CmsImage | null;
  after?: CmsImage | null;
  title: string;
}) {
  if (!before?.url || !after?.url) return null;
  return (
    <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-6">
      {[
        { image: before, label: "Before" },
        { image: after, label: "Completed" },
      ].map(({ image, label }) => (
        <figure key={label} className={cn(ui.plate, "overflow-hidden md:col-span-1 last:md:col-span-2")}>
          <div className="aspect-[4/3] md:aspect-[16/10]">
            <CmsImageMedia image={image} aspect="auto" className="h-full w-full object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <figcaption className={cn(ui.mono, "px-4 py-3 text-[var(--color-text-muted)]")}>
            {label} · {title}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function toneForSlug(slug: ProjectDeliveryStageSlug): "light" | "muted" | "dark" {
  switch (slug) {
    case "discover":
      return "light";
    case "plan":
      return "muted";
    case "build":
      return "dark";
    case "control":
      return "light";
    case "deliver":
      return "dark";
    default:
      return "light";
  }
}

function renderStageBody(
  stage: ResolvedProjectDeliveryStage,
  opts: { deliverBeforeAfter?: ProjectDeliveryStagesProps["deliverBeforeAfter"]; projectTitle: string },
) {
  const dark = toneForSlug(stage.slug) === "dark";
  const images = stage.images?.filter((i) => i.url) ?? [];

  return (
    <>
      <StageHeader stage={stage} dark={dark} />
      <NarrativeBlock narrative={stage.narrative} dark={dark} />
      <InsightBlock stage={stage} dark={dark} />
      <ProgressBlock stage={stage} dark={dark} />
      <MilestonesBlock stage={stage} dark={dark} />
      {stage.slug === "build" ? <BuildPhasesRail stage={stage} dark={dark} /> : null}
      {stage.slug === "control" ? <ControlPillars stage={stage} dark={dark} /> : null}
      {stage.metrics?.length ? (
        <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
          {stage.metrics.map((m) => (
            <div key={m.label}>
              <dt className={cn(ui.mono, dark ? "text-white/55" : "text-[var(--color-text-muted)]")}>{m.label}</dt>
              <dd className={cn("mt-1 text-sm font-medium", dark ? "text-white" : "text-[var(--color-text)]")}>{m.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {stage.slug === "deliver" &&
      opts.deliverBeforeAfter?.before?.url &&
      opts.deliverBeforeAfter?.after?.url ? (
        <DeliverBeforeAfter
          before={opts.deliverBeforeAfter.before}
          after={opts.deliverBeforeAfter.after}
          title={opts.projectTitle}
        />
      ) : null}
      {images.length ? (
        <ImagesEditorial images={images} dark={dark} sizes="(min-width: 1024px) 55vw, 100vw" />
      ) : null}
    </>
  );
}

export function ProjectDeliveryStages({ stages, deliverBeforeAfter, projectTitle }: ProjectDeliveryStagesProps) {
  if (!stages.length) return null;

  return (
    <div className="border-t border-[var(--color-border)]">
      {stages.map((stage) => (
        <StageShell key={stage.slug} stage={stage} tone={toneForSlug(stage.slug)}>
          {renderStageBody(stage, { deliverBeforeAfter, projectTitle })}
        </StageShell>
      ))}
    </div>
  );
}
