'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  ShoppingCart,
  TrendingUp,
  Users,
  CreditCard,
  Package,
  Search,
  Calendar,
} from 'lucide-react';
import { formatCurrency, formatNumber, formatDate } from '@/lib/utils';
import Badge, { getInvoiceStatusBadge } from '@/components/ui/Badge';

interface Sale {
  id: string;
  invoiceNumber: string;
  customer: string;
  products: { name: string; quantity: number; price: number }[];
  subtotal: number;
  discount: number;
  total: number;
  paid: number;
  remaining: number;
  status: string;
  paymentMethod: string;
  date: string;
}

// مبيعات تجريبية
const sampleSales: Sale[] = [
  {
    id: '1', invoiceNumber: 'INV-2026-0130',
    customer: 'شركة الأمل للتجارة',
    products: [
      { name: 'شامبو الكيراتين 250مل', quantity: 50, price: 35 },
      { name: 'بلسم الحرير للشعر 300مل', quantity: 30, price: 45 },
    ],
    subtotal: 3100, discount: 100, total: 3000, paid: 3000, remaining: 0,
    status: 'paid', paymentMethod: 'تحويل بنكي', date: '2026-01-15',
  },
  {
    id: '2', invoiceNumber: 'INV-2026-0129',
    customer: 'مؤسسة النور',
    products: [
      { name: 'سائل أطباق الليمون 500مل', quantity: 100, price: 18 },
      { name: 'منظف أرضيات اللافندر 1 لتر', quantity: 50, price: 25 },
    ],
    subtotal: 3050, discount: 50, total: 3000, paid: 1500, remaining: 1500,
    status: 'partially_paid', paymentMethod: 'نقدي', date: '2026-01-15',
  },
  {
    id: '3', invoiceNumber: 'INV-2026-0128',
    customer: 'سوبر ماركت السلام',
    products: [
      { name: 'صابون اللافندر الطبيعي 100جم', quantity: 200, price: 30 },
    ],
    subtotal: 6000, discount: 0, total: 6000, paid: 0, remaining: 6000,
    status: 'confirmed', paymentMethod: 'آجل', date: '2026-01-14',
  },
  {
    id: '4', invoiceNumber: 'INV-2026-0127',
    customer: 'محلات الوفاء',
    products: [
      { name: 'كريم مرطب بالصبار 100مل', quantity: 40, price: 45 },
      { name: 'كريم اليدين بالعسل 50مل', quantity: 60, price: 30 },
    ],
    subtotal: 3600, discount: 100, total: 3500, paid: 3500, remaining: 0,
    status: 'paid', paymentMethod: 'فودافون كاش', date: '2026-01-14',
  },
  {
    id: '5', invoiceNumber: 'INV-2026-0126',
    customer: 'شركة البركة للتوزيع',
    products: [
      { name: 'عطر الورد الدمشقي 50مل', quantity: 20, price: 90 },
      { name: 'عطر العود الملكي 30مل', quantity: 10, price: 180 },
    ],
    subtotal: 3600, discount: 0, total: 3600, paid: 3600, remaining: 0,
    status: 'paid', paymentMethod: 'تحويل بنكي', date: '2026-01-13',
  },
];

// إحصائيات المبيعات
const salesStats = {
  todaySales: 15600,
  weekSales: 85000,
  monthSales: 485000,
  todayOrders: 12,
  avgOrderValue: 1300,
  topCustomer: 'شركة البركة للتوزيع',
};

// المنتجات الأكثر مبيعاً اليوم
const todayTopProducts = [
  { name: 'شامبو الكيراتين 250مل', quantity: 85, emoji: '🧴' },
  { name: 'سائل أطباق الليمون 500مل', quantity: 120, emoji: '🍋' },
  { name: 'صابون اللافندر الطبيعي', quantity: 65, emoji: '🧼' },
  { name: 'كريم مرطب بالصبار', quantity: 45, emoji: '🌿' },
];

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>(sampleSales);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSales = sales.filter((sale) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      sale.invoiceNumber.toLowerCase().includes(query) ||
      sale.customer.toLowerCase().includes(query)
    );
  });

  return (
    <div data-section="sales">
      {/* الهيدر */}
      <div className="page-header">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
            <ShoppingCart className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">المبيعات</h1>
            <p className="text-[var(--text-secondary)] font-semibold">
              إدارة عمليات البيع والفواتير
            </p>
          </div>
        </div>
        <Link href="/sales/new" className="btn btn-primary btn-lg">
          <Plus size={20} />
          عملية بيع جديدة
        </Link>
      </div>

      {/* إحصائيات المبيعات */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="stat-card bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-green-700">مبيعات اليوم</p>
              <p className="stat-value text-green-800">{formatCurrency(salesStats.todaySales)}</p>
              <p className="text-xs text-green-600 font-semibold mt-1">
                <TrendingUp size={14} className="inline ml-1" />
                +12% عن أمس
              </p>
            </div>
            <div className="stat-icon bg-green-200 text-green-700">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">مبيعات الأسبوع</p>
              <p className="stat-value">{formatCurrency(salesStats.weekSales)}</p>
            </div>
            <div className="stat-icon bg-blue-100 text-blue-600">
              <Calendar size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">طلبات اليوم</p>
              <p className="stat-value">{salesStats.todayOrders}</p>
            </div>
            <div className="stat-icon bg-purple-100 text-purple-600">
              <ShoppingCart size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">متوسط قيمة الطلب</p>
              <p className="stat-value">{formatCurrency(salesStats.avgOrderValue)}</p>
            </div>
            <div className="stat-icon bg-amber-100 text-amber-600">
              <CreditCard size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* المنتجات الأكثر مبيعاً اليوم */}
      <div className="card mb-8">
        <div className="card-header">
          <h2 className="text-lg font-extrabold flex items-center gap-2">
            <TrendingUp className="text-green-500" size={22} />
            الأكثر مبيعاً اليوم
          </h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-4 gap-4">
            {todayTopProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-3xl">{product.emoji}</span>
                <div>
                  <p className="font-bold text-sm">{product.name}</p>
                  <p className="text-green-600 font-extrabold">{product.quantity} وحدة</p>
                </div>
              </div>
            ))}
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
              placeholder="🔍 ابحث برقم الفاتورة أو اسم العميل..."
              className="input pr-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* جدول المبيعات */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-extrabold">آخر عمليات البيع</h2>
        </div>
        <div className="card-body p-0">
          <table className="table">
            <thead>
              <tr>
                <th>رقم الفاتورة</th>
                <th>العميل</th>
                <th>المنتجات</th>
                <th>الإجمالي</th>
                <th>المدفوع</th>
                <th>الحالة</th>
                <th>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale.id}>
                  <td>
                    <Link href={`/invoices/${sale.id}`} className="font-mono font-bold text-[var(--primary)] hover:underline">
                      {sale.invoiceNumber}
                    </Link>
                  </td>
                  <td className="font-bold">{sale.customer}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {sale.products.slice(0, 2).map((p, i) => (
                        <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded font-semibold">
                          {p.name.split(' ')[0]} ({p.quantity})
                        </span>
                      ))}
                      {sale.products.length > 2 && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">
                          +{sale.products.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="font-bold">{formatCurrency(sale.total)}</td>
                  <td className="font-bold text-green-600">{formatCurrency(sale.paid)}</td>
                  <td>{getInvoiceStatusBadge(sale.status)}</td>
                  <td className="text-[var(--text-muted)] font-semibold">{formatDate(sale.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
