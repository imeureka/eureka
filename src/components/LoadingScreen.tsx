'use client';

import { useEffect, useState } from 'react';

const SimpleLoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 간단한 프로그레스 증가
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 0);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col items-center justify-center transition-colors duration-300">
      {/* 로고 */}
      <div className="mb-8 animate-pulse">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center">
          <span className="text-white font-bold text-xl">K</span>
        </div>
      </div>

      {/* 로딩 텍스트 */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Loading...</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Just a moment</p>
      </div>

      {/* 프로그레스 바 */}
      <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-400 to-pink-400 rounded-full transition-all duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 프로그레스 퍼센트 */}
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">{progress}%</div>
    </div>
  );
};

export default SimpleLoadingScreen;
