import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params; 
    const { searchParams } = new URL(request.url);
    const excludeId = searchParams.get('exclude');
    
    const news = await prisma.news.findMany({
      where: {
        category: category,
        ...(excludeId && { id: { not: parseInt(excludeId) } }),
      },
      orderBy: { date: 'desc' },
      take: 4,
    });
    
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch related articles' },
      { status: 500 }
    );
  }
}