'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Package,
  Eye,
  Edit,
  Barcode,
  TrendingUp,
  Filter,
} from 'lucide-react';
import { t, getLocalizedName } from '@/lib/localization';
import { formatCurrency, formatNumber } from '@/lib/utils';
import Badge, { getStockStatusBadge } from '@/components/ui/Badge';
import DataTable from '@/components/ui/DataTable';

interface Product {
  id: string;
  code: string;
  sku: string;
  name: string;
  category: string;
  categoryColor: string;
  emoji: string;
  formula: string;
  packageSize: string;
  packageUnit: string;
  productionCost: string;
  wholesalePrice: string;
  retailPrice: string;
  currentQuantity: string;
  minStock: string;
  isActive: boolean;
}

// منتجات حقيقية مع أسمائها
const sampleProducts: Product[] = [
  // المنظفات
  {
    id: '1', code: 'PRD-001', sku: 'DSH-LMN-500',
    name: 'سائل أطباق الليمون 500مل', category: 'المنظفات', categoryColor: 'bg-blue-100 text-blue-700',
    emoji: '🍋', formula: 'تركيبة سائل أطباق الليمون',
    packageSize: '500', packageUnit: 'مل',
    productionCost: '8.50', wholesalePrice: '14.00', retailPrice: '18.00',
    currentQuantity: '1200', minStock: '500', isActive: true,
  },
  {
    id: '2', code: 'PRD-002', sku: 'DSH-APL-1L',
    name: 'سائل أطباق التفاح 1 لتر', category: 'المنظفات', categoryColor: 'bg-blue-100 text-blue-700',
    emoji: '🍎', formula: 'تركيبة سائل أطباق التفاح',
    packageSize: '1000', packageUnit: 'مل',
    productionCost: '15.00', wholesalePrice: '24.00', retailPrice: '32.00',
    currentQuantity: '800', minStock: '300', isActive: true,
  },
  {
    id: '3', code: 'PRD-003', sku: 'FLR-LVD-1L',
    name: 'منظف أرضيات اللافندر 1 لتر', category: 'المنظفات', categoryColor: 'bg-blue-100 text-blue-700',
    emoji: '💜', formula: 'تركيبة منظف أرضيات',
    packageSize: '1000', packageUnit: 'مل',
    productionCost: '10.00', wholesalePrice: '18.00', retailPrice: '25.00',
    currentQuantity: '600', minStock: '250', isActive: true,
  },
  {
    id: '4', code: 'PRD-004', sku: 'GLS-CLR-500',
    name: 'منظف زجاج كريستال 500مل', category: 'المنظفات', categoryColor: 'bg-blue-100 text-blue-700',
    emoji: '✨', formula: 'تركيبة منظف زجاج',
    packageSize: '500', packageUnit: 'مل',
    productionCost: '7.00', wholesalePrice: '12.00', retailPrice: '16.00',
    currentQuantity: '900', minStock: '400', isActive: true,
  },
  // العناية بالشعر
  {
    id: '5', code: 'PRD-005', sku: 'SHP-KRT-250',
    name: 'شامبو الكيراتين 250مل', category: 'العناية بالشعر', categoryColor: 'bg-amber-100 text-amber-700',
    emoji: '🧴', formula: 'تركيبة شامبو الكيراتين',
    packageSize: '250', packageUnit: 'مل',
    productionCost: '12.50', wholesalePrice: '25.00', retailPrice: '35.00',
    currentQuantity: '500', minStock: '200', isActive: true,
  },
  {
    id: '6', code: 'PRD-006', sku: 'SHP-ARG-500',
    name: 'شامبو الأرغان الفاخر 500مل', category: 'العناية بالشعر', categoryColor: 'bg-amber-100 text-amber-700',
    emoji: '🌰', formula: 'تركيبة شامبو الأرغان',
    packageSize: '500', packageUnit: 'مل',
    productionCost: '22.00', wholesalePrice: '40.00', retailPrice: '55.00',
    currentQuantity: '350', minStock: '150', isActive: true,
  },
  {
    id: '7', code: 'PRD-007', sku: 'CND-SLK-300',
    name: 'بلسم الحرير للشعر 300مل', category: 'العناية بالشعر', categoryColor: 'bg-amber-100 text-amber-700',
    emoji: '💫', formula: 'تركيبة بلسم الحرير',
    packageSize: '300', packageUnit: 'مل',
    productionCost: '18.00', wholesalePrice: '32.00', retailPrice: '45.00',
    currentQuantity: '280', minStock: '120', isActive: true,
  },
  // العناية بالبشرة
  {
    id: '8', code: 'PRD-008', sku: 'CRM-ALO-100',
    name: 'كريم مرطب بالصبار 100مل', category: 'العناية بالبشرة', categoryColor: 'bg-cyan-100 text-cyan-700',
    emoji: '🌿', formula: 'تركيبة كريم الصبار',
    packageSize: '100', packageUnit: 'مل',
    productionCost: '15.00', wholesalePrice: '35.00', retailPrice: '45.00',
    currentQuantity: '420', minStock: '180', isActive: true,
  },
  {
    id: '9', code: 'PRD-009', sku: 'CRM-HNY-50',
    name: 'كريم اليدين بالعسل 50مل', category: 'العناية بالبشرة', categoryColor: 'bg-cyan-100 text-cyan-700',
    emoji: '🍯', formula: 'تركيبة كريم العسل',
    packageSize: '50', packageUnit: 'مل',
    productionCost: '10.00', wholesalePrice: '22.00', retailPrice: '30.00',
    currentQuantity: '550', minStock: '200', isActive: true,
  },
  // الصابون
  {
    id: '10', code: 'PRD-010', sku: 'SOP-LVD-100',
    name: 'صابون اللافندر الطبيعي 100جم', category: 'الصابون', categoryColor: 'bg-green-100 text-green-700',
    emoji: '🧼', formula: 'تركيبة صابون اللافندر',
    packageSize: '100', packageUnit: 'جم',
    productionCost: '8.00', wholesalePrice: '20.00', retailPrice: '30.00',
    currentQuantity: '680', minStock: '300', isActive: true,
  },
  {
    id: '11', code: 'PRD-011', sku: 'SOP-OLV-100',
    name: 'صابون زيت الزيتون 100جم', category: 'الصابون', categoryColor: 'bg-green-100 text-green-700',
    emoji: '🫒', formula: 'تركيبة صابون الزيتون',
    packageSize: '100', packageUnit: 'جم',
    productionCost: '12.00', wholesalePrice: '28.00', retailPrice: '38.00',
    currentQuantity: '450', minStock: '200', isActive: true,
  },
  // العطور
  {
    id: '12', code: 'PRD-012', sku: 'PRF-RSE-50',
    name: 'عطر الورد الدمشقي 50مل', category: 'العطور', categoryColor: 'bg-purple-100 text-purple-700',
    emoji: '🌹', formula: 'تركيبة عطر الورد',
    packageSize: '50', packageUnit: 'مل',
    productionCost: '45.00', wholesalePrice: '75.00', retailPrice: '90.00',
    currentQuantity: '180', minStock: '80', isActive: true,
  },
  {
    id: '13', code: 'PRD-013', sku: 'PRF-OUD-30',
    name: 'عطر العود الملكي 30مل', category: 'العطور', categoryColor: 'bg-purple-100 text-purple-700',
    emoji: '👑', formula: 'تركيبة عطر العود',
    packageSize: '30', packageUnit: 'مل',
    productionCost: '80.00', wholesalePrice: '150.00', retailPrice: '180.00',
    currentQuantity: '120', minStock: '50', isActive: true,
  },
  // العناية الشخصية
  {
    id: '14', code: 'PRD-014', sku: 'HSP-MSK-250',
    name: 'صابون سائل لليدين بالمسك 250مل', category: 'العناية الشخصية', categoryColor: 'bg-orange-100 text-orange-700',
    emoji: '🤲', formula: 'تركيبة صابون اليدين',
    packageSize: '250', packageUnit: 'مل',
    productionCost: '9.00', wholesalePrice: '16.00', retailPrice: '22.00',
    currentQuantity: '750', minStock: '300', isActive: true,
  },
  {
    id: '15', code: 'PRD-015', sku: 'BWS-JAS-500',
    name: 'جل استحمام الياسمين 500مل', category: 'العناية الشخصية', categoryColor: 'bg-orange-100 text-orange-700',
    emoji: '🚿', formula: 'تركيبة جل الاستحمام',
    packageSize: '500', packageUnit: 'مل',
    productionCost: '14.00', wholesalePrice: '28.00', retailPrice: '38.00',
    currentQuantity: '420', minStock: '180', isActive: true,
  },
  // مستحضرات التجميل
  {
    id: '16', code: 'PRD-016', sku: 'LPS-RED-5',
    name: 'أحمر شفاه كلاسيك أحمر 5جم', category: 'مستحضرات التجميل', categoryColor: 'bg-pink-100 text-pink-700',
    emoji: '💄', formula: 'تركيبة أحمر الشفاه',
    packageSize: '5', packageUnit: 'جم',
    productionCost: '18.00', wholesalePrice: '45.00', retailPrice: '60.00',
    currentQuantity: '320', minStock: '150', isActive: true,
  },
];

