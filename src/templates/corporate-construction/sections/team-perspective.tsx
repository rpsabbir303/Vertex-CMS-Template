type TeamPerspectiveProps = {
  statement: string;
  supporting?: string;
};

/**
 * Compact editorial pause connecting people to delivery.
 * Only rendered when CMS-backed supporting copy is available.
 */
export function TeamPerspective({ statement, supporting }: TeamPerspectiveProps) {
  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="team-perspective-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div className="grid gap-6 border-l-2 border-[var(--color-accent)] pl-5 md:pl-7 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-5">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
              Perspective
            </p>
            <h2
              id="team-perspective-heading"
              className="mt-3 text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[var(--color-primary)] md:text-4xl"
            >
              {statement}
            </h2>
          </div>
          {supporting ? (
            <p className="min-w-0 max-w-2xl text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg lg:col-span-6 lg:col-start-7">
              {supporting}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
