'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Article, Language } from '@/types/article';

interface HomeArticlesSectionProps {
  articles: Article[];
  currentLanguage: Language;
}

interface HomeArticleCardProps {
  article: Article;
  currentLanguage: Language;
}

function HomeArticleCard({ article, currentLanguage }: HomeArticleCardProps) {
  const formatDate = (dateString: string, language: Language) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    return date.toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', options);
  };

  const readTimeText = currentLanguage === 'ko' ? `${article.readTime}분` : `${article.readTime} min`;

  return (
    <Link href={`/articles/${article.slug}`} className="group block flex-shrink-0 w-80">
      <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1 h-full">
        {/* 썸네일 이미지 */}
        <div className="relative h-40 overflow-hidden">
          <Image
            src={article.thumbnail ?? '/images/default-thumbnail.jpg'}
            alt={typeof article.title === 'string' ? article.title : article.title[currentLanguage]}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {article.featured && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white px-2 py-1 rounded-full text-xs font-medium">
              {currentLanguage === 'ko' ? '추천' : 'Featured'}
            </div>
          )}
        </div>

        {/* 콘텐츠 */}
        <div className="p-5">
          {/* 태그들 */}
          <div className="flex flex-wrap gap-1 mb-2">
            {(article.tags || []).slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* 제목 */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
            {typeof article.title === 'string' ? article.title : article.title[currentLanguage]}
          </h3>

          {/* 설명 */}
          <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
            {typeof article.description === 'string' ? article.description : article.description[currentLanguage]}
          </p>

          {/* 메타 정보 */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <time dateTime={article.date}>{formatDate(article.date, currentLanguage)}</time>
            <span>{readTimeText}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function HomeArticlesSection({ articles, currentLanguage }: HomeArticlesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!titleRef.current || !containerRef.current) return;

      gsap.set([titleRef.current, containerRef.current], {
        y: 50,
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }).to(
        containerRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4',
      );
    },
    { scope: sectionRef, dependencies: [currentLanguage] },
  );

  const sectionContent = {
    en: {
      title: 'Latest Articles',
      subtitle: 'Insights and experiences from my development journey',
      viewAll: 'View All Articles',
    },
    ko: {
      title: '최신 아티클',
      subtitle: '개발 여정에서 얻은 인사이트와 경험들',
      viewAll: '모든 아티클 보기',
    },
  };

  const content = sectionContent[currentLanguage];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-4xl font-extrabold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{content.subtitle}</p>
        </div>

        {/* 아티클 컨테이너 */}
        <div ref={containerRef} className="relative">
          {/* 스크롤 가능한 아티클 리스트 */}
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {articles.map((article) => (
              <HomeArticleCard key={article.id} article={article} currentLanguage={currentLanguage} />
            ))}
          </div>

          {/* 좌측 그라데이션 페이드 */}
          {articles.length > 3 && (
            <>
              <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
              <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
            </>
          )}
        </div>

        {/* 더 보기 버튼 */}
        <div className="text-center mt-12">
          <Link
            href="/articles"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full hover:from-orange-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 font-semibold">
            {content.viewAll}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
