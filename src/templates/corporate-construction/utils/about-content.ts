import type {
  Company,
  CompanyAboutLeader,
  CompanyAboutLeadership,
  CompanyHistoryMilestone,
  CompanyIndexedItem,
} from "@/templates/shared/cms/types/company";
import type { TeamMember } from "@/templates/shared/cms/types/team";

/** Split tagline into two editorial lines when natural (e.g. "Midwest commercial builder"). */
export function aboutHeroTitleLines(tagline: string | undefined, fallback: string): { primary: string; secondary?: string } {
  const text = tagline?.trim() || fallback;
  const space = text.indexOf(" ");
  if (space > 0 && space < text.length - 1) {
    return {
      primary: text.slice(0, space),
      secondary: text.slice(space + 1),
    };
  }
  return { primary: text };
}

export function aboutMetaItems(company: Company): string[] {
  const area = [company.address?.city, company.address?.region].filter(Boolean).join(", ");
  return [
    company.foundedYear ? `Est. ${company.foundedYear}` : undefined,
    area || undefined,
  ].filter((v): v is string => Boolean(v));
}

/** Neutral default milestones when CMS has not supplied `aboutHistory.milestones`. */
export function defaultHistoryMilestones(company: Company): CompanyHistoryMilestone[] {
  const start = company.foundedYear ? String(company.foundedYear) : undefined;
  return [
    { year: start ?? "—", title: "Company founded" },
    { year: "Later", title: "Regional growth" },
    { year: "Today", title: "Commercial construction practice" },
  ];
}

export function resolveHistoryMilestones(company: Company): CompanyHistoryMilestone[] {
  const fromCms = company.aboutHistory?.milestones?.filter((m) => m.title?.trim());
  if (fromCms?.length) return fromCms;
  return defaultHistoryMilestones(company);
}

export function splitAboutParagraphs(text: string | undefined): string[] {
  if (!text?.trim()) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function hasIndexedItems(items: CompanyIndexedItem[] | undefined): boolean {
  return Boolean(items?.some((item) => item.title?.trim()));
}

export function resolveAboutLeaders(
  leadership: CompanyAboutLeadership | undefined,
  team: TeamMember[],
): CompanyAboutLeader[] {
  const leaders = leadership?.leaders?.filter((l) => l.role?.trim()) ?? [];
  return leaders.map((leader) => {
    if (!leader.teamMemberId) return leader;
    const member = team.find((t) => t.id === leader.teamMemberId);
    if (!member) return leader;
    return {
      ...leader,
      name: leader.name?.trim() || member.name,
      image: leader.image?.url ? leader.image : member.image,
      note: leader.note?.trim() || undefined,
    };
  });
}
