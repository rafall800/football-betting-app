import 'server-only';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const jwtSecretKey = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, jwtSecretKey);
    return payload;
  } catch (error) {
    console.log('Failed to verify session', error);
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(jwtSecretKey);

  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value;

  if (!session) {
    return null;
  }

  const payload = await decrypt(session);

  if (!payload) {
    return null;
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
