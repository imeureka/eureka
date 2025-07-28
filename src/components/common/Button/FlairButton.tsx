'use client';

import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { cn } from '@/util'; // shadcn/ui 스타일 유틸리티

interface FlairButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  flairColor?: string;
}

const FlairButton = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  disabled = false,
  onClick,
  flairColor = 'bg-white',
}: FlairButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const flairRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);

  // 사이즈별 스타일
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // 변형별 스타일
  const variantClasses = {
    default: 'bg-black text-white border-none hover:text-black',
    outline: 'border-2 border-none text-black bg-transparent hover:text-white',
    ghost: 'border-none text-black bg-transparent hover:text-white',
    destructive: 'bg-red-600 text-white border-none hover:text-white',
  };

  // 변형별 플레어 색상
  const flairColors = {
    default: 'bg-white',
    outline: 'bg-black',
    ghost: 'bg-black',
    destructive: 'bg-red-200',
  };

  const getXY = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  }, []);

  const handleEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!flairRef.current || isAnimatingRef.current || disabled) return;

      const { x, y } = getXY(e);

      gsap.killTweensOf(flairRef.current);
      isAnimatingRef.current = true;

      gsap.set(flairRef.current, {
        x: x,
        y: y,
        scale: 0,
        transformOrigin: 'center center',
      });

      gsap.to(flairRef.current, {
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    },
    [getXY, disabled],
  );

  const handleLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!flairRef.current || disabled) return;

      const { x, y } = getXY(e);

      gsap.killTweensOf(flairRef.current);
      isAnimatingRef.current = true;

      gsap.to(flairRef.current, {
        x: x,
        y: y,
        scale: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    },
    [getXY, disabled],
  );

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!flairRef.current || isAnimatingRef.current || disabled) return;

      const { x, y } = getXY(e);

      gsap.to(flairRef.current, {
        x: x,
        y: y,
        duration: 0.15,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    },
    [getXY, disabled],
  );

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // 기본 스타일
        'relative inline-flex items-center justify-center font-semibold rounded-full overflow-hidden transition-all duration-200  active:scale-95',
        // 사이즈
        sizeClasses[size],
        // 변형
        variantClasses[variant],
        // 비활성화 상태
        disabled && 'opacity-50 cursor-not-allowed',
        // 커스텀 클래스
        className,
      )}>
      <span className="relative z-10 transition-colors duration-200">{children}</span>

      <span
        ref={flairRef}
        className="absolute pointer-events-none"
        style={{
          width: '200px',
          height: '200px',
          transform: 'translate(-50%, -50%) scale(0)',
        }}>
        <span className={cn('absolute inset-0 rounded-full', flairColor || flairColors[variant])} />
      </span>
    </button>
  );
};

export default FlairButton;
