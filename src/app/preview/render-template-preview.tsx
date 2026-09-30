import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCmsPayload, type CmsFixtureId } from "@/data/get-cms-payload";
import {
  applyHomepageVariants,
  isProjectsVariant,
  isTeamVariant,
  isTestimonialsVariant,
} from "@/data/fixtures/homepage-variants";
import { isServicesVariant, withServicesVariant } from "@/data/fixtures/services-variants";
import { getTemplateBySlug } from "@/registry/template-registry";
import type { TenantBranding } from "@/templates/shared/branding/types";
import { unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { TemplateShell } from "@/templates/shared/layout/template-shell";
import { resolvePublicPath } from "@/templates/shared/routing/resolve-public-path";
import { buildPageMetadata } from "@/templates/shared/seo/page-metadata";

export type PreviewPageProps = {
  params: Promise<{ templateSlug: string; segments?: string[] }>;
  searchParams: Promise<{
    fixture?: string;
    brandAccent?: string;
    services?: string;
    team?: string;
    projects?: string;
    testimonials?: string;
  }>;
};

function parseFixture(value?: string): CmsFixtureId {
  if (value === "empty" || value === "partial") {
    return value;
  }
  return "default";
}

export async function generatePreviewMetadata({
  params,
  searchParams,
}: PreviewPageProps): Promise<Metadata> {
  const { segments } = await params;
  const { fixture } = await searchParams;
  const resolved = resolvePublicPath(segments);
  const payload = getCmsPayload(parseFixture(fixture));
  const pageSlug =
    resolved?.page === "optional" ? (resolved.entitySlug ?? "home") : (resolved?.page ?? "home");
  const seoSlug =
    pageSlug === "project-detail" ? "projects" : pageSlug === "blog-post" ? "blog" : pageSlug;
  return buildPageMetadata(payload, seoSlug);
}

export async function TemplatePreviewPage({ params, searchParams }: PreviewPageProps) {
  const raw = await params;
  const templateSlug = raw.templateSlug.replaceAll("_", "-");
  const segments = raw.segments;
  const { fixture, brandAccent, services, team, projects, testimonials } = await searchParams;
  const definition = getTemplateBySlug(templateSlug);
  const resolved = resolvePublicPath(segments);

  if (!definition || !resolved) {
    notFound();
  }

  // Templates that register pages 404 on routes they no longer provide (e.g. a removed Team page).
  const hasRegisteredPages = Object.keys(definition.pages).length > 0;
  if (hasRegisteredPages && resolved.page !== "optional" && !definition.pages[resolved.page]) {
    notFound();
  }

  let payload = getCmsPayload(parseFixture(fixture));
  if (isServicesVariant(services)) {
    payload = withServicesVariant(payload, services);
  }
  payload = applyHomepageVariants(payload, {
    team: isTeamVariant(team) ? team : undefined,
    projects: isProjectsVariant(projects) ? projects : undefined,
    testimonials: isTestimonialsVariant(testimonials) ? testimonials : undefined,
  });

  if (resolved.page === "optional") {
    const pages = unwrapEnvelope(payload.optionalPages) ?? [];
    if (!pages.some((page) => page.slug === resolved.entitySlug)) {
      notFound();
    }
  }

  if (resolved.page === "project-detail") {
    const projects = unwrapEnvelope(payload.projects)?.items ?? [];
    if (!projects.some((project) => project.slug === resolved.entitySlug)) {
      notFound();
    }
  }

  if (resolved.page === "blog-post") {
    const posts = payload.blog ? (unwrapEnvelope(payload.blog)?.items ?? []) : [];
    if (!posts.some((post) => post.slug === resolved.entitySlug)) {
      notFound();
    }
  }

  const branding: TenantBranding | undefined = brandAccent
    ? { colors: { accent: `#${brandAccent.replace(/^#/, "")}` } }
    : undefined;

  const currentPath =
    definition.slug === "corporate-construction"
      ? resolved.path === "/"
        ? "/preview/corporate-construction"
        : `/preview/corporate-construction${resolved.path}`
      : resolved.path;

  return (
    <TemplateShell
      definition={definition}
      payload={payload}
      mode="preview"
      branding={branding}
      page={resolved.page}
      entitySlug={resolved.entitySlug}
      currentPath={currentPath}
    />
  );
}
