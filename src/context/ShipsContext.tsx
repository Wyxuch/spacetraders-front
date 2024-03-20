'use client';

import { Dispatch, ReactNode, useContext, useState } from 'react';
import { createContext } from 'react';

import { BASE_URL } from '@consts/common';

import { ShipData, ShipStatus, SingleShipStatus } from '@api/types';

import { useApi } from '@hooks/useApi';

export interface ShipsContextValue {
  ship: ShipData | undefined;
  setShip: Dispatch<ShipData | undefined>;
  refreshShip: () => void;
}

interface Props {
  children: ReactNode;
}

export const ShipsContext = createContext<ShipsContextValue>({
  ship: undefined,
  setShip: () => {},
  refreshShip: () => {}
});

export const ShipsContextProvider = ({ children }: Props) => {
  const fetch = useApi();
  const [ship, setShip] = useState<ShipData | undefined>();
  console.log(ship);

  const refresh = () => {
    fetch<SingleShipStatus, undefined>(`${BASE_URL}/my/ships/${ship?.symbol}`).then(res => {
      if (res) setShip(res.data);
    });
  };

  return <ShipsContext.Provider value={{ ship, setShip, refreshShip: refresh }}>{children}</ShipsContext.Provider>;
};

export const useShipsContext = () => {
  const context = useContext(ShipsContext);
  if (context === undefined) {
    throw new Error('useShipsContext must be used within a ShipsContext Provider');
  }
  return context;
};
