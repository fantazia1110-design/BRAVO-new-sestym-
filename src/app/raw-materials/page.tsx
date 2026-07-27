'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  FlaskConical,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  History,
  AlertTriangle,
} from 'lucide-react';
import { t, getLocalizedName } from '@/lib/localization';
import { formatCurrency, formatNumber } from '@/lib/utils';
import Badge, { getStockStatusBadge } from '@/components/ui/Badge';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';

interface RawMaterial {
  id: string;
  code: string;
  name: { ar: string; en?: string };
  scientificName?: string;
  inciName?: string;
  categoryName?: { ar: string };
  supplierName?: { ar: string };
  unitSymbol: string;
  currentPrice: string;
  currentQuantity: string;
  reservedQuantity: string;
  minStock: string;
  isActive: boolean;
}

// بيانات تجريبية
const sampleMaterials: RawMaterial[] = [
  {
    id: '1',
    code: 'RM-001',
    name: { ar: 'تكسابون (SLES)' },
    scientificName: 'Sodium Laureth Sulfate',
    inciName: 'SLES',
    categoryName: { ar: 'مواد فعالة سطحياً' },
    supplierName: { ar: 'شركة الكيماويات المصرية' },
    unitSymbol: 'كجم',
    currentPrice: '95.00',
    currentQuantity: '250.00',
    reservedQuantity: '50.00',
    minStock: '100.00',
    isActive: true,
  },
  {
    id: '2',
    code: 'RM-002',
    name: { ar: 'كوكاميدوبروبيل بيتين' },
    scientificName: 'Cocamidopropyl Betaine',
    inciName: 'CAPB',
    categoryName: { ar: 'مواد فعالة سطحياً' },
    supplierName: { ar: 'شركة الكيماويات المصرية' },
    unitSymbol: 'كجم',
    currentPrice: '120.00',
    currentQuantity: '80.00',
    reservedQuantity: '0.00',
    minStock: '50.00',
    isActive: true,
  },
  {
    id: '3',
    code: 'RM-003',
    name: { ar: 'جلسرين نباتي' },
    scientificName: 'Glycerin',
    inciName: 'Glycerin',
    categoryName: { ar: 'مرطبات' },
    supplierName: { ar: 'مصنع الزيوت النباتية' },
    unitSymbol: 'لتر',
    currentPrice: '45.00',
    currentQuantity: '500.00',
    reservedQuantity: '100.00',
    minStock: '200.00',
    isActive: true,
  },
  {
    id: '4',
    code: 'RM-004',
    name: { ar: 'مادة حافظة MIT' },
    scientificName: 'Methylisothiazolinone',
    inciName: 'MIT',
    categoryName: { ar: 'مواد حافظة' },
    supplierName: { ar: 'شركة المواد الكيميائية' },
    unitSymbol: 'كجم',
    currentPrice: '450.00',
    currentQuantity: '15.00',
    reservedQuantity: '5.00',
    minStock: '20.00',
    isActive: true,
  },
  {
    id: '5',
    code: 'RM-005',
    name: { ar: 'حمض الستريك' },
    scientificName: 'Citric Acid',
    inciName: 'Citric Acid',
    categoryName: { ar: 'منظمات pH' },
    supplierName: { ar: 'شركة الكيماويات المصرية' },
    unitSymbol: 'كجم',
    currentPrice: '35.00',
    currentQuantity: '300.00',
    reservedQuantity: '0.00',
    minStock: '100.00',
    isActive: true,
  },
  {
    id: '6',
    code: 'RM-006',
    name: { ar: 'ملح الطعام (كلوريد الصوديوم)' },
    scientificName: 'Sodium Chloride',
    inciName: 'Sodium Chloride',
    categoryName: { ar: 'مكثفات' },
    supplierName: { ar: 'شركة الملح المصرية' },
    unitSymbol: 'كجم',
    currentPrice: '8.00',
    currentQuantity: '1000.00',
    reservedQuantity: '200.00',
    minStock: '500.00',
    isActive: true,
  },
];

