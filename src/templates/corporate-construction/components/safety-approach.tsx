type SafetyApproachProps = {
  heading?: string;
  paragraphs: string[];
};

export function SafetyApproach({ heading, paragraphs }: SafetyApproachProps) {
  if (!paragraphs.length && !heading) {
    return null;
  }

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="safety-approach-heading"
    >
      <div className="vertex-container grid gap-8 py-12 md:gap-10 md:py-14 lg:grid-cols-12 lg:gap-x-12 lg:py-16">
        <div className="min-w-0 border-l-2 border-[var(--color-accent)] pl-5 md:pl-7 lg:col-span-5">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
            Approach
          </p>
          <h2
            id="safety-approach-heading"
            className="mt-3 max-w-md text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[var(--color-primary)] md:text-4xl"
          >
            {heading || "How safety is managed on site"}
          </h2>
        </div>

        {paragraphs.length ? (
          <div className="min-w-0 space-y-5 lg:col-span-6 lg:col-start-7">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
