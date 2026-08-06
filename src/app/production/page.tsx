'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Factory,
  Play,
  Pause,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
} from 'lucide-react';
import { t } from '@/lib/localization';
import { formatCurrency, formatNumber, formatDate } from '@/lib/utils';
import Badge, { getProductionStatusBadge } from '@/components/ui/Badge';
import DataTable from '@/components/ui/DataTable';

interface ProductionBatch {
  id: string;
  batchNumber: string;
  product: { ar: string };
  formulaVersion: string;
  plannedQuantity: string;
  actualQuantity?: string;
  unit: string;
  wastage?: string;
  status: 'draft' | 'planned' | 'in_progress' | 'quality_check' | 'completed' | 'cancelled';
  plannedStartDate?: string;
  actualStartDate?: string;
  actualEndDate?: string;
  totalCost: string;
  costPerUnit: string;
  assignedTo?: string;
}

// بيانات تجريبية
const sampleBatches: ProductionBatch[] = [
  {
    id: '1',
    batchNumber: 'PRD-2026-001',
    product: { ar: 'شامبو العناية بالشعر' },
    formulaVersion: 'v2.1',
    plannedQuantity: '500',
    actualQuantity: '485',
    unit: 'كجم',
    wastage: '15',
    status: 'completed',
    plannedStartDate: '2026-01-14',
    actualStartDate: '2026-01-14',
    actualEndDate: '2026-01-15',
    totalCost: '12500',
    costPerUnit: '25.77',
    assignedTo: 'أحمد محمد',
  },
  {
    id: '2',
    batchNumber: 'PRD-2026-002',
    product: { ar: 'سائل أطباق الليمون' },
    formulaVersion: 'v1.3',
    plannedQuantity: '1000',
    actualQuantity: '970',
    unit: 'لتر',
    wastage: '30',
    status: 'completed',
    plannedStartDate: '2026-01-13',
    actualStartDate: '2026-01-13',
    actualEndDate: '2026-01-14',
    totalCost: '18500',
    costPerUnit: '19.07',
    assignedTo: 'محمود علي',
  },
  {
    id: '3',
    batchNumber: 'PRD-2026-003',
    product: { ar: 'منظف أرضيات' },
    formulaVersion: 'v1.0',
    plannedQuantity: '750',
    unit: 'لتر',
    status: 'in_progress',
    plannedStartDate: '2026-01-15',
    actualStartDate: '2026-01-15',
    totalCost: '9800',
    costPerUnit: '13.07',
    assignedTo: 'خالد سعيد',
  },
  {
    id: '4',
    batchNumber: 'PRD-2026-004',
    product: { ar: 'صابون سائل لليدين' },
    formulaVersion: 'v2.0',
    plannedQuantity: '300',
    unit: 'كجم',
    status: 'quality_check',
    plannedStartDate: '2026-01-15',
    actualStartDate: '2026-01-15',
    totalCost: '7200',
    costPerUnit: '24.00',
    assignedTo: 'أحمد محمد',
  },
  {
    id: '5',
    batchNumber: 'PRD-2026-005',
    product: { ar: 'معطر جو' },
    formulaVersion: 'v1.2',
    plannedQuantity: '200',
    unit: 'لتر',
    status: 'planned',
    plannedStartDate: '2026-01-16',
    totalCost: '5500',
    costPerUnit: '27.50',
    assignedTo: 'محمود علي',
  },
  {
    id: '6',
    batchNumber: 'PRD-2026-006',
    product: { ar: 'بلسم الشعر' },
    formulaVersion: 'v1.0',
    plannedQuantity: '250',
    unit: 'كجم',
    status: 'draft',
    totalCost: '8000',
    costPerUnit: '32.00',
  },
];

