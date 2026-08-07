'use client';

import React from 'react';
import { Droplets } from 'lucide-react';
import SectionPage from '@/components/ui/SectionPage';

const SECTION = {
  id: 'detergents',
  name: 'المنظفات',
  description: 'منظفات فعالة بتركيبات آمنة ومبتكرة',
  image: '/icons/real-detergents.jpg',
  color: '#2563eb',
  colorLight: '#3b82f6',
  icon: <Droplets size={24} />,
};

const rawMaterials = [
  { name: 'تكسابون SLES', stock: 25, unit: 'كجم', min: 50, status: 'منخفض' },
  { name: 'حمض الكبريتيك', stock: 120, unit: 'لتر', min: 30, status: 'متوفر' },
  { name: 'صوديوم لوريل إيثر', stock: 80, unit: 'كجم', min: 20, status: 'متوفر' },
  { name: 'كوكاميد دي إيثانول أمين', stock: 15, unit: 'كجم', min: 25, status: 'منخفض' },
  { name: 'عطر الليمون', stock: 45, unit: 'لتر', min: 10, status: 'متوفر' },
  { name: 'جلسرين نباتي', stock: 60, unit: 'لتر', min: 30, status: 'متوفر' },
];

const formulas = [
  { name: 'سائل أطباق الليمون', status: 'معتمدة', ingredients: 8, category: 'أطباق' },
  { name: 'منظف أرضيات اللافندر', status: 'معتمدة', ingredients: 6, category: 'أرضيات' },
  { name: 'منظف زجاج كريستال', status: 'تحت الاختبار', ingredients: 5, category: 'زجاج' },
  { name: 'سائل ملابس عطر ليمون', status: 'معتمدة', ingredients: 10, category: 'ملابس' },
  { name: 'منظف حمام كلور', status: 'مسودة', ingredients: 4, category: 'حمامات' },
];

const products = [
  { name: 'سائل أطباق الليمون 500مل', price: 18, stock: 340, category: 'أطباق' },
  { name: 'منظف أرضيات اللافندر 1لتر', price: 25, stock: 220, category: 'أرضيات' },
  { name: 'منظف زجاج كريستال 750مل', price: 22, stock: 150, category: 'زجاج' },
  { name: 'سائل ملابس عطر ليمون 1لتر', price: 30, stock: 180, category: 'ملابس' },
  { name: 'منظف حمام كلور 1لتر', price: 15, stock: 450, category: 'حمامات' },
  { name: 'سائل أطباق الليمون 1لتر', price: 32, stock: 120, category: 'أطباق' },
];

const suppliers = [
  { name: 'شركة كيماويات النيل', material: 'تكسابون SLES', phone: '01012345678' },
  { name: 'مؤسسة الفجر للكيماويات', material: 'حمض الكبريتيك', phone: '01198765432' },
  { name: 'شركة العطور المتخصصة', material: 'عطر الليمون', phone: '01234567890' },
  { name: 'موردو الجلسرين العرب', material: 'جلسرين نباتي', phone: '01567890123' },
];

const recentProduction = [
  { batch: 'DET-2026-001', product: 'سائل أطباق الليمون', qty: '1000 لتر', status: 'مكتمل', progress: 100 },
  { batch: 'DET-2026-002', product: 'منظف أرضيات اللافندر', qty: '500 لتر', status: 'جاري', progress: 65 },
  { batch: 'DET-2026-003', product: 'منظف زجاج كريستال', qty: '300 لتر', status: 'مخطط', progress: 0 },
];

export default function DetergentsPage() {
  return (
    <SectionPage
      section={SECTION}
      rawMaterials={rawMaterials}
      formulas={formulas}
      products={products}
      suppliers={suppliers}
      recentProduction={recentProduction}
      formulaEmojis={{
        'سائل أطباق الليمون': '🍋',
        'منظف أرضيات اللافندر': '🧹',
        'منظف زجاج كريستال': '✨',
        'سائل ملابس عطر ليمون': '🧴',
        'منظف حمام كلور': '🚿',
      }}
    />
  );
}
