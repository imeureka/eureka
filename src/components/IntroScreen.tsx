// IntroScreen.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const IntroScreen = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    if (!container || !logo) return;

    const tl = gsap.timeline({
      onComplete: onComplete,
    });

    // 시작 상태 설정
    gsap.set(logo, {
      scale: 0.8,
      opacity: 0,
    });

    // 시퀀스
    tl.to(logo, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',
    })
      .to(
        logo,
        {
          scale: 80,
          duration: 1.4,
          ease: 'power4.inOut',
        },
        '+=0.2',
      )
      .to(
        container,
        {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.3',
      );
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-orange-100 to-pink-200 dark:from-gray-900 dark:to-gray-800 transition-opacity duration-500">
      <div
        ref={logoRef}
        className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 text-white text-3xl font-bold flex items-center justify-center shadow-xl"></div>
    </div>
  );
};

export default IntroScreen;
