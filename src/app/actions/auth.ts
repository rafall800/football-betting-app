'use server';

import { SignupFormSchema, FormState } from '@/app/lib/definitions';
import dbConnect from '@/lib/dbConnect';
import { hash } from '@/lib/hash';
import User from '@/models/User';

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
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

  const hashedPassword = await hash(password);
  const newUser = await User.create({ username, password: hashedPassword });

  if (!newUser) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  // TODO:
  // 4. Create user session
  // 5. Redirect user
}
