'use client';

import { useEffect, useState } from 'react';

import { BASE_URL } from '@consts/common';

import { useShipsContext } from '@context/ShipsContext';
import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/shadcn/ui/card';

import { useApi } from '@hooks/useApi';

export default function Home() {
  const fetch = useApi();
  const [response, setResponse] = useState<ShipStatus | null>(null);

  useEffect(() => {
    if (typeof contract === 'undefined') {
      fetch<ContractResponse, undefined>(`${BASE_URL}/my/contracts`).then(res => {
        setContract(res?.data || []);
        if (typeof nocontract === 'undefined' && ship && !res?.data) {
          fetch<NoContractResponse, {}>(`${BASE_URL}/my/ships/${ship?.symbol}/negotiate/contract`, {}).then(res => {
            if (res?.status === 400 || res?.status === 404) {
              console.error('Bad Request');
              return;
            }
            setNoContract(res?.data || ({} as ContractData));
          });
        }
      });
    }
  }, [contract, fetch, nocontract, ship]);