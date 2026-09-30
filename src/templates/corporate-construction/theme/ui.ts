/**
 * Corporate Construction — shared class recipes.
 * One place for the type scale so every page reads as one system.
 */
export const ui = {
  /** IBM Plex Mono spec label: `[ 01 ]  EST. 1978` */
  mono: "font-[family-name:var(--font-mono)] text-[0.6875rem] font-medium uppercase tracking-[0.18em]",
  eyebrow:
    "font-[family-name:var(--font-mono)] text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]",
  display:
    "font-[family-name:var(--font-display)] font-semibold leading-[0.9] tracking-[-0.045em] text-[var(--color-text)]",
  h1: "font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,8.5rem)] font-semibold leading-[0.88] tracking-[-0.05em] text-[var(--color-text)]",
  h2: "font-[family-name:var(--font-display)] text-[clamp(2.25rem,4.4vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-[var(--color-text)]",
  h3: "font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--color-text)]",
  lead: "text-pretty text-lg leading-relaxed text-[var(--color-text)] md:text-xl",
  body: "text-pretty text-base leading-relaxed text-[var(--color-text-muted)]",
  small: "text-sm leading-relaxed text-[var(--color-text-muted)]",
  plate: "overflow-hidden rounded-[1.25rem] bg-[var(--color-surface-muted)]",
  plateSm: "overflow-hidden rounded-[0.875rem] bg-[var(--color-surface-muted)]",
  btn: "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
  btnAccent:
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
  btnGhost:
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--color-primary)]/20 px-6 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:border-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
  btnOnDark:
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-accent)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  link: "inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
  rule: "border-[var(--color-border)]",
  section: "py-[var(--spacing-section-y)] lg:py-[var(--spacing-section-y-lg)]",
} as const;

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}
