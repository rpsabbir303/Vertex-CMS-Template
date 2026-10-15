import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { CmsSitePayload } from "@/templates/shared/cms/types";
import type { Certification } from "@/templates/shared/cms/types/certifications";
import type { Company } from "@/templates/shared/cms/types/company";
import type { CmsImage } from "@/templates/shared/cms/types/media";
import type { Project } from "@/templates/shared/cms/types/projects";
import type { Service } from "@/templates/shared/cms/types/services";
import type { Testimonial } from "@/templates/shared/cms/types/testimonials";
import {
  getSortedCollectionItems,
  getVisibleServices,
  hasOptionalSection,
  unwrapCollectionItems,
  unwrapEnvelope,
} from "@/templates/shared/cms/resolve-content";
import { uniqueSectors } from "@/templates/corporate-construction/sections/corporate-home-metrics";
import { selectHomeSelectedWorkProjects } from "@/templates/corporate-construction/utils/home-selected-work";
import { attribution } from "@/templates/corporate-construction/utils/testimonial-attribution";
import { HeroSlides } from "@/templates/modern-contractor/components/hero-slides";
import { QuoteReel } from "@/templates/modern-contractor/components/quote-reel";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { pad } from "@/templates/modern-contractor/theme/ui";
import { demoMedia } from "@/data/demo-media";

type ModernHomeScreenProps = {
  payload: CmsSitePayload;
  mode: TemplateRenderMode;
};

const display = "font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif]";
const heading = `${display} mt-5 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.12] font-semibold tracking-[-0.04em]`;

const PHASES = [
  { title: "Discover", body: "Site, program, and budget reviewed before anything is priced." },
  { title: "Plan", body: "Logistics, sequencing, and procurement set with the trades." },
  { title: "Build", body: "Superintendent-led field work against a published schedule." },
  { title: "Control", body: "Cost, quality, and safety tracked and reported every week." },
  { title: "Deliver", body: "Commissioning, documentation, and a clean handover." },
];

function statusLabel(status?: "ongoing" | "completed") {
  if (status === "ongoing") return "Ongoing";
  if (status === "completed") return "Completed";
  return undefined;
}

export function ModernHomeScreen({ payload, mode }: ModernHomeScreenProps) {
  const company = unwrapEnvelope(payload.company);
  if (!company) {
    return (
      <section className="vertex-container py-24">
        <p className="text-[var(--color-text-muted)]">
          Company information is unavailable. This template does not display placeholder marketing content when CMS data is missing.
        </p>
      </section>
    );
  }

  const services = getVisibleServices(payload.services);
  const servicesCopy = unwrapEnvelope(payload.services)?.section;
  const projects = getSortedCollectionItems(payload.projects);
  const selected = selectHomeSelectedWorkProjects(projects);
  const featured = selected.find((project) => project.featured) ?? selected[0];
  const others = selected.filter((project) => project.id !== featured?.id);
  const certifications = unwrapCollectionItems(payload.certifications);
  const testimonials = getSortedCollectionItems(payload.testimonials).filter((item) => item.quote?.trim());
  const paragraphs = company.description?.split(/\n\n+/).map((part) => part.trim()).filter(Boolean) ?? [];
  const standards = company.aboutHowWeWork?.principles?.filter((item) => item.title?.trim()) ?? [];
  const sectors = uniqueSectors(projects);
  const places = [...new Set(projects.map((project) => project.location?.trim()).filter((place): place is string => Boolean(place)))];
  const years = company.foundedYear ? new Date().getFullYear() - company.foundedYear : undefined;
  const stats = [
    years ? { value: String(years), label: "Years in operation", note: `Established ${company.foundedYear}` } : undefined,
    projects.length ? { value: String(projects.length), label: "Projects published" } : undefined,
    services.length ? { value: String(services.length), label: "Capabilities on record" } : undefined,
    certifications.length ? { value: String(certifications.length), label: "Credentials on file" } : undefined,
  ].filter((item): item is { value: string; label: string; note?: string } => Boolean(item));
  const sitePhotos = selected.slice(0, 3);
  const siteNarrative = paragraphs[1] || company.aboutSupporting?.[0];
  const contactHref = previewHref(mode, "/contact");
  const projectsHref = previewHref(mode, "/projects");
  const aboutHref = previewHref(mode, "/about");
  const slides = [company.heroImage, demoMedia.steel, demoMedia.concrete].filter((image): image is CmsImage => Boolean(image?.url));

  return (
    <div className="bg-[#f3f1e9] text-[#0a0c0b]">
      <Hero company={company} summary={paragraphs[0]} featured={featured} mode={mode} slides={slides} projectsHref={projectsHref} />

      {stats.length ? <Statistics stats={stats} /> : null}

      {siteNarrative || sitePhotos.length ? (
        <OnSite narrative={siteNarrative} projects={sitePhotos} mode={mode} />
      ) : null}

      {hasOptionalSection(payload.services) && services.length ? (
        <Capabilities title={servicesCopy?.title?.trim() || "Commercial capabilities"} lead={servicesCopy?.description?.trim()} services={services} mode={mode} />
      ) : null}

      {featured ? <FeaturedProject project={featured} others={others} mode={mode} projectsHref={projectsHref} /> : null}

      <Delivery />

      {standards.length ? <Expertise items={standards} aboutHref={aboutHref} /> : null}

      {sectors.length || places.length || certifications.length ? (
        <WhereWeWork sectors={sectors} places={places} certifications={certifications} office={[company.address?.city, company.address?.region].filter(Boolean).join(", ")} />
      ) : null}

      {hasOptionalSection(payload.testimonials) && testimonials.length ? <Feedback quotes={testimonials} /> : null}

      <BuildCta company={company} contactHref={contactHref} />
    </div>
  );
}

