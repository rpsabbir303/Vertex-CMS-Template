type CorporateAboutStoryProps = {
  foundedYear?: number;
  /** Additional company story paragraphs after the overview introduction */
  storyParagraphs: string[];
};

export function CorporateAboutStory({
  foundedYear,
  storyParagraphs,
}: CorporateAboutStoryProps) {
  if (!foundedYear && !storyParagraphs.length) {
    return null;
  }

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      aria-labelledby="about-story-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div className="grid gap-8 border-l-2 border-[var(--color-accent)] pl-5 md:pl-7 lg:grid-cols-12 lg:gap-x-12 lg:items-end">
          <div className="min-w-0 lg:col-span-4">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
              History
            </p>
            <h2
              id="about-story-heading"
              className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-primary)] md:text-4xl"
            >
              Company story
            </h2>
          </div>

          {foundedYear ? (
            <div className="min-w-0 lg:col-span-3">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                Established
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-5xl font-semibold leading-none text-[var(--color-primary)] md:text-6xl">
                {foundedYear}
              </p>
            </div>
          ) : null}

          {storyParagraphs.length ? (
            <div
              className={`min-w-0 space-y-5 text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg ${foundedYear ? "lg:col-span-5" : "lg:col-span-8"}`}
            >
              {storyParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
