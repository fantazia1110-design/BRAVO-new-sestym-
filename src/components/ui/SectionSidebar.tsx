'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TrendingUp, FlaskConical, Beaker, Package, Factory, Truck,
  ShoppingCart, FileText, Users, Warehouse, BarChart3, Settings,
  ChevronRight, ChevronLeft, Menu, X, LogOut, ArrowRight,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

const sectionNavItems: Record<string, NavItem[]> = {
  detergents: [
    { label: 'نظرة عامة', href: '/detergents', icon: <TrendingUp size={20} />, color: 'text-violet-500' },
    { label: 'المواد الخام', href: '/detergents?tab=raw', icon: <FlaskConical size={20} />, color: 'text-violet-400' },
    { label: 'التركيبات', href: '/detergents?tab=formulas', icon: <Beaker size={20} />, color: 'text-purple-500' },
    { label: 'المنتجات', href: '/detergents?tab=products', icon: <Package size={20} />, color: 'text-fuchsia-400' },
    { label: 'التصنيع', href: '/detergents?tab=production', icon: <Factory size={20} />, color: 'text-purple-500' },
    { label: 'الموردين', href: '/detergents?tab=suppliers', icon: <Truck size={20} />, color: 'text-purple-400' },
    { label: 'المبيعات', href: '/sales', icon: <ShoppingCart size={20} />, color: 'text-fuchsia-500' },
    { label: 'الفواتير', href: '/invoices', icon: <FileText size={20} />, color: 'text-purple-400' },
    { label: 'العملاء', href: '/customers', icon: <Users size={20} />, color: 'text-violet-400' },
    { label: 'المخزون', href: '/inventory', icon: <Warehouse size={20} />, color: 'text-violet-500' },
    { label: 'التقارير', href: '/reports', icon: <BarChart3 size={20} />, color: 'text-violet-500' },
    { label: 'الإعدادات', href: '/settings', icon: <Settings size={20} />, color: 'text-purple-400' },
  ],
  cosmetics: [
    { label: 'نظرة عامة', href: '/cosmetics', icon: <TrendingUp size={20} />, color: 'text-violet-500' },
    { label: 'المواد الخام', href: '/cosmetics?tab=raw', icon: <FlaskConical size={20} />, color: 'text-violet-400' },
    { label: 'التركيبات', href: '/cosmetics?tab=formulas', icon: <Beaker size={20} />, color: 'text-purple-500' },
    { label: 'المنتجات', href: '/cosmetics?tab=products', icon: <Package size={20} />, color: 'text-fuchsia-400' },
    { label: 'التصنيع', href: '/cosmetics?tab=production', icon: <Factory size={20} />, color: 'text-purple-500' },
    { label: 'الموردين', href: '/cosmetics?tab=suppliers', icon: <Truck size={20} />, color: 'text-purple-400' },
    { label: 'المبيعات', href: '/sales', icon: <ShoppingCart size={20} />, color: 'text-fuchsia-500' },
    { label: 'الفواتير', href: '/invoices', icon: <FileText size={20} />, color: 'text-purple-400' },
    { label: 'العملاء', href: '/customers', icon: <Users size={20} />, color: 'text-violet-400' },
    { label: 'المخزون', href: '/inventory', icon: <Warehouse size={20} />, color: 'text-violet-500' },
    { label: 'التقارير', href: '/reports', icon: <BarChart3 size={20} />, color: 'text-violet-500' },
    { label: 'الإعدادات', href: '/settings', icon: <Settings size={20} />, color: 'text-purple-400' },
  ],
  perfumes: [
    { label: 'نظرة عامة', href: '/perfumes', icon: <TrendingUp size={20} />, color: 'text-violet-500' },
    { label: 'المواد الخام', href: '/perfumes?tab=raw', icon: <FlaskConical size={20} />, color: 'text-violet-400' },
    { label: 'التركيبات', href: '/perfumes?tab=formulas', icon: <Beaker size={20} />, color: 'text-purple-500' },
    { label: 'المنتجات', href: '/perfumes?tab=products', icon: <Package size={20} />, color: 'text-fuchsia-400' },
    { label: 'التصنيع', href: '/perfumes?tab=production', icon: <Factory size={20} />, color: 'text-purple-500' },
    { label: 'الموردين', href: '/perfumes?tab=suppliers', icon: <Truck size={20} />, color: 'text-purple-400' },
    { label: 'المبيعات', href: '/sales', icon: <ShoppingCart size={20} />, color: 'text-fuchsia-500' },
    { label: 'الفواتير', href: '/invoices', icon: <FileText size={20} />, color: 'text-purple-400' },
    { label: 'العملاء', href: '/customers', icon: <Users size={20} />, color: 'text-violet-400' },
    { label: 'المخزون', href: '/inventory', icon: <Warehouse size={20} />, color: 'text-violet-500' },
    { label: 'التقارير', href: '/reports', icon: <BarChart3 size={20} />, color: 'text-violet-500' },
    { label: 'الإعدادات', href: '/settings', icon: <Settings size={20} />, color: 'text-purple-400' },
  ],
};

