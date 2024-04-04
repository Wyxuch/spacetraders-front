'use client';

import React, { useEffect, useState } from 'react';
import { BASE_URL } from '@consts/common';
import { ContractData, ContractResponse, NoContractResponse } from '@api/types';
import { useShipsContext } from '@context/ShipsContext';
import { useApi } from '@hooks/useApi';
import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent } from '@components/shadcn/ui/card';
import { Separator } from '@components/shadcn/ui/separator';
import Paragraph from '@components/atoms/Typography/Paragraph';

export default function Home() {
  const fetch = useApi();
  const { ship } = useShipsContext();
  const [contract, setContract] = useState<ContractData[] | undefined>();
  const [nocontract, setNoContract] = useState<ContractData | undefined>();

  useEffect(() => {
    if (typeof nocontract === 'undefined' && ship) {
      fetch<NoContractResponse, undefined>(`${BASE_URL}/my/ships/${ship?.symbol}/negotiate/contract`).then(res => {
        if (res?.status === 400 || res?.status === 404) {
          console.error('Bad Request');
          return;
        }
        setNoContract(res?.data || ({} as ContractData));
      });
    }
  }, [nocontract, fetch, ship]);

  useEffect(() => {
    if (typeof contract === 'undefined') {
      fetch<ContractResponse, undefined>(`${BASE_URL}/my/contracts`).then(res => {
        setContract(res?.data || []);
      });
    }
  }, [contract, fetch]);

  const Accepting = (contractId: string) => {
    fetch(`${BASE_URL}/my/contracts/${ship?.symbol}/${contractId}/accept`, {
      method: 'POST',
    });
  };

  return (
    <Card className={'w-full h-full overflow-y-scroll'}>
      {contract ? (
        <CardContent className={'py-4'}>
          {/* CONTRACTS */}
          {contract.length ? (
            contract.map((element, i) => (
              <div key={element.id}>
                <h3 className={'mb-2 text-xl'}>Contract</h3>
                <div className={'grid grid-cols-4'}>
                  <Paragraph>{`Faction: ${element.factionSymbol}`}</Paragraph>
                  <Paragraph>{`Type: ${element.type}`}</Paragraph>
                  <Paragraph>{`Deadline: ${element.terms.deadline}`}</Paragraph>
                  {element.accepted === false ? (
                  <Button key={element.id} onClick={() => Accepting(element.id)}>Accept</Button>
                ) : (
                  null
                )}
                  {element.terms.deliver.map((delivery, j) => (
                    <React.Fragment key={j}>
                      <Paragraph>{`Deliver: ${delivery.tradeSymbol}`}</Paragraph>
                      <Paragraph>{`To: ${delivery.destinationSymbol}`}</Paragraph>
                    </React.Fragment>
                  ))}
                </div>
                <Separator className={'m-2'} />
              </div>
            ))
          ) : (
            <p>{'No active contracts :<'}</p>
          )}
          {/* NO CONTRACT */}
          {nocontract && (
            <div>
              <h3 className={'mb-2 text-xl'}>Available contract</h3>
              <div className={'grid grid-cols-4'}>
                <Paragraph>{`Faction: ${nocontract.factionSymbol}`}</Paragraph>
                <Paragraph>{`Type: ${nocontract.type}`}</Paragraph>
                {nocontract.terms && (
                  <>
                    <Paragraph>{`Deadline: ${nocontract.terms.deadline}`}</Paragraph>
                    {nocontract.terms.deliver.map((delivery, j) => (
                      <React.Fragment key={j}>
                        <Paragraph>{`Deliver: ${delivery.tradeSymbol}`}</Paragraph>
                        <Paragraph>{`To: ${delivery.destinationSymbol}`}</Paragraph>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </div>
              <Separator className={'m-2'} />
            </div>
          )}
        </CardContent>
      ) : (
        <p>Loading</p>
      )}
    </Card>
  );
}
