'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  Save,
  FlaskConical,
  Plus,
  X,
  Upload,
} from 'lucide-react';
import { t } from '@/lib/localization';

interface FormData {
  code: string;
  nameAr: string;
  nameEn: string;
  scientificName: string;
  inciName: string;
  categoryId: string;
  supplierId: string;
  unitId: string;
  functionAr: string;
  descriptionAr: string;
  usagesAr: string;
  currentPrice: string;
  currentQuantity: string;
  minStock: string;
  maxStock: string;
  storageConditions: string;
  safetyInstructions: string;
  warnings: string;
}

const initialFormData: FormData = {
  code: '',
  nameAr: '',
  nameEn: '',
  scientificName: '',
  inciName: '',
  categoryId: '',
  supplierId: '',
  unitId: '',
  functionAr: '',
  descriptionAr: '',
  usagesAr: '',
  currentPrice: '',
  currentQuantity: '0',
  minStock: '',
  maxStock: '',
  storageConditions: '',
  safetyInstructions: '',
  warnings: '',
};

// تصنيفات تجريبية
const categories = [
  { id: '1', name: 'مواد فعالة سطحياً' },
  { id: '2', name: 'مرطبات' },
  { id: '3', name: 'مواد حافظة' },
  { id: '4', name: 'مكثفات' },
  { id: '5', name: 'منظمات pH' },
  { id: '6', name: 'عطور' },
  { id: '7', name: 'ألوان' },
  { id: '8', name: 'زيوت' },
];

// موردون تجريبيون
const suppliers = [
  { id: '1', name: 'شركة الكيماويات المصرية' },
  { id: '2', name: 'مصنع الزيوت النباتية' },
  { id: '3', name: 'شركة المواد الكيميائية' },
];

// وحدات القياس
const units = [
  { id: '1', name: 'كيلوجرام', symbol: 'كجم' },
  { id: '2', name: 'جرام', symbol: 'جم' },
  { id: '3', name: 'لتر', symbol: 'لتر' },
  { id: '4', name: 'ملليلتر', symbol: 'مل' },
  { id: '5', name: 'قطعة', symbol: 'قطعة' },
];

