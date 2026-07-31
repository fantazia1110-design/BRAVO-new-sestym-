'use client';

import React from 'react';
import Link from 'next/link';
import {
  FlaskConical,
  Package,
  Beaker,
  Warehouse,
  ShoppingCart,
  Users,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Factory,
  FileText,
  ArrowDownRight,
  Sparkles,
  Zap,
  Star,
  ChevronLeft,
} from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import CategoryIcon from '@/components/ui/CategoryIcon';
import Badge, { getProductionStatusBadge, getInvoiceStatusBadge } from '@/components/ui/Badge';
import { formatCurrency, formatNumber } from '@/lib/utils';

// بيانات الإحصائيات
const stats = {
  rawMaterials: 156,
  products: 48,
  formulas: 32,
  inventoryValue: 850000,
  todaySales: 15600,
  monthSales: 485000,
  totalDebts: 125000,
  lowStockItems: 8,
};

// أقسام المنتجات
const productCategories = [
  { id: 'detergents', name: 'المنظفات', count: 15, color: 'category-detergents', gradient: 'from-blue-500 to-blue-700' },
  { id: 'cosmetics', name: 'مستحضرات التجميل', count: 12, color: 'category-cosmetics', gradient: 'from-pink-500 to-rose-600' },
  { id: 'perfumes', name: 'العطور', count: 8, color: 'category-perfumes', gradient: 'from-purple-500 to-violet-600' },
  { id: 'soap', name: 'الصابون', count: 10, color: 'category-soap', gradient: 'from-emerald-500 to-green-600' },
  { id: 'hair', name: 'العناية بالشعر', count: 9, color: 'category-hair-care', gradient: 'from-amber-500 to-orange-600' },
  { id: 'skin', name: 'العناية بالبشرة', count: 11, color: 'category-skin-care', gradient: 'from-cyan-500 to-teal-600' },
];

// المنتجات الأكثر مبيعاً
const topProducts = [
  { name: 'شامبو الكيراتين 250مل', sales: 450, revenue: 15750, emoji: '🧴', trend: 12 },
  { name: 'سائل أطباق الليمون 500مل', sales: 680, revenue: 12240, emoji: '🍋', trend: 8 },
  { name: 'كريم مرطب بالصبار 100مل', sales: 320, revenue: 14400, emoji: '🌿', trend: 15 },
  { name: 'صابون اللافندر الطبيعي', sales: 290, revenue: 8700, emoji: '💜', trend: 5 },
  { name: 'عطر الورد الدمشقي 50مل', sales: 180, revenue: 16200, emoji: '🌹', trend: 20 },
];

// آخر التركيبات
const recentFormulas = [
  { name: 'شامبو الأرغان الفاخر', status: 'approved', category: 'العناية بالشعر', ingredients: 14, emoji: '🌰' },
  { name: 'جل استحمام المسك', status: 'testing', category: 'العناية الشخصية', ingredients: 10, emoji: '🚿' },
  { name: 'منظف زجاج كريستال', status: 'approved', category: 'المنظفات', ingredients: 6, emoji: '✨' },
  { name: 'كريم اليدين بالعسل', status: 'draft', category: 'العناية بالبشرة', ingredients: 12, emoji: '🍯' },
];

// آخر عمليات التصنيع
const recentProduction = [
  { batchNumber: 'PRD-2026-001', product: 'شامبو الكيراتين', quantity: '500 كجم', status: 'in_progress', progress: 65 },
  { batchNumber: 'PRD-2026-002', product: 'سائل أطباق الليمون', quantity: '1000 لتر', status: 'completed', progress: 100 },
  { batchNumber: 'PRD-2026-003', product: 'صابون اللافندر', quantity: '300 قطعة', status: 'quality_check', progress: 90 },
  { batchNumber: 'PRD-2026-004', product: 'معطر جو الياسمين', quantity: '200 لتر', status: 'planned', progress: 0 },
];

