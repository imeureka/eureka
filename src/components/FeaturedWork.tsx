'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ProjectModal from './ProjectModal';
import FlairButton from './common/Button/FlairButton';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
}

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpen = (project: Project) => setSelectedProject(project);
  const handleClose = () => setSelectedProject(null);

  // 프로젝트 데이터
  const [isMobile, setIsMobile] = useState(false);

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
      title: 'AI 마케팅 도우미 : 소동',
      description:
        'SNS 마케팅에 어려움을 겪는 소상공인을 위해 SNS 유형에 맞는 마케팅 문구와 썸네일을 생성해주고 바로 공유까지 가능한 서비스를 개발했습니다',
      tech: ['React', 'ReactNative', 'TypeScript', 'Styled Components'],
      image: '/images/project1.png',
    },
    {
      id: 2,
      title: '먼지 치우기',
      description:
        '웹뷰로 구성된 할 일을 타이머로 해치우고, 문득 생각나는 할 일들을 그때 그때 놓치지 않고 기록하는 서비스를 개발했습니다',
      tech: ['React', 'ReactNative', 'TypeScript', 'Tailwind CSS'],
      image: '/images/project2.png',
    },
    {
      id: 3,
      title: '스킵 - 여행, 명소, 분석',
      description: 'React Native로 개발한 스크린샷을 올리면 여행지가 척척 분류되는 서비스를 구현했습니다',
      tech: ['React Native', 'Expo', 'TypeScript', 'Styled Components'],
      image: '/images/project3.png',
    },
  ];

  useGSAP(() => {
    if (!containerRef.current || !panelsRef.current) return;

    const panels = gsap.utils.toArray('.panel');

    if (panels.length === 0) return;

    // 수평 스크롤 애니메이션
    gsap.to(panels, {
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
            const firstPanelThreshold = 0.8 / (projects.length - 1); // 약 20% 이하일 때
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
    };
  }, []);

  if (isMobile) {
    // 모바일 레이아웃 - 수평 스크롤 + 카드 디자인
    return (
      <>
        <section className="w-full py-12 px-4 sm:px-6 relative z-20">
          {/* 수평 스크롤 컨테이너 */}
          <div ref={containerRef} className="container relative w-full h-screen overflow-hidden">
            <div ref={panelsRef} className="flex w-fit h-full" style={{ width: `${projects.length * 100}vw` }}>
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="panel w-[calc(100vw-32px)] h-full flex items-center justify-center px-4">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                      {/* 프로젝트 이미지 */}
                      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        {/* 프로젝트 번호 */}
                        <div className="absolute top-4 left-4 w-10 h-10 sm:w-12 sm:h-12 bg-black text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-bold">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>

                      {/* 프로젝트 정보 */}
                      <div className="p-6 sm:p-8">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">{project.description}</p>

                        {/* 기술 스택 */}
                        <div className="mb-6">
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-xs sm:text-sm font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* 액션 버튼 */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                          <button
                            onClick={() => handleOpen(project)}
                            className="flex-1 bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 active:bg-gray-800 transition-colors text-sm sm:text-base active:scale-95">
                            프로젝트 보기
                          </button>
                          <button className="flex-1 border-2 border-black text-black px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-white active:bg-black active:text-white transition-colors text-sm sm:text-base active:scale-95">
                            Live Demo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 스크롤 인디케이터 */}
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
            {projects.map((_, index) => (
              <div key={index} className="w-2 h-2 bg-gray-400 rounded-full opacity-50" />
            ))}
          </div>

          {/* 모바일 스크롤 힌트 */}
          <div className="fixed bottom-6 right-6 bg-black text-white px-3 py-2 rounded-full text-xs z-30 opacity-75">
            <div className="flex items-center gap-1">
              <span>스크롤</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>
        {selectedProject && <ProjectModal project={selectedProject} onClose={handleClose} />}
      </>
    );
  }

  // 데스크톱 레이아웃 - 수평 스크롤
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
                    <div className="bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl flex items-center justify-center overflow-hidden aspect-square md:aspect-auto md:h-80 lg:h-96">
                      <img src={project.image} alt={project.title} className="object-cover h-full w-full p-4 md:p-0" />
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
                        onClick={() => handleOpen(project)}
                        className="bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors text-sm md:text-base">
                        View Project
                      </FlairButton>
                      <button className="border-2 border-black text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-black hover:text-white transition-colors text-sm md:text-base">
                        Live Demo
                      </button>
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
    </>
  );
}
