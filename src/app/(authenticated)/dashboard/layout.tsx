'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import { BASE_URL } from '@consts/common';

import { ShipStatus } from '@api/types';
import { useAuthContext } from '@context/AuthContext';
import { cn } from '@utils/shadcn/utils';

import { Button } from '@components/shadcn/ui/button';
import { Card } from '@components/shadcn/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@components/shadcn/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@components/shadcn/ui/popover';

import { useApi } from '@hooks/useApi';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const { removeToken } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const fetch = useApi();
  const [response, setResponse] = useState<ShipStatus | null>(null);

  useEffect(() => {
    fetch<ShipStatus, undefined>(`${BASE_URL}/my/ships`).then(res => {
      setResponse(res);
    });
  }, [fetch, setResponse]);

  const handleClick = () => {
    fetch<ShipStatus, undefined>(`${BASE_URL}/my/ships`).then(res => {
      setResponse(res);
    });
  };

  const ships = response?.data.map(ship => ship.symbol) || [];

  return (
    <div className={'flex p-4 min-h-screen gap-4'}>
      <nav>
        <Card className={'h-full w-40 p-2'}>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
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
          <Button onClick={removeToken} variant={'destructive'} className={'w-full text-left justify-between'}>
            Log Out
          </Button>
        </Card>
      </nav>
      <main className={'w-full'}>{children}</main>
    </div>
  );
}
