"use client";

import { useState } from "react";
import { PillLink } from "@/templates/industrial-civil/components/pill-link";

export type FeaturedProject = {
  id: string;
  title: string;
  summary?: string;
  href: string;
  imageUrl?: string;
  imageAlt?: string;
  facts: { label: string; value: string }[];
};

export function HomeFeaturedProject({ projects }: { projects: FeaturedProject[] }) {
  const [active, setActive] = useState(0);
  const project = projects[active];
  if (!project) return null;

  return (
    <div>
      <div className="grid items-center gap-10 min-[960px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        {project.imageUrl ? (
          <div className="h-[320px] overflow-hidden rounded-[8px] min-[960px]:h-[520px]">
            <img key={project.id} src={project.imageUrl} alt={project.imageAlt ?? ""} className="h-full w-full object-cover" />
          </div>
        ) : null}
        <div>
          <p className="text-base font-bold text-[#FF6610]">
            Project {String(active + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.2] font-bold text-[#03071E]">{project.title}</h3>
          {project.summary ? <p className="mt-4 text-base leading-[26px] text-[#5c6570]">{project.summary}</p> : null}
          {project.facts.length ? (
            <dl className="mt-6 divide-y divide-[#e6e8ec] border-y border-[#e6e8ec]">
              {project.facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-4 py-3">
                  <dt className="text-sm font-semibold text-[#5c6570]">{fact.label}</dt>
                  <dd className="text-base font-bold text-[#03071E]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <PillLink href={project.href} className="mt-8">
            View Project
          </PillLink>
        </div>
      </div>
      {projects.length > 1 ? (
        <div className="mt-8 grid grid-cols-2 gap-3 min-[720px]:grid-cols-4" role="tablist" aria-label="Featured projects">
          {projects.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(index)}
                className={`overflow-hidden rounded-[6px] text-left transition-colors ${selected ? "ring-2 ring-[#FF6610]" : "ring-1 ring-[#e6e8ec]"}`}
              >
                {item.imageUrl ? <img src={item.imageUrl} alt="" className="h-24 w-full object-cover min-[960px]:h-28" /> : null}
                <span className={`block px-3 py-2 text-sm font-bold ${selected ? "text-[#FF6610]" : "text-[#03071E]"}`}>{item.title}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
