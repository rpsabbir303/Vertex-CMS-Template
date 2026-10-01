import type { TemplatePageProps } from "@/registry/template-types";
import {
  getSortedCollectionItems,
  getVisibleServices,
  unwrapCollectionItems,
  unwrapEnvelope,
} from "@/templates/shared/cms/resolve-content";
import { CorporateAboutBeliefsSection } from "@/templates/corporate-construction/sections/corporate-about-beliefs";
import { CorporateAboutHowWeWorkSection } from "@/templates/corporate-construction/sections/corporate-about-how-we-work";
import { CorporateAboutLeadershipSection } from "@/templates/corporate-construction/sections/corporate-about-leadership";
import { CorporateAboutOfficeToFieldSection } from "@/templates/corporate-construction/sections/corporate-about-office-to-field";
import { CorporateAboutHero } from "@/templates/corporate-construction/components/corporate-about-hero";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CtaBand } from "@/templates/corporate-construction/components/ui/cta-band";
import { CorporateAboutHistory } from "@/templates/corporate-construction/sections/corporate-about-history";
import { CorporateAboutWhoWeAre } from "@/templates/corporate-construction/sections/corporate-about-who-we-are";
import { CorporateCraftsmanship } from "@/templates/corporate-construction/sections/corporate-craftsmanship";
import { CorporateCredentials } from "@/templates/corporate-construction/sections/corporate-home-metrics";
import { CorporateProofStrip } from "@/templates/corporate-construction/sections/corporate-proof-strip";
import {
  aboutMetaItems,
  resolveAboutLeaders,
  resolveHistoryMilestones,
} from "@/templates/corporate-construction/utils/about-content";
import { pageSeoDescription, splitParagraphs } from "@/templates/corporate-construction/utils/page-seo";

export function CorporateConstructionAboutPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const projects = getSortedCollectionItems(props.payload.projects);
  const services = getVisibleServices(props.payload.services);
  const certifications = unwrapCollectionItems(props.payload.certifications);
  const team = getSortedCollectionItems(props.payload.team);

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
  const [statement, ...descriptionRest] = paragraphs;
  const supporting = [...descriptionRest, ...(company.aboutSupporting ?? [])].filter(Boolean);
  const seo = pageSeoDescription(props.payload, "about");
  const meta = aboutMetaItems(company);
  const historyMilestones = resolveHistoryMilestones(company);
  const historyHeadline =
    company.aboutHistory?.headline?.trim() || "Built over decades. Still close to the work.";
  const historyEyebrow = company.aboutHistory?.eyebrow?.trim() || "Our history";
  const historyImage = company.aboutHistory?.image ?? company.heroImage;
  const aboutLeaders = resolveAboutLeaders(company.aboutLeadership, team);

  return (
    <CorporatePageFrame {...props}>
      <CorporateAboutHero
        tagline={company.tagline ?? ""}
        fallbackTitle={company.name}
        lead={seo}
        meta={meta}
        image={company.heroImage}
      />

      {statement ? <CorporateAboutWhoWeAre statement={statement} supporting={supporting} /> : null}

      <CorporateAboutHistory
        eyebrow={historyEyebrow}
        headline={historyHeadline}
        milestones={historyMilestones}
        image={historyImage}
      />

      {company.aboutHowWeWork ? <CorporateAboutHowWeWorkSection content={company.aboutHowWeWork} /> : null}

      {company.aboutLeadership ? (
        <CorporateAboutLeadershipSection content={company.aboutLeadership} leaders={aboutLeaders} />
      ) : null}

      {company.aboutOfficeToField ? <CorporateAboutOfficeToFieldSection content={company.aboutOfficeToField} /> : null}

      {company.aboutBeliefs ? <CorporateAboutBeliefsSection content={company.aboutBeliefs} /> : null}

      <CorporateProofStrip
        company={company}
        certifications={certifications}
        serviceCount={services.length}
        projectCount={projects.length}
      />

      <CorporateCraftsmanship company={company} projects={projects} />

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
