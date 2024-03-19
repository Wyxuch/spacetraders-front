'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import { useAuthContext } from '@context/AuthContext';

import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent } from '@components/shadcn/ui/card';

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter()
  const { removeToken } = useAuthContext();

  return (
    <div className={'flex p-4 min-h-screen gap-4'}>
      <nav>
        <Card className={'h-full w-40 p-2'}>
          <Button onClick={() => router.push('dashboard/ship')} variant={'outline'} className={'w-full text-left justify-between mb-2'}>
            Ship
          </Button>
          <Button onClick={() => router.push('dashboard/scan')} variant={'outline'} className={'w-full text-left justify-between mb-2'}>
            Scan
          </Button>
          <Button onClick={removeToken} variant={'destructive'} className={'w-full text-left justify-between'}>
            Log Out
          </Button>
        </Card>
      </nav>
      <main className={'w-full'}>{children}</main>
    </div>
  );
}
