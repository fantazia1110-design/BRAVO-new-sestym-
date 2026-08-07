'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TrendingUp, FlaskConical, Beaker, Package, Factory, Truck,
  ShoppingCart, FileText, Users, CreditCard, Warehouse, Receipt,
  BarChart3, Settings, ChevronRight, ChevronLeft, Menu, X, LogOut,
  ArrowRight,
} from 'lucide-react';

interface SectionConfig {
  id: string;
  name: string;
  color: string;
  colorLight: string;
  icon: React.ReactNode;
  basePath: string;
  image: string;
}

const sectionConfigs: Record<string, SectionConfig> = {
  detergents: {
    id: 'detergents',
    name: 'المنظفات',
    color: '#2563eb',
    colorLight: '#3b82f6',
    icon: <FlaskConical size={20} />,
    basePath: '/detergents',
    image: '/icons/real-detergents.jpg',
  },
  cosmetics: {
    id: 'cosmetics',
    name: 'مستحضرات التجميل',
    color: '#db2777',
    colorLight: '#ec4899',
    icon: <Beaker size={20} />,
    basePath: '/cosmetics',
    image: '/icons/real-cosmetics.jpg',
  },
  perfumes: {
    id: 'perfumes',
    name: 'العطور',
    color: '#7c3aed',
    colorLight: '#8b5cf6',
    icon: <Package size={20} />,
    basePath: '/perfumes',
    image: '/icons/real-perfumes.jpg',
  },
};

function getSectionItems(sectionId: string, basePath: string) {
  return [
    { label: 'نظرة عامة', href: basePath, icon: <TrendingUp size={20} /> },
    { label: 'المواد الخام', href: `${basePath}?tab=raw`, icon: <FlaskConical size={20} /> },
    { label: 'التركيبات', href: `${basePath}?tab=formulas`, icon: <Beaker size={20} /> },
    { label: 'المنتجات', href: `${basePath}?tab=products`, icon: <Package size={20} /> },
    { label: 'التصنيع', href: `${basePath}?tab=production`, icon: <Factory size={20} /> },
    { label: 'الموردين', href: `${basePath}?tab=suppliers`, icon: <Truck size={20} /> },
    { label: 'المبيعات', href: '/sales', icon: <ShoppingCart size={20} /> },
    { label: 'الفواتير', href: '/invoices', icon: <FileText size={20} /> },
    { label: 'العملاء', href: '/customers', icon: <Users size={20} /> },
    { label: 'المخزون', href: '/inventory', icon: <Warehouse size={20} /> },
    { label: 'التقارير', href: '/reports', icon: <BarChart3 size={20} /> },
    { label: 'الإعدادات', href: '/settings', icon: <Settings size={20} /> },
  ];
}

