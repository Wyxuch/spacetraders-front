import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { useAuthContext } from '@context/AuthContext';

import './globals.css';

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const { token } = useAuthContext();

  if (!token) {
    router.push('/');
  }

  return <div>{children}</div>;
}