function Hero({
  company,
  summary,
  featured,
  mode,
  slides,
  projectsHref,
}: {
  company: Company;
  summary?: string;
  featured?: Project;
  mode: TemplateRenderMode;
  slides: CmsImage[];
  projectsHref: string;
}) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#0a0c0b] text-white">
      <HeroSlides images={slides} />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,#0a0c0b_8%,rgba(10,12,11,0.78)_42%,rgba(10,12,11,0.35)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1360px] flex-col justify-end px-5 pt-32 pb-14 min-[960px]:px-8">
        <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
          <span className="h-px w-8 bg-[#C8FF2E]" />
          {company.tagline?.trim() || "Home"}
          {company.foundedYear ? ` / Est. ${company.foundedYear}` : ""}
        </p>
        <div className="mt-6 grid items-end gap-10 min-[960px]:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <h1 className={`${display} text-[clamp(2.4rem,3.6vw,3.5rem)] leading-[1.28] font-semibold tracking-[-0.04em] text-balance`}>
              {company.headline?.trim() || company.name}
            </h1>
            {summary ? <p className="mt-6 max-w-[40rem] text-[17px] leading-relaxed text-white/78">{summary}</p> : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={projectsHref} className="rounded-full bg-[#C8FF2E] px-5 py-3 text-sm font-semibold text-[#0a0c0b]">
                Explore projects
              </Link>
              <a href="#capabilities" className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white">
                What we build
              </a>
            </div>
          </div>
          {featured ? (
            <Link href={previewHref(mode, `/projects/${featured.slug}`)} className="border-l border-white/25 py-2 pl-6">
              <p className="text-[11px] tracking-[0.14em] text-[#9ba49c] uppercase">Featured project</p>
              <p className={`${display} mt-3 text-[1.7rem] leading-[1.15] font-semibold tracking-[-0.03em]`}>{featured.title}</p>
              {featured.summary ? <p className="mt-3 text-[14px] leading-relaxed text-white/75">{featured.summary}</p> : null}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Statistics({ stats }: { stats: Array<{ value: string; label: string; note?: string }> }) {
  return (
    <section className="bg-[#C8FF2E] px-5 py-14 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-16" aria-label="Company statistics">
      <div className="mx-auto max-w-[1360px]">
        <p className="text-[12px] font-extrabold tracking-[0.16em] uppercase">Counted from what is published</p>
        <dl className="mt-8 grid gap-8 sm:grid-cols-2 min-[960px]:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-[11px] tracking-[0.14em] uppercase">{stat.label}</dt>
              <dd className={`${display} mt-2 text-[clamp(2.4rem,4vw,3.4rem)] leading-none font-semibold tracking-[-0.04em]`}>{stat.value}</dd>
              {stat.note ? <p className="mt-2 text-[13px]">{stat.note}</p> : null}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function OnSite({ narrative, projects, mode }: { narrative?: string; projects: Project[]; mode: TemplateRenderMode }) {
  return (
    <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="on-site-heading">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid gap-10 min-[960px]:grid-cols-2 min-[960px]:gap-16">
          <div className="min-w-0">
            <Eyebrow>Inside the work</Eyebrow>
            <h2 id="on-site-heading" className={heading}>
              What it looks like on site.
            </h2>
          </div>
          {narrative ? <p className="text-[17px] leading-relaxed text-[#3e4438]">{narrative}</p> : null}
        </div>
        {projects.length ? (
          <ul className="mt-12 grid gap-[18px] min-[960px]:grid-cols-3">
            {projects.map((project) => (
              <li key={project.id}>
                <Link href={previewHref(mode, `/projects/${project.slug}`)} className="block">
                  {project.image?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.image.url} alt={project.image.alt || ""} className="aspect-[4/5] w-full rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] object-cover" />
                  ) : null}
                  <span className="mt-4 block text-[12px] font-extrabold tracking-[0.12em] text-[#667067] uppercase">
                    {[project.metadata?.sector, project.location].filter(Boolean).join(" · ")}
                  </span>
                  <span className={`${display} mt-2 block text-[1.35rem] leading-tight font-semibold tracking-[-0.03em]`}>{project.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

function Capabilities({
  title,
  lead,
  services,
  mode,
}: {
  title: string;
  lead?: string;
  services: Service[];
  mode: TemplateRenderMode;
}) {
  return (
    <section id="capabilities" className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24">
      <div className="mx-auto max-w-[1360px]">
        <Eyebrow light>What we build</Eyebrow>
        <div className="mt-5 grid gap-8 min-[960px]:grid-cols-2 min-[960px]:gap-16">
          <h2 className={`${heading} mt-0`}>{title}</h2>
          {lead ? <p className="text-[17px] leading-relaxed text-white/75">{lead}</p> : null}
        </div>
        <ul className="mt-12 border-t border-white/15">
          {services.map((service, index) => (
            <li key={service.id} className="border-b border-white/15">
              <Link
                href={previewHref(mode, service.href || `/services/${service.slug}`)}
                className="grid items-baseline gap-3 py-6 min-[960px]:grid-cols-[4rem_minmax(0,0.9fr)_minmax(0,1.2fr)_auto] min-[960px]:gap-8"
              >
                <span className="text-[12px] font-extrabold tracking-[0.14em] text-[#C8FF2E]">{pad(index + 1)}</span>
                <span className={`${display} text-[1.55rem] leading-tight font-semibold tracking-[-0.03em]`}>{service.title}</span>
                {service.summary ? <span className="text-[15px] leading-relaxed text-white/70">{service.summary}</span> : <span />}
                <span aria-hidden>↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FeaturedProject({
  project,
  others,
  mode,
  projectsHref,
}: {
  project: Project;
  others: Project[];
  mode: TemplateRenderMode;
  projectsHref: string;
}) {
  const facts = [
    project.metadata?.sector ? { label: "Sector", value: project.metadata.sector } : undefined,
    project.location ? { label: "Location", value: project.location } : undefined,
    project.year ? { label: "Year", value: String(project.year) } : undefined,
    project.metadata?.duration ? { label: "Duration", value: project.metadata.duration } : undefined,
    statusLabel(project.metadata?.status) ? { label: "Status", value: statusLabel(project.metadata?.status)! } : undefined,
    project.metadata?.scope ? { label: "Scope", value: project.metadata.scope } : undefined,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="featured-project-heading">
      <div className="mx-auto max-w-[1360px]">
        <Eyebrow>Featured project</Eyebrow>
        <div className="mt-8 grid items-center gap-10 min-[960px]:grid-cols-2 min-[960px]:gap-16">
          {project.image?.url ? (
            <Link href={previewHref(mode, `/projects/${project.slug}`)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image.url} alt={project.image.alt || ""} className="aspect-[4/3] w-full rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] object-cover" />
            </Link>
          ) : null}
          <div className="min-w-0">
            <h2 id="featured-project-heading" className={heading}>
              {project.title}
            </h2>
            {project.summary ? <p className="mt-5 text-[17px] leading-relaxed text-[#3e4438]">{project.summary}</p> : null}
            {facts.length ? (
              <dl className="mt-8 divide-y divide-black/15 border-y border-black/15">
                {facts.map((fact) => (
                  <div key={fact.label} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 py-3">
                    <dt className="text-[12px] tracking-[0.12em] text-[#667067] uppercase">{fact.label}</dt>
                    <dd className="text-[15px] leading-snug">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <Link href={previewHref(mode, `/projects/${project.slug}`)} className="mt-6 inline-flex text-sm font-semibold underline decoration-[#0a0c0b]/30 underline-offset-4">
              View project details ↗
            </Link>
          </div>
        </div>
        {others.length ? (
          <ul className="mt-12 border-t border-black/15">
            {others.map((item, index) => (
              <li key={item.id} className="border-b border-black/15">
                <Link
                  href={previewHref(mode, `/projects/${item.slug}`)}
                  className="grid gap-2 py-5 min-[960px]:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)_auto] min-[960px]:items-baseline min-[960px]:gap-8"
                >
                  <span className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067]">{pad(index + 2)}</span>
                  <span className={`${display} text-[1.35rem] leading-tight font-semibold tracking-[-0.03em]`}>{item.title}</span>
                  <span className="text-[14px] text-[#3e4438]">{[item.metadata?.sector, item.location, item.year].filter(Boolean).join(" · ")}</span>
                  <span aria-hidden>↗</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <Link href={projectsHref} className="mt-6 inline-flex text-sm font-semibold">
          View all projects ↗
        </Link>
      </div>
    </section>
  );
}

function Delivery() {
  return (
    <section className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="delivery-heading">
      <div className="mx-auto max-w-[1360px]">
        <Eyebrow light>Delivery sequence</Eyebrow>
        <h2 id="delivery-heading" className={`${heading} max-w-3xl`}>
          One sequence, from first price to handover.
        </h2>
        <ol className="mt-12 grid gap-6 min-[960px]:grid-cols-5">
          {PHASES.map((phase, index) => (
            <li key={phase.title} className="border-t border-[#C8FF2E] pt-4">
              <p className="text-[12px] font-extrabold tracking-[0.14em] text-[#C8FF2E]">{pad(index + 1)}</p>
              <h3 className={`${display} mt-4 text-[1.35rem] leading-tight font-semibold tracking-[-0.03em]`}>{phase.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/72">{phase.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Expertise({ items, aboutHref }: { items: Array<{ title: string; body?: string }>; aboutHref: string }) {
  return (
    <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="expertise-heading">
      <div className="mx-auto max-w-[1360px]">
        <Eyebrow>Construction expertise</Eyebrow>
        <h2 id="expertise-heading" className={`${heading} max-w-3xl`}>
          The work is in the details.
        </h2>
        <ol className="mt-10 border-t border-black/15">
          {items.map((item, index) => (
            <li key={item.title} className="grid gap-3 border-b border-black/15 py-6 min-[960px]:grid-cols-[4rem_minmax(0,0.7fr)_minmax(0,1.3fr)] min-[960px]:items-baseline min-[960px]:gap-8">
              <span className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067]">{pad(index + 1)}</span>
              <h3 className={`${display} text-[1.35rem] leading-tight font-semibold tracking-[-0.03em]`}>{item.title}</h3>
              {item.body ? <p className="text-[16px] leading-relaxed text-[#3e4438]">{item.body}</p> : null}
            </li>
          ))}
        </ol>
        <Link href={aboutHref} className="mt-8 inline-flex text-sm font-semibold underline decoration-[#0a0c0b]/30 underline-offset-4">
          Read the company story ↗
        </Link>
      </div>
    </section>
  );
}

function WhereWeWork({
  sectors,
  places,
  certifications,
  office,
}: {
  sectors: string[];
  places: string[];
  certifications: Certification[];
  office?: string;
}) {
  return (
    <section className="bg-[#f3f1e9] px-5 pb-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:pb-24" aria-labelledby="where-heading">
      <div className="mx-auto max-w-[1360px] border-t border-black/15 pt-14 min-[960px]:pt-20">
        <Eyebrow>Project information</Eyebrow>
        <h2 id="where-heading" className={`${heading} max-w-3xl`}>
          Where we work, and what backs it.
        </h2>
        {office ? <p className="mt-4 text-[15px] text-[#667067]">Based in {office}.</p> : null}
        <div className="mt-10 grid gap-12 min-[960px]:grid-cols-3">
          {sectors.length ? (
            <div>
              <p className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067] uppercase">Sectors</p>
              <ul className="mt-4 divide-y divide-black/15 border-y border-black/15">
                {sectors.map((sector) => (
                  <li key={sector} className={`${display} py-3 text-[1.25rem] leading-tight font-semibold tracking-[-0.03em]`}>
                    {sector}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {places.length ? (
            <div>
              <p className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067] uppercase">Published locations</p>
              <ul className="mt-4 divide-y divide-black/15 border-y border-black/15">
                {places.map((place) => (
                  <li key={place} className="py-3 text-[16px] leading-snug">
                    {place}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {certifications.length ? (
            <div>
              <p className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067] uppercase">Credentials</p>
              <ul className="mt-4 divide-y divide-black/15 border-y border-black/15">
                {certifications.map((record) => (
                  <li key={record.id} className="py-3">
                    <p className={`${display} text-[1.15rem] leading-tight font-semibold tracking-[-0.03em]`}>{record.name}</p>
                    <p className="mt-1 text-[12px] tracking-[0.08em] text-[#667067] uppercase">{[record.issuer, record.year].filter(Boolean).join(" · ")}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Feedback({ quotes }: { quotes: Testimonial[] }) {
  return (
    <section className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="feedback-heading">
      <div className="mx-auto max-w-[1360px]">
        <Eyebrow light>Client feedback</Eyebrow>
        <h2 id="feedback-heading" className={`${heading} max-w-3xl`}>
          What owners say after turnover.
        </h2>
        <div className="mt-10">
          <QuoteReel quotes={quotes.map((quote) => ({ id: quote.id, quote: quote.quote.trim(), by: attribution(quote) }))} />
        </div>
      </div>
    </section>
  );
}

function BuildCta({ company, contactHref }: { company: Company; contactHref: string }) {
  return (
    <section className="bg-[#0a0c0b] px-5 pb-16 text-white min-[960px]:px-8 min-[960px]:pb-24">
      <div className="mx-auto max-w-[1360px] rounded-tl-[34px] rounded-tr-[34px] rounded-br-[34px] rounded-bl-[110px] border border-white/15 bg-[linear-gradient(135deg,#111512,#050706)] px-8 py-14 min-[960px]:px-20 min-[960px]:py-[70px]">
        <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
          <span className="h-px w-8 bg-[#C8FF2E]" />
          Start a project
        </p>
        <h2 className={`${display} mt-5 max-w-[12ch] text-[clamp(2.8rem,5vw,4.8rem)] leading-[1.05] font-semibold tracking-[-0.045em]`}>
          Let’s build.
        </h2>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
          Tell {company.name} about the site, the schedule, and what the building has to do. A preconstruction lead will reply.
        </p>
        <Link href={contactHref} className="mt-8 inline-flex rounded-full bg-[#C8FF2E] px-6 py-3.5 text-sm font-semibold text-[#0a0c0b]">
          Start a conversation
        </Link>
      </div>
    </section>
  );
}

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p className={`flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase ${light ? "text-[#C8FF2E]" : ""}`}>
      <span className={`h-px w-8 ${light ? "bg-[#C8FF2E]" : "bg-[#0a0c0b]"}`} />
      {children}
    </p>
  );
}
