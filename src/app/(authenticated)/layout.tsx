'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { useAuthContext } from '@context/AuthContext';
import { ShipsContext, ShipsContextProvider } from '@context/ShipsContext';

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const { token } = useAuthContext();

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  return <ShipsContextProvider>{children}</ShipsContextProvider>;
}
