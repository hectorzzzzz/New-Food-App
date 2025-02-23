//file to:
//  create dynamic API routes so it can handle diff. APIs
//  authorization handle
//  handle issues

import { NextRequest, NextResponse } from 'next/server';
import service from '@/app/api/service';
import { RestContext } from '@/app/api/rest/[...routes]/types';
import { AxiosError } from 'axios';

export async function POST(req: NextRequest, { params }: RestContext) {
  try {
    const body = await req.json();
    const { routes } = await params;
    const token = req.cookies.get('token')?.value;

    const { data } = await service(token).post(routes.join('/'), body);

    const response = NextResponse.json({
      message: 'success',
      ...data,
    });

    return response;
  } catch (err) {
    const error = err as AxiosError;
    if (error.status === 401) {
      const res = NextResponse.redirect(new URL('/login', req.url));
      res.cookies.delete('token');
      return res;
    }

    console.log(error);
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

export async function GET(req: NextRequest, { params }: RestContext) {
  try {
    const { routes } = await params;
    const token = req.cookies.get('token')?.value;
    const searchParams = new URLSearchParams();
    req.nextUrl.searchParams.forEach((value, key) => {
      searchParams.append(key, value);
    });

    let url = routes.join('/');
    if (searchParams.size) {
      url += '?' + searchParams.toString();
    }

    const { data } = await service(token).get(url);

    const response = NextResponse.json({
      message: 'success',
      ...data,
    });

    return response;
  } catch (err) {
    const error = err as AxiosError;
    if (error.status === 401) {
      const res = NextResponse.redirect(new URL('/login', req.url));
      res.cookies.delete('token');
      return res;
    }

    console.log(error);
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