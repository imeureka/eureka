'use client';

import { useState } from 'react';
import { Language } from '@/types/article';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder: string;
  currentLanguage: Language;
}

export default function SearchBar({ onSearch, placeholder, currentLanguage }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-12">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-orange-400 focus:outline-none transition-colors duration-300 pr-12"
        />

        {/* 검색 아이콘 */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {query ? (
            <button onClick={clearSearch} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </div>
      </div>

      {/* 검색 결과 개수 표시 (옵션) */}
      {query && (
        <div className="absolute top-full mt-2 text-sm text-gray-500">
          {currentLanguage === 'en' ? 'Search results for' : '검색 결과'} "{query}"
        </div>
      )}
    </div>
  );
}
