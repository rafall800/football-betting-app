'use client';

import { signup } from '@/actions/signup';
import { useActionState } from 'react';

export default function SignupForm() {
  const theme =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  const signupWithTheme = signup.bind(null, theme);
  const [state, action, pending] = useActionState(signupWithTheme, undefined);

  const getPreferredTheme = (): 'dark' | 'light' => {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  return (
    <form action={action}>
      <div>
        <label htmlFor='username'>Userame</label>
        <input id='username' name='username' />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}

      <div>
        <label htmlFor='password'>Password</label>
        <input id='password' name='password' type='password' />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button disabled={pending} type='submit'>
        Sign Up
      </button>
    </form>
  );
}
