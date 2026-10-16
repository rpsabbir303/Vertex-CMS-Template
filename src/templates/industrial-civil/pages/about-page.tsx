import type { TemplatePageProps } from "@/registry/template-types";
import type { CmsImage } from "@/templates/shared/cms/types/media";
import { Eyebrow, PillLink } from "@/templates/industrial-civil/components/pill-link";
import { RecordHeading, bodyCopy, pageContainer, sectionTitle } from "@/templates/industrial-civil/components/record-heading";
import { IndustrialFrame } from "@/templates/industrial-civil/components/industrial-frame";
import { readIndustrialSite, splitParagraphs } from "@/templates/industrial-civil/utils/site-content";
import { previewHref } from "@/templates/industrial-civil/utils/preview-href";

const EXECUTION = [
  { title: "Supervision", body: "A superintendent on site every working day, accountable for the plan." },
  { title: "Quality", body: "Work is checked against the drawings before the next trade starts." },
  { title: "Coordination", body: "Trades, deliveries, and access sequenced in a weekly look-ahead." },
  { title: "Safety", body: "Temporary protection and site controls reviewed before each phase." },
];

function pickImage(...images: (CmsImage | undefined)[]) {
  return images.find((image) => image?.url);
}

export function IndustrialCivilAboutPage(props: TemplatePageProps) {
  const site = readIndustrialSite(props.payload);
  const { company, team } = site;
  const href = (path: string) => previewHref(props.mode, path);

  if (!company) {
    return (
      <IndustrialFrame {...props}>
        <RecordHeading title="About" primaryHref={href("/contact")} secondaryHref={href("/projects")} />
      </IndustrialFrame>
    );
  }

  const leaders = company.aboutLeadership?.leaders ?? [];
  const teamById = new Map(team.map((member) => [member.id, member]));
  const description = splitParagraphs(company.description);
  const supporting = company.aboutSupporting ?? [];
  const history = company.aboutHistory;
  const how = company.aboutHowWeWork;
  const leadership = company.aboutLeadership;
  const field = company.aboutOfficeToField;
  const beliefs = company.aboutBeliefs;
  const year = new Date().getFullYear();
  const years = company.foundedYear ? year - company.foundedYear : undefined;
  const sectors = [...new Set(site.projects.map((project) => project.metadata?.sector).filter((sector): sector is string => Boolean(sector)))];
  const facts = [
    years ? { value: String(years), label: "Years in operation", note: company.foundedYear ? `Established ${company.foundedYear}` : undefined } : null,
    site.projects.length ? { value: String(site.projects.length), label: "Projects published" } : null,
    site.services.length ? { value: String(site.services.length), label: "Capabilities on record" } : null,
    site.certifications.length
      ? { value: String(site.certifications.length), label: "Credentials on file", note: site.certifications.map((item) => item.name).join(" · ") }
      : null,
  ].filter((fact): fact is { value: string; label: string; note?: string } => fact != null);
  const executionImage = pickImage(
    site.projects.flatMap((project) => project.gallery?.images ?? []).find((image) => image.url),
    site.projects.find((project) => project.image?.url)?.image,
    company.heroImage,
  );

  return (
    <IndustrialFrame {...props}>
      <RecordHeading
        eyebrow="About"
        title={company.tagline || company.name}
        lead={company.headline}
        image={company.heroImage}
        primaryHref={href("/contact")}
        secondaryHref={href("/projects")}
      />

      {description.length || supporting.length ? (
        <section className="bg-white py-[100px]" aria-labelledby="about-story-heading">
          <div className={`${pageContainer} grid items-start gap-12 min-[960px]:grid-cols-[0.75fr_1.25fr]`}>
            <div>
              <Eyebrow>Our story</Eyebrow>
              <h2 id="about-story-heading" className={sectionTitle}>
                Company introduction
              </h2>
            </div>
            <div className="space-y-5">
              {description.map((paragraph) => (
                <p key={paragraph} className={bodyCopy}>
                  {paragraph}
                </p>
              ))}
              {supporting.map((paragraph) => (
                <p key={paragraph} className={bodyCopy}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {history ? (
        <section className="bg-[#F6F8FA] py-[100px]" aria-labelledby="about-history-heading">
          <div className={pageContainer}>
            {history.eyebrow ? <Eyebrow>{history.eyebrow}</Eyebrow> : null}
            {history.headline ? (
              <h2 id="about-history-heading" className={`max-w-[18ch] ${sectionTitle}`}>
                {history.headline}
              </h2>
            ) : (
              <h2 id="about-history-heading" className="sr-only">
                Company history
              </h2>
            )}
            <div className={`mt-12 grid gap-8 ${history.image?.url ? "min-[960px]:grid-cols-[1.15fr_0.85fr]" : ""}`}>
              {history.milestones?.length ? (
                <ol className="grid gap-4 min-[720px]:grid-cols-3 min-[960px]:grid-cols-1">
                  {history.milestones.map((milestone) => (
                    <li key={`${milestone.year}-${milestone.title}`} className="rounded-[8px] bg-white p-6">
                      {milestone.year ? <p className="text-[40px] leading-none font-bold text-[#FF6610]">{milestone.year}</p> : null}
                      <p className="mt-4 text-[20px] font-bold text-[#03071E]">{milestone.title}</p>
                      {milestone.description ? <p className={`mt-2 ${bodyCopy}`}>{milestone.description}</p> : null}
                    </li>
                  ))}
                </ol>
              ) : null}
              {history.image?.url ? (
                <img src={history.image.url} alt={history.image.alt} className="h-[280px] w-full rounded-[12px] object-cover min-[960px]:h-full" />
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {how ? (
        <section className="bg-white py-[100px]" aria-labelledby="about-how-heading">
          <div className={`${pageContainer} grid items-start gap-12 min-[960px]:grid-cols-2`}>
            <div>
              {how.eyebrow ? <Eyebrow>{how.eyebrow}</Eyebrow> : null}
              {how.headline ? (
                <h2 id="about-how-heading" className={sectionTitle}>
                  {how.headline}
                </h2>
              ) : (
                <h2 id="about-how-heading" className="sr-only">
                  How we work
                </h2>
              )}
              {splitParagraphs(how.intro).map((paragraph) => (
                <p key={paragraph} className={`mt-5 ${bodyCopy}`}>
                  {paragraph}
                </p>
              ))}
            </div>
            <ol className="divide-y divide-[#e6e8ec]">
              {how.principles?.map((item, index) => (
                <li key={item.title} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 py-5">
                  <span className="text-base font-bold text-[#FF6610]">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-[20px] font-bold text-[#03071E]">{item.title}</span>
                    {item.body ? <span className={`mt-1.5 block ${bodyCopy}`}>{item.body}</span> : null}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {leadership ? (
        <section className="bg-[#F6F6F6] py-[100px]" aria-labelledby="about-leadership-heading">
          <div className={pageContainer}>
            <div className="grid items-end gap-10 min-[960px]:grid-cols-[1.1fr_0.9fr]">
              <div>
                {leadership.eyebrow ? <Eyebrow>{leadership.eyebrow}</Eyebrow> : null}
                {leadership.headline ? (
                  <h2 id="about-leadership-heading" className={`max-w-[16ch] ${sectionTitle}`}>
                    {leadership.headline}
                  </h2>
                ) : (
                  <h2 id="about-leadership-heading" className="sr-only">
                    Leadership
                  </h2>
                )}
                {leadership.intro ? <p className={`mt-5 max-w-2xl ${bodyCopy}`}>{leadership.intro}</p> : null}
              </div>
              {leadership.image?.url ? (
                <img src={leadership.image.url} alt={leadership.image.alt} className="h-[280px] w-full rounded-[12px] object-cover" />
              ) : null}
            </div>
            <ul className="mt-12 grid gap-6 min-[720px]:grid-cols-3">
              {leaders.map((leader) => {
                const member = leader.teamMemberId ? teamById.get(leader.teamMemberId) : undefined;
                const name = leader.name || member?.name;
                const photo = leader.image?.url ? leader.image : member?.image;
                return (
                  <li key={leader.role} className="overflow-hidden rounded-[8px] bg-white">
                    {photo?.url ? <img src={photo.url} alt={photo.alt} className="h-[280px] w-full object-cover" /> : null}
                    <div className="p-6">
                      <p className="text-sm font-bold text-[#FF6610]">{leader.role}</p>
                      {name ? <p className="mt-2 text-[22px] font-bold text-[#03071E]">{name}</p> : null}
                      {leader.note ? <p className={`mt-3 ${bodyCopy}`}>{leader.note}</p> : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {field ? (
        <section className="bg-white py-[100px]" aria-labelledby="about-field-heading">
          <div className={`${pageContainer} grid items-end gap-10 min-[960px]:grid-cols-[1fr_0.8fr]`}>
            <div>
              {field.eyebrow ? <Eyebrow>{field.eyebrow}</Eyebrow> : null}
              {field.headline ? (
                <h2 id="about-field-heading" className={`max-w-[18ch] ${sectionTitle}`}>
                  {field.headline}
                </h2>
              ) : (
                <h2 id="about-field-heading" className="sr-only">
                  From office to field
                </h2>
              )}
              {field.statement ? <p className={`mt-5 max-w-2xl ${bodyCopy}`}>{field.statement}</p> : null}
            </div>
            {field.image?.url ? (
              <img src={field.image.url} alt={field.image.alt} className="h-[240px] w-full rounded-[12px] object-cover" />
            ) : null}
          </div>
          <ol className={`${pageContainer} mt-12 grid gap-4 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-4`}>
            {field.stages?.map((stage, index) => (
              <li key={stage.label} className="flex min-h-[200px] flex-col justify-between rounded-[8px] bg-[#F6F8FA] p-6">
                <span className="text-[40px] leading-none font-bold text-[#FF6610]/30">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-[20px] font-bold text-[#03071E]">{stage.label}</span>
                  <span className={`mt-2 block ${bodyCopy}`}>{stage.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {beliefs ? (
        <section className="bg-[#F6F8FA] py-[100px]" aria-labelledby="about-beliefs-heading">
          <div className={pageContainer}>
            {beliefs.eyebrow ? <Eyebrow>{beliefs.eyebrow}</Eyebrow> : null}
            {beliefs.headline ? (
              <h2 id="about-beliefs-heading" className={sectionTitle}>
                {beliefs.headline}
              </h2>
            ) : (
              <h2 id="about-beliefs-heading" className="sr-only">
                Company values
              </h2>
            )}
            <ul className="mt-12 grid gap-4 min-[720px]:grid-cols-2">
              {beliefs.principles?.map((item, index) => (
                <li key={item.title} className="rounded-[8px] bg-white p-6">
                  <p className="text-sm font-bold text-[#FF6610]">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-3 text-[22px] font-bold text-[#03071E]">{item.title}</p>
                  {item.body ? <p className={`mt-2 whitespace-pre-line ${bodyCopy}`}>{item.body}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {facts.length >= 2 ? (
        <section className="bg-white py-[100px]" aria-labelledby="about-stats-heading">
          <div className={`${pageContainer} grid items-end gap-10 min-[960px]:grid-cols-[0.7fr_1.3fr]`}>
            <div>
              <Eyebrow>Key metrics</Eyebrow>
              <h2 id="about-stats-heading" className={sectionTitle}>
                Company statistics
              </h2>
              <p className={`mt-5 ${bodyCopy}`}>Counted from what is published, not rounded for effect.</p>
            </div>
            <dl className="grid gap-4 min-[720px]:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="rounded-[8px] bg-[#F6F8FA] p-6">
                  <dt className="text-sm font-semibold text-[#5c6570]">{fact.label}</dt>
                  <dd className="mt-4 text-[clamp(3rem,5vw,4.5rem)] leading-none font-bold text-[#FF6610]">{fact.value}</dd>
                  {fact.note ? <p className="mt-3 text-sm leading-6 text-[#5c6570]">{fact.note}</p> : null}
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      <section className="bg-[#F6F8FA] py-[100px]" aria-labelledby="about-execution-heading">
        <div className={`${pageContainer} grid items-center gap-12 min-[960px]:grid-cols-2`}>
          <div>
            <Eyebrow>Execution standards</Eyebrow>
            <h2 id="about-execution-heading" className={sectionTitle}>
              The work is in the details.
            </h2>
            <ol className="mt-10 divide-y divide-[#e6e8ec]">
              {EXECUTION.map((item, index) => (
                <li key={item.title} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 py-5">
                  <span className="text-base font-bold text-[#FF6610]">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-[20px] font-bold text-[#03071E]">{item.title}</span>
                    <span className={`mt-1.5 block ${bodyCopy}`}>{item.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          {executionImage?.url ? (
            <img src={executionImage.url} alt={executionImage.alt} className="h-[420px] w-full rounded-[12px] object-cover min-[960px]:h-[620px]" />
          ) : null}
        </div>
      </section>

      {sectors.length || site.certifications.length ? (
        <section className="bg-[#F6F6F6] py-[100px]" aria-labelledby="about-where-heading">
          <div className={`${pageContainer} grid gap-12 min-[960px]:grid-cols-[0.7fr_1.3fr]`}>
            <div>
              <Eyebrow>On file</Eyebrow>
              <h2 id="about-where-heading" className={sectionTitle}>
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

      <section className="bg-[#03071E]" aria-labelledby="about-cta-heading">
        <div className={`${pageContainer} flex flex-wrap items-end justify-between gap-8 py-20`}>
          <div>
            <Eyebrow light>Next project</Eyebrow>
            <h2 id="about-cta-heading" className="mt-4 max-w-[14ch] text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.05] font-bold text-white">
              Talk to the people who will build it.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/70">
              Preconstruction at {company.name} starts with a conversation about the site and the schedule.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <PillLink href={href("/contact")}>Start a project</PillLink>
            <PillLink href={href("/projects")} variant="outline-light">
              See the work
            </PillLink>
          </div>
        </div>
      </section>
    </IndustrialFrame>
  );
}
