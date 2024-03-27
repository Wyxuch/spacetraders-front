'use client';

import { Dispatch, ReactNode, useContext, useState } from 'react';
import { createContext } from 'react';

import { BASE_URL } from '@consts/common';

import { ContractData, SingleContractData } from '@api/types';

import { useApi } from '@hooks/useApi';

export interface ContractsContextValue {
  contract: ContractData | undefined;
  setContract: Dispatch<ContractData | undefined>;
  viewContracts: () => void;
  coolDown: number;
  setCoolDown: Dispatch<number>;
}

interface Props {
  children: ReactNode;
}

export const ContractsContext = createContext<ContractsContextValue>({
  contract: undefined,
  setContract: () => {},
  viewContracts: () => {},
  setCoolDown: () => {},
  coolDown: 0,
});

export const ContractsContextProvider = ({ children }: Props) => {
  const fetch = useApi();
  const [contract, setContract] = useState<ContractData | undefined>();
  const [coolDown, setCoolDown] = useState<number>(0);
  const refresh = () => {
    fetch<SingleContractData, undefined>(`${BASE_URL/my/contracts}}`).then(res => {
      if (res) {
        setCoolDown(res.data.cooldown.remainingSeconds);
        viewContracts(res.data);
      }
    });
  };

  return (
    <ContractsContext.Provider value={{ contract, viewContracts, setContract : refresh, coolDown, setCoolDown }}>
      {children}
    </ContractsContext.Provider>
  );
};

export const useContractsContext = () => {
  const context = useContext(ContractsContext);
  if (context === undefined) {
    throw new Error('useShipsContext must be used within a ShipsContext Provider');
  }
  return context;
};
function viewContracts(data: ContractData) {
  throw new Error('Function not implemented.');
}