export default function ProductionPage() {
  const [batches, setBatches] = useState<ProductionBatch[]>(sampleBatches);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  // إحصائيات
  const totalBatches = batches.length;
  const inProgress = batches.filter((b) => b.status === 'in_progress').length;
  const completed = batches.filter((b) => b.status === 'completed').length;
  const totalProduced = batches
    .filter((b) => b.status === 'completed')
    .reduce((sum, b) => sum + parseFloat(b.actualQuantity || '0'), 0);

  // فلترة الدفعات
  const filteredBatches = batches.filter((batch) => {
    if (statusFilter && batch.status !== statusFilter) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      batch.batchNumber.toLowerCase().includes(query) ||
      batch.product.ar.includes(query)
    );
  });

  const columns = [
    {
      key: 'batchNumber',
      header: 'رقم الدفعة',
      render: (item: ProductionBatch) => (
        <Link href={`/production/${item.id}`} className="font-mono text-sm text-[var(--primary)] hover:underline">
          {item.batchNumber}
        </Link>
      ),
    },
    {
      key: 'product',
      header: 'المنتج',
      render: (item: ProductionBatch) => (
        <div>
          <p className="font-medium">{item.product.ar}</p>
          <p className="text-xs text-[var(--text-muted)]">إصدار التركيبة: {item.formulaVersion}</p>
        </div>
      ),
    },
    {
      key: 'quantity',
      header: 'الكمية',
      render: (item: ProductionBatch) => (
        <div>
          <p className="font-medium">
            {item.actualQuantity ? (
              <>
                {formatNumber(parseFloat(item.actualQuantity), 0)} / {formatNumber(parseFloat(item.plannedQuantity), 0)} {item.unit}
              </>
            ) : (
              <>
                {formatNumber(parseFloat(item.plannedQuantity), 0)} {item.unit}
              </>
            )}
          </p>
          {item.wastage && (
            <p className="text-xs text-orange-600">
              فاقد: {formatNumber(parseFloat(item.wastage), 0)} {item.unit} (
              {((parseFloat(item.wastage) / parseFloat(item.plannedQuantity)) * 100).toFixed(1)}%)
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'dates',
      header: 'التواريخ',
      render: (item: ProductionBatch) => (
        <div className="text-sm">
          {item.actualStartDate ? (
            <>
              <p>البدء: {formatDate(item.actualStartDate)}</p>
              {item.actualEndDate && (
                <p className="text-[var(--text-muted)]">الانتهاء: {formatDate(item.actualEndDate)}</p>
              )}
            </>
          ) : item.plannedStartDate ? (
            <p className="text-[var(--text-muted)]">مخطط: {formatDate(item.plannedStartDate)}</p>
          ) : (
            <span className="text-[var(--text-muted)]">-</span>
          )}
        </div>
      ),
    },
    {
      key: 'cost',
      header: 'التكلفة',
      render: (item: ProductionBatch) => (
        <div>
          <p className="font-medium">{formatCurrency(item.totalCost)}</p>
          <p className="text-xs text-[var(--text-muted)]">
            {formatCurrency(item.costPerUnit)}/{item.unit}
          </p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'الحالة',
      render: (item: ProductionBatch) => getProductionStatusBadge(item.status),
    },
    {
      key: 'actions',
      header: 'الإجراءات',
      render: (item: ProductionBatch) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/production/${item.id}`}
            className="btn btn-sm btn-ghost"
            title="عرض"
          >
            <Eye size={16} />
          </Link>
          {item.status === 'draft' && (
            <button className="btn btn-sm btn-ghost text-blue-600" title="بدء التصنيع">
              <Play size={16} />
            </button>
          )}
          {item.status === 'in_progress' && (
            <button className="btn btn-sm btn-ghost text-green-600" title="إنهاء">
              <CheckCircle size={16} />
            </button>
          )}
          <Link
            href={`/production/${item.id}/edit`}
            className="btn btn-sm btn-ghost"
            title="تعديل"
          >
            <Edit size={16} />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div data-section="production">
      {/* الهيدر */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('production.title')}</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            إدارة دفعات التصنيع والإنتاج
          </p>
        </div>
        <Link href="/production/new" className="btn btn-primary">
          <Plus size={18} />
          {t('production.add_batch')}
        </Link>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Factory size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalBatches}</p>
              <p className="text-sm text-[var(--text-secondary)]">إجمالي الدفعات</p>
            </div>
          </div>
        </div>
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <Play size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{inProgress}</p>
              <p className="text-sm text-[var(--text-secondary)]">جاري التصنيع</p>
            </div>
          </div>
        </div>
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{completed}</p>
              <p className="text-sm text-[var(--text-secondary)]">مكتملة</p>
            </div>
          </div>
        </div>
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <Factory size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatNumber(totalProduced, 0)}</p>
              <p className="text-sm text-[var(--text-secondary)]">إجمالي الإنتاج</p>
            </div>
          </div>
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
                placeholder="البحث برقم الدفعة أو اسم المنتج..."
                className="input pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="input w-48"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">جميع الحالات</option>
              <option value="draft">مسودة</option>
              <option value="planned">مخطط</option>
              <option value="in_progress">جاري التصنيع</option>
              <option value="quality_check">فحص الجودة</option>
              <option value="completed">مكتمل</option>
              <option value="cancelled">ملغي</option>
            </select>
          </div>
        </div>
      </div>

      {/* جدول الدفعات */}
      <div className="card">
        <DataTable
          columns={columns}
          data={filteredBatches}
          keyExtractor={(item) => item.id}
          emptyMessage="لا توجد دفعات تصنيع"
        />
      </div>
    </div>
  );
}
