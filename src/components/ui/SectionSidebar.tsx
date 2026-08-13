'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  LayoutDashboard, FlaskConical, Truck, Beaker, Sparkles, Package, Factory, Warehouse,
  ShoppingCart, FileText, Users, CreditCard, Receipt, BarChart3, GraduationCap, BookOpen, Settings,
  ChevronRight, ChevronLeft, Menu, X, LogOut, ArrowRight,
} from 'lucide-react';

interface NavItem {
  label: string;
  tab?: string;
  href?: string;
  icon: React.ReactNode;
  color: string;
}

/**
 * كل قسم له قائمة جانبية كاملة منفصلة ومستقلة
 * تحتوي على كل عناصر النظام لكن scoped للقسم نفسه
 * لا يوجد انتقال لقائمة عامة - كل شيء يبقى داخل القسم
 */
const fullNavItems: NavItem[] = [
  { label: 'لوحة التحكم', tab: undefined, icon: <LayoutDashboard size={20} />, color: 'text-violet-600' },
  { label: 'المواد الخام', href: '/raw-materials', icon: <FlaskConical size={20} />, color: 'text-blue-500' },
  { label: 'الموردون', href: '/suppliers', icon: <Truck size={20} />, color: 'text-slate-500' },
  { label: 'التركيبات', href: '/formulas', icon: <Beaker size={20} />, color: 'text-purple-600' },
  { label: 'معمل التركيبات', href: '/formula-lab', icon: <Sparkles size={20} />, color: 'text-amber-500' },
  { label: 'المنتجات', href: '/products', icon: <Package size={20} />, color: 'text-green-500' },
  { label: 'التصنيع', href: '/production', icon: <Factory size={20} />, color: 'text-cyan-500' },
  { label: 'المخزون', href: '/inventory', icon: <Warehouse size={20} />, color: 'text-orange-500' },
  { label: 'المبيعات', href: '/sales', icon: <ShoppingCart size={20} />, color: 'text-emerald-500' },
  { label: 'الفواتير', href: '/invoices', icon: <FileText size={20} />, color: 'text-red-500' },
  { label: 'العملاء', href: '/customers', icon: <Users size={20} />, color: 'text-blue-400' },
  { label: 'المديونيات', href: '/debts', icon: <CreditCard size={20} />, color: 'text-rose-500' },
  { label: 'المصروفات', href: '/expenses', icon: <Receipt size={20} />, color: 'text-yellow-500' },
  { label: 'التقارير', href: '/reports', icon: <BarChart3 size={20} />, color: 'text-indigo-500' },
  { label: 'الأكاديمية', href: '/academy', icon: <GraduationCap size={20} />, color: 'text-pink-500' },
  { label: 'الكتب الرقمية', href: '/books', icon: <BookOpen size={20} />, color: 'text-teal-500' },
  { label: 'الإعدادات', href: '/settings', icon: <Settings size={20} />, color: 'text-gray-500' },
];

const sectionNavItems: Record<string, NavItem[]> = {
  detergents: fullNavItems,
  cosmetics: fullNavItems,
  perfumes: fullNavItems,
};

const sectionBasePaths: Record<string, string> = {
  detergents: '/detergents',
  cosmetics: '/cosmetics',
  perfumes: '/perfumes',
};

export default function SectionSidebar({ sectionId }: { sectionId: string }) {
  const navItems = sectionNavItems[sectionId] || fullNavItems;
  const basePath = sectionBasePaths[sectionId] || '/';
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const currentTab = searchParams.get('tab') || '';

  const isActive = (item: NavItem) => {
    if (item.href) {
      return false; // href items not active based on tab, they navigate away
    }
    if (item.tab === undefined) return currentTab === '' || currentTab === 'dashboard';
    return currentTab === item.tab;
  };

  const handleNav = (item: NavItem) => {
    setIsOpen(false);
    if (item.href) {
      router.push(item.href);
    } else if (item.tab) {
      router.push(`${basePath}?tab=${item.tab}`);
    } else {
      router.push(basePath);
    }
  };

  return (
    <>
      <button
        className="sidebar-toggle btn btn-icon btn-outline"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      <aside
        className={`sidebar ${isOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}
        style={{
          transform: isOpen ? 'translateX(0)' : undefined,
          width: collapsed ? '72px' : undefined,
        }}
      >
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
          >
            {collapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            {!collapsed && <span>قفل</span>}
          </button>
        </div>

        <nav className="sidebar-nav" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
          {navItems.map((item, index) => {
            const active = isActive(item);
            return (
              <div
                key={index}
                className={`nav-item ${active ? 'active' : ''}`}
                onClick={() => handleNav(item)}
                style={{
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  padding: collapsed ? '0.85rem' : '0.8rem 1rem',
                  gap: collapsed ? '0' : '0.9rem',
                  cursor: 'pointer',
                  fontSize: collapsed ? undefined : '0.92rem',
                }}
                title={collapsed ? item.label : undefined}
              >
                <span className={`nav-item-icon ${active ? 'text-[var(--primary)]' : item.color}`} style={{ margin: collapsed ? '0' : undefined }}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer" style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <div
            className="nav-item w-full rounded-lg"
            onClick={() => { setIsOpen(false); router.push('/'); }}
            style={{
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: collapsed ? '0.9rem' : '0.85rem 1.1rem',
              gap: collapsed ? '0' : '1rem',
              cursor: 'pointer',
            }}
          >
            <span className="nav-item-icon text-violet-500"><ArrowRight size={20} /></span>
            {!collapsed && <span>الرجوع للأقسام</span>}
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
            }}
          >
            <LogOut size={20} />
            {!collapsed && <span className="font-bold">تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      <style>{`
        .main-content {
          margin-right: ${collapsed ? '72px' : 'var(--sidebar-width)'} !important;
          transition: margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .sidebar-nav::-webkit-scrollbar { width: 4px; }
        .sidebar-nav::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.25); border-radius: 999px; }
      `}</style>
    </>
  );
}
