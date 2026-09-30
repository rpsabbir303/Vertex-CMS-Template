import type { Certification } from "@/templates/shared/cms/types/certifications";
import type { Company } from "@/templates/shared/cms/types/company";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateProofStripProps = {
  company: Company;
  certifications: Certification[];
  serviceCount: number;
  projectCount: number;
};

type Fact = { value: string; label: string; note?: string };

/**
 * 02 — The record. Only figures the CMS can back.
 */
export function CorporateProofStrip({
  company,
  certifications,
  serviceCount,
  projectCount,
}: CorporateProofStripProps) {
  const year = company.foundedYear;
  const facts: Fact[] = [];
  if (year) {
    const years = new Date().getFullYear() - year;
    facts.push({ value: String(years), label: "Years in operation", note: `Established ${year}` });
  }
  if (projectCount) facts.push({ value: String(projectCount), label: "Projects published" });
  if (serviceCount) facts.push({ value: String(serviceCount), label: "Capabilities on record" });
  if (certifications.length) {
    facts.push({
      value: String(certifications.length),
      label: "Credentials on file",
      note: certifications.map((c) => c.name).join(" · "),
    });
  }
  if (facts.length < 2) return null;

  return (
    <section className="bg-[var(--color-surface-muted)]" aria-labelledby="proof-heading">
      <div className="vertex-container py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className={ui.eyebrow}>The record</p>
            <h2 id="proof-heading" className={cn(ui.h3, "mt-4 max-w-[14ch]")}>
              Counted from what is published, not rounded for effect.
            </h2>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-[1.25rem] bg-[var(--color-primary)]/10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-2">
            {facts.map((fact, index) => (
              <Reveal key={fact.label} delay={(index % 4) as 0 | 1 | 2 | 3} className="bg-[var(--color-surface-muted)] p-6 md:p-8">
                <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{fact.label}</dt>
                <dd className="mt-6">
                  <span className="block font-[family-name:var(--font-display)] text-[clamp(3.5rem,6vw,6rem)] font-semibold leading-none tracking-[-0.05em] text-[var(--color-primary)]">
                    {fact.value}
                  </span>
                  {fact.note ? <span className={cn(ui.small, "mt-3 block")}>{fact.note}</span> : null}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
