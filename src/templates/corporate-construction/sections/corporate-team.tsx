import type { TeamMember } from "@/templates/shared/cms/types/team";
import { planTeamGrid } from "@/templates/corporate-construction/components/team-grid-plan";
import { TeamPortrait } from "@/templates/shared/media/team-portrait";

type CorporateTeamProps = {
  members: TeamMember[];
};

export function CorporateTeam({ members }: CorporateTeamProps) {
  if (!members.length) {
    return null;
  }

  const grid = planTeamGrid(members.length);

  return (
    <section
      className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      aria-labelledby="corporate-team-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
          People
        </p>
        <h2
          id="corporate-team-heading"
          className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-primary)] md:text-4xl"
        >
          Leadership
        </h2>
        <ul className={`mt-8 border-t border-[var(--color-border)] pt-8 ${grid.listClass}`}>
          {members.map((member, index) => (
            <li key={member.id} className={grid.itemClass(index, members.length)}>
              <article className="min-w-0">
                <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-[var(--color-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <TeamPortrait member={member} className="mt-4" />
                <h3 className="mt-4 text-balance break-words font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-primary)]">
                  {member.name}
                </h3>
                <p className="mt-1 text-pretty break-words text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-secondary)]">
                  {member.role}
                </p>
                {member.bio ? (
                  <p className="mt-3 text-pretty break-words text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {member.bio}
                  </p>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
