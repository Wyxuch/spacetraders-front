'use client';

import { useState } from 'react';

import { BASE_URL } from '@consts/common';

import { ShipStatus } from '@api/types';

import LabeledText from '@components/atoms/LabeledText/LabeledText';
import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/shadcn/ui/card';
import { Separator } from '@components/shadcn/ui/separator';

import { useApi } from '@hooks/useApi';

export default function Home() {
  const fetch = useApi();
  const [response, setResponse] = useState<ShipStatus | null>(null);

  const handleClick = () => {
    fetch<ShipStatus, undefined>(`${BASE_URL}/my/ships`).then(res => {
      setResponse(res);
    });
  };

  return (
    <Card className={'w-full h-full'}>
      <CardContent>
        <Button onClick={handleClick}>fetch</Button>
        {response && (
          <div className={'p-2;'}>
            {response.data.map(ship => (
              <div key={ship.symbol}>
                <LabeledText label={'Symbol'} text={ship.symbol} />
                <LabeledText label={'Status'} text={ship.nav.status} />
                <LabeledText label={'Waypoint'} text={ship.nav.waypointSymbol} />
                <LabeledText label={'Symbol'} text={ship.fuel.current} />
                <Separator className={'my-4'} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
