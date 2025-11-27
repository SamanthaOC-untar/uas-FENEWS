// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email dan kata sandi wajib diisi.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // ⬇⬇⬇ DI SINI BEDAKAN EMAIL TIDAK TERDAFTAR
    if (!user) {
      return NextResponse.json(
        {
          message:
            'Email belum terdaftar. Silakan buat akun terlebih dahulu.',
        },
        { status: 404 }
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { message: 'Email atau kata sandi salah.' },
        { status: 401 }
      );
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    const res = NextResponse.json(
      {
        message: 'Login berhasil.',
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          status: user.status,
          interests: user.interests,
          createdAt: user.createdAt,
        },
      },
      { status: 200 }
    );

    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    console.error('Error login:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan di server.' },
      { status: 500 }
    );
  }
}
