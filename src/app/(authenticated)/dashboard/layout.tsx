'use client';

import { ReactNode, useEffect, useState } from 'react';

import { Nav } from '@components/organisms/Nav/Nav';
import Sidebar from '@components/organisms/Sidebar/Sidebar';
import { ShipStatus } from '@api/types';
import { Button } from '@components/shadcn/ui/button';
import { Card } from '@components/shadcn/ui/card';
import { BASE_URL } from '@consts/common';
import { useAuthContext } from '@context/AuthContext';
import { useApi } from '@hooks/useApi';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { CommandInput, CommandEmpty, CommandGroup, CommandList, CommandItem } from 'cmdk';
import { Command, CheckIcon } from 'lucide-react';
import { useRouter } from 'next/router';

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const { removeToken } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const fetch = useApi();
  const [response, setResponse] = useState<ShipStatus | null>(null);

  useEffect(() => {
if(!response){
  fetch<ShipStatus, undefined>(`${BASE_URL}/my/ships`).then(res => {
    setResponse(res);
  });
}
  }, [fetch, setResponse]);

  const handleClick = () => {
    fetch<ShipStatus, undefined>(`${BASE_URL}/my/ships`).then(res => {
      setResponse(res);
    });
  };

  const ships = response?.data.map(ship => ship.symbol) || [];

  function cn(arg0: string, arg1: string) {
    throw new Error('Function not implemented.');
  }

  return (
    <div className={'flex p-4 min-h-screen gap-4'}>
      <nav className='w-[260px]'>
        <Card className={'h-full w-full p-2'}>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className={'mb-2'}>
              <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                {value ? ships.find(ship => ship === value) : 'Select Ship...'}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." className="h-9" />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {ships.map(ship => (
                      <CommandItem
                        key={ship}
                        value={ship}
                        onSelect={(currentValue: string) => {
                          setValue(currentValue === value ? '' : currentValue);
                          setOpen(false);
                        }}
                      >
                        {ship}
                        <CheckIcon className={cn('ml-auto h-4 w-4', value === ship ? 'opacity-100' : 'opacity-0')} />
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <Button
            onClick={() => router.push('dashboard/ship')}
            variant={'outline'}
            className={'w-full text-left justify-between mb-2'}
          >
            Ship
          </Button>
          <Button
            onClick={() => router.push('dashboard/scan')}
            variant={'outline'}
            className={'w-full text-left justify-between mb-2'}
          >
            Scan
          </Button>
          <Button
            onClick={() => router.push('dashboard/location')}
            variant={'outline'}
            className={'w-full text-left justify-between mb-2'}
          >
            Location
          </Button>
          <Button
            onClick={() => router.push('dashboard/contracts')}
            variant={'outline'}
            className={'w-full text-left justify-between mb-2'}
          >
            Contracts
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


    function useRouter() {
      throw new Error('Function not implemented.');
    }


    function useAuthContext(): { removeToken: any; } {
      throw new Error('Function not implemented.');
    }


    function useState(arg0: boolean): [any, any] {
      throw new Error('Function not implemented.');
    }


    function useApi() {
      throw new Error('Function not implemented.');
    }


    function useEffect(arg0: () => void, arg1: any[]) {
      throw new Error('Function not implemented.');
    }

    function useAuthContext(): { removeToken: any; } {
      throw new Error('Function not implemented.');
    }


    function useState(arg0: boolean): [any, any] {
      throw new Error('Function not implemented.');
    }


    function useApi() {
      throw new Error('Function not implemented.');
    }


    function useEffect(arg0: () => void, arg1: any[]) {
      throw new Error('Function not implemented.');
    }


    function useAuthContext(): { removeToken: any; } {
      throw new Error('Function not implemented.');
    }


    function useState(arg0: boolean): [any, any] {
      throw new Error('Function not implemented.');
    }


    function useApi() {
      throw new Error('Function not implemented.');
    }


    function useEffect(arg0: () => void, arg1: any[]) {
      throw new Error('Function not implemented.');
    }

