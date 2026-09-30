import type { TemplatePageProps } from "@/registry/template-types";
import { getSortedCollectionItems, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CtaBand } from "@/templates/corporate-construction/components/ui/cta-band";
import { PageIntro } from "@/templates/corporate-construction/components/ui/page-intro";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { pageSeoDescription, splitParagraphs } from "@/templates/corporate-construction/utils/page-seo";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

export function CorporateConstructionTeamPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const members = getSortedCollectionItems(props.payload.team);
  const [featured, ...directory] = members;
  const perspective = splitParagraphs(company?.description)[1];

  return (
    <CorporatePageFrame {...props}>
      <PageIntro
        eyebrow="Team"
        title="The people on the job."
        lead={pageSeoDescription(props.payload, "team")}
        meta={members.length ? [`${members.length} ${members.length === 1 ? "leader" : "leaders"}`] : []}
      />

      {!members.length ? (
        <section className="vertex-container py-16 md:py-20">
          <p className="text-[var(--color-text-muted)]">Team profiles have not been published yet.</p>
        </section>
      ) : null}

      {featured ? (
        <section className="bg-[var(--color-surface)]" aria-label="Featured leader">
          <div className="vertex-container grid gap-10 pb-24 lg:grid-cols-12 lg:gap-16 md:pb-32">
            <Reveal plate as="figure" className="lg:col-span-6">
              <div className={cn(ui.plate, "h-[110vw] max-h-[36rem] md:h-[40rem] lg:h-[46rem] lg:max-h-none")}>
                <CmsImageMedia image={featured.image} aspect="auto" className="h-full" sizes="(min-width: 1440px) 48vw, 100vw" priority />
              </div>
            </Reveal>
            <div className="lg:col-span-6 lg:self-end">
              <p className={cn(ui.mono, "text-[var(--color-accent)]")}>{pad(1)}</p>
              <h2 className={cn(ui.h2, "mt-4")}>{featured.name}</h2>
              <p className={cn(ui.mono, "mt-3 text-[var(--color-text-muted)]")}>
                {featured.role}
                {company?.name ? ` · ${company.name}` : ""}
              </p>
              {featured.bio ? <p className={cn(ui.lead, "mt-8 max-w-xl")}>{featured.bio}</p> : null}
            </div>
          </div>
        </section>
      ) : null}

      {directory.length ? (
        <section className="bg-[var(--color-surface-muted)]" aria-labelledby="directory-heading">
          <div className="vertex-container py-24 md:py-32">
            <div className="flex items-end justify-between gap-6">
              <h2 id="directory-heading" className={ui.h3}>
                Leadership
              </h2>
              <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>
                {directory.length} {directory.length === 1 ? "person" : "people"}
              </p>
            </div>
            <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {directory.map((member, i) => (
                <Reveal as="li" key={member.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
                  <div className={cn(ui.plate, "h-[110vw] max-h-[26rem] sm:h-[26rem]")}>
                    <CmsImageMedia image={member.image} aspect="auto" className="h-full" sizes="(min-width: 1024px) 33vw, 100vw" />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                      {member.name}
                    </h3>
                    <span className={cn(ui.mono, "shrink-0 text-[var(--color-accent)]")}>{pad(i + 2)}</span>
                  </div>
                  <p className={cn(ui.mono, "mt-1 text-[var(--color-text-muted)]")}>{member.role}</p>
                  {member.bio ? <p className={cn(ui.small, "mt-4")}>{member.bio}</p> : null}
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {perspective ? (
        <section className="bg-[var(--color-surface)]" aria-labelledby="team-perspective">
          <div className="vertex-container grid gap-10 py-24 md:py-32 lg:grid-cols-12">
            <p id="team-perspective" className={cn(ui.eyebrow, "lg:col-span-3")}>
              How we work
            </p>
            <Reveal className="lg:col-span-9">
              <p className="max-w-4xl text-balance font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.2vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--color-primary)]">
                {perspective}
              </p>
            </Reveal>
          </div>
        </section>
      ) : null}

      <CtaBand
        mode={props.mode}
        title="Work with this team."
        body={company?.name ? `Start a project conversation with ${company.name}.` : undefined}
        secondary={{ label: "About the company", href: "/about" }}
      />
    </CorporatePageFrame>
  );
}
