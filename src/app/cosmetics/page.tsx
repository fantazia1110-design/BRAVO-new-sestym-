'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import SectionPage from '@/components/ui/SectionPage';

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

export default function CosmeticsPage() {
  return (
    <SectionPage
      section={SECTION}
      rawMaterials={rawMaterials}
      formulas={formulas}
      products={products}
      suppliers={suppliers}
      recentProduction={recentProduction}
      formulaEmojis={{
        'كريم مرطب بالصبار': '🌿',
        'سيروم فيتامين C': '🍊',
        'أحمر شفاه مات': '💋',
        'ماسك شمع العسل': '🍯',
        'كريم واقي شمس': '☀️',
        'تونر حمض الهيالورونيك': '💧',
      }}
    />
  );
}
