'use client';

import { use, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Header from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';

type Language = 'ko' | 'en';

interface Article {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  tags: string[];
  readTime: number;
  featured: boolean;
}

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [content, setContent] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ko');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === 'en' ? 'ko' : 'en'));
  };

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('Fetching article:', slug, 'language:', currentLanguage);

        const response = await fetch(`/api/articles/${slug}?lang=${currentLanguage}`);

        if (!response.ok) {
          const errorData = await response.json();
          setError(`아티클을 찾을 수 없습니다: ${errorData.error}`);
          return;
        }

        const data = await response.json();
        setArticle(data.article);
        setContent(data.content);
      } catch (err) {
        setError(`네트워크 오류: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, currentLanguage]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString(currentLanguage === 'ko' ? 'ko-KR' : 'en-US', options);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-24">
        <Header currentLanguage={currentLanguage} onLanguageToggle={toggleLanguage} />
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            <div className="h-64 bg-gray-300 rounded"></div>
          </div>
          <p className="mt-4 text-gray-500">
            {currentLanguage === 'ko' ? '아티클을 불러오는 중...' : 'Loading article...'}
          </p>
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="min-h-screen bg-white pt-24">
        <Header currentLanguage={currentLanguage} onLanguageToggle={toggleLanguage} />
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            {currentLanguage === 'ko' ? '오류가 발생했습니다' : 'An error occurred'}
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/articles" className="text-orange-500 hover:underline">
            {currentLanguage === 'ko' ? '← 아티클 목록으로 돌아가기' : '← Back to articles'}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      <Header currentLanguage={currentLanguage} onLanguageToggle={toggleLanguage} />

      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* 뒤로가기 버튼 */}
        <Link
          href="/articles"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors group">
          <svg
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {currentLanguage === 'ko' ? '아티클 목록으로' : 'Back to Articles'}
        </Link>

        {/* 아티클 헤더 */}
        <header className="mb-12">
          {/* 썸네일 이미지 */}
          {article.thumbnail && (
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 shadow-lg">
              <Image src={article.thumbnail} alt={article.title} fill className="object-cover" priority />
            </div>
          )}

          {/* 태그들 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-600 text-sm rounded-full font-medium hover:from-orange-200 hover:to-pink-200 transition-colors">
                {tag}
              </span>
            ))}
            {article.featured && (
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm rounded-full font-medium">
                ⭐ {currentLanguage === 'ko' ? '추천' : 'Featured'}
              </span>
            )}
          </div>

          {/* 제목 */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{article.title}</h1>

          {/* 설명 */}
          {article.description && <p className="text-xl text-gray-600 mb-6 leading-relaxed">{article.description}</p>}

          {/* 메타 정보 */}
          <div className="flex items-center text-gray-500 space-x-4 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{currentLanguage === 'ko' ? `${article.readTime}분 읽기` : `${article.readTime} min read`}</span>
            </div>
          </div>
        </header>

        {/* 아티클 콘텐츠 */}
        <div className="prose prose-lg prose-slate max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // 코드 블록 스타일링
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="relative group">
                    <div className="absolute top-4 right-4 text-gray-400 text-sm font-mono opacity-75">{match[1]}</div>
                    <SyntaxHighlighter
                      style={oneDark as any}
                      language={match[1]}
                      PreTag="div"
                      className="!mt-6 !mb-6 !rounded-xl shadow-lg"
                      showLineNumbers={true}
                      {...props}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code
                    className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm font-mono font-semibold"
                    {...props}>
                    {children}
                  </code>
                );
              },
              // 헤딩 스타일링
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-12 pb-3 border-b-2 border-orange-200">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-10 pb-2 border-b border-gray-200">
                  {children}
                </h2>
              ),
              h3: ({ children }) => <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">{children}</h3>,
              // 문단 스타일링
              p: ({ children }) => <p className="text-gray-700 leading-8 mb-6 text-lg">{children}</p>,
              // 링크 스타일링
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-orange-500 hover:text-orange-600 hover:underline font-medium decoration-2 underline-offset-2"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  {children}
                </a>
              ),
              // 블록쿼트 스타일링
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-orange-400 bg-gradient-to-r from-orange-50 to-yellow-50 py-4 px-6 my-8 rounded-r-lg shadow-sm">
                  <div className="text-orange-800 font-medium">{children}</div>
                </blockquote>
              ),
              // 리스트 스타일링
              ul: ({ children }) => <ul className="list-none space-y-3 mb-6 text-gray-700">{children}</ul>,
              li: ({ children }) => (
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-2 text-sm">▶</span>
                  <span className="text-lg leading-8">{children}</span>
                </li>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-3 mb-6 text-gray-700 text-lg leading-8">{children}</ol>
              ),
              // 표 스타일링
              table: ({ children }) => (
                <div className="overflow-x-auto my-8">
                  <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-gray-300 bg-gray-50 px-4 py-3 text-left font-semibold text-gray-900">
                  {children}
                </th>
              ),
              td: ({ children }) => <td className="border border-gray-300 px-4 py-3 text-gray-700">{children}</td>,
            }}>
            {content}
          </ReactMarkdown>
        </div>

        {/* 아티클 푸터 */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-500">{currentLanguage === 'ko' ? '태그:' : 'Tags:'}</span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded hover:bg-gray-200 transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
            <Link
              href="/articles"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full hover:from-orange-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
              {currentLanguage === 'ko' ? '더 많은 아티클 보기' : 'Read More Articles'}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
