import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const subscription = await prisma.subscription.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(subscription || null);
  } catch (err) {
    console.error('Subscription fetch error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { plan } = body;

    if (!plan || !['MONTHLY', 'YEARLY'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      );
    }

    // Pricing in Rupiah
    const pricing = {
      MONTHLY: 49000,
      YEARLY: 490000, // 10 months price (cheaper yearly)
    };

    // Calculate end date
    const startDate = new Date();
    const endDate = new Date();
    if (plan === 'MONTHLY') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    // Deactivate any existing active subscription
    await prisma.subscription.updateMany({
      where: {
        userId,
        status: 'ACTIVE',
      },
      data: {
        status: 'INACTIVE',
      },
    });

    // Create new subscription
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        plan,
        priceInRupiah: pricing[plan as keyof typeof pricing],
        status: 'ACTIVE',
        startDate,
        endDate,
      },
    });

    return NextResponse.json(subscription, { status: 201 });
  } catch (err) {
    console.error('Subscription creation error:', err);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
