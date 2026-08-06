'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import CategoryCard from '@/components/ui/CategoryCard';
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
  { label: 'إضافة مادة خام', href: '/raw-materials/new', icon: <FlaskConical size={24} />, color: '#4338ca', colorLight: '#6366f1' },
  { label: 'تركيبة جديدة', href: '/formula-lab', icon: <Beaker size={24} />, color: '#7c3aed', colorLight: '#a78bfa' },
  { label: 'بدء تصنيع', href: '/production/new', icon: <Factory size={24} />, color: '#0891b2', colorLight: '#22d3ee' },
  { label: 'فاتورة جديدة', href: '/invoices/new', icon: <FileText size={24} />, color: '#be123c', colorLight: '#f43f5e' },
];

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [109, 40, 217];
}

function QuickActionLink({ action, index }: { action: typeof quickActions[number]; index: number }) {
  const [hov, setHov] = React.useState(false);
  const router = useRouter();
  return (
    <div
      className="group relative flex items-center gap-4 p-5 rounded-2xl overflow-hidden animate-slide-up"
      style={{
        animationDelay: `${0.6 + index * 0.1}s`,
        animationFillMode: 'both' as const,
        background: hov ? `linear-gradient(145deg, ${action.colorLight}, ${action.color})` : '#ffffff',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease, border 0.35s ease, background 0.35s ease',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hov
          ? '0 0 18px rgba(255,255,255,0.12), 0 14px 28px -6px rgba(0,0,0,0.3)'
          : '0 4px 14px -4px rgba(0,0,0,0.15)',
        border: hov ? '1.5px solid rgba(255,255,255,0.3)' : '2px solid rgba(0,0,0,0.06)',
        cursor: 'pointer',
        color: hov ? '#ffffff' : '#1f2937',
        borderTop: hov ? 'none' : `3px solid ${action.color}`,
      } as React.CSSProperties}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => router.push(action.href)}
    >
      {hov && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.18) 38%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.18) 62%, transparent 75%)',
          animation: 'shineSweep 0.75s ease-out forwards',
          pointerEvents: 'none', zIndex: 1,
        }} />
      )}
      <div style={{ position: 'absolute', top: 0, left: '12%', right: '12%', height: hov ? '2px' : '0px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), rgba(255,255,255,0.8), rgba(255,255,255,0.6), transparent)', transition: 'height 0.3s ease', boxShadow: hov ? '0 0 8px rgba(255,255,255,0.3)' : 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: 0, left: '12%', right: '12%', height: hov ? '2px' : '0px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), rgba(255,255,255,0.8), rgba(255,255,255,0.6), transparent)', transition: 'height 0.3s ease 0.05s', boxShadow: hov ? '0 0 8px rgba(255,255,255,0.3)' : 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '12%', bottom: '12%', right: 0, width: hov ? '2px' : '0px', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.6), rgba(255,255,255,0.8), rgba(255,255,255,0.6), transparent)', transition: 'width 0.3s ease 0.1s', boxShadow: hov ? '0 0 8px rgba(255,255,255,0.3)' : 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '12%', bottom: '12%', left: 0, width: hov ? '2px' : '0px', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.6), rgba(255,255,255,0.8), rgba(255,255,255,0.6), transparent)', transition: 'width 0.3s ease 0.15s', boxShadow: hov ? '0 0 8px rgba(255,255,255,0.3)' : 'none', zIndex: 1 }} />
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300"
        style={{
          background: hov ? 'rgba(255,255,255,0.2)' : `linear-gradient(145deg, ${action.colorLight}, ${action.color})`,
          border: hov ? '1.5px solid rgba(255,255,255,0.2)' : 'none',
          position: 'relative', zIndex: 2, flexShrink: 0,
          transform: hov ? 'scale(1.1) rotate(6deg)' : 'scale(1) rotate(0deg)',
          filter: hov ? 'drop-shadow(0 6px 12px rgba(0,0,0,0.3))' : 'none',
          color: '#ffffff',
        }}
      >
        {action.icon}
      </div>
      <span style={{
        fontWeight: 700, fontSize: '1.125rem',
        color: hov ? '#ffffff' : '#1f2937',
        textShadow: hov ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
        position: 'relative', zIndex: 2,
        transition: 'color 0.35s ease, transform 0.3s ease, text-shadow 0.35s ease',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
      }}>{action.label}</span>
    </div>
  );
}

