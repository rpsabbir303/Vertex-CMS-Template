import type {
  BlogArticleBlock,
  BlogArticleHeadingBlock,
  BlogPost,
  BlogPostAuthor,
} from "@/templates/shared/cms/types/blog";
import type { TeamMember } from "@/templates/shared/cms/types/team";

export type ArticleTocItem = {
  id: string;
  title: string;
  index: number;
};

export function slugifyArticleHeading(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function blogHeroTitleLines(title: string): { primary: string; secondary?: string } {
  const words = title.trim().split(/\s+/);
  if (words.length <= 4) return { primary: title };
  const mid = Math.ceil(words.length / 2);
  return { primary: words.slice(0, mid).join(" "), secondary: words.slice(mid).join(" ") };
}

function legacyBodyToSections(body: string): BlogArticleBlock[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((paragraph) => ({ type: "paragraph" as const, body: paragraph }));
}

export function resolveArticleSections(post: BlogPost): BlogArticleBlock[] {
  if (post.sections?.length) return post.sections;
  if (post.body?.trim()) return legacyBodyToSections(post.body);
  return [];
}

export function extractArticleToc(sections: BlogArticleBlock[]): ArticleTocItem[] {
  const items: ArticleTocItem[] = [];
  let index = 0;
  for (const block of sections) {
    if (block.type !== "heading" || (block.level ?? 2) > 2) continue;
    index += 1;
    const id = block.id?.trim() || slugifyArticleHeading(block.title);
    items.push({ id, title: block.title, index });
  }
  return items;
}

export function ensureHeadingIds(sections: BlogArticleBlock[]): BlogArticleBlock[] {
  return sections.map((block) => {
    if (block.type !== "heading") return block;
    const heading = block as BlogArticleHeadingBlock;
    return {
      ...heading,
      id: heading.id?.trim() || slugifyArticleHeading(heading.title),
      level: heading.level ?? 2,
    };
  });
}

export function articleTextForReadingTime(post: BlogPost, sections: BlogArticleBlock[]): string {
  const fromSections = sections
    .map((b) => {
      switch (b.type) {
        case "paragraph":
        case "highlight":
          return b.body;
        case "quote":
          return b.text;
        case "callout":
          return `${b.title ?? ""} ${b.body}`;
        case "list":
          return b.items.join(" ");
        case "heading":
          return b.title;
        default:
          return "";
      }
    })
    .join(" ");
  return [post.excerpt, post.body, fromSections].filter(Boolean).join(" ");
}

export function resolveBlogAuthor(post: BlogPost, team: TeamMember[]): BlogPostAuthor | undefined {
  const profile = post.authorProfile;
  if (profile?.teamMemberId) {
    const member = team.find((t) => t.id === profile.teamMemberId);
    if (member) {
      return {
        name: profile.name?.trim() || member.name,
        role: profile.role?.trim() || member.role,
        bio: profile.bio?.trim() || undefined,
        image: profile.image?.url ? profile.image : member.image,
        teamMemberId: profile.teamMemberId,
      };
    }
  }
  if (profile?.name?.trim()) return profile;
  if (post.author?.trim()) {
    const member = team.find((t) => t.name === post.author);
    return {
      name: post.author,
      role: member?.role,
      bio: member?.bio ? member.bio.slice(0, 280) : undefined,
      image: member?.image,
    };
  }
  return undefined;
}

export function resolveRelatedBlogPosts(post: BlogPost, all: BlogPost[], limit = 3): BlogPost[] {
  const slugs = post.relatedSlugs?.filter(Boolean) ?? [];
  const picked: BlogPost[] = [];
  for (const slug of slugs) {
    const match = all.find((p) => p.slug === slug && p.id !== post.id);
    if (match) picked.push(match);
    if (picked.length >= limit) return picked;
  }
  const sameCategory = all.filter(
    (p) => p.id !== post.id && post.category && p.category === post.category && !picked.some((x) => x.id === p.id),
  );
  for (const p of sameCategory) {
    picked.push(p);
    if (picked.length >= limit) break;
  }
  for (const p of all) {
    if (p.id === post.id || picked.some((x) => x.id === p.id)) continue;
    picked.push(p);
    if (picked.length >= limit) break;
  }
  return picked.slice(0, limit);
}
