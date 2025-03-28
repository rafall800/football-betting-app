import 'server-only';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { tryCatch } from './try-catch';
import { SessionPayload } from './definitions';

const jwtSecretKey = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(jwtSecretKey);
}

export async function decrypt(session: string | undefined) {
  if (!session) return null;
  const { data, error } = await tryCatch(jwtVerify(session, jwtSecretKey));
  if (error) {
    console.error('Failed to verify session', error);
    return null;
  }

  return data.payload;
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId });

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
