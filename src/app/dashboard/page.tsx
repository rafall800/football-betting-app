import LogoutButton from '@/components/LogoutButton';
import { getUser } from '@/lib/dal';

export default async function Page() {
  const user = await getUser();
  return (
    <div>
      <p>
        Hello {user?.username} from Dashboard. Your theme: {user?.theme}{' '}
      </p>
      <LogoutButton />
    </div>
  );
}
