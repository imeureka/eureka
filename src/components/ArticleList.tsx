'use client';

import { useState, useMemo } from 'react';
import { Article, Language } from '@/types/article';
import ArticleCard from './ArticleCard';
import SearchBar from './SearchBar';

interface ArticleListProps {
  articles: Article[];
  currentLanguage: Language;
  showSearch?: boolean;
  variant?: 'grid' | 'scroll';
  maxHeight?: string;
}

export default function ArticleList({
  articles,
  currentLanguage,
  showSearch = true,
  variant = 'grid',
  maxHeight = 'none',
}: ArticleListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // 검색 필터링
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;

    return articles.filter((article) => {
      const title = article.title[currentLanguage].toLowerCase();
      const description = article.description[currentLanguage].toLowerCase();
      const tags = article.tags.join(' ').toLowerCase();
      const query = searchQuery.toLowerCase();

      return title.includes(query) || description.includes(query) || tags.includes(query);
    });
  }, [articles, searchQuery, currentLanguage]);

  const searchPlaceholder = currentLanguage === 'ko' ? '아티클 검색...' : 'Search articles...';

  const noResultsText = currentLanguage === 'ko' ? '검색 결과가 없습니다.' : 'No articles found.';

  const articlesCountText =
    currentLanguage === 'ko' ? `총 ${filteredArticles.length}개의 아티클` : `${filteredArticles.length} articles`;

  return (
    <div className="w-full">
      {/* 검색바 */}
      {showSearch && (
        <SearchBar onSearch={setSearchQuery} placeholder={searchPlaceholder} currentLanguage={currentLanguage} />
      )}

      {/* 결과 개수 */}
      {showSearch && (
        <div className="text-center mb-8">
          <p className="text-gray-600">{articlesCountText}</p>
        </div>
      )}

      {/* 아티클 그리드 */}
      {filteredArticles.length > 0 ? (
        <div
          className={variant === 'scroll' ? 'overflow-y-auto scrollbar-hide' : 'w-full'}
          style={variant === 'scroll' && maxHeight !== 'none' ? { maxHeight } : {}}>
          <div
            className={
              variant === 'scroll'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-4'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            }>
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} currentLanguage={currentLanguage} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-xl text-gray-500">{noResultsText}</p>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
