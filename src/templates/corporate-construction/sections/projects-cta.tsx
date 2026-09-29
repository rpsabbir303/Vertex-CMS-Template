import type { TemplateRenderMode } from "@/registry/template-types";
import { ButtonLink } from "@/templates/shared/components/ui/button-link";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";

type CorporateProjectsCtaProps = {
  mode: TemplateRenderMode;
  companyName?: string;
};

export function CorporateProjectsCta({ mode, companyName }: CorporateProjectsCtaProps) {
  return (
    <section
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="projects-cta-heading"
    >
      <div className="vertex-container flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between md:gap-10 md:py-14">
        <div className="min-w-0 max-w-xl border-l-2 border-[var(--color-accent)] pl-5 md:pl-6">
          <h2
            id="projects-cta-heading"
            className="text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-primary)] md:text-4xl"
          >
            Have a project with similar constraints?
          </h2>
          <p className="mt-3 text-pretty break-words text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
            {companyName
              ? `Share scope, schedule, and site conditions with ${companyName}.`
              : "Share scope, schedule, and site conditions with the project team."}
          </p>
        </div>
        <ButtonLink href={previewHref(mode, "/contact")} className="shrink-0 rounded-none">
          Start a conversation
        </ButtonLink>
      </div>
    </section>
  );
}
