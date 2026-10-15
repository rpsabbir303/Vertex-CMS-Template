import Link from "next/link";
import type { TemplatePageProps } from "@/registry/template-types";
import { getSortedCollectionItems, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { uniqueSectors } from "@/templates/corporate-construction/sections/corporate-home-metrics";
import { projectOverviewFacts } from "@/templates/corporate-construction/utils/project-delivery";
import { formatProjectStatusLabel, getProjectBuildStatus } from "@/templates/corporate-construction/utils/project-filters";
import { ModernProjectsBody } from "@/templates/modern-contractor/components/modern-projects-body";
import { ModernPageFrame } from "@/templates/modern-contractor/components/modern-page-frame";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { pad } from "@/templates/modern-contractor/theme/ui";

const display = "font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif]";
const heading = `${display} text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.2] font-semibold tracking-[-0.04em]`;

const PROJECTS_LEAD =
  "A collection of commercial and residential work delivered through careful planning, coordination and execution.";

export function ModernContractorProjectsPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const projects = getSortedCollectionItems(props.payload.projects);
  const sectors = uniqueSectors(projects);
  const featured = projects.find((project) => project.slug === "lakeshore-outpatient-pavilion") ?? projects.find((project) => project.featured);
  const heroImage = projects.find((project) => project.image?.url)?.image;
  const homeHref = previewHref(props.mode, "/");
  const contactHref = previewHref(props.mode, "/contact");
  const servicesHref = previewHref(props.mode, "/services");
  const featuredFacts = featured
    ? [
        ...projectOverviewFacts(featured),
        ...(formatProjectStatusLabel(getProjectBuildStatus(featured))
          ? [{ label: "Status", value: formatProjectStatusLabel(getProjectBuildStatus(featured))! }]
          : []),
      ]
    : [];

  return (
    <ModernPageFrame {...props}>
      <section className="relative min-h-[640px] overflow-hidden bg-[#0a0c0b] text-white min-[960px]:min-h-[684px]">
        {heroImage?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#0a0c0b_8%,rgba(10,12,11,0.82)_42%,rgba(10,12,11,0.38)_100%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="relative mx-auto flex min-h-[640px] max-w-[1360px] flex-col px-5 pt-32 pb-14 min-[960px]:min-h-[684px] min-[960px]:px-8 min-[960px]:pt-36">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 text-[12px] tracking-[0.16em] text-white/70 uppercase">
            <Link href={homeHref} className="hover:text-white">
              Home
            </Link>
            <span aria-hidden>›</span>
            <span className="text-white">Projects</span>
          </nav>
          <div className="mt-auto grid items-end gap-10 pt-16 min-[960px]:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
                <span className="h-px w-8 bg-[#C8FF2E]" />
                Selected work
              </p>
              <h1 className={`${display} mt-5 text-[clamp(2.6rem,4.4vw,4.2rem)] leading-[1.2] font-semibold tracking-[-0.04em] text-balance`}>
                Projects built to perform.
              </h1>
              <p className="mt-6 max-w-[40rem] text-[17px] leading-relaxed text-white/78">{PROJECTS_LEAD}</p>
            </div>
            {projects.length ? (
              <aside className="border-l border-white/25 py-2 pl-6">
                <p className="text-[11px] tracking-[0.14em] text-[#9ba49c] uppercase">Projects on record</p>
                <p className={`${display} mt-2 text-[2.4rem] leading-none font-semibold`}>{pad(projects.length)}</p>
                {sectors.length ? (
                  <p className="mt-3 text-[13px] tracking-[0.08em] text-white/80 uppercase">{sectors.join(" · ")}</p>
                ) : null}
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      {projects.length ? <ModernProjectsBody projects={projects} mode={props.mode} /> : (
        <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8">
          <p className="mx-auto max-w-[1360px] text-[#3e4438]">No projects have been published yet.</p>
        </section>
      )}

      {featured ? (
        <section id="featured-project" className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="featured-project-heading">
          <div className="mx-auto max-w-[1360px]">
            <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
              <span className="h-px w-8 bg-[#0a0c0b]" />
              Featured project
            </p>
            <h2 id="featured-project-heading" className={`${heading} mt-5 max-w-3xl`}>
              {featured.title}
            </h2>
            {featured.summary ? <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#3e4438]">{featured.summary}</p> : null}
            <div className="mt-10 grid items-start gap-10 min-[960px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              {featured.image?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.image.url}
                  alt={featured.image.alt || ""}
                  className="aspect-[4/3] w-full rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] object-cover"
                />
              ) : null}
              <div>
                {featuredFacts.length ? (
                  <dl className="grid gap-4 border-t border-black/15 pt-6">
                    {featuredFacts.map((fact) => (
                      <div key={fact.label} className="grid grid-cols-[9rem_minmax(0,1fr)] gap-3 text-sm">
                        <dt className="tracking-[0.08em] text-[#667067] uppercase">{fact.label}</dt>
                        <dd className="font-medium">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                {featured.outcome?.summary ? (
                  <p className="mt-6 text-[17px] leading-relaxed text-[#3e4438]">{featured.outcome.summary}</p>
                ) : null}
                <Link
                  href={previewHref(props.mode, `/projects/${featured.slug}`)}
                  className="mt-8 inline-flex rounded-full bg-[#0a0c0b] px-5 py-3 text-sm font-semibold text-white"
                >
                  View project details
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24">
        <div className="mx-auto max-w-[1360px] rounded-tl-[34px] rounded-tr-[34px] rounded-br-[34px] rounded-bl-[110px] border border-white/15 bg-[linear-gradient(135deg,#111512,#050706)] px-8 py-14 min-[960px]:px-20 min-[960px]:py-[70px]">
          <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
            <span className="h-px w-8 bg-[#C8FF2E]" />
            Start a project
          </p>
          <h2 className={`${display} mt-5 max-w-3xl text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1.2] font-semibold tracking-[-0.04em]`}>
            Add yours to the record.
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
            {company?.name ? `Tell ${company.name} about the building you need to deliver.` : "Tell us about the building you need to deliver."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={contactHref} className="inline-flex rounded-full bg-[#C8FF2E] px-6 py-3.5 text-sm font-semibold text-[#0a0c0b]">
              Start a conversation
            </Link>
            <Link href={servicesHref} className="inline-flex rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white">
              Capabilities
            </Link>
          </div>
        </div>
      </section>
    </ModernPageFrame>
  );
}
