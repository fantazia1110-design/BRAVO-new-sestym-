'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Users,
  Phone,
  Mail,
  MapPin,
  Eye,
  Edit,
  FileText,
  CreditCard,
} from 'lucide-react';
import { t, getLocalizedName } from '@/lib/localization';
import { formatCurrency, formatNumber } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';

interface Customer {
  id: string;
  code: string;
  name: { ar: string };
  phone: string;
  email?: string;
  address?: string;
  creditLimit: string;
  balance: string;
  totalPurchases: string;
  totalPayments: string;
  isActive: boolean;
}

// بيانات تجريبية
const sampleCustomers: Customer[] = [
  {
    id: '1',
    code: 'CUS-001',
    name: { ar: 'شركة الأمل للتجارة' },
    phone: '01012345678',
    email: 'info@alamal.com',
    address: 'القاهرة - مدينة نصر',
    creditLimit: '50000',
    balance: '12500',
    totalPurchases: '185000',
    totalPayments: '172500',
    isActive: true,
  },
  {
    id: '2',
    code: 'CUS-002',
    name: { ar: 'مؤسسة النور' },
    phone: '01123456789',
    email: 'sales@alnour.com',
    address: 'الإسكندرية - سموحة',
    creditLimit: '30000',
    balance: '8750',
    totalPurchases: '95000',
    totalPayments: '86250',
    isActive: true,
  },
  {
    id: '3',
    code: 'CUS-003',
    name: { ar: 'سوبر ماركت السلام' },
    phone: '01234567890',
    address: 'الجيزة - الهرم',
    creditLimit: '20000',
    balance: '0',
    totalPurchases: '45000',
    totalPayments: '45000',
    isActive: true,
  },
  {
    id: '4',
    code: 'CUS-004',
    name: { ar: 'محلات الوفاء' },
    phone: '01098765432',
    address: 'المنصورة',
    creditLimit: '15000',
    balance: '5200',
    totalPurchases: '62000',
    totalPayments: '56800',
    isActive: true,
  },
  {
    id: '5',
    code: 'CUS-005',
    name: { ar: 'شركة البركة للتوزيع' },
    phone: '01187654321',
    email: 'contact@albaraka.com',
    address: 'طنطا',
    creditLimit: '75000',
    balance: '28000',
    totalPurchases: '320000',
    totalPayments: '292000',
    isActive: true,
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    nameAr: '',
    phone: '',
    email: '',
    address: '',
    creditLimit: '',
    notes: '',
  });

  // إحصائيات
  const totalCustomers = customers.length;
  const totalDebt = customers.reduce((sum, c) => sum + parseFloat(c.balance), 0);
  const totalPurchases = customers.reduce((sum, c) => sum + parseFloat(c.totalPurchases), 0);

  // فلترة العملاء
  const filteredCustomers = customers.filter((customer) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      getLocalizedName(customer.name).toLowerCase().includes(query) ||
      customer.code.toLowerCase().includes(query) ||
      customer.phone.includes(query)
    );
  });

  const columns = [
    {
      key: 'code',
      header: 'الكود',
      render: (item: Customer) => (
        <span className="font-mono text-sm">{item.code}</span>
      ),
    },
    {
      key: 'name',
      header: 'اسم العميل',
      render: (item: Customer) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            {getLocalizedName(item.name).charAt(0)}
          </div>
          <div>
            <p className="font-medium">{getLocalizedName(item.name)}</p>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <Phone size={12} />
              {item.phone}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'address',
      header: 'العنوان',
      render: (item: Customer) => (
        <span className="text-sm text-[var(--text-secondary)]">
          {item.address || '-'}
        </span>
      ),
    },
    {
      key: 'totalPurchases',
      header: 'إجمالي المشتريات',
      render: (item: Customer) => (
        <span className="font-medium">{formatCurrency(item.totalPurchases)}</span>
      ),
    },
    {
      key: 'balance',
      header: 'المديونية',
      render: (item: Customer) => {
        const balance = parseFloat(item.balance);
        return (
          <span className={`font-medium ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {formatCurrency(balance)}
          </span>
        );
      },
    },
    {
      key: 'creditLimit',
      header: 'الحد الائتماني',
      render: (item: Customer) => (
        <div>
          <span>{formatCurrency(item.creditLimit)}</span>
          <div className="progress-bar mt-1 h-1">
            <div
              className={`progress-fill ${
                parseFloat(item.balance) > parseFloat(item.creditLimit) * 0.8
                  ? 'bg-red-500'
                  : parseFloat(item.balance) > parseFloat(item.creditLimit) * 0.5
                  ? 'bg-orange-500'
                  : 'bg-green-500'
              }`}
              style={{
                width: `${Math.min(
                  (parseFloat(item.balance) / parseFloat(item.creditLimit)) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'الإجراءات',
      render: (item: Customer) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/customers/${item.id}`}
            className="btn btn-sm btn-ghost"
            title="عرض الملف"
          >
            <Eye size={16} />
          </Link>
          <Link
            href={`/customers/${item.id}/statement`}
            className="btn btn-sm btn-ghost"
            title="كشف الحساب"
          >
            <FileText size={16} />
          </Link>
          <Link
            href={`/customers/${item.id}/payment`}
            className="btn btn-sm btn-ghost text-green-600"
            title="إضافة دفعة"
          >
            <CreditCard size={16} />
          </Link>
          <Link
            href={`/customers/${item.id}/edit`}
            className="btn btn-sm btn-ghost"
            title="تعديل"
          >
            <Edit size={16} />
          </Link>
        </div>
      ),
    },
  ];

  const handleAddCustomer = () => {
    // إضافة عميل جديد
    const newCustomer: Customer = {
      id: `${Date.now()}`,
      code: `CUS-${String(customers.length + 1).padStart(3, '0')}`,
      name: { ar: formData.nameAr },
      phone: formData.phone,
      email: formData.email || undefined,
      address: formData.address || undefined,
      creditLimit: formData.creditLimit || '0',
      balance: '0',
      totalPurchases: '0',
      totalPayments: '0',
      isActive: true,
    };
    setCustomers([...customers, newCustomer]);
    setShowAddModal(false);
    setFormData({ nameAr: '', phone: '', email: '', address: '', creditLimit: '', notes: '' });
  };

  return (
    <div data-section="customers">
      {/* الهيدر */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('customers.title')}</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            إدارة بيانات العملاء والمديونيات
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={18} />
          {t('customers.add_new')}
        </button>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Users size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalCustomers}</p>
              <p className="text-sm text-[var(--text-secondary)]">إجمالي العملاء</p>
            </div>
          </div>
        </div>
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(totalPurchases)}</p>
              <p className="text-sm text-[var(--text-secondary)]">إجمالي المبيعات</p>
            </div>
          </div>
        </div>
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(totalDebt)}</p>
              <p className="text-sm text-[var(--text-secondary)]">إجمالي المديونيات</p>
            </div>
          </div>
        </div>
        <div className="card card-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <Users size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {customers.filter((c) => parseFloat(c.balance) > 0).length}
              </p>
              <p className="text-sm text-[var(--text-secondary)]">عملاء لديهم مديونية</p>
            </div>
          </div>
        </div>
      </div>

      {/* البحث */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
            <input
              type="text"
              placeholder="البحث بالاسم، الكود، رقم الهاتف..."
              className="input pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* جدول العملاء */}
      <div className="card">
        <DataTable
          columns={columns}
          data={filteredCustomers}
          keyExtractor={(item) => item.id}
          emptyMessage="لا يوجد عملاء"
        />
      </div>

      {/* مودال إضافة عميل */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={t('customers.add_new')}
        size="lg"
        footer={
          <>
            <button className="btn btn-primary" onClick={handleAddCustomer}>
              حفظ
            </button>
            <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>
              إلغاء
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="input-group col-span-2">
            <label className="input-label">اسم العميل <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="input"
              placeholder="اسم العميل أو الشركة"
              value={formData.nameAr}
              onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label className="input-label">رقم الهاتف <span className="text-red-500">*</span></label>
            <input
              type="tel"
              className="input"
              placeholder="01xxxxxxxxx"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label className="input-label">البريد الإلكتروني</label>
            <input
              type="email"
              className="input"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="input-group col-span-2">
            <label className="input-label">العنوان</label>
            <input
              type="text"
              className="input"
              placeholder="المدينة - المنطقة"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label className="input-label">الحد الائتماني</label>
            <input
              type="number"
              className="input"
              placeholder="0"
              value={formData.creditLimit}
              onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label className="input-label">ملاحظات</label>
            <input
              type="text"
              className="input"
              placeholder="ملاحظات إضافية"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
