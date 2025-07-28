'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Header from '@/components/Header';
import ArticleList from '@/components/ArticleList';
import { useArticles } from '@/hooks/useArticles';
import { Language } from '@/types/article';

export default function ArticlesPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ko');
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // 모든 아티클 가져오기 (옵션 없음)
  const { articles, loading } = useArticles();

  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === 'en' ? 'ko' : 'en'));
  };

  // 페이지 애니메이션
  useGSAP(
    () => {
      if (!titleRef.current || !subtitleRef.current) return;

      gsap.set([titleRef.current, subtitleRef.current], {
        y: 50,
        opacity: 0,
      });

      const tl = gsap.timeline();

      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }).to(
        subtitleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4',
      );
    },
    { scope: containerRef, dependencies: [currentLanguage] },
  );

  const pageContent = {
    en: {
      title: 'All Articles',
      subtitle: 'Explore insights and experiences from my development journey',
    },
    ko: {
      title: '모든 아티클',
      subtitle: '개발 여정에서 얻은 인사이트와 경험들을 탐색해보세요',
    },
  };

  const currentContent = pageContent[currentLanguage];

  return (
    <main ref={containerRef} className="min-h-screen bg-white pt-24">
      <Header currentLanguage={currentLanguage} onLanguageToggle={toggleLanguage} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* 페이지 헤더 */}
        <div className="text-center mb-16">
          <h1 ref={titleRef} className="text-5xl font-extrabold text-gray-900 mb-6">
            {currentContent.title}
          </h1>
          <p ref={subtitleRef} className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* 아티클 목록 */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <ArticleList
            articles={articles}
            currentLanguage={currentLanguage}
            showSearch={true} // 검색 기능 활성화
            variant="grid" // 그리드 레이아웃
          />
        )}
      </div>
    </main>
  );
}
