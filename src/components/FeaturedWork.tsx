'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
  date: string;
}

// FlairButton 시뮬레이션
const FlairButton = ({ onClick, className, children }: any) => {
  return (
    <button onClick={onClick} className={`transition-all duration-300 ${className}`}>
      {children}
    </button>
  );
};

// ProjectModal 업그레이드 - 이미지 확대에서 모달로 전환되는 애니메이션
const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 프로젝트별 상세 데이터
  const projectDetails = {
    1: {
      awards: ['구름톤유니브 벚꽃톤 대상 - 카카오대표이사상', '구름톤 유니브 인 제주 최우수상'],
      skills: ['React', 'TypeScript', 'TanStack Query', 'Styled Components'],
      blogLink:
        'https://velog.io/@imeureka/Kakao-x-Goorm-%EA%B5%AC%EB%A6%84%ED%86%A4-%EC%9C%A0%EB%8B%88%EB%B8%8C-2%EA%B8%B0-%EB%B2%9A%EA%BD%83%ED%86%A4-%EB%8C%80%EC%83%81-%ED%9A%8C%EA%B3%A0',
      gallery: [
        'https://velog.velcdn.com/images/imeureka/post/2c894438-2ccd-4868-bdac-0deda70a8b6f/image.jpeg',
        'https://velog.velcdn.com/images/imeureka/post/e9ee4927-ecab-4263-9797-594c01027877/image.jpeg',
        'https://velog.velcdn.com/images/imeureka/post/2ff5757d-779b-471e-aef9-99b0bb25bf98/image.png',
      ],
      github: 'https://github.com/9oormthon-univ/2024_BEOTKKOTTHON_TEAM_27_FE',
    },
    2: {
      awards: [],
      skills: ['React', 'React Native', 'WebView 연동', 'TanStack Query', 'Tailwind CSS'],
      blogLink:
        'https://velog.io/@imeureka/React-Native-WebView%EC%97%90%EC%84%9C-iOS-Live-Activities-%EC%A0%9C%EC%96%B4%ED%95%98%EA%B8%B0',
      gallery: ['/images/munji1.png', '/images/munji2.png', '/images/munji3.png'],
      github: 'https://github.com/go2go-dev/go2go-front',
    },
    3: {
      awards: ['2024 관광 데이터 활용 공모전 장려상 수상'],
      skills: ['React Native Cli', 'Styled Components', 'Deep Link'],
      blogLink: '/blog/skip-travel-app',
      gallery: ['/images/skeep0.png', '/images/skeep2.png', '/images/skeep3.png'],
      github: 'https://github.com/S-KEEP/S-KEEP_Front',
    },
  }[project.id] || { awards: [], skills: [], gallery: [] };

  // GSAP 애니메이션 - 이미지 확대에서 모달로 부드럽게 전환
  React.useEffect(() => {
    if (!modalRef.current || !overlayRef.current || !contentRef.current) return;

    const tl = gsap.timeline();

    // 초기 설정 - 이미 확대된 상태에서 시작
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(contentRef.current, {
      scale: 1.2,
      opacity: 0,
    });

    // 애니메이션 실행
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    }).to(
      contentRef.current,
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.2)',
      },
      '-=0.2',
    );
  }, []);

  const handleClose = () => {
    if (!contentRef.current || !overlayRef.current) return;

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    tl.to(contentRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    }).to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      },
      '-=0.1',
    );
  };

  return (
    <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 오버레이 */}
      <div ref={overlayRef} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* 모달 컨텐츠 */}
      <div
        ref={contentRef}
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* 헤더 */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-6 py-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{project.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{project.date}</p>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors group">
              <svg
                className="w-5 h-5 text-gray-600 group-hover:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* 메인 이미지 */}
          <div className="w-full h-auto">
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={450}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* 프로젝트 소개 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">프로젝트 소개</h3>
            <p className="text-gray-700 leading-relaxed text-base">{project.description}</p>
          </div>

          {/* 스킬 및 수상이력 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 기술 스택 */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">기술 스택</h3>
              <div className="flex flex-wrap gap-2">
                {[...projectDetails.skills].map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 수상이력 */}
            {projectDetails.awards && projectDetails.awards.filter(Boolean).length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">수상이력</h3>
                <div className="space-y-2">
                  {projectDetails.awards
                    .filter((award) => award.trim() !== '')
                    .map((award, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                        <span className="text-yellow-800 font-medium text-sm">{award}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* 프로젝트 갤러리 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">프로젝트 갤러리</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projectDetails.gallery.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video rounded-lg overflow-hidden bg-gray-100 hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <img
                    src={image}
                    alt={`${project.title} 스크린샷 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 관련 블로그글 & 액션 버튼 */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={() => window.open(projectDetails.blogLink, '_blank')}
                className="flex-1 bg-black text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                </svg>
                관련 블로그 글 보기
              </button>
              {projectDetails.github && (
                <button
                  onClick={() => window.open(projectDetails.github, '_blank')}
                  className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GITHUB
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 이미지 확대 애니메이션을 위한 ref
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleOpen = (project: Project, projectIndex: number) => {
    const imageEl = imageRefs.current[projectIndex];
    if (!imageEl) {
      setSelectedProject(project);
      return;
    }

    // 이미지 확대 애니메이션
    const tl = gsap.timeline({
      onComplete: () => {
        // 애니메이션 완료 후 모달 오픈
        setSelectedProject(project);
        // 원래 크기로 복구
        gsap.to(imageEl, {
          scale: 1,
          duration: 0.1,
          ease: 'power2.out',
        });
      },
    });

    tl.to(imageEl, {
      scale: 1.5,
      duration: 0.4,
      ease: 'power2.out',
    }).to(imageEl, {
      scale: 3,
      duration: 0.5,
      ease: 'power2.inOut',
    });
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  // 모바일 감지 및 리사이즈 핸들러
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg 브레이크포인트
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      date: '2024.03.09 ~ 2024.08.18',
      title: '소동 - AI 마케팅 도우미',
      description:
        'SNS 마케팅에 어려움을 겪는 소상공인을 위해 SNS 유형에 맞는 마케팅 문구와 썸네일을 생성해주고 바로 공유까지 가능한 서비스를 개발했습니다',
      tech: ['React', 'ReactNative', 'TypeScript', 'Styled Components'],
      image: '/images/project1.png',
    },
    {
      id: 2,
      date: '2025.05.24 ~ 현재까지',
      title: '먼지 치우기',
      description:
        '웹뷰로 구성된 할 일을 타이머로 해치우고, 문득 생각나는 할 일들을 그때 그때 놓치지 않고 기록하는 서비스를 개발했습니다',
      tech: ['React', 'ReactNative', 'TypeScript', 'Tailwind CSS'],
      image: '/images/project2.png',
      link: 'https://apps.apple.com/kr/app/%EB%A8%BC%EC%A7%80%EC%B9%98%EC%9A%B0%EA%B8%B0-%ED%83%80%EC%9D%B4%EB%A8%B8-%ED%95%A0-%EC%9D%BC-%EC%A7%91%EC%A4%91/id6748334514',
    },
    {
      id: 3,
      date: '2024.05.26 ~ 2024.09.30',
      title: '스킵 - 여행, 명소, 분석',
      description:
        'React Native로 개발한 스크린샷을 올리면 여행지가 척척 분류되고 카카오톡을 통해 친구를 초대하고 여행지를 공유하는 서비스를 구현했습니다',
      tech: ['React Native', 'Expo', 'TypeScript', 'Styled Components'],
      image: '/images/skeep1.png',
    },
  ];

  // 🖥️ 데스크탑용 GSAP 애니메이션
  useGSAP(() => {
    // 모바일일 때는 모든 ScrollTrigger 정리하고 리턴
    if (isMobile) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      return;
    }

    if (!containerRef.current || !panelsRef.current) return;

    const panels = gsap.utils.toArray('.panel');
    if (panels.length === 0) return;

    // 수평 스크롤 애니메이션
    const animation = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => '+=' + (panels.length - 1) * window.innerWidth,
        snap: {
          snapTo: (progress) => {
            const firstPanelThreshold = 0.8 / (projects.length - 1);
            if (progress < firstPanelThreshold) return 0;
            return Math.round(progress * (projects.length - 1)) / (projects.length - 1);
          },
          duration: 0.5,
          delay: 0.1,
        },
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      animation.kill();
    };
  }, [isMobile, projects.length]);

  if (isMobile) {
    // 📱 모바일: 기존 방식 유지
    return (
      <>
        <section className="w-full py-8 px-4 relative z-20">
          <div className="text-center mb-6 mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Work</h2>
            <div className="text-center mt-4 text-xs text-gray-500">← 좌우로 스와이프하세요 →</div>
          </div>

          <div className="w-full">
            <div
              className="flex gap-6 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              style={{
                WebkitOverflowScrolling: 'touch',
              }}>
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 snap-start">
                  {/* 프로젝트 이미지 */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image src={project.image} alt={project.title} fill className="w-full h-full object-cover" />
                    {/* 프로젝트 번호 */}
                    <div className="absolute top-3 left-3 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* 프로젝트 정보 */}
                  <div className="p-4">
                    <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">{project.description}</p>

                    {/* 기술 스택 */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 2).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                            +{project.tech.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 액션 버튼 */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpen(project, index)}
                        className="flex-1 bg-black text-white px-3 py-2 rounded-full font-semibold text-xs hover:bg-gray-800 active:scale-95 transition-all">
                        보기
                      </button>
                      {project.link && (
                        <button
                          onClick={() => window.open(project.link, '_blank')}
                          className="flex-1 border border-black text-black px-3 py-2 rounded-full font-semibold text-xs hover:bg-black hover:text-white active:scale-95 transition-all">
                          Demo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 인디케이터 */}
            <div className="flex justify-center gap-2 mt-4">
              {projects.map((_, index) => (
                <div key={index} className="w-2 h-2 bg-gray-300 rounded-full" />
              ))}
            </div>
          </div>
        </section>

        {selectedProject && <ProjectModal project={selectedProject} onClose={handleClose} />}
      </>
    );
  }

  // 🖥️ 데스크탑: GSAP ScrollTrigger 방식
  return (
    <>
      <section className="w-full py-12 md:py-24 px-4 md:px-8 relative z-20">
        {/* 수평 스크롤 컨테이너 */}
        <div ref={containerRef} className="container relative w-full h-screen overflow-hidden">
          <div ref={panelsRef} className="flex w-fit h-full" style={{ width: `${projects.length * 100}vw` }}>
            {projects.map((project, index) => (
              <div key={project.id} className="panel w-screen h-full flex items-center justify-center px-4 md:px-8">
                <div className="max-w-6xl mx-auto w-full h-full flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-16 items-center justify-center">
                  {/* 프로젝트 이미지 */}
                  <div className="relative w-full max-w-md lg:max-w-none order-1 lg:order-none">
                    <div
                      ref={(el) => {
                        imageRefs.current[index] = el;
                      }}
                      className="w-full aspect-[16/9] relative overflow-hidden rounded-2xl">
                      <Image src={project.image} alt={project.title} fill className="object-contain" />
                    </div>

                    {/* 프로젝트 번호 */}
                    <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 w-12 h-12 md:w-16 md:h-16 bg-black text-white rounded-full flex items-center justify-center text-lg md:text-2xl font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* 프로젝트 정보 */}
                  <div className="space-y-4 md:space-y-8 text-center lg:text-left order-2 lg:order-none w-full px-2 md:px-0">
                    <div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-black mb-3 md:mb-6 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-4 md:mb-8">
                        {project.description}
                      </p>
                    </div>

                    {/* 기술 스택 */}
                    <div>
                      <h4 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 md:mb-4">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-gray-800 rounded-full text-xs md:text-sm font-medium hover:bg-gray-200 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 액션 버튼 */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-8 justify-center lg:justify-start">
                      <FlairButton
                        onClick={() => handleOpen(project, index)}
                        className="bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors text-sm md:text-base">
                        View Project
                      </FlairButton>
                      {project.link && (
                        <button
                          onClick={() => window.open(project.link, '_blank')}
                          className="border-2 border-black text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-black hover:text-white transition-colors text-sm md:text-base">
                          Live Demo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="fixed bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {projects.map((_, index) => (
            <div key={index} className="w-2 h-2 bg-gray-400 rounded-full opacity-50" />
          ))}
        </div>

        {/* 스크롤 힌트 */}
        <div className="fixed bottom-6 md:bottom-8 right-4 md:right-8 text-gray-500 text-xs md:text-sm z-30">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Scroll to explore</span>
            <span className="sm:hidden">Scroll</span>
            <div className="w-5 h-5 md:w-6 md:h-6 border border-gray-400 rounded-full flex items-center justify-center text-xs md:text-sm">
              →
            </div>
          </div>
        </div>
      </section>

      {selectedProject && <ProjectModal project={selectedProject} onClose={handleClose} />}

      {/* CSS */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
