'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Warehouse,
  Package,
  FlaskConical,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import { t } from '@/lib/localization';
import { formatCurrency, formatNumber } from '@/lib/utils';
import Badge, { getStockStatusBadge } from '@/components/ui/Badge';

interface InventoryItem {
  id: string;
  type: 'raw_material' | 'product' | 'packaging';
  code: string;
  name: string;
  currentQuantity: number;
  reservedQuantity: number;
  minStock: number;
  unit: string;
  unitPrice: number;
  totalValue: number;
  lastMovement?: {
    type: 'in' | 'out';
    quantity: number;
    date: string;
  };
}

// بيانات تجريبية
const sampleInventory: InventoryItem[] = [
  {
    id: '1',
    type: 'raw_material',
    code: 'RM-001',
    name: 'تكسابون (SLES)',
    currentQuantity: 250,
    reservedQuantity: 50,
    minStock: 100,
    unit: 'كجم',
    unitPrice: 95,
    totalValue: 23750,
    lastMovement: { type: 'in', quantity: 100, date: '2026-01-14' },
  },
  {
    id: '2',
    type: 'raw_material',
    code: 'RM-002',
    name: 'كوكاميدوبروبيل بيتين',
    currentQuantity: 80,
    reservedQuantity: 0,
    minStock: 50,
    unit: 'كجم',
    unitPrice: 120,
    totalValue: 9600,
    lastMovement: { type: 'out', quantity: 20, date: '2026-01-15' },
  },
  {
    id: '3',
    type: 'raw_material',
    code: 'RM-003',
    name: 'جلسرين نباتي',
    currentQuantity: 500,
    reservedQuantity: 100,
    minStock: 200,
    unit: 'لتر',
    unitPrice: 45,
    totalValue: 22500,
  },
  {
    id: '4',
    type: 'raw_material',
    code: 'RM-004',
    name: 'مادة حافظة MIT',
    currentQuantity: 15,
    reservedQuantity: 5,
    minStock: 20,
    unit: 'كجم',
    unitPrice: 450,
    totalValue: 6750,
    lastMovement: { type: 'out', quantity: 2, date: '2026-01-15' },
  },
  {
    id: '5',
    type: 'product',
    code: 'PRD-001',
    name: 'شامبو العناية 250مل',
    currentQuantity: 500,
    reservedQuantity: 100,
    minStock: 200,
    unit: 'قطعة',
    unitPrice: 35,
    totalValue: 17500,
    lastMovement: { type: 'in', quantity: 200, date: '2026-01-15' },
  },
  {
    id: '6',
    type: 'product',
    code: 'PRD-002',
    name: 'سائل أطباق 500مل',
    currentQuantity: 1200,
    reservedQuantity: 0,
    minStock: 500,
    unit: 'قطعة',
    unitPrice: 18,
    totalValue: 21600,
  },
  {
    id: '7',
    type: 'packaging',
    code: 'PKG-001',
    name: 'عبوة بلاستيك 250مل',
    currentQuantity: 2000,
    reservedQuantity: 500,
    minStock: 1000,
    unit: 'قطعة',
    unitPrice: 2.5,
    totalValue: 5000,
  },
  {
    id: '8',
    type: 'packaging',
    code: 'PKG-002',
    name: 'غطاء فليب توب',
    currentQuantity: 1800,
    reservedQuantity: 300,
    minStock: 1000,
    unit: 'قطعة',
    unitPrice: 1.2,
    totalValue: 2160,
  },
];

