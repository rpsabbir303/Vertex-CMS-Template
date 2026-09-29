import type { TeamMember } from "@/templates/shared/cms/types/team";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { cn } from "@/utils/cn";
import { planTeamDirectory, teamIndexLabel } from "./team-page-plan";

type TeamDirectoryItemProps = {
  member: TeamMember;
  index: number;
  dense?: boolean;
};

function TeamDirectoryItem({
  member,
  index,
  dense = false,
}: TeamDirectoryItemProps) {
  const hasImage = Boolean(member.image?.url);

  return (
    <article
      className={cn(
        "flex min-w-0 flex-col",
        dense ? "p-5 md:p-6" : "p-6 md:p-8",
      )}
    >
      <p className="font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.16em] text-[var(--color-accent)]">
        {teamIndexLabel(index)}
      </p>
      {hasImage ? (
        <CmsImageMedia
          image={member.image}
          aspect="portrait"
          className={cn(
            "mt-4 w-full border border-[var(--color-border)]",
            dense ? "max-w-[11rem]" : "max-w-[14rem]",
          )}
          sizes="(max-width: 1024px) 40vw, 220px"
        />
      ) : null}
      <h3
        className={cn(
          "text-balance break-words font-[family-name:var(--font-display)] font-semibold leading-snug text-[var(--color-primary)]",
          hasImage ? "mt-4" : "mt-3",
          dense ? "text-lg md:text-xl" : "text-xl md:text-2xl",
        )}
      >
        {member.name}
      </h3>
      {member.role ? (
        <p className="mt-2 text-pretty break-words text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-secondary)]">
          {member.role}
        </p>
      ) : null}
      {member.bio ? (
        <p
          className={cn(
            "mt-3 text-pretty break-words leading-relaxed text-[var(--color-text-muted)]",
            dense ? "text-sm" : "text-sm md:text-base",
          )}
        >
          {member.bio}
        </p>
      ) : null}
    </article>
  );
}

type TeamDirectoryProps = {
  members: TeamMember[];
  startIndex: number;
  dense?: boolean;
  heading?: string;
};

export function TeamDirectory({
  members,
  startIndex,
  dense = false,
  heading = "Team",
}: TeamDirectoryProps) {
  if (!members.length) {
    return null;
  }

  const plan = planTeamDirectory(members.length, dense);

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      aria-labelledby="team-directory-heading"
    >
      <div className="vertex-container py-10 md:py-12 lg:py-14">
        <div className="mb-6 min-w-0 md:mb-8">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
            Directory
          </p>
          <h2
            id="team-directory-heading"
            className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-primary)] md:text-3xl"
          >
            {heading}
          </h2>
        </div>

        <ul className={cn("bg-[var(--color-surface)]", plan.listClass)}>
          {members.map((member, offset) => (
            <li key={member.id} className="min-w-0">
              <TeamDirectoryItem
                member={member}
                index={startIndex + offset}
                dense={dense}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
