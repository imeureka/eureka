'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FeaturedWork from '@/components/FeaturedWork';
import Header from '@/components/Header';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import CardGallery from '@/components/CardGallery';
import ExplodeButton from '@/components/common/Button/ExplodeButton';
import TimelineAnimation from '@/components/TimelineAnimation';
import ArticleList from '@/components/ArticleList';
import { useArticles } from '@/hooks/useArticles';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

type Language = 'en' | 'ko';

interface TextContent {
  title: string;
  description: string;
  buttonText: string;
}

interface Translations {
  en: TextContent;
  ko: TextContent;
}

const translations: Translations = {
  en: {
    title: 'Beyond Code\nToward Better Lives',
    description:
      "I am a human-centered front-end developer. Through development, I strive to ensure that no one is left behind by technology, creating web experiences that make everyone's lives a little better. Beyond interfaces, I pursue technologies that understand the context of people.",
    buttonText: 'GITHUB',
  },
  ko: {
    title: '코드를 넘어\n더 나은 삶을 향해',
    description:
      '저는 사람 중심의 프론트엔드 개발자입니다. 개발을 통해 기술로부터 소외되는 사람이 없도록, 모든 사람의 삶이 조금 더 나아지는 웹 경험을 만들고자 합니다. 인터페이스 너머, 사람의 맥락을 이해하는 기술을 추구합니다.',
    buttonText: 'GITHUB',
  },
};

export default function Home() {
  const container = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const articlesSectionRef = useRef<HTMLElement | null>(null);
  const articlesTitleRef = useRef<HTMLHeadingElement | null>(null);

  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  // 커스텀 훅으로 아티클 데이터 관리 (홈페이지용: 3개 제한)
  const { articles, loading: articlesLoading } = useArticles({
    limit: 3,
    featured: true, // 추천 글 우선, 부족하면 최신 글로 채움
  });

  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === 'en' ? 'ko' : 'en'));
  };

  useGSAP(
    () => {
      if (!titleRef.current || !descriptionRef.current || !buttonRef.current) return;

      // 초기 상태 설정
      gsap.set([titleRef.current, descriptionRef.current, buttonRef.current], {
        y: 50,
        opacity: 0,
      });

      // 텍스트 애니메이션 타임라인
      const tl = gsap.timeline();

      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      })
        .to(
          descriptionRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.4',
        )
        .to(
          buttonRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3',
        );
    },
    { scope: container, dependencies: [currentLanguage] },
  );

  // 아티클 섹션 애니메이션
  useGSAP(
    () => {
      if (!articlesTitleRef.current) return;

      gsap.set(articlesTitleRef.current, {
        y: 50,
        opacity: 0,
      });

      gsap.to(articlesTitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: articlesSectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: container, dependencies: [currentLanguage] },
  );

  const currentContent = translations[currentLanguage];

  // 아티클 섹션 텍스트
  const articlesContent = {
    en: {
      title: 'Latest Articles',
      subtitle: 'Insights and experiences from my development journey',
    },
    ko: {
      title: '최신 아티클',
      subtitle: '개발 여정에서 얻은 인사이트와 경험들',
    },
  };

  const currentArticlesContent = articlesContent[currentLanguage];

  return (
    <main ref={container} className="flex flex-col items-start relative overflow-hidden pt-24">
      <Header currentLanguage={currentLanguage} onLanguageToggle={toggleLanguage} />

      {/* 홈 섹션 (스크롤 타겟용 ID 추가) */}
      <section id="home" className="w-full">
        <TimelineAnimation />
        <svg
          width="1202"
          height="805"
          viewBox="0 0 1202 805"
          className="absolute top-0 left-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            ref={pathRef}
            d="M-260 777C-222.167 659.203 -92.8211 438.938 121.897 500.254C390.295 576.898 360.06 588.831 449.836 582.865C597.943 516.776 488.444 369.454 425.648 293.268C362.851 217.083 336.046 138.781 346.57 100.51C362.851 41.3054 420.531 13.7685 644.273 134.472C823.267 231.035 930.968 280.571 962.444 293.268C1010.2 308.872 1141 341 1170 273.5C1196.66 211.441 1094.8 58.5393 858.5 -64"
            stroke="#FFC28D"
            strokeWidth={40}
          />
        </svg>

        <div className="z-50 max-w-5xl w-full md:flex-row items-center md:justify-start gap-16 mx-auto relative mt-5 min-h-[500px]">
          <div className="text-black" ref={textRef}>
            <h1
              ref={titleRef}
              className="text-6xl font-extrabold mb-8 leading-tight whitespace-pre-line h-[200px] flex items-center">
              {currentContent.title}
            </h1>
          </div>
          <div className="md:w-1/2 md:ml-[50%]">
            <p
              ref={descriptionRef}
              className="text-lg font-semibold leading-relaxed mb-6 max-w-lg min-h-[180px] flex items-start">
              {currentContent.description}
            </p>
            <div ref={buttonRef}>
              <ExplodeButton onClick={() => window.open('https://github.com/imeureka', '_blank')}>GITHUB</ExplodeButton>
            </div>
          </div>
        </div>
      </section>

      {/* 갤러리 섹션 */}
      <section id="gallery" className="w-full">
        <CardGallery />
      </section>

      {/* 작업 섹션 (메뉴에서 스크롤할 타겟) */}
      <section id="featured-work" className="pt-30 w-full">
        <FeaturedWork />
      </section>

      {/* 아티클 섹션 */}
      <section ref={articlesSectionRef} id="articles" className="py-20 z-40 w-full">
        <div className="max-w-7xl mx-auto px-6">
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <h2 ref={articlesTitleRef} className="text-4xl font-extrabold text-gray-900 mb-4">
              {currentArticlesContent.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{currentArticlesContent.subtitle}</p>
          </div>

          {/* 아티클 리스트 (대표 글 3개) */}
          {articlesLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <ArticleList articles={articles} currentLanguage={currentLanguage} showSearch={false} variant="grid" />
          )}

          {/* 더 보기 버튼 */}
          <div className="text-center mt-12">
            <a
              href="/articles"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full hover:from-orange-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 font-semibold">
              {currentLanguage === 'ko' ? '모든 아티클 보기' : 'View All Articles'}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
