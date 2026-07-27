'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  CreditCard,
  Users,
  AlertTriangle,
  TrendingDown,
  Plus,
  Phone,
  Calendar,
} from 'lucide-react';
import { formatCurrency, formatNumber, formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface CustomerDebt {
  id: string;
  customer: string;
  phone: string;
  totalDebt: number;
  oldestInvoice: string;
  invoicesCount: number;
  lastPayment?: string;
  creditLimit: number;
  status: 'normal' | 'warning' | 'critical';
}

const sampleDebts: CustomerDebt[] = [
  {
    id: '1', customer: 'شركة البركة للتوزيع', phone: '01112345678',
    totalDebt: 28000, oldestInvoice: '2025-12-15', invoicesCount: 5,
    lastPayment: '2026-01-10', creditLimit: 75000, status: 'normal',
  },
  {
    id: '2', customer: 'شركة الأمل للتجارة', phone: '01012345678',
    totalDebt: 12500, oldestInvoice: '2026-01-05', invoicesCount: 2,
    lastPayment: '2026-01-12', creditLimit: 50000, status: 'normal',
  },
  {
    id: '3', customer: 'مؤسسة النور', phone: '01123456789',
    totalDebt: 8750, oldestInvoice: '2025-11-20', invoicesCount: 3,
    lastPayment: '2025-12-25', creditLimit: 30000, status: 'warning',
  },
  {
    id: '4', customer: 'سوبر ماركت السلام', phone: '01234567890',
    totalDebt: 18500, oldestInvoice: '2025-10-15', invoicesCount: 6,
    creditLimit: 20000, status: 'critical',
  },
  {
    id: '5', customer: 'محلات الوفاء', phone: '01098765432',
    totalDebt: 5200, oldestInvoice: '2026-01-10', invoicesCount: 1,
    lastPayment: '2026-01-14', creditLimit: 15000, status: 'normal',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'normal':
      return <Badge variant="success">طبيعي</Badge>;
    case 'warning':
      return <Badge variant="warning">متأخر</Badge>;
    case 'critical':
      return <Badge variant="error">حرج</Badge>;
    default:
      return null;
  }
};

export default function DebtsPage() {
  const [debts, setDebts] = useState<CustomerDebt[]>(sampleDebts);
  const [searchQuery, setSearchQuery] = useState('');

  const totalDebt = debts.reduce((sum, d) => sum + d.totalDebt, 0);
  const criticalCount = debts.filter((d) => d.status === 'critical').length;
  const warningCount = debts.filter((d) => d.status === 'warning').length;
  const customersWithDebt = debts.length;

  const filteredDebts = debts.filter((debt) => {
    if (!searchQuery) return true;
    return debt.customer.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      {/* الهيدر */}
      <div className="page-header">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
            <CreditCard className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">المديونيات</h1>
            <p className="text-[var(--text-secondary)] font-semibold">
              متابعة مديونيات العملاء
            </p>
          </div>
        </div>
        <Link href="/debts/collect" className="btn btn-primary btn-lg">
          <Plus size={20} />
          تسجيل دفعة
        </Link>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="stat-card bg-gradient-to-br from-red-50 to-rose-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-red-700">إجمالي المديونيات</p>
              <p className="stat-value text-red-800">{formatCurrency(totalDebt)}</p>
            </div>
            <div className="stat-icon bg-red-200 text-red-700">
              <TrendingDown size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">عملاء لديهم مديونية</p>
              <p className="stat-value">{customersWithDebt}</p>
            </div>
            <div className="stat-icon bg-blue-100 text-blue-600">
              <Users size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">حالات متأخرة</p>
              <p className="stat-value text-orange-600">{warningCount}</p>
            </div>
            <div className="stat-icon bg-orange-100 text-orange-600">
              <AlertTriangle size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">حالات حرجة</p>
              <p className="stat-value text-red-600">{criticalCount}</p>
            </div>
            <div className="stat-icon bg-red-100 text-red-600">
              <AlertTriangle size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* البحث */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={22} />
            <input
              type="text"
              placeholder="🔍 ابحث عن عميل..."
              className="input pr-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* قائمة المديونيات */}
      <div className="card">
        <div className="card-body p-0">
          <table className="table">
            <thead>
              <tr>
                <th>العميل</th>
                <th>إجمالي المديونية</th>
                <th>عدد الفواتير</th>
                <th>أقدم فاتورة</th>
                <th>آخر دفعة</th>
                <th>الحد الائتماني</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredDebts.sort((a, b) => b.totalDebt - a.totalDebt).map((debt) => (
                <tr key={debt.id} className={debt.status === 'critical' ? 'bg-red-50' : debt.status === 'warning' ? 'bg-orange-50' : ''}>
                  <td>
                    <div>
                      <p className="font-bold">{debt.customer}</p>
                      <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                        <Phone size={12} />
                        {debt.phone}
                      </p>
                    </div>
                  </td>
                  <td className="font-extrabold text-lg text-red-600">
                    {formatCurrency(debt.totalDebt)}
                  </td>
                  <td>
                    <Badge variant="info">{debt.invoicesCount} فاتورة</Badge>
                  </td>
                  <td className="font-semibold">{formatDate(debt.oldestInvoice)}</td>
                  <td className="font-semibold">
                    {debt.lastPayment ? formatDate(debt.lastPayment) : '-'}
                  </td>
                  <td>
                    <div>
                      <p className="font-bold">{formatCurrency(debt.creditLimit)}</p>
                      <div className="progress-bar h-2 mt-1">
                        <div
                          className={`progress-fill ${
                            (debt.totalDebt / debt.creditLimit) > 0.9 ? '!bg-red-500' :
                            (debt.totalDebt / debt.creditLimit) > 0.7 ? '!bg-orange-500' : ''
                          }`}
                          style={{ width: `${Math.min((debt.totalDebt / debt.creditLimit) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{getStatusBadge(debt.status)}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link href={`/customers/${debt.id}/statement`} className="btn btn-sm btn-outline">
                        كشف الحساب
                      </Link>
                      <Link href={`/debts/${debt.id}/collect`} className="btn btn-sm btn-primary">
                        تحصيل
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
