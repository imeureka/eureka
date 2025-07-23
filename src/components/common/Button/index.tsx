// 'use client';

// import { forwardRef } from 'react';
// // import { Icons } from '../Icons';
// import { useButton, type UseButtonProp } from './useButton';

// const Button = forwardRef<HTMLButtonElement, UseButtonProp>(({ children, leftIcon, rightIcon, ...props }, ref) => {
//   const { getButtonProps, isLoading, getLoadingSpinnerProps } = useButton({ ...props, ref });

//   return (
//     // eslint-disable-next-line react/button-has-type
//     <button {...getButtonProps()}>
//       {leftIcon}

//       {isLoading ? (
//         <div {...getLoadingSpinnerProps()}>
//           {/* <Icons name="loading-spinner" className="w-20 h-20 loading-spinner" /> */}
//         </div>
//       ) : (
//         children
//       )}

//       {rightIcon}
//     </button>
//   );
// });

// Button.displayName = 'Crayon-Button';

// export default Button;
