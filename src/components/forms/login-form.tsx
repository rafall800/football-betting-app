'use client';

import { login } from '@/actions/login';
import { useActionState } from 'react';

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  console.log('state: -----> ', state);

  return (
    <form action={action}>
      <div>
        <label htmlFor='username'>Username</label>
        <input id='username' name='username' />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}

      <div>
        <label htmlFor='password'>Password</label>
        <input id='password' name='password' type='password' />
      </div>
      {state?.errors?.password && (
        <div>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <p>{state?.message}</p>
      <button disabled={pending} type='submit'>
        Log In
      </button>
    </form>
  );
}
