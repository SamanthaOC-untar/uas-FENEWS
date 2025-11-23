import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.news.findMany({
      select: { category: true },
      distinct: ['category'],
    });
    
    const categoryList = categories.map(c => c.category);
    
    return NextResponse.json(categoryList);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}