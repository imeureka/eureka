'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Article, Language } from '@/types/article';

interface ArticleCardProps {
  article: Article;
  currentLanguage: Language;
}

export default function ArticleCard({ article, currentLanguage }: ArticleCardProps) {
  const formatDate = (dateString: string, language: Language) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', options);
  };

  const readTimeText = currentLanguage === 'ko' ? `${article.readTime}분 읽기` : `${article.readTime} min read`;

  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
        {/* 썸네일 이미지 */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={article.thumbnail}
            alt={article.title[currentLanguage]}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {article.featured && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentLanguage === 'ko' ? '추천' : 'Featured'}
            </div>
          )}
        </div>

        {/* 콘텐츠 */}
        <div className="p-6">
          {/* 태그들 */}
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* 제목 */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors">
            {article.title[currentLanguage]}
          </h3>

          {/* 설명 */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {article.description[currentLanguage]}
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