// آخر الفواتير
const recentInvoices = [
  { number: 'INV-2026-0125', customer: 'شركة الأمل للتجارة', total: 12500, status: 'paid' },
  { number: 'INV-2026-0124', customer: 'مؤسسة النور', total: 8750, status: 'partially_paid' },
  { number: 'INV-2026-0123', customer: 'سوبر ماركت السلام', total: 5200, status: 'confirmed' },
  { number: 'INV-2026-0122', customer: 'محلات الوفاء', total: 15800, status: 'paid' },
];

// المواد منخفضة المخزون
const lowStockItems = [
  { name: 'تكسابون SLES', current: 25, min: 50, unit: 'كجم', category: 'مواد فعالة', color: 'from-red-500 to-orange-500' },
  { name: 'جلسرين نباتي', current: 10, min: 30, unit: 'لتر', category: 'مرطبات', color: 'from-orange-500 to-amber-500' },
  { name: 'زيت الأرغان', current: 5, min: 15, unit: 'لتر', category: 'زيوت', color: 'from-amber-500 to-yellow-500' },
  { name: 'عطر اللافندر', current: 3, min: 10, unit: 'كجم', category: 'عطور', color: 'from-purple-500 to-pink-500' },
];

// الإجراءات السريعة
const quickActions = [
  { label: 'إضافة مادة خام', href: '/raw-materials/new', icon: <FlaskConical size={24} />, gradient: 'from-violet-500 to-purple-700', glow: 'shadow-purple-500/30' },
  { label: 'تركيبة جديدة', href: '/formula-lab', icon: <Beaker size={24} />, gradient: 'from-purple-500 to-violet-700', glow: 'shadow-violet-500/30' },
  { label: 'بدء تصنيع', href: '/production/new', icon: <Factory size={24} />, gradient: 'from-fuchsia-500 to-purple-700', glow: 'shadow-fuchsia-500/30' },
  { label: 'فاتورة جديدة', href: '/invoices/new', icon: <FileText size={24} />, gradient: 'from-indigo-500 to-violet-700', glow: 'shadow-indigo-500/30' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* الترحيب */}
      <div className="animate-slide-up">
        <div className="flex items-center gap-5 mb-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-500/30 animate-float">
            <Sparkles className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold gradient-text">
              مرحباً بك في BRAVO
            </h1>
            <p className="text-[var(--text-secondary)] font-bold text-xl">
              نظام إدارة التركيبات والتصنيع الاحترافي ✨
            </p>
          </div>
        </div>
      </div>

      {/* الإحصائيات */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', gap: '0.5rem' }}>
        <StatCard
          title="المواد الخام"
          value={formatNumber(stats.rawMaterials, 0)}
          subtitle="نوع مختلف"
          icon={(
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 3h6v2l3.5 6H5.5L9 5V3z" fill="#6366f1"/>
              <path d="M5 11h14v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z" fill="#818cf8"/>
              <path d="M7 14h10v5a1 1 0 01-1 1H8a1 1 0 01-1-1v-5z" fill="#a5b4fc"/>
              <rect x="8" y="2" width="8" height="2" rx="1" fill="#4338ca"/>
            </svg>
          )}
          delay={1}
          color="#4338ca"
          colorLight="#6366f1"
        />
        <StatCard
          title="التركيبات"
          value={formatNumber(stats.formulas, 0)}
          subtitle="تركيبة معتمدة"
          icon={(
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 2h2v4l2 6v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6l2-6V2z" fill="#a78bfa"/>
              <path d="M5 14h6v4a1 1 0 01-1 1H6a1 1 0 01-1-1v-4z" fill="#c4b5fd"/>
              <circle cx="8" cy="12" r="1.2" fill="#ddd6fe"/>
              <path d="M15 2h2v4l2 6v6a2 2 0 01-2 2h-2a2 2 0 01-2-2v-6l2-6V2z" fill="#7c3aed"/>
              <path d="M13 14h6v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" fill="#a78bfa"/>
              <circle cx="16" cy="11" r="1.2" fill="#c4b5fd"/>
            </svg>
          )}
          delay={2}
          color="#7c3aed"
          colorLight="#a78bfa"
        />
        <StatCard
          title="المنتجات"
          value={formatNumber(stats.products, 0)}
          subtitle="منتج نهائي"
          icon={(
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L3 7l9 4 9-4-9-4z" fill="#22d3ee"/>
              <path d="M3 7l9 4v10l-9-4V7z" fill="#0891b2"/>
              <path d="M12 11l9-4v10l-9 4V11z" fill="#06b6d4"/>
              <path d="M12 11v10" stroke="white" strokeOpacity="0.6" strokeWidth="1.5"/>
              <path d="M12 3L3 7l9 4" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
            </svg>
          )}
          delay={3}
          color="#0891b2"
          colorLight="#22d3ee"
        />
        <StatCard
          title="مخزون منخفض"
          value={formatNumber(stats.lowStockItems, 0)}
          subtitle="يحتاج إعادة طلب"
          icon={(
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L1 21h22L12 2z" fill="#fca5a5"/>
              <path d="M12 2L3 18h18L12 2z" fill="#dc2626"/>
              <rect x="11" y="8" width="2" height="6" rx="1" fill="white"/>
              <circle cx="12" cy="17" r="1.3" fill="white"/>
            </svg>
          )}
          delay={4}
          color="#991b1b"
          colorLight="#dc2626"
        />
        <StatCard
          title="مبيعات اليوم"
          value={formatCurrency(stats.todaySales)}
          icon={(
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#4ade80"/>
              <path d="M12 4v16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9 7.5c0-1.2 1.3-2 3-2s3 .8 3 2-1.3 2-3 2-3 1-3 2.2 1.3 2 3 2 3-.8 3-2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
          trend={{ value: 12, isPositive: true }}
          delay={5}
          color="#15803d"
          colorLight="#4ade80"
        />
        <StatCard
          title="مبيعات الشهر"
          value={formatCurrency(stats.monthSales)}
          icon={(
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="14" width="4" height="8" rx="1" fill="#6ee7b7"/>
              <rect x="8" y="10" width="4" height="12" rx="1" fill="#34d399"/>
              <rect x="14" y="6" width="4" height="16" rx="1" fill="#10b981"/>
              <rect x="20" y="2" width="4" height="20" rx="1" fill="#059669"/>
            </svg>
          )}
          trend={{ value: 8, isPositive: true }}
          delay={6}
          color="#065f46"
          colorLight="#10b981"
        />
        <StatCard
          title="قيمة المخزون"
          value={formatCurrency(stats.inventoryValue)}
          icon={(
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 9h16L12 2z" fill="#fbbf24"/>
              <path d="M4 9l8 13 8-13H4z" fill="#d97706"/>
              <path d="M12 2L4 9l8 4 8-4L12 2z" fill="#fde68a"/>
              <path d="M4 9l8 13" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>
              <path d="M20 9l-8 13" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>
            </svg>
          )}
          delay={7}
          color="#d97706"
          colorLight="#fbbf24"
        />
        <StatCard
          title="إجمالي المديونيات"
          value={formatCurrency(stats.totalDebts)}
          icon={(
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 2h16v20l-3-2-3 2-3-2-3 2-4-2V2z" fill="#f43f5e"/>
              <rect x="7" y="6" width="10" height="2" rx="1" fill="white" fillOpacity="0.85"/>
              <rect x="7" y="10" width="7" height="2" rx="1" fill="white" fillOpacity="0.6"/>
              <rect x="7" y="14" width="9" height="2" rx="1" fill="white" fillOpacity="0.7"/>
              <circle cx="17" cy="17" r="3" fill="white" fillOpacity="0.3"/>
              <path d="M17 15v4M15.5 17h3" stroke="white" strokeOpacity="0.9" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          )}
          delay={8}
          color="#be123c"
          colorLight="#f43f5e"
        />
      </div>

      {/* أقسام المنتجات */}
      <div className="animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-extrabold flex items-center gap-3">
            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
              <Package size={24} />
            </span>
            أقسام المنتجات
          </h2>
          <Link href="/products" className="btn btn-outline btn-sm group">
            عرض الكل
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-6 gap-5">
          {productCategories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className={`category-card ${category.color} animate-slide-up`}
              style={{ animationDelay: `${0.4 + index * 0.1}s`, animationFillMode: 'both' }}
            >
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 animate-float shadow-sm"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CategoryIcon id={category.id} />
              </div>
              <h3 className="text-lg font-bold mb-1">{category.name}</h3>
              <p className="text-sm opacity-90 font-semibold">{category.count} منتج</p>
            </Link>
          ))}
        </div>
      </div>

      {/* الإجراءات السريعة */}
      <div className="card animate-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
        <div className="card-header">
          <h2 className="text-2xl font-extrabold flex items-center gap-3">
            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg animate-pulse">
              <Zap size={24} />
            </span>
            إجراءات سريعة
          </h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-4 gap-5">
            {quickActions.map((action, index) => (
              <Link
                key={action.label}
                href={action.href}
                className="group relative flex items-center gap-4 p-5 rounded-2xl border-2 border-[var(--border)] hover:border-transparent bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-white transition-all duration-300 overflow-hidden animate-slide-up"
                style={{ animationDelay: `${0.6 + index * 0.1}s`, animationFillMode: 'both' }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${action.gradient} text-white flex items-center justify-center shadow-lg ${action.glow} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  {action.icon}
                </div>
                <span className="font-bold text-lg group-hover:text-[var(--primary)] transition-colors">{action.label}</span>
                <ChevronLeft size={20} className="absolute left-4 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all text-[var(--primary)]" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* المنتجات الأكثر مبيعاً والتركيبات */}
      <div className="grid grid-cols-2 gap-6">
        {/* المنتجات الأكثر مبيعاً */}
        <div className="card list-card animate-slide-up" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
          <div className="card-header flex items-center justify-between">
            <h2 className="text-2xl font-extrabold flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-lg">
                <TrendingUp size={24} />
              </span>
              الأكثر مبيعاً
            </h2>
            <Link href="/reports" className="text-sm text-[var(--primary)] font-bold hover:underline flex items-center gap-1">
              التقرير الكامل
              <ChevronLeft size={16} />
            </Link>
          </div>
          <div className="card-body p-0">
            {topProducts.map((product, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 p-5 border-b border-[var(--border)] last:border-0 hover:bg-gradient-to-l hover:from-green-50 hover:to-transparent transition-all group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all">
                  {product.emoji}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[var(--text-primary)] group-hover:text-green-700 transition-colors">{product.name}</h4>
                  <p className="text-sm text-[var(--text-muted)] font-semibold">{product.sales} وحدة مباعة</p>
                </div>
                <div className="text-left">
                  <p className="font-extrabold text-lg text-green-600">{formatCurrency(product.revenue)}</p>
                  <div className="flex items-center gap-1 text-xs text-green-600 font-bold">
                    <TrendingUp size={12} />
                    +{product.trend}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* آخر التركيبات */}
        <div className="card list-card animate-slide-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
          <div className="card-header flex items-center justify-between">
            <h2 className="text-2xl font-extrabold flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-white shadow-lg">
                <Beaker size={24} />
              </span>
              آخر التركيبات
            </h2>
            <Link href="/formulas" className="text-sm text-[var(--primary)] font-bold hover:underline flex items-center gap-1">
              عرض الكل
              <ChevronLeft size={16} />
            </Link>
          </div>
          <div className="card-body p-0">
            {recentFormulas.map((formula, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 p-5 border-b border-[var(--border)] last:border-0 hover:bg-gradient-to-l hover:from-purple-50 hover:to-transparent transition-all group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-violet-200 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all">
                  {formula.emoji}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[var(--text-primary)] group-hover:text-purple-700 transition-colors">{formula.name}</h4>
                  <p className="text-sm text-[var(--text-muted)] font-semibold">{formula.category} • {formula.ingredients} مكون</p>
                </div>
                <div>
                  {formula.status === 'approved' && <Badge variant="success">معتمدة</Badge>}
                  {formula.status === 'testing' && <Badge variant="warning">تحت الاختبار</Badge>}
                  {formula.status === 'draft' && <Badge variant="default">مسودة</Badge>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* التصنيع والفواتير */}
      <div className="grid grid-cols-2 gap-6">
        {/* آخر عمليات التصنيع */}
        <div className="card list-card animate-slide-up" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
          <div className="card-header flex items-center justify-between">
            <h2 className="text-2xl font-extrabold flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                <Factory size={24} />
              </span>
              التصنيع الجاري
            </h2>
            <Link href="/production" className="text-sm text-[var(--primary)] font-bold hover:underline flex items-center gap-1">
              عرض الكل
              <ChevronLeft size={16} />
            </Link>
          </div>
          <div className="card-body p-0">
            <table className="table">
              <thead>
                <tr>
                  <th>رقم الدفعة</th>
                  <th>المنتج</th>
                  <th>التقدم</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recentProduction.map((batch, index) => (
                  <tr key={index} className="group">
                    <td className="font-mono font-bold text-sm text-[var(--primary)]">{batch.batchNumber}</td>
                    <td className="font-bold">{batch.product}</td>
                    <td>
                      <div className="w-full max-w-[120px]">
                        <div className="progress-bar h-2">
                          <div className="progress-fill" style={{ width: `${batch.progress}%` }} />
                        </div>
                        <span className="text-xs font-bold text-[var(--text-muted)]">{batch.progress}%</span>
                      </div>
                    </td>
                    <td>{getProductionStatusBadge(batch.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* آخر الفواتير */}
        <div className="card list-card animate-slide-up" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
          <div className="card-header flex items-center justify-between">
            <h2 className="text-2xl font-extrabold flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg">
                <FileText size={24} />
              </span>
              آخر الفواتير
            </h2>
            <Link href="/invoices" className="text-sm text-[var(--primary)] font-bold hover:underline flex items-center gap-1">
              عرض الكل
              <ChevronLeft size={16} />
            </Link>
          </div>
          <div className="card-body p-0">
            <table className="table">
              <thead>
                <tr>
                  <th>رقم الفاتورة</th>
                  <th>العميل</th>
                  <th>المبلغ</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((invoice, index) => (
                  <tr key={index} className="group">
                    <td className="font-mono font-bold text-sm text-[var(--primary)]">{invoice.number}</td>
                    <td className="font-bold">{invoice.customer}</td>
                    <td className="font-extrabold text-green-600">{formatCurrency(invoice.total)}</td>
                    <td>{getInvoiceStatusBadge(invoice.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* المواد منخفضة المخزون */}
      <div className="card animate-slide-up" style={{ animationDelay: '1.1s', animationFillMode: 'both' }}>
        <div className="card-header flex items-center justify-between">
          <h2 className="text-2xl font-extrabold flex items-center gap-3">
            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg animate-pulse">
              <AlertTriangle size={24} />
            </span>
            ⚠️ تنبيه: مخزون منخفض
          </h2>
          <Link href="/inventory" className="btn btn-outline btn-sm group">
            إدارة المخزون
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-4 gap-5">
            {lowStockItems.map((item, index) => (
              <div
                key={index}
                className="relative p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden group animate-slide-up"
                style={{ animationDelay: `${1.2 + index * 0.1}s`, animationFillMode: 'both' }}
              >
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-orange-800">{item.name}</h4>
                    <Badge variant="warning">{item.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowDownRight className="text-orange-600" size={20} />
                    <span className="text-3xl font-extrabold text-orange-700">{item.current}</span>
                    <span className="text-orange-600 font-bold">{item.unit}</span>
                  </div>
                  <div className="text-sm text-orange-600 font-bold mb-3">
                    الحد الأدنى: {item.min} {item.unit}
                  </div>
                  <div className="progress-bar bg-orange-200 h-3">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500"
                      style={{ width: `${Math.min((item.current / item.min) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
