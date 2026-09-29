import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Project } from "@/templates/shared/cms/types/projects";
import {
  FeaturedProjectLead,
  FeaturedProjectSecondary,
  homepageFeaturedProjects,
  projectDetailHref,
  projectIndexLabel,
} from "@/templates/corporate-construction/components/featured-project-showcase";

type CorporateProjectsProps = {
  projects: Project[];
  mode: TemplateRenderMode;
};

export function CorporateProjects({ projects, mode }: CorporateProjectsProps) {
  const preview = homepageFeaturedProjects(projects);
  if (!preview.length) {
    return null;
  }

  const previewBase = mode === "preview" ? "/preview/corporate-construction" : "";
  const detail = (slug: string) => projectDetailHref(previewBase, slug);
  const [lead, ...supporting] = preview;
  const count = preview.length;

  return (
    <section
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="corporate-projects-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div className="flex flex-col gap-5 border-b border-[var(--color-border)] pb-7 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="min-w-0">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
              Portfolio
            </p>
            <h2
              id="corporate-projects-heading"
              className="mt-3 text-balance font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-primary)] md:text-4xl"
            >
              Featured projects
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
              Selected work across sectors and delivery types—representative of scope, coordination,
              and field execution.
            </p>
          </div>
          <Link
            href={`${previewBase}/projects`}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-[var(--color-primary)] px-5 text-sm font-semibold text-[var(--color-primary)] no-underline transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] motion-reduce:transition-none"
          >
            View all projects
            <span aria-hidden>→</span>
          </Link>
        </div>

        {count === 1 && lead ? (
          <div className="mt-10 min-w-0 lg:mt-12">
            <FeaturedProjectLead project={lead} detailHref={detail(lead.slug)} priorityImage />
          </div>
        ) : null}

        {count === 2 && lead ? (
          <div className="mt-10 grid min-w-0 gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-x-12">
            <div className="min-w-0 lg:col-span-7">
              <FeaturedProjectLead project={lead} detailHref={detail(lead.slug)} priorityImage />
            </div>
            {supporting[0] ? (
              <div className="min-w-0 border-t border-[var(--color-border)] pt-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2">
                <FeaturedProjectSecondary
                  project={supporting[0]}
                  detailHref={detail(supporting[0].slug)}
                  indexLabel={projectIndexLabel(1)}
                  layout="stack"
                />
              </div>
            ) : null}
          </div>
        ) : null}

        {count === 3 && lead ? (
          <div className="mt-10 grid min-w-0 gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-7">
              <FeaturedProjectLead
                project={lead}
                detailHref={detail(lead.slug)}
                priorityImage
                compact
              />
            </div>
            <ul className="grid min-w-0 content-start gap-10 lg:col-span-5">
              {supporting.map((project, index) => (
                <li
                  key={project.id}
                  className="min-w-0 border-t border-[var(--color-border)] pt-8 first:border-0 first:pt-0"
                >
                  <FeaturedProjectSecondary
                    project={project}
                    detailHref={detail(project.slug)}
                    indexLabel={projectIndexLabel(index + 1)}
                    layout="rail"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {count >= 4 && lead ? (
          <div className="mt-10 min-w-0 lg:mt-12">
            <FeaturedProjectLead
              project={lead}
              detailHref={detail(lead.slug)}
              priorityImage
              compact
            />
            <ul className="mt-10 border-t border-[var(--color-border)]">
              {supporting.map((project, index) => (
                <li key={project.id} className="min-w-0 border-b border-[var(--color-border)] py-8">
                  <FeaturedProjectSecondary
                    project={project}
                    detailHref={detail(project.slug)}
                    indexLabel={projectIndexLabel(index + 1)}
                    layout="rail"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
