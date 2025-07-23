// 'use client';

// import { MouseEvent, useCallback, ButtonHTMLAttributes, ReactNode } from 'react';
// import { ReactRef } from '@/types';

// import { cn } from '@/util';
// import useDOMRef from '@/hooks/useDOMRef';

// export type UseButtonProp = ButtonHTMLAttributes<HTMLButtonElement> & {
//   ref?: ReactRef<HTMLButtonElement>;
//   leftIcon?: ReactNode;
//   rightIcon?: ReactNode;
//   isLoading?: boolean;
// };

// export function useButton(props: UseButtonProp) {
//   const { ref, onClick, disabled, isLoading, className, ...otherProps } = props;
//   const domRef = useDOMRef(ref);

//   const handleClick = useCallback(
//     (e: MouseEvent<HTMLButtonElement>) => {
//       if (!disabled && !isLoading) {
//         onClick?.(e);
//       }
//     },
//     [disabled, onClick, isLoading],
//   );

//   const getButtonProps = useCallback(
//     () => ({
//       disabled,
//       ...otherProps,
//       ref: domRef,
//       onClick: handleClick,
//       className: cn(
//         'relative py-10 px-40 rounded-button bg-primary h-51 text-[22px] text-[#fff] flex items-center gap-10 justify-center focus:outline-none',
//         disabled && 'cursor-not-allowed opacity-70',
//         isLoading && 'cursor-not-allowed',
//         className,
//       ),
//     }),
//     [handleClick, otherProps, disabled, className, domRef, isLoading],
//   );

//   const getLoadingSpinnerProps = useCallback(
//     () => ({
//       className: '',
//     }),
//     [],
//   );

//   return { getButtonProps, getLoadingSpinnerProps, isLoading };
// }
