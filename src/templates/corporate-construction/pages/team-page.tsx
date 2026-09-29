import type { TemplatePageProps } from "@/registry/template-types";
import {
  getSortedCollectionItems,
  unwrapEnvelope,
} from "@/templates/shared/cms/resolve-content";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CorporateTeamHero } from "@/templates/corporate-construction/components/corporate-team-hero";
import { TeamDirectory } from "@/templates/corporate-construction/components/team-directory";
import { TeamLeadershipFeature } from "@/templates/corporate-construction/components/team-leadership-feature";
import { planTeamPage } from "@/templates/corporate-construction/components/team-page-plan";
import { CorporateTeamCta } from "@/templates/corporate-construction/sections/team-cta";
import { TeamPerspective } from "@/templates/corporate-construction/sections/team-perspective";

function companyPerspectiveCopy(description?: string): string | undefined {
  if (!description?.trim()) {
    return undefined;
  }
  const paragraphs = description
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
  // Prefer continuity/accountability paragraph when multi-paragraph company copy exists.
  return paragraphs[1] ?? paragraphs[0];
}

export function CorporateConstructionTeamPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const members = getSortedCollectionItems(props.payload.team);
  const plan = planTeamPage(members);

  const heroTitle = "People accountable for the work";
  const heroDescription = company?.name
    ? `${company.name} builds with leaders who stay accountable from preconstruction through closeout.`
    : "Leaders who stay accountable from preconstruction through closeout.";

  // Company image only — avoid repeating a member portrait already used in leadership.
  const heroImage = company?.heroImage?.url ? company.heroImage : null;

  const perspectiveCopy = companyPerspectiveCopy(company?.description);

  return (
    <CorporatePageFrame {...props}>
      <CorporateTeamHero
        title={heroTitle}
        description={heroDescription}
        image={heroImage}
      />

      {!members.length ? (
        <section className="vertex-container py-16 md:py-20">
          <p className="text-[var(--color-text-muted)]">
            Team profiles have not been published yet.
          </p>
        </section>
      ) : null}

      {plan.featured ? (
        <TeamLeadershipFeature member={plan.featured} index={0} />
      ) : null}

      {plan.directory.length ? (
        <TeamDirectory
          members={plan.directory}
          startIndex={1}
          dense={plan.directoryDense}
          heading="Team"
        />
      ) : null}

      {perspectiveCopy ? (
        <TeamPerspective
          statement="Built by people who stay close to the work."
          supporting={perspectiveCopy}
        />
      ) : null}

      <CorporateTeamCta mode={props.mode} companyName={company?.name} />
    </CorporatePageFrame>
  );
}
