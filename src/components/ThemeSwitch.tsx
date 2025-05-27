'use client';

import { useState, useEffect } from 'react';

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', isDark);
      localStorage.removeItem('theme');
    } else {
      root.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  if (!mounted) return null;

  return (
    <div className='flex items-center gap-2'>
      <button
        onClick={() => setTheme('light')}
        className={`rounded-full p-2 ${theme === 'light' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        aria-label='Light theme'
      >
        <img src='/LightTheme.svg' alt='Light theme' className='h-6 w-6' />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`rounded-full p-2 ${theme === 'dark' ? 'bg-gray-800' : 'hover:bg-gray-700'}`}
        aria-label='Dark theme'
      >
        <img src='/DarkTheme.svg' alt='Dark theme' className='h-6 w-6' />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`rounded-full p-2 ${theme === 'system' ? 'bg-gray-300 dark:bg-gray-600' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        aria-label='System theme'
      >
        <img src='/SystemTheme.svg' alt='System theme' className='h-6 w-6' />
      </button>
    </div>
  );
}
