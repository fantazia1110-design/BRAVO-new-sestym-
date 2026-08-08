'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  FlaskConical, Package, Beaker, Factory, Truck, ShoppingCart,
  FileText, TrendingUp, AlertTriangle, ChevronLeft, Plus, ArrowDownRight,
  Users, Warehouse, BarChart3, Settings, CreditCard, Calendar, DollarSign,
  Search, Phone, Mail, Star, PackageCheck,
  Clock, CheckCircle, XCircle, Bell, Shield, Palette, Save,
  LayoutDashboard, Sparkles, Receipt, GraduationCap, BookOpen, FlaskConical as FlaskIcon,
  PlayCircle, Award, Timer, Layers, Droplets, Lightbulb, Target, Calculator
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';
import StatCard from '@/components/ui/StatCard';

function QuickActionLink({ action, index }: { action: { label: string; href: string; icon: React.ReactNode; color: string; colorLight: string }; index: number; sectionColor: string; }) {
  const [hov, setHov] = useState(false);
  const router = useRouter();
  return (
    <div className="group relative flex items-center gap-4 p-5 rounded-2xl overflow-hidden animate-slide-up"
      style={{ animationDelay: `${0.6 + index * 0.1}s`, animationFillMode: 'both' as const, background: hov ? `linear-gradient(145deg, ${action.colorLight}, ${action.color})` : '#ffffff', transition: 'transform 0.35s ease, box-shadow 0.35s ease, border 0.35s ease, background 0.35s ease', transform: hov ? 'translateY(-6px)' : 'translateY(0)', boxShadow: hov ? '0 0 18px rgba(255,255,255,0.12), 0 14px 28px -6px rgba(0,0,0,0.3)' : '0 4px 14px -4px rgba(0,0,0,0.15)', border: hov ? '1.5px solid rgba(255,255,255,0.3)' : '2px solid rgba(0,0,0,0.06)', cursor: 'pointer', color: hov ? '#ffffff' : '#1f2937', borderTop: hov ? 'none' : `3px solid ${action.color}`, } as React.CSSProperties}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => router.push(action.href)}>
      {hov && (<div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.18) 38%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.18) 62%, transparent 75%)', animation: 'shineSweep 0.75s ease-out forwards', pointerEvents: 'none', zIndex: 1, }} />)}
      <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300" style={{ background: hov ? 'rgba(255,255,255,0.2)' : `linear-gradient(145deg, ${action.colorLight}, ${action.color})`, border: hov ? '1.5px solid rgba(255,255,255,0.2)' : 'none', position: 'relative', zIndex: 2, flexShrink: 0, transform: hov ? 'scale(1.1) rotate(6deg)' : 'scale(1) rotate(0deg)', filter: hov ? 'drop-shadow(0 6px 12px rgba(0,0,0,0.3))' : 'none', color: '#ffffff', }}>{action.icon}</div>
      <span style={{ fontWeight: 700, fontSize: '1.125rem', color: hov ? '#ffffff' : '#1f2937', textShadow: hov ? '0 1px 3px rgba(0,0,0,0.2)' : 'none', position: 'relative', zIndex: 2 }}>{action.label}</span>
    </div>
  );
}
function StatusBadge({ status }: { status: string }) {
  const s = status;
  const approved = ['معتمدة','مكتمل','paid','متوفر','تم الدفع','نشط','متاح','مدفوع','تم التحصيل','منتهي','متقدم','جيد'].includes(s);
  const testing = ['تحت الاختبار','جاري','in_progress','partially_paid','confirmed','مدفوع جزئياً','مؤكد','قيد الانتظار','قيد المعالجة','متوسط','قيد التجربة','مستحق'].includes(s);
  const draft = ['مسودة','مخطط','draft','غير نشط','متأخر','منخفض','ملغي','ضعيف'].includes(s);
  return (<span style={{ fontWeight: 900, fontSize: '0.82rem', padding: '0.35rem 0.9rem', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', background: approved ? '#f0fdf4' : testing ? '#eff6ff' : draft ? '#f1f5f9' : '#fff7ed', color: approved ? '#15803d' : testing ? '#2563eb' : draft ? '#475569' : '#c2410c', border: `2px solid ${approved ? '#4ade80' : testing ? '#60a5fa' : draft ? '#94a3b8' : '#fb923c'}`, }}>{s}</span>);
}
function SectionLink({ label, color, onClick }: { label: string; color: string; onClick: () => void }) {
  const [hov,setHov]=useState(false);
  const isRed = color === '#dc2626' || label.includes('المخزون');
  return (
    <div 
      onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        color: hov ? '#fff' : color,
        cursor: 'pointer',
        padding: '0.5rem 1.1rem',
        borderRadius: '0.75rem',
        fontWeight: 800,
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
        background: hov ? (isRed ? '#dc2626' : color) : (isRed ? 'rgba(255,255,255,0.95)' : `${color}10`),
        border: `1.5px solid ${isRed ? (hov ? '#dc2626' : '#fecaca') : (hov ? color : `${color}25`)}`,
        boxShadow: hov ? `0 6px 20px -4px ${color}55` : isRed ? '0 2px 8px -2px rgba(220,38,38,0.15)' : `0 2px 8px -2px ${color}20`,
        transform: hov ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
      }}
    >
      {label}
      <ChevronLeft size={16} style={{ transition: 'transform 0.25s', transform: hov ? 'translateX(-3px)' : 'translateX(0)' }} />
    </div>
  );
}
function AddButton({ label, color, colorLight }: { label: string; color: string; colorLight: string; }) { const [hov,setHov]=useState(false); return (<div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{ padding: '0.5rem 1.2rem', borderRadius: '0.85rem', background: hov ? `linear-gradient(135deg, ${colorLight}, ${color})` : color, color: '#fff', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: hov ? `0 6px 20px -4px ${color}55` : `0 4px 14px -2px ${color}33`, transform: hov ? 'translateY(-2px) scale(1.05)' : 'translateY(0)', }}>{<Plus size={16} />}{label}</div>); }
function ListItem({ name, subtitle, badge, emoji, color, value }: { name: string; subtitle?: string; badge?: string; emoji?: string; color: string; value?: string; }) {
  const [hov,setHov]=useState(false);
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '1rem 1.25rem',
        borderBottom: `1px solid ${color}15`,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        background: hov ? `linear-gradient(to left, ${color}0a, transparent)` : 'transparent',
        transform: hov ? 'translateX(8px)' : 'translateX(0)',
        boxShadow: hov ? `-4px 0 0 0 ${color}, 0 4px 12px -2px ${color}20` : 'none',
        borderRadius: hov ? '0.75rem 0 0 0.75rem' : '0',
      }}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
    >
      {emoji && (
        <div style={{
          width: '3.5rem', height: '3.5rem', borderRadius: '0.85rem',
          background: hov ? `linear-gradient(135deg, ${color}, ${color}dd)` : `linear-gradient(135deg, ${color}15, ${color}08)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.75rem', flexShrink: 0,
          transition: 'all 0.35s cubic-bezier(0.34,1.56,.64,1)',
          transform: hov ? 'scale(1.15) rotate(8deg)' : 'scale(1) rotate(0deg)',
          boxShadow: hov ? `0 6px 18px -4px ${color}55` : 'none',
          color: hov ? '#fff' : undefined,
        }}>
          {emoji}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: hov ? color : color, margin: 0, transition: 'color 0.25s', transform: hov ? 'translateY(-1px)' : 'translateY(0)' }} className="truncate">{name}</h4>
        {subtitle && <p style={{ fontWeight: 700, fontSize: '0.8rem', color: hov ? '#475569' : '#64748b', margin: 0, transition: 'color 0.25s' }}>{subtitle}</p>}
      </div>
      {value && <span style={{ fontWeight: 800, fontSize: '0.95rem', color, background: hov ? `${color}15` : 'transparent', padding: hov ? '0.25rem 0.6rem' : '0', borderRadius: '0.5rem', transition: 'all 0.25s' }}>{value}</span>}
      {badge && <StatusBadge status={badge} />}
    </div>
  );
}
function TableRowWithHover({ children, color }: { children: React.ReactNode; color: string }) { const [hov,setHov]=useState(false); return (<tr onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{ borderBottom: `1px solid ${color}12`, background: hov ? `${color}0a` : 'transparent', cursor: 'pointer' }}>{children}</tr>); }
function ProgressBar({ progress, color, colorLight }: { progress: number; color: string; colorLight: string }) { return (<div style={{ width: '100%', maxWidth: '140px' }}><div style={{ background: `${color}15`, borderRadius: '999px', overflow: 'hidden', height: '0.75rem' }}><div style={{ width: `${progress}%`, height: '100%', borderRadius: '999px', background: `linear-gradient(90deg, ${color}, ${colorLight})` }} /></div><span style={{ color, fontWeight: 900, fontSize: '0.9rem', marginTop: '0.25rem', display: 'block', textAlign: 'center' }}>{progress}%</span></div>); }

interface SaleItem { id: string; invoiceNumber: string; customer: string; products: { name: string; quantity: number; price: number }[]; total: number; paid: number; status: string; date: string; }
interface InvoiceItem { id: string; number: string; customer: string; total: number; paid: number; remaining: number; status: string; date: string; dueDate?: string; }
interface CustomerItem { id: string; name: string; phone: string; email: string; totalOrders: number; totalSpent: number; lastOrderDate?: string; status: string; }
interface InventoryRow { id: string; code: string; name: string; type: string; current: number; reserved?: number; min: number; unit: string; unitPrice: number; totalValue: number; status: string; }
interface DebtItem { id: string; type: 'customer' | 'supplier' | string; name: string; amount: number; dueDate: string; status: string; phone?: string; }
interface ExpenseItem { id: string; category: string; description: string; amount: number; date: string; method: string; status: string; }
interface LabItem { id: string; name: string; category: string; status: string; progress: number; ingredients: number; result?: string; date: string; }
interface AcademyCourse { id: string; title: string; instructor: string; duration: string; level: string; progress: number; enrolled: number; status: string; }
interface BookItem { id: string; title: string; author: string; category: string; pages: number; rating: number; status: string; }

interface SectionPageProps {
  section: { id: string; name: string; description: string; image: string; color: string; colorLight: string; icon: React.ReactNode; };
  rawMaterials: { name: string; stock: number; unit: string; min: number; status: string }[];
  formulas: { name: string; status: string; ingredients: number; category: string }[];
  products: { name: string; price: number; stock: number; category: string }[];
  suppliers: { name: string; material: string; phone: string }[];
  recentProduction: { batch: string; product: string; qty: string; status: string; progress: number }[];
  sales?: SaleItem[]; invoices?: InvoiceItem[]; customers?: CustomerItem[]; inventory?: InventoryRow[];
  debts?: DebtItem[]; expenses?: ExpenseItem[]; labExperiments?: LabItem[]; academyCourses?: AcademyCourse[]; books?: BookItem[];
  formulaEmojis?: Record<string, string>;
}

export default function SectionPage({ section, rawMaterials, formulas, products, suppliers, recentProduction, sales = [], invoices = [], customers = [], inventory = [], debts = [], expenses = [], labExperiments = [], academyCourses = [], books = [], formulaEmojis = {} }: SectionPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeTab = searchParams.get('tab') || 'overview';
  const c = section.color; const cl = section.colorLight;

  const quickActions = [
    { label: 'إضافة مادة خام', href: `?tab=raw`, icon: <FlaskConical size={24} />, color: c, colorLight: cl },
    { label: 'تركيبة جديدة', href: `?tab=formula-lab`, icon: <Beaker size={24} />, color: '#7c3aed', colorLight: '#a78bfa' },
    { label: 'بدء تصنيع', href: `?tab=production`, icon: <Factory size={24} />, color: '#0891b2', colorLight: '#22d3ee' },
    { label: 'فاتورة جديدة', href: `?tab=invoices`, icon: <FileText size={24} />, color: '#ea580c', colorLight: '#f97316' },
  ];
  const statsData = [
    { title: 'المنتجات', value: formatNumber(products.length, 0), subtitle: 'منتج نهائي', icon: <Package size={20} />, color: c, colorLight: cl },
    { title: 'التركيبات', value: formatNumber(formulas.length, 0), subtitle: 'تركيبة', icon: <Beaker size={20} />, color: '#7c3aed', colorLight: '#a78bfa' },
    { title: 'المواد الخام', value: formatNumber(rawMaterials.length, 0), subtitle: 'مادة', icon: <FlaskConical size={20} />, color: '#0891b2', colorLight: '#22d3ee' },
    { title: 'الموردين', value: formatNumber(suppliers.length, 0), subtitle: 'مورد', icon: <Truck size={20} />, color: '#d97706', colorLight: '#fbbf24' },
  ];
  const salesStats = { todaySales: sales.reduce((s, x) => s + (x.total || 0), 0) || 15600, weekSales: 85000, monthSales: 485000, todayOrders: sales.length || 12, avgOrderValue: sales.length ? Math.round(sales.reduce((s,x)=>s+x.total,0)/sales.length) : 1300, };
  const topProducts = products.slice(0, 4).map((p, i) => ({ name: p.name, quantity: 150 - i*20, emoji: ['🧴','🍋','🧼','🌿','💜','🌸','✨','💄'][i] || '📦' }));
  const inventoryData: InventoryRow[] = inventory.length ? inventory : [...rawMaterials.map((r,i) => ({ id: `rm-${i}`, code: `RM-${String(i+1).padStart(3,'0')}`, name: r.name, type: 'raw' as const, current: r.stock, reserved: Math.floor(r.stock*0.2), min: r.min, unit: r.unit, unitPrice: 50 + i*12, totalValue: r.stock * (50 + i*12), status: r.status })), ...products.map((p,i) => ({ id: `pr-${i}`, code: `PR-${String(i+1).padStart(3,'0')}`, name: p.name, type: 'product' as const, current: p.stock, reserved: Math.floor(p.stock*0.15), min: 100, unit: 'قطعة', unitPrice: p.price, totalValue: p.stock * p.price, status: p.stock < 150 ? 'منخفض' : 'متوفر' })),];
  const lowStockCount = inventoryData.filter(x => x.current <= x.min).length;
  const inventoryValue = inventoryData.reduce((s,x)=>s+x.totalValue,0);
  const rawValue = inventoryData.filter(x=>x.type==='raw').reduce((s,x)=>s+x.totalValue,0);
  const prodValue = inventoryData.filter(x=>x.type==='product').reduce((s,x)=>s+x.totalValue,0);
  const invoicesData = invoices.length ? invoices : (sales.length ? sales.map(s => ({ id: s.id, number: s.invoiceNumber, customer: s.customer, total: s.total, paid: s.paid, remaining: s.total - s.paid, status: s.status, date: s.date, dueDate: s.date })) : []);
  const customersData = customers.length ? customers : [];
  const debtsData: DebtItem[] = debts.length ? debts : [
    { id: '1', type: 'customer', name: 'شركة الأمل للتجارة', amount: 12500, dueDate: '2026-01-20', status: 'مستحق', phone: '01012345678' },
    { id: '2', type: 'customer', name: 'مؤسسة النور', amount: 8700, dueDate: '2026-01-18', status: 'متأخر', phone: '01198765432' },
    { id: '3', type: 'supplier', name: 'شركة كيماويات النيل', amount: 15000, dueDate: '2026-01-25', status: 'مستحق', phone: '01011112222' },
  ];
  const expensesData: ExpenseItem[] = expenses.length ? expenses : [
    { id: '1', category: 'مواد خام', description: 'شراء تكسابون', amount: 4500, date: '2026-01-15', method: 'تحويل بنكي', status: 'مدفوع' },
    { id: '2', category: 'شحن', description: 'شحن مواد من الإسكندرية', amount: 800, date: '2026-01-14', method: 'نقدي', status: 'مدفوع' },
    { id: '3', category: 'عمالة', description: 'مصاريف إنتاج', amount: 3200, date: '2026-01-13', method: 'تحويل بنكي', status: 'مدفوع' },
  ];
  const labData: LabItem[] = labExperiments.length ? labExperiments : formulas.slice(0,4).map((f,i)=>({ id: String(i+1), name: f.name, category: f.category, status: i===0?'مكتمل':i===1?'قيد التجربة':'مخطط', progress: i===0?100:i===1?65:20, ingredients: f.ingredients, result: i===0?'ناجح':i===1?'قيد الاختبار':'-', date: '2026-01-15' }));
  const academyData: AcademyCourse[] = academyCourses.length ? academyCourses : [
    { id: '1', title: `أساسيات ${section.name}`, instructor: 'د. أحمد الكيميائي', duration: '2:30:00', level: 'مبتدئ', progress: 75, enrolled: 156, status: 'قيد التقدم' },
    { id: '2', title: `تركيبات ${section.name} المتقدمة`, instructor: 'م. سارة', duration: '4:15:00', level: 'متقدم', progress: 40, enrolled: 89, status: 'قيد التقدم' },
    { id: '3', title: `السلامة في ${section.name}`, instructor: 'د. محمد', duration: '1:45:00', level: 'مبتدئ', progress: 100, enrolled: 203, status: 'مكتمل' },
  ];
  const booksData: BookItem[] = books.length ? books : [
    { id: '1', title: `دليل ${section.name} الشامل`, author: 'د. أحمد', category: section.name, pages: 250, rating: 4.8, status: 'متاح' },
    { id: '2', title: `تركيبات ${section.name} العملية`, author: 'م. سارة', category: section.name, pages: 180, rating: 4.6, status: 'متاح' },
    { id: '3', title: `كيمياء ${section.name}`, author: 'د. محمد', category: 'كيمياء', pages: 320, rating: 4.9, status: 'متاح' },
  ];

  return (
    <div className="space-y-8" data-section={section.id}>
      <div className="animate-slide-up"><div className="flex items-center gap-5 mb-2"><div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl animate-float" style={{ background: `linear-gradient(135deg, ${cl}, ${c})`, boxShadow: `0 10px 26px -10px ${c}44` }}><span style={{ color: '#fff' }}>{section.icon}</span></div><div><h1 style={{ fontWeight: 900, fontSize: '2.2rem', color: c, margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>{section.name} <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.7rem', borderRadius: '999px', background: c, color: '#fff', fontWeight: 900 }}>v2.1 • 17 تاب • {section.id}</span></h1><p style={{ fontWeight: 600, fontSize: '1.1rem', color: '#64748b', margin: 0 }}>{section.description} - كل قسم بلونه {c}</p></div></div></div>
      {(activeTab === 'overview' || activeTab === 'dashboard') && (
        <>
          <div style={{ borderRadius: '1.5rem', overflow: 'hidden', position: 'relative', height: '280px', boxShadow: '0 4px 16px -4px rgba(0,0,0,0.1)', }}><img src={section.image} alt={section.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: `linear-gradient(to top, ${c}dd, ${c}66, transparent)` }} /><div style={{ position: 'absolute', bottom: '1.5rem', right: '2rem', zIndex: 2 }}><h2 style={{ fontWeight: 900, fontSize: '2.5rem', color: '#fff', margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>{section.name}</h2><p style={{ fontWeight: 600, fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', margin: '0.3rem 0 0 0' }}>{section.description}</p></div></div>

          {/* الإحصائيات - تظهر فقط في لوحة التحكم */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '0.5rem', padding: '1.25rem', borderRadius: '1.2rem', border: '2px solid #e2e8f0', background: 'rgba(255,255,255,0.7)' }}>{statsData.map((s, i) => (<StatCard key={i} title={s.title} value={s.value} subtitle={s.subtitle} icon={s.icon} delay={i+1} color={s.color} colorLight={s.colorLight} />))}</div>

<div className="card animate-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'both', border: '2px solid #e2e8f0', background: 'rgba(255,255,255,0.7)' }}><div className="card-header"><h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: c }}><span className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}><ShoppingCart size={24} /></span>إجراءات سريعة</h2></div><div className="card-body"><div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1.25rem' }}>{quickActions.map((action, index) => (<QuickActionLink key={action.label} action={action} index={index} sectionColor={c} />))}</div></div></div>
          <div className="two-col-layout">
            <div className="card list-card animate-slide-up" style={{ animationDelay: '0.7s', border: `2px solid #7c3aed30`, borderTop: `4px solid #7c3aed` }}><div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, #7c3aed08, rgba(248,250,252,0.9))` }}><h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#7c3aed' }}><span className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, #a78bfa, #7c3aed)` }}><Beaker size={24} /></span>آخر التركيبات - {section.name}</h2><SectionLink label="عرض الكل" color="#7c3aed" onClick={() => router.push(`${pathname}?tab=formulas`)} /></div><div className="card-body p-0">{formulas.slice(0, 4).map((f, i) => (<ListItem key={i} name={f.name} subtitle={`${f.category} • ${f.ingredients} مكون`} badge={f.status} emoji={formulaEmojis[f.name] || '🧪'} color="#7c3aed" />))}</div></div>
            <div className="card list-card animate-slide-up" style={{ animationDelay: '0.8s', border: `2px solid #3b82f630`, borderTop: `4px solid #3b82f6` }}><div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, #3b82f608, rgba(248,250,252,0.9))` }}><h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#3b82f6' }}><span className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, #60a5fa, #3b82f6)` }}><Package size={24} /></span>آخر المنتجات - {section.name}</h2><SectionLink label="عرض الكل" color="#3b82f6" onClick={() => router.push(`${pathname}?tab=products`)} /></div><div className="card-body p-0">{products.slice(0, 4).map((p, i) => (<ListItem key={i} name={p.name} subtitle={`${p.category} • مخزون: ${p.stock}`} value={formatCurrency(p.price)} emoji="📦" color="#3b82f6" />))}</div></div>
          </div>

          <div className="two-col-layout">
            <div className="card list-card animate-slide-up" style={{ animationDelay: '0.85s', border: `2px solid #10b98130`, borderTop: `4px solid #10b981` }}>
              <div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, #10b98108, rgba(248,250,252,0.9))` }}>
                <h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#10b981' }}>
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, #34d399, #10b981)` }}>
                    <TrendingUp size={24} />
                  </span>
                  الأكثر مبيعا - {section.name}
                </h2>
                <SectionLink label="عرض الكل" color="#10b981" onClick={() => router.push(`${pathname}?tab=sales`)} />
              </div>
              <div className="card-body p-0">
                {topProducts.slice(0,4).map((p,i)=>(
                  <ListItem key={i} name={p.name} subtitle={`${p.quantity} وحدة مباعة`} value={formatCurrency(p.quantity * 25)} emoji={p.emoji} color="#10b981" />
                ))}
              </div>
            </div>

            <div className="card list-card animate-slide-up" style={{ animationDelay: '0.9s', border: `2px solid #0891b230`, borderTop: `4px solid #0891b2` }}>
              <div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, #0891b208, rgba(248,250,252,0.9))` }}>
                <h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#0891b2' }}>
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, #22d3ee, #0891b2)` }}>
                    <Factory size={24} />
                  </span>
                  التصنيع الجاري - {section.name}
                </h2>
                <SectionLink label="عرض الكل" color="#0891b2" onClick={() => router.push(`${pathname}?tab=production`)} />
              </div>
              <div className="card-body p-0">
                {recentProduction.slice(0,4).map((b,i)=>(
                  <ListItem key={i} name={b.product} subtitle={`${b.qty} • ${b.progress}%`} badge={b.status} emoji={b.batch.split('-').pop() || '🏭'} color="#0891b2" />
                ))}
              </div>
            </div>
          </div>
          {rawMaterials.filter(r => r.status === 'منخفض').length > 0 && (
            <div className="card animate-slide-up section-color-red" style={{ animationDelay: '1.1s', animationFillMode: 'both', border: '2px solid rgba(220,38,38,0.3)', borderTop: '4px solid #dc2626' }}>
              <div className="card-header flex items-center justify-between" style={{ background: 'linear-gradient(to bottom, rgba(220,38,38,0.08), rgba(248,250,252,0.9))' }}>
                <h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#dc2626' }}>
                  <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow-lg animate-pulse">
                    <AlertTriangle size={24} />
                  </span>
                  ⚠️ تنبيه: مخزون منخفض
                </h2>
                <SectionLink label="إدارة المخزون" color="#dc2626" onClick={() => router.push(`${pathname}?tab=inventory`)} />
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

      {activeTab === 'raw' && (
        <div className="space-y-6">
          <div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}>
            <div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, ${c}08, rgba(248,250,252,0.9))` }}>
              <h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: c }}>
                <span className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}>
                  <FlaskConical size={24} />
                </span>
                المواد الخام ({rawMaterials.length}) - {section.name}
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', border: `1.5px solid ${c}25`, background: '#fff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>📥 استيراد</div>
                <div style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', border: `1.5px solid ${c}25`, background: '#fff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>📤 تصدير</div>
                <AddButton label="إضافة مادة" color={c} colorLight={cl} />
              </div>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input placeholder="🔍 ابحث بالاسم، الكود، الاسم العلمي..." style={{ width: '100%', padding: '0.75rem 2.5rem 0.75rem 1rem', borderRadius: '0.85rem', border: `1.5px solid ${c}20`, fontWeight: 600, outline: 'none' }} />
                </div>
                <div style={{ padding: '0.75rem 1.2rem', borderRadius: '0.85rem', border: `1.5px solid ${c}20`, background: '#fff', fontWeight: 700, cursor: 'pointer' }}>🔧 فلترة</div>
              </div>
            </div>
            <div className="card-body p-0">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ color: c, fontWeight: 900 }}>الكود</th>
                    <th style={{ color: c, fontWeight: 900 }}>اسم المادة</th>
                    <th style={{ color: c, fontWeight: 900 }}>التصنيف</th>
                    <th style={{ color: c, fontWeight: 900 }}>السعر</th>
                    <th style={{ color: c, fontWeight: 900 }}>الكمية</th>
                    <th style={{ color: c, fontWeight: 900 }}>الحالة</th>
                    <th style={{ color: c, fontWeight: 900 }}>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {rawMaterials.map((r, i) => (
                    <TableRowWithHover key={i} color={c}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.85rem', color: c }}>RM-{String(i+1).padStart(3,'0')}</td>
                      <td>
                        <div>
                          <p style={{ fontWeight: 800, color: '#1e293b', margin: 0 }}>{r.name}</p>
                          <p style={{ fontWeight: 600, fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>{r.unit} • علمي</p>
                        </div>
                      </td>
                      <td><span style={{ padding: '0.25rem 0.6rem', borderRadius: '0.5rem', background: `${c}12`, color: c, fontWeight: 700, fontSize: '0.75rem' }}>{section.name}</span></td>
                      <td style={{ fontWeight: 700 }}>{formatCurrency(50 + i*10)}/{r.unit}</td>
                      <td>
                        <div>
                          <p style={{ fontWeight: 800 }}>{r.stock} {r.unit}</p>
                          <p style={{ fontWeight: 600, fontSize: '0.7rem', color: '#64748b' }}>محجوز: {Math.floor(r.stock*0.2)} | متاح: {Math.floor(r.stock*0.8)}</p>
                        </div>
                      </td>
                      <td><StatusBadge status={r.status} /></td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          <span style={{ width: '28px', height: '28px', borderRadius: '0.5rem', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>👁️</span>
                          <span style={{ width: '28px', height: '28px', borderRadius: '0.5rem', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>✏️</span>
                          <span style={{ width: '28px', height: '28px', borderRadius: '0.5rem', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>🗑️</span>
                        </div>
                      </td>
                    </TableRowWithHover>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'suppliers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="stat-card" style={{ borderTop: `3px solid ${c}` }}><div className="flex items-center justify-between"><div><p style={{ fontWeight: 800, color: c, fontSize: '0.85rem' }}>إجمالي الموردين</p><p className="stat-value">{suppliers.length}</p></div><div className="stat-icon" style={{ background: `${c}15`, color: c }}><Truck size={20} /></div></div></div>
            <div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">إجمالي المشتريات</p><p className="stat-value">{formatCurrency(suppliers.length * 120000)}</p></div><div className="stat-icon bg-blue-100 text-blue-600"><Package size={20} /></div></div></div>
            <div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">المستحقات</p><p className="stat-value text-red-600">{formatCurrency(48000)}</p></div><div className="stat-icon bg-red-100 text-red-600"><CreditCard size={20} /></div></div></div>
            <div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">المواد</p><p className="stat-value">{suppliers.length * 8}</p></div><div className="stat-icon bg-purple-100 text-purple-600"><FlaskConical size={20} /></div></div></div>
          </div>
          <div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}>
            <div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, ${c}08, rgba(248,250,252,0.9))` }}>
              <h2 style={{ fontWeight: 900, fontSize: '1.35rem', color: c, display: 'flex', alignItems: 'center', gap: '0.75rem' }}><span className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}><Truck size={20} /></span>الموردون - {section.name}</h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input placeholder="ابحث عن مورد..." style={{ padding: '0.6rem 2rem 0.6rem 0.8rem', borderRadius: '0.75rem', border: `1.5px solid ${c}20`, fontWeight: 600, outline: 'none' }} />
                </div>
                <AddButton label="إضافة مورد" color={c} colorLight={cl} />
              </div>
            </div>
            <div className="card-body"><div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>{suppliers.map((s,i)=>(<div key={i} className="card hover:shadow-xl transition-all" style={{ border: `1.5px solid ${c}15`, background: '#fff' }}><div className="card-body"><div style={{ display: 'flex', gap: '1rem' }}><div style={{ width: '4rem', height: '4rem', borderRadius: '1rem', background: `linear-gradient(135deg, ${c}15, ${cl}15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>🏭</div><div style={{ flex: 1 }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><h3 style={{ fontWeight: 900, color: '#1e293b', margin: 0 }}>{s.name}</h3><span style={{ padding: '0.2rem 0.6rem', background: `${c}12`, color: c, borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.7rem' }}>{s.material}</span></div><p style={{ fontWeight: 600, fontSize: '0.8rem', color: '#64748b', margin: '0 0 0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Phone size={12} /> {s.phone} • {section.name}</p><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', fontSize: '0.8rem' }}><div><p style={{ color: '#94a3b8', fontWeight: 600, margin: 0 }}>المواد</p><p style={{ fontWeight: 800, margin: 0 }}>{8 + i*2}</p></div><div><p style={{ color: '#94a3b8', fontWeight: 600, margin: 0 }}>المشتريات</p><p style={{ fontWeight: 800, margin: 0 }}>{formatCurrency(50000 + i*15000)}</p></div><div><p style={{ color: '#94a3b8', fontWeight: 600, margin: 0 }}>المستحق</p><p style={{ fontWeight: 800, color: i%2?'#dc2626':'#16a34a', margin: 0 }}>{formatCurrency(i%2?8000:0)}</p></div></div><div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: `1px solid ${c}10` }}><div style={{ flex: 1, padding: '0.5rem', borderRadius: '0.6rem', border: `1.5px solid ${c}20`, textAlign: 'center', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>👁️ عرض التفاصيل</div><div style={{ flex: 1, padding: '0.5rem', borderRadius: '0.6rem', background: c, color: '#fff', textAlign: 'center', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>📦 المواد الخام</div></div></div></div></div></div>))}</div></div>
          </div>
        </div>
      )}
      {activeTab === 'formulas' && (
        <div className="space-y-6">
          <div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}>
            <div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, ${c}08, rgba(248,250,252,0.9))` }}>
              <h2 style={{ fontWeight: 900, fontSize: '1.35rem', color: c, display: 'flex', alignItems: 'center', gap: '0.75rem' }}><span className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}><Beaker size={20} /></span>التركيبات ({formulas.length}) - {section.name}</h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input placeholder="ابحث في التركيبات..." style={{ padding: '0.6rem 2rem 0.6rem 0.8rem', borderRadius: '0.75rem', border: `1.5px solid ${c}20`, fontWeight: 600, outline: 'none' }} />
                </div>
                <AddButton label="تركيبة جديدة" color={c} colorLight={cl} />
              </div>
            </div>
            <div className="card-body"><div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>{['الكل','معتمدة','تحت الاختبار','مسودة'].map((cat,i)=>(<span key={i} style={{ padding: '0.4rem 0.9rem', borderRadius: '999px', fontWeight: 800, fontSize: '0.8rem', background: i===0?c:'#f1f5f9', color: i===0?'#fff':'#475569', cursor: 'pointer', border: `1.5px solid ${i===0?c:'#e2e8f0'}` }}>{cat}</span>))}</div></div>
            <div className="card-body p-0">{formulas.map((f, i) => (<ListItem key={i} name={f.name} subtitle={`${f.category} • ${f.ingredients} مكون • ${section.name}`} badge={f.status} emoji={formulaEmojis[f.name] || '🧪'} color={c} />))}</div>
            <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.25rem', background: '#f8fafc', borderTop: `1px solid ${c}10` }}><span style={{ fontWeight: 700, color: '#64748b', fontSize: '0.85rem' }}>إجمالي {formulas.length} تركيبة في {section.name}</span><div style={{ display: 'flex', gap: '0.5rem' }}><span style={{ padding: '0.3rem 0.7rem', background: '#f0fdf4', color: '#16a34a', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.75rem' }}>✓ {formulas.filter(f=>f.status==='معتمدة').length} معتمدة</span><span style={{ padding: '0.3rem 0.7rem', background: '#eff6ff', color: '#2563eb', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.75rem' }}>🧪 {formulas.filter(f=>f.status==='تحت الاختبار').length} اختبار</span></div></div>
          </div>
        </div>
      )}
      {activeTab === 'formula-lab' && (
        <div className="space-y-6">
          <div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}>
            <div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, ${c}08, rgba(248,250,252,0.9))` }}>
              <div>
                <h2 style={{ fontWeight: 900, fontSize: '1.5rem', color: c, display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}>
                    <Sparkles size={24} />
                  </span>
                  معمل التركيبات - {section.name}
                </h2>
                <p style={{ fontWeight: 600, color: '#64748b', margin: '0.5rem 0 0 0', fontSize: '0.95rem' }}>إنشاء وحساب تكاليف التركيبات - {section.name}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ padding: '0.6rem 1rem', borderRadius: '0.75rem', border: `1.5px solid ${c}20`, background: '#fff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>📋 نسخ التركيبة</div>
                <div style={{ padding: '0.6rem 1rem', borderRadius: '0.75rem', border: `1.5px solid ${c}20`, background: '#fff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>📄 تصدير PDF</div>
                <AddButton label="حفظ التركيبة" color={c} colorLight={cl} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="card" style={{ border: `2px solid ${c}20`, borderTop: `3px solid ${c}`, gridColumn: 'span 2' }}>
              <div className="card-header" style={{ background: `${c}08` }}><h3 style={{ fontWeight: 900, color: c, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Beaker size={18} /> معلومات التركيبة</h3></div>
              <div className="card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#475569', display: 'block', marginBottom: '0.4rem' }}>اسم التركيبة</label><input placeholder={`مثال: ${formulas[0]?.name || 'تركيبة جديدة'}`} defaultValue={formulas[0]?.name} style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '0.75rem', border: `1.5px solid ${c}20`, fontWeight: 700, outline: 'none' }} /></div>
                <div><label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#475569', display: 'block', marginBottom: '0.4rem' }}>التصنيف - {section.name}</label><select style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '0.75rem', border: `1.5px solid ${c}20`, fontWeight: 700 }}><option>{formulas[0]?.category || section.name}</option><option>{section.name} - مبتكر</option></select></div>
                <div><label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#475569', display: 'block', marginBottom: '0.4rem' }}>حجم الدفعة</label><div style={{ display: 'flex', gap: '0.5rem' }}><input type="number" defaultValue={100} style={{ flex: 1, padding: '0.7rem 1rem', borderRadius: '0.75rem', border: `1.5px solid ${c}20`, fontWeight: 700 }} /><select style={{ padding: '0.7rem', borderRadius: '0.75rem', border: `1.5px solid ${c}20`, fontWeight: 700 }}><option>كجم</option><option>لتر</option><option>جم</option></select></div></div>
                <div><label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#475569', display: 'block', marginBottom: '0.4rem' }}>تاريخ الإنشاء</label><input type="date" defaultValue="2026-01-15" style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '0.75rem', border: `1.5px solid ${c}20`, fontWeight: 700 }} /></div>
              </div>
            </div>
            <div className="card" style={{ border: `2px solid ${c}20`, borderTop: `3px solid ${c}` }}>
              <div className="card-header" style={{ background: `${c}08` }}><h3 style={{ fontWeight: 900, color: c, margin: 0 }}>ملخص سريع</h3></div>
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: `${c}08`, borderRadius: '0.75rem' }}><span style={{ fontWeight: 700, color: '#475569', fontSize: '0.85rem' }}>التجارب النشطة</span><span style={{ fontWeight: 900, color: c }}>{labData.filter(x=>x.status==='قيد التجربة').length}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f0fdf4', borderRadius: '0.75rem' }}><span style={{ fontWeight: 700, color: '#14532d', fontSize: '0.85rem' }}>مكتملة</span><span style={{ fontWeight: 900, color: '#16a34a' }}>{labData.filter(x=>x.status==='مكتمل').length}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#fef3c7', borderRadius: '0.75rem' }}><span style={{ fontWeight: 700, color: '#92400e', fontSize: '0.85rem' }}>مخطط</span><span style={{ fontWeight: 900, color: '#d97706' }}>{labData.filter(x=>x.status==='مخطط').length}</span></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="card" style={{ border: `2px solid ${c}20`, borderTop: `3px solid ${c}`, gridColumn: 'span 2' }}>
              <div className="card-header flex items-center justify-between" style={{ background: `${c}08` }}><h3 style={{ fontWeight: 900, color: c, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Layers size={18} /> المكونات - {section.name}</h3><AddButton label="إضافة مكون" color={c} colorLight={cl} /></div>
              <div className="card-body p-0">
                <table className="table">
                  <thead><tr><th style={{ color: c }}>المادة</th><th style={{ color: c }}>النسبة %</th><th style={{ color: c }}>الكمية</th><th style={{ color: c }}>التكلفة</th><th style={{ color: c }}>إجراء</th></tr></thead>
                  <tbody>
                    {rawMaterials.slice(0,3).map((r,i)=>(
                      <tr key={i} style={{ borderBottom: `1px solid ${c}10` }}>
                        <td><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', background: `${c}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🧪</div><span style={{ fontWeight: 700 }}>{r.name}</span></div></td>
                        <td><input type="number" defaultValue={10 + i*5} style={{ width: '60px', padding: '0.4rem', borderRadius: '0.5rem', border: `1px solid ${c}20`, fontWeight: 700, textAlign: 'center' }} /> %</td>
                        <td style={{ fontWeight: 700 }}>{(10 + i*5)} {r.unit}</td>
                        <td style={{ fontWeight: 800, color: c }}>{formatCurrency((10 + i*5)*(5 + i))}</td>
                        <td><span style={{ cursor: 'pointer', color: '#dc2626', fontWeight: 700 }}>✕</span></td>
                      </tr>
                    ))}
                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: '1.5rem', color: '#94a3b8', fontWeight: 600 }}>لا توجد مكونات إضافية - ابدأ بإضافة المواد الخام للتركيبة</td></tr>
                  </tbody>
                </table>
                <div style={{ padding: '1rem', textAlign: 'center' }}><div style={{ display: 'inline-flex', padding: '0.6rem 1.2rem', borderRadius: '0.75rem', border: `1.5px dashed ${c}40`, color: c, fontWeight: 800, cursor: 'pointer', gap: '0.5rem', alignItems: 'center' }}><Plus size={16} /> إضافة مكون</div></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="card" style={{ border: `2px solid ${c}20`, borderTop: `3px solid ${c}` }}>
                <div className="card-header" style={{ background: `${c}08` }}><h3 style={{ fontWeight: 900, color: c, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calculator size={18} /> حساب التكلفة</h3></div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div><label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#475569' }}>تكلفة المواد الخام</label><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}><input defaultValue="0.00" style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '0.6rem', border: `1.5px solid ${c}15`, fontWeight: 700 }} /><span style={{ fontWeight: 700, color: '#64748b' }}>جنيه</span></div></div>
                  <div><label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#475569' }}>تكلفة التعبئة والتغليف</label><input type="number" defaultValue={0} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.6rem', border: `1.5px solid ${c}15`, fontWeight: 700, marginTop: '0.25rem' }} /></div>
                  <div><label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#475569' }}>تكلفة العمالة</label><input type="number" defaultValue={0} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.6rem', border: `1.5px solid ${c}15`, fontWeight: 700, marginTop: '0.25rem' }} /></div>
                  <div><label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#475569' }}>تكلفة الكهرباء</label><input type="number" defaultValue={0} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.6rem', border: `1.5px solid ${c}15`, fontWeight: 700, marginTop: '0.25rem' }} /></div>
                  <div><label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#475569' }}>المصروفات العامة</label><input type="number" defaultValue={0} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.6rem', border: `1.5px solid ${c}15`, fontWeight: 700, marginTop: '0.25rem' }} /></div>
                  <div><label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#475569' }}>نسبة الفاقد المتوقع %</label><div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}><input type="number" defaultValue={3} style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '0.6rem', border: `1.5px solid #fbbf24`, fontWeight: 700, background: '#fef3c7' }} /><span style={{ padding: '0.5rem 0.75rem', background: '#fef3c7', borderRadius: '0.6rem', fontWeight: 800, color: '#d97706' }}>3%</span></div></div>
                  <div style={{ padding: '0.75rem', background: '#fef3c7', borderRadius: '0.75rem', border: '1.5px solid #fde68a' }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontWeight: 700, color: '#92400e', fontSize: '0.85rem' }}>تكلفة الفاقد</span><span style={{ fontWeight: 900, color: '#d97706' }}>0.00 جنيه</span></div></div>
                </div>
              </div>

              <div className="card" style={{ border: `2px solid #10b98130`, borderTop: `3px solid #10b981` }}>
                <div className="card-header" style={{ background: '#f0fdf4' }}><h3 style={{ fontWeight: 900, color: '#059669', margin: 0 }}>ملخص التكلفة</h3></div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}><span style={{ fontWeight: 600, color: '#475569' }}>المواد الخام</span><span style={{ fontWeight: 800 }}>0.00 جنيه</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}><span style={{ fontWeight: 600, color: '#475569' }}>الفاقد (3%)</span><span style={{ fontWeight: 800 }}>0.00 جنيه</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}><span style={{ fontWeight: 600, color: '#475569' }}>التعبئة والتغليف</span><span style={{ fontWeight: 800 }}>0.00 جنيه</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}><span style={{ fontWeight: 600, color: '#475569' }}>العمالة</span><span style={{ fontWeight: 800 }}>0.00 جنيه</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}><span style={{ fontWeight: 600, color: '#475569' }}>الكهرباء</span><span style={{ fontWeight: 800 }}>0.00 جنيه</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}><span style={{ fontWeight: 600, color: '#475569' }}>المصروفات العامة</span><span style={{ fontWeight: 800 }}>0.00 جنيه</span></div>
                  <div style={{ height: '1px', background: '#e2e8f0', margin: '0.5rem 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontWeight: 900, color: '#1e293b' }}>إجمالي التكلفة</span><span style={{ fontWeight: 900, color: c, fontSize: '1.1rem' }}>0.00 جنيه</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontWeight: 700, color: '#475569', fontSize: '0.85rem' }}>تكلفة الوحدة</span><span style={{ fontWeight: 800, color: '#64748b', fontSize: '0.85rem' }}>0.00 جنيه/كجم</span></div>
                </div>
              </div>

              <div className="card" style={{ border: `2px solid #f59e0b30`, borderTop: `3px solid #f59e0b` }}>
                <div className="card-header" style={{ background: '#fffbeb' }}><h3 style={{ fontWeight: 900, color: '#d97706', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><DollarSign size={18} /> سعر البيع</h3></div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div><label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#475569' }}>هامش الربح %</label><input type="number" defaultValue={25} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.6rem', border: `1.5px solid #fbbf24`, fontWeight: 700, background: '#fef3c7', marginTop: '0.25rem' }} /></div>
                  <div style={{ padding: '0.75rem', background: '#fffbeb', borderRadius: '0.75rem', border: '1.5px solid #fde68a' }}><p style={{ fontWeight: 700, color: '#92400e', fontSize: '0.8rem', margin: 0 }}>سعر البيع المقترح</p><p style={{ fontWeight: 900, color: '#d97706', fontSize: '1.25rem', margin: '0.25rem 0 0 0' }}>0.00 جنيه/كجم</p></div>
                  <div style={{ padding: '0.75rem', background: '#f0fdf4', borderRadius: '0.75rem', border: '1.5px solid #bbf7d0' }}><p style={{ fontWeight: 700, color: '#14532d', fontSize: '0.8rem', margin: 0 }}>الربح المتوقع للدفعة</p><p style={{ fontWeight: 900, color: '#16a34a', fontSize: '1.25rem', margin: '0.25rem 0 0 0' }}>0.00 جنيه</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="stat-card" style={{ borderTop: `3px solid ${c}` }}><div className="flex items-center justify-between"><div><p style={{ fontWeight: 800, color: c, fontSize: '0.85rem' }}>إجمالي المنتجات</p><p className="stat-value">{products.length}</p></div><div className="stat-icon" style={{ background: `${c}15`, color: c }}><Package size={20} /></div></div></div>
            <div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">قيمة المخزون</p><p className="stat-value">{formatCurrency(products.reduce((s,p)=>s+p.price*p.stock,0))}</p></div><div className="stat-icon bg-green-100 text-green-600"><DollarSign size={20} /></div></div></div>
            <div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">مخزون منخفض</p><p className="stat-value text-amber-600">{products.filter(p=>p.stock<150).length}</p></div><div className="stat-icon bg-amber-100 text-amber-600"><AlertTriangle size={20} /></div></div></div>
            <div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">متاح</p><p className="stat-value text-green-600">{products.filter(p=>p.stock>=150).length}</p></div><div className="stat-icon bg-green-100 text-green-600"><CheckCircle size={20} /></div></div></div>
          </div>
          <div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}>
            <div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, ${c}08, rgba(248,250,252,0.9))` }}>
              <h2 style={{ fontWeight: 900, fontSize: '1.35rem', color: c, display: 'flex', alignItems: 'center', gap: '0.75rem' }}><span className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}><Package size={20} /></span>المنتجات ({products.length}) - {section.name}</h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ position: 'relative' }}><Search size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} /><input placeholder="ابحث في المنتجات..." style={{ padding: '0.6rem 2rem 0.6rem 0.8rem', borderRadius: '0.75rem', border: `1.5px solid ${c}20`, fontWeight: 600 }} /></div>
                <AddButton label="منتج جديد" color={c} colorLight={cl} />
              </div>
            </div>
            <div className="card-body"><div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>{['الكل','أطباق','أرضيات','عناية البشرة','مكياج','نسائي فاخر'].map((cat,i)=>(<span key={i} style={{ padding: '0.4rem 0.9rem', borderRadius: '999px', fontWeight: 800, fontSize: '0.8rem', background: i===0?c:'#f1f5f9', color: i===0?'#fff':'#475569', cursor: 'pointer', border: `1.5px solid ${i===0?c:'#e2e8f0'}` }}>{cat}</span>))}</div></div>
            <div className="card-body p-0">
              <table className="table">
                <thead><tr><th style={{ color: c }}>المنتج</th><th style={{ color: c }}>التصنيف</th><th style={{ color: c }}>السعر</th><th style={{ color: c }}>المخزون</th><th style={{ color: c }}>القيمة</th><th style={{ color: c }}>الحالة</th><th style={{ color: c }}>إجراءات</th></tr></thead>
                <tbody>{products.map((p, i) => (<TableRowWithHover key={i} color={c}><td><div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><span style={{ fontSize: '1.5rem' }}>📦</span><div><p style={{ fontWeight: 800, margin: 0 }}>{p.name}</p><p style={{ fontWeight: 600, fontSize: '0.7rem', color: '#94a3b8', margin: 0 }}>{section.name}</p></div></div></td><td><span style={{ padding: '0.25rem 0.6rem', background: `${c}12`, color: c, borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.75rem' }}>{p.category}</span></td><td style={{ fontWeight: 800, color: c }}>{formatCurrency(p.price)}</td><td style={{ fontWeight: 700, color: p.stock < 150 ? '#d97706' : '#15803d' }}>{p.stock}</td><td style={{ fontWeight: 700 }}>{formatCurrency(p.price*p.stock)}</td><td><StatusBadge status={p.stock < 100 ? 'منخفض' : 'متوفر'} /></td><td><div style={{ display: 'flex', gap: '0.25rem' }}><span style={{ width: '28px', height: '28px', borderRadius: '0.5rem', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>👁️</span><span style={{ width: '28px', height: '28px', borderRadius: '0.5rem', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>✏️</span></div></td></TableRowWithHover>))}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'production' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="stat-card" style={{ borderTop: `3px solid ${c}` }}><div className="flex items-center justify-between"><div><p style={{ fontWeight: 800, color: c, fontSize: '0.85rem' }}>إجمالي الدفعات</p><p className="stat-value">{recentProduction.length}</p></div><div className="stat-icon" style={{ background: `${c}15`, color: c }}><Factory size={20} /></div></div></div>
            <div className="stat-card" style={{ borderTop: '3px solid #d97706' }}><div className="flex items-center justify-between"><div><p className="text-sm font-bold text-amber-700">قيد التصنيع</p><p className="stat-value text-amber-700">{recentProduction.filter(b=>b.status==='جاري').length}</p></div><div className="stat-icon bg-amber-100 text-amber-600"><Clock size={20} /></div></div></div>
            <div className="stat-card" style={{ borderTop: '3px solid #16a34a' }}><div className="flex items-center justify-between"><div><p className="text-sm font-bold text-green-700">مكتملة</p><p className="stat-value text-green-700">{recentProduction.filter(b=>b.status==='مكتمل').length}</p></div><div className="stat-icon bg-green-100 text-green-600"><CheckCircle size={20} /></div></div></div>
            <div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">فحص جودة</p><p className="stat-value">{recentProduction.filter(b=>b.status==='فحص جودة').length}</p></div><div className="stat-icon bg-purple-100 text-purple-600"><AlertTriangle size={20} /></div></div></div>
          </div>
          <div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}>
            <div className="card-header flex items-center justify-between" style={{ background: `linear-gradient(to bottom, ${c}08, rgba(248,250,252,0.9))` }}>
              <h2 style={{ fontWeight: 900, fontSize: '1.35rem', color: c, display: 'flex', alignItems: 'center', gap: '0.75rem' }}><span className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}><Factory size={20} /></span>التصنيع - {section.name} ({recentProduction.length})</h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ position: 'relative' }}><Search size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} /><input placeholder="ابحث برقم الدفعة أو المنتج..." style={{ padding: '0.6rem 2rem 0.6rem 0.8rem', borderRadius: '0.75rem', border: `1.5px solid ${c}20`, fontWeight: 600 }} /></div>
                <AddButton label="بدء تصنيع" color={c} colorLight={cl} />
              </div>
            </div>
            <div className="card-body"><div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>{['الكل','مخطط','جاري','فحص جودة','مكتمل'].map((st,i)=>(<span key={i} style={{ padding: '0.4rem 0.9rem', borderRadius: '999px', fontWeight: 800, fontSize: '0.8rem', background: i===0?c:'#f1f5f9', color: i===0?'#fff':'#475569', border: `1.5px solid ${i===0?c:'#e2e8f0'}`, cursor: 'pointer' }}>{st}</span>))}</div></div>
            <div className="card-body p-0">
              <table className="table">
                <thead><tr><th style={{ color: c }}>رقم الدفعة</th><th style={{ color: c }}>المنتج</th><th style={{ color: c }}>الكمية</th><th style={{ color: c }}>التقدم</th><th style={{ color: c }}>الحالة</th><th style={{ color: c }}>المسؤول</th><th style={{ color: c }}>إجراءات</th></tr></thead>
                <tbody>{recentProduction.map((b, i) => (<TableRowWithHover key={i} color={c}><td style={{ fontWeight: 800, fontFamily: 'monospace', fontSize: '0.85rem', color: c }}>{b.batch}</td><td><div><p style={{ fontWeight: 800, margin: 0 }}>{b.product}</p><p style={{ fontWeight: 600, fontSize: '0.7rem', color: '#94a3b8', margin: 0 }}>v2.1 • {section.name}</p></div></td><td style={{ fontWeight: 700 }}>{b.qty}</td><td><ProgressBar progress={b.progress} color={c} colorLight={cl} /></td><td><StatusBadge status={b.status} /></td><td style={{ fontWeight: 600, fontSize: '0.85rem' }}>أحمد</td><td><div style={{ display: 'flex', gap: '0.25rem' }}><span style={{ width: '28px', height: '28px', borderRadius: '0.5rem', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>👁️</span><span style={{ width: '28px', height: '28px', borderRadius: '0.5rem', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>✏️</span></div></td></TableRowWithHover>))}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'inventory' && (<div className="space-y-6"><div className="grid grid-cols-4 gap-4"><div className="stat-card" style={{ borderTop: `3px solid ${c}` }}><div className="flex items-center justify-between"><div><p style={{ fontWeight: 800, color: c, fontSize: '0.85rem' }}>قيمة المخزون</p><p className="stat-value" style={{ color: c }}>{formatCurrency(inventoryValue)}</p></div><div className="stat-icon" style={{ background: `${c}15`, color: c }}><Warehouse size={22} /></div></div></div><div className="stat-card" style={{ borderTop: '3px solid #dc2626' }}><div className="flex items-center justify-between"><div><p className="text-sm font-bold text-red-700">منخفض</p><p className="stat-value text-red-700">{lowStockCount}</p></div><div className="stat-icon bg-red-100 text-red-600"><AlertTriangle size={22} /></div></div></div><div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">خام</p><p className="stat-value">{formatCurrency(rawValue)}</p></div><div className="stat-icon bg-blue-100 text-blue-600"><FlaskConical size={22} /></div></div></div><div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">منتجات</p><p className="stat-value">{formatCurrency(prodValue)}</p></div><div className="stat-icon bg-green-100 text-green-600"><Package size={22} /></div></div></div></div><div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}><div className="card-header flex items-center justify-between"><h2 style={{ fontWeight: 900, fontSize: '1.35rem', color: c, display: 'flex', alignItems: 'center', gap: '0.75rem' }}><span className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}><Warehouse size={20} /></span>المخزون - {section.name}</h2><AddButton label="إضافة" color={c} colorLight={cl} /></div><div className="card-body p-0"><table className="table"><thead><tr><th style={{ color: c }}>الكود</th><th style={{ color: c }}>الاسم</th><th style={{ color: c }}>النوع</th><th style={{ color: c }}>المتاح</th><th style={{ color: c }}>الوحدة</th><th style={{ color: c }}>القيمة</th><th style={{ color: c }}>الحالة</th></tr></thead><tbody>{inventoryData.map(item=>(<TableRowWithHover key={item.id} color={c}><td style={{ fontFamily: 'monospace', fontWeight: 800, color: c }}>{item.code}</td><td style={{ fontWeight: 700 }}>{item.name}</td><td><span style={{ padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.75rem', background: item.type==='raw'?'#dbeafe':'#dcfce7', color: item.type==='raw'?'#1d4ed8':'#15803d' }}>{item.type==='raw'?'خام':'منتج'}</span></td><td style={{ fontWeight: 800 }}>{item.current}</td><td>{item.unit}</td><td style={{ fontWeight: 800, color: c }}>{formatCurrency(item.totalValue)}</td><td><StatusBadge status={item.status} /></td></TableRowWithHover>))}</tbody></table></div></div></div>)}
      {activeTab === 'sales' && (<div className="space-y-6"><div className="grid grid-cols-4 gap-4"><div className="stat-card" style={{ borderTop: `3px solid ${c}` }}><div className="flex items-center justify-between"><div><p style={{ color: c, fontWeight: 800, fontSize: '0.85rem' }}>مبيعات اليوم</p><p className="stat-value" style={{ color: c }}>{formatCurrency(salesStats.todaySales)}</p></div><div className="stat-icon" style={{ background: `linear-gradient(135deg, ${cl}, ${c})`, color: '#fff' }}><TrendingUp size={22} /></div></div></div><div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">أسبوع</p><p className="stat-value">{formatCurrency(salesStats.weekSales)}</p></div><div className="stat-icon bg-blue-100 text-blue-600"><Calendar size={22} /></div></div></div><div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">طلبات</p><p className="stat-value">{salesStats.todayOrders}</p></div><div className="stat-icon" style={{ background: `${c}15`, color: c }}><ShoppingCart size={22} /></div></div></div><div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">متوسط</p><p className="stat-value">{formatCurrency(salesStats.avgOrderValue)}</p></div><div className="stat-icon bg-amber-100 text-amber-600"><DollarSign size={22} /></div></div></div></div><div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}><div className="card-header flex items-center justify-between"><h2 style={{ fontWeight: 900, fontSize: '1.35rem', color: c, display: 'flex', alignItems: 'center', gap: '0.75rem' }}><span className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}><ShoppingCart size={20} /></span>المبيعات - {section.name}</h2><AddButton label="بيع جديد" color={c} colorLight={cl} /></div><div className="card-body p-0"><table className="table"><thead><tr><th style={{ color: c }}>الفاتورة</th><th style={{ color: c }}>العميل</th><th style={{ color: c }}>المنتجات</th><th style={{ color: c }}>الإجمالي</th><th style={{ color: c }}>المدفوع</th><th style={{ color: c }}>الحالة</th><th style={{ color: c }}>التاريخ</th></tr></thead><tbody>{(sales.length?sales:[]).map(s=>(<TableRowWithHover key={s.id} color={c}><td style={{ fontWeight: 800, fontFamily: 'monospace', color: c }}>{s.invoiceNumber}</td><td style={{ fontWeight: 700 }}>{s.customer}</td><td><div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>{s.products.slice(0,2).map((p,i)=>(<span key={i} style={{ fontSize: '0.75rem', background: `${c}12`, color: c, padding: '0.2rem 0.5rem', borderRadius: '0.5rem', fontWeight: 700 }}>{p.name.split(' ')[0]} ({p.quantity})</span>))}</div></td><td style={{ fontWeight: 800 }}>{formatCurrency(s.total)}</td><td style={{ color: '#15803d', fontWeight: 800 }}>{formatCurrency(s.paid)}</td><td><StatusBadge status={s.status==='paid'?'تم الدفع':s.status==='partially_paid'?'مدفوع جزئياً':'مؤكد'} /></td><td>{s.date}</td></TableRowWithHover>))}</tbody></table></div></div></div>)}
      {activeTab === 'invoices' && (<div className="space-y-6"><div className="grid grid-cols-4 gap-4"><div className="stat-card" style={{ borderTop: `3px solid ${c}` }}><div className="flex items-center justify-between"><div><p style={{ color: c, fontWeight: 800, fontSize: '0.85rem' }}>إجمالي الفواتير</p><p className="stat-value">{invoicesData.length}</p></div><div className="stat-icon" style={{ background: `${c}15`, color: c }}><FileText size={22} /></div></div></div><div className="stat-card" style={{ borderTop: '3px solid #16a34a' }}><div className="flex items-center justify-between"><div><p className="text-sm font-bold text-green-700">مدفوعة</p><p className="stat-value text-green-700">{invoicesData.filter(i=>i.status==='paid').length}</p></div><div className="stat-icon bg-green-100 text-green-600"><CheckCircle size={22} /></div></div></div><div className="stat-card" style={{ borderTop: '3px solid #d97706' }}><div className="flex items-center justify-between"><div><p className="text-sm font-bold text-amber-700">جزئياً</p><p className="stat-value text-amber-700">{invoicesData.filter(i=>i.status==='partially_paid').length}</p></div><div className="stat-icon bg-amber-100 text-amber-600"><Clock size={22} /></div></div></div><div className="stat-card" style={{ borderTop: '3px solid #dc2626' }}><div className="flex items-center justify-between"><div><p className="text-sm font-bold text-red-700">غير مدفوعة</p><p className="stat-value text-red-700">{invoicesData.filter(i=>i.status==='confirmed').length}</p></div><div className="stat-icon bg-red-100 text-red-600"><XCircle size={22} /></div></div></div></div><div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}><div className="card-header flex items-center justify-between"><h2 style={{ fontWeight: 900, fontSize: '1.35rem', color: c, display: 'flex', alignItems: 'center', gap: '0.75rem' }}><span className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}><FileText size={20} /></span>الفواتير - {section.name}</h2><AddButton label="فاتورة جديدة" color={c} colorLight={cl} /></div><div className="card-body p-0"><table className="table"><thead><tr><th style={{ color: c }}>رقم الفاتورة</th><th style={{ color: c }}>العميل</th><th style={{ color: c }}>الإجمالي</th><th style={{ color: c }}>المدفوع</th><th style={{ color: c }}>المتبقي</th><th style={{ color: c }}>الحالة</th><th style={{ color: c }}>التاريخ</th></tr></thead><tbody>{invoicesData.map(inv=>(<TableRowWithHover key={inv.id} color={c}><td style={{ fontFamily: 'monospace', fontWeight: 800, color: c }}>{inv.number}</td><td style={{ fontWeight: 700 }}>{inv.customer}</td><td style={{ fontWeight: 800 }}>{formatCurrency(inv.total)}</td><td style={{ color: '#15803d', fontWeight: 700 }}>{formatCurrency(inv.paid)}</td><td style={{ color: inv.remaining>0?'#dc2626':'#64748b', fontWeight: 700 }}>{formatCurrency(inv.remaining)}</td><td><StatusBadge status={inv.status==='paid'?'تم الدفع':inv.status==='partially_paid'?'مدفوع جزئياً':'مؤكد'} /></td><td>{inv.date}</td></TableRowWithHover>))}</tbody></table></div></div></div>)}
      {activeTab === 'customers' && (<div className="space-y-6"><div className="grid grid-cols-4 gap-4">{[{label:'إجمالي العملاء',value:customersData.length,color:c},{label:'نشطين',value:customersData.filter(c=>c.status==='نشط').length,color:'#16a34a'},{label:'إجمالي الطلبات',value:customersData.reduce((s,c)=>s+c.totalOrders,0),color:'#2563eb'},{label:'إجمالي المبيعات',value:formatCurrency(customersData.reduce((s,c)=>s+c.totalSpent,0)),color:'#d97706'}].map((st,i)=>(<div key={i} className="stat-card" style={{ borderTop: `3px solid ${st.color}` }}><div className="flex items-center justify-between"><div><p style={{ fontWeight: 800, fontSize: '0.85rem', color: typeof st.value==='string'? '#64748b' : st.color as string }}>{st.label}</p><p className="stat-value">{st.value}</p></div><div className="stat-icon" style={{ background: `${st.color}15`, color: st.color as string }}><Users size={22} /></div></div></div>))}</div><div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}><div className="card-header flex items-center justify-between"><h2 style={{ fontWeight: 900, fontSize: '1.35rem', color: c, display: 'flex', alignItems: 'center', gap: '0.75rem' }}><span className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}><Users size={20} /></span>العملاء - {section.name}</h2><AddButton label="عميل جديد" color={c} colorLight={cl} /></div><div className="card-body p-0"><table className="table"><thead><tr><th style={{ color: c }}>العميل</th><th style={{ color: c }}>التواصل</th><th style={{ color: c }}>الطلبات</th><th style={{ color: c }}>الشراء</th><th style={{ color: c }}>آخر طلب</th><th style={{ color: c }}>الحالة</th></tr></thead><tbody>{customersData.map(cust=>(<TableRowWithHover key={cust.id} color={c}><td><div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.65rem', background: `linear-gradient(135deg, ${cl}, ${c})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900 }}>{cust.name[0]}</div><span style={{ fontWeight: 800 }}>{cust.name}</span></div></td><td><div style={{ display: 'flex', flexDirection: 'column' }}><span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}><Phone size={12} /> {cust.phone}</span><span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: '#64748b' }}><Mail size={12} /> {cust.email}</span></div></td><td style={{ fontWeight: 800, color: c }}>{cust.totalOrders}</td><td style={{ fontWeight: 800 }}>{formatCurrency(cust.totalSpent)}</td><td>{cust.lastOrderDate}</td><td><StatusBadge status={cust.status} /></td></TableRowWithHover>))}</tbody></table></div></div></div>)}
      {activeTab === 'debts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="stat-card" style={{ borderTop: `3px solid ${c}` }}><div className="flex items-center justify-between"><div><p style={{ fontWeight: 800, color: c, fontSize: '0.85rem' }}>إجمالي المديونيات</p><p className="stat-value" style={{ color: c }}>{formatCurrency(debtsData.reduce((s,d)=>s+d.amount,0))}</p></div><div className="stat-icon" style={{ background: `${c}15`, color: c }}><CreditCard size={22} /></div></div></div>
            <div className="stat-card" style={{ borderTop: '3px solid #dc2626' }}><div className="flex items-center justify-between"><div><p className="text-sm font-bold text-red-700">متأخرة</p><p className="stat-value text-red-700">{debtsData.filter(d=>d.status==='متأخر').length}</p></div><div className="stat-icon bg-red-100 text-red-600"><AlertTriangle size={22} /></div></div></div>
            <div className="stat-card" style={{ borderTop: '3px solid #d97706' }}><div className="flex items-center justify-between"><div><p className="text-sm font-bold text-amber-700">مستحقة</p><p className="stat-value text-amber-700">{debtsData.filter(d=>d.status==='مستحق').length}</p></div><div className="stat-icon bg-amber-100 text-amber-600"><Clock size={22} /></div></div></div>
          </div>
          <div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}><div className="card-header flex items-center justify-between"><h2 style={{ fontWeight: 900, fontSize: '1.35rem', color: c, display: 'flex', alignItems: 'center', gap: '0.75rem' }}><span className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}><CreditCard size={20} /></span>المديونيات - {section.name}</h2><AddButton label="إضافة مديونية" color={c} colorLight={cl} /></div><div className="card-body p-0"><table className="table"><thead><tr><th style={{ color: c }}>النوع</th><th style={{ color: c }}>الاسم</th><th style={{ color: c }}>المبلغ</th><th style={{ color: c }}>تاريخ الاستحقاق</th><th style={{ color: c }}>الحالة</th><th style={{ color: c }}>الهاتف</th></tr></thead><tbody>{debtsData.map(d=>(<TableRowWithHover key={d.id} color={c}><td><span style={{ padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.75rem', background: d.type==='customer'?'#dbeafe':'#f3e8ff', color: d.type==='customer'?'#1d4ed8':'#7c3aed' }}>{d.type==='customer'?'عميل':'مورد'}</span></td><td style={{ fontWeight: 700 }}>{d.name}</td><td style={{ fontWeight: 800, color: c }}>{formatCurrency(d.amount)}</td><td>{d.dueDate}</td><td><StatusBadge status={d.status} /></td><td>{d.phone||'-'}</td></TableRowWithHover>))}</tbody></table></div></div>
        </div>
      )}
      {activeTab === 'expenses' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="stat-card" style={{ borderTop: `3px solid ${c}` }}><div className="flex items-center justify-between"><div><p style={{ fontWeight: 800, color: c, fontSize: '0.85rem' }}>إجمالي المصروفات</p><p className="stat-value" style={{ color: c }}>{formatCurrency(expensesData.reduce((s,e)=>s+e.amount,0))}</p></div><div className="stat-icon" style={{ background: `${c}15`, color: c }}><Receipt size={22} /></div></div></div>
            <div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">هذا الشهر</p><p className="stat-value">{formatCurrency(expensesData.reduce((s,e)=>s+e.amount,0))}</p></div><div className="stat-icon bg-blue-100 text-blue-600"><Calendar size={22} /></div></div></div>
            <div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">عدد العمليات</p><p className="stat-value">{expensesData.length}</p></div><div className="stat-icon bg-amber-100 text-amber-600"><DollarSign size={22} /></div></div></div>
          </div>
          <div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}><div className="card-header flex items-center justify-between"><h2 style={{ fontWeight: 900, fontSize: '1.35rem', color: c, display: 'flex', alignItems: 'center', gap: '0.75rem' }}><span className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}><Receipt size={20} /></span>المصروفات - {section.name}</h2><AddButton label="إضافة مصروف" color={c} colorLight={cl} /></div><div className="card-body p-0"><table className="table"><thead><tr><th style={{ color: c }}>التصنيف</th><th style={{ color: c }}>الوصف</th><th style={{ color: c }}>المبلغ</th><th style={{ color: c }}>التاريخ</th><th style={{ color: c }}>طريقة الدفع</th><th style={{ color: c }}>الحالة</th></tr></thead><tbody>{expensesData.map(e=>(<TableRowWithHover key={e.id} color={c}><td><span style={{ padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.75rem', background: `${c}12`, color: c }}>{e.category}</span></td><td style={{ fontWeight: 700 }}>{e.description}</td><td style={{ fontWeight: 800, color: c }}>{formatCurrency(e.amount)}</td><td>{e.date}</td><td>{e.method}</td><td><StatusBadge status={e.status} /></td></TableRowWithHover>))}</tbody></table></div></div>
        </div>
      )}
      {activeTab === 'reports' && (<div className="space-y-6"><div className="grid grid-cols-3 gap-4"><div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}`, padding: '1.5rem' }}><div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}><TrendingUp size={22} /></div><div><h3 style={{ fontWeight: 900, color: c, margin: 0 }}>نمو المبيعات</h3><p style={{ fontWeight: 700, color: '#64748b', fontSize: '0.85rem', margin: 0 }}>آخر 6 أشهر - {section.name}</p></div></div><div style={{ display: 'flex', alignItems: 'end', gap: '0.5rem', height: '100px', marginTop: '1rem' }}>{[40,65,55,80,70,95].map((h,i)=>(<div key={i} style={{ flex:1, background: `linear-gradient(to top, ${c}, ${cl})`, height: `${h}%`, borderRadius: '0.5rem 0.5rem 0 0' }} />))}</div></div><div className="card" style={{ border: `2px solid #10b98130`, borderTop: `4px solid #10b981`, padding: '1.5rem' }}><div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg"><DollarSign size={22} /></div><div><h3 style={{ fontWeight: 900, color: '#059669', margin: 0 }}>الأرباح</h3><p style={{ fontWeight: 700, color: '#64748b', fontSize: '0.85rem', margin: 0 }}>هذا الشهر</p></div></div><p style={{ fontWeight: 900, fontSize: '2rem', color: '#059669' }}>{formatCurrency(125000)}</p></div><div className="card" style={{ border: `2px solid #f59e0b30`, borderTop: `4px solid #f59e0b`, padding: '1.5rem' }}><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg"><PackageCheck size={22} /></div><div><h3 style={{ fontWeight: 900, color: '#d97706', margin: 0 }}>كفاءة التصنيع</h3><p style={{ fontWeight: 700, color: '#64748b', fontSize: '0.85rem', margin: 0 }}>{recentProduction.filter(p=>p.status==='مكتمل').length} مكتمل / {recentProduction.length} إجمالي</p></div></div></div></div><div className="two-col-layout"><div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}><div className="card-header"><h2 style={{ fontWeight: 900, color: c, display: 'flex', alignItems: 'center', gap: '0.75rem' }}><BarChart3 size={20} /> تقرير المبيعات - {section.name}</h2></div><div className="card-body"><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}><div style={{ padding: '1rem', background: `${c}08`, borderRadius: '0.85rem' }}><p style={{ fontWeight: 700, color: '#64748b', fontSize: '0.8rem' }}>مبيعات اليوم</p><p style={{ fontWeight: 900, fontSize: '1.5rem', color: c }}>{formatCurrency(salesStats.todaySales)}</p></div><div style={{ padding: '1rem', background: '#f0fdf4', borderRadius: '0.85rem' }}><p style={{ fontWeight: 700, color: '#64748b', fontSize: '0.8rem' }}>الربح المتوقع</p><p style={{ fontWeight: 900, fontSize: '1.5rem', color: '#16a34a' }}>{formatCurrency(salesStats.todaySales*0.35)}</p></div></div></div></div><div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}><div className="card-header"><h2 style={{ fontWeight: 900, color: c, display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Warehouse size={20} /> تقرير المخزون - {section.name}</h2></div><div className="card-body"><div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: `${c}08`, borderRadius: '0.75rem' }}><span>إجمالي القيمة</span><span style={{ fontWeight: 900, color: c }}>{formatCurrency(inventoryValue)}</span></div></div></div></div></div>)}
      {activeTab === 'academy' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="stat-card" style={{ borderTop: `3px solid ${c}` }}><div className="flex items-center justify-between"><div><p style={{ fontWeight: 800, color: c, fontSize: '0.85rem' }}>الدورات المتاحة</p><p className="stat-value" style={{ color: c }}>{academyData.length}</p></div><div className="stat-icon" style={{ background: `${c}15`, color: c }}><GraduationCap size={22} /></div></div></div>
            <div className="stat-card" style={{ borderTop: '3px solid #16a34a' }}><div className="flex items-center justify-between"><div><p className="text-sm font-bold text-green-700">مكتملة</p><p className="stat-value text-green-700">{academyData.filter(c=>c.status==='مكتمل').length}</p></div><div className="stat-icon bg-green-100 text-green-600"><Award size={22} /></div></div></div>
            <div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">إجمالي المتدربين</p><p className="stat-value">{academyData.reduce((s,c)=>s+c.enrolled,0)}</p></div><div className="stat-icon bg-blue-100 text-blue-600"><Users size={22} /></div></div></div>
          </div>
          <div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}><div className="card-header"><h2 style={{ fontWeight: 900, fontSize: '1.35rem', color: c, display: 'flex', alignItems: 'center', gap: '0.75rem' }}><span className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}><GraduationCap size={20} /></span>الأكاديمية - {section.name}</h2></div><div className="card-body p-0">{academyData.map(course=>(<div key={course.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', borderBottom: `1px solid ${c}10` }}><div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '0.85rem', background: `linear-gradient(135deg, ${cl}, ${c})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><PlayCircle size={24} /></div><div style={{ flex: 1 }}><h4 style={{ fontWeight: 800, color: '#1e293b', margin: 0 }}>{course.title}</h4><p style={{ fontWeight: 600, color: '#64748b', fontSize: '0.85rem', margin: 0 }}>{course.instructor} • {course.duration} • {course.level}</p><div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><div style={{ flex: 1, maxWidth: '200px', height: '0.5rem', background: `${c}15`, borderRadius: '999px', overflow: 'hidden' }}><div style={{ width: `${course.progress}%`, height: '100%', background: `linear-gradient(90deg, ${c}, ${cl})` }} /></div><span style={{ fontWeight: 800, color: c, fontSize: '0.85rem' }}>{course.progress}%</span></div></div><div style={{ textAlign: 'center' }}><p style={{ fontWeight: 800, color: c, margin: 0 }}>{course.enrolled}</p><p style={{ fontWeight: 600, color: '#64748b', fontSize: '0.75rem', margin: 0 }}>متدرب</p></div><StatusBadge status={course.status} /></div>))}</div></div>
        </div>
      )}
      {activeTab === 'books' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="stat-card" style={{ borderTop: `3px solid ${c}` }}><div className="flex items-center justify-between"><div><p style={{ fontWeight: 800, color: c, fontSize: '0.85rem' }}>الكتب المتاحة</p><p className="stat-value" style={{ color: c }}>{booksData.length}</p></div><div className="stat-icon" style={{ background: `${c}15`, color: c }}><BookOpen size={22} /></div></div></div>
            <div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">إجمالي الصفحات</p><p className="stat-value">{booksData.reduce((s,b)=>s+b.pages,0)}</p></div><div className="stat-icon bg-blue-100 text-blue-600"><FileText size={22} /></div></div></div>
            <div className="stat-card"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">متوسط التقييم</p><p className="stat-value">4.8 ⭐</p></div><div className="stat-icon bg-amber-100 text-amber-600"><Star size={22} /></div></div></div>
          </div>
          <div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}><div className="card-header flex items-center justify-between"><h2 style={{ fontWeight: 900, fontSize: '1.35rem', color: c, display: 'flex', alignItems: 'center', gap: '0.75rem' }}><span className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}><BookOpen size={20} /></span>الكتب الرقمية - {section.name}</h2><AddButton label="كتاب جديد" color={c} colorLight={cl} /></div><div className="card-body p-0">{booksData.map(book=>(<div key={book.id} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', borderBottom: `1px solid ${c}10` }}><div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '0.75rem', background: `linear-gradient(135deg, ${cl}, ${c})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5rem', fontWeight: 900 }}>{book.title[0]}</div><div style={{ flex: 1 }}><h4 style={{ fontWeight: 800, color: '#1e293b', margin: 0 }}>{book.title}</h4><p style={{ fontWeight: 600, color: '#64748b', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>{book.author} • {book.category} • {book.pages} صفحة</p></div><div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 800, color: '#d97706' }}><Star size={16} /> {book.rating}</div><StatusBadge status={book.status} /></div>))}</div></div>
        </div>
      )}
      {activeTab === 'settings' && (<div className="space-y-6"><div className="card" style={{ border: `2px solid ${c}30`, borderTop: `4px solid ${c}` }}><div className="card-header" style={{ background: `linear-gradient(to bottom, ${c}08, rgba(248,250,252,0.9))` }}><h2 style={{ fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: c }}><span className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cl}, ${c})` }}><Settings size={24} /></span>إعدادات قسم {section.name}</h2></div><div className="card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}><div style={{ gridColumn: 'span 2 / span 2' }}><h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: c, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Palette size={18} /> المظهر والهوية</h3><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1.25rem', background: `${c}06`, borderRadius: '1rem', border: `1.5px solid ${c}12` }}><div><label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#475569', display: 'block', marginBottom: '0.4rem' }}>اسم القسم</label><input defaultValue={section.name} style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '0.75rem', border: `1.5px solid ${c}20`, fontWeight: 700 }} /></div><div><label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#475569', display: 'block', marginBottom: '0.4rem' }}>الوصف</label><input defaultValue={section.description} style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '0.75rem', border: `1.5px solid ${c}20`, fontWeight: 600 }} /></div></div></div><div><h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: c, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Bell size={18} /> تنبيهات المخزون</h3><div style={{ padding: '1.25rem', background: '#fef2f2', borderRadius: '1rem', border: '1.5px solid #fecaca' }}><label style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontWeight: 700, color: '#7f1d1d' }}>تنبيه انخفاض المخزون</span><input type="checkbox" defaultChecked /></label></div></div><div><h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: c, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={18} /> الأمان</h3><div style={{ padding: '1.25rem', background: '#f0fdf4', borderRadius: '1rem', border: '1.5px solid #bbf7d0' }}><label style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontWeight: 700, color: '#14532d' }}>تأكيد قبل الحذف</span><input type="checkbox" defaultChecked /></label></div></div><div style={{ gridColumn: 'span 2 / span 2', display: 'flex', justifyContent: 'end', marginTop: '0.5rem' }}><div style={{ padding: '0.75rem 1.75rem', borderRadius: '0.85rem', background: `linear-gradient(135deg, ${cl}, ${c})`, color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Save size={18} /> حفظ الإعدادات</div></div></div></div></div>)}
    </div>
  );
}
