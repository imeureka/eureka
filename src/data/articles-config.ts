// data/articles-config.ts
export interface ArticleConfig {
  slug: string;
  title: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  thumbnail?: string;
  date: string;
  tags: string[];
  readTime: number;
  featured: boolean;
  published: boolean; // 발행 여부 제어
  category?: string; // 카테고리 추가
  author?: string; // 작성자 추가
}

// 아티클 설정 목록
export const articlesConfig: ArticleConfig[] = [
  {
    slug: 'react-hooks-guide',
    title: {
      ko: 'React Hooks 시작하기',
      en: 'Getting Started with React Hooks',
    },
    description: {
      ko: 'React Hooks의 기본 개념과 useState 사용법을 알아보세요.',
      en: 'Learn the basic concepts of React Hooks and how to use useState.',
    },
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    date: '2024-01-15',
    tags: ['React', 'JavaScript', 'Frontend'],
    readTime: 8,
    featured: true,
    published: true,
    category: 'Frontend',
    author: 'Your Name',
  },
  {
    slug: 'typescript-advanced-tips',
    title: {
      ko: 'TypeScript 고급 활용법',
      en: 'Advanced TypeScript Tips',
    },
    description: {
      ko: 'TypeScript의 고급 기능들을 실무에 적용하는 방법을 알아보세요.',
      en: 'Learn how to apply advanced TypeScript features in real-world projects.',
    },
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    date: '2024-01-20',
    tags: ['TypeScript', 'JavaScript', 'Development'],
    readTime: 12,
    featured: true,
    published: true,
    category: 'Development',
    author: 'Your Name',
  },
  {
    slug: 'nextjs-performance',
    title: {
      ko: 'Next.js 성능 최적화 가이드',
      en: 'Next.js Performance Optimization Guide',
    },
    description: {
      ko: 'Next.js 애플리케이션의 성능을 극대화하는 실전 팁들을 소개합니다.',
      en: 'Practical tips to maximize the performance of your Next.js applications.',
    },
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    date: '2024-01-25',
    tags: ['Next.js', 'Performance', 'Web Development'],
    readTime: 15,
    featured: false,
    published: false, // 아직 발행하지 않음
    category: 'Performance',
    author: 'Your Name',
  },
];

// 유틸리티 함수들
export const getPublishedArticles = () => {
  return articlesConfig.filter((article) => article.published);
};

export const getFeaturedArticles = () => {
  return articlesConfig.filter((article) => article.published && article.featured);
};

export const getArticlesByCategory = (category: string) => {
  return articlesConfig.filter((article) => article.published && article.category === category);
};

export const getArticleBySlug = (slug: string) => {
  return articlesConfig.find((article) => article.slug === slug);
};
