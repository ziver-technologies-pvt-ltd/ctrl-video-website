import { MetadataRoute } from 'next';
import { getLatestRelease } from '@/lib/github';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://ctrl-video.ziver.co.in';
  let releaseDate = new Date();

  try {
    const release = await getLatestRelease();
    releaseDate = new Date(release.publishedAt);
  } catch {
    // fallback
  }

  return [
    {
      url: base,
      lastModified: releaseDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/download`,
      lastModified: releaseDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];
}
