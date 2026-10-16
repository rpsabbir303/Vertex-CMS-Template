import type { TemplatePageProps } from "@/registry/template-types";
import type { CmsImage } from "@/templates/shared/cms/types/media";
import type { Project } from "@/templates/shared/cms/types/projects";
import { HomeCapabilities } from "@/templates/industrial-civil/components/home-capabilities";
import { HomeFeaturedProject } from "@/templates/industrial-civil/components/home-featured-project";
import { HomeHero } from "@/templates/industrial-civil/components/home-hero";
import { HomeQuotes } from "@/templates/industrial-civil/components/home-quotes";
import { IndustrialFrame } from "@/templates/industrial-civil/components/industrial-frame";
import { Eyebrow, PillLink } from "@/templates/industrial-civil/components/pill-link";
import { formatAddressLines, readIndustrialSite, splitParagraphs } from "@/templates/industrial-civil/utils/site-content";
import { previewHref } from "@/templates/industrial-civil/utils/preview-href";

const sectionTitle = "text-[clamp(2rem,3.1vw,2.75rem)] leading-[1.2] font-bold text-[#03071E]";

const DELIVERY = [
  { title: "Discover", body: "Site, program, and budget reviewed before anything is priced." },
  { title: "Plan", body: "Logistics, sequencing, and procurement set with the trades." },
  { title: "Build", body: "Superintendent-led field work against a published schedule." },
  { title: "Control", body: "Cost, quality, and safety tracked and reported every week." },
  { title: "Deliver", body: "Commissioning, documentation, and a clean handover." },
];

const EXPERTISE = [
  { title: "Supervision", body: "A superintendent on site every working day, accountable for the plan." },
  { title: "Quality", body: "Work is checked against the drawings before the next trade starts." },
  { title: "Coordination", body: "Trades, deliveries, and access sequenced in a weekly look-ahead." },
  { title: "Safety", body: "Temporary protection and site controls reviewed before each phase." },
];

function pickImage(...images: (CmsImage | undefined)[]) {
  return images.find((image) => image?.url);
}

function selectPublishedWork(projects: Project[]) {
  const picked: Project[] = [];
  const seen = new Set<string>();
  const add = (project: Project) => {
    if (picked.length >= 4 || seen.has(project.id) || !project.image?.url) return;
    picked.push(project);
    seen.add(project.id);
  };
  for (const project of projects) if (project.featured) add(project);
  for (const project of projects) add(project);
  return picked;
}

function projectFacts(project: Project) {
  const meta = project.metadata;
  return [
    meta?.sector ? { label: "Sector", value: meta.sector } : null,
    project.location ? { label: "Location", value: project.location } : null,
    project.year ? { label: "Year", value: String(project.year) } : null,
    meta?.scope ? { label: "Scope", value: meta.scope } : null,
    meta?.duration ? { label: "Duration", value: meta.duration } : null,
    meta?.deliveryMethod ? { label: "Delivery", value: meta.deliveryMethod } : null,
  ].filter((fact): fact is { label: string; value: string } => fact != null);
}

