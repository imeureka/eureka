'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

export default function GlowingLine() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const glowBallRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    if (!pathRef.current || !glowBallRef.current) return;

    gsap.to(glowBallRef.current, {
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        autoRotate: false,
        alignOrigin: [0.5, 0.5],
      },
      duration: 4,
      repeat: -1,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <svg
      width="1202"
      height="805"
      viewBox="0 0 1202 805"
      className="absolute top-0 left-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glowBall">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 어두운 베이스 선 */}
      <path
        d="M-260 777C-222.167 659.203 -92.8211 438.938 121.897 500.254C390.295 576.898 360.06 588.831 449.836 582.865C597.943 516.776 488.444 369.454 425.648 293.268C362.851 217.083 336.046 138.781 346.57 100.51C362.851 41.3054 420.531 13.7685 644.273 134.472C823.267 231.035 930.968 280.571 962.444 293.268C1010.2 308.872 1141 341 1170 273.5C1196.66 211.441 1094.8 58.5393 858.5 -64"
        stroke="#3e1e03"
        strokeWidth={45}
        fill="none"
      />

      {/* 흐릿한 밝은 라인 (전체) */}
      <path
        ref={pathRef}
        d="M-260 777C-222.167 659.203 -92.8211 438.938 121.897 500.254C390.295 576.898 360.06 588.831 449.836 582.865C597.943 516.776 488.444 369.454 425.648 293.268C362.851 217.083 336.046 138.781 346.57 100.51C362.851 41.3054 420.531 13.7685 644.273 134.472C823.267 231.035 930.968 280.571 962.444 293.268C1010.2 308.872 1141 341 1170 273.5C1196.66 211.441 1094.8 58.5393 858.5 -64"
        stroke="#FFC28D"
        strokeWidth={40}
        fill="none"
        opacity={0.15}
      />

      {/* 빛나는 움직이는 점 */}
      <circle ref={glowBallRef} r="14" fill="#FFD28D" filter="url(#glowBall)" />
    </svg>
  );
}
