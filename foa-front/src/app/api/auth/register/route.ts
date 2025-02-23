//file to provide API route. Handle POST request for register

import { NextRequest, NextResponse } from 'next/server';
import service from '@/app/api/service';
import { AxiosError } from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await service().post('auth/register', body);

    const response = NextResponse.json({ message: 'Register successful' });

    return response;
  } catch (err) {
    const error = err as AxiosError;
    console.log();
    const response = NextResponse.json(
      {
        message: 'Something went wrong',
        ...(error?.response?.data || {}),
      },
      { status: error.status },
    );
    return response;
  }
}