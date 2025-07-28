'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Article, Language } from '@/types/article';

// 임시 데이터 (실제로는 API에서 가져옵니다)
const getArticleBySlug = (slug: string): Article | null => {
  const articles: Article[] = [
    {
      id: '1',
      slug: 'react-hooks-guide',
      title: {
        en: 'Complete Guide to React Hooks',
        ko: 'React Hooks 완벽 가이드',
      },
      description: {
        en: 'Learn everything about React Hooks from useState to custom hooks with practical examples.',
        ko: 'useState부터 커스텀 훅까지 실용적인 예제와 함께 React Hooks의 모든 것을 배워보세요.',
      },
      thumbnail: '/images/articles/react-hooks-thumb.jpg',
      date: '2024-01-15',
      tags: ['React', 'JavaScript', 'Frontend'],
      readTime: 8,
      featured: true,
    },
    // 다른 아티클들...
  ];

  return articles.find((article) => article.slug === slug) || null;
};

// 마크다운 콘텐츠 (실제로는 파일에서 읽어옵니다)
const getMarkdownContent = (slug: string, language: Language): string => {
  const content = {
    en: `# Complete Guide to React Hooks

React Hooks have revolutionized the way we write React components. In this comprehensive guide, we'll explore everything from basic hooks to creating your own custom hooks.

## What are React Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 and have become the preferred way to write React components.

### useState Hook

The **useState** hook is the most commonly used hook. It allows you to add state to functional components.

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### useEffect Hook

The **useEffect** hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined.

## Custom Hooks

One of the most powerful features of hooks is the ability to create your own custom hooks. Custom hooks are JavaScript functions whose names start with "use" and that may call other hooks.

This is just a sample content. In a real application, you would load this from markdown files.`,
    ko: `# React Hooks 완벽 가이드

React Hooks는 React 컴포넌트를 작성하는 방식을 혁신적으로 바꾸었습니다. 이 종합 가이드에서는 기본 훅부터 커스텀 훅 생성까지 모든 것을 살펴보겠습니다.

## React Hooks란 무엇인가요?

훅은 함수형 컴포넌트에서 React state와 생명주기 기능을 "연결"할 수 있게 해주는 함수들입니다. React 16.8에서 도입되었으며 React 컴포넌트를 작성하는 선호되는 방식이 되었습니다.

### useState 훅

**useState** 훅은 가장 일반적으로 사용되는 훅입니다. 함수형 컴포넌트에 state를 추가할 수 있게 해줍니다.

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### useEffect 훅

**useEffect** 훅은 함수형 컴포넌트에서 사이드 이펙트를 수행할 수 있게 해줍니다. componentDidMount, componentDidUpdate, componentWillUnmount가 결합된 것과 같은 목적을 가집니다.

## 커스텀 훅

훅의 가장 강력한 기능 중 하나는 자신만의 커스텀 훅을 만들 수 있다는 것입니다. 커스텀 훅은 이름이 "use"로 시작하고 다른 훅을 호출할 수 있는 JavaScript 함수입니다.

이것은 샘플 콘텐츠입니다. 실제 애플리케이션에서는 마크다운 파일에서 이를 로드합니다.`,
  };

  return content[language] || content.en;
};

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [article, setArticle] = useState<Article | null>(null);
  const [content, setContent] = useState<string>('');

  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === 'en' ? 'ko' : 'en'));
  };

  useEffect(() => {
    const slug = params.slug as string;
    const foundArticle = getArticleBySlug(slug);

    if (!foundArticle) {
      router.push('/articles');
      return;
    }

    setArticle(foundArticle);
    setContent(getMarkdownContent(slug, currentLanguage));
  }, [params.slug, currentLanguage, router]);

  useGSAP(
    () => {
      if (!headerRef.current || !contentRef.current) return;

      gsap.set([headerRef.current, contentRef.current], {
        y: 50,
        opacity: 0,
      });

      const tl = gsap.timeline();

      tl.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }).to(
        contentRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4',
      );
    },
    { scope: containerRef, dependencies: [article, currentLanguage] },
  );

  if (!article) {
    return (
      <main className="min-h-screen bg-white pt-24">
        <Header currentLanguage={currentLanguage} onLanguageToggle={toggleLanguage} />
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-xl text-gray-500">Loading...</p>
        </div>
      </main>
    );
  }

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
  const backText = currentLanguage === 'ko' ? '← 아티클 목록으로' : '← Back to Articles';

  return (
    <main ref={containerRef} className="min-h-screen bg-white pt-24">
      <Header currentLanguage={currentLanguage} onLanguageToggle={toggleLanguage} />

      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* 뒤로가기 링크 */}
        <Link
          href="/articles"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          {backText}
        </Link>

        {/* 아티클 헤더 */}
        <header ref={headerRef} className="mb-12">
          {/* 썸네일 이미지 */}
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <Image src={article.thumbnail} alt={article.title[currentLanguage]} fill className="object-cover" />
          </div>

          {/* 태그들 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-orange-100 text-orange-600 text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* 제목 */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {article.title[currentLanguage]}
          </h1>

          {/* 메타 정보 */}
          <div className="flex items-center text-gray-600 space-x-4">
            <time dateTime={article.date}>{formatDate(article.date, currentLanguage)}</time>
            <span>•</span>
            <span>{readTimeText}</span>
          </div>
        </header>

        {/* 아티클 내용 */}
        <div ref={contentRef} className="prose prose-lg max-w-none">
          <MarkdownRenderer content={content} />
        </div>

        {/* 아티클 하단 */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <Link
            href="/articles"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full hover:from-orange-500 hover:to-pink-500 transition-all duration-300">
            {currentLanguage === 'ko' ? '더 많은 아티클 보기' : 'Read More Articles'}
          </Link>
        </footer>
      </article>
    </main>
  );
}
