import { useRouter } from 'next/navigation';

import { useAuthContext } from '@context/AuthContext';

import { Button } from '@components/shadcn/ui/button';
import { Card } from '@components/shadcn/ui/card';

const Sidebar = () => {
  const router = useRouter();
  const { removeToken } = useAuthContext();

  return (
    <aside className={`w-[240px] h-full p-4 pr-0`}>
      <Card className={'h-full w-full p-2 overflow-hidden'}>
        <Button
          onClick={() => router.push('/dashboard')}
          variant={'outline'}
          className={'w-full text-left justify-between mb-2'}
        >
          Dashboard
        </Button>
        <Button
          onClick={() => router.push('/dashboard/scan')}
          variant={'outline'}
          className={'w-full text-left justify-between mb-2'}
        >
          Scan
        </Button>
        <Button
          onClick={() => router.push('/dashboard/contracts')}
          variant={'outline'}
          className={'w-full text-left justify-between mb-2'}
        >
          Contracts
        </Button>
        <Button
          onClick={() => router.push('/dashboard/materials')}
          variant={'outline'}
          className={'w-full text-left justify-between mb-2'}
        >
          Materials
        </Button>
        <Button onClick={removeToken} variant={'destructive'} className={'w-full text-left justify-between'}>
          Log Out
        </Button>
      </Card>
    </aside>
  );
};

export default Sidebar;
