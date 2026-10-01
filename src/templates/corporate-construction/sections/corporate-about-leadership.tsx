import type { CompanyAboutLeader, CompanyAboutLeadership } from "@/templates/shared/cms/types/company";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { ArchitecturalGrid } from "@/templates/corporate-construction/components/ui/architectural-grid";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { splitAboutParagraphs } from "@/templates/corporate-construction/utils/about-content";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateAboutLeadershipProps = {
  content: CompanyAboutLeadership;
  leaders: CompanyAboutLeader[];
};

function LeaderRow({ leader, index }: { leader: CompanyAboutLeader; index: number }) {
  return (
    <li className="grid gap-6 border-t border-white/15 py-8 md:grid-cols-12 md:items-center md:gap-8 md:py-10">
      <span className={cn(ui.mono, "text-white/50 md:col-span-1")}>{pad(index + 1)}</span>
      <div className="flex min-w-0 items-center gap-5 md:col-span-4">
        {leader.image?.url ? (
          <div className={cn(ui.plateSm, "h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white/10")}>
            <CmsImageMedia image={leader.image} aspect="square" className="h-full w-full object-cover" sizes="4rem" />
          </div>
        ) : null}
        <div className="min-w-0">
          <p className={cn(ui.mono, "text-white/55")}>{leader.role}</p>
          {leader.name?.trim() ? (
            <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-white">
              {leader.name}
            </p>
          ) : null}
        </div>
      </div>
      {leader.note?.trim() ? (
        <p className="text-pretty text-base leading-relaxed text-white/70 md:col-span-7">{leader.note}</p>
      ) : null}
    </li>
  );
}

export function CorporateAboutLeadershipSection({ content, leaders }: CorporateAboutLeadershipProps) {
  const intro = splitAboutParagraphs(content.intro);
  const headline = content.headline?.trim();
  const rows = leaders.filter((l) => l.role?.trim());

  if (!headline && !intro.length && !rows.length) return null;

  return (
    <section className="relative overflow-hidden bg-[var(--color-primary)] text-white" aria-labelledby="about-leadership-heading">
      <ArchitecturalGrid tone="dark" className="pointer-events-none absolute inset-0 opacity-35" />
      <div className="vertex-container relative py-28 md:py-36 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-5">
            <p className={cn(ui.eyebrow, "!text-[var(--color-accent)]")}>{content.eyebrow?.trim() || "Leadership"}</p>
            {headline ? (
              <h2 id="about-leadership-heading" className={cn(ui.h2, "mt-5 max-w-[14ch] !text-white text-balance")}>
                {headline}
              </h2>
            ) : (
              <h2 id="about-leadership-heading" className="sr-only">
                Leadership
              </h2>
            )}
            {intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-8 max-w-md text-pretty text-base leading-relaxed text-white/75">
                {paragraph}
              </p>
            ))}
          </div>
          {content.image?.url ? (
            <Reveal plate className={cn(ui.plate, "relative aspect-[4/5] max-h-[28rem] lg:col-span-7 lg:ml-auto lg:max-h-none")}>
              <CmsImageMedia
                image={content.image}
                aspect="auto"
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </Reveal>
          ) : null}
        </div>

        {rows.length ? (
          <ul className="mt-16 border-b border-white/15 md:mt-20">
            {rows.map((leader, index) => (
              <LeaderRow key={`${leader.role}-${leader.name ?? index}`} leader={leader} index={index} />
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
