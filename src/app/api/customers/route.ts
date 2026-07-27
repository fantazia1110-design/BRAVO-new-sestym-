import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { customers } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

// الحصول على جميع العملاء
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    const customersList = await db.select()
      .from(customers)
      .where(eq(customers.isActive, true))
      .orderBy(desc(customers.createdAt))
      .limit(limit)
      .offset(offset);

    // حساب العدد الإجمالي
    const countResult = await db.select({ count: sql<number>`count(*)` })
      .from(customers)
      .where(eq(customers.isActive, true));

    const total = Number(countResult[0]?.count || 0);

    return NextResponse.json({
      success: true,
      data: customersList,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء جلب العملاء' },
      { status: 500 }
    );
  }
}

// إضافة عميل جديد
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      code,
      name,
      phone,
      email,
      address,
      creditLimit,
      notes,
    } = body;

    // التحقق من البيانات المطلوبة
    if (!name || !name.ar) {
      return NextResponse.json(
        { success: false, error: 'اسم العميل مطلوب' },
        { status: 400 }
      );
    }

    const customerId = uuidv4();
    const now = new Date();

    // إنشاء العميل
    const [newCustomer] = await db.insert(customers).values({
      id: customerId,
      code: code || `CUS-${Date.now()}`,
      name,
      phone,
      email,
      address,
      creditLimit: creditLimit || '0',
      balance: '0',
      totalPurchases: '0',
      totalPayments: '0',
      notes,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    }).returning();

    return NextResponse.json({
      success: true,
      data: newCustomer,
      message: 'تم إضافة العميل بنجاح',
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء إضافة العميل' },
      { status: 500 }
    );
  }
}
