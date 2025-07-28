import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/util';

interface DotFillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  showDots?: boolean;
  dotCount?: 1 | 2;
  animationTrigger?: 'hover' | 'click';
}

const DotFillButton = React.forwardRef<HTMLButtonElement, DotFillButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      showDots = true,
      dotCount = 1,
      animationTrigger = 'hover',
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dotsContainerRef = useRef<HTMLDivElement>(null);
    const fillLayerRef = useRef<HTMLDivElement>(null);

    const baseClasses =
      'relative inline-flex items-center justify-between font-semibold rounded-full transition-colors duration-200 overflow-hidden border-2';

    const variantClasses = {
      primary: 'bg-transparent border-slate-800 text-slate-800 hover:text-white',
      secondary: 'bg-transparent border-slate-300 text-slate-800 hover:text-white',
    };

    const sizeClasses = {
      sm: 'px-6 py-3 text-sm gap-3',
      md: 'px-8 py-4 text-base gap-4',
      lg: 'px-10 py-5 text-lg gap-5',
    };

    // 원래 dot 색상과 fill 색상 정의
    const dotColor = variant === 'primary' ? '#1e293b' : '#cbd5e1'; // slate-800 : slate-300
    const fillColor = variant === 'primary' ? '#1e293b' : '#64748b'; // slate-800 : slate-600

    useEffect(() => {
      const button = buttonRef.current;
      const dotsContainer = dotsContainerRef.current;
      const fillLayer = fillLayerRef.current;

      if (!button || !dotsContainer || !fillLayer) return;

      const dots = dotsContainer.querySelectorAll('.dot');
      let tl: gsap.core.Timeline;

      // 초기 설정
      gsap.set(fillLayer, {
        scale: 0,
        opacity: 0,
        transformOrigin: 'right center', // dots 위치에서 시작
      });

      // 애니메이션 함수
      const startFillAnimation = () => {
        tl = gsap.timeline();

        // 1. 먼저 dot들이 배경색으로 변함 (사라지는 효과)
        tl.to(dots, {
          backgroundColor: fillColor,
          scale: 1.2,
          duration: 0.2,
          ease: 'power2.out',
        })
          // 2. fill layer가 확장되면서 버튼을 채움
          .to(
            fillLayer,
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
            },
            '-=0.1',
          ) // 약간 겹치게 시작
          // 3. dot들이 완전히 사라짐 (fill과 같은 색이므로)
          .to(
            dots,
            {
              opacity: 0,
              duration: 0.2,
              ease: 'power2.out',
            },
            '-=0.2',
          );
      };

      const reverseFillAnimation = () => {
        if (tl) {
          tl.reverse();
        } else {
          // 역방향 애니메이션이 없을 때의 초기화
          gsap.to(fillLayer, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
          });
          gsap.to(dots, {
            backgroundColor: dotColor,
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      };

      // 이벤트 리스너 설정
      if (animationTrigger === 'hover') {
        const handleMouseEnter = () => {
          gsap.to(button, { scale: 1.05, duration: 0.2 });
          startFillAnimation();
        };

        const handleMouseLeave = () => {
          gsap.to(button, { scale: 1, duration: 0.2 });
          reverseFillAnimation();
        };

        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          button.removeEventListener('mouseenter', handleMouseEnter);
          button.removeEventListener('mouseleave', handleMouseLeave);
        };
      } else {
        // click 트리거
        const handleClick = () => {
          gsap.to(button, { scale: 0.95, duration: 0.1 }).then(() => gsap.to(button, { scale: 1, duration: 0.1 }));

          startFillAnimation();

          // 1초 후 자동으로 되돌림
          setTimeout(() => {
            reverseFillAnimation();
          }, 1000);
        };

        button.addEventListener('click', handleClick);

        return () => {
          button.removeEventListener('click', handleClick);
        };
      }
    }, [animationTrigger, variant, dotColor, fillColor]);

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(e);
    };

    return (
      <button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        onClick={handleButtonClick}
        {...props}>
        {/* Fill Layer - 버튼을 채우는 배경 */}
        <div ref={fillLayerRef} className="absolute inset-0 rounded-full" style={{ backgroundColor: fillColor }} />

        {/* 버튼 텍스트 */}
        <span className="relative z-10 font-semibold">{children}</span>

        {/* 도트들 */}
        {showDots && (
          <div ref={dotsContainerRef} className="flex gap-1 relative z-10">
            {Array.from({ length: dotCount }, (_, i) => (
              <div
                key={i}
                className="dot w-2 h-2 rounded-full transition-all duration-200"
                style={{ backgroundColor: dotColor }}
              />
            ))}
          </div>
        )}
      </button>
    );
  },
);

DotFillButton.displayName = 'DotFillButton';

export default DotFillButton;
