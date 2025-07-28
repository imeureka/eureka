import { Article } from '@/types/article';

export const articlesData: Article[] = [
  {
    id: '1',
    slug: 'react-hooks-guide',
    title: {
      en: 'Complete Guide to React Hooks',
      ko: 'React Hooks 완벽 가이드',
    },
    description: {
      en: 'Learn everything about React Hooks from useState to custom hooks with practical examples.',
      ko: 'useState부터 커스텀 훅까지 실용적인 예제와 함께 React Hooks의 모든 것을 배워보세요.',
    },
    thumbnail: '/images/articles/react-hooks-thumb.jpg',
    date: '2024-01-15',
    tags: ['React', 'JavaScript', 'Frontend'],
    readTime: 8,
    featured: true,
  },
  {
    id: '2',
    slug: 'typescript-tips',
    title: {
      en: '10 TypeScript Tips for Better Code',
      ko: '더 나은 코드를 위한 TypeScript 팁 10가지',
    },
    description: {
      en: 'Essential TypeScript tips and tricks to write more maintainable and type-safe code.',
      ko: '더 유지보수하기 좋고 타입 안전한 코드를 작성하기 위한 필수 TypeScript 팁들입니다.',
    },
    thumbnail: '/images/articles/typescript-tips-thumb.jpg',
    date: '2024-01-10',
    tags: ['TypeScript', 'JavaScript', 'Development'],
    readTime: 6,
    featured: false,
  },
  {
    id: '3',
    slug: 'css-grid-layout',
    title: {
      en: 'Mastering CSS Grid Layout',
      ko: 'CSS Grid 레이아웃 마스터하기',
    },
    description: {
      en: 'Create complex responsive layouts with CSS Grid. From basics to advanced techniques.',
      ko: 'CSS Grid로 복잡한 반응형 레이아웃을 만들어보세요. 기초부터 고급 기법까지.',
    },
    thumbnail: '/images/articles/css-grid-thumb.jpg',
    date: '2024-01-05',
    tags: ['CSS', 'Layout', 'Web Design'],
    readTime: 12,
    featured: true,
  },
  {
    id: '4',
    slug: 'nextjs-performance',
    title: {
      en: 'Next.js Performance Optimization',
      ko: 'Next.js 성능 최적화',
    },
    description: {
      en: 'Boost your Next.js application performance with these proven optimization techniques.',
      ko: '검증된 최적화 기법들로 Next.js 애플리케이션의 성능을 향상시켜보세요.',
    },
    thumbnail: '/images/articles/nextjs-performance-thumb.jpg',
    date: '2023-12-28',
    tags: ['Next.js', 'Performance', 'React'],
    readTime: 10,
    featured: false,
  },
  {
    id: '5',
    slug: 'accessibility-web',
    title: {
      en: 'Web Accessibility Best Practices',
      ko: '웹 접근성 모범 사례',
    },
    description: {
      en: 'Build inclusive web applications that work for everyone with these accessibility guidelines.',
      ko: '접근성 가이드라인으로 모든 사용자를 위한 포용적인 웹 애플리케이션을 구축하세요.',
    },
    thumbnail: '/images/articles/accessibility-thumb.jpg',
    date: '2023-12-20',
    tags: ['Accessibility', 'UX', 'Web Standards'],
    readTime: 7,
    featured: false,
  },
  {
    id: '6',
    slug: 'modern-javascript',
    title: {
      en: 'Modern JavaScript Features You Should Know',
      ko: '알아야 할 모던 JavaScript 기능들',
    },
    description: {
      en: 'Explore the latest JavaScript features that will make your code more elegant and efficient.',
      ko: '코드를 더 우아하고 효율적으로 만들어줄 최신 JavaScript 기능들을 알아보세요.',
    },
    thumbnail: '/images/articles/modern-js-thumb.jpg',
    date: '2023-12-15',
    tags: ['JavaScript', 'ES6+', 'Programming'],
    readTime: 9,
    featured: true,
  },
  {
    id: '7',
    slug: 'react-best-practices',
    title: {
      en: 'React Best Practices for 2024',
      ko: '2024년 React 모범 사례',
    },
    description: {
      en: 'Stay up-to-date with the latest React best practices and patterns for modern web development.',
      ko: '최신 웹 개발을 위한 React 모범 사례와 패턴들로 트렌드를 따라가세요.',
    },
    thumbnail: '/images/articles/react-best-practices-thumb.jpg',
    date: '2023-12-10',
    tags: ['React', 'Best Practices', 'Frontend'],
    readTime: 11,
    featured: false,
  },
  {
    id: '8',
    slug: 'web-performance',
    title: {
      en: 'Web Performance Optimization Guide',
      ko: '웹 성능 최적화 가이드',
    },
    description: {
      en: 'Comprehensive guide to optimizing web performance for better user experience.',
      ko: '더 나은 사용자 경험을 위한 웹 성능 최적화 종합 가이드입니다.',
    },
    thumbnail: '/images/articles/web-performance-thumb.jpg',
    date: '2023-12-05',
    tags: ['Performance', 'Web', 'Optimization'],
    readTime: 15,
    featured: true,
  },
];

// 유틸리티 함수들
export const getAllArticles = (): Article[] => {
  return articlesData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getFeaturedArticles = (limit?: number): Article[] => {
  const featured = articlesData.filter((article) => article.featured);
  const sorted = featured.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // limit이 설정되어 있으면 해당 개수만 반환
  if (limit && limit > 0) {
    // 추천 글이 limit보다 많으면 자르기
    if (sorted.length >= limit) {
      return sorted.slice(0, limit);
    }

    // 추천 글이 부족하면 최신 글로 채움
    const allSorted = getAllArticles();
    const needed = limit - sorted.length;
    const additional = allSorted.filter((article) => !article.featured).slice(0, needed);

    return [...sorted, ...additional];
  }

  return sorted;
};

export const getArticleBySlug = (slug: string): Article | null => {
  return articlesData.find((article) => article.slug === slug) || null;
};

export const getArticlesByTag = (tag: string): Article[] => {
  return articlesData.filter((article) => article.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
};

export const searchArticles = (query: string): Article[] => {
  const searchTerm = query.toLowerCase();
  return articlesData.filter(
    (article) =>
      article.title.en.toLowerCase().includes(searchTerm) ||
      article.title.ko.toLowerCase().includes(searchTerm) ||
      article.description.en.toLowerCase().includes(searchTerm) ||
      article.description.ko.toLowerCase().includes(searchTerm) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
  );
};
