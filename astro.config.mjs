import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://metrie-gp.fr';

/* ------------------------------------------------------------------
   lastmod réel, par page.
   Avant : `lastmod: new Date()` posait la date du build sur les 19 URLs,
   y compris des articles vieux de trois mois. Google dévalue un sitemap
   dont tout change à chaque déploiement — le signal de fraîcheur devient
   inutilisable. On calcule donc une date par URL :
     · articles  → updatedDate / pubDate du frontmatter
     · /blog     → date de l'article le plus récent
     · le reste  → date de modification du fichier source
   ------------------------------------------------------------------ */
function blogDates() {
  const dir = path.resolve('./src/content/blog');
  const map = new Map();
  if (!fs.existsSync(dir)) return map;
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.md') || file.startsWith('_')) continue;
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    if (/^draft:\s*true\s*$/m.test(raw)) continue;
    const updated = raw.match(/^updatedDate:\s*(\S+)/m);
    const published = raw.match(/^pubDate:\s*(\S+)/m);
    const stamp = (updated || published)?.[1];
    if (stamp) map.set(file.replace(/\.md$/, ''), new Date(stamp));
  }
  return map;
}

const BLOG = blogDates();
const NEWEST_POST = [...BLOG.values()].sort((a, b) => b - a)[0];

function sourceMtime(...candidates) {
  const stamps = candidates
    .map((rel) => path.resolve(rel))
    .filter((abs) => fs.existsSync(abs))
    .map((abs) => fs.statSync(abs).mtime);
  return stamps.sort((a, b) => b - a)[0];
}

function lastmodFor(url) {
  const route = url.replace(SITE, '').replace(/\/$/, '') || '/';

  if (route.startsWith('/blog/')) return BLOG.get(route.slice('/blog/'.length));
  if (route === '/blog') return NEWEST_POST;
  if (route.startsWith('/services/'))
    return sourceMtime('src/pages/services/[slug].astro', 'src/siteConfig.ts');
  if (route === '/services') return sourceMtime('src/pages/services/index.astro', 'src/siteConfig.ts');
  if (route === '/') return sourceMtime('src/pages/index.astro');
  return sourceMtime(`src/pages${route}.astro`);
}

export default defineConfig({
  site: SITE,
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: false,
  }),
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
      configFile: './tailwind.config.mjs',
    }),
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      // 404 et pages légales n'ont rien à faire en tête de sitemap.
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const route = item.url.replace(SITE, '').replace(/\/$/, '') || '/';

        if (route === '/') {
          item.priority = 1.0;
          item.changefreq = 'monthly';
        } else if (route === '/services') {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else if (route.startsWith('/services/')) {
          // Les pages services portent l'intention commerciale : priorité haute.
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else if (route === '/projets') {
          item.priority = 0.8;
        } else if (route === '/contact') {
          item.priority = 0.8;
        } else if (route === '/blog') {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        } else if (route.startsWith('/blog/')) {
          item.priority = 0.6;
        } else if (route === '/mentions-legales' || route === '/confidentialite') {
          item.priority = 0.2;
          item.changefreq = 'yearly';
        }
        // Landings d'acquisition : cibles principales du SEO local,
        // juste sous la home.
        if (route === '/scan-3d-guadeloupe' || route === '/plans-permis-de-construire-guadeloupe') {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        }

        const stamp = lastmodFor(item.url);
        if (stamp) item.lastmod = stamp.toISOString();
        else delete item.lastmod;

        return item;
      },
    }),
  ],
  vite: {
    ssr: { noExternal: ['three'] },
  },
});
