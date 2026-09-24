# OSS Cameroon website

Fresh Next.js 14 App Router rebuild of the OSS Cameroon marketing and directory site.

## Run locally

```bash
npm install
npm run dev
npm run build
npm run start
```

## Data seam

Seed data lives in `src/lib/data/`. The app uses async functions (`getDevelopers`, `queryDevelopers`, `getProjects`, `queryProjects`) so a real API can replace the in-memory arrays without changing page or card components.

## URL contract

- `/developers`: `q`, `expertise`, `sort`, `page`, `open=true`, repeatable or comma-separated `tech`.
- Developer modal: `/developers?dev=<id>`; it closes by removing `dev` and is linkable.
- `/projects`: `q`, `stars`, `sort`, `page`, repeatable or comma-separated `lang`.

Search, select, chip, and checkbox changes reset `page` to `1`.

## Assets

Images under `public/assets/**` are low-resolution layout placeholders from the design handoff. Replace them before shipping with real photography plus official Python, Laravel, and Flutter community logos.
