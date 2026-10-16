"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/templates/industrial-civil/components/pill-link";

export type CarouselProject = {
  id: string;
  title: string;
  summary?: string;
  href: string;
  imageUrl?: string;
  imageAlt?: string;
};

export function HomeProjectCarousel({ projects }: { projects: CarouselProject[] }) {
  const [active, setActive] = useState(0);
  const count = projects.length;
  if (!count) return null;

  const offsetOf = (index: number) => {
    let offset = index - active;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset;
  };

  return (
    <div>
      <div className="relative h-[480px] overflow-hidden [perspective:1400px] min-[960px]:h-[520px]">
        {projects.map((project, index) => {
          const offset = offsetOf(index);
          const isActive = offset === 0;
          const visible = Math.abs(offset) <= 1;
          const transform = isActive
            ? "translate(-50%, -50%) rotateY(0deg) scale(1)"
            : `translate(calc(-50% + ${offset * 140}%), -50%) rotateY(${offset * -34}deg) scale(1.35)`;
          return (
            <article
              key={project.id}
              aria-hidden={!isActive}
              className={`absolute top-1/2 left-1/2 h-[350px] w-[min(78vw,365px)] overflow-hidden transition-all duration-700 ease-out ${
                visible ? "opacity-100" : "pointer-events-none opacity-0"
              } ${isActive ? "z-20" : "z-10 cursor-pointer"}`}
              style={{ transform, transformStyle: "preserve-3d" }}
              onClick={() => !isActive && setActive(index)}
            >
              {project.imageUrl ? <img src={project.imageUrl} alt={project.imageAlt ?? ""} className="h-full w-full object-cover" /> : null}
              <div
                className={`absolute inset-0 flex flex-col justify-center bg-[#03071E]/70 p-6 text-white transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                <h3 className="text-[20px] font-bold">{project.title}</h3>
                {project.summary ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/80">{project.summary}</p> : null}
                <Link href={project.href} tabIndex={isActive ? 0 : -1} className="mt-5 inline-flex items-center gap-1.5 text-base font-bold">
                  Read More <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      {count > 1 ? (
        <div className="mt-2 flex items-center justify-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              aria-label={`Show ${project.title}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
              className={
                index === active
                  ? "h-5 w-5 rounded-full border-2 border-[#FF6610] p-[3px]"
                  : "h-3 w-3 rounded-full bg-[#FF6610]/25"
              }
            >
              {index === active ? <span className="block h-full w-full rounded-full bg-[#FF6610]" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
