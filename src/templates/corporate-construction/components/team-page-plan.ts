import type { TeamMember } from "@/templates/shared/cms/types/team";

export function teamIndexLabel(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export type TeamPagePlan = {
  /** First person by CMS sort order — treated as featured leadership. */
  featured: TeamMember | null;
  /** Remaining members only; never includes `featured`. */
  directory: TeamMember[];
  directoryDense: boolean;
};

/**
 * Normalize sorted CMS team members into featured + directory.
 * Team members have no `featured` flag — CMS `sortOrder` is the supported equivalent
 * (first sorted member receives leadership emphasis).
 */
export function planTeamPage(members: TeamMember[]): TeamPagePlan {
  const count = members.length;

  if (count <= 0) {
    return { featured: null, directory: [], directoryDense: false };
  }

  const featured = members[0];
  const directory = members.slice(1);

  return {
    featured,
    directory,
    directoryDense: directory.length >= 8,
  };
}

export type TeamDirectoryPlan = {
  listClass: string;
};

export function planTeamDirectory(count: number, dense: boolean): TeamDirectoryPlan {
  if (count <= 0) {
    return { listClass: "grid gap-0" };
  }

  if (count === 1) {
    return { listClass: "grid gap-0 border-t border-[var(--color-border)]" };
  }

  if (count === 2) {
    return {
      listClass:
        "grid gap-0 border-t border-[var(--color-border)] md:grid-cols-2 md:divide-x md:divide-[var(--color-border)]",
    };
  }

  if (count === 3) {
    return {
      listClass:
        "grid gap-0 border-t border-[var(--color-border)] md:grid-cols-2 lg:grid-cols-3 md:divide-x md:divide-[var(--color-border)]",
    };
  }

  if (count === 4 && !dense) {
    return {
      listClass:
        "grid gap-0 border-t border-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4 [&>*]:border-b [&>*]:border-[var(--color-border)] lg:[&>*:not(:nth-child(4n))]:border-r",
    };
  }

  if (dense) {
    return {
      listClass:
        "grid gap-0 border-t border-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-b [&>*]:border-[var(--color-border)] lg:[&>*:not(:nth-child(3n))]:border-r",
    };
  }

  return {
    listClass:
      "grid gap-0 border-t border-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-b [&>*]:border-[var(--color-border)] lg:[&>*:not(:nth-child(3n))]:border-r",
  };
}
