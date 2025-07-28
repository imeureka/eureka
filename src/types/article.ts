export interface Article {
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
  readTime: number; // 분 단위
  featured: boolean;
}

export interface ArticleContent {
  metadata: Article;
  content: {
    en: string;
    ko: string;
  };
}

export type Language = 'en' | 'ko';
