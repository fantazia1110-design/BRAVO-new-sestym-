import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { formulas, formulaVersions, formulaIngredients, formulaSteps, categories, units } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

// الحصول على جميع التركيبات
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('category');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    const formulasList = await db.select({
      id: formulas.id,
      code: formulas.code,
      name: formulas.name,
      categoryId: formulas.categoryId,
      description: formulas.description,
      baseBatchSize: formulas.baseBatchSize,
      batchUnitId: formulas.batchUnitId,
      targetPh: formulas.targetPh,
      status: formulas.status,
      currentVersion: formulas.currentVersion,
      isActive: formulas.isActive,
      createdAt: formulas.createdAt,
      categoryName: categories.name,
      unitSymbol: units.symbol,
    })
    .from(formulas)
    .leftJoin(categories, eq(formulas.categoryId, categories.id))
    .leftJoin(units, eq(formulas.batchUnitId, units.id))
    .where(eq(formulas.isActive, true))
    .orderBy(desc(formulas.createdAt))
    .limit(limit)
    .offset(offset);

    // حساب العدد الإجمالي
    const countResult = await db.select({ count: sql<number>`count(*)` })
      .from(formulas)
      .where(eq(formulas.isActive, true));

    const total = Number(countResult[0]?.count || 0);

    return NextResponse.json({
      success: true,
      data: formulasList,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching formulas:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء جلب التركيبات' },
      { status: 500 }
    );
  }
}

// إنشاء تركيبة جديدة
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      code,
      name,
      categoryId,
      description,
      baseBatchSize,
      batchUnitId,
      targetPh,
      targetViscosity,
      notes,
      safetyInstructions,
      storageInstructions,
      packagingInstructions,
      ingredients,
      steps,
    } = body;

    // التحقق من البيانات المطلوبة
    if (!name || !name.ar) {
      return NextResponse.json(
        { success: false, error: 'اسم التركيبة مطلوب' },
        { status: 400 }
      );
    }

    if (!baseBatchSize || parseFloat(baseBatchSize) <= 0) {
      return NextResponse.json(
        { success: false, error: 'حجم الدفعة مطلوب ويجب أن يكون أكبر من صفر' },
        { status: 400 }
      );
    }

    const formulaId = uuidv4();
    const versionId = uuidv4();
    const now = new Date();

    // إنشاء التركيبة
    const [newFormula] = await db.insert(formulas).values({
      id: formulaId,
      code: code || `FRM-${Date.now()}`,
      name,
      categoryId,
      description,
      baseBatchSize,
      batchUnitId,
      targetPh,
      targetViscosity,
      notes,
      safetyInstructions,
      storageInstructions,
      packagingInstructions,
      status: 'draft',
      currentVersion: 1,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    }).returning();

    // إنشاء الإصدار الأول
    await db.insert(formulaVersions).values({
      id: versionId,
      formulaId,
      version: 1,
      baseBatchSize,
      batchUnitId,
      createdAt: now,
    });

    // إضافة المكونات إن وجدت
    if (ingredients && ingredients.length > 0) {
      const ingredientValues = ingredients.map((ing: {
        rawMaterialId: string;
        percentage: string;
        quantity: string;
        unitId?: string;
        sortOrder?: number;
        notes?: string;
        isOptional?: boolean;
      }, index: number) => ({
        id: uuidv4(),
        formulaVersionId: versionId,
        rawMaterialId: ing.rawMaterialId,
        percentage: ing.percentage,
        quantity: ing.quantity,
        unitId: ing.unitId,
        sortOrder: ing.sortOrder || index,
        notes: ing.notes,
        isOptional: ing.isOptional || false,
      }));

      await db.insert(formulaIngredients).values(ingredientValues);
    }

    // إضافة خطوات التصنيع إن وجدت
    if (steps && steps.length > 0) {
      const stepValues = steps.map((step: {
        title: { ar: string; en?: string };
        description?: { ar?: string; en?: string };
        duration?: number;
        temperature?: string;
        mixingSpeed?: string;
        notes?: string;
      }, index: number) => ({
        id: uuidv4(),
        formulaVersionId: versionId,
        stepNumber: index + 1,
        title: step.title,
        description: step.description,
        duration: step.duration,
        temperature: step.temperature,
        mixingSpeed: step.mixingSpeed,
        notes: step.notes,
      }));

      await db.insert(formulaSteps).values(stepValues);
    }

    return NextResponse.json({
      success: true,
      data: newFormula,
      message: 'تم إنشاء التركيبة بنجاح',
    });
  } catch (error) {
    console.error('Error creating formula:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء إنشاء التركيبة' },
      { status: 500 }
    );
  }
}