const tabs = [
  { id: 'all', label: 'الكل', icon: Warehouse },
  { id: 'raw_material', label: 'المواد الخام', icon: FlaskConical },
  { id: 'product', label: 'المنتجات', icon: Package },
  { id: 'packaging', label: 'التعبئة', icon: Package },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(sampleInventory);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // إحصائيات
  const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockCount = inventory.filter(
    (item) => item.currentQuantity - item.reservedQuantity <= item.minStock
  ).length;
  const rawMaterialsValue = inventory
    .filter((item) => item.type === 'raw_material')
    .reduce((sum, item) => sum + item.totalValue, 0);
  const productsValue = inventory
    .filter((item) => item.type === 'product')
    .reduce((sum, item) => sum + item.totalValue, 0);

  // فلترة المخزون
  const filteredInventory = inventory.filter((item) => {
    if (activeTab !== 'all' && item.type !== activeTab) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.code.toLowerCase().includes(query)
    );
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'raw_material':
        return <FlaskConical size={16} className="text-blue-600" />;
      case 'product':
        return <Package size={16} className="text-green-600" />;
      case 'packaging':
        return <Package size={16} className="text-purple-600" />;
      default:
        return <Warehouse size={16} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'raw_material':
        return 'مادة خام';
      case 'product':
        return 'منتج';
      case 'packaging':
        return 'تعبئة';
      default:
        return type;
    }
  };

  return (
    <div>
      {/* الهيدر */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('inventory.title')}</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            إدارة المخزون وحركات المستودع
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/inventory/movements" className="btn btn-outline">
            حركات المخزون
          </Link>
          <Link href="/inventory/add" className="btn btn-primary">
            <Plus size={18} />
            إضافة حركة
          </Link>
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Warehouse size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
              <p className="text-sm text-[var(--text-secondary)]">قيمة المخزون</p>
            </div>
          </div>
        </div>
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <FlaskConical size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(rawMaterialsValue)}</p>
              <p className="text-sm text-[var(--text-secondary)]">المواد الخام</p>
            </div>
          </div>
        </div>
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <Package size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(productsValue)}</p>
              <p className="text-sm text-[var(--text-secondary)]">المنتجات</p>
            </div>
          </div>
        </div>
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{lowStockCount}</p>
              <p className="text-sm text-[var(--text-secondary)]">مخزون منخفض</p>
            </div>
          </div>
        </div>
      </div>

      {/* التبويبات */}
      <div className="tabs mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* البحث */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
            <input
              type="text"
              placeholder="البحث بالاسم أو الكود..."
              className="input pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* جدول المخزون */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>الصنف</th>
                <th>النوع</th>
                <th>الكمية</th>
                <th>المحجوز</th>
                <th>المتاح</th>
                <th>الحالة</th>
                <th>القيمة</th>
                <th>آخر حركة</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => {
                const available = item.currentQuantity - item.reservedQuantity;
                const isLowStock = available <= item.minStock;

                return (
                  <tr key={item.id} className={isLowStock ? 'bg-orange-50' : ''}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--surface-hover)] flex items-center justify-center">
                          {getTypeIcon(item.type)}
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-[var(--text-muted)] font-mono">{item.code}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge variant={item.type === 'raw_material' ? 'info' : item.type === 'product' ? 'success' : 'primary'}>
                        {getTypeLabel(item.type)}
                      </Badge>
                    </td>
                    <td className="font-medium">
                      {formatNumber(item.currentQuantity, 0)} {item.unit}
                    </td>
                    <td className="text-orange-600">
                      {item.reservedQuantity > 0 ? `${formatNumber(item.reservedQuantity, 0)} ${item.unit}` : '-'}
                    </td>
                    <td className="font-medium">
                      {formatNumber(available, 0)} {item.unit}
                    </td>
                    <td>
                      {getStockStatusBadge(available, item.minStock)}
                    </td>
                    <td className="font-medium">
                      {formatCurrency(item.totalValue)}
                    </td>
                    <td>
                      {item.lastMovement ? (
                        <div className="flex items-center gap-2 text-sm">
                          {item.lastMovement.type === 'in' ? (
                            <ArrowDownLeft size={16} className="text-green-600" />
                          ) : (
                            <ArrowUpRight size={16} className="text-red-600" />
                          )}
                          <span className={item.lastMovement.type === 'in' ? 'text-green-600' : 'text-red-600'}>
                            {item.lastMovement.quantity} {item.unit}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[var(--text-muted)]">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
