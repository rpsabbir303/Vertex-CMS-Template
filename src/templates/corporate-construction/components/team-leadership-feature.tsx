import type { TeamMember } from "@/templates/shared/cms/types/team";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { cn } from "@/utils/cn";
import { teamIndexLabel } from "./team-page-plan";

type TeamLeadershipFeatureProps = {
  member: TeamMember;
  index?: number;
};

export function TeamLeadershipFeature({
  member,
  index = 0,
}: TeamLeadershipFeatureProps) {
  const hasImage = Boolean(member.image?.url);

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby={`team-lead-${member.id}`}
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div
          className={cn(
            "grid min-w-0 gap-8 lg:gap-12",
            hasImage && "lg:grid-cols-12 lg:items-start",
          )}
        >
          {hasImage ? (
            <div className="min-w-0 lg:col-span-6">
              <CmsImageMedia
                image={member.image}
                aspect="portrait"
                className="w-full max-w-md border border-[var(--color-border)] lg:max-w-none"
                sizes="(max-width: 1024px) 80vw, 42vw"
                priority
              />
            </div>
          ) : null}

          <div className={cn("min-w-0", hasImage ? "lg:col-span-6 lg:pt-4" : "max-w-3xl")}>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
              Leadership
            </p>
            <p className="mt-4 font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.16em] text-[var(--color-accent)]">
              {teamIndexLabel(index)}
            </p>
            <h2
              id={`team-lead-${member.id}`}
              className="mt-3 text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[var(--color-primary)] md:text-4xl lg:text-[2.5rem]"
            >
              {member.name}
            </h2>
            {member.role ? (
              <p className="mt-3 text-pretty break-words text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)] md:text-xs">
                {member.role}
              </p>
            ) : null}
            {member.bio ? (
              <p className="mt-6 max-w-xl text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                {member.bio}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
