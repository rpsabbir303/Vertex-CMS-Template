import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapCollectionItems, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { TeamCardBase } from "@/templates/shared/components/cards/team-card-base";
import { ButtonLink } from "@/templates/shared/components/ui/button-link";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CorporatePageHero } from "@/templates/corporate-construction/components/corporate-page-hero";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";

export function CorporateConstructionTeamPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const members = unwrapCollectionItems(props.payload.team);

  return (
    <CorporatePageFrame {...props}>
      <CorporatePageHero
        eyebrow="Team"
        title="People accountable for pricing, the field, and reporting"
        summary={
          company
            ? `${company.name} lists the leaders who stay with a project from preconstruction through closeout.`
            : undefined
        }
        image={company?.heroImage}
      />
      {members.length ? (
        <section aria-labelledby="team-list-heading">
          <div className="vertex-container py-[var(--spacing-section-y-lg)]">
            <h2 id="team-list-heading" className="sr-only">
              Team members
            </h2>
            <ul className="grid gap-14 sm:grid-cols-2 xl:grid-cols-4">
              {members.map((member) => (
                <li key={member.id}>
                  <TeamCardBase member={member} bodyClassName="mt-5" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="vertex-container py-20">
          <p className="text-[var(--color-text-muted)]">Team profiles have not been published yet.</p>
        </section>
      )}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]">
        <div className="vertex-container flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-primary)]">
            Ask who would lead your project
          </h2>
          <ButtonLink href={previewHref(props.mode, "/contact")}>Contact the office</ButtonLink>
        </div>
      </section>
    </CorporatePageFrame>
  );
}
