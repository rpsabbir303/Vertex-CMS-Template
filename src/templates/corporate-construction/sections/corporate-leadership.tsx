import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Company } from "@/templates/shared/cms/types/company";
import type { CmsImage } from "@/templates/shared/cms/types/media";
import { ButtonLink } from "@/templates/shared/components/ui/button-link";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";

type CorporateLeadershipProps = {
  company: Company;
  mode: TemplateRenderMode;
  image?: CmsImage | null;
};

export function CorporateLeadership({
  company,
  mode,
  image = null,
}: CorporateLeadershipProps) {
  const paragraphs = (company.description ?? "")
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const statement = paragraphs[1] ?? paragraphs[0];
  const supporting = paragraphs.length > 2 ? paragraphs.slice(2).join("\n\n") : undefined;

  if (!statement && !company.foundedYear && !image?.url) {
    return null;
  }

  const teamHref = previewHref(mode, "/team");
  const aboutHref = previewHref(mode, "/about");
  const hasImage = Boolean(image?.url);

  return (
    <section
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="corporate-leadership-heading"
    >
      <div className="vertex-container py-16 md:py-20 lg:py-24">
        <div
          className={`grid min-w-0 items-stretch gap-12 lg:gap-16 ${hasImage ? "lg:grid-cols-12" : ""}`}
        >
          {hasImage && image ? (
            <figure className="relative min-w-0 overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-muted)] lg:col-span-7">
              <CmsImageMedia
                image={image}
                aspect="wide"
                className="min-h-[20rem] w-full md:min-h-[26rem] lg:min-h-full lg:[&_img]:absolute lg:[&_img]:inset-0 lg:[&_img]:h-full lg:[&_img]:object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </figure>
          ) : null}

          <div className={`flex min-w-0 flex-col justify-center ${hasImage ? "lg:col-span-5" : "max-w-3xl"}`}>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-secondary)]">
              Leadership
            </p>
            <h2
              id="corporate-leadership-heading"
              className="mt-4 text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--color-primary)] md:text-4xl lg:text-[2.85rem]"
            >
              Built on accountability.
            </h2>

            {company.foundedYear ? (
              <p className="mt-8 flex items-baseline gap-3">
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  Est.
                </span>
                <span className="font-[family-name:var(--font-display)] text-5xl font-semibold leading-none tabular-nums tracking-[-0.03em] text-[var(--color-accent)] md:text-6xl">
                  {company.foundedYear}
                </span>
              </p>
            ) : null}

            {statement ? (
              <p className="mt-8 text-pretty break-words font-[family-name:var(--font-display)] text-xl font-medium leading-snug text-[var(--color-primary)] md:text-2xl">
                {statement}
              </p>
            ) : null}

            {supporting ? (
              <p className="mt-5 text-pretty break-words text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
                {supporting}
              </p>
            ) : null}

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={teamHref} className="rounded-none px-5">
                Meet the team
              </ButtonLink>
              <Link
                href={aboutHref}
                className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-semibold text-[var(--color-secondary)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
              >
                Company profile
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
