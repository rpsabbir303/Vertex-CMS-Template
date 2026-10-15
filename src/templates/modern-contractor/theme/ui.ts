const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]";

export const ui = {
  mono: "font-[family-name:var(--font-mono)] text-[0.6875rem] font-medium uppercase tracking-[0.14em]",
  eyebrow:
    "font-[family-name:var(--font-mono)] text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[#5c6b12]",
  pill: "inline-flex items-center rounded-full bg-[var(--color-surface-muted)] px-3 py-1 text-xs font-medium text-[var(--color-text)]",
  display:
    "font-[family-name:var(--font-display)] font-medium leading-[1.02] tracking-[-0.03em] text-[var(--color-text)]",
  h1: "font-[family-name:var(--font-display)] text-[clamp(2.75rem,6.2vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.035em] text-[var(--color-text)]",
  h2: "font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.35rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[var(--color-text)]",
  h3: "font-[family-name:var(--font-display)] text-[clamp(1.35rem,2vw,1.75rem)] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--color-text)]",
  lead: "text-pretty text-lg leading-relaxed text-[var(--color-text-muted)] md:text-[1.2rem]",
  body: "text-pretty text-base leading-relaxed text-[var(--color-text-muted)]",
  small: "text-sm leading-relaxed text-[var(--color-text-muted)]",
  card: "rounded-[1.5rem] bg-[var(--color-surface-elevated)]",
  btn: `inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#C8FF2E] px-6 text-sm font-semibold text-[#0a0c0b] transition-colors hover:bg-[#d6ff62] ${focus}`,
  btnDark: `inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)] ${focus}`,
  btnOutline: `inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-6 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-text)] ${focus}`,
  btnOnDark:
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-accent-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  link: `inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-[#0a0c0b] underline decoration-[#0a0c0b]/30 underline-offset-4 transition-colors hover:decoration-[#C8FF2E] ${focus}`,
  section: "py-[var(--spacing-section-y)] lg:py-[var(--spacing-section-y-lg)]",
  rule: "border-[var(--color-border)]",
} as const;

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}
