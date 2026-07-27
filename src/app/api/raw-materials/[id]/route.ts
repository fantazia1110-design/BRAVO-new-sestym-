import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { rawMaterials, rawMaterialPrices, formulaIngredients, formulaVersions, formulas, categories, suppliers, units } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

// هذه الواجهة تحتاج قاعدة بيانات وقت التشغيل ولا يمكن توليدها مسبقاً وقت البناء
export const dynamic = 'force-dynamic';

// الحصول على مادة خام محددة
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [material] = await db.select({
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
      usages: rawMaterials.usages,
      currentPrice: rawMaterials.currentPrice,
      currentQuantity: rawMaterials.currentQuantity,
      reservedQuantity: rawMaterials.reservedQuantity,
      minStock: rawMaterials.minStock,
      maxStock: rawMaterials.maxStock,
      storageConditions: rawMaterials.storageConditions,
      safetyInstructions: rawMaterials.safetyInstructions,
      warnings: rawMaterials.warnings,
      images: rawMaterials.images,
      documents: rawMaterials.documents,
      substitutes: rawMaterials.substitutes,
      isActive: rawMaterials.isActive,
      createdAt: rawMaterials.createdAt,
      updatedAt: rawMaterials.updatedAt,
      categoryName: categories.name,
      supplierName: suppliers.name,
      unitSymbol: units.symbol,
      unitName: units.name,
    })
    .from(rawMaterials)
    .leftJoin(categories, eq(rawMaterials.categoryId, categories.id))
    .leftJoin(suppliers, eq(rawMaterials.supplierId, suppliers.id))
    .leftJoin(units, eq(rawMaterials.unitId, units.id))
    .where(eq(rawMaterials.id, id));

    if (!material) {
      return NextResponse.json(
        { success: false, error: 'المادة الخام غير موجودة' },
        { status: 404 }
      );
    }

    // جلب سجل الأسعار
    const priceHistory = await db.select({
      id: rawMaterialPrices.id,
      price: rawMaterialPrices.price,
      effectiveDate: rawMaterialPrices.effectiveDate,
      supplierId: rawMaterialPrices.supplierId,
      supplierName: suppliers.name,
      notes: rawMaterialPrices.notes,
      createdAt: rawMaterialPrices.createdAt,
    })
    .from(rawMaterialPrices)
    .leftJoin(suppliers, eq(rawMaterialPrices.supplierId, suppliers.id))
    .where(eq(rawMaterialPrices.rawMaterialId, id))
    .orderBy(desc(rawMaterialPrices.effectiveDate));

    // جلب التركيبات المرتبطة
    const relatedFormulas = await db.select({
      formulaId: formulas.id,
      formulaName: formulas.name,
      formulaCode: formulas.code,
      percentage: formulaIngredients.percentage,
      quantity: formulaIngredients.quantity,
    })
    .from(formulaIngredients)
    .innerJoin(formulaVersions, eq(formulaIngredients.formulaVersionId, formulaVersions.id))
    .innerJoin(formulas, eq(formulaVersions.formulaId, formulas.id))
    .where(eq(formulaIngredients.rawMaterialId, id));

    return NextResponse.json({
      success: true,
      data: {
        ...material,
        priceHistory,
        relatedFormulas,
      },
    });
  } catch (error) {
    console.error('Error fetching raw material:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء جلب المادة الخام' },
      { status: 500 }
    );
  }
}

// تحديث مادة خام
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
      minStock,
      maxStock,
      storageConditions,
      safetyInstructions,
      warnings,
      images,
      documents,
      substitutes,
    } = body;

    // الحصول على المادة الحالية للتحقق من تغيير السعر
    const [existingMaterial] = await db.select()
      .from(rawMaterials)
      .where(eq(rawMaterials.id, id));

    if (!existingMaterial) {
      return NextResponse.json(
        { success: false, error: 'المادة الخام غير موجودة' },
        { status: 404 }
      );
    }

    const now = new Date();

    // تحديث المادة الخام
    const [updatedMaterial] = await db.update(rawMaterials)
      .set({
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
        minStock,
        maxStock,
        storageConditions,
        safetyInstructions,
        warnings,
        images,
        documents,
        substitutes,
        updatedAt: now,
      })
      .where(eq(rawMaterials.id, id))
      .returning();

    // إذا تغير السعر، نضيفه لسجل الأسعار
    if (currentPrice && existingMaterial.currentPrice !== currentPrice) {
      await db.insert(rawMaterialPrices).values({
        id: uuidv4(),
        rawMaterialId: id,
        price: currentPrice,
        effectiveDate: now,
        supplierId,
        notes: 'تحديث السعر',
        createdAt: now,
      });
    }

    return NextResponse.json({
      success: true,
      data: updatedMaterial,
      message: 'تم تحديث المادة الخام بنجاح',
    });
  } catch (error) {
    console.error('Error updating raw material:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء تحديث المادة الخام' },
      { status: 500 }
    );
  }
}

// حذف مادة خام (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // التحقق من وجود المادة في تركيبات
    const usedInFormulas = await db.select()
      .from(formulaIngredients)
      .where(eq(formulaIngredients.rawMaterialId, id))
      .limit(1);

    if (usedInFormulas.length > 0) {
      return NextResponse.json(
        { success: false, error: 'لا يمكن حذف المادة الخام لأنها مستخدمة في تركيبات' },
        { status: 400 }
      );
    }

    // Soft delete
    await db.update(rawMaterials)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(eq(rawMaterials.id, id));

    return NextResponse.json({
      success: true,
      message: 'تم حذف المادة الخام بنجاح',
    });
  } catch (error) {
    console.error('Error deleting raw material:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء حذف المادة الخام' },
      { status: 500 }
    );
  }
}
