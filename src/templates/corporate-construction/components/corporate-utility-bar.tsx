import type { Company } from "@/templates/shared/cms/types/company";

type CorporateUtilityBarProps = {
  company: Company;
};

export function CorporateUtilityBar({ company }: CorporateUtilityBarProps) {
  const phone = company.phone;
  const email = company.email;
  const locationHint = company.address
    ? [company.address.city, company.address.region].filter(Boolean).join(", ")
    : null;

  if (!phone && !email && !locationHint) {
    return null;
  }

  return (
    <div className="bg-[var(--color-primary)] text-[var(--color-text-inverse)]">
      <div className="vertex-container flex flex-col gap-1 py-2 text-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {phone ? (
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:underline">
              {phone}
            </a>
          ) : null}
          {locationHint ? (
            <span className="text-white/70">{locationHint}</span>
          ) : null}
        </div>
        {email ? (
          <a href={`mailto:${email}`} className="truncate hover:underline sm:max-w-[50%]">
            {email}
          </a>
        ) : null}
      </div>
    </div>
  );
}
