'use server';

import { FormState, LogInSchema } from '@/lib/definitions';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { verifyPassword } from '@/lib/hash';
import { createSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function login(state: FormState, formData: FormData) {
  const userData = LogInSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });
  if (!userData.success) {
    return {
      errors: userData.error.flatten().fieldErrors,
    };
  }
  await dbConnect();
  const { username, password } = userData.data;
  const user = await User.findOne({ username });
  if (!user) {
    return {
      message: 'Incorrect username or password.',
    };
  }
  if (!(await verifyPassword(password, user.password))) {
    return {
      message: 'Incorrect username or password.',
    };
  }
  await createSession(user.id);
  redirect('/dashboard');

  //admin
  //#admin11
}