export function IndustrialCivilHomePage(props: TemplatePageProps) {
  const site = readIndustrialSite(props.payload);
  const company = site.company;
  const contact = site.contact;
  const href = (path: string) => previewHref(props.mode, path);
  const description = splitParagraphs(company?.description);
  const year = new Date().getFullYear();
  const years = company?.foundedYear ? year - company.foundedYear : undefined;
  const sectors = [...new Set(site.projects.map((project) => project.metadata?.sector).filter((sector): sector is string => Boolean(sector)))];
  const selected = selectPublishedWork(site.projects);
  const leadId = selected[0]?.id;
  const sitePhotos = site.projects.filter((project) => project.image?.url && project.id !== leadId).slice(0, 3);
  const photos = (sitePhotos.length >= 2 ? sitePhotos : site.projects.filter((project) => project.image?.url)).slice(0, 3);
  const fieldImage = pickImage(
    site.projects.flatMap((project) => project.gallery?.images ?? []).find((image) => image.url),
    photos[1]?.image,
    company?.heroImage,
  );
  const ctaImage = pickImage(site.projects[3]?.image, company?.heroImage);
  const phone = contact?.phone || company?.phone;
  const email = contact?.email || company?.email;
  const address = formatAddressLines(contact?.address ?? company?.address).slice(0, 3).join(", ");
  const projectImages = site.projects.map((project) => project.image).filter((image): image is CmsImage => Boolean(image?.url));

  const facts = [
    years ? { value: String(years), label: "Years in operation", note: company?.foundedYear ? `Established ${company.foundedYear}` : undefined } : null,
    site.projects.length ? { value: String(site.projects.length), label: "Projects published" } : null,
    site.services.length ? { value: String(site.services.length), label: "Capabilities on record" } : null,
    site.certifications.length
      ? { value: String(site.certifications.length), label: "Credentials on file", note: site.certifications.map((item) => item.name).join(" · ") }
      : null,
  ].filter((fact): fact is { value: string; label: string; note?: string } => fact != null);

  return (
    <IndustrialFrame {...props} overlayHeader>
      <HomeHero
        kicker={company?.tagline}
        title={company?.headline || company?.name || "Industrial / Civil"}
        body={description[0]}
        image={company?.heroImage}
        stats={[]}
        primaryHref={href("/contact")}
        secondaryHref={href("/projects")}
      />

      {facts.length >= 2 ? (
        <section className="bg-[#F6F8FA] py-[100px]" aria-labelledby="stats-heading">
          <div className="mx-auto grid max-w-[1320px] items-end gap-10 px-3 min-[960px]:grid-cols-[0.7fr_1.3fr]">
            <div>
              <Eyebrow>The record</Eyebrow>
              <h2 id="stats-heading" className={`mt-4 ${sectionTitle}`}>
                Counted from what is published, not rounded for effect.
              </h2>
            </div>
            <dl className="grid gap-4 min-[720px]:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="rounded-[8px] bg-white p-6">
                  <dt className="text-sm font-semibold text-[#5c6570]">{fact.label}</dt>
                  <dd className="mt-4 text-[clamp(3rem,5vw,4.5rem)] leading-none font-bold text-[#FF6610]">{fact.value}</dd>
                  {fact.note ? <p className="mt-3 text-sm leading-6 text-[#5c6570]">{fact.note}</p> : null}
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {description[1] || photos.length ? (
        <section className="bg-white py-[100px]" aria-labelledby="site-heading">
          <div className="mx-auto grid max-w-[1320px] gap-12 px-3 min-[960px]:grid-cols-[0.7fr_1.3fr]">
            <div className="min-[960px]:sticky min-[960px]:top-32 min-[960px]:self-start">
              <Eyebrow>Inside the work</Eyebrow>
              <h2 id="site-heading" className={`mt-4 ${sectionTitle}`}>
                What it looks like on site.
              </h2>
              {description[1] ? <p className="mt-6 text-base leading-[26px] text-[#5c6570]">{description[1]}</p> : null}
            </div>
            {photos.length ? (
              <div className="grid grid-cols-12 gap-4">
                {photos[0]?.image?.url ? (
                  <figure className="col-span-12">
                    <img src={photos[0].image.url} alt={photos[0].image.alt} className="h-[280px] w-full rounded-[8px] object-cover min-[960px]:h-[420px]" />
                    <SiteCaption project={photos[0]} />
                  </figure>
                ) : null}
                {photos[1]?.image?.url ? (
                  <figure className="col-span-7">
                    <img src={photos[1].image.url} alt={photos[1].image.alt} className="h-[200px] w-full rounded-[8px] object-cover min-[960px]:h-[280px]" />
                    <SiteCaption project={photos[1]} />
                  </figure>
                ) : null}
                {photos[2]?.image?.url ? (
                  <figure className="col-span-5 mt-8">
                    <img src={photos[2].image.url} alt={photos[2].image.alt} className="h-[180px] w-full rounded-[8px] object-cover min-[960px]:h-[240px]" />
                    <SiteCaption project={photos[2]} />
                  </figure>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {site.services.length ? (
        <HomeCapabilities
          eyebrow={site.servicesSection?.eyebrow ?? "Services"}
          title={site.servicesSection?.title ?? "Commercial capabilities"}
          description={site.servicesSection?.description}
          allHref={href("/services")}
          services={site.services.map((service) => ({
            id: service.id,
            title: service.title,
            summary: service.summary,
            href: href(`/services#${service.slug}`),
            imageUrl: service.image?.url,
            imageAlt: service.image?.alt,
          }))}
        />
      ) : null}

      {selected.length ? (
        <section className="bg-white py-[100px]" aria-labelledby="featured-heading">
          <div className="mx-auto max-w-[1320px] px-3">
            <Eyebrow>Selected work</Eyebrow>
            <h2 id="featured-heading" className={`mt-4 max-w-[18ch] ${sectionTitle}`}>
              The work, in scale and detail.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-[26px] text-[#5c6570]">
              Published builds — scale, sequence, and finish — from occupied commercial sites to coordinated institutional work.
            </p>
            <div className="mt-12">
              <HomeFeaturedProject
                projects={selected.map((project) => ({
                  id: project.id,
                  title: project.title,
                  summary: project.summary,
                  href: href(`/projects/${project.slug}`),
                  imageUrl: project.image?.url,
                  imageAlt: project.image?.alt,
                  facts: projectFacts(project),
                }))}
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#F6F8FA] py-[100px]" aria-labelledby="process-heading">
        <div className="mx-auto max-w-[1320px] px-3">
          <div className="grid items-end gap-6 min-[960px]:grid-cols-[1.4fr_0.6fr]">
            <div>
              <Eyebrow>How we deliver</Eyebrow>
              <h2 id="process-heading" className={`mt-4 max-w-[16ch] ${sectionTitle}`}>
                One sequence, from first price to handover.
              </h2>
            </div>
            <p className="text-base leading-[26px] text-[#5c6570]">
              The same team stays on the project from preconstruction through closeout, so nothing is lost between phases.
            </p>
          </div>
          <ol className="mt-12 grid gap-4 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-5">
            {DELIVERY.map((phase, index) => (
              <li key={phase.title} className="flex min-h-[220px] flex-col justify-between rounded-[8px] bg-white p-6">
                <span className="text-[44px] leading-none font-bold text-[#FF6610]/30">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[20px] font-bold text-[#03071E]">{phase.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5c6570]">{phase.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-[100px]" aria-labelledby="expertise-heading">
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-3 min-[960px]:grid-cols-2">
          <div>
            <Eyebrow>Field execution</Eyebrow>
            <h2 id="expertise-heading" className={`mt-4 ${sectionTitle}`}>
              The work is in the details.
            </h2>
            <ol className="mt-10 divide-y divide-[#e6e8ec]">
              {EXPERTISE.map((item, index) => (
                <li key={item.title} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 py-5">
                  <span className="text-base font-bold text-[#FF6610]">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-[20px] font-bold text-[#03071E]">{item.title}</span>
                    <span className="mt-1.5 block text-base leading-[26px] text-[#5c6570]">{item.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          {fieldImage?.url ? (
            <figure>
              <img src={fieldImage.url} alt={fieldImage.alt} className="h-[420px] w-full rounded-[8px] object-cover min-[960px]:h-[620px]" />
              {fieldImage.caption ? <figcaption className="mt-3 text-sm text-[#5c6570]">{fieldImage.caption}</figcaption> : null}
            </figure>
          ) : null}
        </div>
      </section>

      {sectors.length || site.certifications.length ? (
        <section className="bg-[#F6F6F6] py-[100px]" aria-labelledby="where-heading">
          <div className="mx-auto grid max-w-[1320px] gap-12 px-3 min-[960px]:grid-cols-[0.7fr_1.3fr]">
            <div>
              <Eyebrow>On file</Eyebrow>
              <h2 id="where-heading" className={`mt-4 ${sectionTitle}`}>
                Where we work, and what backs it.
              </h2>
            </div>
            <div className="grid gap-10 min-[720px]:grid-cols-2">
              {sectors.length ? (
                <div>
                  <p className="text-sm font-semibold tracking-[0.08em] text-[#5c6570] uppercase">Sectors served</p>
                  <ul className="mt-4 divide-y divide-[#e6e8ec]">
                    {sectors.map((sector) => (
                      <li key={sector} className="py-3 text-[24px] font-bold text-[#03071E]">
                        {sector}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-[#5c6570]">Taken from the projects published on this site.</p>
                </div>
              ) : null}
              {site.certifications.length ? (
                <div>
                  <p className="text-sm font-semibold tracking-[0.08em] text-[#5c6570] uppercase">Credentials</p>
                  <ul className="mt-4 divide-y divide-[#e6e8ec]">
                    {site.certifications.map((item) => (
                      <li key={item.id} className="py-3">
                        <p className="text-[22px] leading-snug font-bold text-[#03071E]">{item.name}</p>
                        {item.issuer || item.year ? (
                          <p className="mt-1 text-sm text-[#5c6570]">{[item.issuer, item.year].filter(Boolean).join(" · ")}</p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {site.testimonials.length ? (
        <section className="bg-white py-[100px]" aria-labelledby="quotes-heading">
          <div className="mx-auto max-w-[1320px] px-3">
            <div className="text-center">
              <Eyebrow>Testimonials</Eyebrow>
              <h2 id="quotes-heading" className={`mt-4 ${sectionTitle}`}>
                What Our Clients Say
              </h2>
            </div>
            <div className="mt-12">
              <HomeQuotes
                quotes={site.testimonials.map((item, index) => {
                  const image = projectImages[index % Math.max(projectImages.length, 1)];
                  return {
                    id: item.id,
                    quote: item.quote,
                    name: item.personName,
                    title: item.companyName,
                    role: item.personRole,
                    imageUrl: image?.url,
                    imageAlt: image?.alt,
                  };
                })}
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative overflow-hidden bg-[#03071E]" aria-labelledby="cta-heading">
        {ctaImage?.url ? <img src={ctaImage.url} alt="" className="absolute inset-0 h-full w-full object-cover" /> : null}
        <div className="absolute inset-0 bg-[#03071E]/78" aria-hidden />
        <div className="relative mx-auto max-w-[1320px] px-3 py-24 min-[960px]:py-32">
          <Eyebrow light>Next project</Eyebrow>
          <h2 id="cta-heading" className="mt-4 text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] font-bold text-white">
            Let’s build.
          </h2>
          <div className="mt-10 grid items-end gap-10 min-[960px]:grid-cols-2">
            <div>
              <p className="max-w-md text-lg leading-relaxed text-white/75">
                Tell {company?.name} about the site, the schedule, and what the building has to do. A preconstruction lead will reply.
              </p>
              <PillLink href={href("/contact")} className="mt-8">
                Start a project
              </PillLink>
            </div>
            <dl className="grid gap-6 min-[640px]:grid-cols-3">
              {phone ? <CtaFact label="Phone" value={phone} href={`tel:${phone.replace(/[^+\d]/g, "")}`} /> : null}
              {email ? <CtaFact label="Email" value={email} href={`mailto:${email}`} /> : null}
              {address ? <CtaFact label="Office" value={address} /> : null}
            </dl>
          </div>
        </div>
      </section>
    </IndustrialFrame>
  );
}

function SiteCaption({ project }: { project: Project }) {
  const meta = [project.metadata?.sector, project.location].filter(Boolean).join(" · ");
  return (
    <figcaption className="mt-3">
      <span className="block text-sm font-bold text-[#03071E]">{project.title}</span>
      {meta ? <span className="mt-1 block text-sm text-[#5c6570]">{meta}</span> : null}
    </figcaption>
  );
}

function CtaFact({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="border-t border-white/20 pt-4">
      <dt className="text-sm text-white/55">{label}</dt>
      <dd className="mt-2 text-sm font-semibold text-white">
        {href ? (
          <a href={href} className="break-words hover:text-[#FF6610]">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
