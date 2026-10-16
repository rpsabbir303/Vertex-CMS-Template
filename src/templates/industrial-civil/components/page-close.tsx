import { Eyebrow, PillLink } from "@/templates/industrial-civil/components/pill-link";
import { pageContainer } from "@/templates/industrial-civil/components/record-heading";

export function PageClose({ name, href }: { name?: string; href: string }) {
  return (
    <section className="bg-[#03071E]" aria-labelledby="page-close-heading">
      <div className={`${pageContainer} flex flex-wrap items-end justify-between gap-8 py-20`}>
        <div>
          <Eyebrow light>Next project</Eyebrow>
          <h2 id="page-close-heading" className="mt-4 text-[clamp(2.75rem,6vw,4.75rem)] leading-[0.95] font-bold text-white">
            Let’s build.
          </h2>
          {name ? (
            <p className="mt-5 max-w-md text-base leading-7 text-white/70">
              Tell {name} about the site, the schedule, and what the building has to do. A preconstruction lead will reply.
            </p>
          ) : null}
        </div>
        <PillLink href={href}>Start a project</PillLink>
      </div>
    </section>
  );
}
