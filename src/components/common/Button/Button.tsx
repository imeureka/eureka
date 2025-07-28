'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/util';
import gsap from 'gsap';
// @ts-ignore
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  showDots?: boolean;
  dotCount?: 1 | 2;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, showDots = true, dotCount = 1, className, ...props }, ref) => {
    const dot1Ref = useRef<SVGPathElement>(null);
    const dot2Ref = useRef<SVGPathElement>(null);

    const baseClasses =
      'inline-flex items-center justify-between font-semibold rounded-full transition-colors duration-200';

    const variantClasses = {
      primary: 'bg-slate-800 text-white hover:bg-slate-700',
      secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300',
    };

    const sizeClasses = {
      sm: 'px-6 py-3 text-sm gap-3',
      md: 'px-8 py-4 text-base gap-4',
      lg: 'px-10 py-5 text-lg gap-5',
    };

    // Circle path (초기 상태)
    const circlePath = 'M4,0 A4,4 0 1,0 7.0001,0 Z';

    // Button-like pill shape path (변형 목표)
    const buttonPath =
      'M24.2775 13.2785C24.2775 17.9453 7.73339 16.8999 2.02001 16.8999C-3.69337 16.8999 4.52792 12.815 4.52792 8.14818C3.27398 2.71606 8.84605 0 14.5594 0C28.9438 0 24.2775 8.61173 24.2775 13.2785Z';

    const handleMouseEnter = () => {
      if (dot1Ref.current) {
        gsap.to(dot1Ref.current, {
          duration: 0.4,
          morphSVG: buttonPath,
          ease: 'power2.out',
        });
      }
      if (dot2Ref.current && dotCount === 2) {
        gsap.to(dot2Ref.current, {
          duration: 0.4,
          morphSVG: buttonPath,
          ease: 'power2.out',
          delay: 0.1, // 약간의 딜레이로 순차적 효과
        });
      }
    };

    const handleMouseLeave = () => {
      if (dot1Ref.current) {
        gsap.to(dot1Ref.current, {
          duration: 0.3,
          morphSVG: circlePath,
          ease: 'power2.in',
        });
      }
      if (dot2Ref.current && dotCount === 2) {
        gsap.to(dot2Ref.current, {
          duration: 0.3,
          morphSVG: circlePath,
          ease: 'power2.in',
          delay: 0.05,
        });
      }
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}>
        <span>{children}</span>
        {showDots && (
          <div className="flex gap-1">
            {/* 첫 번째 점 */}
            <svg width="28" height="18" viewBox="0 0 28 18" className="overflow-visible">
              <path ref={dot1Ref} d={circlePath} fill={variant === 'primary' ? 'white' : '#1e293b'} />
            </svg>

            {/* 두 번째 점 (dotCount가 2일 때만) */}
            {dotCount === 2 && (
              <svg width="28" height="18" viewBox="0 0 28 18" className="overflow-visible">
                <path ref={dot2Ref} d={circlePath} fill={variant === 'primary' ? 'white' : '#1e293b'} />
              </svg>
            )}
          </div>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
