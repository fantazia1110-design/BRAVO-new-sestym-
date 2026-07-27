'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Beaker,
  Eye,
  Edit,
  Copy,
  History,
  FlaskConical,
  Sparkles,
} from 'lucide-react';
import { t, getLocalizedName } from '@/lib/localization';
import { formatCurrency, formatNumber } from '@/lib/utils';
import Badge, { getFormulaStatusBadge } from '@/components/ui/Badge';

interface Formula {
  id: string;
  code: string;
  name: string;
  category: string;
  categoryColor: string;
  emoji: string;
  description: string;
  baseBatchSize: string;
  batchUnit: string;
  targetPh?: string;
  status: 'draft' | 'testing' | 'approved' | 'archived';
  currentVersion: number;
  ingredientsCount: number;
  estimatedCost: string;
  products: string[];
}

// تركيبات حقيقية
const sampleFormulas: Formula[] = [
  // المنظفات
  {
    id: '1', code: 'FRM-001', name: 'تركيبة سائل أطباق الليمون',
    category: 'المنظفات', categoryColor: 'category-detergents', emoji: '🍋',
    description: 'سائل غسيل أطباق برغوة كثيفة وقوة تنظيف ممتازة برائحة الليمون المنعشة',
    baseBatchSize: '100', batchUnit: 'لتر', targetPh: '7.0',
    status: 'approved', currentVersion: 3, ingredientsCount: 8, estimatedCost: '4200',
    products: ['سائل أطباق الليمون 500مل', 'سائل أطباق الليمون 1 لتر'],
  },
  {
    id: '2', code: 'FRM-002', name: 'تركيبة سائل أطباق التفاح',
    category: 'المنظفات', categoryColor: 'category-detergents', emoji: '🍎',
    description: 'سائل غسيل أطباق بخلاصة التفاح الطبيعي',
    baseBatchSize: '100', batchUnit: 'لتر', targetPh: '7.0',
    status: 'approved', currentVersion: 2, ingredientsCount: 9, estimatedCost: '4500',
    products: ['سائل أطباق التفاح 1 لتر'],
  },
  {
    id: '3', code: 'FRM-003', name: 'تركيبة منظف أرضيات اللافندر',
    category: 'المنظفات', categoryColor: 'category-detergents', emoji: '💜',
    description: 'منظف أرضيات معطر برائحة اللافندر المهدئة',
    baseBatchSize: '100', batchUnit: 'لتر', targetPh: '8.0',
    status: 'approved', currentVersion: 1, ingredientsCount: 6, estimatedCost: '2800',
    products: ['منظف أرضيات اللافندر 1 لتر'],
  },
  {
    id: '4', code: 'FRM-004', name: 'تركيبة منظف زجاج كريستال',
    category: 'المنظفات', categoryColor: 'category-detergents', emoji: '✨',
    description: 'منظف زجاج شفاف بدون خطوط',
    baseBatchSize: '100', batchUnit: 'لتر', targetPh: '9.0',
    status: 'approved', currentVersion: 2, ingredientsCount: 5, estimatedCost: '2200',
    products: ['منظف زجاج كريستال 500مل'],
  },
  // العناية بالشعر
  {
    id: '5', code: 'FRM-005', name: 'تركيبة شامبو الكيراتين',
    category: 'العناية بالشعر', categoryColor: 'category-hair-care', emoji: '🧴',
    description: 'شامبو علاجي بالكيراتين لتقوية الشعر التالف',
    baseBatchSize: '100', batchUnit: 'كجم', targetPh: '5.5',
    status: 'approved', currentVersion: 4, ingredientsCount: 14, estimatedCost: '12500',
    products: ['شامبو الكيراتين 250مل'],
  },
  {
    id: '6', code: 'FRM-006', name: 'تركيبة شامبو الأرغان الفاخر',
    category: 'العناية بالشعر', categoryColor: 'category-hair-care', emoji: '🌰',
    description: 'شامبو فاخر بزيت الأرغان المغربي للشعر الجاف',
    baseBatchSize: '100', batchUnit: 'كجم', targetPh: '5.5',
    status: 'approved', currentVersion: 2, ingredientsCount: 16, estimatedCost: '18000',
    products: ['شامبو الأرغان الفاخر 500مل'],
  },
  {
    id: '7', code: 'FRM-007', name: 'تركيبة بلسم الحرير',
    category: 'العناية بالشعر', categoryColor: 'category-hair-care', emoji: '💫',
    description: 'بلسم مكثف لنعومة حريرية فائقة',
    baseBatchSize: '100', batchUnit: 'كجم', targetPh: '4.5',
    status: 'approved', currentVersion: 2, ingredientsCount: 12, estimatedCost: '15000',
    products: ['بلسم الحرير للشعر 300مل'],
  },
  // العناية بالبشرة
  {
    id: '8', code: 'FRM-008', name: 'تركيبة كريم الصبار المرطب',
    category: 'العناية بالبشرة', categoryColor: 'category-skin-care', emoji: '🌿',
    description: 'كريم مرطب طبيعي بخلاصة الصبار للبشرة الجافة',
    baseBatchSize: '50', batchUnit: 'كجم', targetPh: '5.0',
    status: 'approved', currentVersion: 3, ingredientsCount: 15, estimatedCost: '9500',
    products: ['كريم مرطب بالصبار 100مل'],
  },
  {
    id: '9', code: 'FRM-009', name: 'تركيبة كريم العسل لليدين',
    category: 'العناية بالبشرة', categoryColor: 'category-skin-care', emoji: '🍯',
    description: 'كريم مغذي لليدين بالعسل الطبيعي',
    baseBatchSize: '50', batchUnit: 'كجم', targetPh: '5.5',
    status: 'testing', currentVersion: 1, ingredientsCount: 12, estimatedCost: '8000',
    products: ['كريم اليدين بالعسل 50مل'],
  },
  // الصابون
  {
    id: '10', code: 'FRM-010', name: 'تركيبة صابون اللافندر الطبيعي',
    category: 'الصابون', categoryColor: 'category-soap', emoji: '🧼',
    description: 'صابون طبيعي بالطريقة الباردة مع زيت اللافندر',
    baseBatchSize: '50', batchUnit: 'كجم',
    status: 'approved', currentVersion: 2, ingredientsCount: 8, estimatedCost: '6000',
    products: ['صابون اللافندر الطبيعي 100جم'],
  },
  {
    id: '11', code: 'FRM-011', name: 'تركيبة صابون زيت الزيتون',
    category: 'الصابون', categoryColor: 'category-soap', emoji: '🫒',
    description: 'صابون نابلسي تقليدي بزيت الزيتون البكر',
    baseBatchSize: '50', batchUnit: 'كجم',
    status: 'approved', currentVersion: 1, ingredientsCount: 6, estimatedCost: '7500',
    products: ['صابون زيت الزيتون 100جم'],
  },
  // العطور
  {
    id: '12', code: 'FRM-012', name: 'تركيبة عطر الورد الدمشقي',
    category: 'العطور', categoryColor: 'category-perfumes', emoji: '🌹',
    description: 'عطر شرقي أنيق بخلاصة الورد الدمشقي الأصلي',
    baseBatchSize: '10', batchUnit: 'لتر',
    status: 'approved', currentVersion: 3, ingredientsCount: 18, estimatedCost: '25000',
    products: ['عطر الورد الدمشقي 50مل'],
  },
  {
    id: '13', code: 'FRM-013', name: 'تركيبة عطر العود الملكي',
    category: 'العطور', categoryColor: 'category-perfumes', emoji: '👑',
    description: 'عطر فاخر بدهن العود الكمبودي الأصلي',
    baseBatchSize: '5', batchUnit: 'لتر',
    status: 'testing', currentVersion: 1, ingredientsCount: 22, estimatedCost: '45000',
    products: ['عطر العود الملكي 30مل'],
  },
  // العناية الشخصية
  {
    id: '14', code: 'FRM-014', name: 'تركيبة صابون اليدين بالمسك',
    category: 'العناية الشخصية', categoryColor: 'category-personal-care', emoji: '🤲',
    description: 'صابون سائل لطيف على اليدين برائحة المسك',
    baseBatchSize: '100', batchUnit: 'كجم', targetPh: '6.0',
    status: 'approved', currentVersion: 2, ingredientsCount: 10, estimatedCost: '5500',
    products: ['صابون سائل لليدين بالمسك 250مل'],
  },
  {
    id: '15', code: 'FRM-015', name: 'تركيبة جل استحمام الياسمين',
    category: 'العناية الشخصية', categoryColor: 'category-personal-care', emoji: '🚿',
    description: 'جل استحمام منعش برائحة الياسمين العربي',
    baseBatchSize: '100', batchUnit: 'كجم', targetPh: '5.5',
    status: 'draft', currentVersion: 1, ingredientsCount: 11, estimatedCost: '7000',
    products: ['جل استحمام الياسمين 500مل'],
  },
  // مستحضرات التجميل
  {
    id: '16', code: 'FRM-016', name: 'تركيبة أحمر الشفاه الكلاسيكي',
    category: 'مستحضرات التجميل', categoryColor: 'category-cosmetics', emoji: '💄',
    description: 'أحمر شفاه كريمي طويل الأمد بألوان كلاسيكية',
    baseBatchSize: '5', batchUnit: 'كجم',
    status: 'testing', currentVersion: 1, ingredientsCount: 14, estimatedCost: '12000',
    products: ['أحمر شفاه كلاسيك أحمر 5جم'],
  },
];

