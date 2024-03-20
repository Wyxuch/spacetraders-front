'use client';

import { Dispatch, ReactNode, useContext, useState } from 'react';
import { createContext } from 'react';

import { ShipData } from '@api/types';

export interface ShipsContextValue {
  ship: ShipData | undefined;
  setShip: Dispatch<ShipData | undefined>;
}

interface Props {
  children: ReactNode;
}

export const ShipsContext = createContext<ShipsContextValue>({ ship: undefined, setShip: () => {} });

export const ShipsContextProvider = ({ children }: Props) => {
  const [ship, setShip] = useState<ShipData | undefined>();

  return <ShipsContext.Provider value={{ ship, setShip }}>{children}</ShipsContext.Provider>;
};

export const useShipsContext = () => {
  const context = useContext(ShipsContext);
  if (context === undefined) {
    throw new Error('useShipsContext must be used within a ShipsContext Provider');
  }
  return context;
};
