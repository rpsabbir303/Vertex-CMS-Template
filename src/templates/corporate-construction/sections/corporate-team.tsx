"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Company } from "@/templates/shared/cms/types/company";
import type { TeamMember } from "@/templates/shared/cms/types/team";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { planTeamPage, teamIndexLabel } from "@/templates/corporate-construction/components/team-page-plan";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { cn } from "@/utils/cn";

/** Homepage shows leadership story, not the full Team directory. */
const HOME_SECONDARY_LIMIT = 4;

type CorporateTeamProps = {
  members: TeamMember[];
  mode: TemplateRenderMode;
  company?: Company | null;
};

function sectionHeading(): string {
  return "Experienced people behind every project.";
}

function companyLeadershipStatement(company?: Company | null): string | undefined {
  if (!company?.description?.trim()) {
    return undefined;
  }
  const parts = company.description
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  // Prefer a second paragraph (company continuity) when available.
  const statement = parts[1] ?? undefined;
  if (!statement) {
    return undefined;
  }
  if (statement.length <= 220) {
    return statement;
  }
  const cut = statement.slice(0, 220);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 100 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

type SecondaryIndexProps = {
  members: TeamMember[];
  startIndex: number;
};

function SecondaryLeadershipIndex({ members, startIndex }: SecondaryIndexProps) {
  const firstWithImage = members.find((m) => m.image?.url)?.id ?? null;
  const [previewId, setPreviewId] = useState<string | null>(firstWithImage);
  const preview = members.find((m) => m.id === previewId && m.image?.url);

  const activate = useCallback((id: string) => setPreviewId(id), []);

  if (!members.length) {
    return null;
  }

  const showPreviewColumn = members.some((m) => Boolean(m.image?.url));

  return (
    <div className="mt-10 border-t border-[var(--color-border)] pt-8 lg:mt-12 lg:pt-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
          Leadership index
        </p>
        <p className="text-xs tabular-nums text-[var(--color-text-muted)]">
          {String(members.length).padStart(2, "0")} additional
        </p>
      </div>

      <div
        className={cn(
          "mt-6 grid gap-8 lg:items-start lg:gap-10",
          showPreviewColumn && "lg:grid-cols-12",
        )}
      >
        <ul
          className={cn(
            "min-w-0 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]",
            showPreviewColumn ? "lg:col-span-7" : "max-w-3xl",
          )}
        >
          {members.map((member, offset) => {
            const index = startIndex + offset;
            const isActive = previewId === member.id;
            const hasPreview = Boolean(member.image?.url);

            return (
              <li key={member.id} className="min-w-0">
                <button
                  type="button"
                  onMouseEnter={() => (hasPreview ? activate(member.id) : undefined)}
                  onFocus={() => (hasPreview ? activate(member.id) : undefined)}
                  className={cn(
                    "group flex w-full min-w-0 items-baseline gap-4 py-4 text-left transition-colors duration-300 md:gap-6 md:py-5",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
                    "motion-reduce:transition-none",
                    isActive && showPreviewColumn
                      ? "bg-[var(--color-surface-muted)]"
                      : "hover:bg-[var(--color-surface-muted)]/60",
                  )}
                  aria-current={isActive && showPreviewColumn ? "true" : undefined}
                >
                  <span
                    className={cn(
                      "shrink-0 font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.16em]",
                      isActive && showPreviewColumn
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]",
                    )}
                  >
                    {teamIndexLabel(index)}
                  </span>
                  <span className="min-w-0 flex-1 text-balance break-words font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-[var(--color-primary)] md:text-lg">
                    {member.name}
                  </span>
                  {member.role ? (
                    <span className="hidden max-w-[14rem] shrink-0 text-right text-pretty break-words text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)] sm:block md:max-w-[16rem]">
                      {member.role}
                    </span>
                  ) : null}
                </button>
                {member.role ? (
                  <p className="pb-4 pl-10 text-pretty break-words text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)] sm:hidden">
                    {member.role}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>

        {showPreviewColumn && preview?.image ? (
          <div className="hidden min-w-0 lg:col-span-5 lg:block">
            <div
              key={preview.id}
              className="overflow-hidden border border-[var(--color-border)] transition-opacity duration-300 motion-reduce:transition-none"
            >
              <CmsImageMedia
                image={preview.image}
                aspect="portrait"
                className="w-full max-h-[22rem]"
                sizes="(max-width: 1280px) 30vw, 22vw"
              />
              <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3">
                <p className="text-balance break-words text-sm font-semibold text-[var(--color-primary)]">
                  {preview.name}
                </p>
                {preview.role ? (
                  <p className="mt-1 text-pretty break-words text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-secondary)]">
                    {preview.role}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function CorporateTeam({
  members,
  mode,
  company = null,
}: CorporateTeamProps) {
  if (!members.length) {
    return null;
  }

  const plan = planTeamPage(members);
  const featured = plan.featured;
  if (!featured) {
    return null;
  }

  const secondary = plan.directory.slice(0, HOME_SECONDARY_LIMIT);
  const teamHref = previewHref(mode, "/team");
  const heading = sectionHeading();
  const statement = companyLeadershipStatement(company);
  const hasImage = Boolean(featured.image?.url);
  const remainingBeyondIndex = plan.directory.length - secondary.length;

  return (
    <section
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="home-leadership-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        {/* Section intro */}
        <div className="flex flex-col gap-5 border-b border-[var(--color-border)] pb-8 md:flex-row md:items-end md:justify-between md:gap-10 md:pb-10">
          <div className="min-w-0 max-w-2xl">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
              Leadership
            </p>
            <h2
              id="home-leadership-heading"
              className="mt-3 text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.05] text-[var(--color-primary)] md:text-4xl lg:text-[2.75rem]"
            >
              {heading}
            </h2>
          </div>
          <Link
            href={teamHref}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          >
            Full team
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Featured leadership — editorial split */}
        <div
          className={cn(
            "mt-10 grid min-w-0 items-start gap-8 lg:mt-12 lg:gap-x-10 xl:gap-x-14",
            hasImage && "lg:grid-cols-2 xl:grid-cols-12",
          )}
        >
          {hasImage ? (
            <figure className="relative order-2 min-w-0 lg:order-1 xl:col-span-7 xl:self-stretch">
              <div className="relative h-full min-h-[22rem] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-muted)] md:min-h-[26rem] lg:min-h-[32rem] xl:min-h-[36rem]">
                <CmsImageMedia
                  image={featured.image}
                  aspect="auto"
                  className="absolute inset-0 h-full min-h-[22rem] w-full md:min-h-[26rem] lg:min-h-[32rem] xl:min-h-[36rem] [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <span className="absolute left-4 top-4 z-[1] border border-white/30 bg-[var(--color-primary)]/80 px-2.5 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-[1px]">
                  {teamIndexLabel(0)} / Leadership
                </span>
              </div>
            </figure>
          ) : null}

          <div
            className={cn(
              "order-1 min-w-0 lg:order-2",
              hasImage ? "xl:col-span-5" : "max-w-2xl",
            )}
          >
            <p className="font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.16em] text-[var(--color-accent)]">
              {teamIndexLabel(0)}
              <span className="ml-2 text-[var(--color-text-muted)]">/</span>
              <span className="ml-2 tracking-[0.2em] text-[var(--color-secondary)]">
                Leadership
              </span>
            </p>

            <h3
              id={`home-lead-${featured.id}`}
              className="mt-5 text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.08] text-[var(--color-primary)] md:text-4xl lg:text-[2.65rem]"
            >
              {featured.name}
            </h3>

            {featured.role ? (
              <p className="mt-4 text-pretty break-words text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)] md:text-xs">
                {featured.role}
              </p>
            ) : null}

            {featured.bio ? (
              <p className="mt-6 max-w-md text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                {featured.bio}
              </p>
            ) : null}

            {/* Role already shown above — no fake years/specialty metadata */}
          </div>
        </div>

        {secondary.length ? (
          <SecondaryLeadershipIndex members={secondary} startIndex={1} />
        ) : null}

        {statement ? (
          <blockquote className="mt-10 max-w-3xl border-l-2 border-[var(--color-accent)] pl-5 text-pretty break-words font-[family-name:var(--font-display)] text-xl font-medium leading-snug text-[var(--color-primary)] md:mt-12 md:pl-7 md:text-2xl">
            {statement}
          </blockquote>
        ) : null}

        {remainingBeyondIndex > 0 ? (
          <p className="mt-8 text-sm text-[var(--color-text-muted)]">
            <Link
              href={teamHref}
              className="font-semibold text-[var(--color-accent)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
            >
              View {remainingBeyondIndex} more on the team page
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
