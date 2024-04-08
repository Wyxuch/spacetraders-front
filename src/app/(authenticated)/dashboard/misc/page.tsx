'use client';

import { useState } from 'react';

import { BASE_URL } from '@consts/common';

import { ShipStatus } from '@api/types/ship';

import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/shadcn/ui/card';

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
        <Button onClick={handleClick}>ddd</Button>
        <p>{response ? JSON.stringify(response) : 'Empty'}</p>
      </CardContent>
    </Card>
  );
}
