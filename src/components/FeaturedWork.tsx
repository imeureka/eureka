'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

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

  // 프로젝트 데이터
  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description:
        'React와 Next.js로 구축한 현대적인 쇼핑몰 플랫폼입니다. TypeScript를 활용해 타입 안정성을 확보했습니다.',
      tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      image: '/images/project1.png',
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      description: '데이터 시각화를 중심으로 한 관리자 대시보드입니다. Chart.js와 D3.js를 활용했습니다.',
      tech: ['React', 'Chart.js', 'D3.js', 'Material-UI'],
      image: '/images/project2.png',
    },
    {
      id: 3,
      title: 'Mobile App UI',
      description: 'React Native로 개발한 모바일 앱의 UI/UX입니다. 사용자 중심의 인터페이스를 구현했습니다.',
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

  return (
    <section className="w-full py-24 px-8 relative z-20">
      {/* 수평 스크롤 컨테이너 */}
      <div ref={containerRef} className="container relative w-full h-screen overflow-hidden">
        <div ref={panelsRef} className="flex w-fit h-full" style={{ width: `${projects.length * 100}vw` }}>
          {projects.map((project, index) => (
            <div key={project.id} className="panel w-screen h-full flex items-center justify-center px-8">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
                {/* 프로젝트 이미지 */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-300 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                    <img src={project.image} alt={project.title} className="object-contain h-full w-full" />
                  </div>

                  {/* 프로젝트 번호 */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* 프로젝트 정보 */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-4xl lg:text-5xl font-extrabold text-black mb-6 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">{project.description}</p>
                  </div>

                  {/* 기술 스택 */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex gap-4 pt-8">
                    <button className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                      View Project
                    </button>
                    <button className="border-2 border-black text-black px-8 py-4 rounded-full font-semibold hover:bg-black hover:text-white transition-colors">
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
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {projects.map((_, index) => (
          <div key={index} className="w-2 h-2 bg-gray-400 rounded-full opacity-50" />
        ))}
      </div>

      {/* 스크롤 힌트 */}
      <div className="fixed bottom-8 right-8 text-gray-500 text-sm z-30">
        <div className="flex items-center gap-2">
          <span>Scroll to explore</span>
          <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center">→</div>
        </div>
      </div>
    </section>
  );
}
