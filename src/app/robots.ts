import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    sitemap: 'https://yourdomain.com/sitemap.xml', // 여기에 실제 도메인 입력
  };
}
