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

// ---
// title: '"기계는 왜 학습하는가 : AI를 움직이는 우아한 수학" 을 읽고 1장'
// description: '기계학습의 출발점인 선형 모델과 지도학습 개념을 통해, 데이터에서 패턴을 찾는 원리를 이해합니다.
// 퍼셉트론과 헤브 학습 이론을 통해 인공 신경망의 시작과 학습의 본질을 살펴봅니다.'
// thumbnail: '/images/article_ai0.png'
// date: '2025-05-27'
// tags: ['AI', '독후감']
// readTime: 30
// featured: true
// ---
export const articlesConfig: ArticleConfig[] = [
  {
    slug: 'webview-ios-live-activity',
    title: {
      ko: 'React Native WebView에서 iOS Live Activities 제어하기',
      en: 'React Native WebView - iOS Live Activities control',
    },
    description: {
      ko: 'WebView에서 시작한 액션이 iOS Native의 Live Activities(Dynamic Island)로 이어지도록 구현하며, React Native와 iOS 브릿지 연동 흐름을 정리했습니다.',
      en: 'Learn the basic concepts of React Hooks and how to use useState.',
    },
    thumbnail: '/images/munji_article1.png',
    date: '2025-06-27',
    tags: ['ReactNative', 'Webview', 'Frontend'],
    readTime: 8,
    featured: true,
    published: true,
    category: 'Frontend',
    author: 'Kayoung',
  },
  {
    slug: 'sodong-web-opt',
    title: {
      ko: 'React 성능 최적화 : 이미지 포맷, 번들 사이즈,  코드스플리팅 전략',
      en: 'React Performance Optimization: Image Format, Bundle Size & Code Splitting Strategies',
    },
    description: {
      ko: 'LCP 점수가 26.3초… 성능 지옥에서 벗어나기 위한 눈물의 리팩토링 기록입니다. WebP 변환, CDN 도입, 코드 스플리팅까지, LCP와 FCP 점수를 어떻게 줄였는지 공유합니다.',
      en: 'A painful journey from a 26.3s LCP to a faster and lighter web.',
    },
    thumbnail: '/images/article_sodong0.png',
    date: '2024-09-14',
    tags: ['React', 'Lighthouse', '이미지 최적화'],
    readTime: 5,
    featured: true,
    published: true,
    category: 'Frontend',
    author: 'Kayoung',
  },
  {
    slug: 'ai-book',
    title: {
      ko: '"기계는 왜 학습하는가 : AI를 움직이는 우아한 수학" 을 읽고 1장',
      en: 'React Performance Optimization: Image Format, Bundle Size & Code Splitting Strategies',
    },
    description: {
      ko: '기계학습의 출발점인 선형 모델과 지도학습 개념을 통해, 데이터에서 패턴을 찾는 원리를 이해합니다.퍼셉트론과 헤브 학습 이론을 통해 인공 신경망의 시작과 학습의 본질을 살펴봅니다.',
      en: 'A painful journey from a 26.3s LCP to a faster and lighter web.',
    },
    thumbnail: '/images/article_ai1.png',
    date: '2025-05-27',
    tags: ['AI', '독후감'],
    readTime: 30,
    featured: true,
    published: true,
    category: 'AI',
    author: 'Kayoung',
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
