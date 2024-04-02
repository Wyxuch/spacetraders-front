'use client';

import React, { useEffect, useState } from 'react';

import { BASE_URL } from '@consts/common';
import { useShipsContext } from '@context/ShipsContext';

import { ContractData, ContractResponse} from '@api/types';
import Paragraph from '@components/atoms/Typography/Paragraph';
import { Card, CardContent } from '@components/shadcn/ui/card';
import { Separator } from '@components/shadcn/ui/separator';

import { useApi } from '@hooks/useApi';

export default function Home() {
  const fetch = useApi();
  const [contract, setContract] = useState<ContractData[] | undefined>();
  const [nocontract, setnocontract] = useState<ContractData[] | undefined>()
  const { ship } = useShipsContext();
  
  useEffect(() => {
    if (contract && contract.length > 0) {
      contract.forEach(contractData => {
        if (!contractData.accepted) {
          fetch<ContractResponse, undefined>(`${BASE_URL}/my/ships/${ship?.symbol}/negotiate/contract`)
            .then(res => {
              if (res && res.data) {
                setnocontract(res.data);
              }
            });
        }
      });
    }
  }, [nocontract, fetch]);

  
  
  useEffect(() => {
    if (!contract) {
      fetch<ContractResponse, undefined>(`${BASE_URL}/my/contracts`).then(res => {
        setContract(res?.data);
      });
    }
  }, 
  
  [contract, fetch]);

  
  return (
    <Card className={'w-full h-full overflow-y-scroll'}>
      {contract ? (
        <CardContent className={'py-4'}>
          {/*CONTRACTS*/}
  
          {contract.length ? (
            contract.map((element, i) => (
              <div key={element.id}>
                <h3 className={'mb-2 text-xl'}>Contract{i}</h3>
                
                <div className={'grid grid-cols-4'}>
                  <Paragraph>{`Faction: ${element.factionSymbol}`}</Paragraph>
                  <Paragraph>{`Type: ${element.type}`}</Paragraph>
                  <Paragraph>{`Deadline: ${element.terms.deadline}`}</Paragraph>
                  {element.deliver.map((delivery, j) => (
                    <React.Fragment key={j}>
                      <Paragraph>{`Deliver: ${delivery.tradeSymbol}`}</Paragraph>
                      <Paragraph>{`To: ${delivery.destinationSymbol}`}</Paragraph>
                    </React.Fragment>
                  ))}
                </div>
                <Separator className={'m-2'} /> {}
              </div>
            ))
          ) : (
            <p>{'No contracts :<'}</p>
          )}
        </CardContent>
      ) : (
        <p>Loading</p>
      )}
    </Card>
  );
      }
