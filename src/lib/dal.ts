import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';
import { decrypt } from './session';
import { redirect } from 'next/navigation';
import dbConnect from './dbConnect';
import User from '@/models/User';
import { tryCatch } from './try-catch';

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  if (!session || !session.userId) {
    redirect('/login');
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;
  await dbConnect();
  const { data, error } = await tryCatch(
    User.findById(session.userId, 'username theme'),
  );
  if (error) {
    console.error('Failed to fetch user', error);
    return null;
  }
  return data;
});
