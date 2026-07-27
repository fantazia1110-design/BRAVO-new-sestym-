'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Receipt,
  TrendingDown,
  Zap,
  Droplet,
  Truck,
  Wrench,
  Users,
  Building,
  Calendar,
} from 'lucide-react';
import { formatCurrency, formatNumber, formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface Expense {
  id: string;
  category: string;
  categoryIcon: string;
  categoryColor: string;
  description: string;
  amount: number;
  date: string;
  paymentMethod: string;
  reference?: string;
}

const expenseCategories = [
  { id: 'electricity', name: 'كهرباء', icon: '⚡', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'water', name: 'مياه', icon: '💧', color: 'bg-blue-100 text-blue-700' },
  { id: 'labor', name: 'عمالة', icon: '👷', color: 'bg-green-100 text-green-700' },
  { id: 'transport', name: 'نقل', icon: '🚛', color: 'bg-purple-100 text-purple-700' },
  { id: 'rent', name: 'إيجار', icon: '🏢', color: 'bg-gray-100 text-gray-700' },
  { id: 'maintenance', name: 'صيانة', icon: '🔧', color: 'bg-orange-100 text-orange-700' },
  { id: 'marketing', name: 'تسويق', icon: '📢', color: 'bg-pink-100 text-pink-700' },
  { id: 'other', name: 'أخرى', icon: '📋', color: 'bg-slate-100 text-slate-700' },
];

const sampleExpenses: Expense[] = [
  { id: '1', category: 'كهرباء', categoryIcon: '⚡', categoryColor: 'bg-yellow-100 text-yellow-700', description: 'فاتورة كهرباء شهر يناير', amount: 4500, date: '2026-01-15', paymentMethod: 'تحويل بنكي', reference: 'ELEC-2026-01' },
  { id: '2', category: 'عمالة', categoryIcon: '👷', categoryColor: 'bg-green-100 text-green-700', description: 'رواتب العمال - يناير', amount: 35000, date: '2026-01-01', paymentMethod: 'تحويل بنكي' },
  { id: '3', category: 'نقل', categoryIcon: '🚛', categoryColor: 'bg-purple-100 text-purple-700', description: 'شحن مواد خام من الإسكندرية', amount: 2500, date: '2026-01-12', paymentMethod: 'نقدي' },
  { id: '4', category: 'صيانة', categoryIcon: '🔧', categoryColor: 'bg-orange-100 text-orange-700', description: 'صيانة خلاط التصنيع', amount: 1800, date: '2026-01-10', paymentMethod: 'نقدي' },
  { id: '5', category: 'إيجار', categoryIcon: '🏢', categoryColor: 'bg-gray-100 text-gray-700', description: 'إيجار المصنع - يناير', amount: 15000, date: '2026-01-01', paymentMethod: 'تحويل بنكي' },
  { id: '6', category: 'مياه', categoryIcon: '💧', categoryColor: 'bg-blue-100 text-blue-700', description: 'فاتورة مياه', amount: 850, date: '2026-01-14', paymentMethod: 'نقدي' },
  { id: '7', category: 'تسويق', categoryIcon: '📢', categoryColor: 'bg-pink-100 text-pink-700', description: 'إعلانات فيسبوك', amount: 3000, date: '2026-01-08', paymentMethod: 'بطاقة ائتمان' },
  { id: '8', category: 'أخرى', categoryIcon: '📋', categoryColor: 'bg-slate-100 text-slate-700', description: 'مستلزمات مكتبية', amount: 450, date: '2026-01-13', paymentMethod: 'نقدي' },
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const expensesByCategory = expenseCategories.map((cat) => ({
    ...cat,
    total: expenses.filter((e) => e.category === cat.name).reduce((sum, e) => sum + e.amount, 0),
  }));

  const filteredExpenses = expenses.filter((expense) => {
    if (selectedCategory !== 'all' && expense.category !== selectedCategory) return false;
    if (!searchQuery) return true;
    return expense.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      {/* الهيدر */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg">
            <Receipt className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">المصروفات</h1>
            <p className="text-[var(--text-secondary)] font-semibold">
              تسجيل ومتابعة المصروفات
            </p>
          </div>
        </div>
        <Link href="/expenses/new" className="btn btn-primary btn-lg">
          <Plus size={20} />
          إضافة مصروف
        </Link>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="stat-card bg-gradient-to-br from-red-50 to-rose-100 border-red-200 col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-red-700">إجمالي المصروفات</p>
              <p className="stat-value text-red-800">{formatCurrency(totalExpenses)}</p>
            </div>
            <div className="stat-icon bg-red-200 text-red-700">
              <TrendingDown size={24} />
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-4 gap-3">
            {expensesByCategory.slice(0, 4).map((cat) => (
              <div key={cat.id} className={`p-3 rounded-xl ${cat.color} flex items-center gap-3`}>
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <p className="text-xs font-bold opacity-80">{cat.name}</p>
                  <p className="font-extrabold">{formatCurrency(cat.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* تصنيفات المصروفات */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[var(--primary)] text-white'
                : 'bg-gray-100 text-gray-700 hover:scale-105'
            }`}
          >
            الكل
          </button>
          {expenseCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                selectedCategory === cat.name
                  ? 'bg-[var(--primary)] text-white'
                  : `${cat.color} hover:scale-105`
              }`}
            >
              <span className="ml-2">{cat.icon}</span>
              {cat.name}
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
              placeholder="🔍 ابحث في المصروفات..."
              className="input pr-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* جدول المصروفات */}
      <div className="card">
        <div className="card-body p-0">
          <table className="table">
            <thead>
              <tr>
                <th>التصنيف</th>
                <th>الوصف</th>
                <th>المبلغ</th>
                <th>التاريخ</th>
                <th>طريقة الدفع</th>
                <th>المرجع</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${expense.categoryColor} font-bold`}>
                      <span className="text-xl">{expense.categoryIcon}</span>
                      {expense.category}
                    </span>
                  </td>
                  <td className="font-bold">{expense.description}</td>
                  <td className="font-extrabold text-lg text-red-600">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="font-semibold">{formatDate(expense.date)}</td>
                  <td>
                    <Badge variant="info">{expense.paymentMethod}</Badge>
                  </td>
                  <td className="font-mono text-sm text-[var(--text-muted)]">
                    {expense.reference || '-'}
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
