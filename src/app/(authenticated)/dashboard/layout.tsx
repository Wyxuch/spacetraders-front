'use client';

import { ReactNode } from 'react';

import { Nav } from '@components/organisms/Nav/Nav';
import Sidebar from '@components/organisms/Sidebar/Sidebar';

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className={'h-screen'}>
      {/*TOP NAV*/}
      <Nav />

      <div className={`h-[calc(100%-70px)] flex shrink-0 gap-4`}>
        {/*LEFT NAV*/}
        <Sidebar />
        {/*CONTENT*/}
        <main className={'w-full h-full p-4 pl-0'}>{children}</main>
      </div>
    </div>
  );
}