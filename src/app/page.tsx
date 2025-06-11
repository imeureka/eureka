'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FeaturedWork from '@/components/FeaturedWork';
import Header from '@/components/Header';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export default function Home() {
  const container = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const vector6Ref = useRef<SVGPathElement>(null);
  const vector7Ref = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      // 텍스트 페이드인 애니메이션
      if (textRef.current) {
        gsap.fromTo(textRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
      }

      const animatePath = (path: SVGPathElement | null) => {
        if (!path) return;

        gsap.fromTo(
          path,
          { drawSVG: '0%' },
          {
            drawSVG: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: container.current,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
            },
          },
        );
      };

      animatePath(vector6Ref.current);
      animatePath(vector7Ref.current);
    },
    { scope: container },
  );

  return (
    <main
      ref={container}
      className="h-[200vh] bg-[#E8E9F1] flex flex-col items-start relative overflow-hidden px-8 pt-24">
      <Header />
      {/* vector 6 */}
      {/* TODO: 애니메이션 사이즈 및 크기 조절 */}
      <svg
        width="30%"
        viewBox="0 0 496 330"
        className="absolute top-0 left-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          ref={vector6Ref}
          d="M-20.5913 183.44C126.033 140.6 136.494 301.372 89.2738 309.357C25.4699 320.146 59.5532 150.202 203.378 61.6678C316.027 -7.6749 404.017 13.9683 480.169 107.645"
          stroke="#3B48F4"
          strokeWidth="40"
        />
      </svg>

      {/* vector 7 */}
      <svg
        width="50%"
        viewBox="0 0 986 534"
        className="absolute top-150 right-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          ref={vector7Ref}
          d="M34.489 5.30199C-9.98855 173.836 45.3868 293.77 235.938 363.483C479.225 452.49 675.806 311.091 603 247C549.117 199.567 366.44 338.804 556 470.5C698.667 574 1089.2 456.5 1116 458.5"
          stroke="#3B48F4"
          strokeWidth="40"
        />
      </svg>

      <div className="z-10 max-w-5xl w-full md:flex-row items-center md:justify-start gap-16 mx-auto relative mt-5">
        <div className="text-black" ref={textRef}>
          <h1 className="text-6xl font-extrabold mb-8 leading-tight">
            Beyond Code <br /> Toward Better Lives
          </h1>
        </div>
        <div className="md:w-1/2 md:ml-[50%]">
          <p className="text-lg font-semibold leading-relaxed mb-6 max-w-lg">
            I am a human-centered front-end developer. Through development, I strive to ensure that no one is left
            behind by technology, creating web experiences that make everyone's lives a little better. Beyond
            interfaces, I pursue technologies that understand the context of people.
          </p>
          <button className="bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-neutral-800 transition">
            ABOUT ME
          </button>
        </div>
      </div>
      <FeaturedWork />
    </main>
  );
}
