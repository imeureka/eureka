'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const PARTICLE_COUNT = 20;

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = containerRef.current.querySelectorAll('.particle');

    particles.forEach((particle) => {
      const duration = gsap.utils.random(4, 8);
      const delay = gsap.utils.random(0, 4);
      const x = gsap.utils.random(-50, 50);
      const y = gsap.utils.random(-80, 80);
      const scale = gsap.utils.random(0.4, 1.2);
      const opacity = gsap.utils.random(0.2, 0.8);

      gsap.to(particle, {
        x,
        y,
        scale,
        opacity,
        duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
      });
    });
  }, [mounted]);

  if (!mounted) return null; // SSR 단계에서는 아무것도 렌더링하지 않음

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const width = gsap.utils.random(8, 20);
        const height = gsap.utils.random(8, 20);
        const top = gsap.utils.random(0, 100);
        const left = gsap.utils.random(0, 100);

        return (
          <div
            key={i}
            className="particle absolute rounded-full bg-orange-300/30 blur-sm"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              top: `${top}%`,
              left: `${left}%`,
            }}
          />
        );
      })}
    </div>
  );
}
