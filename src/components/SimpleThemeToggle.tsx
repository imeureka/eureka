'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const SimpleThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
      {theme === 'dark' ? '🌞' : '🌙'}
      {theme === 'dark' ? ' Light' : ' Dark'}
    </button>
  );
};

export default SimpleThemeToggle;
