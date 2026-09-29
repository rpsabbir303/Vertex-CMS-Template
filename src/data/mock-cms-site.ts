import type { CmsSitePayload } from "@/templates/shared/cms/types";
import { createEnvelope } from "@/templates/shared/cms/types/cms-state";
import { demoMedia } from "./demo-media";

export const mockCmsSitePayload: CmsSitePayload = {
  company: createEnvelope({
    name: "Alden Commercial Builders",
    headline: "Commercial construction for owners who need a steady delivery partner",
    tagline: "Midwest commercial builder",
    description:
      "Alden Commercial Builders plans and builds occupied, phased, and ground-up commercial work for healthcare, education, workplace, and industrial clients.\n\nProject teams stay with the work from early pricing through closeout, so owners have one point of accountability for schedule, field coordination, and turnover.",
    logo: demoMedia.logo,
    heroImage: demoMedia.hero,
    phone: "+1 (312) 555-0148",
    email: "projects@aldenbuilders.example",
    address: {
      line1: "180 North Wacker Drive",
      line2: "Suite 900",
      city: "Chicago",
      region: "IL",
      postalCode: "60606",
      country: "United States",
    },
    socialLinks: [
      {
        platform: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com",
      },
    ],
    foundedYear: 1978,
  }),

  services: createEnvelope({
    section: {
      eyebrow: "Services",
      title: "Commercial capabilities",
      description: "What we build and how we deliver it.",
      cta: { label: "All services", href: "/preview/corporate-construction/services" },
    },
    items: [
      {
        id: "svc_gc",
        title: "General Contracting",
        slug: "general-contracting",
        summary: "Single-contract delivery for core, shell, and interior scopes.",
        description:
          "Alden manages trade procurement, site logistics, and field supervision under one contract. Weekly owner reporting covers schedule, cost exposure, and decisions that affect occupancy.",
        image: demoMedia.steel,
        sortOrder: 1,
      },
      {
        id: "svc_db",
        title: "Design-Build",
        slug: "design-build",
        summary: "Estimating and constructability joined to design before documents are frozen.",
        description:
          "Design-build teams bring pricing, phasing, and system choices forward so the documents reflect how the building will actually be built on an occupied or constrained site.",
        image: demoMedia.crane,
        sortOrder: 2,
      },
      {
        id: "svc_precon",
        title: "Preconstruction",
        slug: "preconstruction",
        summary: "Budgets, schedules, and logistics before mobilization.",
        description:
          "Preconstruction covers conceptual estimates, milestone schedules, long-lead review, and site logistics so the owner can decide scope before the field starts.",
        image: demoMedia.concrete,
        sortOrder: 3,
      },
      {
        id: "svc_commercial",
        title: "Commercial Construction",
        slug: "commercial-construction",
        summary: "Workplace, mixed-use, and base-building commercial projects.",
        description:
          "Commercial work includes new workplace buildings and base-building upgrades where tenants, landlords, and building operations share the same site.",
        image: demoMedia.commercial,
        sortOrder: 4,
      },
      {
        id: "svc_reno",
        title: "Renovation & Modernization",
        slug: "renovation-modernization",
        summary: "Phased interior and envelope work in buildings that stay open.",
        description:
          "Renovation teams sequence noisy and disruptive work around occupants, with temporary protection, after-hours windows, and clear handoffs between phases.",
        image: demoMedia.interior,
        sortOrder: 5,
      },
      {
        id: "svc_inst",
        title: "Institutional Construction",
        slug: "institutional-construction",
        summary: "Healthcare and education projects with phased occupancy.",
        description:
          "Institutional projects coordinate infection-control or campus constraints, owner user groups, and inspections without treating the building as an empty site.",
        image: demoMedia.healthcare,
        sortOrder: 6,
      },
    ],
  }),

  projects: createEnvelope({
    items: [
      {
        id: "prj_lakeshore",
        title: "Lakeshore Outpatient Pavilion",
        slug: "lakeshore-outpatient-pavilion",
        summary: "Four-story ambulatory addition built beside an active hospital campus.",
        description:
          "The pavilion adds clinic and imaging space on a tight urban campus. Structural steel, envelope, and interior build-out were sequenced so the existing hospital entries stayed open. Owner meetings tracked inspections, long-lead equipment, and the handoff into furniture and medical planning.\n\nField work was split into three occupancy phases. Temporary partitions and after-hours deliveries kept public corridors usable while the new frame went up.",
        image: demoMedia.healthcare,
        gallery: {
          id: "gal_lakeshore",
          images: [
            { ...demoMedia.healthcare, id: "gal_lakeshore_1", caption: "Campus addition during envelope work" },
            { ...demoMedia.steel, id: "gal_lakeshore_2", caption: "Steel frame adjacent to the existing hospital" },
            { ...demoMedia.interior, id: "gal_lakeshore_3", caption: "Clinic interior before owner fit-out" },
          ],
        },
        location: "Milwaukee, WI",
        year: 2024,
        featured: true,
        metadata: {
          sector: "Healthcare",
          scope: "Core and shell with phased interior build-out",
          duration: "22 months",
        },
        sortOrder: 1,
      },
      {
        id: "prj_westbridge",
        title: "Westbridge Distribution Hall",
        slug: "westbridge-distribution-hall",
        summary: "Cross-dock industrial building with a mezzanine for sortation equipment.",
        description:
          "Westbridge is a ground-up distribution building sized for trailer courts and a raised equipment platform. The structure, slab, and utility yard were coordinated with the owner's equipment vendor so racks and sortation could install without reopening the envelope.",
        image: demoMedia.industrial,
        gallery: {
          id: "gal_westbridge",
          images: [
            { ...demoMedia.industrial, id: "gal_west_1" },
            { ...demoMedia.concrete, id: "gal_west_2", caption: "Slab and dock wall sequence" },
          ],
        },
        location: "Indianapolis, IN",
        year: 2023,
        featured: true,
        metadata: {
          sector: "Industrial",
          scope: "Ground-up building and site work",
          duration: "14 months",
        },
        sortOrder: 2,
      },
      {
        id: "prj_science",
        title: "North Campus Science Hall",
        slug: "north-campus-science-hall",
        summary: "Teaching laboratory renovation completed between academic terms.",
        description:
          "Laboratory classrooms were rebuilt in two summer windows. Mechanical risers, lab casework rough-in, and corridor protection were planned against the campus calendar so fall classes could open on schedule.",
        image: demoMedia.education,
        location: "Madison, WI",
        year: 2023,
        featured: true,
        metadata: {
          sector: "Education",
          scope: "Interior renovation",
          duration: "11 months",
        },
        sortOrder: 3,
      },
      {
        id: "prj_harbor",
        title: "Harbor Exchange Workplace",
        slug: "harbor-exchange-workplace",
        summary: "Base-building refresh and workplace interiors in a downtown office.",
        description:
          "The project updated lobby, core restrooms, and three workplace floors while other tenants remained in the building. After-hours noisy work and daytime finishes were split so the lobby could reopen each morning.",
        image: demoMedia.commercial,
        gallery: {
          id: "gal_harbor",
          images: [
            { ...demoMedia.commercial, id: "gal_harbor_1" },
            { ...demoMedia.interior, id: "gal_harbor_2", caption: "Workplace floor before furniture" },
          ],
        },
        location: "Chicago, IL",
        year: 2022,
        featured: false,
        metadata: {
          sector: "Workplace",
          scope: "Base building and tenant interiors",
        },
        sortOrder: 4,
      },
    ],
  }),

  team: createEnvelope({
    items: [
      {
        id: "team_jordan",
        name: "Jordan Hale",
        role: "President",
        bio: "Leads owner relationships and preconstruction for healthcare and workplace accounts.",
        image: demoMedia.portrait1,
        sortOrder: 1,
      },
      {
        id: "team_priya",
        name: "Priya Shah",
        role: "Vice President, Preconstruction",
        bio: "Responsible for estimates, schedules, and constructability reviews before mobilization.",
        image: demoMedia.portrait2,
        sortOrder: 2,
      },
      {
        id: "team_marcus",
        name: "Marcus Ellison",
        role: "Vice President, Field Operations",
        bio: "Oversees superintendents, site logistics, and day-to-day field coordination.",
        image: demoMedia.portrait3,
        sortOrder: 3,
      },
      {
        id: "team_elena",
        name: "Elena Vargas",
        role: "Director of Project Controls",
        bio: "Maintains cost, schedule, and owner reporting from buyout through closeout.",
        image: demoMedia.portrait4,
        sortOrder: 4,
      },
    ],
  }),

  testimonials: createEnvelope({
    items: [
      {
        id: "tst_sample",
        quote:
          "Sample client note: weekly reporting made phased occupancy easier to explain to our internal committee. This quote is fictional demonstration copy, not a verified endorsement.",
        personName: "Sample client contact",
        personRole: "Facilities lead",
        companyName: "Sample owner organization",
        sortOrder: 1,
      },
    ],
  }),

  certifications: createEnvelope({
    items: [
      {
        id: "cert_safety",
        name: "Site safety manual",
        issuer: "Sample record",
        year: 2024,
        sortOrder: 1,
      },
      {
        id: "cert_quality",
        name: "Quality control procedure",
        issuer: "Sample record",
        year: 2023,
        sortOrder: 2,
      },
    ],
  }),

  contact: createEnvelope({
    phone: "+1 (312) 555-0190",
    email: "inquiries@aldenbuilders.example",
    address: {
      line1: "180 North Wacker Drive",
      line2: "Suite 900",
      city: "Chicago",
      region: "IL",
      postalCode: "60606",
      country: "United States",
    },
    hours: [
      { days: "Monday – Friday", hours: "7:30 AM – 5:00 PM CT" },
    ],
    form: {
      enabled: true,
      submitLabel: "Send project inquiry",
      successMessage:
        "Thank you. A preconstruction coordinator will reply within one business day. This form is a template preview and is not sent to a live inbox.",
      fields: [
        { id: "name", name: "name", label: "Full name", type: "text", required: true },
        { id: "company", name: "company", label: "Company", type: "text", required: false },
        { id: "email", name: "email", label: "Email", type: "email", required: true },
        { id: "phone", name: "phone", label: "Phone", type: "tel", required: false },
        {
          id: "projectType",
          name: "projectType",
          label: "Project type",
          type: "select",
          required: false,
          options: [
            "General contracting",
            "Design-build",
            "Preconstruction",
            "Renovation",
            "Institutional",
          ],
        },
        {
          id: "location",
          name: "location",
          label: "Project location",
          type: "text",
          required: false,
        },
        {
          id: "message",
          name: "message",
          label: "Project details",
          type: "textarea",
          required: true,
        },
      ],
    },
  }),

  optionalPages: createEnvelope([
    {
      id: "opt_safety",
      title: "Safety",
      slug: "safety",
      heroImage: demoMedia.crane,
      body: "Field work follows a written site safety program. Superintendents review logistics, temporary protection, and daily planning before crews start.\n\nThis page is sample tenant content for the approved optional-page pattern. It is not a certification claim.",
      showInNavigation: true,
      sortOrder: 1,
    },
    {
      id: "opt_privacy",
      title: "Privacy",
      slug: "privacy",
      body: "This privacy notice is placeholder copy for the template preview.",
      showInNavigation: false,
      sortOrder: 2,
    },
  ]),

  navigation: createEnvelope([
    { label: "Home", href: "/", pageSlug: "home" },
    { label: "About", href: "/about", pageSlug: "about" },
    { label: "Services", href: "/services", pageSlug: "services" },
    { label: "Projects", href: "/projects", pageSlug: "projects" },
    { label: "Team", href: "/team", pageSlug: "team" },
    { label: "Contact", href: "/contact", pageSlug: "contact" },
    { label: "Safety", href: "/safety", pageSlug: "safety" },
  ]),

  siteSeo: createEnvelope({
    title: "Alden Commercial Builders",
    description:
      "Commercial construction, design-build, and renovation for healthcare, education, workplace, and industrial projects.",
    canonicalPath: "/",
    ogTitle: "Alden Commercial Builders",
    ogDescription: "A commercial builder for occupied and ground-up projects.",
    ogImageUrl: "/media/corporate/hero.jpg",
  }),

  pageSeo: createEnvelope([
    {
      pageSlug: "home",
      title: "Alden Commercial Builders",
      description: "Commercial construction for healthcare, workplace, education, and industrial owners.",
    },
    {
      pageSlug: "about",
      title: "About",
      description: "How Alden Commercial Builders organizes preconstruction, field work, and closeout.",
    },
    {
      pageSlug: "services",
      title: "Services",
      description: "General contracting, design-build, preconstruction, renovation, and institutional work.",
    },
    {
      pageSlug: "projects",
      title: "Projects",
      description: "Selected commercial, healthcare, education, and industrial projects.",
    },
    {
      pageSlug: "team",
      title: "Team",
      description: "Leadership for preconstruction, field operations, and project controls.",
    },
    {
      pageSlug: "contact",
      title: "Contact",
      description: "Start a project conversation with Alden Commercial Builders.",
    },
  ]),
};