export default function RawMaterialsPage() {
  const [materials, setMaterials] = useState<RawMaterial[]>(sampleMaterials);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; material?: RawMaterial }>({
    open: false,
  });

  // فلترة المواد حسب البحث
  const filteredMaterials = materials.filter((material) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      getLocalizedName(material.name).toLowerCase().includes(query) ||
      material.code.toLowerCase().includes(query) ||
      material.scientificName?.toLowerCase().includes(query) ||
      material.inciName?.toLowerCase().includes(query)
    );
  });

  const columns = [
    {
      key: 'code',
      header: 'الكود',
      render: (item: RawMaterial) => (
        <span className="font-mono text-sm">{item.code}</span>
      ),
    },
    {
      key: 'name',
      header: 'اسم المادة',
      render: (item: RawMaterial) => (
        <div>
          <p className="font-medium">{getLocalizedName(item.name)}</p>
          {item.scientificName && (
            <p className="text-xs text-[var(--text-muted)]">{item.scientificName}</p>
          )}
        </div>
      ),
    },
    {
      key: 'category',
      header: 'التصنيف',
      render: (item: RawMaterial) => (
        <Badge variant="info">{getLocalizedName(item.categoryName)}</Badge>
      ),
    },
    {
      key: 'currentPrice',
      header: 'السعر',
      render: (item: RawMaterial) => (
        <span>{formatCurrency(item.currentPrice)}/{item.unitSymbol}</span>
      ),
    },
    {
      key: 'quantity',
      header: 'الكمية',
      render: (item: RawMaterial) => {
        const current = parseFloat(item.currentQuantity);
        const reserved = parseFloat(item.reservedQuantity);
        const available = current - reserved;
        const min = parseFloat(item.minStock);
        
        return (
          <div>
            <p className="font-medium">{formatNumber(current, 2)} {item.unitSymbol}</p>
            {reserved > 0 && (
              <p className="text-xs text-[var(--text-muted)]">
                محجوز: {formatNumber(reserved, 2)} | متاح: {formatNumber(available, 2)}
              </p>
            )}
          </div>
        );
      },
    },
    {
      key: 'status',
      header: 'الحالة',
      render: (item: RawMaterial) => {
        const current = parseFloat(item.currentQuantity);
        const reserved = parseFloat(item.reservedQuantity);
        const available = current - reserved;
        const min = parseFloat(item.minStock);
        
        return getStockStatusBadge(available, min);
      },
    },
    {
      key: 'actions',
      header: 'الإجراءات',
      render: (item: RawMaterial) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/raw-materials/${item.id}`}
            className="btn btn-sm btn-ghost"
            title="عرض التفاصيل"
          >
            <Eye size={16} />
          </Link>
          <Link
            href={`/raw-materials/${item.id}/edit`}
            className="btn btn-sm btn-ghost"
            title="تعديل"
          >
            <Edit size={16} />
          </Link>
          <Link
            href={`/raw-materials/${item.id}/prices`}
            className="btn btn-sm btn-ghost"
            title="سجل الأسعار"
          >
            <History size={16} />
          </Link>
          <button
            onClick={() => setDeleteModal({ open: true, material: item })}
            className="btn btn-sm btn-ghost text-red-600"
            title="حذف"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async () => {
    if (!deleteModal.material) return;
    
    // هنا يتم استدعاء API للحذف
    setMaterials(materials.filter(m => m.id !== deleteModal.material?.id));
    setDeleteModal({ open: false });
  };

  return (
    <div>
      {/* الهيدر */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">{t('raw_materials.title')}</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            إدارة المواد الخام والمكونات
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-outline">
            <Upload size={18} />
            استيراد
          </button>
          <button className="btn btn-outline">
            <Download size={18} />
            تصدير
          </button>
          <Link href="/raw-materials/new" className="btn btn-primary">
            <Plus size={18} />
            {t('raw_materials.add_new')}
          </Link>
        </div>
      </div>

      {/* البحث والفلترة */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
              <input
                type="text"
                placeholder="البحث بالاسم، الكود، الاسم العلمي..."
                className="input pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className={`btn ${showFilters ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              فلترة
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-[var(--border)]">
              <div className="input-group">
                <label className="input-label">التصنيف</label>
                <select className="input">
                  <option value="">الكل</option>
                  <option value="surfactants">مواد فعالة سطحياً</option>
                  <option value="moisturizers">مرطبات</option>
                  <option value="preservatives">مواد حافظة</option>
                  <option value="thickeners">مكثفات</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">المورد</label>
                <select className="input">
                  <option value="">الكل</option>
                  <option value="1">شركة الكيماويات المصرية</option>
                  <option value="2">مصنع الزيوت النباتية</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">حالة المخزون</label>
                <select className="input">
                  <option value="">الكل</option>
                  <option value="available">متوفر</option>
                  <option value="low">منخفض</option>
                  <option value="out">نفذ</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="btn btn-ghost">إعادة تعيين</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <FlaskConical size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{materials.length}</p>
              <p className="text-sm text-[var(--text-secondary)]">إجمالي المواد</p>
            </div>
          </div>
        </div>
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <FlaskConical size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {materials.filter(m => parseFloat(m.currentQuantity) > parseFloat(m.minStock)).length}
              </p>
              <p className="text-sm text-[var(--text-secondary)]">مخزون كافٍ</p>
            </div>
          </div>
        </div>
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {materials.filter(m => {
                  const available = parseFloat(m.currentQuantity) - parseFloat(m.reservedQuantity);
                  return available <= parseFloat(m.minStock) && available > 0;
                }).length}
              </p>
              <p className="text-sm text-[var(--text-secondary)]">مخزون منخفض</p>
            </div>
          </div>
        </div>
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {materials.filter(m => parseFloat(m.currentQuantity) <= 0).length}
              </p>
              <p className="text-sm text-[var(--text-secondary)]">نفذ المخزون</p>
            </div>
          </div>
        </div>
      </div>

      {/* جدول المواد الخام */}
      <div className="card">
        <DataTable
          columns={columns}
          data={filteredMaterials}
          keyExtractor={(item) => item.id}
          isLoading={isLoading}
          emptyMessage="لا توجد مواد خام"
        />
      </div>

      {/* مودال تأكيد الحذف */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false })}
        title="تأكيد الحذف"
        footer={
          <>
            <button className="btn btn-danger" onClick={handleDelete}>
              حذف
            </button>
            <button
              className="btn btn-outline"
              onClick={() => setDeleteModal({ open: false })}
            >
              إلغاء
            </button>
          </>
        }
      >
        <p>
          هل أنت متأكد من حذف المادة الخام{' '}
          <strong>{getLocalizedName(deleteModal.material?.name)}</strong>؟
        </p>
        <p className="text-sm text-[var(--text-muted)] mt-2">
          لا يمكن التراجع عن هذا الإجراء.
        </p>
      </Modal>
    </div>
  );
}
