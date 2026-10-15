import type { CmsSitePayload } from "@/templates/shared/cms/types";
import { createEnvelope } from "@/templates/shared/cms/types/cms-state";
import { coordinationArticleSections } from "./blog-article-sections/coordination-keeps-projects-moving";
import { demoMedia } from "./demo-media";

export const mockCmsSitePayload: CmsSitePayload = {
  company: createEnvelope({
    name: "Alden Commercial Builders",
    headline: "Commercial construction for owners who need a steady delivery partner",
    tagline: "Midwest commercial builder",
    description:
      "Alden Commercial Builders plans and builds occupied, phased, and ground-up commercial work for healthcare, education, workplace, and industrial clients.\n\nProject teams stay with the work from early pricing through closeout, so owners have one point of accountability for schedule, field coordination, and turnover.",
    aboutSupporting: [
      "Complex schedules, occupied buildings, and multi-trade coordination are planned with the same team that will run the field.",
      "Superintendents, preconstruction, and project controls stay aligned through weekly reporting so owners have one accountable record.",
    ],
    aboutHistory: {
      eyebrow: "Our history",
      headline: "Built over decades. Still close to the work.",
      image: demoMedia.worker,
      milestones: [
        { year: "1978", title: "Company founded" },
        { year: "Later", title: "Regional growth" },
        { year: "Today", title: "Commercial construction practice" },
      ],
    },
    aboutHowWeWork: {
      eyebrow: "How we work",
      headline: "The same team stays close from first conversation to closeout.",
      intro:
        "Commercial work breaks down when planning, pricing, and field execution live in separate conversations. Alden keeps preconstruction, superintendents, and project controls on one thread — from early scope conversations through turnover.\n\n" +
        "That continuity shows up in weekly reporting, published phase plans, and superintendents who were in the room when the schedule was set.",
      principles: [
        { title: "Early involvement", body: "Constructability and logistics are reviewed before numbers are issued, not after buyout." },
        { title: "Clear communication", body: "Owners see the same look-ahead and open-item list the field uses every week." },
        { title: "Field accountability", body: "Superintendents run the published plan and escalate changes through one project record." },
        { title: "Quality control", body: "Hold points and inspections are sequenced before the next trade mobilizes." },
        { title: "Closeout discipline", body: "Documentation, punch, and commissioning are tracked alongside the last interior finishes." },
      ],
    },
    aboutLeadership: {
      eyebrow: "Leadership",
      headline: "Leadership that stays close to the work.",
      intro:
        "Leadership here is measured in decisions that reach the field — how phases are released, how trades are coordinated, and how owners get a straight answer when the plan shifts.",
      image: demoMedia.steel,
      leaders: [
        { role: "President / CEO", teamMemberId: "team_jordan", note: "Owner relationships and preconstruction alignment for healthcare and workplace accounts." },
        { role: "VP, Operations", teamMemberId: "team_marcus", note: "Superintendents, site logistics, and day-to-day field coordination." },
        { role: "VP, Preconstruction", teamMemberId: "team_priya", note: "Estimates, schedules, and constructability before mobilization." },
      ],
    },
    aboutOfficeToField: {
      eyebrow: "From office to field",
      headline: "One team. Different places. Same responsibility.",
      statement: "The people who price and plan the work stay accountable to the superintendents who run it.",
      image: demoMedia.hero,
      stages: [
        { label: "Preconstruction", body: "Plans, budgets and sequencing." },
        { label: "Office", body: "Coordination, documentation and decisions." },
        { label: "Field", body: "Supervision, quality and safety." },
        { label: "Closeout", body: "Documentation, commissioning and handover." },
      ],
    },
    aboutBeliefs: {
      eyebrow: "What we believe",
      headline: "A few things don't change.",
      principles: [
        {
          title: "Accountability",
          body: "The people responsible for the plan\nstay close to the work that delivers it.",
        },
        {
          title: "Clarity",
          body: "Owners, designers and field teams should\nknow what happens next and why.",
        },
        {
          title: "Safety",
          body: "Every project decision begins with the\npeople working on and around the site.",
        },
        {
          title: "Quality",
          body: "Details are checked before they become\nproblems.",
        },
        {
          title: "Respect",
          body: "Good projects depend on trust across\nowners, designers, trades and field teams.",
        },
      ],
    },
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
        image: demoMedia.towers,
        sortOrder: 2,
      },
      {
        id: "svc_precon",
        title: "Preconstruction",
        slug: "preconstruction",
        summary: "Budgets, schedules, and logistics before mobilization.",
        description:
          "Preconstruction covers conceptual estimates, milestone schedules, long-lead review, and site logistics so the owner can decide scope before the field starts.",
        image: demoMedia.plans,
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
        image: demoMedia.renovation,
        sortOrder: 5,
      },
      {
        id: "svc_inst",
        title: "Institutional Construction",
        slug: "institutional-construction",
        summary: "Healthcare and education projects with phased occupancy.",
        description:
          "Institutional projects coordinate infection-control or campus constraints, owner user groups, and inspections without treating the building as an empty site.",
        image: demoMedia.education,
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
        beforeImage: demoMedia.renovation,
        afterImage: demoMedia.healthcare,
        metadata: {
          sector: "Healthcare",
          scope: "Core and shell with phased interior build-out",
          duration: "22 months",
          status: "ongoing",
          buildingType: "commercial",
          deliveryMethod: "General contracting",
        },
        introduction:
          "The owner needed clinic and imaging capacity on a campus where the main hospital entries could not close. The addition had to tie into existing utilities, match infection-control expectations, and release floors for occupancy while steel and envelope work continued nearby.\n\n" +
          "That combination — tight urban site, active healthcare operations, and a four-story structural frame — made the delivery approach as important as the drawings.\n\n" +
          "The team treated discovery and phasing as the first deliverable: map what could not stop, then build the schedule and temporary controls around those constraints.",
        deliveryStages: [
          {
            slug: "discover",
            narrative:
              "Walk-throughs with facilities and clinical staff documented which entries, routes, and departments had to stay open without exception. Existing utilities, vibration limits, and after-hours delivery windows were recorded before pricing was finalized.\n\n" +
              "Geotechnical and structural reviews confirmed how the new frame would tie into the campus without compromising the active hospital wing.",
            insight: {
              title: "Key consideration",
              body: "Patient access and emergency routes were fixed constraints — every later phase was sequenced backward from that list.",
            },
            images: [demoMedia.plans, demoMedia.renovation],
          },
          {
            slug: "plan",
            narrative:
              "Preconstruction aligned scope, budget, and the three-phase occupancy plan with the owner’s capital team. Long-lead imaging equipment and switchgear releases were tracked alongside structural and envelope packages.\n\n" +
              "Trade coordination focused on after-hours steel deliveries, protected walkways, and a weekly look-ahead shared with hospital operations.",
            milestones: [
              { label: "Preconstruction", title: "Budget + scope alignment" },
              { label: "Phasing", title: "Occupied-area sequencing" },
              { label: "Procurement", title: "Long-lead coordination" },
              { label: "Ready to build", title: "Field execution plan established" },
            ],
            images: [demoMedia.plans],
          },
          {
            slug: "build",
            narrative:
              "Structural steel rose beside the existing entry with a protected walkway and phased hoist operations. Envelope and MEP rough-in followed the published sequence so inspections did not overlap with active clinic days.\n\n" +
              "Interior build-out released floor by floor as temporary partitions and infection-control barriers moved with the work.",
            buildPhases: [
              { label: "Foundation & structure", description: "Frame tied to campus utilities with vibration monitoring." },
              { label: "Enclosure", description: "Curtain wall and roofing sequenced between occupancy windows." },
              { label: "Interior", description: "Clinic and imaging shells released by floor." },
              { label: "Completion", description: "Punch and owner fit-out coordination." },
            ],
            progress: {
              currentPhaseLabel: "Interior build-out",
              milestoneLabels: ["Structure complete", "Envelope closed", "Level 3 released for inspection"],
            },
            images: [demoMedia.steel, demoMedia.healthcare, demoMedia.worker],
          },
          {
            slug: "control",
            narrative:
              "Superintendents, project controls, and the owner’s facilities group reviewed the same weekly report: schedule, open items, inspections, and temporary controls changing that week.",
            controlPillars: [
              { label: "Quality", body: "Hold points for steel, envelope, and infection-control barriers before the next trade mobilized." },
              { label: "Safety", body: "Site controls and pedestrian separation reviewed before each phase shift." },
              { label: "Schedule", body: "Three-week look-ahead published to trades and hospital operations every Monday." },
              { label: "Cost", body: "Change and contingency tracked against the agreed phase releases." },
              { label: "Coordination", body: "Architect, owner equipment vendors, and field trades in one coordination log." },
            ],
          },
          {
            slug: "deliver",
            narrative:
              "Closeout documentation, commissioning support, and punch were organized by floor so clinical areas could open as they were accepted.\n\n" +
              "The same team that priced the job remained the point of contact through turnover and owner fit-out coordination.",
            images: [demoMedia.interior],
          },
        ],
        outcome: {
          eyebrow: "Project outcome",
          summary:
            "From early campus coordination through interior build-out, the pavilion work was sequenced around operating entries and clinical schedules — with one team carrying continuity from discovery to turnover.",
        },
        relatedProjectSlugs: ["north-campus-science-hall", "westbridge-distribution-hall"],
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
        beforeImage: demoMedia.concrete,
        afterImage: demoMedia.industrial,
        metadata: {
          sector: "Industrial",
          scope: "Ground-up building and site work",
          duration: "14 months",
          status: "completed",
          buildingType: "commercial",
        },
        introduction:
          "The owner needed a cross-dock hall with trailer courts and a raised platform for sortation equipment. Racks and sortation had to install after the envelope closed, so the structure, slab, and utility yard had to be set with the equipment vendor before that work was covered.",
        deliveryStages: [
          {
            slug: "discover",
            narrative:
              "The brief was a ground-up distribution building: trailer courts, a mezzanine for sortation, and a path for the owner's equipment to install without reopening the envelope.\n\n" +
              "Openings, slab recesses, and the utility yard had to be known before the structure was released.",
            insight: {
              title: "Key consideration",
              body: "Sortation equipment had to land after the envelope closed. The slab and utility yard were planned backward from that install.",
            },
            images: [demoMedia.industrial],
          },
          {
            slug: "plan",
            narrative:
              "Preconstruction coordinated the structure, slab, and utility yard with the equipment vendor so racks and sortation could install on the published sequence.",
            milestones: [
              { label: "Scope", title: "Trailer courts, mezzanine, and equipment platform" },
              { label: "Vendor", title: "Sortation layout set before envelope close-in" },
              { label: "Site", title: "Slab and dock wall sequence" },
              { label: "Ready to build", title: "Ground-up structure and site work released" },
            ],
            images: [demoMedia.plans],
          },
          {
            slug: "build",
            narrative:
              "Field work followed the slab and dock wall sequence, then the structure and envelope, so the equipment platform was ready without reopening finished work.",
            buildPhases: [
              { label: "Slab & docks", description: "Slab and dock walls sequenced for the trailer courts." },
              { label: "Structure", description: "Frame and mezzanine for the sortation platform." },
              { label: "Envelope", description: "Closed before the equipment install." },
              { label: "Equipment ready", description: "Utility yard and platform left clear for the vendor." },
            ],
            images: [demoMedia.concrete, demoMedia.industrial],
          },
          {
            slug: "control",
            narrative:
              "The field record tracked the vendor install against the envelope. Changes to openings or the utility yard were written before that work was covered.",
            controlPillars: [
              { label: "Coordination", body: "Structure, slab, and utility yard reviewed with the equipment vendor." },
              { label: "Sequence", body: "The envelope stayed closed for the rack and sortation install." },
              { label: "Quality", body: "Dock and slab hold points cleared before the next sequence." },
            ],
          },
          {
            slug: "deliver",
            narrative:
              "The hall was completed in 2023. Racks and sortation could install without reopening the envelope.",
            images: [demoMedia.industrial],
          },
        ],
        outcome: {
          eyebrow: "Project outcome",
          summary:
            "A ground-up distribution hall, coordinated with the equipment vendor so racks and sortation could install without reopening the envelope.",
        },
        relatedProjectSlugs: ["lakeshore-outpatient-pavilion", "harbor-exchange-workplace"],
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
        beforeImage: demoMedia.renovation,
        afterImage: demoMedia.education,
        metadata: {
          sector: "Education",
          scope: "Interior renovation",
          duration: "11 months",
          status: "completed",
          buildingType: "commercial",
        },
        introduction:
          "Teaching laboratories had to be rebuilt without missing a fall term. The campus calendar left two summer windows, and corridor protection had to keep the rest of the hall usable around that work.",
        deliveryStages: [
          {
            slug: "discover",
            narrative:
              "The owner needed laboratory classrooms rebuilt between academic terms. Fall classes could not move, so the available time was two summer windows.\n\n" +
              "Mechanical risers, casework rough-in, and the corridors students would still use were the constraints recorded before the schedule was published.",
            insight: {
              title: "Key consideration",
              body: "The campus calendar was fixed. Every later release was sequenced inside the two summer windows.",
            },
            images: [demoMedia.education],
          },
          {
            slug: "plan",
            narrative:
              "Preconstruction set mechanical risers, lab casework rough-in, and corridor protection against the campus calendar so the rooms could open with fall classes.",
            milestones: [
              { label: "Calendar", title: "Two summer windows" },
              { label: "Systems", title: "Mechanical risers and casework rough-in" },
              { label: "Protection", title: "Corridors kept usable around the labs" },
              { label: "Ready to build", title: "Work released to finish before fall classes" },
            ],
            images: [demoMedia.plans],
          },
          {
            slug: "build",
            narrative:
              "The laboratories were rebuilt inside the two summer windows. Corridor protection moved with the work so the rest of the hall stayed on the campus calendar.",
            buildPhases: [
              { label: "First summer", description: "Riser and rough-in work inside the first window." },
              { label: "Protection", description: "Corridors separated from the laboratory rooms." },
              { label: "Second summer", description: "Remaining classrooms completed before term." },
              { label: "Open", description: "Rooms released for fall classes." },
            ],
            images: [demoMedia.renovation, demoMedia.education],
          },
          {
            slug: "control",
            narrative:
              "The field record followed the campus calendar. A room did not release until risers, casework rough-in, and corridor protection for that window were closed.",
            controlPillars: [
              { label: "Schedule", body: "Both summer windows published against the academic term." },
              { label: "Protection", body: "Corridor protection held so adjacent space stayed usable." },
              { label: "Quality", body: "Riser and casework hold points cleared before a room was called complete." },
            ],
          },
          {
            slug: "deliver",
            narrative:
              "The renovation was completed in 2023. Fall classes opened in the rebuilt laboratories on the campus calendar.",
            images: [demoMedia.education],
          },
        ],
        outcome: {
          eyebrow: "Project outcome",
          summary:
            "Teaching laboratories rebuilt in two summer windows, with mechanical risers, casework, and corridor protection planned so fall classes could open on schedule.",
        },
        relatedProjectSlugs: ["lakeshore-outpatient-pavilion", "harbor-exchange-workplace"],
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
          status: "completed",
          buildingType: "commercial",
        },
        introduction:
          "The building stayed occupied. Lobby, core restrooms, and three workplace floors had to be updated while other tenants remained, and the lobby had to reopen each morning.",
        deliveryStages: [
          {
            slug: "discover",
            narrative:
              "Other tenants stayed in the building through the work. The lobby, core restrooms, and three workplace floors were the scope, and the lobby could not stay closed during the day.\n\n" +
              "Noisy work and finish work had to be split before a crew was released.",
            insight: {
              title: "Key consideration",
              body: "The lobby had to reopen each morning. Noisy work was planned for after hours around that rule.",
            },
            images: [demoMedia.commercial],
          },
          {
            slug: "plan",
            narrative:
              "Preconstruction split after-hours noisy work from daytime finishes so the lobby, restrooms, and workplace floors could move without closing the building.",
            milestones: [
              { label: "Occupancy", title: "Other tenants remained in the building" },
              { label: "Lobby", title: "Reopen each morning" },
              { label: "Floors", title: "Three workplace floors and core restrooms" },
              { label: "Ready to build", title: "After-hours and daytime work published separately" },
            ],
            images: [demoMedia.plans],
          },
          {
            slug: "build",
            narrative:
              "Base-building work and the workplace interiors followed that split. Noisy work ran after hours. Daytime crews returned to finishes so the lobby could open in the morning.",
            buildPhases: [
              { label: "Lobby", description: "Base-building refresh with a morning reopen." },
              { label: "Core", description: "Restrooms sequenced around tenants still in the building." },
              { label: "Floors", description: "Three workplace floors, finishes in daytime hours." },
              { label: "Furniture ready", description: "Floors left clear before furniture." },
            ],
            images: [demoMedia.commercial, demoMedia.interior],
          },
          {
            slug: "control",
            narrative:
              "The field record separated after-hours noisy work from daytime finishes. A morning lobby opening was the hold point for the night's work.",
            controlPillars: [
              { label: "Occupancy", body: "Tenants remained. Work was limited to the published floors and the lobby." },
              { label: "Hours", body: "Noisy work after hours. Finishes during the day." },
              { label: "Handoff", body: "The lobby was cleared to reopen each morning." },
            ],
          },
          {
            slug: "deliver",
            narrative:
              "The base-building refresh and workplace interiors were completed in 2022, with the building occupied through the work.",
            images: [demoMedia.interior],
          },
        ],
        outcome: {
          eyebrow: "Project outcome",
          summary:
            "Lobby, core restrooms, and three workplace floors updated while other tenants stayed in the building, with the lobby reopened each morning.",
        },
        relatedProjectSlugs: ["lakeshore-outpatient-pavilion", "north-campus-science-hall"],
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
      {
        id: "tst_sample_2",
        quote:
          "Sample client note: the preconstruction team flagged long-lead switchgear early enough that our opening date never moved. This quote is fictional demonstration copy, not a verified endorsement.",
        personName: "Sample campus planner",
        personRole: "Director of Capital Projects",
        companyName: "Sample university",
        sortOrder: 2,
      },
      {
        id: "tst_sample_3",
        quote:
          "Sample client note: the superintendent walked our clinical staff through each phase before it started, so operations were never surprised. This quote is fictional demonstration copy, not a verified endorsement.",
        personName: "Sample operations lead",
        personRole: "Vice President, Facilities",
        companyName: "Sample health system",
        sortOrder: 3,
      },
    ],
  }),

  blog: createEnvelope({
    items: [
      {
        id: "post_featured_coordination",
        title: "How Better Coordination Keeps Complex Projects Moving",
        slug: "how-better-coordination-keeps-projects-moving",
        excerpt:
          "A practical look at the coordination decisions, field communication, and documentation practices that help keep complex commercial work moving.",
        body:
          "Complex commercial projects rarely fail in a single dramatic moment. They stall in small gaps — a delivery that was not confirmed, a hold point that was skipped, a corridor that was not protected before the next trade arrived.\n\n" +
          "Better coordination starts with a published sequence everyone can see: owners, designers, superintendents, and trade foremen working from the same look-ahead.\n\n" +
          "When that record is maintained weekly, the field team spends less time reacting and more time building.",
        sections: coordinationArticleSections,
        image: demoMedia.steel,
        imageCaption: "Construction coordination during structural work.",
        category: "Project Delivery",
        author: "Marcus Ellison",
        authorProfile: {
          name: "Marcus Ellison",
          role: "Project Delivery",
          teamMemberId: "team_marcus",
          bio: "Oversees superintendents and field coordination on complex commercial work. Demo author bio for template preview.",
        },
        tags: ["Project Delivery", "Coordination", "Field Operations", "Construction Management"],
        relatedSlugs: [
          "coordination-decisions-that-keep-projects-moving",
          "from-preconstruction-to-handover",
          "what-field-teams-need-from-project-documentation",
        ],
        publishedAt: "2026-10-08",
        readingTimeMinutes: 12,
        featured: true,
        status: "published",
        locale: "en",
        seo: {
          title: "How Better Coordination Keeps Complex Projects Moving",
          description:
            "A practical look at coordination, field communication, and documentation on complex commercial projects.",
          canonicalPath: "/blog/how-better-coordination-keeps-projects-moving",
        },
        sortOrder: 1,
      },
      {
        id: "post_coordination_decisions",
        title: "The Coordination Decisions That Keep Projects Moving",
        slug: "coordination-decisions-that-keep-projects-moving",
        excerpt: "Where coordination actually happens — and what gets documented before the next trade starts.",
        body: "Sample article body for template preview.",
        image: demoMedia.crane,
        category: "Project Delivery",
        author: "Elena Vargas",
        publishedAt: "2026-09-22",
        readingTimeMinutes: 6,
        status: "published",
        sortOrder: 2,
      },
      {
        id: "post_field_documentation",
        title: "What Field Teams Need From Project Documentation",
        slug: "what-field-teams-need-from-project-documentation",
        excerpt: "Drawings, RFIs, and look-aheads only help when they reach the superintendent in time to act.",
        body: "Sample article body for template preview.",
        image: demoMedia.plans,
        category: "Field Operations",
        author: "Marcus Ellison",
        publishedAt: "2026-09-05",
        readingTimeMinutes: 7,
        status: "published",
        sortOrder: 3,
      },
      {
        id: "post_occupied_spaces",
        title: "Planning Around Occupied Spaces",
        slug: "planning-around-occupied-spaces",
        excerpt: "Phasing, temporary protection, and owner communication when the building stays open.",
        body: "Sample article body for template preview.",
        image: demoMedia.renovation,
        category: "Construction Management",
        author: "Priya Shah",
        publishedAt: "2026-08-18",
        readingTimeMinutes: 9,
        status: "published",
        sortOrder: 4,
      },
      {
        id: "post_phasing",
        title: "Phasing an occupied hospital addition without closing the front door",
        slug: "phasing-occupied-hospital-addition",
        excerpt:
          "How the Lakeshore team split structural, envelope, and interior work into three occupancy phases while the existing entries stayed open.",
        body:
          "Additions to working hospitals are planned backwards from what cannot stop: patient access, emergency routes, and clinical schedules.\n\n" +
          "Structural steel went up beside the existing entry with a protected walkway and after-hours deliveries.",
        image: demoMedia.healthcare,
        category: "Construction Management",
        author: "Marcus Ellison",
        publishedAt: "2026-08-01",
        readingTimeMinutes: 10,
        status: "published",
        sortOrder: 5,
      },
      {
        id: "post_safety_sequence",
        title: "Safety Is Built Into the Sequence",
        slug: "safety-built-into-the-sequence",
        excerpt: "Temporary controls and trade order are planned together — not added after mobilization.",
        body: "Sample article body for template preview.",
        image: demoMedia.concrete,
        category: "Safety",
        author: "Jordan Hale",
        publishedAt: "2026-07-15",
        readingTimeMinutes: 5,
        status: "published",
        sortOrder: 6,
      },
      {
        id: "post_precon_handover",
        title: "From Preconstruction to Handover",
        slug: "from-preconstruction-to-handover",
        excerpt: "Continuity from estimating through closeout when one team owns the record.",
        body: "Sample article body for template preview.",
        image: demoMedia.towers,
        category: "Project Delivery",
        author: "Priya Shah",
        publishedAt: "2026-07-02",
        readingTimeMinutes: 8,
        status: "published",
        sortOrder: 7,
      },
      {
        id: "post_communication",
        title: "Why Clear Communication Matters on Complex Sites",
        slug: "clear-communication-on-complex-sites",
        excerpt: "One coordination log beats a chain of side conversations when access and inspections change weekly.",
        body: "Sample article body for template preview.",
        image: demoMedia.worker,
        category: "Leadership",
        author: "Jordan Hale",
        publishedAt: "2026-06-10",
        readingTimeMinutes: 6,
        status: "published",
        sortOrder: 8,
      },
      {
        id: "post_data_decisions",
        title: "Using Better Data to Make Better Project Decisions",
        slug: "using-better-data-for-project-decisions",
        excerpt: "Schedule, cost, and field reports should tell the same story before leadership makes a call.",
        body: "Sample article body for template preview.",
        image: demoMedia.commercial,
        category: "Technology",
        author: "Elena Vargas",
        publishedAt: "2026-05-28",
        readingTimeMinutes: 7,
        status: "published",
        sortOrder: 9,
      },
      {
        id: "post_owner_expectations",
        title: "What Owners Should Expect During Construction",
        slug: "what-owners-should-expect-during-construction",
        excerpt: "Reporting rhythm, decision points, and how field conditions reach the owner team.",
        body: "Sample article body for template preview.",
        image: demoMedia.interior,
        category: "Construction Management",
        author: "Priya Shah",
        publishedAt: "2026-05-12",
        readingTimeMinutes: 6,
        status: "published",
        sortOrder: 10,
      },
      {
        id: "post_schedule_details",
        title: "The Details That Protect the Schedule",
        slug: "details-that-protect-the-schedule",
        excerpt: "Long-lead releases, inspection windows, and after-hours work — planned as one sequence.",
        body: "Sample article body for template preview.",
        image: demoMedia.industrial,
        category: "Field Operations",
        author: "Marcus Ellison",
        publishedAt: "2026-04-30",
        readingTimeMinutes: 5,
        status: "published",
        sortOrder: 11,
      },
      {
        id: "post_draft_sample",
        title: "Draft article (not public)",
        slug: "draft-sample",
        excerpt: "This post should not appear on the public blog listing.",
        body: "Draft content.",
        image: demoMedia.plans,
        category: "Project Delivery",
        status: "draft",
        sortOrder: 99,
      },
      {
        id: "post_archived_sample",
        title: "Archived article (not public)",
        slug: "archived-sample",
        excerpt: "This post should not appear on the public blog listing.",
        body: "Archived content.",
        image: demoMedia.education,
        category: "Leadership",
        status: "archived",
        publishedAt: "2024-01-01",
        sortOrder: 100,
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
      safetySections: [
        {
          number: 1,
          slug: "site-safety-planning",
          layoutType: "editorialSplit",
          title: "Site safety planning",
          description:
            "Logistics, temporary protection, and trade sequencing are reviewed before mobilization and ahead of major phase changes.",
          image: demoMedia.concrete,
          supportingItems: ["Site access", "Temporary protection", "Trade sequencing", "Phase transitions"],
        },
        {
          number: 2,
          slug: "daily-site-coordination",
          layoutType: "immersiveDark",
          title: "Daily site coordination",
          headline: "Daily coordination keeps the site moving.",
          description:
            "Superintendents coordinate crews around access, temporary controls, changing site conditions, and active work areas before work continues.",
          image: demoMedia.crane,
          supportingItems: ["Access", "Temporary controls", "Site conditions", "Trade coordination"],
        },
        {
          number: 3,
          slug: "worker-orientation",
          layoutType: "peopleFeature",
          title: "Worker orientation",
          headline: "Every worker should know the site before they start the work.",
          description: "New workers receive site orientation covering:",
          image: demoMedia.worker,
          supportingItems: [
            "Access routes",
            "Temporary protection",
            "Emergency procedures",
            "Muster points",
            "Site expectations",
          ],
        },
        {
          number: 4,
          slug: "ppe-site-controls",
          layoutType: "technicalList",
          title: "PPE and site controls",
          description:
            "Required personal protective equipment and temporary site controls stay visible and enforced for occupied or constrained work.",
          image: demoMedia.plans,
          supportingItems: [
            "Personal protective equipment",
            "Temporary protection",
            "Site access controls",
            "Occupied-area controls",
            "Restricted work areas",
          ],
        },
        {
          number: 5,
          slug: "emergency-preparedness",
          layoutType: "timeline",
          title: "Emergency preparedness",
          headline: "Prepared before the unexpected happens.",
          description:
            "Muster points, first-aid locations, emergency contacts, and response procedures are reviewed with trade partners.",
          timelineSteps: [
            { label: "Identify" },
            { label: "Prepare" },
            { label: "Communicate" },
            { label: "Respond" },
            { label: "Review" },
          ],
          supportingItems: ["Muster points", "First-aid locations", "Emergency contacts", "Trade partner communication"],
        },
        {
          number: 6,
          slug: "safety-reviews",
          layoutType: "evidence",
          title: "Safety reviews",
          headline: "Safety is reviewed throughout the work.",
          description:
            "Field leadership reviews incidents, near misses, and temporary protection adjustments with the project team — without waiting for closeout.",
          image: demoMedia.steel,
          evidenceFlow: [
            "Field review",
            "Incident / near miss",
            "Corrective action",
            "Follow-up",
            "Project team review",
          ],
        },
      ],
      showInNavigation: true,
      sortOrder: 1,
    },
    {
      id: "opt_specialty",
      title: "Specialty Contractor",
      slug: "specialty-contractor",
      headline: "Focused trade packages, coordinated like a single project record",
      heroImage: demoMedia.steel,
      body:
        "Specialty scopes — structure, envelope, interiors, and building systems — are released with the same look-ahead, RFIs, and superintendent coordination as core building work.\n\n" +
        "Trade partners and self-perform crews join a published phase plan. Access, temporary protection, and inspections are sequenced before the next package mobilizes so occupied and phased sites stay predictable.\n\n" +
        "Preconstruction prices scope, logistics, and long-lead items with the team that will run the field. Superintendents hold the same weekly record owners see for schedule, open items, and turnover readiness.",
      approachHeading: "How specialty work is organized",
      commitmentHeading: "Every trade package maps to the same superintendent plan.",
      commitmentBody:
        "Specialty contractors do not work from a parallel schedule — releases, hold points, and turnover lists stay on one project record from mobilization through closeout.",
      practices: [
        {
          id: "spec_structural",
          title: "Structural & concrete",
          description:
            "Formwork, reinforcing, and pour sequences are aligned to crane picks, shoring, and inspection hold points before the next level releases. The superintendent publishes that sequence before the crane is committed, so a hold point is not discovered after the pick is scheduled.",
          image: demoMedia.concrete,
          sortOrder: 1,
        },
        {
          id: "spec_envelope",
          title: "Building envelope",
          description:
            "Curtain wall, roofing, and waterproofing transitions are reviewed against interior fit-out releases and temporary protection requirements. Roof, sill, and slab-edge conditions are marked before interior trades close the wall.",
          image: demoMedia.towers,
          sortOrder: 2,
        },
        {
          id: "spec_mep",
          title: "Mechanical & electrical coordination",
          description:
            "Overhead routing, pad locations, and energization sequences are coordinated with ceiling grid, commissioning, and owner IT/security requirements. Routing is agreed before the ceiling grid is released, so energization does not wait on a redraw.",
          image: demoMedia.worker,
          sortOrder: 3,
        },
        {
          id: "spec_interiors",
          title: "Interiors & finishes",
          description:
            "Framing, drywall, and finish packages follow published corridor and occupancy phasing with shared punch and protection standards. Finish packages follow the occupancy plan, including protection of work the owner has already accepted.",
          image: demoMedia.interior,
          sortOrder: 4,
        },
        {
          id: "spec_renovation",
          title: "Renovation & occupied work",
          description:
            "Selective demolition, ICRA barriers, and after-hours work windows are planned with the same superintendent record as new construction phases. Occupied areas stay on that record so a renovation package is not scheduled as if the building were empty.",
          image: demoMedia.renovation,
          sortOrder: 5,
        },
        {
          id: "spec_closeout",
          title: "Systems closeout",
          description:
            "TAB, O&M manuals, training, and warranty items are tracked alongside finish punch so turnover is not deferred to the last week. A floor can be accepted without a separate specialty closeout waiting at the end of the job.",
          image: demoMedia.plans,
          sortOrder: 6,
        },
      ],
      specialtySections: [
        {
          number: 1,
          slug: "scope-clarity",
          layoutType: "introSplit",
          title: "Scope clarity",
          headline: "Trade packages start with constructible scope.",
          description:
            "Drawings, specifications, and alternates are reviewed with the superintendent before buyout so field releases match what was priced.",
          content:
            "Long-lead equipment, embedded items, and inspection milestones are flagged during preconstruction — not after mobilization.\n\n" +
            "Submittals, shop drawings, and alternates stay numbered with the core-building set. A specialty release cannot drift from the documents the superintendent is building from.\n\n" +
            "Before buyout, the field team marks what must be decided — embeds, openings, equipment pads, and inspection witnesses — and what can wait until the look-ahead.\n\n" +
            "When scope shifts, changes route through the same RFI and bulletin record the owner already receives for core building work.",
          image: demoMedia.plans,
        },
        {
          number: 2,
          slug: "trade-packages",
          layoutType: "tradeGrid",
          title: "Trade packages",
          headline: "Packages we routinely coordinate on commercial work.",
          description:
            "Each package below is sequenced against structure, envelope, and occupancy constraints — not treated as an isolated bid item.",
          content:
            "Structure releases first. Steel, miscellaneous metals, and concrete have to clear crane picks, shoring, and inspection hold points before the next level opens.\n\n" +
            "Envelope follows the structure. Curtain wall, roofing, and waterproofing are checked against interior fit-out dates and temporary protection so the building can close without trapping wet work.\n\n" +
            "Building systems and finishes then share one overhead and occupancy plan. Mechanical, electrical, fire protection, ceilings, and architectural finishes are bought as packages, then sequenced so concealment does not happen before the owner walk.",
          image: demoMedia.commercial,
          supportingItems: [
            "Structural steel & misc metals",
            "Cast-in-place & precast concrete",
            "Curtain wall & glazing",
            "Roofing & waterproofing",
            "Mechanical & plumbing",
            "Electrical & low voltage",
            "Drywall & acoustical ceilings",
            "Architectural finishes",
            "Fire protection",
          ],
        },
        {
          number: 3,
          slug: "coordination-rail",
          layoutType: "processRail",
          title: "Coordination",
          headline: "From release to turnover on one thread.",
          description:
            "Superintendents publish the same look-ahead specialty crews use for access, protection, and inspections.",
          content:
            "A package does not mobilize because a bid was awarded. It mobilizes when access, protection, and the previous hold point are written on the look-ahead.\n\n" +
            "Owners see the same thread: what released this week, what is waiting on an inspection, and what must be decided before the next trade arrives.",
          timelineSteps: [
            { label: "Scope & buyout", title: "Constructibility and logistics reviewed with field leadership." },
            { label: "Mobilize", title: "Access, protection, and orientations aligned to the phase plan." },
            { label: "Execute", title: "Hold points cleared before the next trade or level releases." },
            { label: "Inspect", title: "Third-party and owner witnesses scheduled in the look-ahead." },
            { label: "Turnover", title: "O&M, training, and warranty items tracked with punch." },
          ],
          supportingItems: ["Weekly look-ahead", "Shared punch record", "Owner reporting"],
        },
        {
          number: 4,
          slug: "self-perform",
          layoutType: "darkSpotlight",
          title: "Self-perform",
          headline: "When we self-perform, the same team owns the plan.",
          description:
            "Concrete, carpentry, and select interior packages run under the project superintendent — not a separate program.",
          content:
            "Crews attend the same coordination meetings, use the same protection standards, and close work through the same inspection checklist as partner trades.\n\n" +
            "Self-perform does not create a second schedule or a second safety program. Concrete, carpentry, and select interior crews take direction from the project superintendent.\n\n" +
            "When a self-perform package affects a partner trade — a pour that blocks a hoist, or carpentry that changes a corridor — it is written into the weekly look-ahead before the work starts.",
          image: demoMedia.crane,
        },
        {
          number: 5,
          slug: "delivery-model",
          layoutType: "metricsBand",
          title: "Delivery model",
          headline: "How owners experience specialty coordination",
          description:
            "These describe the coordination model on specialty packages — not performance guarantees.",
          content:
            "Owners should expect one plan, not a stack of trade schedules. Releases follow the published look-ahead. Open items live in one log. Closeout combines punch, training, and operation-and-maintenance documents instead of a separate specialty handover.\n\n" +
            "None of the items below are performance guarantees. They describe how the work is organized when the packages are coordinated under one superintendent plan.",
          metrics: [
            { label: "Coordination record", value: "One superintendent plan" },
            { label: "Release rhythm", value: "Published look-ahead" },
            { label: "Owner visibility", value: "Shared open-item log" },
            { label: "Closeout", value: "Combined punch & O&M" },
          ],
        },
        {
          number: 6,
          slug: "gc-integration",
          layoutType: "integrationSplit",
          title: "GC integration",
          headline: "Specialty partners work inside the general contract — not beside it.",
          description:
            "Design, preconstruction, and field teams stay aligned so specialty contractors inherit the same logistics, safety, and documentation standards as core building trades.",
          supportingItems: [
            "Shared BIM/coordination sessions for congested overhead zones",
            "Uniform site orientation and muster expectations",
            "Aligned temporary power, hoist, and laydown sequencing",
            "Common RFI, submittal, and bulletin numbering",
            "Joint owner walkthroughs before concealment",
            "Single closeout matrix for warranties and training",
          ],
          content:
            "When Alden holds the general contract, specialty partners receive releases that match the published phase plan — including occupancy restrictions and after-hours windows on renovation work.\n\n" +
            "Partners do not invent their own site rules. Orientation, muster points, temporary power, hoist time, and laydown are assigned from the general-contract plan.\n\n" +
            "Documentation uses the same numbers the owner already sees. Walkthroughs before concealment include the specialty partner and the superintendent, and the owner’s representative when the work will be covered.",
        },
        {
          number: 7,
          slug: "field-practices",
          layoutType: "practiceCards",
          title: "Field practices",
          headline: "What specialty coordination looks like on site.",
          description:
            "Representative packages from recent healthcare, workplace, and institutional work — described at the coordination level, not as marketing claims.",
          content:
            "These are the packages most often coordinated on healthcare, workplace, education, and industrial work. Each note describes how the package is sequenced. It is not a claim about volume, speed, or a certification.",
        },
      ],
      showInNavigation: true,
      sortOrder: 2,
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
    { label: "Blog", href: "/blog", pageSlug: "blog" },
    { label: "Contact", href: "/contact", pageSlug: "contact" },
    { label: "Safety", href: "/safety", pageSlug: "safety" },
    { label: "Specialty", href: "/specialty-contractor", pageSlug: "specialty-contractor" },
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
      pageSlug: "blog",
      title: "Blog",
      description:
        "Perspectives on construction, project delivery, coordination, and the work behind complex commercial projects.",
    },
    {
      pageSlug: "contact",
      title: "Contact",
      description: "Start a project conversation with Alden Commercial Builders.",
    },
  ]),
};
