'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

export default function TimelineAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainPathRef = useRef<SVGPathElement>(null);
  const movingBallRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!containerRef.current || !mainPathRef.current || !movingBallRef.current) return;

    // GSAP 기본 설정
    gsap.defaults({ ease: 'none' });

    // 메인 타임라인 애니메이션
    gsap
      .timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: true,
          start: 'top top',
          end: 'bottom top',
        },
      })
      .to(movingBallRef.current, { duration: 0.01, autoAlpha: 1 })
      .from(mainPathRef.current, { drawSVG: 0 }, 0)
      .to(
        movingBallRef.current,
        {
          motionPath: {
            path: mainPathRef.current,
            align: mainPathRef.current,
            alignOrigin: [0.5, 0.5],
          },
        },
        0,
      );

    // 정리
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1761 1211"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg">
        {/* 메인 곡선 경로만 */}
        <path
          ref={mainPathRef}
          stroke="#FFC28D"
          strokeWidth="50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
          d="M1728 33L1635.17 427.789C1586.28 553.745 1433.21 762.795 1212.06 591.344C990.919 419.893 1096.67 332.082 1198.22 333.962C1247.11 326.443 1411.77 397.334 1511.06 546.225C1610.35 695.117 1618.76 843.941 1618.76 870.26C1618.76 990.576 1585.53 1173.38 1386.95 1177.89C1138.72 1183.53 1082.31 974.853 952.557 1076.37C822.803 1177.89 817.162 1177.89 755.106 1177.89C693.05 1177.89 676.126 1076.37 591.504 1076.37C506.882 1076.37 258.658 1093.29 258.658 929.735C258.658 798.89 108.219 649.622 33.0001 591.344"
        />

        {/* 움직이는 볼만 */}
        <circle ref={movingBallRef} fill="#FBBF24" r="12" cx="100" cy="200" style={{ visibility: 'hidden' }}>
          <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* 글로우 효과 */}
        <defs>
          <filter id="ballGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <style jsx>{`
        circle {
          filter: url(#ballGlow);
        }
        path {
          filter: url(#pathGlow);
        }
      `}</style>
    </div>
  );
}
