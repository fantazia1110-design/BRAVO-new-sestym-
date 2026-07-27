import {
  pgTable,
  text,
  varchar,
  integer,
  decimal,
  boolean,
  timestamp,
  uuid,
  jsonb,
  pgEnum,
} from 'drizzle-orm/pg-core';

// ============================================================
// ENUMS - التعدادات
// ============================================================

export const userRoleEnum = pgEnum('user_role', [
  'admin',
  'manager',
  'production_manager',
  'accountant',
  'warehouse_manager',
  'sales_manager',
  'user',
]);

export const unitTypeEnum = pgEnum('unit_type', [
  'weight',
  'volume',
  'piece',
  'percentage',
]);

export const movementTypeEnum = pgEnum('movement_type', [
  'purchase',
  'manual_add',
  'production_consumption',
  'sale',
  'return',
  'damaged',
  'expired',
  'adjustment',
  'transfer',
]);

export const productionStatusEnum = pgEnum('production_status', [
  'draft',
  'planned',
  'in_progress',
  'quality_check',
  'completed',
  'cancelled',
]);

export const invoiceStatusEnum = pgEnum('invoice_status', [
  'draft',
  'confirmed',
  'paid',
  'partially_paid',
  'cancelled',
]);

export const paymentMethodEnum = pgEnum('payment_method', [
  'cash',
  'bank_transfer',
  'vodafone_cash',
  'instapay',
  'other',
]);

export const formulaStatusEnum = pgEnum('formula_status', [
  'draft',
  'testing',
  'approved',
  'archived',
]);

// ============================================================
// المستخدمون والمؤسسات
// ============================================================

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: jsonb('name').$type<{ ar: string; en?: string; fr?: string }>().notNull(),
  logo: text('logo'),
  address: text('address'),
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 255 }),
  currency: varchar('currency', { length: 10 }).default('EGP'),
  taxNumber: varchar('tax_number', { length: 50 }),
  settings: jsonb('settings').$type<Record<string, unknown>>().default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash'),
  name: jsonb('name').$type<{ ar: string; en?: string; fr?: string }>().notNull(),
  phone: varchar('phone', { length: 50 }),
  role: userRoleEnum('role').default('user').notNull(),
  permissions: jsonb('permissions').$type<string[]>().default([]),
  isActive: boolean('is_active').default(true).notNull(),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================
// وحدات القياس
// ============================================================

