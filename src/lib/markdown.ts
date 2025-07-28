import 'server-only'; // 서버에서만 실행되도록 보호

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { Article, Language } from '@/types/article';

const articlesDirectory = path.join(process.cwd(), 'data/articles');

export interface MarkdownArticle extends Article {
  content: string;
}

// 마크다운 파일에서 아티클 메타데이터 추출
export function getArticleBySlug(slug: string): Article | null {
  try {
    // 영어 파일을 기준으로 메타데이터 가져오기
    const enFilePath = path.join(articlesDirectory, `${slug}.en.md`);
    const koFilePath = path.join(articlesDirectory, `${slug}.ko.md`);

    if (!fs.existsSync(enFilePath)) return null;

    const enFileContents = fs.readFileSync(enFilePath, 'utf8');
    const koFileContents = fs.existsSync(koFilePath) ? fs.readFileSync(koFilePath, 'utf8') : enFileContents;

    const enMatterResult = matter(enFileContents);
    const koMatterResult = matter(koFileContents);

    const article: Article = {
      id: slug,
      slug,
      title: {
        en: enMatterResult.data.title || '',
        ko: koMatterResult.data.title || enMatterResult.data.title || '',
      },
      description: {
        en: enMatterResult.data.description || '',
        ko: koMatterResult.data.description || enMatterResult.data.description || '',
      },
      thumbnail: enMatterResult.data.thumbnail || '/images/articles/default.jpg',
      date: enMatterResult.data.date || new Date().toISOString().split('T')[0],
      tags: enMatterResult.data.tags || [],
      readTime: enMatterResult.data.readTime || 5,
      featured: enMatterResult.data.featured || false,
    };

    return article;
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

// 마크다운 콘텐츠를 HTML로 변환
export async function getMarkdownContent(slug: string, language: Language): Promise<string> {
  try {
    const filePath = path.join(articlesDirectory, `${slug}.${language}.md`);

    // 해당 언어 파일이 없으면 영어 파일 사용
    const finalPath = fs.existsSync(filePath) ? filePath : path.join(articlesDirectory, `${slug}.en.md`);

    if (!fs.existsSync(finalPath)) {
      throw new Error(`Markdown file not found: ${finalPath}`);
    }

    const fileContents = fs.readFileSync(finalPath, 'utf8');
    const matterResult = matter(fileContents);

    // 마크다운을 HTML로 변환
    const processedContent = await remark()
      .use(remarkGfm) // GitHub Flavored Markdown 지원
      .use(html, { sanitize: false })
      .process(matterResult.content);

    return processedContent.toString();
  } catch (error) {
    console.error(`Error processing markdown for ${slug}:`, error);
    return '<p>Content not available</p>';
  }
}

// 모든 아티클 슬러그 가져오기 (정적 생성용)
export function getAllArticleSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(articlesDirectory);
    const slugs = new Set<string>();

    fileNames.forEach((fileName) => {
      if (fileName.endsWith('.md')) {
        // 'article-name.en.md' -> 'article-name'
        const slug = fileName.replace(/\.(en|ko)\.md$/, '');
        slugs.add(slug);
      }
    });

    return Array.from(slugs);
  } catch (error) {
    console.error('Error reading articles directory:', error);
    return [];
  }
}

// 모든 아티클 목록 가져오기
export function getAllArticles(): Article[] {
  const slugs = getAllArticleSlugs();
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
