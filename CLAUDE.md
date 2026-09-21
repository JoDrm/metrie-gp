# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **Metrie GP**, a 3D laser scanning / Scan-to-BIM studio in Guadeloupe.
The site is deliberately scoped to **Guadeloupe only** — one territory covered in depth ranks better than five covered shallowly. Do not reintroduce Martinique / Guyane / Saint-Martin / Saint-Barthélemy copy.
Astro 4 static site, French-language (`lang="fr"`), deployed to Vercel via `@astrojs/vercel/static`.
All user-facing copy is in French — keep it that way, including comments in content files.

## Commands

```bash
npm run dev      # dev server (astro dev)
npm run build    # static build to dist/ (also type-checks .astro props via Astro)
npm run preview  # serve the built dist/
```

No test suite, linter, or formatter is configured. `npm run build` is the only verification gate — run it after non-trivial changes.

## Architecture

### Content vs. presentation split

- `src/siteConfig.ts` — **single source of truth** for business identity (SIREN, RCS, VAT, address, phone list, founder), `serviceArea` (Guadeloupe communes, grouped by Grande-Terre / Basse-Terre / Îles du Sud), `specs`, `services`, and `navLinks`. Never hardcode any of these in a page; import from here. Legal pages, JSON-LD and the generated service pages all read from it.
- **`specs` is the only place public figures may come from** (portée, précision relative/absolue, LOD, délais). The home page and the FAQ previously disagreed on precision (±2 cm vs ±1,2 cm); route every new claim through `specs` so that cannot recur.
- **`services` drives real pages.** Each entry generates `/services/<slug>` — H1, sections, deliverables, formats, use cases, FAQ (→ FAQPage schema) and `related` blog slugs (→ two-way internal linking). Adding a service = adding an object here, no new file.
- `src/lib/schema.ts` — schema.org JSON-LD builders (`organizationSchema`, `websiteSchema`, `breadcrumbSchema`, `faqSchema`, `blogPostingSchema`, `serviceSchema`, `itemListSchema`, `equipmentSchema`), all derived from `siteConfig`. `organizationSchema` carries the LocalBusiness signals Google expects: `areaServed` (region + communes), `serviceArea` GeoCircle, `priceRange`, `openingHoursSpecification`.
- `src/lib/date.ts` — `formatDate` (French long form), `isoDate`, `readingTime`.

### Layout contract

Every page renders through `src/layouts/Layout.astro`, which takes a typed props object and wires up SEO + structured data automatically:

- `title`, `description`, `path` (required) → `SeoHead.astro` builds canonical URL, OG/Twitter tags, hreflang. Title is suffixed with `· Metrie GP` unless it already contains the name.
- `breadcrumbs` → appended as BreadcrumbList JSON-LD.
- `extraSchema` → page-specific JSON-LD (FAQ on `/`, BlogPosting on articles).
- `active` → highlights the matching nav link; `navVariant`, `bodyClass`, `hideFooter` control chrome.
- `<slot name="head">` for extra `<head>` tags (blog uses it for `article:*` meta).

Pages should not emit their own `<title>`, canonical, or organization JSON-LD.

### Styling — two systems, deliberately

1. `public/styles.css` (~4300 lines, served as a static `<link>`, not bundled) owns the base reset, CSS custom properties (`--bg`, `--ink`, `--accent`, …), and **all page/component classes** (`.nav`, `.page-title`, `.block`, `.devis-form`, `.blog-card`, `.demo-*`, `.scanner-viewer-*`, …). This is where the design system actually lives.
2. Tailwind (`src/styles/tailwind.css`) is loaded **utilities-only** — `applyBaseStyles: false` and no `@tailwind base`, so it cannot fight the stylesheet above. `tailwind.config.mjs` maps its color tokens onto the same CSS variables.

Prefer extending `public/styles.css` for anything structural; use Tailwind utilities for one-off layout tweaks inside a page. Component-scoped `<style>` blocks exist too (see `SimulateurNuage.astro`).

**Theming:** an inline script in `Layout.astro` sets `document.documentElement.dataset.theme` from `localStorage` before paint, **defaulting to `dark`**. Dark overrides in `styles.css` are scoped as `html[data-theme="dark"] body.page-content` — a page using a different `bodyClass` (e.g. `page-immersive` on `/demo`) opts out and is styled dark unconditionally. New dark rules must follow that selector shape or they won't apply.

