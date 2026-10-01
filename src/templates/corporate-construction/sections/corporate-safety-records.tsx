import type { Certification } from "@/templates/shared/cms/types/certifications";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateSafetyRecordsProps = {
  records: Certification[];
  headline?: string;
};

export function CorporateSafetyRecords({ records, headline }: CorporateSafetyRecordsProps) {
  if (!records.length && !headline) return null;

  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]" aria-labelledby="safety-records-heading">
      <div className="vertex-container py-28 md:py-36 lg:py-40">
        <p className={ui.eyebrow}>On file</p>
        <h2 id="safety-records-heading" className={cn(ui.h2, "mt-5 max-w-[16ch] text-balance")}>
          {headline ?? "Safety is part of how the work is delivered."}
        </h2>
        {records.length ? (
          <ul className={cn("mt-14 divide-y border-t", ui.rule)}>
            {records.map((record) => (
              <li key={record.id} className="grid gap-2 py-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8">
                <div>
                  <p className="font-[family-name:var(--font-display)] text-2xl font-semibold uppercase tracking-[-0.02em] text-[var(--color-text)] md:text-[1.625rem]">
                    {record.name}
                  </p>
                  <p className={cn(ui.small, "mt-2 max-w-prose")}>
                    {record.name.toLowerCase().includes("manual")
                      ? "Available documentation"
                      : record.name.toLowerCase().includes("procedure")
                        ? "Project control documentation"
                        : "Approved credentials"}
                  </p>
                </div>
                <p className={cn(ui.mono, "text-[var(--color-text-muted)] md:text-right")}>
                  {[record.issuer, record.year].filter(Boolean).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
