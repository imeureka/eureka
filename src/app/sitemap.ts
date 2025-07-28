import { MetadataRoute } from 'next';
// 서버에서만 실행되므로 직접 import 가능
import { getAllArticleSlugs } from '@/lib/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourdomain.com'; // 실제 도메인으로 변경
  const slugs = getAllArticleSlugs();

  const articleUrls = slugs.map((slug) => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...articleUrls,
  ];
}
