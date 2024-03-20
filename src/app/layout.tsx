import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { AuthContext, AuthContextProvider } from '@context/AuthContext';

import { Toaster } from '@components/shadcn/ui/toaster';

import './globals.css';

export const metadata: Metadata = {
  title: 'Space Traders',
  description: 'Space Traders GUI'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
