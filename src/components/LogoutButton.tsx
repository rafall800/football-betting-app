'use client';

import { logout } from '@/actions/logout';

export default function LogoutButton() {
  return <button onClick={async () => await logout()}>Log Out</button>;
}