// أقسام التركيبات
const categories = [
  { id: 'all', name: 'الكل', color: 'bg-gray-100 text-gray-700', count: sampleFormulas.length },
  { id: 'المنظفات', name: 'المنظفات', color: 'bg-blue-100 text-blue-700', emoji: '🧴', count: 4 },
  { id: 'العناية بالشعر', name: 'العناية بالشعر', color: 'bg-amber-100 text-amber-700', emoji: '💇', count: 3 },
  { id: 'العناية بالبشرة', name: 'العناية بالبشرة', color: 'bg-cyan-100 text-cyan-700', emoji: '✨', count: 2 },
  { id: 'الصابون', name: 'الصابون', color: 'bg-green-100 text-green-700', emoji: '🧼', count: 2 },
  { id: 'العطور', name: 'العطور', color: 'bg-purple-100 text-purple-700', emoji: '🌸', count: 2 },
  { id: 'العناية الشخصية', name: 'العناية الشخصية', color: 'bg-orange-100 text-orange-700', emoji: '🚿', count: 2 },
  { id: 'مستحضرات التجميل', name: 'مستحضرات التجميل', color: 'bg-pink-100 text-pink-700', emoji: '💄', count: 1 },
];

export default function FormulasPage() {
  const [formulas, setFormulas] = useState<Formula[]>(sampleFormulas);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState<string>('');

  // إحصائيات
  const totalFormulas = formulas.length;
  const approvedFormulas = formulas.filter((f) => f.status === 'approved').length;
  const testingFormulas = formulas.filter((f) => f.status === 'testing').length;
  const draftFormulas = formulas.filter((f) => f.status === 'draft').length;

  // فلترة التركيبات
  const filteredFormulas = formulas.filter((formula) => {
    if (selectedCategory !== 'all' && formula.category !== selectedCategory) return false;
    if (statusFilter && formula.status !== statusFilter) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      formula.name.toLowerCase().includes(query) ||
      formula.code.toLowerCase().includes(query) ||
      formula.description.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      {/* الهيدر */}
      <div className="page-header">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg">
            <Beaker className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">التركيبات</h1>
            <p className="text-[var(--text-secondary)] font-semibold">
              إدارة تركيبات ووصفات المنتجات
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/formula-lab" className="btn btn-outline btn-lg">
            <Sparkles size={20} />
            معمل التركيبات
          </Link>
          <Link href="/formulas/new" className="btn btn-primary btn-lg">
            <Plus size={20} />
            تركيبة جديدة
          </Link>
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">إجمالي التركيبات</p>
              <p className="stat-value">{totalFormulas}</p>
            </div>
            <div className="stat-icon bg-purple-100 text-purple-600">
              <Beaker size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">تركيبات معتمدة</p>
              <p className="stat-value text-green-600">{approvedFormulas}</p>
            </div>
            <div className="stat-icon bg-green-100 text-green-600">
              <Beaker size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">تحت الاختبار</p>
              <p className="stat-value text-orange-600">{testingFormulas}</p>
            </div>
            <div className="stat-icon bg-orange-100 text-orange-600">
              <FlaskConical size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">مسودات</p>
              <p className="stat-value text-gray-600">{draftFormulas}</p>
            </div>
            <div className="stat-icon bg-gray-100 text-gray-600">
              <Beaker size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* أقسام التركيبات */}
      <div className="mb-6">
        <h3 className="text-lg font-extrabold mb-4">تصفية حسب القسم</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[var(--primary)] text-white shadow-lg scale-105'
                  : `${cat.color} hover:scale-105`
              }`}
            >
              {cat.emoji && <span className="ml-2">{cat.emoji}</span>}
              {cat.name}
              <span className="mr-2 opacity-75">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* البحث والفلترة */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={22} />
              <input
                type="text"
                placeholder="🔍 ابحث عن تركيبة..."
                className="input pr-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="input w-48 font-bold"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">جميع الحالات</option>
              <option value="approved">✅ معتمدة</option>
              <option value="testing">🧪 تحت الاختبار</option>
              <option value="draft">📝 مسودة</option>
            </select>
          </div>
        </div>
      </div>

      {/* قائمة التركيبات */}
      <div className="grid grid-cols-2 gap-6">
        {filteredFormulas.map((formula) => (
          <div key={formula.id} className="card hover:shadow-xl transition-all">
            <div className="card-body">
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-2xl ${formula.categoryColor} flex items-center justify-center text-3xl shadow-lg`}>
                  {formula.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-extrabold">{formula.name}</h3>
                    {getFormulaStatusBadge(formula.status)}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
                    {formula.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="info">{formula.category}</Badge>
                    <Badge variant="primary">{formula.ingredientsCount} مكون</Badge>
                    <Badge variant="default">v{formula.currentVersion}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold">
                      حجم الدفعة: {formula.baseBatchSize} {formula.batchUnit}
                    </span>
                    <span className="font-bold text-green-600">
                      التكلفة: {formatCurrency(formula.estimatedCost)}
                    </span>
                  </div>
                  {formula.products.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[var(--border)]">
                      <p className="text-xs font-bold text-[var(--text-muted)] mb-1">المنتجات المرتبطة:</p>
                      <div className="flex flex-wrap gap-1">
                        {formula.products.map((product, i) => (
                          <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded font-semibold">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border)]">
                <Link href={`/formulas/${formula.id}`} className="btn btn-sm btn-outline flex-1">
                  <Eye size={16} />
                  عرض
                </Link>
                <Link href={`/formula-lab?id=${formula.id}`} className="btn btn-sm btn-primary flex-1">
                  <Sparkles size={16} />
                  فتح في المعمل
                </Link>
                <button className="btn btn-sm btn-ghost">
                  <Copy size={16} />
                </button>
                <Link href={`/formulas/${formula.id}/versions`} className="btn btn-sm btn-ghost">
                  <History size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFormulas.length === 0 && (
        <div className="empty-state">
          <Beaker className="empty-state-icon" />
          <p className="empty-state-title">لا توجد تركيبات</p>
          <p className="empty-state-description">لم يتم العثور على تركيبات تطابق البحث</p>
        </div>
      )}
    </div>
  );
}
