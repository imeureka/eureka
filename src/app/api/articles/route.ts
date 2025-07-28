import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getPublishedArticles } from '@/data/articles-config';

interface ArticleResponse {
  id: string;
  slug: string;
  title: {
    en: string;
    ko: string;
  };
  description: {
    en: string;
    ko: string;
  };
  thumbnail: string;
  date: string;
  tags: string[];
  readTime: number;
  featured: boolean;
  category?: string;
  author?: string;
}

// 마크다운 파일 존재 여부 확인 (src 폴더 구조 대응)
function checkMarkdownFiles(slug: string): { ko: boolean; en: boolean } {
  // src 폴더 구조에 맞게 경로 수정
  const articlesDirectory = path.join(process.cwd(), 'src/data/articles');

  console.log(`🔍 Looking for files in: ${articlesDirectory}`);

  const koPath = path.join(articlesDirectory, `${slug}.ko.md`);
  const enPath = path.join(articlesDirectory, `${slug}.en.md`);

  const koExists = fs.existsSync(koPath);
  const enExists = fs.existsSync(enPath);

  console.log(`📄 ${slug}.ko.md: ${koExists ? '✅' : '❌'} (${koPath})`);
  console.log(`📄 ${slug}.en.md: ${enExists ? '✅' : '❌'} (${enPath})`);

  return { ko: koExists, en: enExists };
}

export async function GET() {
  try {
    console.log('🔄 API called - loading articles from config file');

    // 설정 파일에서 발행된 아티클들 가져오기
    const configArticles = getPublishedArticles();
    console.log(`📋 Found ${configArticles.length} published articles in config`);

    const articles: ArticleResponse[] = [];

    for (const configArticle of configArticles) {
      try {
        console.log(`🔄 Processing article: ${configArticle.slug}`);

        // 마크다운 파일 존재 여부 확인
        const markdownFiles = checkMarkdownFiles(configArticle.slug);

        // 최소한 한 언어의 마크다운 파일은 있어야 함
        if (!markdownFiles.ko && !markdownFiles.en) {
          console.warn(`⚠️ No markdown files found for ${configArticle.slug}, skipping`);
          continue;
        }

        console.log(`✅ Processing ${configArticle.slug} (ko: ${markdownFiles.ko}, en: ${markdownFiles.en})`);

        const article: ArticleResponse = {
          id: configArticle.slug,
          slug: configArticle.slug,
          title: configArticle.title,
          description: configArticle.description,
          thumbnail: configArticle.thumbnail || '',
          date: configArticle.date,
          tags: configArticle.tags,
          readTime: configArticle.readTime,
          featured: configArticle.featured,
          category: configArticle.category,
          author: configArticle.author,
        };

        articles.push(article);
      } catch (error) {
        console.error(`❌ Error processing article ${configArticle.slug}:`, error);
      }
    }

    // 날짜순 정렬 (최신순)
    articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.log(`✅ Returning ${articles.length} validated articles`);
    console.log(`📊 Articles: ${articles.map((a) => a.slug).join(', ')}`);

    return NextResponse.json(articles);
  } catch (error) {
    console.error('💥 Error fetching articles:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch articles',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
