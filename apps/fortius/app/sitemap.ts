import type { MetadataRoute } from 'next';
import { SITE_URL, SITE_PAGES } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
