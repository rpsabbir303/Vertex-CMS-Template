import type { TeamMember } from "@/templates/shared/cms/types/team";
import { cn } from "@/utils/cn";
import { initialsFromName } from "@/utils/initials";
import { CmsImageMedia } from "./cms-image";

type TeamPortraitProps = {
  member: TeamMember;
  className?: string;
};

/** Text-first portrait when CMS photo is unavailable — no empty gray media box */
export function TeamPortrait({ member, className }: TeamPortraitProps) {
  if (member.image?.url) {
    return (
      <CmsImageMedia
        image={member.image}
        aspect="portrait"
        className={cn("w-full max-w-[15rem]", className)}
        sizes="(max-width: 1024px) 40vw, 240px"
      />
    );
  }

  const initials = initialsFromName(member.name);

  return (
    <div
      className={cn(
        "flex aspect-[3/4] w-full max-w-[15rem] items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface-muted)]",
        className,
      )}
      aria-hidden={!initials}
    >
      {initials ? (
        <span className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-secondary)]">
          {initials}
        </span>
      ) : null}
    </div>
  );
}
