'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  FlaskConical, Package, Beaker, Factory, Truck, ShoppingCart,
  FileText, TrendingUp, AlertTriangle, ChevronLeft, Plus, ArrowDownRight,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import StatCard from '@/components/ui/StatCard';
import { formatNumber } from '@/lib/utils';

/* ===================================================================
   مكونات مشتركة بستايل لوحة التحكم - بتستخدم في كل صفحات الأقسام
   =================================================================== */

// === QuickActionLink - نفس ستايل لوحة التحكم بالضبط ===
function QuickActionLink({ action, index, sectionColor }: { 
  action: { label: string; href: string; icon: React.ReactNode; color: string; colorLight: string }; 
  index: number;
  sectionColor: string;
}) {
  const [hov, setHov] = useState(false);
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

// === StatusBadge - نفس ستايل لوحة التحكم ===
function StatusBadge({ status }: { status: string }) {
  const s = status;
  const approved = s === 'معتمدة' || s === 'مكتمل' || s === 'paid' || s === 'متوفر';
  const testing = s === 'تحت الاختبار' || s === 'جاري' || s === 'in_progress' || s === 'partially_paid' || s === 'confirmed';
  const draft = s === 'مسودة' || s === 'مخطط' || s === 'draft';
  const qc = s === 'فحص جودة' || s === 'quality_check';

  return (
    <span style={{
      fontWeight: 900, fontSize: '0.82rem', padding: '0.35rem 0.9rem', borderRadius: '9999px',
      display: 'inline-flex', alignItems: 'center',
      background: approved ? '#f0fdf4' : testing ? '#eff6ff' : qc ? '#fff7ed' : draft ? '#f1f5f9' : '#fff7ed',
      color: approved ? '#15803d' : testing ? '#2563eb' : qc ? '#c2410c' : draft ? '#475569' : '#c2410c',
      border: `2px solid ${approved ? '#4ade80' : testing ? '#60a5fa' : qc ? '#fb923c' : draft ? '#94a3b8' : '#fb923c'}`,
    }}>{s}</span>
  );
}

// === SectionLink - نفس ستايل روابط الداشبورد ===
function SectionLink({ label, color, onClick }: { label: string; color: string; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      style={{
        color, cursor: 'pointer', padding: '0.35rem 0.9rem', borderRadius: '0.6rem',
        fontWeight: 800, fontSize: '0.85rem', transition: 'all 0.2s',
        display: 'flex', alignItems: 'center', gap: '0.3rem',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = `${color}18`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {label}
      <ChevronLeft size={16} />
    </div>
  );
}

// === AddButton - زر إضافة بستايل الداشبورد ===
function AddButton({ label, color, colorLight }: { label: string; color: string; colorLight: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '0.5rem 1.2rem', borderRadius: '0.85rem',
        background: hov ? `linear-gradient(135deg, ${colorLight}, ${color})` : color,
        color: '#fff', fontWeight: 800, fontSize: '0.85rem',
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
        transition: 'all 0.25s ease',
        boxShadow: hov ? `0 6px 20px -4px ${color}55` : `0 4px 14px -2px ${color}33`,
        transform: hov ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
      }}
    >
      <Plus size={16} />
      {label}
    </div>
  );
}

// === ListItem - بستايل قوائم الداشبورد مع hover ===
function ListItem({ name, subtitle, badge, emoji, color, value, hoverClass }: {
  name: string; subtitle?: string; badge?: string; emoji?: string;
  color: string; value?: string; hoverClass?: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '1rem 1.25rem', borderBottom: `1px solid ${color}15`,
        cursor: 'pointer', transition: 'all 0.25s ease',
        background: hov ? `${color}0a` : 'transparent',
        transform: hov ? 'translateX(6px)' : 'translateX(0)',
        boxShadow: hov ? `-4px 0 0 0 ${color}` : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {emoji && (
        <div style={{
          width: '3.5rem', height: '3.5rem', borderRadius: '0.75rem',
          background: `linear-gradient(135deg, ${color}12, ${color}08)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.75rem', flexShrink: 0, transition: 'transform 0.3s',
          transform: hov ? 'scale(1.1) rotate(6deg)' : 'scale(1)',
        }}>
          {emoji}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color, margin: 0 }} className="truncate">{name}</h4>
        {subtitle && <p style={{ fontWeight: 700, fontSize: '0.8rem', color: '#64748b', margin: 0 }}>{subtitle}</p>}
      </div>
      {value && <span style={{ fontWeight: 800, fontSize: '0.95rem', color }}>{value}</span>}
      {badge && <StatusBadge status={badge} />}
    </div>
  );
}

// === TableRow hover بستايل الداشبورد ===
function TableRowWithHover({ children, color }: { children: React.ReactNode; color: string }) {
  const [hov, setHov] = useState(false);
  return (
    <tr
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderBottom: `1px solid ${color}12`,
        transition: 'all 0.25s ease',
        background: hov ? `${color}0a` : 'transparent',
        cursor: 'pointer',
      }}
    >
      {children}
    </tr>
  );
}

// === ProgressBar بستايل الداشبورد ===
function ProgressBar({ progress, color, colorLight }: { progress: number; color: string; colorLight: string }) {
  return (
    <div style={{ width: '100%', maxWidth: '140px' }}>
      <div style={{ background: `${color}15`, borderRadius: '999px', overflow: 'hidden', height: '0.75rem' }}>
        <div style={{
          width: `${progress}%`, height: '100%', borderRadius: '999px',
          background: `linear-gradient(90deg, ${color}, ${colorLight})`,
          transition: 'width 0.5s ease',
        }} />
      </div>
      <span style={{ color, fontWeight: 900, fontSize: '0.9rem', marginTop: '0.25rem', display: 'block', textAlign: 'center' }}>{progress}%</span>
    </div>
  );
}

/* ===================================================================
   SectionPage - المكون الرئيسي لكل صفحة قسم
   =================================================================== */
interface SectionPageProps {
  section: {
    id: string;
    name: string;
    description: string;
    image: string;
    color: string;
    colorLight: string;
    icon: React.ReactNode;
  };
  rawMaterials: { name: string; stock: number; unit: string; min: number; status: string }[];
  formulas: { name: string; status: string; ingredients: number; category: string }[];
  products: { name: string; price: number; stock: number; category: string }[];
  suppliers: { name: string; material: string; phone: string }[];
  recentProduction: { batch: string; product: string; qty: string; status: string; progress: number }[];
  lowStockEmojis?: Record<string, string>;
  formulaEmojis?: Record<string, string>;
}

export default function SectionPage({ section, rawMaterials, formulas, products, suppliers, recentProduction, lowStockEmojis = {}, formulaEmojis = {} }: SectionPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  const c = section.color;
  const cl = section.colorLight;

  // الإجراءات السريعة - بستايل الداشبورد
  const quickActions = [
    { label: 'إضافة مادة خام', href: '/raw-materials/new', icon: <FlaskConical size={24} />, color: c, colorLight: cl },
    { label: 'تركيبة جديدة', href: '/formula-lab', icon: <Beaker size={24} />, color: '#7c3aed', colorLight: '#a78bfa' },
    { label: 'بدء تصنيع', href: '/production/new', icon: <Factory size={24} />, color: '#0891b2', colorLight: '#22d3ee' },
    { label: 'فاتورة جديدة', href: '/invoices/new', icon: <FileText size={24} />, color: '#ea580c', colorLight: '#f97316' },
  ];

  // الإحصائيات
  const statsData = [
    { title: 'المنتجات', value: formatNumber(products.length, 0), subtitle: 'منتج نهائي', icon: <Package size={20} />, color: c, colorLight: cl },
    { title: 'التركيبات', value: formatNumber(formulas.length, 0), subtitle: 'تركيبة', icon: <Beaker size={20} />, color: '#7c3aed', colorLight: '#a78bfa' },
    { title: 'المواد الخام', value: formatNumber(rawMaterials.length, 0), subtitle: 'مادة', icon: <FlaskConical size={20} />, color: '#0891b2', colorLight: '#22d3ee' },
    { title: 'الموردين', value: formatNumber(suppliers.length, 0), subtitle: 'مورد', icon: <Truck size={20} />, color: '#d97706', colorLight: '#fbbf24' },
  ];

  return (
    <div className="space-y-8" data-section={section.id}>
      {/* الترحيب */}
      <div className="animate-slide-up">
        <div className="flex items-center gap-5 mb-2">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl animate-float"
            style={{ background: `linear-gradient(135deg, ${cl}, ${c})`, boxShadow: `0 10px 26px -10px ${c}44` }}>
            <span style={{ color: '#fff' }}>{section.icon}</span>
          </div>
          <div>
            <h1 style={{ fontWeight: 900, fontSize: '2.2rem', color: c, margin: 0 }}>{section.name}</h1>
            <p style={{ fontWeight: 600, fontSize: '1.1rem', color: '#64748b', margin: 0 }}>{section.description}</p>
          </div>
        </div>
      </div>

      {/* الإحصائيات - بستايل StatCard زي الداشبورد */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '0.5rem', padding: '1.25rem', borderRadius: '1.2rem', border: '2px solid #e2e8f0', background: 'rgba(255,255,255,0.7)' }}>
        {statsData.map((s, i) => (
          <StatCard key={i} title={s.title} value={s.value} subtitle={s.subtitle} icon={s.icon} delay={i+1} color={s.color} colorLight={s.colorLight} />
        ))}
      </div>

      {/* ===== نظرة عامة ===== */}
      {activeTab === 'overview' && (
        <>
          {/* صورة القسم */}
          <div style={{
            borderRadius: '1.5rem', overflow: 'hidden', position: 'relative',
            height: '280px', boxShadow: '0 4px 16px -4px rgba(0,0,0,0.1)',
          }}>
            <img src={section.image} alt={section.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: `linear-gradient(to top, ${c}dd, ${c}66, transparent)` }} />
            <div style={{ position: 'absolute', bottom: '1.5rem', right: '2rem', zIndex: 2 }}>
              <h2 style={{ fontWeight: 900, fontSize: '2.5rem', color: '#fff', margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>{section.name}</h2>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', margin: '0.3rem 0 0 0' }}>{section.description}</p>
            </div>
          </div>

          {/* الإجراءات السريعة - نفس ستايل الداشبورد بالضبط */}
          <div className="card animate-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'both', border: '2px solid #e2e8f0', background: 'rgba(255,255,255,0.7)' }}>
            <div className="card-header">
              <h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: c }}>
                <span className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}>
                  <ShoppingCart size={24} />
                </span>
                إجراءات سريعة
              </h2>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1.25rem' }}>
                {quickActions.map((action, index) => (
                  <QuickActionLink key={action.label} action={action} index={index} sectionColor={c} />
                ))}
              </div>
            </div>
          </div>

          {/* آخر التركيبات + آخر المنتجات - بستايل أقسام الداشبورد */}
          <div className="two-col-layout">
            {/* آخر التركيبات */}
            <div className="card list-card animate-slide-up section-color-purple" style={{ animationDelay: '0.7s', animationFillMode: 'both', border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}>
              <div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, ${c}08, rgba(248,250,252,0.9))` }}>
                <h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: c }}>
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}>
                    <Beaker size={24} />
                  </span>
                  آخر التركيبات
                </h2>
                <SectionLink label="عرض الكل" color={c} onClick={() => router.push(`${window.location.pathname}?tab=formulas`)} />
              </div>
              <div className="card-body p-0">
                {formulas.slice(0, 4).map((f, i) => (
                  <ListItem
                    key={i}
                    name={f.name}
                    subtitle={`${f.category} • ${f.ingredients} مكون`}
                    badge={f.status}
                    emoji={formulaEmojis[f.name] || '🧪'}
                    color={c}
                  />
                ))}
              </div>
            </div>

            {/* آخر المنتجات */}
            <div className="card list-card animate-slide-up section-color-green" style={{ animationDelay: '0.8s', animationFillMode: 'both', border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}>
              <div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, ${c}08, rgba(248,250,252,0.9))` }}>
                <h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: c }}>
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}>
                    <Package size={24} />
                  </span>
                  آخر المنتجات
                </h2>
                <SectionLink label="عرض الكل" color={c} onClick={() => router.push(`${window.location.pathname}?tab=products`)} />
              </div>
              <div className="card-body p-0">
                {products.slice(0, 4).map((p, i) => (
                  <ListItem
                    key={i}
                    name={p.name}
                    subtitle={`${p.category} • مخزون: ${p.stock}`}
                    value={formatCurrency(p.price)}
                    emoji="📦"
                    color={c}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* تنبيه مخزون منخفض - بستايل الداشبورد */}
          {rawMaterials.filter(r => r.status === 'منخفض').length > 0 && (
            <div className="card animate-slide-up section-color-red" style={{ animationDelay: '1.1s', animationFillMode: 'both', border: '2px solid rgba(220,38,38,0.3)', borderTop: '4px solid #dc2626' }}>
              <div className="card-header flex items-center justify-between" style={{ background: 'linear-gradient(to bottom, rgba(220,38,38,0.08), rgba(248,250,252,0.9))' }}>
                <h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#dc2626' }}>
                  <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow-lg animate-pulse">
                    <AlertTriangle size={24} />
                  </span>
                  ⚠️ تنبيه: مخزون منخفض
                </h2>
                <SectionLink label="إدارة المخزون" color="#dc2626" onClick={() => router.push('/inventory')} />
              </div>
              <div className="card-body">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {rawMaterials.filter(r => r.status === 'منخفض').map((item, index) => (
                    <div
                      key={index}
                      className="relative p-5 rounded-2xl border-2 border-red-500 hover:border-red-700 hover:shadow-xl hover:shadow-red-500/25 hover:-translate-y-2 transition-all duration-300 overflow-hidden group animate-slide-up"
                      style={{ animationDelay: `${1.2 + index * 0.1}s`, animationFillMode: 'both', background: '#fee2e2' }}
                    >
                      <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-25 group-hover:scale-150 transition-transform duration-500"
                        style={{ background: 'radial-gradient(circle, #f87171, transparent)' }} />
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <h4 style={{ fontWeight: 800, color: '#991b1b', margin: 0 }}>{item.name}</h4>
                          <span style={{ fontWeight: 900, fontSize: '0.75rem', padding: '0.25rem 0.65rem', borderRadius: '9999px', background: '#dc2626', color: '#fff' }}>منخفض</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <ArrowDownRight style={{ color: '#dc2626' }} size={22} />
                          <span style={{ fontWeight: 900, fontSize: '1.75rem', color: '#b91c1c' }}>{item.stock}</span>
                          <span style={{ fontWeight: 800, color: '#dc2626' }}>{item.unit}</span>
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#dc2626', marginBottom: '0.75rem' }}>
                          الحد الأدنى: {item.min} {item.unit}
                        </div>
                        <div style={{ background: '#fecaca', borderRadius: '999px', overflow: 'hidden', height: '0.75rem' }}>
                          <div style={{ width: `${Math.min((item.stock / item.min) * 100, 100)}%`, height: '100%', borderRadius: '999px', background: '#dc2626', transition: 'width 0.5s ease' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ===== المواد الخام ===== */}
      {activeTab === 'raw' && (
        <div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}`, overflow: 'hidden' }}>
          <div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, ${c}08, rgba(248,250,252,0.9))` }}>
            <h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: c }}>
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}>
                <FlaskConical size={24} />
              </span>
              المواد الخام ({rawMaterials.length})
            </h2>
            <AddButton label="إضافة مادة" color={c} colorLight={cl} />
          </div>
          <div className="card-body p-0">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ color: c, fontWeight: 900 }}>الاسم</th>
                  <th style={{ color: c, fontWeight: 900 }}>المخزون</th>
                  <th style={{ color: c, fontWeight: 900 }}>الوحدة</th>
                  <th style={{ color: c, fontWeight: 900 }}>الحد الأدنى</th>
                  <th style={{ color: c, fontWeight: 900 }}>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {rawMaterials.map((r, i) => (
                  <TableRowWithHover key={i} color={c}>
                    <td style={{ fontWeight: 700, color: '#1e293b' }}>{r.name}</td>
                    <td style={{ fontWeight: 800, color: r.status === 'منخفض' ? '#dc2626' : c }}>{r.stock}</td>
                    <td style={{ fontWeight: 600, color: '#64748b' }}>{r.unit}</td>
                    <td style={{ fontWeight: 600, color: '#64748b' }}>{r.min}</td>
                    <td><StatusBadge status={r.status} /></td>
                  </TableRowWithHover>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== التركيبات ===== */}
      {activeTab === 'formulas' && (
        <div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}`, overflow: 'hidden' }}>
          <div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, ${c}08, rgba(248,250,252,0.9))` }}>
            <h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: c }}>
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}>
                <Beaker size={24} />
              </span>
              التركيبات ({formulas.length})
            </h2>
            <AddButton label="تركيبة جديدة" color={c} colorLight={cl} />
          </div>
          <div className="card-body p-0">
            {formulas.map((f, i) => (
              <ListItem
                key={i}
                name={f.name}
                subtitle={`${f.category} • ${f.ingredients} مكون`}
                badge={f.status}
                emoji={formulaEmojis[f.name] || '🧪'}
                color={c}
              />
            ))}
          </div>
        </div>
      )}

      {/* ===== المنتجات ===== */}
      {activeTab === 'products' && (
        <div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}`, overflow: 'hidden' }}>
          <div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, ${c}08, rgba(248,250,252,0.9))` }}>
            <h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: c }}>
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}>
                <Package size={24} />
              </span>
              المنتجات ({products.length})
            </h2>
            <AddButton label="منتج جديد" color={c} colorLight={cl} />
          </div>
          <div className="card-body p-0">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ color: c, fontWeight: 900 }}>المنتج</th>
                  <th style={{ color: c, fontWeight: 900 }}>التصنيف</th>
                  <th style={{ color: c, fontWeight: 900 }}>السعر</th>
                  <th style={{ color: c, fontWeight: 900 }}>المخزون</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <TableRowWithHover key={i} color={c}>
                    <td style={{ fontWeight: 700, color: '#1e293b' }}>{p.name}</td>
                    <td style={{ fontWeight: 600, color: '#64748b' }}>{p.category}</td>
                    <td style={{ fontWeight: 800, color: c }}>{formatCurrency(p.price)}</td>
                    <td style={{ fontWeight: 700, color: p.stock < 150 ? '#d97706' : '#15803d' }}>{p.stock}</td>
                  </TableRowWithHover>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== التصنيع ===== */}
      {activeTab === 'production' && (
        <div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}`, overflow: 'hidden' }}>
          <div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, ${c}08, rgba(248,250,252,0.9))` }}>
            <h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: c }}>
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}>
                <Factory size={24} />
              </span>
              التصنيع ({recentProduction.length})
            </h2>
            <AddButton label="بدء تصنيع" color={c} colorLight={cl} />
          </div>
          <div className="card-body p-0">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ color: c, fontWeight: 900 }}>رقم الدفعة</th>
                  <th style={{ color: c, fontWeight: 900 }}>المنتج</th>
                  <th style={{ color: c, fontWeight: 900 }}>الكمية</th>
                  <th style={{ color: c, fontWeight: 900 }}>التقدم</th>
                  <th style={{ color: c, fontWeight: 900 }}>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recentProduction.map((b, i) => (
                  <TableRowWithHover key={i} color={c}>
                    <td style={{ fontWeight: 800, fontSize: '0.85rem', color: c, fontFamily: 'monospace' }}>{b.batch}</td>
                    <td style={{ fontWeight: 700, color: '#1e293b' }}>{b.product}</td>
                    <td style={{ fontWeight: 600, color: '#64748b' }}>{b.qty}</td>
                    <td><ProgressBar progress={b.progress} color={c} colorLight={cl} /></td>
                    <td><StatusBadge status={b.status} /></td>
                  </TableRowWithHover>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== الموردين ===== */}
      {activeTab === 'suppliers' && (
        <div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}`, overflow: 'hidden' }}>
          <div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, ${c}08, rgba(248,250,252,0.9))` }}>
            <h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: c }}>
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}>
                <Truck size={24} />
              </span>
              الموردين ({suppliers.length})
            </h2>
            <AddButton label="مورد جديد" color={c} colorLight={cl} />
          </div>
          <div className="card-body p-0">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ color: c, fontWeight: 900 }}>المورد</th>
                  <th style={{ color: c, fontWeight: 900 }}>المادة الموردة</th>
                  <th style={{ color: c, fontWeight: 900 }}>الهاتف</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((s, i) => (
                  <TableRowWithHover key={i} color={c}>
                    <td style={{ fontWeight: 700, color: '#1e293b' }}>{s.name}</td>
                    <td style={{ fontWeight: 600, color: c }}>{s.material}</td>
                    <td style={{ fontWeight: 600, color: '#64748b', direction: 'ltr', textAlign: 'center' }}>{s.phone}</td>
                  </TableRowWithHover>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
