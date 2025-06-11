'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FeaturedWork from '@/components/FeaturedWork';
import Header from '@/components/Header';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(textRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });

      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();

        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        });
      }
    },
    { scope: container },
  );

  return (
    <main
      ref={container}
      className="h-[200vh] bg-[#E8E9F1] flex flex-col items-start relative overflow-hidden px-8 pt-24">
      <Header />
      <svg viewBox="0 0 1440 1024" className="absolute top-0 left-0 w-full h-full z-0">
        <path
          ref={pathRef}
          d="M1308 112C959.619 68.589 747.5 188 561.5 358C371.964 530.357 271.612 723.947 114.5 912.5C91.8709 940.316 22.2186 987.539 10 910.5C1.17811 854.706 36.8925 768.012 114.5 752C218.426 730.517 365.346 830.093 488.5 896C711.658 1015.09 959.619 1228.25 1278 1024"
          stroke="#3D43F0"
          strokeWidth="20"
          fill="none"
        />
      </svg>

      <div className="z-10 max-w-5xl w-full flex flex-col md:flex-row items-center md:justify-start gap-16 mx-auto relative">
        <div className="text-black" ref={textRef}>
          <h1 className="text-6xl font-extrabold mb-8 leading-tight">
            Beyond Code <br /> Toward Better Lives
          </h1>
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
