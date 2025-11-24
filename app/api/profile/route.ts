// app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req);

  if (!userId) {
    return NextResponse.json(
      { message: 'Tidak terautentikasi.' },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json(
      { message: 'User tidak ditemukan.' },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        status: user.status,
        interests: user.interests,
        createdAt: user.createdAt,
      },
    },
    { status: 200 }
  );
}

export async function PUT(req: NextRequest) {
  const userId = getUserIdFromRequest(req);

  if (!userId) {
    return NextResponse.json(
      { message: 'Tidak terautentikasi.' },
      { status: 401 }
    );
  }

  const body = await req.json();
  const {
    fullName,
    username,
    email,
    status,      // harus kirim string enum: PEMBACA_FE_NEWS / PEMINAT_FE_NEWS / PECINTA_FE_NEWS
    interests,   // string "teknologi,ekonomi" dll, atau null
  } = body;

  if (!fullName || !email || !status) {
    return NextResponse.json(
      { message: 'Nama lengkap, email, dan status wajib diisi.' },
      { status: 400 }
    );
  }

  // cek email sudah dipakai user lain atau tidak
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing && existing.id !== userId) {
    return NextResponse.json(
      { message: 'Email sudah digunakan oleh akun lain.' },
      { status: 409 }
    );
  }

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        username: username && username.trim() !== '' ? username : null,
        email,
        status,      // langsung pakai enum dari FE
        interests: interests && interests.trim() !== '' ? interests : null,
      },
    });

    return NextResponse.json(
      {
        message: 'Profil berhasil diperbarui.',
        user: {
          id: updated.id,
          fullName: updated.fullName,
          username: updated.username,
          email: updated.email,
          status: updated.status,
          interests: updated.interests,
          createdAt: updated.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error update profile:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengupdate profil.' },
      { status: 500 }
    );
  }
}
