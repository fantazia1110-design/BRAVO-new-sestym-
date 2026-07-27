'use client';

import React, { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'bravo-theme';

interface ThemeContextValue {
  /** الوضع المختار من المستخدم: فاتح / داكن / تلقائي */
  theme: ThemeMode;
  /** الوضع الفعلي المطبَّق على الشاشة */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/* ------------------------------------------------------------------
   مخزن بسيط خارج React لحفظ الوضع ومزامنته مع localStorage والـ DOM
   ------------------------------------------------------------------ */

const listeners = new Set<() => void>();

function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system';
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readStoredMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(stored) ? stored : 'light';
  } catch {
    return 'light';
  }
}

function resolve(mode: ThemeMode): ResolvedTheme {
  return mode === 'system' ? getSystemTheme() : mode;
}

// اللقطة الحالية (مُخزّنة مؤقتاً حتى تبقى مرجعية ثابتة لـ useSyncExternalStore)
let snapshot: { theme: ThemeMode; resolvedTheme: ResolvedTheme } = {
  theme: 'light',
  resolvedTheme: 'light',
};
let initialized = false;

const serverSnapshot: { theme: ThemeMode; resolvedTheme: ResolvedTheme } = {
  theme: 'light',
  resolvedTheme: 'light',
};

function applyToDocument(resolved: ResolvedTheme) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', resolved);
  document.documentElement.style.colorScheme = resolved;
}

function commit(mode: ThemeMode) {
  const resolved = resolve(mode);
  if (snapshot.theme !== mode || snapshot.resolvedTheme !== resolved) {
    snapshot = { theme: mode, resolvedTheme: resolved };
  }
  applyToDocument(resolved);
  listeners.forEach((listener) => listener());
}

function getSnapshot() {
  if (!initialized && typeof window !== 'undefined') {
    initialized = true;
    const mode = readStoredMode();
    snapshot = { theme: mode, resolvedTheme: resolve(mode) };
  }
  return snapshot;
}

function getServerSnapshot() {
  return serverSnapshot;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // إعادة الحساب عند تغيّر إعدادات النظام (للوضع التلقائي)
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const onSystemChange = () => {
    if (snapshot.theme === 'system') commit('system');
  };
  media.addEventListener('change', onSystemChange);

  // مزامنة بين تبويبات المتصفح المفتوحة
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY && isThemeMode(event.newValue)) {
      commit(event.newValue);
    }
  };
  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(listener);
    media.removeEventListener('change', onSystemChange);
    window.removeEventListener('storage', onStorage);
  };
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: ThemeMode) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* التخزين غير متاح — نكمل بدون حفظ */
    }
    commit(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(snapshot.resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: state.theme,
      resolvedTheme: state.resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [state.theme, state.resolvedTheme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme يجب أن يُستخدم داخل ThemeProvider');
  }
  return ctx;
}
