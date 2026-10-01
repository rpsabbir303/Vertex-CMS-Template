import type { CompanyAboutOfficeToField } from "@/templates/shared/cms/types/company";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateAboutOfficeToFieldProps = {
  content: CompanyAboutOfficeToField;
};

export function CorporateAboutOfficeToFieldSection({ content }: CorporateAboutOfficeToFieldProps) {
  const headline = content.headline?.trim();
  const statement = content.statement?.trim();
  const stages = content.stages?.filter((s) => s.label?.trim() && s.body?.trim()) ?? [];

  if (!headline && !statement && !content.image?.url && !stages.length) return null;

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface-muted)]" aria-labelledby="about-office-field-heading">
      <div className="vertex-container py-28 md:py-36 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-5">
            <p className={ui.eyebrow}>{content.eyebrow?.trim() || "From office to field"}</p>
            {headline ? (
              <h2 id="about-office-field-heading" className={cn(ui.h2, "mt-5 max-w-[12ch] text-balance")}>
                {headline}
              </h2>
            ) : (
              <h2 id="about-office-field-heading" className="sr-only">
                From office to field
              </h2>
            )}
            {statement ? (
              <p className="mt-8 max-w-md text-pretty font-[family-name:var(--font-display)] text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-snug tracking-[-0.03em] text-[var(--color-text)]">
                {statement}
              </p>
            ) : null}
          </div>
          {content.image?.url ? (
            <Reveal plate className={cn(ui.plate, "aspect-[16/11] min-h-[16rem] lg:col-span-7 lg:aspect-[16/10]")}>
              <CmsImageMedia
                image={content.image}
                aspect="auto"
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </Reveal>
          ) : null}
        </div>

        {stages.length ? (
          <ol className="mt-16 grid gap-0 border-t border-[var(--color-border)] sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {stages.map((stage, index) => (
              <li
                key={stage.label}
                className={cn(
                  "border-b border-[var(--color-border)] py-8 pr-6 lg:border-b-0 lg:border-r lg:py-10 lg:pl-0 lg:last:border-r-0",
                  index > 0 && "lg:pl-8",
                )}
              >
                <span className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{pad(index + 1)}</span>
                <p className="mt-4 font-[family-name:var(--font-mono)] text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  {stage.label}
                </p>
                <p className={cn(ui.body, "mt-3 max-w-xs text-[var(--color-text)]")}>{stage.body}</p>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}
