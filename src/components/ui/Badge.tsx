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

// دالة مساعدة للحصول على لون حالة التصنيع
export function getProductionStatusBadge(status: string) {
  switch (status) {
    case 'draft':
      return <Badge variant="default">مسودة</Badge>;
    case 'planned':
      return <Badge variant="info">مخطط</Badge>;
    case 'in_progress':
      return <Badge variant="warning">جاري التصنيع</Badge>;
    case 'quality_check':
      return <Badge variant="primary">فحص الجودة</Badge>;
    case 'completed':
      return <Badge variant="success">مكتمل</Badge>;
    case 'cancelled':
      return <Badge variant="error">ملغي</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

// دالة مساعدة للحصول على لون حالة الفاتورة
export function getInvoiceStatusBadge(status: string) {
  switch (status) {
    case 'draft':
      return <Badge variant="default">مسودة</Badge>;
    case 'confirmed':
      return <Badge variant="info">مؤكدة</Badge>;
    case 'paid':
      return <Badge variant="success">مدفوعة</Badge>;
    case 'partially_paid':
      return <Badge variant="warning">مدفوعة جزئياً</Badge>;
    case 'cancelled':
      return <Badge variant="error">ملغية</Badge>;
    default:
      return <Badge>{status}</Badge>;
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
