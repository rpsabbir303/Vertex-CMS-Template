import type { Company } from "@/templates/shared/cms/types/company";
import type { CmsImage } from "@/templates/shared/cms/types/media";
import type { Project } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";

type FieldMeta = {
  project?: string;
  location?: string;
  sector?: string;
  scope?: string;
};

type CorporateCraftsmanshipProps = {
  company?: Company | null;
  projects?: Project[];
};

const FIELD_PRINCIPLES = [
  {
    id: "supervision",
    label: "Site supervision",
    copy: "Continuous oversight from mobilization to completion.",
  },
  {
    id: "quality",
    label: "Quality control",
    copy: "Every phase reviewed against project standards.",
  },
  {
    id: "coordination",
    label: "Coordination",
    copy: "Trades, materials, and schedules kept aligned.",
  },
  {
    id: "safety",
    label: "Safety",
    copy: "Disciplined execution from start to finish.",
  },
] as const;

function truncateCopy(text: string, max = 140): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  const cut = trimmed.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 70 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

function projectMeta(project: Project): FieldMeta | undefined {
  const meta: FieldMeta = {};
  if (project.title) meta.project = project.title;
  if (project.location) meta.location = project.location;
  if (project.metadata?.sector) meta.sector = project.metadata.sector;
  if (project.metadata?.scope) meta.scope = project.metadata.scope;
  return Object.keys(meta).length ? meta : undefined;
}

function resolveSiteVisual(
  projects: Project[],
  company?: Company | null,
): { image: CmsImage; meta?: FieldMeta } | null {
  const featured = projects.find((p) => p.featured && p.image?.url);
  if (featured?.image) return { image: featured.image, meta: projectMeta(featured) };
  const any = projects.find((p) => p.image?.url);
  if (any?.image) return { image: any.image, meta: projectMeta(any) };
  if (company?.heroImage?.url) return { image: company.heroImage };
  return null;
}

function supportingCopy(company?: Company | null): string {
  const lead = company?.description
    ?.split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)[0];
  if (lead) return truncateCopy(lead, 140);
  return "Experienced teams, disciplined coordination, and continuous oversight keep every phase moving with precision.";
}

export function CorporateCraftsmanship({
  company = null,
  projects = [],
}: CorporateCraftsmanshipProps) {
  const visual = resolveSiteVisual(projects, company);
  const body = supportingCopy(company);

  if (!visual?.image && !company?.description) {
    return null;
  }

  const labels: { label: string; value: string }[] = [];
  if (visual?.meta?.sector) {
    labels.push({ label: "Project", value: visual.meta.sector });
  } else if (visual?.meta?.project) {
    labels.push({ label: "Project", value: visual.meta.project });
  }
  labels.push({ label: "Phase", value: "Field execution" });
  if (visual?.meta?.location) {
    labels.push({ label: "Location", value: visual.meta.location });
  }

  return (
    <section
      className="relative overflow-hidden bg-[#070f18] text-white"
      aria-labelledby="corporate-craft-heading"
    >
      <div className="vertex-container relative pt-16 md:pt-20 lg:pt-24">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between md:gap-16 md:pb-12">
          <div className="min-w-0 max-w-3xl">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-[var(--color-accent)]" />
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                Field execution
              </p>
            </div>
            <h2
              id="corporate-craft-heading"
              className="mt-6 max-w-[11ch] text-balance break-words font-[family-name:var(--font-display)] text-[2.85rem] font-semibold leading-[0.95] tracking-[-0.03em] md:text-5xl lg:text-[4.5rem]"
            >
              The work is in the details.
            </h2>
          </div>
          <p className="max-w-sm text-pretty break-words text-sm leading-relaxed text-white/50 md:pb-1 md:text-base lg:max-w-xs">
            {body}
          </p>
        </div>
      </div>

      <div className="relative mt-8 md:mt-10">
        {visual?.image ? (
          <figure className="group relative m-0">
            <div className="relative min-h-[24rem] overflow-hidden md:min-h-[34rem] lg:min-h-[min(80vh,48rem)]">
              <CmsImageMedia
                image={visual.image}
                aspect="auto"
                className="absolute inset-0 h-full min-h-[24rem] w-full md:min-h-[34rem] lg:min-h-[min(80vh,48rem)] [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:transition-transform [&_img]:duration-[1.6s] group-hover:[&_img]:scale-[1.03] motion-reduce:[&_img]:transition-none motion-reduce:group-hover:[&_img]:scale-100"
                sizes="100vw"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#070f18] via-[#070f18]/20 to-transparent"
              />
              <span
                aria-hidden
                className="absolute left-5 top-5 h-7 w-7 border-l border-t border-white/35 md:left-10 md:top-10"
              />
              <span
                aria-hidden
                className="absolute bottom-5 right-5 h-7 w-7 border-b border-r border-white/35 md:bottom-10 md:right-10"
              />

              {/* Subtle architectural labels — not a dashboard panel */}
              <figcaption className="absolute bottom-6 left-5 z-[1] flex flex-wrap gap-x-8 gap-y-3 md:bottom-10 md:left-10">
                {labels.map((row) => (
                  <div key={row.label} className="min-w-0">
                    <p className="text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                      {row.label}
                    </p>
                    <p className="mt-1 max-w-[14rem] text-pretty break-words text-sm font-medium text-white">
                      {row.value}
                    </p>
                  </div>
                ))}
              </figcaption>
            </div>
          </figure>
        ) : (
          <div
            className="flex min-h-[14rem] items-end border-y border-white/10 bg-white/[0.03] px-6 py-8"
            aria-hidden
          >
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/30">
              Field imagery unavailable
            </p>
          </div>
        )}
      </div>

      <div className="vertex-container relative py-14 md:py-16 lg:py-20">
        <ul className="grid gap-0 border-t border-white/12 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/12">
          {FIELD_PRINCIPLES.map((item, index) => (
            <li
              key={item.id}
              className="min-w-0 border-b border-white/10 py-7 sm:border-b-0 sm:odd:border-r sm:odd:border-white/10 sm:odd:pr-6 sm:even:pl-6 lg:border-0 lg:px-8 lg:py-3 lg:first:pl-0 lg:last:pr-0"
            >
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white/30">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white">
                {item.label}
              </p>
              <span aria-hidden className="mt-3 block h-px w-8 bg-[var(--color-accent)]" />
              <p className="mt-3 max-w-[15rem] text-pretty text-sm leading-relaxed text-white/45">
                {item.copy}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
