'use server';

import { SignupFormSchema, FormState } from '@/lib/definitions';
import dbConnect from '@/lib/dbConnect';
import { hashPassword } from '@/lib/hash';
import User from '@/models/User';
import { createSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  await dbConnect();
  const { username, password } = validatedFields.data;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return {
      message: 'User with this username already exists.',
    };
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({ username, password: hashedPassword });

  if (!newUser) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }
  await createSession(newUser.id);
  redirect('/dashboard');

  // 5. Redirect user
}