// أقسام المنتجات مع الألوان
const categories = [
  { id: 'all', name: 'الكل', color: 'bg-gray-100 text-gray-700', count: sampleProducts.length },
  { id: 'المنظفات', name: 'المنظفات', color: 'bg-blue-100 text-blue-700', emoji: '🧴', count: 4 },
  { id: 'العناية بالشعر', name: 'العناية بالشعر', color: 'bg-amber-100 text-amber-700', emoji: '💇', count: 3 },
  { id: 'العناية بالبشرة', name: 'العناية بالبشرة', color: 'bg-cyan-100 text-cyan-700', emoji: '✨', count: 2 },
  { id: 'الصابون', name: 'الصابون', color: 'bg-green-100 text-green-700', emoji: '🧼', count: 2 },
  { id: 'العطور', name: 'العطور', color: 'bg-purple-100 text-purple-700', emoji: '🌸', count: 2 },
  { id: 'العناية الشخصية', name: 'العناية الشخصية', color: 'bg-orange-100 text-orange-700', emoji: '🚿', count: 2 },
  { id: 'مستحضرات التجميل', name: 'مستحضرات التجميل', color: 'bg-pink-100 text-pink-700', emoji: '💄', count: 1 },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // إحصائيات
  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, p) => sum + parseFloat(p.currentQuantity) * parseFloat(p.productionCost),
    0
  );
  const lowStockCount = products.filter(
    (p) => parseFloat(p.currentQuantity) <= parseFloat(p.minStock)
  ).length;
  const totalUnits = products.reduce((sum, p) => sum + parseFloat(p.currentQuantity), 0);

  // فلترة المنتجات
  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.code.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      {/* الهيدر */}
      <div className="page-header">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <Package className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">المنتجات</h1>
            <p className="text-[var(--text-secondary)] font-semibold">
              إدارة المنتجات النهائية
            </p>
          </div>
        </div>
        <Link href="/products/new" className="btn btn-primary btn-lg">
          <Plus size={20} />
          إضافة منتج جديد
        </Link>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">إجمالي المنتجات</p>
              <p className="stat-value">{totalProducts}</p>
            </div>
            <div className="stat-icon bg-green-100 text-green-600">
              <Package size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">إجمالي الوحدات</p>
              <p className="stat-value">{formatNumber(totalUnits, 0)}</p>
            </div>
            <div className="stat-icon bg-blue-100 text-blue-600">
              <Package size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">قيمة المخزون</p>
              <p className="stat-value text-2xl">{formatCurrency(totalValue)}</p>
            </div>
            <div className="stat-icon bg-purple-100 text-purple-600">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">مخزون منخفض</p>
              <p className="stat-value text-orange-600">{lowStockCount}</p>
            </div>
            <div className="stat-icon bg-orange-100 text-orange-600">
              <Package size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* أقسام المنتجات */}
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

      {/* البحث */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={22} />
            <input
              type="text"
              placeholder="🔍 ابحث عن منتج بالاسم أو الكود أو SKU..."
              className="input pr-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* شبكة المنتجات */}
      <div className="grid grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const current = parseFloat(product.currentQuantity);
          const min = parseFloat(product.minStock);
          const cost = parseFloat(product.productionCost);
          const retail = parseFloat(product.retailPrice);
          const margin = ((retail - cost) / cost * 100).toFixed(0);

          return (
            <div key={product.id} className="product-card">
              <div className={`product-card-image ${product.categoryColor}`}>
                <span className="relative z-10">{product.emoji}</span>
                <div className="absolute top-3 right-3">
                  <span className={`badge ${product.categoryColor} text-xs font-bold`}>
                    {product.category}
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  {getStockStatusBadge(current, min)}
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title line-clamp-2">{product.name}</h3>
                <p className="text-sm text-[var(--text-muted)] font-semibold mb-2">
                  {product.packageSize} {product.packageUnit}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <p className="product-card-price">{formatCurrency(product.retailPrice)}</p>
                  <Badge variant="success">ربح {margin}%</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-muted)] font-semibold">
                    المخزون: {formatNumber(current, 0)}
                  </span>
                  <span className="text-[var(--text-muted)] font-semibold">
                    {product.code}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link href={`/products/${product.id}`} className="btn btn-sm btn-outline flex-1">
                    <Eye size={16} />
                    عرض
                  </Link>
                  <Link href={`/products/${product.id}/edit`} className="btn btn-sm btn-primary flex-1">
                    <Edit size={16} />
                    تعديل
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-state">
          <Package className="empty-state-icon" />
          <p className="empty-state-title">لا توجد منتجات</p>
          <p className="empty-state-description">لم يتم العثور على منتجات تطابق البحث</p>
        </div>
      )}
    </div>
  );
}
