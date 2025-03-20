import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { authConfig } from '../auth.confing';
import NextAuth from 'next-auth';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get('session')?.value;
  const payload = await decrypt(cookie);

  if (isProtectedRoute && !payload) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (
    isPublicRoute &&
    payload &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
