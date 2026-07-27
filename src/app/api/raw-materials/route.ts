import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { rawMaterials, rawMaterialPrices, categories, suppliers, units } from '@/db/schema';
import { eq, desc, ilike, or, sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

// هذه الواجهة تحتاج قاعدة بيانات وقت التشغيل ولا يمكن توليدها مسبقاً وقت البناء
export const dynamic = 'force-dynamic';

// الحصول على جميع المواد الخام
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const categoryId = searchParams.get('category');
    const supplierId = searchParams.get('supplier');
    const lowStock = searchParams.get('lowStock');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    let query = db.select({
      id: rawMaterials.id,
      code: rawMaterials.code,
      name: rawMaterials.name,
      scientificName: rawMaterials.scientificName,
      inciName: rawMaterials.inciName,
      categoryId: rawMaterials.categoryId,
      supplierId: rawMaterials.supplierId,
      unitId: rawMaterials.unitId,
      function: rawMaterials.function,
      description: rawMaterials.description,
      currentPrice: rawMaterials.currentPrice,
      currentQuantity: rawMaterials.currentQuantity,
      reservedQuantity: rawMaterials.reservedQuantity,
      minStock: rawMaterials.minStock,
      maxStock: rawMaterials.maxStock,
      isActive: rawMaterials.isActive,
      createdAt: rawMaterials.createdAt,
      categoryName: categories.name,
      supplierName: suppliers.name,
      unitSymbol: units.symbol,
      unitName: units.name,
    })
    .from(rawMaterials)
    .leftJoin(categories, eq(rawMaterials.categoryId, categories.id))
    .leftJoin(suppliers, eq(rawMaterials.supplierId, suppliers.id))
    .leftJoin(units, eq(rawMaterials.unitId, units.id))
    .where(eq(rawMaterials.isActive, true))
    .orderBy(desc(rawMaterials.createdAt))
    .limit(limit)
    .offset(offset);

    const materials = await query;

    // حساب العدد الإجمالي
    const countResult = await db.select({ count: sql<number>`count(*)` })
      .from(rawMaterials)
      .where(eq(rawMaterials.isActive, true));

    const total = Number(countResult[0]?.count || 0);

    return NextResponse.json({
      success: true,
      data: materials,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching raw materials:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء جلب المواد الخام' },
      { status: 500 }
    );
  }
}

// إضافة مادة خام جديدة
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      code,
      name,
      scientificName,
      inciName,
      categoryId,
      supplierId,
      unitId,
      function: materialFunction,
      description,
      usages,
      currentPrice,
      currentQuantity,
      minStock,
      maxStock,
      storageConditions,
      safetyInstructions,
      warnings,
      images,
      documents,
      substitutes,
    } = body;

    // التحقق من البيانات المطلوبة
    if (!name || !name.ar) {
      return NextResponse.json(
        { success: false, error: 'اسم المادة الخام مطلوب' },
        { status: 400 }
      );
    }

    const materialId = uuidv4();
    const now = new Date();

    // إنشاء المادة الخام
    const [newMaterial] = await db.insert(rawMaterials).values({
      id: materialId,
      code: code || `RM-${Date.now()}`,
      name,
      scientificName,
      inciName,
      categoryId,
      supplierId,
      unitId,
      function: materialFunction,
      description,
      usages,
      currentPrice: currentPrice || '0',
      currentQuantity: currentQuantity || '0',
      reservedQuantity: '0',
      minStock: minStock || '0',
      maxStock,
      storageConditions,
      safetyInstructions,
      warnings,
      images: images || [],
      documents: documents || [],
      substitutes: substitutes || [],
      isActive: true,
      createdAt: now,
      updatedAt: now,
    }).returning();

    // إذا تم تحديد سعر، نضيفه لسجل الأسعار
    if (currentPrice && parseFloat(currentPrice) > 0) {
      await db.insert(rawMaterialPrices).values({
        id: uuidv4(),
        rawMaterialId: materialId,
        price: currentPrice,
        effectiveDate: now,
        supplierId,
        createdAt: now,
      });
    }

    return NextResponse.json({
      success: true,
      data: newMaterial,
      message: 'تم إضافة المادة الخام بنجاح',
    });
  } catch (error) {
    console.error('Error creating raw material:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء إضافة المادة الخام' },
      { status: 500 }
    );
  }
}
