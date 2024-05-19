import { writeFile } from 'fs/promises';
import { globby } from 'globby';
import { statSync } from 'fs';

const websiteUrl = 'https://www.chronologicalagecalculator.org';
const sitemapPath = './public/sitemap.xml';

const languages = ['zh', 'en', 'bn', 'de', 'es', 'fr', 'it', 'pt',
  'si', 'ar', 'ja', 'ko', 'ru', 'tr', 'pl', 'hi', 'id', 'ms', 'th', 'vi',
  'nl', 'sv', 'uk', 'el', 'cs', 'hu', 'ro', 'da', 'fi', 'he', 'sk', 'bg'];
const defaultLanguage = 'en';

const generateUrlSet = (urls) => {
  return urls
    .map(({ url, lastmod }) => `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `).join('');
};

// Generate localized paths for static and dynamic pages
const generateLocalizedPaths = async (defaultLastmod) => {
  let urls = [];

  const pages = await globby([
    `app/[local]/**/*{.tsx,.ts}`,
    `!app/[local]/**/layout.tsx`, // Exclude special and API routes
    `!app/[local]/api/**`,
    `!app/[local]/about-us/**`,
    `!app/[local]/privacy-policy/**`,
    `!app/[local]/terms-of-service/**`,
  ]);

  const localizedUrls = pages.map(page => {
    const path = page
      .replace(`app/[local]`, '') // Remove base path
      .replace('/page.tsx', '')
      .replace('/page.ts', '')
      .replace('/index', '') // Correct root paths
      .replace(/\/\(.*?\)/g, '') // Remove content in parentheses
      || '/'; // Ensure homepage is correctly added

    const lastmod = statSync(page).mtime.toISOString();

    return {
      url: `${websiteUrl}${path}`,
      lastmod: defaultLastmod || lastmod,
    };
  });

  urls = [...urls, ...localizedUrls];
  for (const lang of languages) {
    if (lang === defaultLanguage) {
      continue; // Skip the default language
    }
    localizedUrls.map(({ url, lastmod }) => {
      const localizedUrl = url.replace(websiteUrl, `${websiteUrl}/${lang}`);
      urls.push({ url: localizedUrl, lastmod });
    });
  }

  // Replace the URLs using regular expressions
  const replacements = [
  ];

  urls = urls.map(({ url, lastmod }) => {
    let newUrl = url;
    for (const { pattern, replacement } of replacements) {
      newUrl = newUrl.replace(pattern, replacement);
    }
    return { url: newUrl, lastmod };
  });

  // Add dynamic route generation logic here if necessary
  // Example: You might query your database to generate URLs for dynamic routes

  return urls;
};

// Main function to generate the sitemap
const generateSitemap = async (defaultLastmod) => {
  const urls = await generateLocalizedPaths(defaultLastmod);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${generateUrlSet(urls)}
</urlset>`;

  await writeFile(sitemapPath, sitemap, { encoding: 'utf8' });
};

// Execute the script
const defaultLastmod = process.argv[2];
generateSitemap(defaultLastmod).catch(console.error);