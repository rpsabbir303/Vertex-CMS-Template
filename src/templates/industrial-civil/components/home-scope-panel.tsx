"use client";

import { useState } from "react";
import { PillLink } from "@/templates/industrial-civil/components/pill-link";

export function HomeScopePanel({
  sectors,
  services,
  stages,
  contactHref,
}: {
  sectors: string[];
  services: string[];
  stages: string[];
  contactHref: string;
}) {
  const [area, setArea] = useState(40000);
  const [floors, setFloors] = useState(3);
  const [sector, setSector] = useState("");
  const [service, setService] = useState("");
  const [occupied, setOccupied] = useState(true);
  const [support, setSupport] = useState<string[]>(stages.slice(0, 1));

  const toggleStage = (stage: string) =>
    setSupport((current) => (current.includes(stage) ? current.filter((item) => item !== stage) : [...current, stage]));

  const summary = [
    sector || null,
    service || null,
    `${floors} ${floors === 1 ? "floor" : "floors"}`,
    occupied ? "Occupied building" : "Vacant site",
    ...support,
  ].filter((item): item is string => Boolean(item));

  return (
    <div className="grid gap-10 rounded-[4px] bg-white p-6 min-[960px]:grid-cols-[minmax(0,1fr)_320px] min-[960px]:p-8">
      <div>
        <div className="grid gap-8 min-[720px]:grid-cols-2">
          <RangeField label="Area (sq ft)" value={area} min={5000} max={250000} step={5000} onChange={setArea} display={area.toLocaleString("en-US")} />
          <RangeField label="Number Of Floors" value={floors} min={1} max={20} step={1} onChange={setFloors} display={String(floors)} />
        </div>
        <div className="mt-8 grid gap-6 min-[720px]:grid-cols-3">
          <SelectField label="Sector" value={sector} options={sectors} onChange={setSector} />
          <SelectField label="Capability" value={service} options={services} onChange={setService} />
          <div>
            <p className="text-base font-bold text-[#03071E]">Occupied Building:</p>
            <div className="mt-3 inline-flex rounded-[25px] bg-[#F6F8FA] p-1">
              {[true, false].map((value) => (
                <button
                  key={String(value)}
                  type="button"
                  aria-pressed={occupied === value}
                  onClick={() => setOccupied(value)}
                  className={`rounded-[25px] px-6 py-2 text-base font-bold transition-colors ${
                    occupied === value ? "bg-[#FF6610] text-white" : "text-[#03071E]"
                  }`}
                >
                  {value ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>
        </div>
        {stages.length ? (
          <fieldset className="mt-8">
            <legend className="text-base font-bold text-[#03071E]">Support Needed:</legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {stages.map((stage) => {
                const on = support.includes(stage);
                return (
                  <button
                    key={stage}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleStage(stage)}
                    className={`rounded-[25px] border px-4 py-2 text-[15px] transition-colors ${
                      on ? "border-[#FF6610] bg-[#FF6610] text-white" : "border-[#e6e8ec] text-[#5c6570] hover:border-[#FF6610]"
                    }`}
                  >
                    {stage}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ) : null}
        <p className="mt-8 text-[clamp(2.5rem,5vw,3.75rem)] leading-none font-bold text-[#FF6610]">{area.toLocaleString("en-US")} sq ft</p>
        <p className="mt-2 text-base text-[#5c6570]">Planned area</p>
      </div>
      <aside className="border-[#e6e8ec] min-[960px]:border-l min-[960px]:pl-8">
        <p className="text-[22px] font-bold text-[#03071E]">Your Request</p>
        <p className="mt-4 text-base leading-[26px] text-[#5c6570]">
          Share the outline below with our preconstruction team and we will follow up with sequencing and pricing questions.
        </p>
        <ul className="mt-6 space-y-3">
          {summary.map((item) => (
            <li key={item} className="flex items-center gap-3 text-base text-[#03071E]">
              <svg className="h-5 w-5 shrink-0 text-[#FF6610]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
                <path d="m8 12 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
        <PillLink href={contactHref} className="mt-8">
          Request It Now
        </PillLink>
      </aside>
    </div>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="text-base font-bold text-[#03071E]">{label}:</span>
      <span className="relative mt-10 block">
        <span
          className="absolute -top-9 -translate-x-1/2 rounded-full bg-[#FF6610] px-2.5 py-1 text-xs font-bold whitespace-nowrap text-white"
          style={{ left: `${percent}%` }}
        >
          {display}
        </span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#FF6610] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FF6610]"
          style={{ background: `linear-gradient(to right, #FF6610 ${percent}%, #e6e8ec ${percent}%)` }}
        />
      </span>
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-base font-bold text-[#03071E]">{label}:</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 w-full rounded-[25px] border border-[#e6e8ec] bg-white px-4 py-2.5 text-[15px] text-[#5c6570] outline-none focus:border-[#FF6610]"
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
