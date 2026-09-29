import type { OptionalPagePractice } from "@/templates/shared/cms/types/pages";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { cn } from "@/utils/cn";

type SafetyPracticesProps = {
  practices: OptionalPagePractice[];
};

function practiceListClass(count: number): string {
  if (count <= 1) {
    return "grid gap-0 border-t border-[var(--color-border)]";
  }
  if (count === 2) {
    return "grid gap-0 border-t border-[var(--color-border)] md:grid-cols-2 md:divide-x md:divide-[var(--color-border)]";
  }
  if (count === 3) {
    return "grid gap-0 border-t border-[var(--color-border)] md:grid-cols-3 md:divide-x md:divide-[var(--color-border)]";
  }
  return "grid gap-0 border-t border-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-b [&>*]:border-[var(--color-border)] lg:[&>*:not(:nth-child(3n))]:border-r";
}

export function SafetyPractices({ practices }: SafetyPracticesProps) {
  if (!practices.length) {
    return null;
  }

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      aria-labelledby="safety-practices-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div className="max-w-2xl">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
            Practices
          </p>
          <h2
            id="safety-practices-heading"
            className="mt-3 text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-primary)] md:text-4xl"
          >
            How the field stays coordinated
          </h2>
          <p className="mt-4 text-pretty break-words text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
            Structured routines the project team uses to plan temporary protection, daily
            coordination, and site conditions.
          </p>
        </div>

        <ol className={cn("mt-10 bg-[var(--color-surface)]", practiceListClass(practices.length))}>
          {practices.map((practice, index) => {
            const hasImage = Boolean(practice.image?.url);
            return (
              <li key={practice.id} className="min-w-0 p-6 md:p-8">
                <p className="font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.16em] text-[var(--color-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                {hasImage ? (
                  <CmsImageMedia
                    image={practice.image}
                    aspect="wide"
                    className="mt-4 w-full max-w-[14rem] border border-[var(--color-border)]"
                    sizes="(max-width: 1024px) 40vw, 220px"
                  />
                ) : null}
                <h3
                  className={cn(
                    "text-balance break-words font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-primary)] md:text-2xl",
                    hasImage ? "mt-4" : "mt-3",
                  )}
                >
                  {practice.title}
                </h3>
                {practice.description ? (
                  <p className="mt-3 text-pretty break-words text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
                    {practice.description}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