export default function SectionSidebar({ sectionId }: { sectionId: string }) {
  const config = sectionConfigs[sectionId];
  if (!config) return null;

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const c = config.color;
  const cl = config.colorLight;
  const items = getSectionItems(sectionId, config.basePath);

  const isActive = (href: string) => {
    if (href.includes('?')) return false;
    if (href === config.basePath) return pathname === config.basePath;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* زر فتح القائمة للموبايل */}
      <button
        className="sidebar-toggle btn btn-icon btn-outline"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* الخلفية المعتمة للموبايل */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* القائمة الجانبية */}
      <aside
        className={`sidebar ${isOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}
        style={{
          transform: isOpen ? 'translateX(0)' : undefined,
          width: collapsed ? '72px' : undefined,
          background: `linear-gradient(180deg, ${c}, ${cl}cc, ${c}dd)`,
        }}
      >
        {/* شعار القسم */}
        <div className="sidebar-header" style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <div className="flex items-center gap-3" style={{ justifyContent: collapsed ? 'center' : 'flex-start', cursor: 'pointer' }} onClick={() => window.location.href = config.basePath}>
            <div style={{
              width: '3rem', height: '3rem', borderRadius: '0.75rem',
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, color: '#fff',
            }}>
              {config.icon}
            </div>
            {!collapsed && (
              <div>
                <h1 style={{ fontWeight: 900, fontSize: '1.1rem', color: '#fff', margin: 0 }}>{config.name}</h1>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', margin: 0, fontWeight: 600 }}>BRAVO</p>
              </div>
            )}
          </div>
        </div>

        {/* زر طي/فتح */}
        <div style={{ padding: '0.5rem 0.85rem', display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end' }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
              height: '32px', borderRadius: '10rem',
              background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.15)',
              cursor: 'pointer', transition: 'all 0.25s ease', color: '#fff',
              padding: collapsed ? '0 0.5rem' : '0 0.8rem 0 0.6rem',
              fontSize: '0.75rem', fontWeight: 800, backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.35)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {collapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
            {!collapsed && <span>قفل</span>}
          </button>
        </div>

        {/* القائمة */}
        <nav className="sidebar-nav">
          {items.map((item, index) => {
            const active = isActive(item.href);
            return (
              <div
                key={index}
                className={`nav-item ${active ? 'active' : ''}`}
                onClick={() => {
                  setIsOpen(false);
                  // Handle tab-based navigation
                  if (item.href.includes('?tab=')) {
                    const tab = item.href.split('?tab=')[1];
                    // Dispatch a custom event for the section page to listen to
                    window.dispatchEvent(new CustomEvent('section-tab-change', { detail: tab }));
                  } else {
                    window.location.href = item.href;
                  }
                }}
                style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  padding: collapsed ? '0.75rem' : '0.7rem 1rem',
                  gap: collapsed ? '0' : '0.75rem',
                  cursor: 'pointer', transition: 'all 0.25s ease',
                  background: active ? 'rgba(255,255,255,0.2)' : 'transparent',
                  borderRight: active ? '3px solid #fff' : '3px solid transparent',
                  color: active ? '#fff' : 'rgba(255,255,255,0.75)',
                  fontWeight: active ? 800 : 600,
                  fontSize: '0.9rem',
                  borderRadius: '0.5rem',
                  margin: '0.15rem 0.5rem',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.transform = 'translateX(-4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
                title={collapsed ? item.label : undefined}
              >
                <span style={{ margin: collapsed ? '0' : undefined, transition: 'all 0.25s ease', display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </div>
            );
          })}
        </nav>

        {/* الرجوع للأقسام */}
        <div style={{ padding: '0.5rem', marginTop: 'auto' }}>
          <div
            onClick={() => { window.location.href = '/'; }}
            style={{
              display: 'flex', alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: collapsed ? '0.75rem' : '0.7rem 1rem',
              gap: collapsed ? '0' : '0.75rem',
              cursor: 'pointer', transition: 'all 0.25s ease',
              background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.15)',
              borderRadius: '0.5rem', margin: '0 0.5rem',
              color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontSize: '0.85rem',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <ArrowRight size={18} />
            {!collapsed && <span>الرجوع للأقسام</span>}
          </div>

          {/* تسجيل الخروج */}
          <div
            style={{
              display: 'flex', alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: collapsed ? '0.75rem' : '0.7rem 1rem',
              gap: collapsed ? '0' : '0.75rem',
              cursor: 'pointer', transition: 'all 0.25s ease',
              background: 'rgba(220,38,38,0.15)', border: '1.5px solid rgba(220,38,38,0.3)',
              borderRadius: '0.5rem', margin: '0.5rem 0.5rem 0 0.5rem',
              color: '#fca5a5', fontWeight: 700, fontSize: '0.85rem',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#dc2626'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(220,38,38,0.15)'; e.currentTarget.style.color = '#fca5a5'; e.currentTarget.style.borderColor = 'rgba(220,38,38,0.3)'; }}
          >
            <LogOut size={18} />
            {!collapsed && <span>تسجيل الخروج</span>}
          </div>
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
