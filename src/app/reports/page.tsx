'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Factory,
  FileText,
  Download,
  Calendar,
  Filter,
} from 'lucide-react';
import { t } from '@/lib/localization';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface ReportCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

const reportCards: ReportCard[] = [
  {
    id: 'sales',
    title: 'تقرير المبيعات',
    description: 'تحليل المبيعات اليومية والشهرية والسنوية',
    icon: <TrendingUp size={24} />,
    color: 'bg-green-100 text-green-600',
    href: '/reports/sales',
  },
  {
    id: 'profit',
    title: 'تقرير الأرباح',
    description: 'تحليل هوامش الربح والعوائد',
    icon: <DollarSign size={24} />,
    color: 'bg-blue-100 text-blue-600',
    href: '/reports/profit',
  },
  {
    id: 'costs',
    title: 'تقرير التكاليف',
    description: 'تحليل تكاليف الإنتاج والمصروفات',
    icon: <TrendingDown size={24} />,
    color: 'bg-red-100 text-red-600',
    href: '/reports/costs',
  },
  {
    id: 'inventory',
    title: 'تقرير المخزون',
    description: 'حالة المخزون والحركات',
    icon: <Package size={24} />,
    color: 'bg-amber-100 text-amber-600',
    href: '/reports/inventory',
  },
  {
    id: 'production',
    title: 'تقرير التصنيع',
    description: 'تحليل دفعات التصنيع والفاقد',
    icon: <Factory size={24} />,
    color: 'bg-purple-100 text-purple-600',
    href: '/reports/production',
  },
  {
    id: 'customers',
    title: 'تقرير العملاء',
    description: 'تحليل بيانات العملاء والمديونيات',
    icon: <Users size={24} />,
    color: 'bg-cyan-100 text-cyan-600',
    href: '/reports/customers',
  },
];

// بيانات تجريبية للرسوم البيانية
const salesData = [
  { month: 'يناير', sales: 125000, cost: 85000 },
  { month: 'فبراير', sales: 145000, cost: 92000 },
  { month: 'مارس', sales: 168000, cost: 105000 },
  { month: 'أبريل', sales: 152000, cost: 98000 },
  { month: 'مايو', sales: 178000, cost: 112000 },
  { month: 'يونيو', sales: 195000, cost: 125000 },
];

const topProducts = [
  { name: 'شامبو العناية 250مل', quantity: 1250, revenue: 43750 },
  { name: 'سائل أطباق الليمون 500مل', quantity: 2100, revenue: 37800 },
  { name: 'منظف أرضيات 1 لتر', quantity: 850, revenue: 21250 },
  { name: 'صابون سائل لليدين 250مل', quantity: 620, revenue: 13640 },
  { name: 'شامبو العناية 500مل', quantity: 480, revenue: 26400 },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({ from: '2026-01-01', to: '2026-01-31' });

  // إحصائيات الفترة
  const periodStats = {
    totalSales: 485000,
    totalCost: 312000,
    grossProfit: 173000,
    profitMargin: 35.7,
    totalInvoices: 156,
    totalCustomers: 48,
  };

  return (
    <div data-section="reports">
      {/* الهيدر */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('reports.title')}</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            تقارير وتحليلات شاملة للنظام
          </p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline">
            <Download size={18} />
            تصدير التقارير
          </button>
        </div>
      </div>

      {/* فلترة التاريخ */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-[var(--text-muted)]" />
              <span className="text-sm font-medium">الفترة:</span>
            </div>
            <input
              type="date"
              className="input w-40"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            />
            <span className="text-[var(--text-muted)]">إلى</span>
            <input
              type="date"
              className="input w-40"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            />
            <button className="btn btn-primary">
              <Filter size={18} />
              تطبيق
            </button>
          </div>
        </div>
      </div>

      {/* إحصائيات الفترة */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">إجمالي المبيعات</p>
                <p className="text-3xl font-bold text-green-800">
                  {formatCurrency(periodStats.totalSales)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                <TrendingUp className="text-green-700" size={24} />
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700">إجمالي التكاليف</p>
                <p className="text-3xl font-bold text-red-800">
                  {formatCurrency(periodStats.totalCost)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-200 flex items-center justify-center">
                <TrendingDown className="text-red-700" size={24} />
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">صافي الربح</p>
                <p className="text-3xl font-bold text-blue-800">
                  {formatCurrency(periodStats.grossProfit)}
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  هامش الربح: {periodStats.profitMargin}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
                <DollarSign className="text-blue-700" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* بطاقات التقارير */}
      <h2 className="text-lg font-semibold mb-4">التقارير المتاحة</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {reportCards.map((report) => (
          <a
            key={report.id}
            href={report.href}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="card-body">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg ${report.color} flex items-center justify-center`}>
                  {report.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{report.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {report.description}
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* رسم بياني المبيعات */}
        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold">المبيعات والتكاليف الشهرية</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {salesData.map((month) => (
                <div key={month.month}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{month.month}</span>
                    <span className="text-sm text-[var(--text-muted)]">
                      {formatCurrency(month.sales)}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="h-2 bg-green-500 rounded"
                      style={{ width: `${(month.sales / 200000) * 100}%` }}
                    />
                    <div
                      className="h-2 bg-red-300 rounded"
                      style={{ width: `${(month.cost / 200000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded" />
                <span className="text-sm">المبيعات</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-300 rounded" />
                <span className="text-sm">التكاليف</span>
              </div>
            </div>
          </div>
        </div>

        {/* أكثر المنتجات مبيعاً */}
        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold">أكثر المنتجات مبيعاً</h3>
          </div>
          <div className="card-body p-0">
            <table className="table">
              <thead>
                <tr>
                  <th>المنتج</th>
                  <th>الكمية</th>
                  <th>الإيرادات</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="font-medium">{product.name}</td>
                    <td>{formatNumber(product.quantity, 0)}</td>
                    <td className="text-green-600 font-medium">
                      {formatCurrency(product.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* إحصائيات إضافية */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card card-body text-center">
          <FileText className="mx-auto text-blue-600 mb-2" size={32} />
          <p className="text-2xl font-bold">{periodStats.totalInvoices}</p>
          <p className="text-sm text-[var(--text-secondary)]">فاتورة</p>
        </div>
        <div className="card card-body text-center">
          <Users className="mx-auto text-green-600 mb-2" size={32} />
          <p className="text-2xl font-bold">{periodStats.totalCustomers}</p>
          <p className="text-sm text-[var(--text-secondary)]">عميل نشط</p>
        </div>
        <div className="card card-body text-center">
          <Package className="mx-auto text-purple-600 mb-2" size={32} />
          <p className="text-2xl font-bold">5,420</p>
          <p className="text-sm text-[var(--text-secondary)]">وحدة مباعة</p>
        </div>
        <div className="card card-body text-center">
          <Factory className="mx-auto text-amber-600 mb-2" size={32} />
          <p className="text-2xl font-bold">12</p>
          <p className="text-sm text-[var(--text-secondary)]">دفعة تصنيع</p>
        </div>
      </div>
    </div>
  );
}
