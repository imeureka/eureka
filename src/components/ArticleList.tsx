'use client';

import React, { useState, useMemo } from 'react';
import { Article, Language } from '@/types/article';
import ArticleCard from './ArticleCard';
import SearchBar from './SearchBar';

interface ArticleListProps {
  articles: Article[];
  currentLanguage: Language;
  showSearch?: boolean;
  variant?: 'grid' | 'list';
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  currentLanguage,
  showSearch = true,
  variant = 'grid',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 모든 태그 추출
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articles.forEach((article) => {
      article.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [articles]);

  // 필터링된 아티클
  const filteredArticles = useMemo(() => {
    if (!showSearch) return articles;

    return articles.filter((article) => {
      const title = article.title[currentLanguage].toLowerCase();
      const description = article.description[currentLanguage].toLowerCase();
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        title.includes(query) ||
        description.includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => article.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [articles, searchQuery, selectedTags, currentLanguage, showSearch]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  // 그리드 스타일 결정
  const getGridClasses = () => {
    if (variant === 'list') {
      return 'space-y-6';
    }
    // 홈페이지용 그리드 (3개일 때 더 예쁘게)
    if (filteredArticles.length <= 3) {
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
    }
    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
  };

  return (
    <div className={showSearch ? 'max-w-6xl mx-auto px-6' : 'w-full'}>
      {/* 검색 및 필터 (showSearch가 true일 때만) */}
      {showSearch && (
        <div className="mb-12">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder={currentLanguage === 'ko' ? '아티클 검색...' : 'Search articles...'}
            currentLanguage={currentLanguage}
          />

          {/* 태그 필터 */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">
              {currentLanguage === 'ko' ? '태그로 필터링' : 'Filter by Tags'}
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}>
                  {tag}
                </button>
              ))}
            </div>

            {(searchQuery || selectedTags.length > 0) && (
              <button onClick={clearFilters} className="text-orange-500 hover:text-orange-600 text-sm">
                {currentLanguage === 'ko' ? '필터 초기화' : 'Clear Filters'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* 검색 결과 카운트 (showSearch가 true일 때만) */}
      {showSearch && (
        <div className="mb-6">
          <p className="text-gray-600">
            {currentLanguage === 'ko'
              ? `총 ${filteredArticles.length}개의 아티클`
              : `${filteredArticles.length} article${filteredArticles.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
      )}

      {/* 아티클 목록 */}
      {filteredArticles.length > 0 ? (
        <div className={getGridClasses()}>
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} currentLanguage={currentLanguage} />
          ))}
        </div>
      ) : (
        showSearch && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-4">
              {currentLanguage === 'ko' ? '검색 결과가 없습니다' : 'No articles found'}
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
              {currentLanguage === 'ko' ? '전체 아티클 보기' : 'View All Articles'}
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default ArticleList;
