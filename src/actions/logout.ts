'use server';

import { deleteSession } from '@/lib/serssion';
import { redirect } from 'next/navigation';

export async function logout() {
  deleteSession();
  redirect('/login');
}
