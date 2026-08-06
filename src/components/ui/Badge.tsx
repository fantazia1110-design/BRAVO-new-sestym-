'use client';

import React from 'react';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'badge-primary',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  info: 'badge-info',
  default: 'bg-gray-100 text-gray-700',
};

export default function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  return (
    <span
      className={`badge ${variantClasses[variant]} ${
        size === 'sm' ? 'text-xs px-2 py-0.5' : ''
      }`}
    >
      {children}
    </span>
  );
}

// دالة مساعدة للحصول على لون حالة التركيبة
export function getFormulaStatusBadge(status: string) {
  switch (status) {
    case 'draft':
      return <Badge variant="default">مسودة</Badge>;
    case 'testing':
      return <Badge variant="warning">تحت الاختبار</Badge>;
    case 'approved':
      return <Badge variant="success">معتمدة</Badge>;
    case 'archived':
      return <Badge variant="info">مؤرشفة</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

// دالة مساعدة للحصول على لون حالة التصنيع — كل حالة بلونها المعبر عنها
export function getProductionStatusBadge(status: string) {
  const base = { fontWeight: 900, fontSize: '0.82rem', padding: '0.35rem 0.9rem', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center' as const, letterSpacing: '0.02em' };
  switch (status) {
    case 'draft':
      return <span style={{ ...base, background: '#f1f5f9', color: '#475569', border: '2px solid #94a3b8' }}>مسودة</span>;
    case 'planned':
      return <span style={{ ...base, background: '#eef2ff', color: '#3730a3', border: '2px solid #818cf8' }}>مخطط</span>;
    case 'in_progress':
      return <span style={{ ...base, background: '#fff7ed', color: '#c2410c', border: '2px solid #fb923c' }}>جاري التصنيع</span>;
    case 'quality_check':
      return <span style={{ ...base, background: '#eff6ff', color: '#1d4ed8', border: '2px solid #60a5fa' }}>فحص الجودة</span>;
    case 'completed':
      return <span style={{ ...base, background: '#f0fdf4', color: '#15803d', border: '2px solid #4ade80' }}>مكتمل</span>;
    case 'cancelled':
      return <span style={{ ...base, background: '#fef2f2', color: '#dc2626', border: '2px solid #f87171' }}>ملغي</span>;
    default:
      return <span style={{ ...base, background: '#f1f5f9', color: '#475569', border: '2px solid #94a3b8' }}>{status}</span>;
  }
}

// دالة مساعدة للحصول على لون حالة الفاتورة — كل حالة بلونها المعبر عنها
export function getInvoiceStatusBadge(status: string) {
  const base = { fontWeight: 900, fontSize: '0.82rem', padding: '0.35rem 0.9rem', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center' as const, letterSpacing: '0.02em' };
  switch (status) {
    case 'draft':
      return <span style={{ ...base, background: '#f1f5f9', color: '#475569', border: '2px solid #94a3b8' }}>مسودة</span>;
    case 'confirmed':
      return <span style={{ ...base, background: '#eff6ff', color: '#1d4ed8', border: '2px solid #60a5fa' }}>مؤكدة</span>;
    case 'paid':
      return <span style={{ ...base, background: '#f0fdf4', color: '#15803d', border: '2px solid #4ade80' }}>مدفوعة</span>;
    case 'partially_paid':
      return <span style={{ ...base, background: '#fff7ed', color: '#c2410c', border: '2px solid #fb923c' }}>مدفوعة جزئياً</span>;
    case 'cancelled':
      return <span style={{ ...base, background: '#fef2f2', color: '#dc2626', border: '2px solid #f87171' }}>ملغية</span>;
    default:
      return <span style={{ ...base, background: '#f1f5f9', color: '#475569', border: '2px solid #94a3b8' }}>{status}</span>;
  }
}

// دالة مساعدة لعرض حالة المخزون
export function getStockStatusBadge(current: number, min: number) {
  if (current <= 0) {
    return <Badge variant="error">نفذ المخزون</Badge>;
  }
  if (current <= min) {
    return <Badge variant="warning">مخزون منخفض</Badge>;
  }
  return <Badge variant="success">متوفر</Badge>;
}

// ألوان الأقسام
export function getCategoryBadge(category: string) {
  const categories: Record<string, { label: string; variant: BadgeVariant }> = {
    detergents: { label: 'المنظفات', variant: 'info' },
    cosmetics: { label: 'مستحضرات التجميل', variant: 'primary' },
    perfumes: { label: 'العطور', variant: 'primary' },
    soap: { label: 'الصابون', variant: 'success' },
    hair_care: { label: 'العناية بالشعر', variant: 'warning' },
    skin_care: { label: 'العناية بالبشرة', variant: 'info' },
    personal_care: { label: 'العناية الشخصية', variant: 'warning' },
    raw_materials: { label: 'المواد الخام', variant: 'info' },
  };
  
  const cat = categories[category] || { label: category, variant: 'default' as BadgeVariant };
  return <Badge variant={cat.variant}>{cat.label}</Badge>;
}
