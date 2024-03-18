'use client';

import { useState } from 'react';

import { ShipStatus, fetchShipStatus } from '@api/ship/status';

import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/shadcn/ui/card';

import { useApi } from '@hooks/useApi';

export default function Home() {
  const fetch = useApi();
  const [response, setResponse] = useState<ShipStatus | null>(null);

  const handleClick = () => {
    fetch<typeof fetchShipStatus, ShipStatus>(fetchShipStatus).then(res => {
      setResponse(res);
    });
  };

  return (
    <Card className={'w-full h-full'}>
      <CardContent>
        <Button onClick={handleClick}>fetch</Button>
        <p>{response ? JSON.stringify(response) : 'Empty'}</p>
      </CardContent>
    </Card>
  );
}
