'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Truck,
  Phone,
  Mail,
  MapPin,
  Eye,
  Edit,
  Package,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface Supplier {
  id: string;
  code: string;
  name: string;
  contactPerson: string;
  phone: string;
  email?: string;
  address: string;
  category: string;
  materialsCount: number;
  totalPurchases: number;
  balance: number;
  rating: number;
  isActive: boolean;
}

const sampleSuppliers: Supplier[] = [
  {
    id: '1', code: 'SUP-001', name: 'شركة الكيماويات المصرية',
    contactPerson: 'أحمد محمود', phone: '01012345678', email: 'info@egychem.com',
    address: 'القاهرة - المنطقة الصناعية', category: 'مواد كيميائية',
    materialsCount: 45, totalPurchases: 580000, balance: 25000, rating: 4.8, isActive: true,
  },
  {
    id: '2', code: 'SUP-002', name: 'مصنع الزيوت النباتية',
    contactPerson: 'محمد علي', phone: '01123456789', email: 'sales@oils.com',
    address: 'الإسكندرية - برج العرب', category: 'زيوت ومرطبات',
    materialsCount: 18, totalPurchases: 320000, balance: 0, rating: 4.5, isActive: true,
  },
  {
    id: '3', code: 'SUP-003', name: 'شركة العطور الشرقية',
    contactPerson: 'خالد سعيد', phone: '01234567890', email: 'info@oriental-perfumes.com',
    address: 'الجيزة - 6 أكتوبر', category: 'عطور وروائح',
    materialsCount: 32, totalPurchases: 450000, balance: 15000, rating: 4.9, isActive: true,
  },
  {
    id: '4', code: 'SUP-004', name: 'مصنع البلاستيك الحديث',
    contactPerson: 'عمر حسن', phone: '01098765432', email: 'orders@modern-plastic.com',
    address: 'القاهرة - العاشر من رمضان', category: 'عبوات وتغليف',
    materialsCount: 25, totalPurchases: 180000, balance: 8000, rating: 4.3, isActive: true,
  },
  {
    id: '5', code: 'SUP-005', name: 'شركة المواد الحافظة',
    contactPerson: 'سامي عبدالله', phone: '01187654321',
    address: 'طنطا', category: 'مواد حافظة',
    materialsCount: 12, totalPurchases: 95000, balance: 0, rating: 4.6, isActive: true,
  },
];

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(sampleSuppliers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSuppliers = suppliers.filter((supplier) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      supplier.name.toLowerCase().includes(query) ||
      supplier.code.toLowerCase().includes(query) ||
      supplier.contactPerson.toLowerCase().includes(query)
    );
  });

  const totalPurchases = suppliers.reduce((sum, s) => sum + s.totalPurchases, 0);
  const totalBalance = suppliers.reduce((sum, s) => sum + s.balance, 0);

  return (
    <div>
      {/* الهيدر */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-500 to-slate-600 flex items-center justify-center shadow-lg">
            <Truck className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">الموردون</h1>
            <p className="text-[var(--text-secondary)] font-semibold">
              إدارة بيانات الموردين والمشتريات
            </p>
          </div>
        </div>
        <Link href="/suppliers/new" className="btn btn-primary btn-lg">
          <Plus size={20} />
          إضافة مورد جديد
        </Link>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">إجمالي الموردين</p>
              <p className="stat-value">{suppliers.length}</p>
            </div>
            <div className="stat-icon bg-gray-100 text-gray-600">
              <Truck size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">إجمالي المشتريات</p>
              <p className="stat-value text-2xl">{formatCurrency(totalPurchases)}</p>
            </div>
            <div className="stat-icon bg-blue-100 text-blue-600">
              <Package size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">المستحقات</p>
              <p className="stat-value text-red-600 text-2xl">{formatCurrency(totalBalance)}</p>
            </div>
            <div className="stat-icon bg-red-100 text-red-600">
              <Truck size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--text-secondary)]">المواد الخام</p>
              <p className="stat-value">{suppliers.reduce((sum, s) => sum + s.materialsCount, 0)}</p>
            </div>
            <div className="stat-icon bg-purple-100 text-purple-600">
              <Package size={24} />
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
              placeholder="🔍 ابحث عن مورد..."
              className="input pr-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* قائمة الموردين */}
      <div className="grid grid-cols-2 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="card hover:shadow-xl transition-all">
            <div className="card-body">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-3xl shadow">
                  🏭
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-extrabold">{supplier.name}</h3>
                    <Badge variant="info">{supplier.category}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-3">
                    <span className="flex items-center gap-1 font-semibold">
                      <Phone size={14} />
                      {supplier.phone}
                    </span>
                    {supplier.email && (
                      <span className="flex items-center gap-1 font-semibold">
                        <Mail size={14} />
                        {supplier.email}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-[var(--text-muted)] mb-3">
                    <MapPin size={14} />
                    <span className="font-semibold">{supplier.address}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-[var(--text-muted)] font-semibold">المواد</p>
                      <p className="font-bold text-lg">{supplier.materialsCount}</p>
                    </div>
                    <div>
                      <p className="text-[var(--text-muted)] font-semibold">المشتريات</p>
                      <p className="font-bold text-lg">{formatCurrency(supplier.totalPurchases)}</p>
                    </div>
                    <div>
                      <p className="text-[var(--text-muted)] font-semibold">المستحق</p>
                      <p className={`font-bold text-lg ${supplier.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {formatCurrency(supplier.balance)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border)]">
                <Link href={`/suppliers/${supplier.id}`} className="btn btn-sm btn-outline flex-1">
                  <Eye size={16} />
                  عرض التفاصيل
                </Link>
                <Link href={`/suppliers/${supplier.id}/materials`} className="btn btn-sm btn-primary flex-1">
                  <Package size={16} />
                  المواد الخام
                </Link>
                <Link href={`/suppliers/${supplier.id}/edit`} className="btn btn-sm btn-ghost">
                  <Edit size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
