import type { CmsSitePayload } from "@/templates/shared/cms/types";
import type { Service } from "@/templates/shared/cms/types/services";
import { createEnvelope } from "@/templates/shared/cms/types/cms-state";
import { demoMedia } from "@/data/demo-media";

/** Preview-only: swap the services collection to test different tenants and counts */
export type ServicesVariantId =
  | "1"
  | "5"
  | "7"
  | "12"
  | "brokenimg"
  | "mixed"
  | "2"
  | "3"
  | "4"
  | "6"
  | "8"
  | "10"
  | "long"
  | "noimage"
  | "none"
  | "roofing"
  | "electrical";

const images = [
  demoMedia.steel,
  demoMedia.crane,
  demoMedia.concrete,
  demoMedia.commercial,
  demoMedia.interior,
  demoMedia.healthcare,
  demoMedia.industrial,
  demoMedia.education,
];

function build(names: Array<[string, string?]>, withImages = true): Service[] {
  return names.map(([title, summary], index) => ({
    id: `variant_${index}`,
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    summary,
    image: withImages ? images[index % images.length] : undefined,
    sortOrder: index + 1,
  }));
}

const commercial: Array<[string, string]> = [
  ["General Contracting", "Single-contract delivery for core, shell, and interior scopes."],
  ["Design-Build", "Estimating and constructability joined to design."],
  ["Preconstruction", "Budgets, schedules, and logistics before mobilization."],
  ["Renovation & Modernization", "Phased work in buildings that stay open."],
  ["Institutional Construction", "Healthcare and education with phased occupancy."],
  ["Commercial Construction", "Workplace, mixed-use, and base-building projects."],
  ["Industrial Construction", "Distribution, manufacturing, and utility buildings."],
  ["Tenant Improvement", "Fast-track interiors for occupied buildings."],
  ["Site Logistics", "Access, phasing, and deliveries on constrained sites."],
  ["Closeout & Turnover", "Commissioning support and turnover documentation."],
];

const extra: Array<[string, string?]> = [
  ["Design Assist", "Early trade input on systems and sequencing."],
  ["Program Management", "Owner-side coordination across multiple projects."],
];

const variants: Record<ServicesVariantId, () => CmsSitePayload["services"]> = {
  "1": () => createEnvelope({ items: build(commercial.slice(0, 1)) }),
  "5": () => createEnvelope({ items: build(commercial.slice(0, 5)) }),
  "7": () => createEnvelope({ items: build(commercial.slice(0, 7)) }),
  "12": () => createEnvelope({ items: build([...commercial, ...extra]) }),
  /** Some images point at files that do not exist */
  brokenimg: () =>
    createEnvelope({
      items: build(commercial.slice(0, 6)).map((service, index) =>
        index % 2 === 0
          ? { ...service, image: { ...service.image!, url: "/media/corporate/does-not-exist.jpg" } }
          : service,
      ),
    }),
  /** Some services have no image at all */
  mixed: () =>
    createEnvelope({
      items: build(commercial.slice(0, 7)).map((service, index) =>
        index % 3 === 1 ? { ...service, image: undefined, summary: undefined } : service,
      ),
    }),
  "2": () => createEnvelope({ items: build(commercial.slice(0, 2)) }),
  "3": () => createEnvelope({ items: build(commercial.slice(0, 3)) }),
  "4": () => createEnvelope({ items: build(commercial.slice(0, 4)) }),
  "6": () => createEnvelope({ items: build(commercial.slice(0, 6)) }),
  "8": () => createEnvelope({ items: build(commercial.slice(0, 8)) }),
  "10": () => createEnvelope({ items: build(commercial) }),
  long: () =>
    createEnvelope({
      items: build([
        [
          "Integrated Design-Build and Construction Management Services for Complex Multi-Phase Healthcare, Education, and Institutional Campus Expansion Programs",
          "This deliberately long description checks wrapping. Estimating, scheduling, procurement, and field supervision are coordinated under one team so decisions about phasing, infection control, temporary protection, and owner move-in dates are made early and documented weekly for the owner's committee.",
        ],
        ["Short", "Brief."],
        ["Preconstructionandestimatingandschedulingandlogisticsplanningwithoutspaces"],
      ]),
    }),
  noimage: () => createEnvelope({ items: build(commercial.slice(0, 5), false) }),
  none: () => createEnvelope({ items: [] }),
  roofing: () =>
    createEnvelope({
      section: {
        eyebrow: "What we do",
        title: "Building envelope specialists",
        description: "Roof, wall, and waterproofing work for occupied buildings.",
        cta: { label: "Request an inspection", href: "/preview/corporate-construction/contact" },
      },
      items: build([
        ["Roofing", "Replacement and repair for low-slope and steep-slope roofs."],
        ["Waterproofing", "Below-grade and plaza deck waterproofing."],
        ["Building Envelope", "Wall systems, sealants, and window perimeters."],
        ["Exterior Restoration", "Masonry repair and facade restoration."],
        ["Maintenance", "Scheduled inspections and preventive repair."],
      ]),
    }),
  electrical: () =>
    createEnvelope({
      section: { title: "Trades we self-perform" },
      items: build([
        ["Electrical", "Power distribution, lighting, and controls."],
        ["Mechanical", "Piping and equipment installation."],
        ["HVAC", "Air handling, chillers, and balancing."],
        ["Industrial Maintenance", "Planned shutdown and repair work."],
        ["Automation", "Controls integration and commissioning."],
        ["Facility Services", "On-call service for owner facilities."],
        ["Emergency Response", "Around-the-clock call-out for building systems."],
      ]),
    }),
};

export function isServicesVariant(value?: string): value is ServicesVariantId {
  return Boolean(value && value in variants);
}

export function withServicesVariant(
  payload: CmsSitePayload,
  variant: ServicesVariantId,
): CmsSitePayload {
  return { ...payload, services: variants[variant]() };
}
