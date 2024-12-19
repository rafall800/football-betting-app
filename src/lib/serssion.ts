import 'server-only';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const jwtSecretKey = process.env.JWT_SECRET as string;

export async function decrypt(session: string | undefined = '') {
  try {
    const payload = jwt.verify(session, jwtSecretKey);
    return payload;
  } catch (error) {
    console.log('Failed to verify session', error);
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = jwt.sign({ userId }, jwtSecretKey, {
    expiresIn: '7d',
  });
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

  const payload = decrypt(session);

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
