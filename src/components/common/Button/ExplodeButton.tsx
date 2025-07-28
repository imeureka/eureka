'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const shapes = [
  'M254 286.11a50 50 0 0050-50H204a50 50 0 0050 50z',
  'M255.5 271a20 20 0 10-20-20 20 20 0 0020 20zm0 30a50 50 0 10-50-50 50 50 0 0050 50z',
  'M248.8 202.17a8 8 0 019.4 0l40.6 29.5a8 8 0 012.9 8.94l-15.5 47.73a8 8 0 01-7.61 5.52h-50.18a8 8 0 01-7.61-5.52l-15.5-47.73a8 8 0 012.9-8.94z',
  'M307.5 250a50 50 0 11-50-50 50 50 0 0150 50',
  'M248.08 204.07a11.91 11.91 0 0116.84 0l30.59 30.59a11.91 11.91 0 11-16.85 16.85l-10.25-10.25v47.41a11.91 11.91 0 11-23.82 0v-47.41l-10.25 10.25a11.91 11.91 0 01-16.85-16.85z',
  'M234 237a22.5 22.5 0 0045 0h27.5a50 50 0 01-100 0z',
  'M258 202.5a12 12 0 00-12 12v26h-26a12 12 0 000 24h26v26a12 12 0 0024 0v-26h26a12 12 0 000-24h-26v-26a12 12 0 00-12-12z',
];

const colors = ['#FF6F00', '#FF8F00', '#FFAB40', '#fff9a0', '#ffdf10', '#ffb53e'];

export default function ExplodeButton({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const numberOfShapes = 10;

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;

    if (!container || !svg) return;

    const handleMouseEnter = () => {
      let animatedShapes: SVGPathElement[] = [];

      for (let i = 0; i < numberOfShapes; i++) {
        const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        shape.setAttribute('d', gsap.utils.random(shapes));
        shape.setAttribute('fill', gsap.utils.random(colors));
        svg.appendChild(shape);
        animatedShapes.push(shape);
      }

      gsap.set(animatedShapes, {
        transformOrigin: 'center',
        scale: 'random(0.4, 0.8)',
      });

      gsap.to(animatedShapes, {
        keyframes: [
          {
            rotate: 'random(180, -180)',
            x: 'random([-150, -100, -200, 200, 100, 150])',
            yPercent: 'random(-100, -500 100)',
            ease: 'expo.out',
            duration: 4,
            stagger: { amount: 0.1 },
          },
          { opacity: 0, duration: 0.2, delay: -3 },
        ],
        onComplete: () => {
          animatedShapes.forEach((s) => svg.removeChild(s));
        },
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    return () => container.removeEventListener('mouseenter', handleMouseEnter);
  }, []);

  return (
    <a
      ref={containerRef}
      href="#"
      className="explode-button relative inline-block px-10 py-3 rounded-full border-2 border-white bg-black text-white font-semibold  text-center">
      <p className="relative z-10">{children}</p>
      <svg
        ref={svgRef}
        className="absolute top-1/2 left-1/2 w-[500%] h-[500%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        viewBox="0 0 500 500"
        aria-hidden
      />
    </a>
  );
}
