import { useState } from 'react';

import { BASE_URL } from '@consts/common';

import { NavigateBody, WaypointResponse } from '@api/types/common';
import { useShipsContext } from '@context/ShipsContext';

import { Button } from '@components/shadcn/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@components/shadcn/ui/popover';
import { useToast } from '@components/shadcn/ui/use-toast';

import { useApi } from '@hooks/useApi';

const Waypoint = ({ location }: { location: string }) => {
  const { ship, refreshShip } = useShipsContext();
  const fetch = useApi();
  const { toast } = useToast();
  const [response, setResponse] = useState<WaypointResponse | null>(null);

  const handleClick = () => {
    if (!ship) {
      toast({
        title: 'Missing data',
        description: 'Select Ship and retry'
      });
      return;
    }
    fetch<undefined, NavigateBody>(`${BASE_URL}/my/ships/${ship.symbol}/navigate`, {
      waypointSymbol: location
    }).then(() => {
      refreshShip();
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link">{location}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Button onClick={handleClick} className={'w-full'}>
          Navigate
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default Waypoint;
