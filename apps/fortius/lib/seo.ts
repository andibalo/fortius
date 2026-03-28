import type { Metadata } from 'next';

/**
 * Change this one constant to update every URL across the entire site
 * (sitemap, robots, OG images, canonical links).
 */
export const SITE_URL = 'https://fortius.gg';

/**
 * Page registry — adding an entry here automatically includes it in
 * the sitemap. Keep this updated as new pages are added.
 */
export const SITE_PAGES = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' as const },
  { path: '/tournament', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/shop', priority: 0.8, changeFrequency: 'weekly' as const },
];

const defaultDescription =
  'Fortius is a syndicate of elite talent, strategic minds, and creative visionaries competing across Valorant, Mobile Legends, and PUBG Mobile.';

/**
 * Shared metadata defaults. Root layout spreads this and adds
 * `metadataBase` + `title.template`.
 */
export const defaultMetadata = {
  description: defaultDescription,
  keywords: [
    'esports',
    'valorant',
    'mobile legends',
    'pubg mobile',
    'competitive gaming',
    'fortius esports',
    'gaming team',
  ],
  authors: [{ name: 'Fortius Esports', url: SITE_URL }],
  creator: 'Fortius Esports',
  publisher: 'Fortius Esports',
};

interface PageMetadataOptions {
  /** Short page title — the template adds " | Fortius Esports" automatically. */
  title: string;
  /** Page-specific description. Falls back to site default if omitted. */
  description?: string;
  /** Route path e.g. "/tournament". Used for canonical URL and OG url. */
  path: string;
  /** Extra keywords merged with the site defaults. */
  keywords?: string[];
  /** Override the OG image path. Defaults to the root /opengraph-image. */
  ogImagePath?: string;
}

/**
 * Call this in every page file to generate consistent, fully-formed metadata.
 *
 * @example
 * // app/tournament/page.tsx
 * export const metadata = createPageMetadata({
 *   title: 'Tournaments',
 *   description: 'Compete in Fortius esports tournaments across SEA.',
 *   path: '/tournament',
 * });
 */
export function createPageMetadata(options: PageMetadataOptions): Metadata {
  const { title, description, path, keywords = [], ogImagePath } = options;
  const url = `${SITE_URL}${path}`;
  const desc = description ?? defaultMetadata.description;
  const image = ogImagePath ?? '/opengraph-image';

  return {
    title,
    description: desc,
    keywords: [...defaultMetadata.keywords, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: `${title} | Fortius Esports`,
      description: desc,
      images: [{ url: image, width: 1200, height: 630, alt: `${title} — Fortius Esports` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Fortius Esports`,
      description: desc,
      images: [image],
    },
  };
}
