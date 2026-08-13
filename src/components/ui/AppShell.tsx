'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/ui/Sidebar';
import SectionSidebar from '@/components/ui/SectionSidebar';
import TopBar from '@/components/ui/TopBar';

/** 
 * غلاف التطبيق - يخفي القائمة الجانبية في الصفحة الرئيسية
 * - الصفحة الرئيسية / : بدون سايدبار
 * - الأقسام /detergents /cosmetics /perfumes : سايدبار خاص بكل قسم (17 تاب كامل)
 * - باقي الصفحات : السايدبار العام القديم بكل وظائفه الكاملة
 * تمت إعادة السايدبار العام حسب الطلب
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === '/';

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

  // الأقسام المدمجة - قائمة جانبية خاصة بكل قسم (17 تاب كامل - كل الوظائف)
  if (sectionId) {
    return (
      <Suspense fallback={<div className="min-h-screen" />}>
        <div className="min-h-screen app-shell">
          <SectionSidebar sectionId={sectionId} />
          <TopBar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </Suspense>
    );
  }

  // باقي الصفحات - السايدبار العام القديم بكل وظائفه الكاملة (تمت إعادته)
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
