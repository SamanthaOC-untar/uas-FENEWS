import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const heroNews = await prisma.news.findMany({
      orderBy: { date: 'desc' },
      take: 5,
    });
    
    return NextResponse.json(heroNews);
  } catch (error) {
    console.error('Error fetching hero news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero news' },
      { status: 500 }
    );
  }
}