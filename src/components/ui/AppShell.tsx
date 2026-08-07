'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/ui/Sidebar';
import SectionSidebar from '@/components/ui/SectionSidebar';
import TopBar from '@/components/ui/TopBar';

/** 
 * غلاف التطبيق - يخفي القائمة الجانبية في الصفحة الرئيسية
 * ويستخدم قائمة جانبية مدمجة لكل قسم
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  // تحديد القسم من الـ pathname
  const getSectionId = () => {
    if (pathname.startsWith('/detergents')) return 'detergents';
    if (pathname.startsWith('/cosmetics')) return 'cosmetics';
    if (pathname.startsWith('/perfumes')) return 'perfumes';
    return null;
  };

  const sectionId = getSectionId();

  if (isLanding) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }

  // الأقسام المدمجة - قائمة جانبية خاصة بكل قسم
  if (sectionId) {
    return (
      <div className="min-h-screen app-shell">
        <SectionSidebar sectionId={sectionId} />
        <TopBar />
        <main className="main-content">
          {children}
        </main>
      </div>
    );
  }

  // باقي الصفحات - القائمة الجانبية العامة
  return (
    <div className="min-h-screen app-shell">
      <Sidebar />
      <TopBar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
