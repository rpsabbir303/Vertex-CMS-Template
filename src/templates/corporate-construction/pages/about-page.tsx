import type { TemplatePageProps } from "@/registry/template-types";
import {
  getSortedCollectionItems,
  getVisibleServices,
  unwrapCollectionItems,
  unwrapEnvelope,
} from "@/templates/shared/cms/resolve-content";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CtaBand } from "@/templates/corporate-construction/components/ui/cta-band";
import { PageIntro } from "@/templates/corporate-construction/components/ui/page-intro";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { CorporateCraftsmanship } from "@/templates/corporate-construction/sections/corporate-craftsmanship";
import { CorporateCredentials } from "@/templates/corporate-construction/sections/corporate-home-metrics";
import { CorporateLeadership } from "@/templates/corporate-construction/sections/corporate-leadership";
import { CorporateProofStrip } from "@/templates/corporate-construction/sections/corporate-proof-strip";
import { pageSeoDescription, splitParagraphs } from "@/templates/corporate-construction/utils/page-seo";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

export function CorporateConstructionAboutPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const team = getSortedCollectionItems(props.payload.team);
  const projects = getSortedCollectionItems(props.payload.projects);
  const services = getVisibleServices(props.payload.services);
  const certifications = unwrapCollectionItems(props.payload.certifications);

  if (!company) {
    return (
      <CorporatePageFrame {...props}>
        <section className="vertex-container pt-40 pb-24">
          <p className="text-[var(--color-text-muted)]">
            Company information is unavailable. This template does not display placeholder
            marketing content when CMS data is missing.
          </p>
        </section>
      </CorporatePageFrame>
    );
  }

  const paragraphs = splitParagraphs(company.description);
  const [statement, ...rest] = paragraphs;
  const seo = pageSeoDescription(props.payload, "about");
  const area = [company.address?.city, company.address?.region].filter(Boolean).join(", ");
  const meta = [
    company.foundedYear ? `Est. ${company.foundedYear}` : undefined,
    area || undefined,
    team.length ? `${team.length} leaders` : undefined,
  ].filter((v): v is string => Boolean(v));

  return (
    <CorporatePageFrame {...props}>
      <PageIntro
        eyebrow="About"
        title={company.tagline?.trim() || company.name}
        lead={seo}
        meta={meta}
        image={company.heroImage}
      />

      {statement ? (
        <section className="bg-[var(--color-surface)]" aria-labelledby="about-statement">
          <div className="vertex-container grid gap-10 py-24 md:py-32 lg:grid-cols-12">
            <p className={cn(ui.eyebrow, "lg:col-span-3")}>Who we are</p>
            <Reveal className="lg:col-span-9">
              <p
                id="about-statement"
                className="max-w-4xl text-balance font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--color-primary)]"
              >
                {statement}
              </p>
              {rest.length ? (
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  {rest.map((p) => (
                    <p key={p.slice(0, 32)} className={ui.body}>
                      {p}
                    </p>
                  ))}
                </div>
              ) : null}
            </Reveal>
          </div>
        </section>
      ) : null}

      <CorporateProofStrip
        company={company}
        certifications={certifications}
        serviceCount={services.length}
        projectCount={projects.length}
      />

      <CorporateCraftsmanship company={company} projects={projects} />

      {team.length ? <CorporateLeadership company={company} mode={props.mode} team={team} /> : null}

      <CorporateCredentials certifications={certifications} projects={projects} />

      <CtaBand
        mode={props.mode}
        title="Talk to the people who will build it."
        body={`Preconstruction at ${company.name} starts with a conversation about the site and the schedule.`}
        secondary={{ label: "See the work", href: "/projects" }}
      />
    </CorporatePageFrame>
  );
}
