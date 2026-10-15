import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Company } from "@/templates/shared/cms/types/company";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { Reveal } from "@/templates/modern-contractor/components/ui/reveal";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { ui } from "@/templates/modern-contractor/theme/ui";
import { cn } from "@/utils/cn";

type ModernAboutStoryProps = {
  company: Company;
  mode: TemplateRenderMode;
  projectCount?: number;
};

export function ModernAboutStory({ company, mode, projectCount }: ModernAboutStoryProps) {
  const paragraphs = company.description?.split(/\n\n+/).map((p) => p.trim()).filter(Boolean) ?? [];
  const lead = paragraphs[1] || paragraphs[0];
  const image = company.aboutHistory?.image ?? company.heroImage;

  return (
    <section className={cn(ui.section, "bg-[var(--color-surface)]")} aria-labelledby="modern-about-heading">
      <div className="vertex-container grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <div className="relative">
            <div className="mc-frame aspect-[4/5] bg-[var(--color-surface-muted)]">
              {image?.url ? (
                <CmsImageMedia image={image} aspect="auto" className="h-full w-full" sizes="(min-width: 1024px) 40vw, 100vw" />
              ) : null}
            </div>
            <dl className="absolute -right-2 bottom-6 grid min-w-[11rem] gap-4 rounded-2xl bg-[var(--color-primary)] p-5 text-white sm:right-6">
              {company.foundedYear ? (
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-[0.14em] text-white/60">Founded</dt>
                  <dd className="mt-1 font-[family-name:var(--font-display)] text-3xl font-medium">{company.foundedYear}</dd>
                </div>
              ) : null}
              {projectCount ? (
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-[0.14em] text-white/60">Published work</dt>
                  <dd className="mt-1 font-[family-name:var(--font-display)] text-3xl font-medium">{projectCount}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={1} className="lg:col-span-6">
          <p className={ui.eyebrow}>The practice</p>
          <h2 id="modern-about-heading" className={cn(ui.h2, "mt-3")}>
            {company.name}
          </h2>
          {lead ? (
            <p className="mt-6 font-[family-name:var(--font-display)] text-[clamp(1.35rem,2vw,1.75rem)] font-medium leading-snug tracking-[-0.02em] text-[var(--color-text)]">
              {lead}
            </p>
          ) : null}
          <Link href={previewHref(mode, "/about")} className={cn(ui.link, "mt-8")}>
            Read the full story
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
