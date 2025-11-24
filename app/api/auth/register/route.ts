import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { fullName, phone, email, password, passwordConfirm } = await req.json();

    if (!fullName || !phone || !email || !password || !passwordConfirm) {
      return NextResponse.json(
        { message: 'Semua field wajib diisi.' },
        { status: 400 }
      );
    }

    if (password !== passwordConfirm) {
      return NextResponse.json(
        { message: 'Konfirmasi kata sandi tidak sama.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Kata sandi minimal 6 karakter.' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email sudah terdaftar.' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        fullName,
        phone,
        email,
        passwordHash,
      },
    });

    return NextResponse.json(
      { message: 'Registrasi berhasil.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error register:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan di server.' },
      { status: 500 }
    );
  }
}
