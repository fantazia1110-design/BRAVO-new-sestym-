'use client';

import React from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';

/**
 * شريط علوي ثابت يمتد بعرض منطقة المحتوى.
 * زر الوضع الليلي/النهاري مثبّت في أقصى اليسار كما هو مطلوب.
 * المساحة على اليمين محجوزة لزر فتح القائمة في شاشات الموبايل.
 */
export default function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <ThemeToggle />
      </div>
      <div className="topbar-right" aria-hidden="true" />
    </header>
  );
}
