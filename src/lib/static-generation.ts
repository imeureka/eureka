import 'server-only';
import { Metadata } from 'next';
import { getAllArticleSlugs, getArticleBySlug } from './markdown';

// 정적 파라미터 생성 (빌드 타임)
export async function generateArticleStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

// SEO 메타데이터 생성 (빌드 타임)
export async function generateArticleMetadata(slug: string): Promise<Metadata> {
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  const title = article.title.ko || article.title.en;
  const description = article.description.ko || article.description.en;

  return {
    title: `${title} | Your Blog Name`,
    description,
    keywords: article.tags.join(', '),
    authors: [{ name: 'Your Name' }],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: article.date,
      tags: article.tags,
      images: [
        {
          url: article.thumbnail,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [article.thumbnail],
    },
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
  };
}
