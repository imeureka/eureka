'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FeaturedWork from '@/components/FeaturedWork';
import Header from '@/components/Header';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import CardGallery from '@/components/CardGallery';
import ExplodeButton from '@/components/common/Button/ExplodeButton';
import TimelineAnimation from '@/components/TimelineAnimation';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export default function Home() {
  const container = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const vector6Ref = useRef<SVGPathElement>(null);
  const vector7Ref = useRef<SVGPathElement>(null);

  // useGSAP(
  //   () => {
  //     if (!pathRef.current) return;

  //     const pathLength = pathRef.current.getTotalLength();

  //     gsap.set(pathRef.current, {
  //       strokeDasharray: pathLength,
  //       strokeDashoffset: pathLength,
  //     });

  //     gsap.to(pathRef.current, {
  //       strokeDashoffset: 0,
  //       duration: 2,
  //       ease: 'power2.inOut',
  //       repeat: -1,
  //       repeatDelay: 1,
  //     });
  //   },
  //   { scope: container },
  // );

  return (
    <main ref={container} className="flex flex-col items-start relative overflow-hidden pt-24">
      <Header />

      <TimelineAnimation />
      <svg
        width="1202"
        height="805"
        viewBox="0 0 1202 805"
        className="absolute top-0 left-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          ref={pathRef}
          d="M-260 777C-222.167 659.203 -92.8211 438.938 121.897 500.254C390.295 576.898 360.06 588.831 449.836 582.865C597.943 516.776 488.444 369.454 425.648 293.268C362.851 217.083 336.046 138.781 346.57 100.51C362.851 41.3054 420.531 13.7685 644.273 134.472C823.267 231.035 930.968 280.571 962.444 293.268C1010.2 308.872 1141 341 1170 273.5C1196.66 211.441 1094.8 58.5393 858.5 -64"
          stroke="#FFC28D"
          strokeWidth={40}
        />
      </svg>

      <div className="z-50 max-w-5xl w-full md:flex-row items-center md:justify-start gap-16 mx-auto relative mt-5">
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
          <ExplodeButton>GITHUB</ExplodeButton>
        </div>
      </div>

      <section>
        <CardGallery />
      </section>

      <section className="pt-30">
        <FeaturedWork />
      </section>
    </main>
  );
}
