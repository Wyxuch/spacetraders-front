'use client';

import { Dispatch, ReactNode, useContext, useState } from 'react';
import { createContext } from 'react';

import { BASE_URL } from '@consts/common';

import { ShipData, SingleShipStatus } from '@api/types/ship';

import { useApi } from '@hooks/useApi';

export interface ShipsContextValue {
  ship: ShipData | undefined;
  setShip: Dispatch<ShipData | undefined>;
  coolDown: number;
  setCoolDown: Dispatch<number>;
  refreshShip: () => void;
}

interface Props {
  children: ReactNode;
}

export const ShipsContext = createContext<ShipsContextValue>({
  ship: undefined,
  setShip: () => {},
  coolDown: 0,
  setCoolDown: () => {},
  refreshShip: () => {}
});

export const ShipsContextProvider = ({ children }: Props) => {
  const fetch = useApi();
  const [ship, setShip] = useState<ShipData | undefined>();
  const [coolDown, setCoolDown] = useState<number>(0);

  const refresh = () => {
    fetch<SingleShipStatus, undefined>(`${BASE_URL}/my/ships/${ship?.symbol}`).then(res => {
      if (res) {
        setCoolDown(res.data.cooldown.remainingSeconds);
        setShip(res.data);
      }
    });
  };

  return (
    <ShipsContext.Provider value={{ ship, setShip, refreshShip: refresh, coolDown, setCoolDown }}>
      {children}
    </ShipsContext.Provider>
  );
};

export const useShipsContext = () => {
  const context = useContext(ShipsContext);
  if (context === undefined) {
    throw new Error('useShipsContext must be used within a ShipsContext Provider');
  }
  return context;
};
