'use client';

import { useCallback, useEffect, useState } from 'react';

import { BASE_URL } from '@consts/common';
import { TRAITS, TYPES } from '@consts/models';

import { Meta, Waypoint, WaypointResponse } from '@api/types';
import { useShipsContext } from '@context/ShipsContext';
import { cn } from '@utils/shadcn/utils';

import WaypointAddress from '@components/atoms/WaypointAddress/WaypointAddress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/shadcn/ui/accordion';
import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent, CardTitle } from '@components/shadcn/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@components/shadcn/ui/command';
import { Label } from '@components/shadcn/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@components/shadcn/ui/popover';
import { Separator } from '@components/shadcn/ui/separator';
import { useToast } from '@components/shadcn/ui/use-toast';

import { useApi } from '@hooks/useApi';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

const PlaceDescription = ({ locationData }: { locationData: Waypoint }) => {
  return (
    <Card className={'p-4 mb-6'}>
      <div className={'flex justify-around'}>
        <div>
          <span>Waypoint:</span>
          <WaypointAddress location={locationData.symbol} />
        </div>
        <div>
          <span>Type: </span>
          <span>{locationData.type}</span>
        </div>
        <div>
          <span>Faction: </span>
          <span>{locationData.faction.symbol}</span>
        </div>
      </div>
      <Accordion type={'single'}>
        {locationData.traits.map((trait, index) => (
          <AccordionItem
            key={trait.symbol + locationData.systemSymbol}
            value={trait.symbol + locationData.systemSymbol}
          >
            <AccordionTrigger>{trait.name}</AccordionTrigger>
            <AccordionContent>
              <div className={'flex gap-2'}>
                <span>Symbol:</span>
                <span>{trait.symbol}</span>
              </div>
              <div className={'flex gap-2'}>
                <span>Description:</span>
                <span>{trait.description}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};

interface SearchValue {
  value: string;
  waypointType: string;
}

export default function Home() {
  const fetch = useApi();
  const { toast } = useToast();
  const { ship } = useShipsContext();
  const [responseMeta, setResponseMeta] = useState<Meta | null>(null);
  const [waypoints, setWaypoints] = useState<Waypoint[] | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<SearchValue | undefined>();
  const [lastUrl, setLastUrl] = useState<string>('');

  const sortWaypoints = useCallback(
    (waypoints: Waypoint[]) => {
      return waypoints.sort((a, b) => {
        if (!ship) {
          return 0;
        }

        const distanceA = Math.sqrt(
          Math.pow(ship?.nav.route.destination.x - a.x, 2) + Math.pow(ship?.nav.route.destination.y - a.y, 2)
        );
        const distanceB = Math.sqrt(
          Math.pow(ship?.nav.route.destination.x - b.x, 2) + Math.pow(ship?.nav.route.destination.y - b.y, 2)
        );

        if (distanceA > distanceB) {
          return -1;
        }
        if (distanceA < distanceB) {
          return 1;
        }
        return 0;
      });
    },
    [ship]
  );

  const handleClick = (param: 'traits' | 'type') => {
    if (!ship?.nav.systemSymbol) {
      toast({
        title: 'Missing data',
        description: 'Select Ship and retry'
      });
      return;
    }
    if (!value) {
      toast({
        title: 'Missing data',
        description: 'Fill in the trait input'
      });
      return;
    }
    const url = `${BASE_URL}/systems/${ship?.nav.systemSymbol}/waypoints?${value.waypointType}=${value.value}&limit=20`;
    fetch<WaypointResponse, undefined>(url).then(res => {
      if (res?.meta) {
        setResponseMeta(res.meta);
      }

      if (res?.data) {
        setWaypoints(sortWaypoints(res.data));
      }

      setLastUrl(url);
    });
  };

  useEffect(() => {
    if (lastUrl && waypoints && responseMeta && responseMeta.total >= responseMeta.page * 20) {
      const url = `${lastUrl}&page=${responseMeta.page + 1}`;
      const timeoutId = setTimeout(() => {
        fetch<WaypointResponse, undefined>(url).then(res => {
          if (res?.meta) {
            setResponseMeta(res.meta);
          }

          if (res?.data) {
            setWaypoints(sortWaypoints([...waypoints, ...res.data]));
          }

          setLastUrl(url);
        });
      }, 500); // 500 milliseconds equals 0.5 seconds

      // Clear the timeout if the component is unmounted or if the dependencies change
      return () => clearTimeout(timeoutId);
    }
  }, [fetch, lastUrl, responseMeta, sortWaypoints, waypoints]);

  return (
    <Card className={'w-full h-full overflow-y-scroll'}>
      <CardTitle className={'p-4'}>Scan</CardTitle>
      <CardContent>
        <div>
          <Label htmlFor="trait" className={'block'}>
            Look for trait:
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className={'my-2 flex min-w-[300px]'}>
              <Button variant="secondary" role="combobox" aria-expanded={open} className="justify-between mb-0">
                {value ? value.value : 'Select Attribute...'}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w--[300px] p-0">
              <Command>
                <CommandInput placeholder="Search ships..." className="h-9" />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {TRAITS.map(trait => (
                      <CommandItem
                        key={trait}
                        value={trait}
                        onSelect={(currentValue: string) => {
                          setValue({ value: currentValue, waypointType: 'traits' });
                          setOpen(false);
                        }}
                      >
                        {trait}
                        <CheckIcon
                          className={cn('ml-auto h-4 w-4', value?.value === trait ? 'opacity-100' : 'opacity-0')}
                        />
                      </CommandItem>
                    ))}
                    {TYPES.map(type => (
                      <CommandItem
                        key={type}
                        value={type}
                        onSelect={(currentValue: string) => {
                          setValue({ value: currentValue, waypointType: 'type' });
                          setOpen(false);
                        }}
                      >
                        {type}
                        <CheckIcon
                          className={cn('ml-auto h-4 w-4', value?.value === type ? 'opacity-100' : 'opacity-0')}
                        />
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <Button onClick={() => handleClick('traits')} className={'mt-4 mr-4'}>
            Search
          </Button>
        </div>
        <Separator className={'my-4'} />
        <div className={'flex gap-4 mb-4'}>
          <p>Found: {responseMeta?.total || 0}</p>
          <p>Loaded: {waypoints?.length || 0}</p>
        </div>
        {waypoints && waypoints.map(location => <PlaceDescription key={location.symbol} locationData={location} />)}
      </CardContent>
    </Card>
  );
}
