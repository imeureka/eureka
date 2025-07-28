'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export default function Home() {
  const container = useRef<HTMLElement | null>(null);
  const path1 = useRef<SVGPathElement>(null);
  const path2 = useRef<SVGPathElement>(null);
  const path3 = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const animatePath = (ref: SVGPathElement | null, delay = 0) => {
        if (!ref) return;
        gsap.fromTo(
          ref,
          { drawSVG: '0%' },
          {
            drawSVG: '100%',
            duration: 2,
            ease: 'power1.inOut',
            delay,
            scrollTrigger: {
              trigger: container.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: true,
            },
          },
        );
      };

      animatePath(path1.current, 0);
      animatePath(path2.current, 0.2);
      animatePath(path3.current, 0.4);
    },
    { scope: container },
  );

  return (
    <main ref={container} className="relative h-[200vh] bg-white overflow-hidden">
      <svg
        width="100%"
        height="100vh"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0">
        {/* 곡선 1 - 큰 아치 */}
        <path ref={path1} d="M -200 800 Q 400 200 1200 800" stroke="#4A2BFF" strokeWidth="20" fill="none" />
        {/* 곡선 2 - 작은 아치 */}
        <path ref={path2} d="M -100 700 Q 500 300 1300 700" stroke="#8A68FF" strokeWidth="16" fill="none" />
        {/* 곡선 3 - 역방향 곡선 */}
        <path ref={path3} d="M 200 800 Q 900 100 1600 800" stroke="#D0C8FF" strokeWidth="12" fill="none" />
      </svg>

      <div className="relative z-10 pt-[40vh] px-10 max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-8">
          Beyond Visions <br /> Within Reach
        </h1>
        <p className="text-lg mb-6 text-gray-700">
          Just like Lusion, this site draws curves as you scroll, pushing design boundaries.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-full">ABOUT US</button>
      </div>
    </main>
  );
}
