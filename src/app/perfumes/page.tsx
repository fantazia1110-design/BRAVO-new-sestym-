'use client';

import React from 'react';
import { FlaskConical } from 'lucide-react';
import SectionPage from '@/components/ui/SectionPage';

const SECTION = {
  id: 'perfumes',
  name: 'العطور',
  description: 'عطور فاخرة بتركيبات فرانكو-عربية فريدة',
  image: '/icons/real-perfumes.jpg',
  color: '#7c3aed',
  colorLight: '#8b5cf6',
  icon: <FlaskConical size={24} />,
};

const rawMaterials = [
  { name: 'عطر اللافندر', stock: 3, unit: 'كجم', min: 10, status: 'منخفض' },
  { name: 'مسك أبيض', stock: 20, unit: 'كجم', min: 8, status: 'متوفر' },
  { name: 'عود كمبودي', stock: 12, unit: 'كجم', min: 5, status: 'متوفر' },
  { name: 'عطر الورد الدمشقي', stock: 8, unit: 'لتر', min: 10, status: 'منخفض' },
  { name: 'كحول عطري', stock: 100, unit: 'لتر', min: 30, status: 'متوفر' },
  { name: 'عنبر رمادي', stock: 6, unit: 'كجم', min: 4, status: 'متوفر' },
  { name: 'صندل أبيض', stock: 15, unit: 'كجم', min: 8, status: 'متوفر' },
  { name: 'فانيليا', stock: 10, unit: 'لتر', min: 5, status: 'متوفر' },
  { name: 'بتشولي', stock: 7, unit: 'لتر', min: 8, status: 'منخفض' },
];

const formulas = [
  { name: 'عطر الورد الملكي', status: 'معتمدة', ingredients: 15, category: 'نسائي فاخر' },
  { name: 'عود ومسك', status: 'معتمدة', ingredients: 12, category: 'رجالي شرقي' },
  { name: 'لافندر فرانكو', status: 'تحت الاختبار', ingredients: 10, category: 'فرانكو عربي' },
  { name: 'بخور العود الفاخر', status: 'معتمدة', ingredients: 8, category: 'بخرات' },
  { name: 'معطر جو ياسمين', status: 'مسودة', ingredients: 6, category: 'معطرات جو' },
];

const products = [
  { name: 'عطر الورد الملكي 50مل', price: 90, stock: 180, category: 'نسائي فاخر' },
  { name: 'عود ومسك 100مل', price: 120, stock: 100, category: 'رجالي شرقي' },
  { name: 'لافندر فرانكو 50مل', price: 85, stock: 60, category: 'فرانكو عربي' },
  { name: 'بخور العود الفاخر 50جم', price: 45, stock: 250, category: 'بخرات' },
  { name: 'معطر جو ياسمين 500مل', price: 35, stock: 300, category: 'معطرات جو' },
  { name: 'عطر الورد الملكي 100مل', price: 160, stock: 80, category: 'نسائي فاخر' },
  { name: 'عود ومسك 50مل', price: 65, stock: 150, category: 'رجالي شرقي' },
  { name: 'مسك وعنبر 30مل', price: 55, stock: 120, category: 'رجالي شرقي' },
];

const suppliers = [
  { name: 'شركة العطور الشرقية', material: 'عود كمبودي', phone: '01034567890' },
  { name: 'مؤسسة المسك والعنبر', material: 'مسك أبيض', phone: '01176543210' },
  { name: 'موردو الزيوت العطرية', material: 'عطر اللافندر', phone: '01256789012' },
  { name: 'شركة الصندل الدولية', material: 'صندل أبيض', phone: '01589012345' },
];

const recentProduction = [
  { batch: 'PRF-2026-001', product: 'عطر الورد الملكي', qty: '200 زجاجة', status: 'مكتمل', progress: 100 },
  { batch: 'PRF-2026-002', product: 'عود ومسك', qty: '150 زجاجة', status: 'جاري', progress: 45 },
  { batch: 'PRF-2026-003', product: 'بخور العود الفاخر', qty: '500 علبة', status: 'فحص جودة', progress: 85 },
];

export default function PerfumesPage() {
  return (
    <SectionPage
      section={SECTION}
      rawMaterials={rawMaterials}
      formulas={formulas}
      products={products}
      suppliers={suppliers}
      recentProduction={recentProduction}
      formulaEmojis={{
        'عطر الورد الملكي': '🌹',
        'عود ومسك': '🪵',
        'لافندر فرانكو': '💜',
        'بخور العود الفاخر': '🪔',
        'معطر جو ياسمين': '🌸',
      }}
    />
  );
}