export default function NewRawMaterialPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [activeTab, setActiveTab] = useState<'basic' | 'details' | 'stock' | 'safety'>('basic');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.nameAr.trim()) {
      newErrors.nameAr = 'اسم المادة مطلوب';
    }
    if (!formData.unitId) {
      newErrors.unitId = 'وحدة القياس مطلوبة';
    }
    if (formData.currentPrice && isNaN(parseFloat(formData.currentPrice))) {
      newErrors.currentPrice = 'السعر غير صالح';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/raw-materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: formData.code || undefined,
          name: { ar: formData.nameAr, en: formData.nameEn || undefined },
          scientificName: formData.scientificName || undefined,
          inciName: formData.inciName || undefined,
          categoryId: formData.categoryId || undefined,
          supplierId: formData.supplierId || undefined,
          unitId: formData.unitId,
          function: formData.functionAr ? { ar: formData.functionAr } : undefined,
          description: formData.descriptionAr ? { ar: formData.descriptionAr } : undefined,
          usages: formData.usagesAr ? { ar: formData.usagesAr } : undefined,
          currentPrice: formData.currentPrice || '0',
          currentQuantity: formData.currentQuantity || '0',
          minStock: formData.minStock || '0',
          maxStock: formData.maxStock || undefined,
          storageConditions: formData.storageConditions || undefined,
          safetyInstructions: formData.safetyInstructions || undefined,
          warnings: formData.warnings || undefined,
        }),
      });

      const result = await response.json();

      if (result.success) {
        router.push('/raw-materials');
      } else {
        alert(result.error || 'حدث خطأ أثناء الحفظ');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('حدث خطأ أثناء الحفظ');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'البيانات الأساسية' },
    { id: 'details', label: 'التفاصيل' },
    { id: 'stock', label: 'المخزون والسعر' },
    { id: 'safety', label: 'السلامة والتخزين' },
  ];

  return (
    <div>
      {/* الهيدر */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/raw-materials" className="btn btn-icon btn-ghost">
          <ArrowRight size={20} />
        </Link>
        <div>
          <h1 className="page-title">{t('raw_materials.add_new')}</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            إضافة مادة خام جديدة إلى قاعدة البيانات
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* التبويبات */}
        <div className="tabs mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="card">
          <div className="card-body">
            {/* البيانات الأساسية */}
            {activeTab === 'basic' && (
              <div className="grid grid-cols-2 gap-6">
                <div className="input-group">
                  <label className="input-label">الكود (اختياري)</label>
                  <input
                    type="text"
                    name="code"
                    className="input"
                    placeholder="سيتم إنشاؤه تلقائياً"
                    value={formData.code}
                    onChange={handleChange}
                  />
                </div>
                <div></div>

                <div className="input-group">
                  <label className="input-label">
                    الاسم بالعربية <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nameAr"
                    className={`input ${errors.nameAr ? 'input-error' : ''}`}
                    placeholder="مثال: تكسابون"
                    value={formData.nameAr}
                    onChange={handleChange}
                  />
                  {errors.nameAr && (
                    <span className="error-message">{errors.nameAr}</span>
                  )}
                </div>

                <div className="input-group">
                  <label className="input-label">الاسم بالإنجليزية</label>
                  <input
                    type="text"
                    name="nameEn"
                    className="input"
                    placeholder="مثال: SLES"
                    value={formData.nameEn}
                    onChange={handleChange}
                    dir="ltr"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">الاسم العلمي</label>
                  <input
                    type="text"
                    name="scientificName"
                    className="input"
                    placeholder="مثال: Sodium Laureth Sulfate"
                    value={formData.scientificName}
                    onChange={handleChange}
                    dir="ltr"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">اسم INCI</label>
                  <input
                    type="text"
                    name="inciName"
                    className="input"
                    placeholder="مثال: SLES"
                    value={formData.inciName}
                    onChange={handleChange}
                    dir="ltr"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">التصنيف</label>
                  <select
                    name="categoryId"
                    className="input"
                    value={formData.categoryId}
                    onChange={handleChange}
                  >
                    <option value="">اختر التصنيف</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">المورد</label>
                  <select
                    name="supplierId"
                    className="input"
                    value={formData.supplierId}
                    onChange={handleChange}
                  >
                    <option value="">اختر المورد</option>
                    {suppliers.map((sup) => (
                      <option key={sup.id} value={sup.id}>
                        {sup.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">
                    وحدة القياس <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="unitId"
                    className={`input ${errors.unitId ? 'input-error' : ''}`}
                    value={formData.unitId}
                    onChange={handleChange}
                  >
                    <option value="">اختر الوحدة</option>
                    {units.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                  {errors.unitId && (
                    <span className="error-message">{errors.unitId}</span>
                  )}
                </div>
              </div>
            )}

            {/* التفاصيل */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="input-group">
                  <label className="input-label">الوظيفة</label>
                  <input
                    type="text"
                    name="functionAr"
                    className="input"
                    placeholder="مثال: مادة فعالة سطحياً للتنظيف والرغوة"
                    value={formData.functionAr}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">الوصف</label>
                  <textarea
                    name="descriptionAr"
                    className="input"
                    rows={3}
                    placeholder="وصف تفصيلي للمادة الخام..."
                    value={formData.descriptionAr}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">الاستخدامات</label>
                  <textarea
                    name="usagesAr"
                    className="input"
                    rows={3}
                    placeholder="استخدامات المادة في التركيبات المختلفة..."
                    value={formData.usagesAr}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {/* المخزون والسعر */}
            {activeTab === 'stock' && (
              <div className="grid grid-cols-2 gap-6">
                <div className="input-group">
                  <label className="input-label">السعر الحالي</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="currentPrice"
                      className={`input pl-16 ${errors.currentPrice ? 'input-error' : ''}`}
                      placeholder="0.00"
                      value={formData.currentPrice}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                      جنيه
                    </span>
                  </div>
                  {errors.currentPrice && (
                    <span className="error-message">{errors.currentPrice}</span>
                  )}
                </div>

                <div className="input-group">
                  <label className="input-label">الكمية الحالية</label>
                  <input
                    type="number"
                    name="currentQuantity"
                    className="input"
                    placeholder="0"
                    value={formData.currentQuantity}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">الحد الأدنى للمخزون</label>
                  <input
                    type="number"
                    name="minStock"
                    className="input"
                    placeholder="0"
                    value={formData.minStock}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                  />
                  <span className="text-xs text-[var(--text-muted)]">
                    سيتم تنبيهك عند وصول المخزون لهذا الحد
                  </span>
                </div>

                <div className="input-group">
                  <label className="input-label">الحد الأقصى للمخزون</label>
                  <input
                    type="number"
                    name="maxStock"
                    className="input"
                    placeholder="0"
                    value={formData.maxStock}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            )}

            {/* السلامة والتخزين */}
            {activeTab === 'safety' && (
              <div className="space-y-6">
                <div className="input-group">
                  <label className="input-label">شروط التخزين</label>
                  <textarea
                    name="storageConditions"
                    className="input"
                    rows={3}
                    placeholder="مثال: يحفظ في مكان جاف بعيداً عن أشعة الشمس المباشرة..."
                    value={formData.storageConditions}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">تعليمات السلامة</label>
                  <textarea
                    name="safetyInstructions"
                    className="input"
                    rows={3}
                    placeholder="مثال: يرتدى قفازات واقية عند التعامل..."
                    value={formData.safetyInstructions}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">التحذيرات</label>
                  <textarea
                    name="warnings"
                    className="input"
                    rows={3}
                    placeholder="مثال: يسبب تهيج الجلد والعين..."
                    value={formData.warnings}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </div>

          {/* أزرار الإجراءات */}
          <div className="card-footer flex items-center gap-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner w-4 h-4" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save size={18} />
                  حفظ المادة الخام
                </>
              )}
            </button>
            <Link href="/raw-materials" className="btn btn-outline">
              إلغاء
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
