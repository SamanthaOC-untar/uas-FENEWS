import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const popular = await prisma.news.findMany({
      orderBy: { date: 'desc' },
      take: 5,
    });
    
    return NextResponse.json(popular);
  } catch (error) {
    console.error('Error fetching popular news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch popular news' },
      { status: 500 }
    );
  }
}