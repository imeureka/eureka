'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Header from '@/components/Header';
import ArticleList from '@/components/ArticleList';
import { Language } from '@/types/article';
import { useArticles } from '@/hooks/useArticles';

// 실제로는 이 데이터를 API나 파일에서 불러옵니다
export default function ArticlesPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // 커스텀 훅으로 아티클 데이터 관리 (모든 아티클)
  const { articles, loading: articlesLoading } = useArticles();

  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === 'en' ? 'ko' : 'en'));
  };

  useGSAP(
    () => {
      if (!titleRef.current || !subtitleRef.current) return;

      // 초기 상태 설정
      gsap.set([titleRef.current, subtitleRef.current], {
        y: 30,
        opacity: 0,
      });

      // 애니메이션
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
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4',
      );
    },
    { scope: containerRef, dependencies: [currentLanguage] },
  );

  const pageContent = {
    en: {
      title: 'Articles',
      subtitle: 'Thoughts, insights, and experiences from my development journey',
    },
    ko: {
      title: '아티클',
      subtitle: '개발 여정에서 얻은 생각, 인사이트, 그리고 경험들',
    },
  };

  const currentContent = pageContent[currentLanguage];

  return (
    <main ref={containerRef} className="min-h-screen bg-gray-50 pt-24">
      <Header currentLanguage={currentLanguage} onLanguageToggle={toggleLanguage} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* 페이지 헤더 */}
        <div className="text-center mb-16">
          <h1 ref={titleRef} className="text-5xl font-extrabold text-gray-900 mb-4">
            {currentContent.title}
          </h1>
          <p ref={subtitleRef} className="text-xl text-gray-600 max-w-2xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* 아티클 리스트 */}
        {articlesLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <ArticleList articles={articles} currentLanguage={currentLanguage} showSearch={true} variant="grid" />
        )}
      </div>
    </main>
  );
}
