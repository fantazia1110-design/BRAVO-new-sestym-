'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  FileText,
  Download,
  Printer,
  Eye,
  MoreVertical,
  Calendar,
  Filter,
} from 'lucide-react';
import { t } from '@/lib/localization';
import { formatCurrency, formatDate } from '@/lib/utils';
import Badge, { getInvoiceStatusBadge } from '@/components/ui/Badge';
import DataTable from '@/components/ui/DataTable';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: { ar: string };
  invoiceDate: string;
  dueDate?: string;
  subtotal: string;
  discountAmount: string;
  taxAmount: string;
  total: string;
  paidAmount: string;
  remainingAmount: string;
  status: 'draft' | 'confirmed' | 'paid' | 'partially_paid' | 'cancelled';
  itemsCount: number;
}

// بيانات تجريبية
const sampleInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2026-0125',
    customer: { ar: 'شركة الأمل للتجارة' },
    invoiceDate: '2026-01-15',
    dueDate: '2026-01-30',
    subtotal: '12000',
    discountAmount: '500',
    taxAmount: '0',
    total: '11500',
    paidAmount: '11500',
    remainingAmount: '0',
    status: 'paid',
    itemsCount: 5,
  },
  {
    id: '2',
    invoiceNumber: 'INV-2026-0124',
    customer: { ar: 'مؤسسة النور' },
    invoiceDate: '2026-01-14',
    dueDate: '2026-02-14',
    subtotal: '8750',
    discountAmount: '0',
    taxAmount: '0',
    total: '8750',
    paidAmount: '4000',
    remainingAmount: '4750',
    status: 'partially_paid',
    itemsCount: 3,
  },
  {
    id: '3',
    invoiceNumber: 'INV-2026-0123',
    customer: { ar: 'سوبر ماركت السلام' },
    invoiceDate: '2026-01-14',
    dueDate: '2026-01-28',
    subtotal: '5200',
    discountAmount: '200',
    taxAmount: '0',
    total: '5000',
    paidAmount: '0',
    remainingAmount: '5000',
    status: 'confirmed',
    itemsCount: 2,
  },
  {
    id: '4',
    invoiceNumber: 'INV-2026-0122',
    customer: { ar: 'محلات الوفاء' },
    invoiceDate: '2026-01-13',
    subtotal: '15800',
    discountAmount: '800',
    taxAmount: '0',
    total: '15000',
    paidAmount: '15000',
    remainingAmount: '0',
    status: 'paid',
    itemsCount: 8,
  },
  {
    id: '5',
    invoiceNumber: 'INV-2026-0121',
    customer: { ar: 'شركة البركة للتوزيع' },
    invoiceDate: '2026-01-12',
    dueDate: '2026-02-12',
    subtotal: '28000',
    discountAmount: '0',
    taxAmount: '0',
    total: '28000',
    paidAmount: '10000',
    remainingAmount: '18000',
    status: 'partially_paid',
    itemsCount: 12,
  },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(sampleInvoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  // إحصائيات
  const totalInvoices = invoices.length;
  const totalAmount = invoices.reduce((sum, inv) => sum + parseFloat(inv.total), 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + parseFloat(inv.paidAmount), 0);
  const totalRemaining = invoices.reduce((sum, inv) => sum + parseFloat(inv.remainingAmount), 0);

  // فلترة الفواتير
  const filteredInvoices = invoices.filter((invoice) => {
    if (statusFilter && invoice.status !== statusFilter) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      invoice.invoiceNumber.toLowerCase().includes(query) ||
      invoice.customer.ar.includes(query)
    );
  });

  const columns = [
    {
      key: 'invoiceNumber',
      header: 'رقم الفاتورة',
      render: (item: Invoice) => (
        <Link href={`/invoices/${item.id}`} className="font-mono text-sm text-[var(--primary)] hover:underline">
          {item.invoiceNumber}
        </Link>
      ),
    },
    {
      key: 'customer',
      header: 'العميل',
      render: (item: Invoice) => (
        <span className="font-medium">{item.customer.ar}</span>
      ),
    },
    {
      key: 'date',
      header: 'التاريخ',
      render: (item: Invoice) => (
        <div>
          <p>{formatDate(item.invoiceDate)}</p>
          {item.dueDate && (
            <p className="text-xs text-[var(--text-muted)]">
              الاستحقاق: {formatDate(item.dueDate)}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'total',
      header: 'الإجمالي',
      render: (item: Invoice) => (
        <span className="font-medium">{formatCurrency(item.total)}</span>
      ),
    },
    {
      key: 'paid',
      header: 'المدفوع',
      render: (item: Invoice) => (
        <span className="text-green-600">{formatCurrency(item.paidAmount)}</span>
      ),
    },
    {
      key: 'remaining',
      header: 'المتبقي',
      render: (item: Invoice) => {
        const remaining = parseFloat(item.remainingAmount);
        return (
          <span className={remaining > 0 ? 'text-red-600 font-medium' : 'text-[var(--text-muted)]'}>
            {formatCurrency(remaining)}
          </span>
        );
      },
    },
    {
      key: 'status',
      header: 'الحالة',
      render: (item: Invoice) => getInvoiceStatusBadge(item.status),
    },
    {
      key: 'actions',
      header: 'الإجراءات',
      render: (item: Invoice) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/invoices/${item.id}`}
            className="btn btn-sm btn-ghost"
            title="عرض"
          >
            <Eye size={16} />
          </Link>
          <button
            className="btn btn-sm btn-ghost"
            title="طباعة"
          >
            <Printer size={16} />
          </button>
          <button
            className="btn btn-sm btn-ghost"
            title="تحميل PDF"
          >
            <Download size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div data-section="invoices">
      {/* الهيدر */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('invoices.title')}</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            إدارة الفواتير والمبيعات
          </p>
        </div>
        <Link href="/invoices/new" className="btn btn-primary">
          <Plus size={18} />
          {t('invoices.add_new')}
        </Link>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalInvoices}</p>
              <p className="text-sm text-[var(--text-secondary)]">إجمالي الفواتير</p>
            </div>
          </div>
        </div>
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
              <p className="text-sm text-[var(--text-secondary)]">إجمالي المبالغ</p>
            </div>
          </div>
        </div>
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(totalPaid)}</p>
              <p className="text-sm text-[var(--text-secondary)]">إجمالي المدفوع</p>
            </div>
          </div>
        </div>
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(totalRemaining)}</p>
              <p className="text-sm text-[var(--text-secondary)]">إجمالي المتبقي</p>
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
                placeholder="البحث برقم الفاتورة أو اسم العميل..."
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
              <option value="confirmed">مؤكدة</option>
              <option value="paid">مدفوعة</option>
              <option value="partially_paid">مدفوعة جزئياً</option>
              <option value="cancelled">ملغية</option>
            </select>
          </div>
        </div>
      </div>

      {/* جدول الفواتير */}
      <div className="card">
        <DataTable
          columns={columns}
          data={filteredInvoices}
          keyExtractor={(item) => item.id}
          emptyMessage="لا توجد فواتير"
        />
      </div>
    </div>
  );
}
