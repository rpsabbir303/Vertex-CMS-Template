type SafetyCommitmentProps = {
  heading: string;
  body?: string;
};

export function SafetyCommitment({ heading, body }: SafetyCommitmentProps) {
  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      aria-labelledby="safety-commitment-heading"
    >
      <div className="vertex-container py-14 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl border-l-2 border-[var(--color-accent)] pl-5 md:pl-8">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
            Commitment
          </p>
          <h2
            id="safety-commitment-heading"
            className="mt-4 text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.15] text-[var(--color-primary)] md:text-4xl lg:text-[2.75rem]"
          >
            {heading}
          </h2>
          {body ? (
            <p className="mt-6 max-w-2xl text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              {body}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
