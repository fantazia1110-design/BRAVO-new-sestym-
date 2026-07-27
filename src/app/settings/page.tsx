'use client';

import React, { useState } from 'react';
import {
  Settings,
  Building,
  Users,
  Shield,
  Layers,
  Ruler,
  Database,
  Bell,
  Palette,
  Globe,
  Receipt,
  Calculator,
  Save,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react';
import { t } from '@/lib/localization';
import { useTheme, type ThemeMode } from '@/components/ThemeProvider';

const themeOptions: {
  id: ThemeMode;
  label: string;
  preview: string;
  icon: React.ReactNode;
}[] = [
  { id: 'light', label: 'فاتح', preview: 'preview-light', icon: <Sun size={16} /> },
  { id: 'dark', label: 'داكن', preview: 'preview-dark', icon: <Moon size={16} /> },
  { id: 'system', label: 'تلقائي', preview: 'preview-system', icon: <Monitor size={16} /> },
];

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const settingsSections: SettingsSection[] = [
  {
    id: 'organization',
    title: 'بيانات المؤسسة',
    description: 'إعدادات المؤسسة والشعار ومعلومات التواصل',
    icon: <Building size={24} />,
  },
  {
    id: 'users',
    title: 'المستخدمون',
    description: 'إدارة المستخدمين والصلاحيات',
    icon: <Users size={24} />,
  },
  {
    id: 'roles',
    title: 'الأدوار والصلاحيات',
    description: 'تعريف الأدوار وتحديد الصلاحيات',
    icon: <Shield size={24} />,
  },
  {
    id: 'categories',
    title: 'التصنيفات',
    description: 'إدارة تصنيفات المواد والمنتجات',
    icon: <Layers size={24} />,
  },
  {
    id: 'units',
    title: 'وحدات القياس',
    description: 'إدارة وحدات القياس والتحويلات',
    icon: <Ruler size={24} />,
  },
  {
    id: 'invoice',
    title: 'إعدادات الفواتير',
    description: 'تخصيص شكل الفواتير والأرقام',
    icon: <Receipt size={24} />,
  },
  {
    id: 'tax',
    title: 'الضرائب',
    description: 'إعدادات الضرائب ونسبها',
    icon: <Calculator size={24} />,
  },
  {
    id: 'notifications',
    title: 'الإشعارات',
    description: 'إعدادات الإشعارات والتنبيهات',
    icon: <Bell size={24} />,
  },
  {
    id: 'appearance',
    title: 'المظهر',
    description: 'تخصيص الألوان والوضع الداكن',
    icon: <Palette size={24} />,
  },
  {
    id: 'language',
    title: 'اللغة',
    description: 'إعدادات اللغة والمنطقة',
    icon: <Globe size={24} />,
  },
  {
    id: 'backup',
    title: 'النسخ الاحتياطي',
    description: 'النسخ الاحتياطي والاستعادة',
    icon: <Database size={24} />,
  },
];

export default function SettingsPage() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('organization');
  const [orgData, setOrgData] = useState({
    name: 'شركة برافو للصناعات الكيميائية',
    address: 'القاهرة - مدينة نصر',
    phone: '01012345678',
    email: 'info@bravo-factory.com',
    taxNumber: '123456789',
    currency: 'EGP',
  });

  return (
    <div>
      {/* الهيدر */}
      <div className="mb-6">
        <h1 className="page-title flex items-center gap-3">
          <Settings size={28} />
          {t('settings.title')}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          إدارة إعدادات النظام
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* القائمة الجانبية */}
        <div className="col-span-1">
          <div className="card">
            <div className="card-body p-2">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-right transition-colors ${
                    activeSection === section.id
                      ? 'bg-[var(--primary)] text-white'
                      : 'hover:bg-[var(--surface-hover)]'
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className={activeSection === section.id ? 'text-white' : 'text-[var(--text-muted)]'}>
                    {section.icon}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{section.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* محتوى الإعدادات */}
        <div className="col-span-3">
          {activeSection === 'organization' && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Building size={20} />
                  بيانات المؤسسة
                </h2>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-2 gap-6">
                  <div className="input-group col-span-2">
                    <label className="input-label">اسم المؤسسة</label>
                    <input
                      type="text"
                      className="input"
                      value={orgData.name}
                      onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                    />
                  </div>
                  <div className="input-group col-span-2">
                    <label className="input-label">العنوان</label>
                    <input
                      type="text"
                      className="input"
                      value={orgData.address}
                      onChange={(e) => setOrgData({ ...orgData, address: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">رقم الهاتف</label>
                    <input
                      type="tel"
                      className="input"
                      value={orgData.phone}
                      onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">البريد الإلكتروني</label>
                    <input
                      type="email"
                      className="input"
                      value={orgData.email}
                      onChange={(e) => setOrgData({ ...orgData, email: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">الرقم الضريبي</label>
                    <input
                      type="text"
                      className="input"
                      value={orgData.taxNumber}
                      onChange={(e) => setOrgData({ ...orgData, taxNumber: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">العملة</label>
                    <select
                      className="input"
                      value={orgData.currency}
                      onChange={(e) => setOrgData({ ...orgData, currency: e.target.value })}
                    >
                      <option value="EGP">جنيه مصري (EGP)</option>
                      <option value="SAR">ريال سعودي (SAR)</option>
                      <option value="AED">درهم إماراتي (AED)</option>
                      <option value="USD">دولار أمريكي (USD)</option>
                    </select>
                  </div>
                  <div className="input-group col-span-2">
                    <label className="input-label">شعار المؤسسة</label>
                    <div className="border-2 border-dashed border-[var(--border)] rounded-lg p-8 text-center">
                      <p className="text-[var(--text-muted)]">
                        اسحب الملف هنا أو انقر للاختيار
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-2">
                        PNG, JPG بحد أقصى 2MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary">
                  <Save size={18} />
                  حفظ التغييرات
                </button>
              </div>
            </div>
          )}

          {activeSection === 'units' && (
            <div className="card">
              <div className="card-header flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Ruler size={20} />
                  وحدات القياس
                </h2>
                <button className="btn btn-primary btn-sm">
                  إضافة وحدة
                </button>
              </div>
              <div className="card-body p-0">
                <table className="table">
                  <thead>
                    <tr>
                      <th>الوحدة</th>
                      <th>الرمز</th>
                      <th>النوع</th>
                      <th>معامل التحويل</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>كيلوجرام</td>
                      <td>كجم</td>
                      <td>وزن</td>
                      <td>1 (أساسي)</td>
                      <td>
                        <button className="btn btn-sm btn-ghost">تعديل</button>
                      </td>
                    </tr>
                    <tr>
                      <td>جرام</td>
                      <td>جم</td>
                      <td>وزن</td>
                      <td>0.001</td>
                      <td>
                        <button className="btn btn-sm btn-ghost">تعديل</button>
                      </td>
                    </tr>
                    <tr>
                      <td>لتر</td>
                      <td>لتر</td>
                      <td>حجم</td>
                      <td>1 (أساسي)</td>
                      <td>
                        <button className="btn btn-sm btn-ghost">تعديل</button>
                      </td>
                    </tr>
                    <tr>
                      <td>ملليلتر</td>
                      <td>مل</td>
                      <td>حجم</td>
                      <td>0.001</td>
                      <td>
                        <button className="btn btn-sm btn-ghost">تعديل</button>
                      </td>
                    </tr>
                    <tr>
                      <td>قطعة</td>
                      <td>قطعة</td>
                      <td>عدد</td>
                      <td>1</td>
                      <td>
                        <button className="btn btn-sm btn-ghost">تعديل</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Palette size={20} />
                  المظهر
                </h2>
              </div>
              <div className="card-body space-y-6">
                <div>
                  <label className="input-label mb-3 block">الوضع</label>
                  <div className="flex gap-4">
                    {themeOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setTheme(option.id)}
                        className={`theme-option ${theme === option.id ? 'selected' : ''}`}
                        aria-pressed={theme === option.id}
                      >
                        <div className={`theme-option-preview ${option.preview}`}></div>
                        <p className="text-center font-bold flex items-center justify-center gap-2">
                          {option.icon}
                          {option.label}
                        </p>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-3">
                    الوضع المُطبّق حالياً:{' '}
                    <span className="font-bold text-[var(--primary)]">
                      {resolvedTheme === 'dark' ? 'الوضع الداكن' : 'الوضع الفاتح'}
                    </span>
                    {theme === 'system' && ' (حسب إعدادات الجهاز)'}
                  </p>
                </div>

                <div>
                  <label className="input-label mb-3 block">اللون الأساسي</label>
                  <div className="flex gap-3">
                    {['#1e40af', '#059669', '#7c3aed', '#dc2626', '#ea580c', '#0891b2'].map((color) => (
                      <button
                        key={color}
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'language' && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Globe size={20} />
                  اللغة
                </h2>
              </div>
              <div className="card-body space-y-6">
                <div className="input-group">
                  <label className="input-label">لغة الواجهة</label>
                  <select className="input">
                    <option value="ar">العربية</option>
                    <option value="en" disabled>English (قريباً)</option>
                    <option value="fr" disabled>Français (قريباً)</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">تنسيق التاريخ</label>
                  <select className="input">
                    <option value="dd/mm/yyyy">يوم/شهر/سنة</option>
                    <option value="mm/dd/yyyy">شهر/يوم/سنة</option>
                    <option value="yyyy-mm-dd">سنة-شهر-يوم</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">تنسيق الأرقام</label>
                  <select className="input">
                    <option value="ar">أرقام عربية (٠١٢٣٤٥٦٧٨٩)</option>
                    <option value="en">أرقام إنجليزية (0123456789)</option>
                  </select>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary">
                  <Save size={18} />
                  حفظ التغييرات
                </button>
              </div>
            </div>
          )}

          {!['organization', 'units', 'appearance', 'language'].includes(activeSection) && (
            <div className="card">
              <div className="card-body text-center py-12">
                <Settings size={48} className="mx-auto text-[var(--text-muted)] mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {settingsSections.find((s) => s.id === activeSection)?.title}
                </h3>
                <p className="text-[var(--text-secondary)]">
                  هذا القسم قيد التطوير وسيكون متاحاً قريباً
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
