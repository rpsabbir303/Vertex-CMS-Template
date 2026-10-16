"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowIcon, Eyebrow, PillLink } from "@/templates/industrial-civil/components/pill-link";

export type HomeServiceItem = {
  id: string;
  title: string;
  summary?: string;
  href: string;
  imageUrl?: string;
  imageAlt?: string;
};

export function HomeCapabilities({
  eyebrow,
  title,
  description,
  services,
  allHref,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  services: HomeServiceItem[];
  allHref: string;
}) {
  const [active, setActive] = useState(0);
  const current = services[active];
  if (!current) return null;

  return (
    <section className="bg-[#03071E] py-[100px] text-white" aria-labelledby="capabilities-heading">
      <div className="mx-auto max-w-[1320px] px-3">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[42rem]">
            <Eyebrow light>{eyebrow}</Eyebrow>
            <h2 id="capabilities-heading" className="mt-4 text-[clamp(2rem,3.1vw,2.75rem)] leading-[1.2] font-bold">
              {title}
            </h2>
            {description ? <p className="mt-4 max-w-xl text-base leading-[26px] text-white/65">{description}</p> : null}
          </div>
          <PillLink href={allHref} variant="outline-light">
            View All Services
          </PillLink>
        </div>

        <div className="mt-12 grid items-stretch gap-8 min-[960px]:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
          <Link
            href={current.href}
            className="group relative block min-h-[340px] overflow-hidden rounded-[28px] min-[960px]:min-h-[560px]"
          >
            {current.imageUrl ? (
              <img
                key={current.id}
                src={current.imageUrl}
                alt={current.imageAlt ?? ""}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            ) : (
              <span className="absolute inset-0 bg-white/10" />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-[#03071E] via-[#03071E]/25 to-transparent" />
            <span className="relative flex h-full min-h-[340px] flex-col justify-end p-6 min-[960px]:min-h-[560px] min-[960px]:p-10">
              <span className="text-sm font-bold tracking-[0.14em] text-[#FF6610]">{String(active + 1).padStart(2, "0")}</span>
              <span className="mt-3 max-w-[16ch] text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.15] font-bold">{current.title}</span>
              {current.summary ? <span className="mt-4 max-w-md text-base leading-7 text-white/80">{current.summary}</span> : null}
              <span className="mt-6 inline-flex items-center gap-2 text-base font-bold">
                Read More <ArrowIcon />
              </span>
            </span>
          </Link>

          <ul className="flex flex-col justify-center">
            {services.map((service, index) => {
              const selected = index === active;
              return (
                <li key={service.id} className="border-b border-white/10">
                  <button
                    type="button"
                    aria-pressed={selected}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    className={`flex w-full items-center gap-4 py-4 text-left transition-colors min-[960px]:py-5 ${
                      selected ? "text-white" : "text-white/45 hover:text-white/75"
                    }`}
                  >
                    <span className={`w-8 shrink-0 text-sm font-bold ${selected ? "text-[#FF6610]" : "text-white/30"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 text-[clamp(1.05rem,1.4vw,1.35rem)] leading-tight font-bold">{service.title}</span>
                    <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full ${selected ? "bg-[#FF6610]" : "bg-transparent"}`} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
