//middleware file

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { protectedRoutes } from './routes';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (
    // TODO: make sure how to implement the protected routes with params
    protectedRoutes.some((route) => {
      if (route.path === '/') return req.nextUrl.pathname === '/';

      return req.nextUrl.pathname.startsWith(route.path);
    }) &&
    !token
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (['/login', '/register'].includes(req.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};