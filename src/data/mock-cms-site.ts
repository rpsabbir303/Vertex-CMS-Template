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
    /** Prefer contact envelope on the Contact page; company fields are fallback only. */
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
    socialLinks: [
      {
        platform: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com",
      },
      {
        platform: "instagram",
        label: "Instagram",
        url: "https://www.instagram.com",
      },
      {
        platform: "facebook",
        label: "Facebook",
        url: "https://www.facebook.com",
      },
      {
        platform: "youtube",
        label: "YouTube",
        url: "https://www.youtube.com",
      },
      {
        platform: "x",
        label: "X",
        url: "https://x.com",
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
      headline: "Safety is built into every phase of the work",
      heroImage: demoMedia.crane,
      body:
        "Field work follows a written site safety program. Superintendents review logistics, temporary protection, and daily planning before crews start.\n\n" +
        "Safety planning begins in preconstruction and continues through field coordination and closeout. Project teams review access, temporary protection, and trade sequencing with the superintendent before each major phase of work.\n\n" +
        "Daily site coordination keeps crews aligned on logistics, temporary controls, and the conditions that change as the building advances. When conditions shift, the superintendent updates the plan with the trades before work continues.",
      approachHeading: "How safety is managed on site",
      commitmentHeading: "Safety is part of how we plan, coordinate, and deliver the work.",
      commitmentBody:
        "Project teams stay accountable for temporary protection, logistics, and daily coordination so field conditions remain clear as the work advances.",
      practices: [
        {
          id: "safe_plan",
          title: "Site safety planning",
          description:
            "Logistics, temporary protection, and trade sequencing are reviewed before mobilization and ahead of major phase changes.",
          sortOrder: 1,
        },
        {
          id: "safe_daily",
          title: "Daily site coordination",
          description:
            "Superintendents align crews on access, temporary controls, and site conditions that change as the building advances.",
          sortOrder: 2,
        },
        {
          id: "safe_training",
          title: "Worker orientation",
          description:
            "New workers receive site orientation covering access routes, temporary protection, and emergency muster points.",
          sortOrder: 3,
        },
        {
          id: "safe_ppe",
          title: "PPE and site controls",
          description:
            "Required personal protective equipment and temporary site controls stay visible and enforced for occupied or constrained work.",
          sortOrder: 4,
        },
        {
          id: "safe_emergency",
          title: "Emergency preparedness",
          description:
            "Muster points, first-aid locations, and emergency contacts are posted and reviewed with trade partners.",
          sortOrder: 5,
        },
        {
          id: "safe_review",
          title: "Safety reviews",
          description:
            "Field leadership reviews incidents, near misses, and temporary protection adjustments with the project team.",
          sortOrder: 6,
        },
      ],
      showInNavigation: true,
      sortOrder: 1,
    },
    {
      id: "opt_privacy",
      title: "Privacy Policy",
      slug: "privacy",
      headline: "Privacy Policy",
      effectiveDate: "January 1, 2026",
      intro:
        "This notice explains how this company website may collect and use information when you contact the project team or browse published pages. It is sample tenant content for the template preview.",
      sections: [
        {
          id: "privacy-intro",
          heading: "Introduction",
          content:
            "This Privacy Policy describes how personal information may be handled when you use this website or submit a project inquiry.\n\nIt applies to information collected through this website only. It is not a certification claim and should be replaced with the tenant’s approved legal text before production use.",
          sortOrder: 1,
        },
        {
          id: "privacy-collect",
          heading: "Information We Collect",
          content:
            "Depending on how you use the site, we may collect:\n\n- Contact details you submit through an inquiry form, such as name, company, email, and phone\n- Project details you choose to share, such as location and scope notes\n- Technical information commonly provided by browsers, such as device type or approximate location derived from IP address",
          sortOrder: 2,
        },
        {
          id: "privacy-use",
          heading: "How We Use Information",
          content:
            "Information submitted through the site is used to:\n\n1. Respond to project inquiries and schedule discussions\n2. Route messages to the appropriate preconstruction or operations contact\n3. Improve website clarity and performance where analytics are enabled by the tenant",
          sortOrder: 3,
        },
        {
          id: "privacy-share",
          heading: "Information Sharing",
          content:
            "Personal information is not sold. It may be shared with service providers who host the website, deliver email, or support form processing, only as needed to operate the site and respond to inquiries.\n\nInformation may also be disclosed when required by law.",
          sortOrder: 4,
        },
        {
          id: "privacy-security",
          heading: "Data Security",
          content:
            "Reasonable administrative and technical safeguards are used to protect information submitted through the website. No method of transmission over the internet is completely secure.",
          sortOrder: 5,
        },
        {
          id: "privacy-rights",
          heading: "Your Rights",
          content:
            "Depending on your location, you may have rights to request access, correction, or deletion of personal information held about you in connection with this website.\n\nUse the Contact page to submit a privacy-related request.",
          sortOrder: 6,
        },
        {
          id: "privacy-contact",
          heading: "Contact",
          content:
            "Questions about this Privacy Policy can be directed through the website Contact page or the phone and email listed in the site footer.",
          sortOrder: 7,
        },
      ],
      showInNavigation: false,
      sortOrder: 2,
    },
    {
      id: "opt_terms",
      title: "Terms & Conditions",
      slug: "terms",
      headline: "Terms & Conditions",
      effectiveDate: "January 1, 2026",
      intro:
        "These terms describe the conditions for using this company website. They are sample tenant content for the template preview and are not a project contract.",
      sections: [
        {
          id: "terms-acceptance",
          heading: "Acceptance of Terms",
          content:
            "By accessing this website, you agree to these Terms & Conditions.\n\nIf you do not agree, do not use the site. Construction services remain governed by separate project agreements, not by this page alone.",
          sortOrder: 1,
        },
        {
          id: "terms-use",
          heading: "Website Use",
          content:
            "You may browse published pages and submit inquiries for legitimate business purposes.\n\nYou agree not to:\n\n- Attempt to disrupt or overload the website\n- Submit false or misleading inquiry information intentionally\n- Scrape or republish site content without permission",
          sortOrder: 2,
        },
        {
          id: "terms-content",
          heading: "Site Content",
          content:
            "Project descriptions, photographs, and company information on this site are provided for general information.\n\nThey do not constitute an offer, guarantee of availability, or contractual commitment unless confirmed in a signed agreement.",
          sortOrder: 3,
        },
        {
          id: "terms-inquiries",
          heading: "Project Inquiries",
          content:
            "Submitting an inquiry does not create a contract. Responses are provided for discussion only until a formal agreement is executed.",
          sortOrder: 4,
        },
        {
          id: "terms-liability",
          heading: "Limitation of Liability",
          content:
            "To the extent permitted by law, the company is not liable for damages arising from use of this website or reliance on general site information alone.\n\nThis limitation does not replace warranties or obligations set out in a signed construction contract.",
          sortOrder: 5,
        },
        {
          id: "terms-changes",
          heading: "Changes",
          content:
            "These terms may be updated from time to time. The effective date at the top of this page reflects the current version for this website.",
          sortOrder: 6,
        },
        {
          id: "terms-contact",
          heading: "Contact",
          content:
            "Questions about these Terms & Conditions can be directed through the website Contact page.",
          sortOrder: 7,
        },
      ],
      showInNavigation: false,
      sortOrder: 3,
    },
    {
      id: "opt_cookie",
      title: "Cookie Policy",
      slug: "cookie",
      headline: "Cookie Policy",
      effectiveDate: "January 1, 2026",
      intro:
        "This notice explains how cookies and similar technologies may be used on this website. It is sample tenant content for the template preview.",
      sections: [
        {
          id: "cookie-what",
          heading: "What Are Cookies",
          content:
            "Cookies are small text files stored on your device when you visit a website. They help the site function, remember preferences, or understand how pages are used.",
          sortOrder: 1,
        },
        {
          id: "cookie-how",
          heading: "How This Site May Use Cookies",
          content:
            "Depending on the tenant’s configuration, this website may use cookies to:\n\n- Support essential site functions and security\n- Remember basic preferences during a visit\n- Measure aggregate traffic and page performance when analytics are enabled",
          sortOrder: 2,
        },
        {
          id: "cookie-types",
          heading: "Types of Cookies",
          content:
            "Common categories include:\n\n1. Essential cookies required for core site operation\n2. Preference cookies that remember choices you make\n3. Analytics cookies that help understand site usage in aggregate",
          sortOrder: 3,
        },
        {
          id: "cookie-manage",
          heading: "Managing Cookies",
          content:
            "Most browsers allow you to control or delete cookies through settings. Blocking some cookies may affect how parts of the site work.\n\nIf a cookie consent tool is enabled for this tenant, you can update preferences there.",
          sortOrder: 4,
        },
        {
          id: "cookie-updates",
          heading: "Updates",
          content:
            "This Cookie Policy may change when site technologies or legal requirements change. The effective date above reflects the current version.",
          sortOrder: 5,
        },
        {
          id: "cookie-contact",
          heading: "Contact",
          content:
            "Questions about cookies on this website can be directed through the Contact page.",
          sortOrder: 6,
        },
      ],
      showInNavigation: false,
      sortOrder: 4,
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
