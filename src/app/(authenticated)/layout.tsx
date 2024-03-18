'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { useAuthContext } from '@context/AuthContext';

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const { token } = useAuthContext();

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  return <div>{children}</div>;
}
