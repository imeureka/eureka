'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  blog?: string;
  awards?: string[];
  screenshots?: string[];
  link?: string;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const awards = project.awards ?? [];
  const screenshots = project.screenshots ?? [project.image];

  useEffect(() => {
    // 모달 진입 애니메이션
    const tl = gsap.timeline();

    // 오버레이 페이드 인
    gsap.set(overlayRef.current, { opacity: 0 });
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });

    // 모달 등장 애니메이션 (모바일/데스크톱 구분)
    const isMobile = window.innerWidth < 768;
    gsap.set(modalRef.current, {
      scale: isMobile ? 0.9 : 0.8,
      y: isMobile ? 30 : 50,
      opacity: 0,
    });
    tl.to(
      modalRef.current,
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: isMobile ? 0.4 : 0.5,
        ease: 'back.out(1.7)',
      },
      0.1,
    );

    // 콘텐츠 요소들 순차 애니메이션
    gsap.set(contentRefs.current, {
      y: isMobile ? 20 : 30,
      opacity: 0,
    });
    tl.to(
      contentRefs.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: isMobile ? 0.08 : 0.1,
        ease: 'power2.out',
      },
      0.3,
    );

    // 이미지들 애니메이션
    gsap.set(imageRefs.current, {
      scale: 0.9,
      opacity: 0,
    });
    tl.to(
      imageRefs.current,
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.2)',
      },
      0.5,
    );

    return () => {
      // 클린업 함수는 비워둠 (닫기 애니메이션은 별도 처리)
    };
  }, []);

  const handleClose = () => {
    // 모달 닫기 애니메이션
    const tl = gsap.timeline({
      onComplete: onClose,
    });

    tl.to(contentRefs.current, {
      y: -20,
      opacity: 0,
      duration: 0.2,
      stagger: 0.05,
      ease: 'power2.in',
    });

    tl.to(
      modalRef.current,
      {
        scale: 0.9,
        y: 30,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      },
      0.1,
    );

    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      },
      0.2,
    );
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-2 md:p-4"
      onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        className="bg-white w-full max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-5xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] md:max-h-[90vh] relative">
        {/* 헤더 섹션 */}
        <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8 pb-4 sm:pb-5 md:pb-6">
          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-black hover:shadow-xl transition-all duration-200 z-10 active:scale-95">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 프로젝트 제목 */}
          <h2
            ref={(el) => {
              contentRefs.current[0] = el;
            }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 pr-10 sm:pr-12 md:pr-16 leading-tight">
            {project.title}
          </h2>

          {/* 프로젝트 설명 */}
          <p
            ref={(el) => {
              contentRefs.current[1] = el;
            }}
            className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-5 md:mb-6">
            {project.description}
          </p>

          {/* 기술 스택 */}
          <div
            ref={(el) => {
              contentRefs.current[2] = el;
            }}>
            <h4 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-white text-gray-800 rounded-full text-xs sm:text-sm font-medium shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[60vh] sm:max-h-[65vh] md:max-h-[60vh]">
          {/* 링크 섹션 */}
          <div
            ref={(el) => {
              contentRefs.current[3] = el;
            }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-3 md:px-6 md:py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 active:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl active:scale-95 text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {project.blog && (
              <a
                href={project.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-3 md:px-6 md:py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 active:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl active:scale-95 text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                블로그 보기
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-3 md:px-6 md:py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 active:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl active:scale-95 text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Live Demo
              </a>
            )}
          </div>

          {/* 수상 내역 */}
          {awards.length > 0 && (
            <div
              ref={(el) => {
                contentRefs.current[4] = el;
              }}
              className="mb-6 sm:mb-8">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                수상 내역
              </h4>
              <div className="space-y-2">
                {awards.map((award, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-800 font-medium text-sm sm:text-base">{award}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 스크린샷 갤러리 */}
          <div
            ref={(el) => {
              contentRefs.current[5] = el;
            }}
            className="mb-4 sm:mb-6">
            <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              프로젝트 갤러리
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {screenshots.map((src, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95">
                  <img
                    ref={(el) => {
                      imageRefs.current[i] = el;
                    }}
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 group-active:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
