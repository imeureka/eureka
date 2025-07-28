import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/util';

interface GSAPRippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  showDots?: boolean;
  dotCount?: 1 | 2;
}

const GSAPRippleButton = React.forwardRef<HTMLButtonElement, GSAPRippleButtonProps>(
  (
    { variant = 'primary', size = 'md', children, showDots = true, dotCount = 1, className, onClick, ...props },
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const rippleRef = useRef<HTMLDivElement>(null);
    const hoverRippleRef = useRef<HTMLDivElement>(null);
    const dotsRef = useRef<HTMLDivElement>(null);

    const baseClasses =
      'relative inline-flex items-center justify-between font-semibold rounded-full transition-colors duration-200 overflow-hidden';

    const variantClasses = {
      primary: 'bg-slate-800 text-white',
      secondary: 'bg-slate-200 text-slate-800',
    };

    const sizeClasses = {
      sm: 'px-6 py-3 text-sm gap-3',
      md: 'px-8 py-4 text-base gap-4',
      lg: 'px-10 py-5 text-lg gap-5',
    };

    useEffect(() => {
      const button = buttonRef.current;
      const ripple = rippleRef.current;
      const hoverRipple = hoverRippleRef.current;
      const dots = dotsRef.current;

      if (!button || !ripple || !hoverRipple) return;

      // 초기 설정
      gsap.set(ripple, { scale: 0, opacity: 0 });
      gsap.set(hoverRipple, { scale: 0, opacity: 0 });

      // Hover 애니메이션
      const handleMouseEnter = () => {
        gsap.to(button, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
        gsap.to(hoverRipple, {
          scale: 1,
          opacity: 0.8,
          duration: 0.3,
          ease: 'power2.out',
          transformOrigin: showDots ? 'right center' : 'center',
        });

        if (dots) {
          gsap.to(dots.children, {
            scale: 1.2,
            duration: 0.2,
            stagger: 0.05,
            ease: 'back.out(1.7)',
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(button, { scale: 1, duration: 0.2, ease: 'power2.out' });
        gsap.to(hoverRipple, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
        });

        if (dots) {
          gsap.to(dots.children, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
          });
        }
      };

      // 클릭 애니메이션
      const handleClick = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 리플 위치 설정
        gsap.set(ripple, {
          left: x - 10,
          top: y - 10,
          scale: 0,
          opacity: 1,
        });

        // 클릭 애니메이션
        gsap.to(button, { scale: 0.95, duration: 0.1, ease: 'power2.out' }).then(() => {
          gsap.to(button, { scale: 1.05, duration: 0.1, ease: 'power2.out' });
        });

        // 리플 애니메이션
        gsap.to(ripple, {
          scale: 15,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
      button.addEventListener('click', handleClick);

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
        button.removeEventListener('click', handleClick);
      };
    }, [showDots]);

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
        {/* 기본 버튼 콘텐츠 */}
        <span className="relative z-10">{children}</span>

        {/* 도트들 */}
        {showDots && (
          <div ref={dotsRef} className="flex gap-1 relative z-10">
            {Array.from({ length: dotCount }, (_, i) => (
              <div
                key={i}
                className={cn('w-2 h-2 rounded-full', variant === 'primary' ? 'bg-white' : 'bg-slate-800')}
              />
            ))}
          </div>
        )}

        {/* Hover 리플 이펙트 */}
        <div
          ref={hoverRippleRef}
          className={cn(
            'absolute inset-0 rounded-full',
            variant === 'primary'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600'
              : 'bg-gradient-to-r from-slate-300 to-slate-400',
          )}
        />

        {/* 클릭 리플 이펙트 */}
        <div
          ref={rippleRef}
          className={cn(
            'absolute w-5 h-5 rounded-full pointer-events-none',
            variant === 'primary' ? 'bg-white/30' : 'bg-slate-800/30',
          )}
        />
      </button>
    );
  },
);

GSAPRippleButton.displayName = 'GSAPRippleButton';

export default GSAPRippleButton;
