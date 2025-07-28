import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'src/app/_content/articles');

export interface ArticleMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured?: boolean;
  slug: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

export function getAllArticles(): Article[] {
  const fileNames = fs.readdirSync(articlesDirectory);

  const articles = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags || [],
        featured: data.featured || false,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      featured: data.featured || false,
    };
  } catch (error) {
    return null;
  }
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((article) => article.featured);
}
