# Vertex CMS — Construction Website Template System

Production frontend template engine for Vertex CMS construction company websites.

**Not** the Vertex CMS dashboard/admin application.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

## Design source of truth

[Figma — VertexBuild Template](https://www.figma.com/design/9yPqDhS7FE1D5seb4aPRN3/VertexBuild-Template)

Theme token values in code are placeholders until Figma variables are synced (requires file access).

## Development

```bash
npm install
npm run dev
```

- Index: `http://localhost:3000`
- Template preview: `http://localhost:3000/preview/corporate-construction`

## Architecture

```
CMS data (typed contract + mock)
        ↓
Template registry (select template)
        ↓
TemplateShell (theme + branding CSS variables)
        ↓
Template-specific pages/sections
        ↓
Public responsive site
```
