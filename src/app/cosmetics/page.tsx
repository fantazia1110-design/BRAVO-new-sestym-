'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FlaskConical, Package, Beaker, Factory, Truck, ShoppingCart,
  FileText, TrendingUp, AlertTriangle, ChevronLeft, Plus,
  Sparkles, Search, Filter,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const SECTION = {
  id: 'cosmetics',
  name: 'مستحضرات التجميل',
  description: 'منتجات تجميلية عالية الجودة بتركيبات طبيعية',
  image: '/icons/real-cosmetics.jpg',
  color: '#db2777',
  colorLight: '#ec4899',
  icon: <Sparkles size={24} />,
};

const rawMaterials = [
  { name: 'زيت الأرغان', stock: 5, unit: 'لتر', min: 15, status: 'منخفض' },
  { name: 'شمع العسل', stock: 40, unit: 'كجم', min: 10, status: 'متوفر' },
  { name: 'زبدة الشيا', stock: 30, unit: 'كجم', min: 15, status: 'متوفر' },
  { name: 'فيتامين E', stock: 8, unit: 'لتر', min: 10, status: 'منخفض' },
  { name: 'حمض الهيالورونيك', stock: 3, unit: 'كجم', min: 5, status: 'منخفض' },
  { name: 'مادة الصبار', stock: 50, unit: 'لتر', min: 20, status: 'متوفر' },
  { name: 'كحول سيتيل', stock: 25, unit: 'كجم', min: 10, status: 'متوفر' },
  { name: 'أكسيد الزنك', stock: 15, unit: 'كجم', min: 8, status: 'متوفر' },
];

const formulas = [
  { name: 'كريم مرطب بالصبار', status: 'معتمدة', ingredients: 12, category: 'عناية البشرة' },
  { name: 'سيروم فيتامين C', status: 'معتمدة', ingredients: 8, category: 'سيرومات' },
  { name: 'أحمر شفاه مات', status: 'تحت الاختبار', ingredients: 10, category: 'مكياج' },
  { name: 'ماسك شمع العسل', status: 'معتمدة', ingredients: 6, category: 'ماسكات' },
  { name: 'كريم واقي شمس', status: 'مسودة', ingredients: 9, category: 'حماية' },
  { name: 'تونر حمض الهيالورونيك', status: 'معتمدة', ingredients: 7, category: 'عناية البشرة' },
];

const products = [
  { name: 'كريم مرطب بالصبار 100مل', price: 45, stock: 200, category: 'عناية البشرة' },
  { name: 'سيروم فيتامين C 30مل', price: 85, stock: 150, category: 'سيرومات' },
  { name: 'أحمر شفاه مات', price: 35, stock: 300, category: 'مكياج' },
  { name: 'ماسك شمع العسل 50جم', price: 40, stock: 180, category: 'ماسكات' },
  { name: 'كريم واقي شمس SPF50', price: 55, stock: 120, category: 'حماية' },
  { name: 'تونر حمض الهيالورونيك 200مل', price: 60, stock: 90, category: 'عناية البشرة' },
  { name: 'كريم عين بالكافيين 30مل', price: 75, stock: 60, category: 'عناية العين' },
  { name: 'فونداسيون سائل', price: 50, stock: 250, category: 'مكياج' },
];

const suppliers = [
  { name: 'شركة الزيوت الطبيعية', material: 'زيت الأرغان', phone: '01023456789' },
  { name: 'موردو الشيا الأفارقة', material: 'زبدة الشيا', phone: '01187654321' },
  { name: 'كيماويات التجميل المتخصصة', material: 'حمض الهيالورونيك', phone: '01245678901' },
  { name: 'شركة الفيتامينات الدولية', material: 'فيتامين E', phone: '01578901234' },
];

const recentProduction = [
  { batch: 'COS-2026-001', product: 'كريم مرطب بالصبار', qty: '500 عبوة', status: 'جاري', progress: 70 },
  { batch: 'COS-2026-002', product: 'سيروم فيتامين C', qty: '300 عبوة', status: 'مكتمل', progress: 100 },
  { batch: 'COS-2026-003', product: 'أحمر شفاه مات', qty: '1000 قطعة', status: 'فحص جودة', progress: 90 },
];