export default function SectionSidebar({ sectionId }: { sectionId: string }) {
  const navItems = sectionNavItems[sectionId] || [];
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href.includes('?')) {
      // For tab-based links, check if the base path matches
      const basePath = href.split('?')[0];
      return pathname === basePath;
    }
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* زر فتح القائمة للموبايل */}
      <button
        className="sidebar-toggle btn btn-icon btn-outline"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* الخلفية المعتمة للموبايل */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* القائمة الجانبية - نفس الشكل القديم بالضبط */}
      <aside
        className={`sidebar ${isOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}
        style={{
          transform: isOpen ? 'translateX(0)' : undefined,
          width: collapsed ? '72px' : undefined,
        }}
      >
        {/* الشعار - نفس القديم */}
        <div className="sidebar-header" style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <Link href="/" className="flex items-center gap-3" style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur" style={{ flexShrink: 0 }}>
              <Beaker className="text-white" size={28} />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-xl font-extrabold text-white">BRAVO</h1>
                <p className="text-xs text-white/80 font-semibold">Formula & Factory</p>
              </div>
            )}
          </Link>
        </div>

        {/* زر طي/فتح - نفس القديم */}
        <div style={{ padding: '0.6rem 0.85rem', display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end' }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
              height: '36px', borderRadius: '10rem',
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', border: 'none',
              cursor: 'pointer', transition: 'all 0.25s ease', color: '#fff',
              padding: collapsed ? '0 0.6rem' : '0 1rem 0 0.7rem',
              boxShadow: '0 4px 14px -2px rgba(109,40,217,0.3)',
              fontSize: '0.8rem', fontWeight: 800,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 6px 20px -2px rgba(109,40,217,0.45)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 14px -2px rgba(109,40,217,0.3)'; }}
          >
            {collapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            {!collapsed && <span>قفل</span>}
          </button>
        </div>

        {/* القائمة - نفس شكل القديم بالضبط باستخدام نفس الـ CSS classes */}
        <nav className="sidebar-nav">
          {navItems.map((item, index) => {
            const active = isActive(item.href);
            return (
              <div
                key={index}
                className={`nav-item ${active ? 'active' : ''}`}
                onClick={() => {
                  setIsOpen(false);
                  if (item.href.includes('?tab=')) {
                    const tab = item.href.split('?tab=')[1];
                    window.dispatchEvent(new CustomEvent('section-tab-change', { detail: tab }));
                  } else {
                    window.location.href = item.href;
                  }
                }}
                style={{
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  padding: collapsed ? '0.9rem' : '0.85rem 1.1rem',
                  gap: collapsed ? '0' : '1rem',
                  cursor: 'pointer',
                }}
                title={collapsed ? item.label : undefined}
              >
                <span className={`nav-item-icon ${active ? 'text-[var(--primary)]' : item.color}`} style={{ margin: collapsed ? '0' : undefined, transition: 'all 0.25s ease' }}>
                  {item.icon}
                </span>
                {!collapsed && <span style={{ transition: 'color 0.25s ease' }}>{item.label}</span>}
              </div>
            );
          })}
        </nav>

        {/* الرجوع للأقسام + تسجيل الخروج - نفس ستايل القديم */}
        <div className="sidebar-footer" style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <div
            className="nav-item w-full rounded-lg"
            onClick={() => { setIsOpen(false); window.location.href = '/'; }}
            style={{
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: collapsed ? '0.9rem' : '0.85rem 1.1rem',
              gap: collapsed ? '0' : '1rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
          >
            <span className="nav-item-icon text-violet-500" style={{ margin: collapsed ? '0' : undefined, transition: 'all 0.25s ease' }}>
              <ArrowRight size={20} />
            </span>
            {!collapsed && <span style={{ transition: 'color 0.25s ease' }}>الرجوع للأقسام</span>}
          </div>

          <button
            className="nav-item nav-logout w-full rounded-lg"
            style={{
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: collapsed ? '0.9rem' : '0.85rem 1.1rem',
              gap: collapsed ? '0' : '1rem',
              color: '#dc2626',
              border: '2px solid #fecaca',
              background: 'rgba(255,255,255,0.95)',
              transition: 'all 0.25s ease',
            }}
          >
            <LogOut size={20} style={{ transition: 'all 0.25s ease' }} />
            {!collapsed && <span className="font-bold" style={{ transition: 'color 0.25s ease' }}>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* تحريك المحتوى الرئيسي */}
      <style>{`
        .main-content {
          margin-right: ${collapsed ? '72px' : 'var(--sidebar-width)'} !important;
          transition: margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
      `}</style>
    </>
  );
}
