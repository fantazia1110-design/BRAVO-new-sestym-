import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { invoices, invoiceItems, customers, products, inventoryMovements, customerAccountMovements } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

// الحصول على جميع الفواتير
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const customerId = searchParams.get('customer');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    const invoicesList = await db.select({
      id: invoices.id,
      invoiceNumber: invoices.invoiceNumber,
      customerId: invoices.customerId,
      invoiceDate: invoices.invoiceDate,
      dueDate: invoices.dueDate,
      subtotal: invoices.subtotal,
      discountAmount: invoices.discountAmount,
      taxAmount: invoices.taxAmount,
      total: invoices.total,
      paidAmount: invoices.paidAmount,
      remainingAmount: invoices.remainingAmount,
      status: invoices.status,
      createdAt: invoices.createdAt,
      customerName: customers.name,
    })
    .from(invoices)
    .leftJoin(customers, eq(invoices.customerId, customers.id))
    .orderBy(desc(invoices.createdAt))
    .limit(limit)
    .offset(offset);

    // حساب العدد الإجمالي
    const countResult = await db.select({ count: sql<number>`count(*)` })
      .from(invoices);

    const total = Number(countResult[0]?.count || 0);

    return NextResponse.json({
      success: true,
      data: invoicesList,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء جلب الفواتير' },
      { status: 500 }
    );
  }
}

// إنشاء فاتورة جديدة
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      customerId,
      dueDate,
      items,
      discountAmount,
      discountPercentage,
      taxAmount,
      taxPercentage,
      paidAmount,
      paymentMethod,
      notes,
    } = body;

    // التحقق من البيانات المطلوبة
    if (!customerId) {
      return NextResponse.json(
        { success: false, error: 'العميل مطلوب' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'يجب إضافة منتج واحد على الأقل' },
        { status: 400 }
      );
    }

    // التحقق من وجود العميل
    const [customer] = await db.select().from(customers).where(eq(customers.id, customerId));
    if (!customer) {
      return NextResponse.json(
        { success: false, error: 'العميل غير موجود' },
        { status: 404 }
      );
    }

    const invoiceId = uuidv4();
    const now = new Date();

    // حساب المجموع الفرعي
    let subtotal = 0;
    const itemValues = [];

    for (const item of items) {
      const itemTotal = parseFloat(item.quantity) * parseFloat(item.unitPrice) - parseFloat(item.discountAmount || '0');
      subtotal += itemTotal;

      itemValues.push({
        id: uuidv4(),
        invoiceId,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discountAmount: item.discountAmount || '0',
        total: String(itemTotal),
        costAtTime: item.costAtTime,
        notes: item.notes,
      });
    }

    // حساب الإجمالي
    const discount = parseFloat(discountAmount || '0');
    const tax = parseFloat(taxAmount || '0');
    const total = subtotal - discount + tax;
    const paid = parseFloat(paidAmount || '0');
    const remaining = total - paid;

    // تحديد حالة الفاتورة
    let status: 'draft' | 'confirmed' | 'paid' | 'partially_paid' = 'confirmed';
    if (remaining <= 0) {
      status = 'paid';
    } else if (paid > 0) {
      status = 'partially_paid';
    }

    // إنشاء رقم الفاتورة
    const year = now.getFullYear();
    const countResult = await db.select({ count: sql<number>`count(*)` }).from(invoices);
    const invoiceCount = Number(countResult[0]?.count || 0) + 1;
    const invoiceNumber = `INV-${year}-${String(invoiceCount).padStart(4, '0')}`;

    // إنشاء الفاتورة
    const [newInvoice] = await db.insert(invoices).values({
      id: invoiceId,
      invoiceNumber,
      customerId,
      invoiceDate: now,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      subtotal: String(subtotal),
      discountAmount: String(discount),
      discountPercentage: discountPercentage || '0',
      taxAmount: String(tax),
      taxPercentage: taxPercentage || '0',
      total: String(total),
      paidAmount: String(paid),
      remainingAmount: String(remaining),
      status,
      notes,
      createdAt: now,
      updatedAt: now,
    }).returning();

    // إضافة بنود الفاتورة
    await db.insert(invoiceItems).values(itemValues);

    // تحديث حساب العميل
    const newBalance = parseFloat(customer.balance || '0') + remaining;
    const newTotalPurchases = parseFloat(customer.totalPurchases || '0') + total;
    const newTotalPayments = parseFloat(customer.totalPayments || '0') + paid;

    await db.update(customers)
      .set({
        balance: String(newBalance),
        totalPurchases: String(newTotalPurchases),
        totalPayments: String(newTotalPayments),
        updatedAt: now,
      })
      .where(eq(customers.id, customerId));

    // تسجيل حركة حساب العميل (مدين بالفاتورة)
    await db.insert(customerAccountMovements).values({
      id: uuidv4(),
      customerId,
      movementType: 'debit',
      amount: String(total),
      balanceBefore: customer.balance || '0',
      balanceAfter: String(newBalance),
      referenceType: 'invoice',
      referenceId: invoiceId,
      description: `فاتورة رقم ${invoiceNumber}`,
      createdAt: now,
    });

    // خصم المنتجات من المخزون
    for (const item of items) {
      const [product] = await db.select().from(products).where(eq(products.id, item.productId));
      if (product) {
        const currentQty = parseFloat(product.currentQuantity || '0');
        const soldQty = parseFloat(item.quantity);
        const newQty = currentQty - soldQty;

        await db.update(products)
          .set({
            currentQuantity: String(newQty),
            updatedAt: now,
          })
          .where(eq(products.id, item.productId));

        // تسجيل حركة المخزون
        await db.insert(inventoryMovements).values({
          id: uuidv4(),
          itemType: 'product',
          itemId: item.productId,
          movementType: 'sale',
          quantity: item.quantity,
          quantityBefore: String(currentQty),
          quantityAfter: String(newQty),
          referenceType: 'invoice',
          referenceId: invoiceId,
          notes: `فاتورة رقم ${invoiceNumber}`,
          createdAt: now,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: newInvoice,
      message: 'تم إنشاء الفاتورة بنجاح',
    });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء إنشاء الفاتورة' },
      { status: 500 }
    );
  }
}
