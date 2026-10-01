import type { BlogArticleBlock } from "@/templates/shared/cms/types/blog";
import { demoMedia } from "../demo-media";

/** Demo long-form body for CMS-1327 — replace via CMS `sections` when available. */
export const coordinationArticleSections: BlogArticleBlock[] = [
  {
    type: "heading",
    id: "why-coordination-breaks-down",
    level: 2,
    title: "Why coordination breaks down",
  },
  {
    type: "paragraph",
    body:
      "Complex commercial projects rarely fail because of one dramatic event. They stall in the space between decisions — when information lives in separate threads, when responsibility is unclear, or when the field learns about a change after materials are already moving.",
  },
  {
    type: "paragraph",
    body:
      "On occupied sites, the gaps show up faster. A corridor that was supposed to stay open closes for an hour longer than planned. An inspection window moves and three trades adjust at the last minute. None of these are mysteries; they are coordination problems that were visible earlier but not shared widely enough.",
  },
  {
    type: "list",
    ordered: false,
    items: [
      "Disconnected information between office and field",
      "Unclear ownership for sequencing decisions",
      "Late owner or design responses that compress the field schedule",
      "Trade mobilization before the previous scope is verified ready",
    ],
  },
  {
    type: "paragraph",
    body:
      "Better coordination does not mean more meetings. It means fewer surprises because the sequence, the open items, and the next decision are visible to the people who have to act on them.",
  },
  {
    type: "heading",
    id: "start-with-a-shared-sequence",
    level: 2,
    title: "Start with a shared sequence",
  },
  {
    type: "paragraph",
    body:
      "Before mobilization, the team should agree on a published sequence: what releases when, which long-lead items gate the schedule, and where owner decisions must land. That sequence belongs to superintendents and trade foremen as much as it belongs to preconstruction.",
  },
  {
    type: "paragraph",
    body:
      "Dependencies should be written in plain language — not buried in a schedule PDF that nobody opens on site. Procurement, access, inspections, and turnover requirements should read as one story.",
  },
  {
    type: "image",
    image: demoMedia.plans,
    caption: "Planning and sequencing reviewed before trades mobilize.",
    layout: "full",
  },
  {
    type: "heading",
    id: "keep-decisions-visible",
    level: 2,
    title: "Keep decisions visible",
  },
  {
    type: "paragraph",
    body:
      "RFI responses, approved substitutions, meeting actions, and change information should reach the superintendent in time to adjust the look-ahead. When decisions stay in email chains, the field improvises — and improvisation is expensive on complex work.",
  },
  {
    type: "quote",
    text: "Coordination works when everyone can see what happens next.",
  },
  {
    type: "paragraph",
    body:
      "Owners, architects, project managers, superintendents, and trade partners do not need the same level of detail — but they need a consistent record. A single coordination log beats a folder of disconnected attachments.",
  },
  {
    type: "heading",
    id: "connect-office-and-field",
    level: 2,
    title: "Connect office and field",
  },
  {
    type: "paragraph",
    body:
      "Preconstruction sets the baseline. Project controls maintain cost and schedule against that baseline. Superintendents translate the plan into weekly field reality. When those roles stay linked, changes do not surprise the owner committee two weeks after the field already adjusted.",
  },
  {
    type: "highlight",
    body: "Preconstruction → Project management → Superintendent → Field team\n\nInformation should move in both directions: field conditions upstream, decisions and releases downstream.",
  },
  {
    type: "image",
    image: demoMedia.worker,
    caption: "Field coordination during active commercial work.",
    layout: "inline",
  },
  {
    type: "heading",
    id: "protect-the-next-trade",
    level: 2,
    title: "Protect the next trade",
  },
  {
    type: "paragraph",
    body:
      "Every trade inherits the previous trade's finish. Hold points exist so steel is verified before deck follows, so rough-in is complete before close-in, so infection-control barriers are in place before the next crew enters a healthcare corridor.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Confirm site readiness and access",
      "Verify quality against the issued documents",
      "Release materials and manpower only when the prior scope is accepted",
      "Record the handoff in the weekly look-ahead",
    ],
  },
  {
    type: "callout",
    title: "Field note",
    body: "The best project teams do not wait for a problem to become urgent before they coordinate around it.",
  },
  {
    type: "heading",
    id: "what-better-coordination-changes",
    level: 2,
    title: "What better coordination changes",
  },
  {
    type: "paragraph",
    body:
      "When coordination improves, owners hear about conflicts earlier — with options, not apologies. Superintendents spend less time reordering work that could have been sequenced correctly on paper. Trades trust the release dates because they see the same look-ahead the GC publishes.",
  },
  {
    type: "paragraph",
    body:
      "The goal is not perfect certainty. Complex buildings will still change. The goal is predictable delivery: fewer last-minute collisions, clearer accountability, and a field team that is building from a shared plan.",
  },
  {
    type: "image",
    image: demoMedia.steel,
    caption: "Structural sequence coordinated beside ongoing operations.",
    credit: "Alden Commercial Builders",
    layout: "full",
  },
  {
    type: "heading",
    id: "final-takeaway",
    level: 2,
    title: "Final takeaway",
  },
  {
    type: "paragraph",
    body:
      "Better coordination is not another layer added to construction. It is the system that keeps the work connected — from the first price to the last punch item.",
  },
  {
    type: "quote",
    text: "When the sequence is shared, the field can focus on building — not guessing.",
  },
];
