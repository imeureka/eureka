'use client';

import { useState, useRef, useEffect } from 'react';

interface CourseItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  link: string;
}

interface CraftUIGalleryProps {
  currentLanguage?: 'ko' | 'en';
}

const CraftUIGallery = ({ currentLanguage = 'ko' }: CraftUIGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [articleWidth, setArticleWidth] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const courses: CourseItem[] = [
    {
      id: 1,
      title: currentLanguage === 'ko' ? '개발의 기술' : 'The Craft',
      description:
        currentLanguage === 'ko'
          ? '상상하는 모든 것을 구현할 수 있는 자신감을 얻으세요. 모션, 인터랙션, 디자인 원칙을 자연스럽게 다루는 법을 배웁니다.'
          : 'Gain the confidence to build anything you envision, transforming motion, interaction, and design principles into second nature.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5">
          <path d="M6 3h12l4 6-10 13L2 9Z" />
          <path d="M11 3 8 9l4 13 4-13-3-6" />
          <path d="M2 9h20" />
        </svg>
      ),
      image: 'https://picsum.photos/720/720?random=12',
      link: '#',
    },
    {
      id: 2,
      title: currentLanguage === 'ko' ? 'CSS 애니메이션' : 'CSS Animation',
      description:
        currentLanguage === 'ko'
          ? '첫 번째 @keyframes부터 아무도 가르쳐주지 않는 고급 기법까지 CSS 애니메이션을 완전히 마스터하세요.'
          : 'Master CSS animations from your very first set of @keyframes right through to things no one else ever teaches you.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M7 3v18" />
          <path d="M3 7.5h4" />
          <path d="M3 12h18" />
          <path d="M3 16.5h4" />
          <path d="M17 3v18" />
          <path d="M17 7.5h4" />
          <path d="M17 16.5h4" />
        </svg>
      ),
      image: 'https://picsum.photos/720/720?random=17',
      link: '#',
    },
    {
      id: 3,
      title: currentLanguage === 'ko' ? 'SVG 필터' : 'SVG Filters',
      description:
        currentLanguage === 'ko'
          ? '예산 내에서 쉐이더 효과를 구현하세요. 노이즈를 활용하여 불꽃과 스티커 효과를 만드는 방법을 배웁니다.'
          : 'Shaders on a budget. Learn how to use noise to your advantage whilst making flames and stickers.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      ),
      image: 'https://picsum.photos/720/720?random=19',
      link: '#',
    },
    {
      id: 4,
      title: currentLanguage === 'ko' ? '스크롤 애니메이션' : 'Scroll Animation',
      description:
        currentLanguage === 'ko'
          ? '세련된 스크롤 애니메이션으로 사용자를 여행으로 안내하세요. JavaScript 없이도 구현할 수 있습니다.'
          : 'Take your users on a journey with the joy of tasteful scroll animation. You might not even need JavaScript.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5">
          <path d="M19 17V5a2 2 0 0 0-2-2H4" />
          <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
        </svg>
      ),
      image: 'https://picsum.photos/720/720?random=42',
      link: '#',
    },
    {
      id: 5,
      title: currentLanguage === 'ko' ? 'Canvas 다루기' : 'Taming Canvas',
      description:
        currentLanguage === 'ko'
          ? '픽셀 놀이터를 다루는 방법과 언제 사용해야 하는지 파악하세요. "성능 중심 개발"로 구축하는 법을 배웁니다.'
          : 'Grasp how to tame the pixel playground and when to do so. Whilst building with "Performance Driven Development".',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      ),
      image: 'https://picsum.photos/720/720?random=128',
      link: '#',
    },
    {
      id: 6,
      title: currentLanguage === 'ko' ? '레이아웃 트릭' : 'Layout Tricks',
      description:
        currentLanguage === 'ko'
          ? '정말 라이브러리가 필요할까요? 때로는 문제를 다시 생각해보면 멋진 해결책을 찾을 수 있습니다.'
          : 'Do you really need a library for that? Sometimes stepping back and rethinking the problem yields a nifty solution.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5">
          <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
          <path d="m14 7 3 3" />
          <path d="M5 6v4" />
          <path d="M19 14v4" />
          <path d="M10 2v2" />
          <path d="M7 8H3" />
          <path d="M21 16h-4" />
          <path d="M11 3H9" />
        </svg>
      ),
      image: 'https://picsum.photos/720/720?random=56',
      link: '#',
    },
    {
      id: 7,
      title: currentLanguage === 'ko' ? '시간 마스터하기' : 'Mastering Time',
      description:
        currentLanguage === 'ko'
          ? '단순한 이징과 구성이 전부가 아닙니다. 시간은 처음에는 명확하지 않을 수 있는 다양한 UI 패턴에서 중요한 역할을 합니다.'
          : "It's not all just easings and compositions. Time plays a crucial part in various UI patterns that might not seem obvious at first.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5">
          <path d="M5 22h14" />
          <path d="M5 2h14" />
          <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
          <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
        </svg>
      ),
      image: 'https://picsum.photos/720/720?random=39',
      link: '#',
    },
  ];

  // Grid template columns 계산
  const getGridColumns = () => {
    return courses.map((_, index) => (index === activeIndex ? '10fr' : '1fr')).join(' ');
  };

  // 마우스 이벤트 핸들러
  const handleItemInteraction = (index: number) => {
    setActiveIndex(index);
  };

  // 리사이즈 핸들러
  const handleResize = () => {
    if (itemRefs.current.length > 0) {
      const maxWidth = Math.max(...itemRefs.current.map((item) => item?.offsetWidth || 0));
      setArticleWidth(maxWidth);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center gap-4 py-8 px-4 transition-colors duration-300">
      {/* 그리드 패턴 배경 */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px),
            linear-gradient(0deg, rgba(0,0,0,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />

      {/* 다크모드용 그리드 */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 dark:block hidden"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />

      {/* 제목 */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
        {currentLanguage === 'ko'
          ? '해결보다 먼저, 문제를 정의하는 개발자입니다.'
          : 'I’m a developer who defines the problem before solving it.'}
      </h1>

      {/* 설명 */}
      <p className="max-w-3xl text-center text-gray-600 dark:text-gray-400 leading-relaxed mb-16 font-mono text-sm md:text-base">
        {currentLanguage === 'ko'
          ? '인터페이스 개발의 예술과 과학을 경험하세요. 단순히 픽셀을 움직이거나 문서를 따라하는 것이 아니라 도구를 마스터하고, 세부사항을 이해하며, 의도를 가지고 경험을 만들어가는 것입니다.'
          : "Unlock the art and science of interface development. This isn't just about pushing pixels or following documentation — it's about mastering the tools, understanding the nuances, and shaping experiences with intention."}
      </p>

      {/* 인터랙티브 갤러리 */}
      <ul
        ref={listRef}
        className="grid gap-2 list-none justify-center h-[300px] md:h-[474px] w-full max-w-[820px] transition-all duration-700 ease-out"
        style={{
          gridTemplateColumns: getGridColumns(),
        }}
        onMouseMove={(e) => {
          const target = e.target as HTMLElement;
          const closestLi = target.closest('li');
          if (closestLi) {
            const index = Array.from(listRef.current?.children || []).indexOf(closestLi);
            if (index !== -1) handleItemInteraction(index);
          }
        }}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const closestLi = target.closest('li');
          if (closestLi) {
            const index = Array.from(listRef.current?.children || []).indexOf(closestLi);
            if (index !== -1) handleItemInteraction(index);
          }
        }}>
        {courses.map((course, index) => (
          <li
            key={course.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="bg-white dark:bg-black relative overflow-hidden border border-gray-300 dark:border-gray-700 rounded-lg transition-all duration-700"
            style={{ minWidth: 'clamp(2rem, 8cqi, 80px)' }}>
            <article
              className="w-full h-full absolute top-0 left-0 flex flex-col justify-end gap-4 p-2 md:p-4 overflow-hidden font-mono"
              style={{ width: `${articleWidth}px` }}>
              {/* 배경 이미지 */}
              <img
                src={course.image}
                alt={course.title}
                className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-700 rounded-lg ${
                  index === activeIndex ? 'grayscale-0 brightness-100 scale-100' : 'grayscale brightness-150 scale-110'
                }`}
                style={{
                  mask: 'radial-gradient(100% 100% at 100% 0, #fff, transparent)',
                }}
              />

              {/* 제목 (회전) */}
              <h3
                className={`absolute top-4 left-4 text-sm font-light uppercase transform rotate-90 origin-left whitespace-nowrap transition-opacity duration-700 text-white ${
                  index === activeIndex ? 'opacity-100' : 'opacity-60'
                }`}>
                {course.title}
              </h3>

              {/* 아이콘 */}
              <div
                className={`text-white transition-opacity duration-700 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-60'
                }`}>
                {course.icon}
              </div>

              {/* 설명 텍스트 */}
              <p
                className={`text-xs md:text-sm leading-tight text-white transition-opacity duration-700 ${
                  index === activeIndex ? 'opacity-80 delay-150' : 'opacity-0'
                }`}>
                {course.description}
              </p>

              {/* 링크 */}
              <a
                href={course.link}
                className={`absolute bottom-4 left-4 h-5 leading-5 text-white font-medium transition-opacity duration-700 hover:underline hover:underline-offset-4 ${
                  index === activeIndex ? 'opacity-100 delay-150' : 'opacity-0'
                }`}>
                <span className="translate-x-2 inline-block">
                  {currentLanguage === 'ko' ? '지금 보기' : 'Watch now'}
                </span>
              </a>
            </article>
          </li>
        ))}
      </ul>

      {/* Bear Link */}
      <a
        href="https://twitter.com/intent/follow?screen_name=jh3yy"
        target="_blank"
        rel="noreferrer noopener"
        className="fixed top-4 left-4 w-12 h-12 flex items-center justify-center text-gray-700 dark:text-gray-300 opacity-80 hover:opacity-100 transition-opacity">
        <svg className="w-9 h-9" viewBox="0 0 969 955" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="161.191" cy="320.191" r="133.191" stroke="currentColor" strokeWidth="20" />
          <circle cx="806.809" cy="320.191" r="133.191" stroke="currentColor" strokeWidth="20" />
          <circle cx="695.019" cy="587.733" r="31.4016" fill="currentColor" />
          <circle cx="272.981" cy="587.733" r="31.4016" fill="currentColor" />
          <path
            d="M564.388 712.083C564.388 743.994 526.035 779.911 483.372 779.911C440.709 779.911 402.356 743.994 402.356 712.083C402.356 680.173 440.709 664.353 483.372 664.353C526.035 664.353 564.388 680.173 564.388 712.083Z"
            fill="currentColor"
          />
          <rect x="310.42" y="448.31" width="343.468" height="51.4986" fill="#FF1E1E" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M745.643 288.24C815.368 344.185 854.539 432.623 854.539 511.741H614.938V454.652C614.938 433.113 597.477 415.652 575.938 415.652H388.37C366.831 415.652 349.37 433.113 349.37 454.652V511.741L110.949 511.741C110.949 432.623 150.12 344.185 219.845 288.24C289.57 232.295 384.138 200.865 482.744 200.865C581.35 200.865 675.918 232.295 745.643 288.24Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
};

export default CraftUIGallery;
