'use client';

import React, { useState, useCallback } from 'react';
import {
  Plus,
  Trash2,
  Save,
  Calculator,
  AlertTriangle,
  CheckCircle,
  Copy,
  Download,
  FlaskConical,
  Package,
  Settings,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { t } from '@/lib/localization';
import {
  formatCurrency,
  formatNumber,
  calculateQuantityFromPercentage,
  calculateMaterialCost,
  validatePercentageSum,
  calculateTotalProductionCost,
  calculateUnitCost,
  calculateSellingPrice,
} from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';

interface RawMaterial {
  id: string;
  name: string;
  scientificName?: string;
  price: number;
  unit: string;
  available: number;
}

interface Ingredient {
  id: string;
  materialId: string;
  materialName: string;
  materialUnit: string;
  materialPrice: number;
  percentage: number;
  quantity: number;
  cost: number;
  available: number;
  notes: string;
}

interface ProductionCosts {
  packaging: number;
  labor: number;
  electricity: number;
  water: number;
  transport: number;
  overhead: number;
  other: number;
  wastagePercent: number;
}

// مواد خام تجريبية
const sampleMaterials: RawMaterial[] = [
  { id: '1', name: 'تكسابون (SLES)', scientificName: 'Sodium Laureth Sulfate', price: 95, unit: 'كجم', available: 200 },
  { id: '2', name: 'كوكاميدوبروبيل بيتين', scientificName: 'CAPB', price: 120, unit: 'كجم', available: 80 },
  { id: '3', name: 'جلسرين نباتي', scientificName: 'Glycerin', price: 45, unit: 'كجم', available: 400 },
  { id: '4', name: 'مادة حافظة MIT', scientificName: 'MIT', price: 450, unit: 'كجم', available: 10 },
  { id: '5', name: 'حمض الستريك', scientificName: 'Citric Acid', price: 35, unit: 'كجم', available: 300 },
  { id: '6', name: 'ملح الطعام', scientificName: 'NaCl', price: 8, unit: 'كجم', available: 800 },
  { id: '7', name: 'عطر ليمون', price: 180, unit: 'كجم', available: 50 },
  { id: '8', name: 'لون أصفر', price: 250, unit: 'كجم', available: 20 },
  { id: '9', name: 'ماء منزوع الأيونات', price: 2, unit: 'كجم', available: 10000 },
];

const initialCosts: ProductionCosts = {
  packaging: 0,
  labor: 0,
  electricity: 0,
  water: 0,
  transport: 0,
  overhead: 0,
  other: 0,
  wastagePercent: 3,
};

export default function FormulaLabPage() {
  const [formulaName, setFormulaName] = useState('');
  const [batchSize, setBatchSize] = useState(100);
  const [batchUnit, setBatchUnit] = useState('كجم');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [costs, setCosts] = useState<ProductionCosts>(initialCosts);
  const [profitMargin, setProfitMargin] = useState(25);
  const [showMaterialSelector, setShowMaterialSelector] = useState(false);
  const [showCostBreakdown, setShowCostBreakdown] = useState(true);
  const [searchMaterial, setSearchMaterial] = useState('');

  // حساب مجموع النسب
  const totalPercentage = ingredients.reduce((sum, ing) => sum + ing.percentage, 0);
  const percentageValidation = validatePercentageSum(ingredients.map((i) => i.percentage));

  // حساب تكلفة المواد الخام
  const rawMaterialsCost = ingredients.reduce((sum, ing) => sum + ing.cost, 0);

  // حساب تكلفة الفاقد
  const wastageCost = rawMaterialsCost * (costs.wastagePercent / 100);

  // حساب التكلفة الإجمالية
  const totalProductionCost = calculateTotalProductionCost({
    rawMaterials: rawMaterialsCost + wastageCost,
    packaging: costs.packaging,
    labor: costs.labor,
    electricity: costs.electricity,
    water: costs.water,
    transport: costs.transport,
    overhead: costs.overhead,
    other: costs.other,
  });

  // حساب تكلفة الوحدة
  const unitCost = calculateUnitCost(totalProductionCost, batchSize);

  // حساب سعر البيع المقترح
  const suggestedPrice = calculateSellingPrice(unitCost, profitMargin);

  // إضافة مكون جديد
  const addIngredient = (material: RawMaterial) => {
    const existingIndex = ingredients.findIndex((i) => i.materialId === material.id);
    if (existingIndex >= 0) {
      setShowMaterialSelector(false);
      return;
    }

    const newIngredient: Ingredient = {
      id: `ing-${Date.now()}`,
      materialId: material.id,
      materialName: material.name,
      materialUnit: material.unit,
      materialPrice: material.price,
      percentage: 0,
      quantity: 0,
      cost: 0,
      available: material.available,
      notes: '',
    };

    setIngredients([...ingredients, newIngredient]);
    setShowMaterialSelector(false);
  };

  // تحديث مكون
  const updateIngredient = useCallback(
    (id: string, field: 'percentage' | 'quantity', value: number) => {
      setIngredients((prev) =>
        prev.map((ing) => {
          if (ing.id !== id) return ing;

          let percentage = ing.percentage;
          let quantity = ing.quantity;

          if (field === 'percentage') {
            percentage = value;
            quantity = calculateQuantityFromPercentage(batchSize, value);
          } else {
            quantity = value;
            percentage = batchSize > 0 ? (value / batchSize) * 100 : 0;
          }

          const cost = calculateMaterialCost(quantity, ing.materialPrice);

          return { ...ing, percentage, quantity, cost };
        })
      );
    },
    [batchSize]
  );

  // حذف مكون
  const removeIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

  // تغيير حجم الدفعة وإعادة حساب الكميات
  const handleBatchSizeChange = (newSize: number) => {
    if (newSize <= 0) return;
    
    setIngredients((prev) =>
      prev.map((ing) => {
        const quantity = calculateQuantityFromPercentage(newSize, ing.percentage);
        const cost = calculateMaterialCost(quantity, ing.materialPrice);
        return { ...ing, quantity, cost };
      })
    );
    setBatchSize(newSize);
  };

  // التحقق من توفر المخزون
  const checkStockAvailability = () => {
    return ingredients.map((ing) => ({
      ...ing,
      isAvailable: ing.available >= ing.quantity,
      shortage: Math.max(0, ing.quantity - ing.available),
    }));
  };

  const stockStatus = checkStockAvailability();
  const hasStockIssues = stockStatus.some((s) => !s.isAvailable);

  // فلترة المواد الخام
  const filteredMaterials = sampleMaterials.filter(
    (m) =>
      m.name.includes(searchMaterial) ||
      m.scientificName?.toLowerCase().includes(searchMaterial.toLowerCase())
  );

  return (
    <div>
      {/* الهيدر */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('formula_lab.title')}</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            إنشاء وحساب تكاليف التركيبات
          </p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline">
            <Copy size={18} />
            نسخ التركيبة
          </button>
          <button className="btn btn-outline">
            <Download size={18} />
            تصدير PDF
          </button>
          <button className="btn btn-primary">
            <Save size={18} />
            حفظ التركيبة
          </button>
        </div>
      </div>

      <div className="formula-lab-container">
        {/* القسم الرئيسي */}
        <div className="space-y-6">
          {/* معلومات التركيبة */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FlaskConical size={20} />
                معلومات التركيبة
              </h2>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-3 gap-4">
                <div className="input-group col-span-2">
                  <label className="input-label">اسم التركيبة</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="مثال: شامبو العناية بالشعر"
                    value={formulaName}
                    onChange={(e) => setFormulaName(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">حجم الدفعة</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      className="input flex-1"
                      value={batchSize}
                      onChange={(e) => handleBatchSizeChange(parseFloat(e.target.value) || 0)}
                      min="0.1"
                      step="0.1"
                    />
                    <select
                      className="input w-24"
                      value={batchUnit}
                      onChange={(e) => setBatchUnit(e.target.value)}
                    >
                      <option value="كجم">كجم</option>
                      <option value="لتر">لتر</option>
                      <option value="جم">جم</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* المكونات */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <h2 className="text-lg font-semibold">المكونات</h2>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowMaterialSelector(true)}
              >
                <Plus size={16} />
                إضافة مكون
              </button>
            </div>
            <div className="card-body p-0">
              {ingredients.length === 0 ? (
                <div className="empty-state py-12">
                  <FlaskConical className="empty-state-icon" />
                  <p className="empty-state-title">لا توجد مكونات</p>
                  <p className="empty-state-description">
                    ابدأ بإضافة المواد الخام للتركيبة
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowMaterialSelector(true)}
                  >
                    <Plus size={18} />
                    إضافة مكون
                  </button>
                </div>
              ) : (
                <div className="lab-rows">
                  {/* رأس الجدول */}
                  <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-[var(--surface-hover)] text-sm font-medium text-[var(--text-secondary)] border-b border-[var(--border)]">
                    <div className="col-span-4">المادة</div>
                    <div className="col-span-2 text-center">النسبة %</div>
                    <div className="col-span-2 text-center">الكمية</div>
                    <div className="col-span-2 text-center">التكلفة</div>
                    <div className="col-span-1 text-center">المخزون</div>
                    <div className="col-span-1"></div>
                  </div>

                  {/* الصفوف */}
                  {ingredients.map((ing) => {
                    const stockItem = stockStatus.find((s) => s.id === ing.id);
                    const hasStockIssue = stockItem && !stockItem.isAvailable;

                    return (
                      <div
                        key={ing.id}
                        className={`grid grid-cols-12 gap-2 px-4 py-3 border-b border-[var(--border)] items-center ${
                          hasStockIssue ? 'bg-red-50' : ''
                        }`}
                      >
                        <div className="col-span-4">
                          <p className="font-medium">{ing.materialName}</p>
                          <p className="text-xs text-[var(--text-muted)]">
                            {formatCurrency(ing.materialPrice)}/{ing.materialUnit}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <div className="relative">
                            <input
                              type="number"
                              className="input text-center pl-8"
                              value={ing.percentage}
                              onChange={(e) =>
                                updateIngredient(ing.id, 'percentage', parseFloat(e.target.value) || 0)
                              }
                              min="0"
                              max="100"
                              step="0.1"
                            />
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                              %
                            </span>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="relative">
                            <input
                              type="number"
                              className="input text-center pl-12"
                              value={ing.quantity.toFixed(2)}
                              onChange={(e) =>
                                updateIngredient(ing.id, 'quantity', parseFloat(e.target.value) || 0)
                              }
                              min="0"
                              step="0.01"
                            />
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)]">
                              {ing.materialUnit}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-2 text-center font-medium">
                          {formatCurrency(ing.cost)}
                        </div>
                        <div className="col-span-1 text-center">
                          {hasStockIssue ? (
                            <span className="text-red-600 text-sm" title={`نقص: ${formatNumber(stockItem!.shortage)} ${ing.materialUnit}`}>
                              <AlertTriangle size={16} className="inline" />
                            </span>
                          ) : (
                            <span className="text-green-600">
                              <CheckCircle size={16} className="inline" />
                            </span>
                          )}
                        </div>
                        <div className="col-span-1 text-center">
                          <button
                            className="btn btn-icon btn-ghost text-red-500"
                            onClick={() => removeIngredient(ing.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* الإجمالي */}
                  <div className="grid grid-cols-12 gap-2 px-4 py-4 bg-[var(--surface-hover)] font-semibold">
                    <div className="col-span-4">الإجمالي</div>
                    <div className="col-span-2 text-center">
                      <span className={totalPercentage !== 100 ? 'text-red-600' : 'text-green-600'}>
                        {formatNumber(totalPercentage, 2)}%
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      {formatNumber(batchSize, 2)} {batchUnit}
                    </div>
                    <div className="col-span-2 text-center">
                      {formatCurrency(rawMaterialsCost)}
                    </div>
                    <div className="col-span-2"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* تحذيرات */}
          {!percentageValidation.valid && ingredients.length > 0 && (
            <div className="alert alert-warning">
              <AlertTriangle size={20} />
              <div>
                <p className="font-medium">{percentageValidation.message}</p>
                <p className="text-sm">يجب أن يكون مجموع النسب 100%</p>
              </div>
            </div>
          )}

          {hasStockIssues && (
            <div className="alert alert-error">
              <AlertTriangle size={20} />
              <div>
                <p className="font-medium">بعض المواد غير متوفرة بالكمية المطلوبة</p>
                <p className="text-sm">
                  راجع المكونات المحددة باللون الأحمر
                </p>
              </div>
            </div>
          )}
        </div>

        {/* القسم الجانبي - حساب التكاليف */}
        <div className="space-y-6">
          {/* تكلفة المواد الخام */}
          <div className="card">
            <div className="card-header flex items-center justify-between cursor-pointer"
                 onClick={() => setShowCostBreakdown(!showCostBreakdown)}>
              <h3 className="font-semibold flex items-center gap-2">
                <Calculator size={18} />
                حساب التكلفة
              </h3>
              {showCostBreakdown ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            {showCostBreakdown && (
              <div className="card-body space-y-4">
                {/* تكلفة المواد الخام */}
                <div className="flex justify-between py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--text-secondary)]">تكلفة المواد الخام</span>
                  <span className="font-medium">{formatCurrency(rawMaterialsCost)}</span>
                </div>

                {/* تكلفة التعبئة */}
                <div className="input-group">
                  <label className="input-label text-sm">تكلفة التعبئة والتغليف</label>
                  <input
                    type="number"
                    className="input"
                    value={costs.packaging}
                    onChange={(e) => setCosts({ ...costs, packaging: parseFloat(e.target.value) || 0 })}
                    min="0"
                  />
                </div>

                {/* تكلفة العمالة */}
                <div className="input-group">
                  <label className="input-label text-sm">تكلفة العمالة</label>
                  <input
                    type="number"
                    className="input"
                    value={costs.labor}
                    onChange={(e) => setCosts({ ...costs, labor: parseFloat(e.target.value) || 0 })}
                    min="0"
                  />
                </div>

                {/* تكلفة الكهرباء */}
                <div className="input-group">
                  <label className="input-label text-sm">تكلفة الكهرباء</label>
                  <input
                    type="number"
                    className="input"
                    value={costs.electricity}
                    onChange={(e) => setCosts({ ...costs, electricity: parseFloat(e.target.value) || 0 })}
                    min="0"
                  />
                </div>

                {/* المصروفات العامة */}
                <div className="input-group">
                  <label className="input-label text-sm">المصروفات العامة</label>
                  <input
                    type="number"
                    className="input"
                    value={costs.overhead}
                    onChange={(e) => setCosts({ ...costs, overhead: parseFloat(e.target.value) || 0 })}
                    min="0"
                  />
                </div>

                {/* نسبة الفاقد */}
                <div className="input-group">
                  <label className="input-label text-sm">نسبة الفاقد المتوقع %</label>
                  <input
                    type="number"
                    className="input"
                    value={costs.wastagePercent}
                    onChange={(e) => setCosts({ ...costs, wastagePercent: parseFloat(e.target.value) || 0 })}
                    min="0"
                    max="100"
                  />
                </div>

                <div className="flex justify-between py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--text-secondary)]">تكلفة الفاقد</span>
                  <span className="font-medium">{formatCurrency(wastageCost)}</span>
                </div>
              </div>
            )}
          </div>

          {/* الملخص */}
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="card-body space-y-4">
              <h3 className="font-semibold text-blue-800">ملخص التكلفة</h3>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>المواد الخام</span>
                  <span>{formatCurrency(rawMaterialsCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>الفاقد ({costs.wastagePercent}%)</span>
                  <span>{formatCurrency(wastageCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>التعبئة والتغليف</span>
                  <span>{formatCurrency(costs.packaging)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>العمالة</span>
                  <span>{formatCurrency(costs.labor)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>الكهرباء</span>
                  <span>{formatCurrency(costs.electricity)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>المصروفات العامة</span>
                  <span>{formatCurrency(costs.overhead)}</span>
                </div>
              </div>

              <div className="border-t border-blue-200 pt-3">
                <div className="flex justify-between font-bold text-lg text-blue-800">
                  <span>إجمالي التكلفة</span>
                  <span>{formatCurrency(totalProductionCost)}</span>
                </div>
              </div>

              <div className="bg-white/50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">تكلفة الوحدة</span>
                  <span className="font-semibold">{formatCurrency(unitCost)}/{batchUnit}</span>
                </div>
              </div>
            </div>
          </div>

          {/* سعر البيع */}
          <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="card-body space-y-4">
              <h3 className="font-semibold text-green-800">سعر البيع</h3>

              <div className="input-group">
                <label className="input-label text-sm">هامش الربح %</label>
                <input
                  type="number"
                  className="input"
                  value={profitMargin}
                  onChange={(e) => setProfitMargin(parseFloat(e.target.value) || 0)}
                  min="0"
                  max="1000"
                />
              </div>

              <div className="bg-white/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">سعر البيع المقترح</span>
                  <span className="text-2xl font-bold text-green-700">
                    {formatCurrency(suggestedPrice)}/{batchUnit}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm text-green-600">
                  <span>الربح المتوقع للدفعة</span>
                  <span className="font-semibold">
                    {formatCurrency((suggestedPrice - unitCost) * batchSize)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* مودال اختيار المادة الخام */}
      <Modal
        isOpen={showMaterialSelector}
        onClose={() => setShowMaterialSelector(false)}
        title="إضافة مكون"
        size="lg"
      >
        <div className="space-y-4">
          <input
            type="text"
            className="input"
            placeholder="ابحث عن مادة خام..."
            value={searchMaterial}
            onChange={(e) => setSearchMaterial(e.target.value)}
          />

          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredMaterials.map((material) => {
              const isAdded = ingredients.some((i) => i.materialId === material.id);
              
              return (
                <div
                  key={material.id}
                  className={`p-3 rounded-lg border ${
                    isAdded
                      ? 'border-green-200 bg-green-50 cursor-not-allowed'
                      : 'border-[var(--border)] hover:bg-[var(--surface-hover)] cursor-pointer'
                  }`}
                  onClick={() => !isAdded && addIngredient(material)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{material.name}</p>
                      {material.scientificName && (
                        <p className="text-xs text-[var(--text-muted)]">{material.scientificName}</p>
                      )}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">{formatCurrency(material.price)}/{material.unit}</p>
                      <p className="text-xs text-[var(--text-muted)]">
                        متاح: {formatNumber(material.available)} {material.unit}
                      </p>
                    </div>
                  </div>
                  {isAdded && (
                    <Badge variant="success" size="sm">
                      تمت الإضافة
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
}