export const units = pgTable('units', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  name: jsonb('name').$type<{ ar: string; en?: string; fr?: string }>().notNull(),
  symbol: varchar('symbol', { length: 20 }).notNull(),
  type: unitTypeEnum('type').notNull(),
  baseUnit: uuid('base_unit'),
  conversionFactor: decimal('conversion_factor', { precision: 15, scale: 6 }).default('1'),
  isBase: boolean('is_base').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================
// التصنيفات
// ============================================================

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  parentId: uuid('parent_id'),
  name: jsonb('name').$type<{ ar: string; en?: string; fr?: string }>().notNull(),
  description: jsonb('description').$type<{ ar?: string; en?: string; fr?: string }>(),
  type: varchar('type', { length: 50 }).notNull(), // raw_material, product, formula, lesson
  icon: varchar('icon', { length: 50 }),
  color: varchar('color', { length: 20 }),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================
// الموردون
// ============================================================

export const suppliers = pgTable('suppliers', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  code: varchar('code', { length: 50 }),
  name: jsonb('name').$type<{ ar: string; en?: string; fr?: string }>().notNull(),
  contactPerson: varchar('contact_person', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 255 }),
  address: text('address'),
  notes: text('notes'),
  balance: decimal('balance', { precision: 15, scale: 2 }).default('0'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================
// المواد الخام
// ============================================================

export const rawMaterials = pgTable('raw_materials', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  code: varchar('code', { length: 50 }),
  name: jsonb('name').$type<{ ar: string; en?: string; fr?: string }>().notNull(),
  scientificName: varchar('scientific_name', { length: 255 }),
  inciName: varchar('inci_name', { length: 255 }),
  categoryId: uuid('category_id').references(() => categories.id),
  supplierId: uuid('supplier_id').references(() => suppliers.id),
  unitId: uuid('unit_id').references(() => units.id),
  function: jsonb('function').$type<{ ar?: string; en?: string; fr?: string }>(),
  description: jsonb('description').$type<{ ar?: string; en?: string; fr?: string }>(),
  usages: jsonb('usages').$type<{ ar?: string; en?: string; fr?: string }>(),
  currentPrice: decimal('current_price', { precision: 15, scale: 4 }).default('0'),
  currentQuantity: decimal('current_quantity', { precision: 15, scale: 4 }).default('0'),
  reservedQuantity: decimal('reserved_quantity', { precision: 15, scale: 4 }).default('0'),
  minStock: decimal('min_stock', { precision: 15, scale: 4 }).default('0'),
  maxStock: decimal('max_stock', { precision: 15, scale: 4 }),
  storageConditions: text('storage_conditions'),
  safetyInstructions: text('safety_instructions'),
  warnings: text('warnings'),
  images: jsonb('images').$type<string[]>().default([]),
  documents: jsonb('documents').$type<{ name: string; url: string }[]>().default([]),
  substitutes: jsonb('substitutes').$type<string[]>().default([]),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================
// تاريخ أسعار المواد الخام
// ============================================================

export const rawMaterialPrices = pgTable('raw_material_prices', {
  id: uuid('id').primaryKey().defaultRandom(),
  rawMaterialId: uuid('raw_material_id').references(() => rawMaterials.id).notNull(),
  price: decimal('price', { precision: 15, scale: 4 }).notNull(),
  effectiveDate: timestamp('effective_date').notNull(),
  supplierId: uuid('supplier_id').references(() => suppliers.id),
  notes: text('notes'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================
// التركيبات
// ============================================================

export const formulas = pgTable('formulas', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  code: varchar('code', { length: 50 }),
  name: jsonb('name').$type<{ ar: string; en?: string; fr?: string }>().notNull(),
  categoryId: uuid('category_id').references(() => categories.id),
  description: jsonb('description').$type<{ ar?: string; en?: string; fr?: string }>(),
  baseBatchSize: decimal('base_batch_size', { precision: 15, scale: 4 }).notNull(),
  batchUnitId: uuid('batch_unit_id').references(() => units.id),
  targetPh: decimal('target_ph', { precision: 5, scale: 2 }),
  targetViscosity: varchar('target_viscosity', { length: 50 }),
  notes: text('notes'),
  safetyInstructions: text('safety_instructions'),
  storageInstructions: text('storage_instructions'),
  packagingInstructions: text('packaging_instructions'),
  status: formulaStatusEnum('status').default('draft').notNull(),
  currentVersion: integer('current_version').default(1).notNull(),
  createdBy: uuid('created_by').references(() => users.id),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================
// إصدارات التركيبات
// ============================================================

export const formulaVersions = pgTable('formula_versions', {
  id: uuid('id').primaryKey().defaultRandom(),
  formulaId: uuid('formula_id').references(() => formulas.id).notNull(),
  version: integer('version').notNull(),
  baseBatchSize: decimal('base_batch_size', { precision: 15, scale: 4 }).notNull(),
  batchUnitId: uuid('batch_unit_id').references(() => units.id),
  changeReason: text('change_reason'),
  totalCost: decimal('total_cost', { precision: 15, scale: 4 }),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================
// مكونات التركيبة
// ============================================================

export const formulaIngredients = pgTable('formula_ingredients', {
  id: uuid('id').primaryKey().defaultRandom(),
  formulaVersionId: uuid('formula_version_id').references(() => formulaVersions.id).notNull(),
  rawMaterialId: uuid('raw_material_id').references(() => rawMaterials.id).notNull(),
  percentage: decimal('percentage', { precision: 10, scale: 6 }).notNull(),
  quantity: decimal('quantity', { precision: 15, scale: 6 }).notNull(),
  unitId: uuid('unit_id').references(() => units.id),
  sortOrder: integer('sort_order').default(0),
  notes: text('notes'),
  isOptional: boolean('is_optional').default(false).notNull(),
});

// ============================================================
// خطوات التصنيع
// ============================================================

export const formulaSteps = pgTable('formula_steps', {
  id: uuid('id').primaryKey().defaultRandom(),
  formulaVersionId: uuid('formula_version_id').references(() => formulaVersions.id).notNull(),
  stepNumber: integer('step_number').notNull(),
  title: jsonb('title').$type<{ ar: string; en?: string; fr?: string }>().notNull(),
  description: jsonb('description').$type<{ ar?: string; en?: string; fr?: string }>(),
  duration: integer('duration'), // بالدقائق
  temperature: decimal('temperature', { precision: 5, scale: 2 }),
  mixingSpeed: varchar('mixing_speed', { length: 50 }),
  notes: text('notes'),
  images: jsonb('images').$type<string[]>().default([]),
});

// ============================================================
// مواد التعبئة والتغليف
// ============================================================

export const packaging = pgTable('packaging', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  code: varchar('code', { length: 50 }),
  name: jsonb('name').$type<{ ar: string; en?: string; fr?: string }>().notNull(),
  type: varchar('type', { length: 50 }), // bottle, jar, cap, label, box
  capacity: decimal('capacity', { precision: 15, scale: 4 }),
  capacityUnitId: uuid('capacity_unit_id').references(() => units.id),
  currentPrice: decimal('current_price', { precision: 15, scale: 4 }).default('0'),
  currentQuantity: decimal('current_quantity', { precision: 15, scale: 4 }).default('0'),
  minStock: decimal('min_stock', { precision: 15, scale: 4 }).default('0'),
  supplierId: uuid('supplier_id').references(() => suppliers.id),
  images: jsonb('images').$type<string[]>().default([]),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================
// المنتجات
// ============================================================

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  code: varchar('code', { length: 50 }),
  sku: varchar('sku', { length: 100 }),
  name: jsonb('name').$type<{ ar: string; en?: string; fr?: string }>().notNull(),
  categoryId: uuid('category_id').references(() => categories.id),
  formulaId: uuid('formula_id').references(() => formulas.id),
  formulaVersionId: uuid('formula_version_id').references(() => formulaVersions.id),
  description: jsonb('description').$type<{ ar?: string; en?: string; fr?: string }>(),
  packageSize: decimal('package_size', { precision: 15, scale: 4 }),
  packageUnitId: uuid('package_unit_id').references(() => units.id),
  packagingId: uuid('packaging_id').references(() => packaging.id),
  productionCost: decimal('production_cost', { precision: 15, scale: 4 }).default('0'),
  wholesalePrice: decimal('wholesale_price', { precision: 15, scale: 4 }).default('0'),
  retailPrice: decimal('retail_price', { precision: 15, scale: 4 }).default('0'),
  currentQuantity: decimal('current_quantity', { precision: 15, scale: 4 }).default('0'),
  reservedQuantity: decimal('reserved_quantity', { precision: 15, scale: 4 }).default('0'),
  minStock: decimal('min_stock', { precision: 15, scale: 4 }).default('0'),
  images: jsonb('images').$type<string[]>().default([]),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================
// دفعات التصنيع
// ============================================================

export const productionBatches = pgTable('production_batches', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  batchNumber: varchar('batch_number', { length: 50 }).notNull(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  formulaVersionId: uuid('formula_version_id').references(() => formulaVersions.id).notNull(),
  plannedQuantity: decimal('planned_quantity', { precision: 15, scale: 4 }).notNull(),
  actualQuantity: decimal('actual_quantity', { precision: 15, scale: 4 }),
  unitId: uuid('unit_id').references(() => units.id),
  wastage: decimal('wastage', { precision: 15, scale: 4 }).default('0'),
  wastageReason: text('wastage_reason'),
  status: productionStatusEnum('status').default('draft').notNull(),
  plannedStartDate: timestamp('planned_start_date'),
  plannedEndDate: timestamp('planned_end_date'),
  actualStartDate: timestamp('actual_start_date'),
  actualEndDate: timestamp('actual_end_date'),
  rawMaterialsCost: decimal('raw_materials_cost', { precision: 15, scale: 4 }).default('0'),
  packagingCost: decimal('packaging_cost', { precision: 15, scale: 4 }).default('0'),
  laborCost: decimal('labor_cost', { precision: 15, scale: 4 }).default('0'),
  electricityCost: decimal('electricity_cost', { precision: 15, scale: 4 }).default('0'),
  waterCost: decimal('water_cost', { precision: 15, scale: 4 }).default('0'),
  transportCost: decimal('transport_cost', { precision: 15, scale: 4 }).default('0'),
  overheadCost: decimal('overhead_cost', { precision: 15, scale: 4 }).default('0'),
  otherCosts: decimal('other_costs', { precision: 15, scale: 4 }).default('0'),
  totalCost: decimal('total_cost', { precision: 15, scale: 4 }).default('0'),
  costPerUnit: decimal('cost_per_unit', { precision: 15, scale: 4 }).default('0'),
  notes: text('notes'),
  qualityNotes: text('quality_notes'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================
// استهلاك المواد في التصنيع
// ============================================================

export const productionConsumption = pgTable('production_consumption', {
  id: uuid('id').primaryKey().defaultRandom(),
  batchId: uuid('batch_id').references(() => productionBatches.id).notNull(),
  rawMaterialId: uuid('raw_material_id').references(() => rawMaterials.id).notNull(),
  plannedQuantity: decimal('planned_quantity', { precision: 15, scale: 6 }).notNull(),
  actualQuantity: decimal('actual_quantity', { precision: 15, scale: 6 }),
  unitId: uuid('unit_id').references(() => units.id),
  priceAtTime: decimal('price_at_time', { precision: 15, scale: 4 }).notNull(),
  totalCost: decimal('total_cost', { precision: 15, scale: 4 }),
  notes: text('notes'),
});

// ============================================================
// حركات المخزون
// ============================================================

export const inventoryMovements = pgTable('inventory_movements', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  itemType: varchar('item_type', { length: 20 }).notNull(), // raw_material, product, packaging
  itemId: uuid('item_id').notNull(),
  movementType: movementTypeEnum('movement_type').notNull(),
  quantity: decimal('quantity', { precision: 15, scale: 4 }).notNull(),
  unitId: uuid('unit_id').references(() => units.id),
  quantityBefore: decimal('quantity_before', { precision: 15, scale: 4 }).notNull(),
  quantityAfter: decimal('quantity_after', { precision: 15, scale: 4 }).notNull(),
  referenceType: varchar('reference_type', { length: 50 }), // production_batch, sale, purchase
  referenceId: uuid('reference_id'),
  notes: text('notes'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================
// العملاء
// ============================================================

export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  code: varchar('code', { length: 50 }),
  name: jsonb('name').$type<{ ar: string; en?: string; fr?: string }>().notNull(),
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 255 }),
  address: text('address'),
  creditLimit: decimal('credit_limit', { precision: 15, scale: 2 }).default('0'),
  balance: decimal('balance', { precision: 15, scale: 2 }).default('0'),
  totalPurchases: decimal('total_purchases', { precision: 15, scale: 2 }).default('0'),
  totalPayments: decimal('total_payments', { precision: 15, scale: 2 }).default('0'),
  notes: text('notes'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================
// الفواتير
// ============================================================

export const invoices = pgTable('invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  invoiceNumber: varchar('invoice_number', { length: 50 }).notNull(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  invoiceDate: timestamp('invoice_date').defaultNow().notNull(),
  dueDate: timestamp('due_date'),
  subtotal: decimal('subtotal', { precision: 15, scale: 2 }).default('0'),
  discountAmount: decimal('discount_amount', { precision: 15, scale: 2 }).default('0'),
  discountPercentage: decimal('discount_percentage', { precision: 5, scale: 2 }).default('0'),
  taxAmount: decimal('tax_amount', { precision: 15, scale: 2 }).default('0'),
  taxPercentage: decimal('tax_percentage', { precision: 5, scale: 2 }).default('0'),
  total: decimal('total', { precision: 15, scale: 2 }).default('0'),
  paidAmount: decimal('paid_amount', { precision: 15, scale: 2 }).default('0'),
  remainingAmount: decimal('remaining_amount', { precision: 15, scale: 2 }).default('0'),
  status: invoiceStatusEnum('status').default('draft').notNull(),
  notes: text('notes'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================
// بنود الفاتورة
// ============================================================

export const invoiceItems = pgTable('invoice_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  invoiceId: uuid('invoice_id').references(() => invoices.id).notNull(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  quantity: decimal('quantity', { precision: 15, scale: 4 }).notNull(),
  unitPrice: decimal('unit_price', { precision: 15, scale: 4 }).notNull(),
  discountAmount: decimal('discount_amount', { precision: 15, scale: 2 }).default('0'),
  total: decimal('total', { precision: 15, scale: 2 }).notNull(),
  costAtTime: decimal('cost_at_time', { precision: 15, scale: 4 }),
  notes: text('notes'),
});

// ============================================================
// المدفوعات
// ============================================================

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  invoiceId: uuid('invoice_id').references(() => invoices.id),
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  paymentMethod: paymentMethodEnum('payment_method').notNull(),
  paymentDate: timestamp('payment_date').defaultNow().notNull(),
  referenceNumber: varchar('reference_number', { length: 100 }),
  notes: text('notes'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================
// حركات حساب العميل
// ============================================================

export const customerAccountMovements = pgTable('customer_account_movements', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  movementType: varchar('movement_type', { length: 20 }).notNull(), // debit, credit
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  balanceBefore: decimal('balance_before', { precision: 15, scale: 2 }).notNull(),
  balanceAfter: decimal('balance_after', { precision: 15, scale: 2 }).notNull(),
  referenceType: varchar('reference_type', { length: 50 }).notNull(), // invoice, payment
  referenceId: uuid('reference_id').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================
// المصروفات
// ============================================================

export const expenses = pgTable('expenses', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  categoryId: uuid('category_id').references(() => categories.id),
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  expenseDate: timestamp('expense_date').defaultNow().notNull(),
  description: text('description'),
  referenceNumber: varchar('reference_number', { length: 100 }),
  paymentMethod: paymentMethodEnum('payment_method'),
  attachments: jsonb('attachments').$type<string[]>().default([]),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================
// الدروس التعليمية
// ============================================================

export const lessons = pgTable('lessons', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  categoryId: uuid('category_id').references(() => categories.id),
  title: jsonb('title').$type<{ ar: string; en?: string; fr?: string }>().notNull(),
  introduction: jsonb('introduction').$type<{ ar?: string; en?: string; fr?: string }>(),
  materialsDescription: jsonb('materials_description').$type<{ ar?: string; en?: string; fr?: string }>(),
  formulaId: uuid('formula_id').references(() => formulas.id),
  manufacturingSteps: jsonb('manufacturing_steps').$type<{ ar?: string; en?: string; fr?: string }>(),
  temperature: varchar('temperature', { length: 50 }),
  mixingTime: varchar('mixing_time', { length: 50 }),
  targetPh: varchar('target_ph', { length: 20 }),
  commonMistakes: jsonb('common_mistakes').$type<{ ar?: string; en?: string; fr?: string }>(),
  tips: jsonb('tips').$type<{ ar?: string; en?: string; fr?: string }>(),
  safetyInstructions: jsonb('safety_instructions').$type<{ ar?: string; en?: string; fr?: string }>(),
  images: jsonb('images').$type<string[]>().default([]),
  videoUrl: text('video_url'),
  attachments: jsonb('attachments').$type<{ name: string; url: string }[]>().default([]),
  sortOrder: integer('sort_order').default(0),
  isPublished: boolean('is_published').default(false).notNull(),
  isFree: boolean('is_free').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================
// الكتب الرقمية
// ============================================================

export const books = pgTable('books', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  categoryId: uuid('category_id').references(() => categories.id),
  title: jsonb('title').$type<{ ar: string; en?: string; fr?: string }>().notNull(),
  description: jsonb('description').$type<{ ar?: string; en?: string; fr?: string }>(),
  author: varchar('author', { length: 255 }),
  coverImage: text('cover_image'),
  pdfUrl: text('pdf_url'),
  pageCount: integer('page_count'),
  isFree: boolean('is_free').default(true).notNull(),
  price: decimal('price', { precision: 15, scale: 2 }).default('0'),
  downloadCount: integer('download_count').default(0),
  isPublished: boolean('is_published').default(false).notNull(),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================
// الإشعارات
// ============================================================

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  userId: uuid('user_id').references(() => users.id),
  title: jsonb('title').$type<{ ar: string; en?: string; fr?: string }>().notNull(),
  body: jsonb('body').$type<{ ar?: string; en?: string; fr?: string }>(),
  type: varchar('type', { length: 50 }).notNull(),
  referenceType: varchar('reference_type', { length: 50 }),
  referenceId: uuid('reference_id'),
  isRead: boolean('is_read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================
// سجل العمليات
// ============================================================

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  userId: uuid('user_id').references(() => users.id),
  action: varchar('action', { length: 50 }).notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(),
  entityId: uuid('entity_id'),
  oldData: jsonb('old_data'),
  newData: jsonb('new_data'),
  ipAddress: varchar('ip_address', { length: 50 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================
// الإعدادات
// ============================================================

export const settings = pgTable('settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  key: varchar('key', { length: 100 }).notNull(),
  value: jsonb('value'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
