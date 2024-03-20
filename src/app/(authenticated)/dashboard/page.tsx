'use client';

import { useState } from 'react';

import { BASE_URL } from '@consts/common';

import { ShipStatus } from '@api/types';
import { useShipsContext } from '@context/ShipsContext';

import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/shadcn/ui/card';
import { useToast } from '@components/shadcn/ui/use-toast';

import { useApi } from '@hooks/useApi';

export default function Home() {
  const fetch = useApi();
  const { ship, refreshShip } = useShipsContext();
  const { toast } = useToast();

  const handleDock = () => {
    if (!ship) {
      toast({
        title: 'Ship not found',
        description: 'Select Ship'
      });
      return;
    }
    fetch<undefined, undefined>(`${BASE_URL}/my/ships/${ship.symbol}/dock`, undefined, 'POST').then(res => {
      refreshShip();
    });
  };

  const handleOrbit = () => {
    if (!ship) {
      toast({
        title: 'Ship not found',
        description: 'Select Ship'
      });
      return;
    }
    fetch<undefined, undefined>(`${BASE_URL}/my/ships/${ship.symbol}/orbit`, undefined, 'POST').then(res => {
      refreshShip();
    });
  };

  return (
    <Card className={'w-full h-full'}>
      <CardContent>
        <div className={'mb-6'}>
          <h3>Ship</h3>
          <Button onClick={handleDock} className={'mr-4'}>
            Dock
          </Button>
          <Button onClick={handleOrbit}>Orbit</Button>
        </div>
      </CardContent>
    </Card>
  );
}
