import type { CmsSitePayload } from "@/templates/shared/cms/types";
import { createEnvelope } from "@/templates/shared/cms/types/cms-state";
import { demoMedia } from "@/data/demo-media";
import type { Project } from "@/templates/shared/cms/types/projects";
import type { TeamMember } from "@/templates/shared/cms/types/team";
import type { Testimonial } from "@/templates/shared/cms/types/testimonials";

export type TeamVariantId = "1" | "2" | "3" | "4" | "5" | "6" | "8" | "none";
export type ProjectsVariantId = "1" | "2" | "3" | "4" | "5" | "none";
export type TestimonialsVariantId = "none" | "1" | "3";

function teamNames(count: number): TeamMember[] {
  const roster: Array<[string, string, string?]> = [
    ["Jordan Hale", "President", "Leads owner relationships and preconstruction."],
    ["Priya Shah", "Vice President, Preconstruction", "Estimates, schedules, and constructability."],
    ["Marcus Ellison", "Vice President, Field Operations", "Superintendents and site logistics."],
    ["Elena Vargas", "Director of Project Controls", "Cost, schedule, and owner reporting."],
    ["Sam Rivera", "Senior Superintendent", "Healthcare and occupied-building phasing."],
    ["Alex Chen", "Preconstruction Manager", "Budget modeling and trade buyout."],
    ["Morgan Lee", "Safety Director", "Site safety programs and compliance."],
    ["Taylor Brooks", "Estimator", "Competitive bidding and scope review."],
  ];
  const portraits = [
    demoMedia.portrait1,
    demoMedia.portrait2,
    demoMedia.portrait3,
    demoMedia.portrait4,
    demoMedia.portrait1,
    demoMedia.portrait2,
    demoMedia.portrait3,
    demoMedia.portrait4,
  ];
  return roster.slice(0, count).map(([name, role, bio], index) => ({
    id: `team_qa_${index}`,
    name,
    role,
    bio,
    image: portraits[index],
    sortOrder: index + 1,
  }));
}

function projectStub(
  index: number,
  title: string,
  slug: string,
  summary: string,
  image: Project["image"],
): Project {
  return {
    id: `proj_qa_${index}`,
    title,
    slug,
    summary,
    featured: true,
    image,
    location: "Chicago, IL",
    year: 2024 - (index % 3),
    metadata: { sector: index % 2 === 0 ? "Healthcare" : "Industrial" },
    sortOrder: index + 1,
  };
}

function buildProjects(count: number): Project[] {
  const defs: Array<[string, string, string]> = [
    ["Lakeshore Outpatient Pavilion", "lakeshore-outpatient", "Ambulatory addition beside an active campus."],
    ["Westbridge Distribution Hall", "westbridge-distribution", "Cross-dock industrial with mezzanine sortation."],
    ["North Campus Science Hall", "north-campus-science", "Laboratory renovation between academic terms."],
    ["Harbor Office Core & Shell", "harbor-office", "Workplace base building with curtain wall envelope."],
    ["Midtown Clinical Renovation", "midtown-clinical", "Phased interior work in an occupied hospital."],
  ];
  const images = [
    demoMedia.healthcare,
    demoMedia.industrial,
    demoMedia.education,
    demoMedia.commercial,
    demoMedia.interior,
  ];
  return defs.slice(0, count).map(([title, slug, summary], index) =>
    projectStub(index, title, slug, summary, images[index]),
  );
}

const sampleTestimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Alden kept our outpatient expansion on schedule while the hospital remained fully operational. Weekly coordination with our facilities team was documented and actionable.",
    personName: "Director of Facilities",
    personRole: "Sample attribution",
    companyName: "Regional health system",
    sortOrder: 1,
  },
  {
    id: "t2",
    quote: "Preconstruction numbers tracked with the field reality. That consistency mattered on a fast-track TI.",
    personName: "Development Manager",
    companyName: "Workplace portfolio owner",
    sortOrder: 2,
  },
  {
    id: "t3",
    quote: "Superintendent communication was direct and professional through closeout.",
    personName: "Project Manager",
    companyName: "Institutional client",
    sortOrder: 3,
  },
];

export function isTeamVariant(value?: string): value is TeamVariantId {
  return Boolean(value && ["1", "2", "3", "4", "5", "6", "8", "none"].includes(value));
}

export function isProjectsVariant(value?: string): value is ProjectsVariantId {
  return Boolean(value && ["1", "2", "3", "4", "5", "none"].includes(value));
}

export function isTestimonialsVariant(value?: string): value is TestimonialsVariantId {
  return Boolean(value && ["none", "1", "3"].includes(value));
}

export function applyHomepageVariants(
  payload: CmsSitePayload,
  options: {
    team?: TeamVariantId;
    projects?: ProjectsVariantId;
    testimonials?: TestimonialsVariantId;
  },
): CmsSitePayload {
  let next = payload;

  if (options.team) {
    next = {
      ...next,
      team:
        options.team === "none"
          ? createEnvelope({ items: [] })
          : createEnvelope({ items: teamNames(Number(options.team)) }),
    };
  }

  if (options.projects) {
    next = {
      ...next,
      projects:
        options.projects === "none"
          ? createEnvelope({ items: [] })
          : createEnvelope({ items: buildProjects(Number(options.projects)) }),
    };
  }

  if (options.testimonials) {
    next = {
      ...next,
      testimonials:
        options.testimonials === "none"
          ? createEnvelope({ items: [] })
          : createEnvelope({
              items:
                options.testimonials === "1"
                  ? sampleTestimonials.slice(0, 1)
                  : sampleTestimonials,
            }),
    };
  }

  return next;
}
