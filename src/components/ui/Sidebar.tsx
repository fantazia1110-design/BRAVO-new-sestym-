'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FlaskConical,
  Package,
  Factory,
  Warehouse,
  ShoppingCart,
  FileText,
  Users,
  CreditCard,
  Receipt,
  BarChart3,
  GraduationCap,
  BookOpen,
  Settings,
  Truck,
  Beaker,
  Menu,
  X,
  LogOut,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { t } from '@/lib/localization';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

const navItems: NavItem[] = [
  { label: 'لوحة التحكم', href: '/', icon: <LayoutDashboard size={20} />, color: 'text-violet-500' },
  { label: 'المواد الخام', href: '/raw-materials', icon: <FlaskConical size={20} />, color: 'text-violet-400' },
  { label: 'الموردون', href: '/suppliers', icon: <Truck size={20} />, color: 'text-purple-400' },
  { label: 'التركيبات', href: '/formulas', icon: <Beaker size={20} />, color: 'text-purple-500' },
  { label: 'معمل التركيبات', href: '/formula-lab', icon: <Sparkles size={20} />, color: 'text-violet-500' },
  { label: 'المنتجات', href: '/products', icon: <Package size={20} />, color: 'text-fuchsia-400' },
  { label: 'التصنيع', href: '/production', icon: <Factory size={20} />, color: 'text-purple-500' },
  { label: 'المخزون', href: '/inventory', icon: <Warehouse size={20} />, color: 'text-violet-500' },
  { label: 'المبيعات', href: '/sales', icon: <ShoppingCart size={20} />, color: 'text-fuchsia-500' },
  { label: 'الفواتير', href: '/invoices', icon: <FileText size={20} />, color: 'text-purple-400' },
  { label: 'العملاء', href: '/customers', icon: <Users size={20} />, color: 'text-violet-400' },
  { label: 'المديونيات', href: '/debts', icon: <CreditCard size={20} />, color: 'text-fuchsia-500' },
  { label: 'المصروفات', href: '/expenses', icon: <Receipt size={20} />, color: 'text-purple-500' },
  { label: 'التقارير', href: '/reports', icon: <BarChart3 size={20} />, color: 'text-violet-500' },
  { label: 'الأكاديمية', href: '/academy', icon: <GraduationCap size={20} />, color: 'text-fuchsia-400' },
  { label: 'الكتب الرقمية', href: '/books', icon: <BookOpen size={20} />, color: 'text-fuchsia-500' },
  { label: 'الإعدادات', href: '/settings', icon: <Settings size={20} />, color: 'text-purple-400' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
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
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* القائمة الجانبية */}
      <aside
        className={`sidebar ${isOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}
        style={{ 
          transform: isOpen ? 'translateX(0)' : undefined,
          width: collapsed ? '72px' : undefined,
        }}
      >
        {/* الشعار */}
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

        {/* زر طي/فتح */}
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
            {!collapsed && <span>طي</span>}
          </button>
        </div>

        {/* القائمة */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${active ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
                style={{
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  padding: collapsed ? '0.9rem' : '1.15rem 1.25rem',
                  gap: collapsed ? '0' : '1rem',
                }}
                title={collapsed ? item.label : undefined}
              >
                <span className={`nav-item-icon ${active ? 'text-[var(--primary)]' : item.color}`} style={{ margin: collapsed ? '0' : undefined }}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* تسجيل الخروج */}
        <div className="sidebar-footer" style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <button 
            className="nav-item w-full text-red-500 hover:bg-red-50 rounded-lg"
            style={{
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: collapsed ? '0.9rem' : '1.15rem 1.25rem',
              gap: collapsed ? '0' : '1rem',
            }}
            title={collapsed ? 'تسجيل الخروج' : undefined}
          >
            <LogOut size={20} />
            {!collapsed && <span className="font-bold">تسجيل الخروج</span>}
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