function TabButton({ label, icon, active, onClick, color }: { label: string; icon: React.ReactNode; active: boolean; onClick: () => void; color: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        padding: '0.75rem 1.5rem', borderRadius: '0.75rem',
        fontWeight: 800, fontSize: '0.95rem',
        background: active ? color : 'transparent',
        color: active ? '#fff' : '#475569',
        border: active ? 'none' : '1.5px solid #e2e8f0',
        cursor: 'pointer', transition: 'all 0.25s ease',
        boxShadow: active ? `0 4px 14px -2px ${color}44` : 'none',
      }}
    >
      {icon}
      {label}
    </button>
  );
}

export default function CosmeticsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const c = SECTION.color;
  const cl = SECTION.colorLight;

  return (
    <div style={{ padding: '1.5rem' }} data-section="cosmetics">
      {/* الهيدر */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '3.5rem', height: '3.5rem', borderRadius: '1rem',
            background: `linear-gradient(135deg, ${cl}, ${c})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', boxShadow: `0 4px 14px -2px ${c}44`,
          }}>
            {SECTION.icon}
          </div>
          <div>
            <h1 style={{ fontWeight: 900, fontSize: '2rem', color: c, margin: 0 }}>{SECTION.name}</h1>
            <p style={{ fontWeight: 600, fontSize: '0.95rem', color: '#64748b', margin: 0 }}>{SECTION.description}</p>
          </div>
        </div>
        <div
          onClick={() => router.push('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1.2rem', borderRadius: '0.75rem',
            background: '#f1f5f9', border: '1.5px solid #e2e8f0',
            fontWeight: 700, fontSize: '0.9rem', color: '#475569',
            cursor: 'pointer', transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = c; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = c; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
        >
          <ChevronLeft size={18} />
          الرجوع للأقسام
        </div>
      </div>

      {/* التبويبات */}
      <div style={{
        display: 'flex', gap: '0.5rem', marginBottom: '1.5rem',
        padding: '0.5rem', borderRadius: '1rem', background: '#f8fafc',
        border: '1.5px solid #e2e8f0', flexWrap: 'wrap',
      }}>
        <TabButton label="نظرة عامة" icon={<TrendingUp size={18} />} active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} color={c} />
        <TabButton label="المواد الخام" icon={<FlaskConical size={18} />} active={activeTab === 'raw'} onClick={() => setActiveTab('raw')} color={c} />
        <TabButton label="التركيبات" icon={<Beaker size={18} />} active={activeTab === 'formulas'} onClick={() => setActiveTab('formulas')} color={c} />
        <TabButton label="المنتجات" icon={<Package size={18} />} active={activeTab === 'products'} onClick={() => setActiveTab('products')} color={c} />
        <TabButton label="التصنيع" icon={<Factory size={18} />} active={activeTab === 'production'} onClick={() => setActiveTab('production')} color={c} />
        <TabButton label="الموردين" icon={<Truck size={18} />} active={activeTab === 'suppliers'} onClick={() => setActiveTab('suppliers')} color={c} />
      </div>

      {/* نظرة عامة */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {[
              { label: 'منتج', value: '8', icon: <Package size={22} />, color: c },
              { label: 'تركيبة', value: '5', icon: <Beaker size={22} />, color: cl },
              { label: 'مادة خام', value: '12', icon: <FlaskConical size={22} />, color: '#0891b2' },
              { label: 'مورد', value: '4', icon: <Truck size={22} />, color: '#d97706' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '1.5rem', borderRadius: '1rem', background: '#fff',
                border: `2px solid ${s.color}22`, borderTop: `4px solid ${s.color}`,
                display: 'flex', alignItems: 'center', gap: '1rem',
                boxShadow: '0 2px 8px -2px rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  width: '3rem', height: '3rem', borderRadius: '0.75rem',
                  background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', flexShrink: 0,
                }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: '2rem', color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#64748b' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            borderRadius: '1.5rem', overflow: 'hidden', position: 'relative',
            height: '280px', boxShadow: '0 4px 16px -4px rgba(0,0,0,0.1)',
          }}>
            <img src={SECTION.image} alt={SECTION.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: `linear-gradient(to top, ${c}dd, ${c}66, transparent)` }} />
            <div style={{ position: 'absolute', bottom: '1.5rem', right: '2rem', zIndex: 2 }}>
              <h2 style={{ fontWeight: 900, fontSize: '2.5rem', color: '#fff', margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>{SECTION.name}</h2>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', margin: '0.3rem 0 0 0' }}>{SECTION.description}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ borderRadius: '1rem', background: '#fff', border: `2px solid ${c}22`, borderTop: `4px solid ${c}`, overflow: 'hidden' }}>
              <div style={{ padding: '1rem 1.5rem', background: `${c}08`, fontWeight: 800, fontSize: '1.1rem', color: c, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Beaker size={20} /> آخر التركيبات
              </div>
              {formulas.slice(0, 3).map((f, i) => (
                <div key={i} style={{ padding: '0.85rem 1.5rem', borderBottom: `1px solid ${c}12`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: c }}>{f.name}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.8rem', color: '#64748b' }}>{f.category} • {f.ingredients} مكون</div>
                  </div>
                  <span style={{
                    fontWeight: 800, fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '999px',
                    background: f.status === 'معتمدة' ? '#f0fdf4' : f.status === 'تحت الاختبار' ? '#fff7ed' : '#f1f5f9',
                    color: f.status === 'معتمدة' ? '#15803d' : f.status === 'تحت الاختبار' ? '#c2410c' : '#475569',
                    border: `1.5px solid ${f.status === 'معتمدة' ? '#4ade80' : f.status === 'تحت الاختبار' ? '#fb923c' : '#94a3b8'}`,
                  }}>{f.status}</span>
                </div>
              ))}
            </div>

            <div style={{ borderRadius: '1rem', background: '#fff', border: `2px solid ${c}22`, borderTop: `4px solid ${c}`, overflow: 'hidden' }}>
              <div style={{ padding: '1rem 1.5rem', background: `${c}08`, fontWeight: 800, fontSize: '1.1rem', color: c, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Package size={20} /> آخر المنتجات
              </div>
              {products.slice(0, 3).map((p, i) => (
                <div key={i} style={{ padding: '0.85rem 1.5rem', borderBottom: `1px solid ${c}12`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: c }}>{p.name}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.8rem', color: '#64748b' }}>{p.category} • مخزون: {p.stock}</div>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', color: c }}>{formatCurrency(p.price)}</span>
                </div>
              ))}
            </div>
          </div>

          {rawMaterials.filter(r => r.status === 'منخفض').length > 0 && (
            <div style={{ borderRadius: '1rem', background: '#fee2e2', border: '2px solid #fecaca', borderTop: '4px solid #dc2626', padding: '1.5rem' }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <AlertTriangle size={20} /> تنبيه: مواد خام منخفضة المخزون
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0.75rem' }}>
                {rawMaterials.filter(r => r.status === 'منخفض').map((r, i) => (
                  <div key={i} style={{ padding: '0.75rem', borderRadius: '0.75rem', background: '#fff', border: '1.5px solid #fca5a5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#991b1b' }}>{r.name}</span>
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#dc2626' }}>{r.stock} {r.unit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* المواد الخام */}
      {activeTab === 'raw' && (
        <div style={{ borderRadius: '1rem', background: '#fff', border: `2px solid ${c}22`, borderTop: `4px solid ${c}`, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', background: `${c}08`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: c, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FlaskConical size={22} /> المواد الخام ({rawMaterials.length})
            </span>
            <div style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', background: c, color: '#fff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Plus size={16} /> إضافة مادة
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: `${c}0a` }}>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>الاسم</th>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>المخزون</th>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>الوحدة</th>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>الحد الأدنى</th>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {rawMaterials.map((r, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${c}12` }}>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 700, color: '#1e293b' }}>{r.name}</td>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 800, color: r.status === 'منخفض' ? '#dc2626' : c }}>{r.stock}</td>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 600, color: '#64748b' }}>{r.unit}</td>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 600, color: '#64748b' }}>{r.min}</td>
                  <td style={{ padding: '0.85rem 1.5rem' }}>
                    <span style={{
                      fontWeight: 800, fontSize: '0.8rem', padding: '0.25rem 0.75rem', borderRadius: '999px',
                      background: r.status === 'منخفض' ? '#fee2e2' : '#f0fdf4',
                      color: r.status === 'منخفض' ? '#dc2626' : '#15803d',
                      border: `1.5px solid ${r.status === 'منخفض' ? '#fca5a5' : '#4ade80'}`,
                    }}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* التركيبات */}
      {activeTab === 'formulas' && (
        <div style={{ borderRadius: '1rem', background: '#fff', border: `2px solid ${c}22`, borderTop: `4px solid ${c}`, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', background: `${c}08`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: c, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Beaker size={22} /> التركيبات ({formulas.length})
            </span>
            <div style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', background: c, color: '#fff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Plus size={16} /> تركيبة جديدة
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', padding: '1.5rem' }}>
            {formulas.map((f, i) => (
              <div key={i} style={{ padding: '1.25rem', borderRadius: '0.75rem', border: `1.5px solid ${c}22`, background: `${c}04`, cursor: 'pointer', transition: 'all 0.25s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: c }}>{f.name}</span>
                  <span style={{
                    fontWeight: 800, fontSize: '0.75rem', padding: '0.2rem 0.65rem', borderRadius: '999px',
                    background: f.status === 'معتمدة' ? '#f0fdf4' : f.status === 'تحت الاختبار' ? '#fff7ed' : '#f1f5f9',
                    color: f.status === 'معتمدة' ? '#15803d' : f.status === 'تحت الاختبار' ? '#c2410c' : '#475569',
                    border: `1.5px solid ${f.status === 'معتمدة' ? '#4ade80' : f.status === 'تحت الاختبار' ? '#fb923c' : '#94a3b8'}`,
                  }}>{f.status}</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#64748b' }}>{f.category} • {f.ingredients} مكون</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* المنتجات */}
      {activeTab === 'products' && (
        <div style={{ borderRadius: '1rem', background: '#fff', border: `2px solid ${c}22`, borderTop: `4px solid ${c}`, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', background: `${c}08`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: c, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={22} /> المنتجات ({products.length})
            </span>
            <div style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', background: c, color: '#fff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Plus size={16} /> منتج جديد
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: `${c}0a` }}>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>المنتج</th>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>التصنيف</th>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>السعر</th>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>المخزون</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${c}12` }}>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 700, color: '#1e293b' }}>{p.name}</td>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 600, color: '#64748b' }}>{p.category}</td>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 800, color: c }}>{formatCurrency(p.price)}</td>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 700, color: p.stock < 150 ? '#d97706' : '#15803d' }}>{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* التصنيع */}
      {activeTab === 'production' && (
        <div style={{ borderRadius: '1rem', background: '#fff', border: `2px solid ${c}22`, borderTop: `4px solid ${c}`, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', background: `${c}08`, fontWeight: 800, fontSize: '1.2rem', color: c, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Factory size={22} /> التصنيع ({recentProduction.length})
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: `${c}0a` }}>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>رقم الدفعة</th>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>المنتج</th>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>الكمية</th>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>التقدم</th>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {recentProduction.map((b, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${c}12` }}>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 800, fontSize: '0.85rem', color: c, fontFamily: 'monospace' }}>{b.batch}</td>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 700, color: '#1e293b' }}>{b.product}</td>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 600, color: '#64748b' }}>{b.qty}</td>
                  <td style={{ padding: '0.85rem 1.5rem' }}>
                    <div style={{ width: '120px' }}>
                      <div style={{ height: '0.6rem', borderRadius: '999px', background: `${c}18`, overflow: 'hidden' }}>
                        <div style={{ width: `${b.progress}%`, height: '100%', borderRadius: '999px', background: `linear-gradient(90deg, ${c}, ${cl})` }} />
                      </div>
                      <span style={{ fontWeight: 800, fontSize: '0.8rem', color: c, display: 'block', textAlign: 'center', marginTop: '0.2rem' }}>{b.progress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 1.5rem' }}>
                    <span style={{
                      fontWeight: 800, fontSize: '0.8rem', padding: '0.25rem 0.75rem', borderRadius: '999px',
                      background: b.status === 'مكتمل' ? '#f0fdf4' : b.status === 'جاري' ? '#eff6ff' : '#fff7ed',
                      color: b.status === 'مكتمل' ? '#15803d' : b.status === 'جاري' ? '#2563eb' : '#c2410c',
                      border: `1.5px solid ${b.status === 'مكتمل' ? '#4ade80' : b.status === 'جاري' ? '#60a5fa' : '#fb923c'}`,
                    }}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* الموردين */}
      {activeTab === 'suppliers' && (
        <div style={{ borderRadius: '1rem', background: '#fff', border: `2px solid ${c}22`, borderTop: `4px solid ${c}`, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', background: `${c}08`, fontWeight: 800, fontSize: '1.2rem', color: c, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Truck size={22} /> الموردين ({suppliers.length})
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: `${c}0a` }}>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>المورد</th>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>المادة الموردة</th>
                <th style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: c }}>الهاتف</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${c}12` }}>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 700, color: '#1e293b' }}>{s.name}</td>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 600, color: c }}>{s.material}</td>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 600, color: '#64748b', direction: 'ltr', textAlign: 'right' }}>{s.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
