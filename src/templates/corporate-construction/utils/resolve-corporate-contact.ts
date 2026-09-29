import type { Company, CompanyAddress } from "@/templates/shared/cms/types/company";
import type {
  BusinessHoursEntry,
  Contact,
  ContactFormConfig,
} from "@/templates/shared/cms/types/contact";
import { formatAddress, formatAddressInline } from "@/utils/format-address";

/**
 * Single source of truth for tenant contact presentation.
 * Contact envelope fields override company fallbacks when present.
 */
export type ResolvedCorporateContact = {
  phone?: string;
  email?: string;
  address?: CompanyAddress;
  addressBlock?: string;
  addressInline?: string;
  hours: BusinessHoursEntry[];
  form?: ContactFormConfig;
  mapEmbedUrl?: string;
  hasDetails: boolean;
  hasForm: boolean;
  hasMap: boolean;
  hasAny: boolean;
};

export function resolveCorporateContact(
  company: Company | null | undefined,
  contact: Contact | null | undefined,
): ResolvedCorporateContact {
  const phone = contact?.phone?.trim() || company?.phone?.trim() || undefined;
  const email = contact?.email?.trim() || company?.email?.trim() || undefined;
  const address = contact?.address ?? company?.address;
  const addressBlock = address ? formatAddress(address) : undefined;
  const addressInline = address ? formatAddressInline(address) : undefined;
  const hours = (contact?.hours ?? []).filter(
    (entry) => entry.days?.trim() && entry.hours?.trim(),
  );
  const form = contact?.form;
  const mapEmbedUrl = contact?.mapEmbedUrl?.trim() || undefined;

  const hasForm = Boolean(form?.enabled && form.fields?.length);
  const hasDetails = Boolean(phone || email || addressBlock || hours.length);
  const hasMap = Boolean(mapEmbedUrl);

  return {
    phone,
    email,
    address,
    addressBlock,
    addressInline,
    hours,
    form,
    mapEmbedUrl,
    hasDetails,
    hasForm,
    hasMap,
    hasAny: hasDetails || hasForm || hasMap,
  };
}
