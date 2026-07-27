'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

interface ThemeToggleProps {
  /** إظهار النص بجانب الأيقونة */
  showLabel?: boolean;
  className?: string;
}

export default function ThemeToggle({ showLabel = true, className = '' }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      aria-label={isDark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
      title={isDark ? 'الوضع الفاتح' : 'الوضع الداكن'}
    >
      <span className="theme-toggle-icon">
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </span>
      {showLabel && (
        <span className="theme-toggle-label">
          {isDark ? 'الوضع الفاتح' : 'الوضع الداكن'}
        </span>
      )}
    </button>
  );
}
