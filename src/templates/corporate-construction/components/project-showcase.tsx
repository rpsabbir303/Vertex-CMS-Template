"use client";

import { useEffect, useRef, useState } from "react";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Project } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectShowcaseProps = {
  projects: Project[];
  mode: TemplateRenderMode;
};

const SLIDE_MS = 6500;

function projectFacts(project: Project): [string, string][] {
  return [
    ["Sector", project.metadata?.sector],
    ["Location", project.location],
    ["Year", project.year ? String(project.year) : undefined],
    ["Scope", project.metadata?.scope],
  ].filter((f): f is [string, string] => Boolean(f[1]));
}

/**
 * Selected work — auto-advancing project showcase.
 * Every featured project takes the stage in turn: the frame pushes in slowly, the
 * title, facts, and index swap with it, and a progress rule shows the timing.
 * Hover, focus, and pointer selection pause the loop; reduced-motion disables it.
 */
export function ProjectShowcase({ projects, mode }: ProjectShowcaseProps) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const count = projects.length;
  const current = projects[active] ?? projects[0];
  const playing = count > 1 && inView && !hovering && !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % count), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [playing, active, count]);

  if (!current) return null;

  const href = previewHref(mode, `/projects/${current.slug}`);
  const facts = projectFacts(current);

  return (
    <div
      ref={rootRef}
      className={cn(!playing && "is-paused")}
      style={{ ["--cc-slide-ms" as string]: `${SLIDE_MS}ms` }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovering(false);
      }}
    >
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className={ui.eyebrow}>Selected work</p>
          <h2 id="selected-heading" className={cn(ui.h2, "mt-5 min-h-[1.9em] max-w-[14ch]")}>
            <a key={current.id} href={href} className="cc-fade block transition-colors hover:text-[var(--color-accent)]">
              {current.title}
            </a>
          </h2>
        </div>
        <p className={cn(ui.mono, "text-[var(--color-text-muted)] md:col-span-4 md:text-right")} aria-live="polite">
          {pad(active + 1)} / {pad(count)}
        </p>
      </div>

      <div className={cn(ui.plate, "relative mt-12 h-[70vh] min-h-[20rem] max-h-[56rem]")} aria-roledescription="carousel">
        {projects.map((project, index) => {
          const isActive = index === active;
          return (
            <div
              key={project.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-[900ms] ease-out motion-reduce:transition-none",
                isActive ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={!isActive}
            >
              <div key={isActive ? `${project.id}-on` : `${project.id}-off`} className={cn("h-full", isActive && "cc-kenburns")}>
                <CmsImageMedia
                  image={project.image}
                  aspect="auto"
                  className="h-full"
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>
            </div>
          );
        })}
        <a href={href} className="absolute inset-0 block" aria-label={`View ${current.title}`}>
          <span className="sr-only">View {current.title}</span>
        </a>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--cc-ink)]/70 to-transparent p-5 md:p-8">
          <div key={current.id} className="cc-fade flex flex-wrap items-end justify-between gap-4 text-white">
            <p className={cn(ui.mono, "text-white/80")}>
              {[current.metadata?.sector, current.location].filter(Boolean).join(" · ")}
            </p>
            {current.metadata?.client ? <p className={cn(ui.mono, "text-white/60")}>{current.metadata.client}</p> : null}
          </div>
        </div>
      </div>

      {count > 1 ? (
        <ul className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-4" role="tablist" aria-label="Featured projects">
          {projects.map((project, index) => {
            const isActive = index === active;
            return (
              <li key={project.id} className="min-w-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show ${project.title}`}
                  onClick={() => setActive(index)}
                  className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]"
                >
                  <span className="block h-px w-full overflow-hidden bg-[var(--color-primary)]/12" aria-hidden>
                    <span
                      key={isActive ? `${project.id}-run` : `${project.id}-idle`}
                      className={cn("block h-full bg-[var(--color-accent)]", isActive ? "cc-progress" : "scale-x-0")}
                    />
                  </span>
                  <span className="mt-4 flex items-start gap-3">
                    <span className={cn(ui.plateSm, "hidden h-14 w-20 shrink-0 sm:block")}>
                      <span className={cn("block h-full transition-opacity duration-500 motion-reduce:transition-none", isActive ? "opacity-100" : "opacity-60 group-hover:opacity-90")}>
                        <CmsImageMedia image={project.image} aspect="auto" className="h-full" sizes="80px" />
                      </span>
                    </span>
                    <span className="min-w-0">
                      <span className={cn(ui.mono, "block", isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]")}>
                        {pad(index + 1)}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block text-balance text-sm font-semibold leading-snug transition-colors motion-reduce:transition-none",
                          isActive ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]",
                        )}
                      >
                        {project.title}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div key={current.id} className="cc-fade mt-10 grid gap-10 lg:grid-cols-12">
        {current.summary ? <p className={cn(ui.lead, "max-w-xl lg:col-span-6")}>{current.summary}</p> : null}
        <div className={cn("lg:col-span-6", !current.summary && "lg:col-span-12")}>
          {facts.length ? (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
              {facts.map(([label, value]) => (
                <div key={label} className={cn("border-t pt-4", ui.rule)}>
                  <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{label}</dt>
                  <dd className="mt-2 text-sm font-medium text-[var(--color-text)]">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={href} className={ui.btn}>
              View the project
            </a>
            <a href={previewHref(mode, "/projects")} className={ui.btnGhost}>
              All projects
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
