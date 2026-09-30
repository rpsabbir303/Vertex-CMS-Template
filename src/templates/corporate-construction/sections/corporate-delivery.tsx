import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

/** Template-level delivery sequence. Structural copy, not tenant data. */
const PHASES = [
  { title: "Discover", body: "Site, program, and budget reviewed before anything is priced." },
  { title: "Plan", body: "Logistics, sequencing, and procurement set with the trades." },
  { title: "Build", body: "Superintendent-led field work against a published schedule." },
  { title: "Control", body: "Cost, quality, and safety tracked and reported every week." },
  { title: "Deliver", body: "Commissioning, documentation, and a clean handover." },
];

/**
 * 07 — Process. Five steps as a horizontal rail.
 */
export function CorporateDelivery() {
  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby="process-heading">
      <div className="vertex-container py-24 md:py-32">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className={ui.eyebrow}>How we deliver</p>
            <h2 id="process-heading" className={cn(ui.h2, "mt-5 max-w-[14ch]")}>
              One sequence, from first price to handover.
            </h2>
          </div>
          <p className={cn(ui.body, "max-w-sm md:col-span-4")}>
            The same team stays on the project from preconstruction through closeout, so nothing is
            lost between phases.
          </p>
        </div>

        <ol className={cn("mt-16 grid gap-px overflow-hidden rounded-[1.25rem] bg-[var(--color-primary)]/10 sm:grid-cols-2 lg:grid-cols-5")}>
          {PHASES.map((phase, index) => (
            <Reveal
              as="li"
              key={phase.title}
              delay={(index % 4) as 0 | 1 | 2 | 3}
              className="group flex min-h-[16rem] flex-col justify-between bg-[var(--color-surface)] p-6 transition-colors hover:bg-[var(--color-surface-muted)] motion-reduce:transition-none lg:min-h-[20rem]"
            >
              <span className="font-[family-name:var(--font-display)] text-[clamp(3rem,4.5vw,4.5rem)] font-semibold leading-none tracking-[-0.05em] text-[var(--color-text)]/15 transition-colors group-hover:text-[var(--color-accent)] motion-reduce:transition-none">
                {pad(index + 1)}
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-[var(--color-text)]">
                  {phase.title}
                </h3>
                <p className={cn(ui.small, "mt-2")}>{phase.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