### SEO — what is load-bearing

Changes here have ranking consequences; don't undo them casually.

- **Sitemap `lastmod` is computed per URL** in `astro.config.mjs` (blog frontmatter dates for posts, source-file mtime for the rest). It used to be `new Date()` on every URL, which made the freshness signal worthless. `customPages` was removed — every page is a real route now; priorities live in `serialize`.
- **The hero Sketchfab iframe on `/` is deferred** (`data-src` + load on `window.load`/idle). Restoring a direct `src` puts a multi-MB WebGL embed back on the LCP path of the most important page. `/projets` uses an equivalent IntersectionObserver deferral.
- **Google Fonts load non-blocking** (`media="print"` + `onload`, with a `<noscript>` fallback) in `SeoHead.astro`.
- **Images**: A full favicon set at the `public/` root (`favicon.ico`, `.svg`, `site.webmanifest`) replaced a 1.1 MB `scanner.png` favicon; `og-metrie-gp.jpg` and `scanner.jpg` are the optimized derivatives. `scanner.png` (1.1 MB) is now unreferenced — kept only as the source for regenerating those with `sips`.
- `/rss.xml` is a hand-rolled endpoint (`src/pages/rss.xml.ts`, no `@astrojs/rss` dependency) and is declared in `SeoHead.astro`.

### Blog

Astro content collection defined in `src/content/config.ts` (zod schema: `title`, `description`, `pubDate` required; `draft`, `tags`, `cover`, `keywords`, … optional).

- Adding a post = drop a `.md` in `src/content/blog/`; filename is the slug. Push → Vercel rebuilds.
- Files prefixed `_` are ignored by Astro — that is why `_template.md` (the authoring guide, in French) is never published.
- `draft: true` posts render in dev but are filtered out of `getStaticPaths` when `import.meta.env.PROD`.

### 3D scenes

`three` is bundled through Vite (`ssr.noExternal: ['three']`). Two independent scripts, each mounted by DOM id and lazily loaded from an inline `<script>` in the page that owns it:

- `src/scripts/scanner-scene.js` → `#scene-container` on `/demo`: animated LiDAR sweep with EffectComposer/UnrealBloom, driven by the range inputs in the page's control panel.
- `src/scripts/scanner-viewer.js` → `#scanner-viewer` on `/outils`: auto-orbiting GLB viewer.

Both throw or bail if their mount element is absent, so they must stay page-scoped. GLB assets live in `public/assets/` and are served with immutable cache headers set in `vercel.json`.

### Forms, cookies, routing

- Contact form posts directly to `https://formsubmit.co/contact@metrie-gp.fr` — no backend, no API routes. The page's inline script only handles progressive disclosure of the "Autre" fields.
- The pricing simulator (`SimulateurNuage.astro`) computes `A * (1 - exp(-s / K_DENOM)) + s * FLOOR_PER_M2 + TRAVEL_FEE` client-side and prefills `/contact` via query params. Constants sit in the component frontmatter.
- `public/cookies.js` is a self-contained CNIL-compliant consent banner, loaded `is:inline` on every page; it exposes `window.MetrieCookies.open()` and dispatches a `cookie-consent` event. No analytics are wired in yet — hook them to that event rather than loading them unconditionally.
- `vercel.json` holds legacy `.html` → clean-URL redirects and security/cache headers. `trailingSlash: 'never'`; sitemap entries and priorities are configured in `astro.config.mjs`, so new top-level pages should be added to its `customPages`/`serialize` logic.

## Gotchas

- `/demo` is thin (~115 words) and exists for the interactive scene, not for search. `/outils` and `/services` are now in `navLinks` (they were orphaned before).
- `public/assets/scanner-stand.glb` is **36 MB** and `trion-p2.glb` is 6.8 MB. Both are fetch-gated in JS, but the stand model still needs Draco/meshopt compression via `gltf-transform` — that is the largest remaining performance item and requires installing tooling.
- `src/pages/projets.astro` uses a `TODO = 'à préciser'` sentinel for unverified case-study figures (surface, délai, précision). Grep `TODO` there before claiming the page is complete; don't invent values.
- Business/legal figures (SIREN, capital, RCS) are real and appear in legal pages and JSON-LD — change them only when explicitly asked.
