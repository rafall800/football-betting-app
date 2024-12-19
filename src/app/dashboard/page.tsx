import { logout } from '@/actions/logout';
import { getUser } from '@/lib/dal';

export default async function Page() {
  const user = await getUser();
  return (
    <div>
      <p>Hello ${user?.username} from Dashboard</p>
      <button onClick={async () => await logout()}>Log Out</button>
    </div>
  );
}
