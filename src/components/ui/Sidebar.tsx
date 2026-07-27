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
} from 'lucide-react';
import { t } from '@/lib/localization';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

const navItems: NavItem[] = [
  { label: 'لوحة التحكم', href: '/', icon: <LayoutDashboard size={20} />, color: 'text-blue-500' },
  { label: 'المواد الخام', href: '/raw-materials', icon: <FlaskConical size={20} />, color: 'text-indigo-500' },
  { label: 'الموردون', href: '/suppliers', icon: <Truck size={20} />, color: 'text-gray-500' },
  { label: 'التركيبات', href: '/formulas', icon: <Beaker size={20} />, color: 'text-purple-500' },
  { label: 'معمل التركيبات', href: '/formula-lab', icon: <Sparkles size={20} />, color: 'text-violet-500' },
  { label: 'المنتجات', href: '/products', icon: <Package size={20} />, color: 'text-green-500' },
  { label: 'التصنيع', href: '/production', icon: <Factory size={20} />, color: 'text-amber-500' },
  { label: 'المخزون', href: '/inventory', icon: <Warehouse size={20} />, color: 'text-teal-500' },
  { label: 'المبيعات', href: '/sales', icon: <ShoppingCart size={20} />, color: 'text-emerald-500' },
  { label: 'الفواتير', href: '/invoices', icon: <FileText size={20} />, color: 'text-orange-500' },
  { label: 'العملاء', href: '/customers', icon: <Users size={20} />, color: 'text-cyan-500' },
  { label: 'المديونيات', href: '/debts', icon: <CreditCard size={20} />, color: 'text-red-500' },
  { label: 'المصروفات', href: '/expenses', icon: <Receipt size={20} />, color: 'text-rose-500' },
  { label: 'التقارير', href: '/reports', icon: <BarChart3 size={20} />, color: 'text-sky-500' },
  { label: 'الأكاديمية', href: '/academy', icon: <GraduationCap size={20} />, color: 'text-pink-500' },
  { label: 'الكتب الرقمية', href: '/books', icon: <BookOpen size={20} />, color: 'text-fuchsia-500' },
  { label: 'الإعدادات', href: '/settings', icon: <Settings size={20} />, color: 'text-slate-500' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* زر فتح القائمة للموبايل */}
      <button
        className="fixed top-4 right-4 z-50 btn btn-icon btn-outline lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="القائمة"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* الخلفية المعتمة للموبايل */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* القائمة الجانبية */}
      <aside
        className={`sidebar ${isOpen ? 'open' : ''}`}
        style={{ transform: isOpen ? 'translateX(0)' : undefined }}
      >
        {/* الشعار */}
        <div className="sidebar-header">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur">
              <Beaker className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white">BRAVO</h1>
              <p className="text-xs text-white/80 font-semibold">Formula & Factory</p>
            </div>
          </Link>
        </div>

        {/* القائمة */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <span className={`nav-item-icon ${isActive(item.href) ? 'text-[var(--primary)]' : item.color}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* تسجيل الخروج */}
        <div className="p-4 border-t border-[var(--border)]">
          <button className="nav-item w-full text-red-500 hover:bg-red-50 rounded-lg">
            <LogOut size={20} />
            <span className="font-bold">تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}
