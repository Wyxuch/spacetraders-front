import { BlendIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { BASE_URL } from '@consts/common';

import { ShipStatus } from '@api/types';
import { useShipsContext } from '@context/ShipsContext';
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
import {
  ArchiveIcon,
  BlendingModeIcon,
  CaretSortIcon,
  CheckIcon,
  RocketIcon,
  SewingPinFilledIcon,
  StopwatchIcon
} from '@radix-ui/react-icons';

export const Nav = () => {
  const { ship, setShip } = useShipsContext();
  const fetch = useApi();
  const [response, setResponse] = useState<ShipStatus | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [coolDown, setCoolDown] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (coolDown > 0) {
        setCoolDown(coolDown - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [setCoolDown]);

  const setSelectedShip = useCallback(
    (shipSymbol: string) => {
      const currShip = response?.data.find(ship => ship.symbol === shipSymbol);
      setValue(shipSymbol);
      setCoolDown(currShip?.cooldown.remainingSeconds || 0);
      setShip(currShip);
    },
    [response?.data, setShip]
  );

  useEffect(() => {
    if (!response) {
      fetch<ShipStatus, undefined>(`${BASE_URL}/my/ships`).then(res => {
        setResponse(res);
      });
    }
  }, [fetch, response, setResponse, setSelectedShip]);

  const ships = response?.data.map(ship => ship.symbol) || [];

  return (
    <nav className={`w-screen h-[74px] p-4 pb-0`}>
      <Card className={'h-full flex justify-between items-center p-2'}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className={'mb-2'}>
            <Button variant="secondary" role="combobox" aria-expanded={open} className="justify-between mb-0">
              {value ? ships.find(ship => ship === value) : 'Select Ship...'}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search ships..." className="h-9" />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                <CommandList>
                  {ships.map(ship => (
                    <CommandItem
                      key={ship}
                      value={ship}
                      onSelect={(currentValue: string) => {
                        setSelectedShip(currentValue === value ? '' : currentValue);
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

        <div className={'flex items-center gap-1'}>
          <BlendingModeIcon />
          <p>{`${ship?.fuel.current || 0}/${ship?.fuel.capacity || 0}`}</p>
        </div>

        <div className={'flex items-center gap-1'}>
          <SewingPinFilledIcon />
          <p>{ship?.nav.waypointSymbol}</p>
        </div>

        <div className={'flex items-center gap-1'}>
          <RocketIcon />
          <p>{ship?.nav.status}</p>
        </div>

        <div className={'flex items-center gap-1'}>
          <ArchiveIcon />
          <p>{`${ship?.cargo.units || 0}/${ship?.cargo.capacity || 0}`}</p>
        </div>

        <div className={'flex items-center gap-1'}>
          <StopwatchIcon />
          <p>{ship?.cooldown.remainingSeconds}</p>
        </div>
      </Card>
    </nav>
  );
};
