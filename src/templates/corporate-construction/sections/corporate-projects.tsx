import type { TemplateRenderMode } from "@/registry/template-types";
import type { Project } from "@/templates/shared/cms/types/projects";
import { ProjectShowcase } from "@/templates/corporate-construction/components/project-showcase";

type CorporateProjectsProps = {
  projects: Project[];
  mode: TemplateRenderMode;
};

export function selectLeadProject(projects: Project[]): Project | undefined {
  return projects.find((p) => p.image?.url) ?? projects[0];
}

/**
 * 05 — Selected work. Every featured project with imagery, shown in an
 * auto-advancing showcase (frame, title, facts, and index rotate together).
 */
export function CorporateProjects({ projects, mode }: CorporateProjectsProps) {
  const withImages = projects.filter((p) => p.image?.url);
  const lead = selectLeadProject(projects);
  const showcase = withImages.length ? withImages : lead ? [lead] : [];
  if (!showcase.length) return null;

  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby="selected-heading">
      <div className="vertex-container py-24 md:py-32">
        <ProjectShowcase projects={showcase} mode={mode} />
      </div>
    </section>
  );
}
