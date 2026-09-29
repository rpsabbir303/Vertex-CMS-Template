import type { CompanyAddress } from "@/templates/shared/cms/types/company";

export function formatAddress(address: CompanyAddress): string {
  const locality = [address.city, address.region, address.postalCode]
    .filter(Boolean)
    .join(", ");
  return [
    address.line1,
    address.line2,
    locality,
    address.country,
  ]
    .filter(Boolean)
    .join("\n");
}

export function formatAddressInline(address: CompanyAddress): string {
  return formatAddress(address).replace(/\n/g, ", ");
}
