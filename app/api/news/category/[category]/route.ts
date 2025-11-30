import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const { category } = await params;
    
    if (category !== 'olahraga') {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    const articles = await prisma.article.findMany({
      where: {
        category: 'Olahraga',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching sports articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sports articles' },
      { status: 500 }
    );
  }
}
