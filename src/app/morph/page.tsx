'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
// @ts-ignore
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin);

export default function MorphPage() {
  const shapeRef = useRef<SVGPathElement>(null);

  const handleMorph = () => {
    if (shapeRef.current) {
      gsap.to(shapeRef.current, {
        duration: 1,
        morphSVG: '#star', // 변형 대상
        ease: 'power1.inOut',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <svg viewBox="0 0 200 200" width={300} height={300} className="mb-6">
        {/* 원 모양 (초기 상태) */}
        <path
          ref={shapeRef}
          d="M100,50 a50,50 0 1,0 0.1,0" // circle
          fill="#FF6B6B"
        />

        {/* 목표 모양 (숨김) */}
        <path
          id="star"
          d="M100,10 L120,70 L180,70 L130,110 L150,170 L100,130 L50,170 L70,110 L20,70 L80,70 Z"
          fill="#FF6B6B"
          style={{ visibility: 'hidden' }}
        />
      </svg>

      <button onClick={handleMorph} className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
        Morph!
      </button>
    </div>
  );
}
