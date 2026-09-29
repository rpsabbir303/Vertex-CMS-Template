import type { CompanyAddress } from "./company";

export type BusinessHoursEntry = {
  days: string;
  hours: string;
};

export type ContactFormField = {
  id: string;
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  required: boolean;
  options?: string[];
};

export type ContactFormConfig = {
  enabled: boolean;
  submitLabel?: string;
  successMessage?: string;
  fields: ContactFormField[];
};

export type Contact = {
  phone?: string;
  email?: string;
  address?: CompanyAddress;
  hours?: BusinessHoursEntry[];
  form?: ContactFormConfig;
  mapEmbedUrl?: string;
};
