# Portfolio - Next.js App

Personal portfolio built with Next.js App Router, React, Tailwind, and Supabase.

## Project Structure

```text
app/                  Next.js routes and pages
components/
  layout/             navbar, footer, and global layout components
  pages/              full page-specific views
  sections/
    about/            sections used by the About page
    home/             sections used by the homepage
  ui/                 reusable UI components
  feedback/           empty states and fallback notices
content/
  site/               static and localized site content
  fallback/           local content used when Supabase is unavailable
lib/
  content/            loaders and helpers for dynamic/local content
  supabase/           server-side Supabase client and utilities
  i18n.js             localization and route helpers
  utils.js            shared utilities
providers/            global React providers
hooks/                custom hooks
config/               remaining technical config (for example i18n)
supabase/             SQL schema and database setup
public/               static assets
fonts/                local fonts used by the project
```

## Conventions

- Editorial content lives in `content/site/`.
- Local fallback content lives in `content/fallback/`.
- Data loaders live in `lib/content/`.
- Homepage sections live in `components/sections/home/` with explicit names such as `HeroSection.jsx`.
- Full page views live in `components/pages/`.

## Local Development

```bash
npm run dev
```

## Verification

```bash
npm run lint
npm run build
```