/* Dashboard v2 - quick actions with per-card color hover + shine sweep */
export default function DashboardPage() {
  return (
    <div className="space-y-8" data-section="dashboard">
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
          icon={<FlaskConical size={20} />}
          delay={1}
          color="#4338ca"
          colorLight="#6366f1"
        />
        <StatCard
          title="التركيبات"
          value={formatNumber(stats.formulas, 0)}
          subtitle="تركيبة معتمدة"
          icon={<Beaker size={20} />}
          delay={2}
          color="#7c3aed"
          colorLight="#a78bfa"
        />
        <StatCard
          title="المنتجات"
          value={formatNumber(stats.products, 0)}
          subtitle="منتج نهائي"
          icon={<Package size={20} />}
          delay={3}
          color="#0891b2"
          colorLight="#22d3ee"
        />
        <StatCard
          title="مخزون منخفض"
          value={formatNumber(stats.lowStockItems, 0)}
          subtitle="يحتاج إعادة طلب"
          icon={<AlertTriangle size={20} />}
          delay={4}
          color="#991b1b"
          colorLight="#dc2626"
        />
        <StatCard
          title="مبيعات اليوم"
          value={formatCurrency(stats.todaySales)}
          icon={<ShoppingCart size={20} />}
          trend={{ value: 12, isPositive: true }}
          delay={5}
          color="#15803d"
          colorLight="#4ade80"
        />
        <StatCard
          title="مبيعات الشهر"
          value={formatCurrency(stats.monthSales)}
          icon={<TrendingUp size={20} />}
          trend={{ value: 8, isPositive: true }}
          delay={6}
          color="#065f46"
          colorLight="#10b981"
        />
        <StatCard
          title="قيمة المخزون"
          value={formatCurrency(stats.inventoryValue)}
          icon={<Warehouse size={20} />}
          delay={7}
          color="#d97706"
          colorLight="#fbbf24"
        />
        <StatCard
          title="إجمالي المديونيات"
          value={formatCurrency(stats.totalDebts)}
          icon={<CreditCard size={20} />}
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
          {productCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              count={category.count}
              colorClass={category.color}
              delay={0.4 + index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* الإجراءات السريعة */}
      <div className="card animate-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'both', border: 'none' }}>
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
              <QuickActionLink key={action.label} action={action} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* المنتجات الأكثر مبيعاً والتركيبات */}
      <div className="two-col-layout">
        {/* المنتجات الأكثر مبيعاً */}
        <div className="card list-card animate-slide-up section-color-green" style={{ animationDelay: '0.7s', animationFillMode: 'both', border: 'none', borderTop: '4px solid #16a34a' }}>
          <div className="card-header flex items-center justify-between" style={{ background: 'linear-gradient(to bottom, rgba(34,197,94,0.08), rgba(248,250,252,0.9))' }}>
            <h2 className="text-2xl font-extrabold flex items-center gap-3 section-color-green">
              <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-lg">
                <TrendingUp size={24} />
              </span>
              الأكثر مبيعاً
            </h2>
            <Link href="/reports" style={{ color: '#16a34a' }} className="text-sm font-bold hover:underline flex items-center gap-1">
              التقرير الكامل
              <ChevronLeft size={16} />
            </Link>
          </div>
          <div className="card-body p-0">
            {topProducts.map((product, index) => (
              <div 
                key={index} 
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(34,197,94,0.15)', cursor: 'pointer', transition: 'all 0.25s ease' }}
                className="group last:border-0 hover-list-green"
              >
                <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #dcfce7, #a7f3d0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0, transition: 'transform 0.3s' }} className="group-hover:scale-110 group-hover:rotate-6">
                  {product.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: '#16a34a', margin: 0 }} className="truncate">{product.name}</h4>
                  <p style={{ fontWeight: 700, fontSize: '0.8rem', color: '#15803d', margin: 0 }}>{product.sales} وحدة مباعة</p>
                </div>
                <div style={{ textAlign: 'left', flexShrink: 0 }}>
                  <p style={{ fontWeight: 800, fontSize: '0.95rem', color: '#16a34a', margin: 0 }}>{formatCurrency(product.revenue)}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#16a34a', fontWeight: 800 }}>
                    <TrendingUp size={12} />
                    +{product.trend}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* آخر التركيبات */}
        <div className="card list-card animate-slide-up section-color-purple" style={{ animationDelay: '0.8s', animationFillMode: 'both', border: 'none', borderTop: '4px solid #7c3aed' }}>
          <div className="card-header flex items-center justify-between" style={{ background: 'linear-gradient(to bottom, rgba(139,92,246,0.08), rgba(248,250,252,0.9))' }}>
            <h2 className="text-2xl font-extrabold flex items-center gap-3 section-color-purple">
              <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-white shadow-lg">
                <Beaker size={24} />
              </span>
              آخر التركيبات
            </h2>
            <Link href="/formulas" style={{ color: '#7c3aed' }} className="text-sm font-bold hover:underline flex items-center gap-1">
              عرض الكل
              <ChevronLeft size={16} />
            </Link>
          </div>
          <div className="card-body p-0">
            {recentFormulas.map((formula, index) => (
              <div 
                key={index} 
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(139,92,246,0.15)', cursor: 'pointer', transition: 'all 0.25s ease' }}
                className="group last:border-0 hover-list-purple"
              >
                <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0, transition: 'transform 0.3s' }} className="group-hover:scale-110 group-hover:rotate-6">
                  {formula.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: '#7c3aed', margin: 0 }} className="truncate">{formula.name}</h4>
                  <p style={{ fontWeight: 700, fontSize: '0.8rem', color: '#6d28d9', margin: 0 }}>{formula.category} • {formula.ingredients} مكون</p>
                </div>
                <div style={{ flexShrink: 0 }}>
                  {formula.status === 'approved' && <span style={{ fontWeight: 900, fontSize: '0.82rem', padding: '0.35rem 0.9rem', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', background: '#f0fdf4', color: '#15803d', border: '2px solid #4ade80' }}>معتمدة</span>}
                  {formula.status === 'testing' && <span style={{ fontWeight: 900, fontSize: '0.82rem', padding: '0.35rem 0.9rem', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', background: '#fff7ed', color: '#c2410c', border: '2px solid #fb923c' }}>تحت الاختبار</span>}
                  {formula.status === 'draft' && <span style={{ fontWeight: 900, fontSize: '0.82rem', padding: '0.35rem 0.9rem', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', background: '#f1f5f9', color: '#475569', border: '2px solid #94a3b8' }}>مسودة</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* التصنيع والفواتير */}
      <div className="two-col-layout">
        {/* آخر عمليات التصنيع */}
        <div className="card list-card animate-slide-up section-color-cyan" style={{ animationDelay: '0.9s', animationFillMode: 'both', border: 'none', borderTop: '4px solid #0891b2' }}>
          <div className="card-header flex items-center justify-between" style={{ background: 'linear-gradient(to bottom, rgba(6,182,212,0.08), rgba(248,250,252,0.9))' }}>
            <h2 className="text-2xl font-extrabold flex items-center gap-3 section-color-cyan">
              <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                <Factory size={24} />
              </span>
              التصنيع الجاري
            </h2>
            <Link href="/production" style={{ color: '#0891b2' }} className="text-sm font-bold hover:underline flex items-center gap-1">
              عرض الكل
              <ChevronLeft size={16} />
            </Link>
          </div>
          <div className="card-body p-0">
            <table className="table">
              <thead>
                <tr>
                  <th className="font-extrabold" style={{ color: '#0891b2' }}>رقم الدفعة</th>
                  <th className="font-extrabold" style={{ color: '#0891b2' }}>المنتج</th>
                  <th className="font-extrabold" style={{ color: '#0891b2' }}>التقدم</th>
                  <th className="font-extrabold" style={{ color: '#0891b2' }}>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recentProduction.map((batch, index) => (
                  <tr key={index} className="group" style={{ transition: 'all 0.25s ease', cursor: 'pointer' }}>
                    <td style={{ color: '#0891b2', fontWeight: 900, fontSize: '0.85rem', fontFamily: 'monospace' }}>{batch.batchNumber}</td>
                    <td style={{ color: '#0e7490', fontWeight: 800 }}>{batch.product}</td>
                    <td>
                      <div style={{ width: '100%', maxWidth: '140px' }}>
                        <div className="progress-bar h-3" style={{ background: 'rgba(8,145,178,0.15)', borderRadius: '999px', overflow: 'hidden' }}>
                          <div style={{ width: `${batch.progress}%`, height: '100%', borderRadius: '999px', background: 'linear-gradient(90deg, #0891b2, #22d3ee)', transition: 'width 0.5s ease' }} />
                        </div>
                        <span style={{ color: '#0891b2', fontWeight: 900, fontSize: '0.9rem', marginTop: '0.25rem', display: 'block', textAlign: 'center' }}>{batch.progress}%</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 800, color: '#0e7490', fontSize: '0.85rem' }}>{getProductionStatusBadge(batch.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* آخر الفواتير */}
        <div className="card list-card animate-slide-up section-color-orange" style={{ animationDelay: '1s', animationFillMode: 'both', border: 'none', borderTop: '4px solid #ea580c' }}>
          <div className="card-header flex items-center justify-between" style={{ background: 'linear-gradient(to bottom, rgba(249,115,22,0.08), rgba(248,250,252,0.9))' }}>
            <h2 className="text-2xl font-extrabold flex items-center gap-3 section-color-orange">
              <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg">
                <FileText size={24} />
              </span>
              آخر الفواتير
            </h2>
            <Link href="/invoices" style={{ color: '#ea580c' }} className="text-sm font-bold hover:underline flex items-center gap-1">
              عرض الكل
              <ChevronLeft size={16} />
            </Link>
          </div>
          <div className="card-body p-0">
            <table className="table">
              <thead>
                <tr>
                  <th className="font-extrabold" style={{ color: '#ea580c' }}>رقم الفاتورة</th>
                  <th className="font-extrabold" style={{ color: '#ea580c' }}>العميل</th>
                  <th className="font-extrabold" style={{ color: '#ea580c' }}>المبلغ</th>
                  <th className="font-extrabold" style={{ color: '#ea580c' }}>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((invoice, index) => (
                  <tr key={index} className="group" style={{ transition: 'all 0.25s ease', cursor: 'pointer' }}>
                    <td style={{ color: '#ea580c', fontWeight: 900, fontSize: '0.85rem', fontFamily: 'monospace' }}>{invoice.number}</td>
                    <td style={{ color: '#c2410c', fontWeight: 800 }}>{invoice.customer}</td>
                    <td style={{ color: '#ea580c', fontWeight: 800 }}>{formatCurrency(invoice.total)}</td>
                    <td style={{ fontWeight: 800, color: '#c2410c', fontSize: '0.85rem' }}>{getInvoiceStatusBadge(invoice.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* المواد منخفضة المخزون */}
      <div className="card animate-slide-up section-color-red" style={{ animationDelay: '1.1s', animationFillMode: 'both', border: 'none', borderTop: '4px solid #dc2626' }}>
        <div className="card-header flex items-center justify-between" style={{ background: 'linear-gradient(to bottom, rgba(220,38,38,0.08), rgba(248,250,252,0.9))' }}>
          <h2 className="text-2xl font-extrabold flex items-center gap-3 section-color-red">
            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow-lg animate-pulse">
              <AlertTriangle size={24} />
            </span>
            ⚠️ تنبيه: مخزون منخفض
          </h2>
          <div onClick={() => window.location.href = '/inventory'} className="btn btn-red-outline btn-sm group">
            إدارة المخزون
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-4 gap-5">
            {lowStockItems.map((item, index) => (
              <div
                key={index}
                className="relative p-5 rounded-2xl border-2 border-red-500 hover:border-red-700 hover:shadow-xl hover:shadow-red-500/25 hover:-translate-y-2 transition-all duration-300 overflow-hidden group animate-slide-up"
                style={{ animationDelay: `${1.2 + index * 0.1}s`, animationFillMode: 'both', background: '#fee2e2' }}
              >
                <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-25 group-hover:scale-150 transition-transform duration-500" style={{ background: 'radial-gradient(circle, #f87171, transparent)' }} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <h4 style={{ fontWeight: 800, color: '#991b1b', margin: 0 }}>{item.name}</h4>
                    <span style={{ fontWeight: 900, fontSize: '0.75rem', padding: '0.25rem 0.65rem', borderRadius: '9999px', background: '#dc2626', color: '#fff' }}>{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowDownRight style={{ color: '#dc2626' }} size={22} />
                    <span style={{ fontWeight: 900, fontSize: '1.75rem', color: '#b91c1c' }}>{item.current}</span>
                    <span style={{ fontWeight: 800, color: '#dc2626' }}>{item.unit}</span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#dc2626', marginBottom: '0.75rem' }}>
                    الحد الأدنى: {item.min} {item.unit}
                  </div>
                  <div className="progress-bar h-3" style={{ background: '#fecaca', borderRadius: '999px', overflow: 'hidden' }}>
                    <div
                      style={{ width: `${Math.min((item.current / item.min) * 100, 100)}%`, height: '100%', borderRadius: '999px', background: '#dc2626', transition: 'width 0.5s ease' }}
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
