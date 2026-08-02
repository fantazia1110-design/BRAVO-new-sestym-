'use client';

import React from 'react';

/**
 * شريط علوي ثابت يمتد بعرض منطقة المحتوى.
 * المساحة على اليمين محجوزة لزر فتح القائمة في شاشات الموبايل.
 */
export default function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar-right" aria-hidden="true" />
    </header>
  );
}
