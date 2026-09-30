"use client";

import type { ProjectStatusFilter, ProjectTypeFilter } from "@/templates/corporate-construction/utils/project-filters";
import {
  PROJECT_STATUS_FILTER_OPTIONS,
  PROJECT_TYPE_FILTER_OPTIONS,
} from "@/templates/corporate-construction/utils/project-filters";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectsDualFilterProps = {
  status: ProjectStatusFilter;
  buildingType: ProjectTypeFilter;
  onStatusChange: (value: ProjectStatusFilter) => void;
  onBuildingTypeChange: (value: ProjectTypeFilter) => void;
};

function FilterRow<T extends string>({
  legend,
  options,
  value,
  onChange,
  name,
}: {
  legend: string;
  name: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="min-w-0 border-0 p-0">
      <legend className={cn(ui.mono, "mb-3 text-[var(--color-text-muted)]")}>{legend}</legend>
      <div className="flex flex-wrap gap-x-1 gap-y-2" role="radiogroup" aria-label={legend}>
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              name={name}
              onClick={() => onChange(option.value)}
              className={cn(
                "min-h-10 border px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none",
                ui.rule,
                selected
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                  : "border-transparent bg-transparent text-[var(--color-text)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface-muted)]",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ProjectsDualFilter({
  status,
  buildingType,
  onStatusChange,
  onBuildingTypeChange,
}: ProjectsDualFilterProps) {
  return (
    <div className="grid gap-8 border-b border-[var(--color-border)] pb-8 md:grid-cols-2 md:gap-12">
      <FilterRow
        legend="Project status"
        name="project-status"
        options={PROJECT_STATUS_FILTER_OPTIONS}
        value={status}
        onChange={onStatusChange}
      />
      <FilterRow
        legend="Project type"
        name="project-type"
        options={PROJECT_TYPE_FILTER_OPTIONS}
        value={buildingType}
        onChange={onBuildingTypeChange}
      />
    </div>
  );
}
