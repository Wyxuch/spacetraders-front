'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { useAuthContext } from '@context/AuthContext';
import { ShipsContext, ShipsContextProvider } from '@context/ShipsContext';

import { useToast } from '@components/shadcn/ui/use-toast';

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const { toast } = useToast();
  const { token } = useAuthContext();

  useEffect(() => {
    if (typeof window !== 'undefined' && !token) {
      router.push('/');
      toast({
        title: 'Authentication error',
        description: 'Token is missing or invalid, logging out'
      });
    }
  }, [token, router, toast]);

  return <ShipsContextProvider>{children}</ShipsContextProvider>;
}
