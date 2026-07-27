import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string, currency = 'EGP'): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  const value = new Intl.NumberFormat('ar-EG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(num) ? num : 0);

  // نكتب اسم العملة كاملاً بدل الاختصار (ج.م.)
  const names: Record<string, string> = {
    EGP: 'جنيه',
    SAR: 'ريال',
    AED: 'درهم',
    USD: 'دولار',
    EUR: 'يورو',
  };

  return `${value} ${names[currency] ?? currency}`;
}

export function formatNumber(num: number | string, decimals = 2): string {
  const n = typeof num === 'string' ? parseFloat(num) : num;
  return new Intl.NumberFormat('ar-EG', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function generateCode(prefix: string, length = 6): string {
  const chars = '0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${code}`;
}

// حساب كمية المادة بناءً على النسبة وحجم الدفعة
export function calculateQuantityFromPercentage(
  batchSize: number,
  percentage: number
): number {
  return (batchSize * percentage) / 100;
}

// حساب النسبة بناءً على الكمية وحجم الدفعة
export function calculatePercentageFromQuantity(
  batchSize: number,
  quantity: number
): number {
  if (batchSize === 0) return 0;
  return (quantity / batchSize) * 100;
}

// حساب تكلفة المادة
export function calculateMaterialCost(
  quantity: number,
  pricePerUnit: number
): number {
  return quantity * pricePerUnit;
}

// حساب نسبة الفاقد
export function calculateWastagePercentage(
  plannedQuantity: number,
  actualQuantity: number
): number {
  if (plannedQuantity === 0) return 0;
  const wastage = plannedQuantity - actualQuantity;
  return (wastage / plannedQuantity) * 100;
}

// تحويل الوحدات
export function convertUnit(
  value: number,
  fromConversionFactor: number,
  toConversionFactor: number
): number {
  // نحول إلى الوحدة الأساسية ثم إلى الوحدة المطلوبة
  const baseValue = value * fromConversionFactor;
  return baseValue / toConversionFactor;
}

// التحقق من صحة مجموع النسب
export function validatePercentageSum(percentages: number[]): {
  valid: boolean;
  sum: number;
  message: string;
} {
  const sum = percentages.reduce((acc, p) => acc + p, 0);
  const roundedSum = Math.round(sum * 100) / 100;
  
  if (Math.abs(roundedSum - 100) < 0.01) {
    return { valid: true, sum: roundedSum, message: 'مجموع النسب صحيح (100%)' };
  } else if (roundedSum < 100) {
    return { valid: false, sum: roundedSum, message: `مجموع النسب أقل من 100% (${roundedSum}%)` };
  } else {
    return { valid: false, sum: roundedSum, message: `مجموع النسب أكبر من 100% (${roundedSum}%)` };
  }
}

// حساب التكلفة الإجمالية للإنتاج
export function calculateTotalProductionCost(costs: {
  rawMaterials: number;
  packaging: number;
  labor: number;
  electricity: number;
  water: number;
  transport: number;
  overhead: number;
  other: number;
}): number {
  return Object.values(costs).reduce((sum, cost) => sum + cost, 0);
}

// حساب تكلفة الوحدة
export function calculateUnitCost(
  totalCost: number,
  quantity: number
): number {
  if (quantity === 0) return 0;
  return totalCost / quantity;
}

// حساب سعر البيع بناءً على هامش الربح
export function calculateSellingPrice(
  cost: number,
  profitMarginPercent: number
): number {
  return cost * (1 + profitMarginPercent / 100);
}

// حساب هامش الربح
export function calculateProfitMargin(
  sellingPrice: number,
  cost: number
): number {
  if (cost === 0) return 0;
  return ((sellingPrice - cost) / cost) * 100;
}

// حساب الكمية المتاحة
export function calculateAvailableQuantity(
  currentQuantity: number,
  reservedQuantity: number
): number {
  return Math.max(0, currentQuantity - reservedQuantity);
}

// التحقق من توفر المخزون
export function checkStockAvailability(
  availableQuantity: number,
  requiredQuantity: number
): {
  available: boolean;
  shortage: number;
} {
  if (availableQuantity >= requiredQuantity) {
    return { available: true, shortage: 0 };
  }
  return {
    available: false,
    shortage: requiredQuantity - availableQuantity,
  };
}
