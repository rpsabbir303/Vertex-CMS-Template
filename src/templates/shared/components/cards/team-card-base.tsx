import type { TeamMember } from "@/templates/shared/cms/types/team";
import { TeamPortrait } from "@/templates/shared/media/team-portrait";
import { cn } from "@/utils/cn";

export type TeamCardBaseProps = {
  member: TeamMember;
  className?: string;
  imageClassName?: string;
  bodyClassName?: string;
};

export function TeamCardBase({
  member,
  className,
  imageClassName,
  bodyClassName,
}: TeamCardBaseProps) {
  return (
    <article className={cn("min-w-0", className)}>
      <TeamPortrait member={member} className={imageClassName} />
      <div className={cn("min-w-0", bodyClassName)}>
        <h3 className="text-balance text-lg font-semibold text-[var(--color-text)]">
          {member.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-[var(--color-secondary)]">
          {member.role}
        </p>
        {member.bio ? (
          <p className="mt-3 text-pretty text-sm leading-relaxed text-[var(--color-text-muted)]">
            {member.bio}
          </p>
        ) : null}
      </div>
    </article>
  );
}
