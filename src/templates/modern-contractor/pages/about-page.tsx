import Link from "next/link";
import type { TemplatePageProps } from "@/registry/template-types";
import {
  getSortedCollectionItems,
  getVisibleServices,
  unwrapCollectionItems,
  unwrapEnvelope,
} from "@/templates/shared/cms/resolve-content";
import { uniqueSectors } from "@/templates/corporate-construction/sections/corporate-home-metrics";
import {
  resolveAboutLeaders,
  resolveHistoryMilestones,
  splitAboutParagraphs,
} from "@/templates/corporate-construction/utils/about-content";
import { pageSeoDescription, splitParagraphs } from "@/templates/corporate-construction/utils/page-seo";
import { ModernPageFrame } from "@/templates/modern-contractor/components/modern-page-frame";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { pad } from "@/templates/modern-contractor/theme/ui";

const display = "font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif]";
const heading = `${display} mt-5 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.12] font-semibold tracking-[-0.04em]`;

export function ModernContractorAboutPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const projects = getSortedCollectionItems(props.payload.projects);
  const services = getVisibleServices(props.payload.services);
  const certifications = unwrapCollectionItems(props.payload.certifications);
  const team = getSortedCollectionItems(props.payload.team);

  if (!company) {
    return (
      <ModernPageFrame {...props}>
        <section className="vertex-container pt-40 pb-24">
          <p className="text-[var(--color-text-muted)]">Company information is unavailable.</p>
        </section>
      </ModernPageFrame>
    );
  }

  const paragraphs = splitParagraphs(company.description);
  const supporting = [...paragraphs.slice(1), ...(company.aboutSupporting ?? [])].filter(Boolean);
  const milestones = resolveHistoryMilestones(company);
  const howWeWork = company.aboutHowWeWork;
  const workParagraphs = splitAboutParagraphs(howWeWork?.intro);
  const standards = howWeWork?.principles?.filter((item) => item.title?.trim()) ?? [];
  const leaders = resolveAboutLeaders(company.aboutLeadership, team);
  const stages = company.aboutOfficeToField?.stages?.filter((item) => item.label?.trim()) ?? [];
  const beliefs = company.aboutBeliefs?.principles?.filter((item) => item.title?.trim()) ?? [];
  const sectors = uniqueSectors(projects);
  const years = company.foundedYear ? new Date().getFullYear() - company.foundedYear : undefined;
  const facts = [
    years ? { value: String(years), label: "Years in operation", note: `Established ${company.foundedYear}` } : undefined,
    projects.length ? { value: String(projects.length), label: "Projects published" } : undefined,
    services.length ? { value: String(services.length), label: "Capabilities on record" } : undefined,
    certifications.length ? { value: String(certifications.length), label: "Credentials on file" } : undefined,
  ].filter((item): item is { value: string; label: string; note?: string } => Boolean(item));
  const office = [company.address?.city, company.address?.region].filter(Boolean).join(", ");
  const pageLead = pageSeoDescription(props.payload, "about") || paragraphs[0];
  const executionImage = projects.find((project) => project.image?.url)?.image;
  const homeHref = previewHref(props.mode, "/");
  const contactHref = previewHref(props.mode, "/contact");
  const projectsHref = previewHref(props.mode, "/projects");

  return (
    <ModernPageFrame {...props}>
      <section className="relative min-h-[640px] overflow-hidden bg-[#0a0c0b] text-white min-[960px]:min-h-[684px]">
        {company.heroImage?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={company.heroImage.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
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
            <span className="text-white">About</span>
          </nav>
          <div className="mt-auto grid items-end gap-10 pt-16 min-[960px]:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
                <span className="h-px w-8 bg-[#C8FF2E]" />
                About
              </p>
              <h1 className={`${display} mt-5 text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[1.12] font-semibold tracking-[-0.045em] text-balance`}>
                {company.tagline?.trim() || company.name}
              </h1>
              {pageLead ? <p className="mt-6 max-w-[40rem] text-[17px] leading-relaxed text-white/78">{pageLead}</p> : null}
            </div>
            {years ? (
              <aside className="border-l border-white/25 py-2 pl-6">
                <p className="text-[11px] tracking-[0.14em] text-[#9ba49c] uppercase">Years in operation</p>
                <p className={`${display} mt-2 text-[2.4rem] leading-none font-semibold`}>{years}</p>
                <p className="mt-3 text-[13px] tracking-[0.08em] text-white/80 uppercase">
                  {[company.foundedYear ? `Est. ${company.foundedYear}` : undefined, office].filter(Boolean).join(" · ")}
                </p>
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      {paragraphs[0] || supporting.length ? (
        <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="about-story-heading">
          <div className="mx-auto grid max-w-[1360px] gap-10 min-[960px]:grid-cols-2 min-[960px]:gap-16">
            <div className="min-w-0">
              <Eyebrow>Our story</Eyebrow>
              <h2 id="about-story-heading" className={heading}>
                {company.headline?.trim() || company.name}
              </h2>
            </div>
            <div className="space-y-5 text-[17px] leading-relaxed text-[#3e4438]">
              {paragraphs[0] ? <p>{paragraphs[0]}</p> : null}
              {supporting.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {milestones.length ? (
        <section className="bg-[#f3f1e9] px-5 pb-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:pb-24" aria-labelledby="about-history-heading">
          <div className="mx-auto grid max-w-[1360px] items-center gap-12 border-t border-black/15 pt-14 min-[960px]:grid-cols-2 min-[960px]:gap-16 min-[960px]:pt-20">
            <div className="min-w-0">
              <Eyebrow>{company.aboutHistory?.eyebrow?.trim() || "Our history"}</Eyebrow>
              <h2 id="about-history-heading" className={heading}>
                {company.aboutHistory?.headline?.trim() || "Built over decades. Still close to the work."}
              </h2>
              <ol className="mt-10 border-t border-black/15">
                {milestones.map((milestone) => (
                  <li key={`${milestone.year}-${milestone.title}`} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-black/15 py-5">
                    <span className={`${display} text-[1.35rem] leading-none font-semibold tracking-[-0.03em]`}>{milestone.year || "—"}</span>
                    <span>
                      <span className="block text-[17px] leading-snug">{milestone.title}</span>
                      {milestone.description ? <span className="mt-2 block text-[15px] leading-relaxed text-[#3e4438]">{milestone.description}</span> : null}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            {company.aboutHistory?.image?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={company.aboutHistory.image.url}
                alt={company.aboutHistory.image.alt || ""}
                className="aspect-[4/3] w-full rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] object-cover"
              />
            ) : null}
          </div>
        </section>
      ) : null}

      {howWeWork ? (
        <section className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="about-continuity-heading">
          <div className="mx-auto grid max-w-[1360px] gap-10 min-[960px]:grid-cols-2 min-[960px]:gap-16">
            <div className="min-w-0">
              <Eyebrow light>{howWeWork.eyebrow?.trim() || "How we work"}</Eyebrow>
              <h2 id="about-continuity-heading" className={`${heading} text-white`}>
                {howWeWork.headline?.trim() || "The same team stays close from first conversation to closeout."}
              </h2>
            </div>
            {workParagraphs.length ? (
              <div className="space-y-5 text-[17px] leading-relaxed text-white/75">
                {workParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {leaders.length ? (
        <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="about-leadership-heading">
          <div className="mx-auto max-w-[1360px]">
            <div className="grid gap-10 min-[960px]:grid-cols-2 min-[960px]:gap-16">
              <div className="min-w-0">
                <Eyebrow>{company.aboutLeadership?.eyebrow?.trim() || "Leadership"}</Eyebrow>
                <h2 id="about-leadership-heading" className={heading}>
                  {company.aboutLeadership?.headline?.trim() || "Leadership that stays close to the work."}
                </h2>
              </div>
              {company.aboutLeadership?.intro ? (
                <p className="text-[17px] leading-relaxed text-[#3e4438]">{company.aboutLeadership.intro}</p>
              ) : null}
            </div>
            <ul className="mt-12 grid gap-[18px] min-[960px]:grid-cols-3">
              {leaders.map((leader) => (
                <li key={`${leader.role}-${leader.name}`} className="overflow-hidden rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] border border-black/15 bg-white/40">
                  {leader.image?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={leader.image.url} alt={leader.image.alt || ""} className="aspect-[4/5] w-full object-cover" />
                  ) : null}
                  <div className="p-6">
                    <p className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067] uppercase">{leader.role}</p>
                    {leader.name ? <h3 className={`${display} mt-3 text-[1.6rem] leading-tight font-semibold tracking-[-0.03em]`}>{leader.name}</h3> : null}
                    {leader.note ? <p className="mt-3 text-[15px] leading-relaxed text-[#3e4438]">{leader.note}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {company.aboutOfficeToField ? (
        <section className="bg-[#f3f1e9] px-5 pb-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:pb-24" aria-labelledby="about-places-heading">
          <div className="mx-auto max-w-[1360px] border-t border-black/15 pt-14 min-[960px]:pt-20">
            <div className="grid items-center gap-10 min-[960px]:grid-cols-2 min-[960px]:gap-16">
              <div className="min-w-0">
                <Eyebrow>{company.aboutOfficeToField.eyebrow?.trim() || "From office to field"}</Eyebrow>
                <h2 id="about-places-heading" className={heading}>
                  {company.aboutOfficeToField.headline?.trim() || "One team. Different places. Same responsibility."}
                </h2>
                {company.aboutOfficeToField.statement ? (
                  <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[#3e4438]">{company.aboutOfficeToField.statement}</p>
                ) : null}
              </div>
              {company.aboutOfficeToField.image?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={company.aboutOfficeToField.image.url}
                  alt={company.aboutOfficeToField.image.alt || ""}
                  className="aspect-[4/3] w-full rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] object-cover"
                />
              ) : null}
            </div>
            {stages.length ? (
              <ol className="mt-12 border-t border-black/15">
                {stages.map((stage, index) => (
                  <li key={stage.label} className="grid gap-3 border-b border-black/15 py-6 min-[960px]:grid-cols-[5rem_minmax(0,0.8fr)_minmax(0,1.2fr)] min-[960px]:items-baseline min-[960px]:gap-8">
                    <span className="text-[12px] font-extrabold tracking-[0.16em] text-[#667067]">{pad(index + 1)}</span>
                    <h3 className={`${display} text-[1.45rem] leading-tight font-semibold tracking-[-0.03em]`}>{stage.label}</h3>
                    <p className="text-[16px] leading-relaxed text-[#3e4438]">{stage.body}</p>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        </section>
      ) : null}

      {beliefs.length ? (
        <section className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="about-values-heading">
          <div className="mx-auto max-w-[1360px]">
            <Eyebrow light>{company.aboutBeliefs?.eyebrow?.trim() || "What we believe"}</Eyebrow>
            <h2 id="about-values-heading" className={`${heading} max-w-3xl`}>
              {company.aboutBeliefs?.headline?.trim() || "A few things don't change."}
            </h2>
            <ul className="mt-12 grid gap-px bg-white/15 sm:grid-cols-2 min-[1180px]:grid-cols-5">
              {beliefs.map((item, index) => (
                <li key={item.title} className="flex min-h-[280px] flex-col bg-[#0a0c0b] p-6">
                  <span className="text-[12px] font-extrabold tracking-[0.14em] text-[#C8FF2E]">{pad(index + 1)}</span>
                  <h3 className={`${display} mt-8 text-[1.55rem] leading-tight font-semibold tracking-[-0.03em]`}>{item.title}</h3>
                  {item.body ? <p className="mt-4 text-[15px] leading-relaxed text-white/72">{item.body.replace(/\n/g, " ")}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {facts.length ? (
        <section className="bg-[#C8FF2E] px-5 py-14 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-16" aria-label="Company statistics">
          <div className="mx-auto max-w-[1360px]">
            <p className="text-[12px] font-extrabold tracking-[0.16em] uppercase">Counted from what is published</p>
            <dl className="mt-8 grid gap-8 sm:grid-cols-2 min-[960px]:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[11px] tracking-[0.14em] uppercase">{fact.label}</dt>
                  <dd className={`${display} mt-2 text-[clamp(2.4rem,4vw,3.4rem)] leading-none font-semibold tracking-[-0.04em]`}>{fact.value}</dd>
                  {fact.note ? <p className="mt-2 text-[13px]">{fact.note}</p> : null}
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {standards.length ? (
        <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="about-standards-heading">
          <div className="mx-auto grid max-w-[1360px] items-start gap-12 min-[960px]:grid-cols-2 min-[960px]:gap-16">
            <div className="min-w-0">
              <Eyebrow>Execution standards</Eyebrow>
              <h2 id="about-standards-heading" className={heading}>
                The work is in the details.
              </h2>
              <ol className="mt-8 border-t border-black/15">
                {standards.map((item, index) => (
                  <li key={item.title} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b border-black/15 py-5">
                    <span className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067]">{pad(index + 1)}</span>
                    <span>
                      <span className={`${display} block text-[1.35rem] leading-tight font-semibold tracking-[-0.03em]`}>{item.title}</span>
                      {item.body ? <span className="mt-2 block text-[15px] leading-relaxed text-[#3e4438]">{item.body}</span> : null}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            {executionImage?.url ? (
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={executionImage.url} alt={executionImage.alt || ""} className="aspect-[4/5] w-full rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] object-cover" />
              </figure>
            ) : null}
          </div>
        </section>
      ) : null}

      {sectors.length || certifications.length ? (
        <section className="bg-[#f3f1e9] px-5 pb-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:pb-24" aria-labelledby="about-record-heading">
          <div className="mx-auto max-w-[1360px] border-t border-black/15 pt-14 min-[960px]:pt-20">
            <Eyebrow>On file</Eyebrow>
            <h2 id="about-record-heading" className={`${heading} max-w-3xl`}>
              Where we work, and what backs it.
            </h2>
            {office ? <p className="mt-4 text-[15px] text-[#667067]">Based in {office}.</p> : null}
            <div className="mt-10 grid gap-12 min-[960px]:grid-cols-2">
              {sectors.length ? (
                <div>
                  <p className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067] uppercase">Sectors served</p>
                  <ul className="mt-4 divide-y divide-black/15 border-y border-black/15">
                    {sectors.map((sector) => (
                      <li key={sector} className={`${display} py-4 text-[1.45rem] leading-tight font-semibold tracking-[-0.03em]`}>
                        {sector}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[14px] text-[#667067]">Taken from the projects published on this site.</p>
                </div>
              ) : null}
              {certifications.length ? (
                <div>
                  <p className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067] uppercase">Credentials</p>
                  <ul className="mt-4 divide-y divide-black/15 border-y border-black/15">
                    {certifications.map((record) => (
                      <li key={record.id} className="py-4">
                        <p className={`${display} text-[1.45rem] leading-tight font-semibold tracking-[-0.03em]`}>{record.name}</p>
                        <p className="mt-2 text-[13px] tracking-[0.08em] text-[#667067] uppercase">
                          {[record.issuer, record.year].filter(Boolean).join(" · ")}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
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
          <h2 className={`${display} mt-5 max-w-3xl text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.12] font-semibold tracking-[-0.04em]`}>
            Talk to the people who will build it.
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
            Tell {company.name} about the site, the schedule, and what the building has to do. A preconstruction lead will reply.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={contactHref} className="inline-flex rounded-full bg-[#C8FF2E] px-6 py-3.5 text-sm font-semibold text-[#0a0c0b]">
              Start a conversation
            </Link>
            <Link href={projectsHref} className="inline-flex rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white">
              See the work
            </Link>
          </div>
        </div>
      </section>
    </ModernPageFrame>
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
