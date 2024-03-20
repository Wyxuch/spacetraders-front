'use client';

import { useState } from 'react';

import { BASE_URL } from '@consts/common';

import { ShipStatus, Waypoint, WaypointResponse } from '@api/types';
import { useShipsContext } from '@context/ShipsContext';

import WaypointAddress from '@components/atoms/WaypointAddress/WaypointAddress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/shadcn/ui/accordion';
import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/shadcn/ui/card';
import { Input } from '@components/shadcn/ui/input';
import { Label } from '@components/shadcn/ui/label';
import { Separator } from '@components/shadcn/ui/separator';
import { useToast } from '@components/shadcn/ui/use-toast';

import { useApi } from '@hooks/useApi';

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

export default function Home() {
  const fetch = useApi();
  const { toast } = useToast();
  const { ship } = useShipsContext();
  const [response, setResponse] = useState<WaypointResponse | null>(null);
  const [trait, setTrait] = useState('');

  const handleClick = (param: 'traits' | 'type') => {
    if (!ship?.nav.systemSymbol) {
      toast({
        title: 'Missing data',
        description: 'Select Ship and retry'
      });
      return;
    }
    if (!trait) {
      toast({
        title: 'Missing data',
        description: 'Fill in the trait input'
      });
      return;
    }
    fetch<WaypointResponse, undefined>(
      `${BASE_URL}/systems/${ship?.nav.systemSymbol}/waypoints?${param}=${trait.toUpperCase()}`
    ).then(res => {
      setResponse(res);
    });
  };

  return (
    <Card className={'w-full h-full overflow-y-scroll'}>
      <CardTitle className={'p-4'}>Scan</CardTitle>
      <CardContent>
        <div>
          <Label htmlFor="trait">Look for trait</Label>
          <Input id="trait" placeholder="e.g. shipyard" value={trait} onChange={e => setTrait(e.target.value)} />
          <Button onClick={() => handleClick('traits')} className={'mt-4 mr-4'}>
            Search Trait
          </Button>
          <Button onClick={() => handleClick('type')} className={'mt-4'}>
            Search Type
          </Button>
        </div>
        <Separator className={'my-4'} />
        {response && response.data.map(location => <PlaceDescription key={location.symbol} locationData={location} />)}
      </CardContent>
    </Card>
  );
}
