import type { TemplatePageKey } from "@/registry/template-types";

export type ResolvedPublicPath = {
  page: TemplatePageKey;
  entitySlug?: string;
  path: string;
};

export function resolvePublicPath(segments?: string[]): ResolvedPublicPath | null {
  if (!segments?.length) {
    return { page: "home", path: "/" };
  }

  const [first, second, ...rest] = segments;
  if (rest.length) {
    return null;
  }

  switch (first) {
    case "about":
      return second ? null : { page: "about", path: "/about" };
    case "services":
      return second ? null : { page: "services", path: "/services" };
    case "projects":
      return second
        ? { page: "project-detail", entitySlug: second, path: `/projects/${second}` }
        : { page: "projects", path: "/projects" };
    case "team":
      return second ? null : { page: "team", path: "/team" };
    case "contact":
      return second ? null : { page: "contact", path: "/contact" };
    default:
      return second ? null : { page: "optional", entitySlug: first, path: `/${first}` };
  }
}
