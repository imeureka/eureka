'use client';

import React from 'react';
import { cn } from '@/util'; // className 병합 유틸, 필요 없으면 제거하세요

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center font-semibold rounded-full transition-colors duration-200 focus:outline-none ';

    const variantClasses = {
      primary: 'bg-slate-800 text-white hover:bg-slate-700 ',
      secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 0',
    };

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button ref={ref} className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
