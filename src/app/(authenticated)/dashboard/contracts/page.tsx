'use client';

import { useEffect, useState } from 'react';

import { BASE_URL } from '@consts/common';

import { ContractData, ContractResponse } from '@api/types';
import { useShipsContext } from '@context/ShipsContext';

import Paragraph from '@components/atoms/Typography/Paragraph';
import { Card, CardContent } from '@components/shadcn/ui/card';
import { Separator } from '@components/shadcn/ui/separator';

import { useApi } from '@hooks/useApi';

export default function Home() {
  const fetch = useApi();
  const [contract, setContract] = useState<ContractData[] | undefined>();
  const { ship } = useShipsContext();

  useEffect(() => {
    fetch<ContractResponse, undefined>(`${BASE_URL}/my/contracts`).then(res => {
      setContract(res?.data);
    });
  }, []);

  useEffect(() => {
    if (!contract && ship) {
      fetch<ContractResponse, undefined>(
        `https://stoplight.io/mocks/spacetraders/spacetraders/96627693/my/ship/${ship?.symbol}/negotiate/contract`
      ).then(res => {
        setContract(res?.data);
      });
    }
  }, [contract]);

  return (
    <Card className={'w-full h-full overflow-y-scroll'}>
      {contract ? (
        <CardContent className={'py-4'}>
          {/* CONTRACTS */}
          {contract.length ? (
            contract.map((contract, i) => (
              <div key={i}>
                <h3 className={'mb-2 text-xl'}> Contract</h3>
                <div className={'grid grid-cols-4'}>
                  <Paragraph>{`Faction: ${contract.factionSymbol}`}</Paragraph>
                  <Paragraph>{`Type: ${contract.type}`}</Paragraph>
                  <Paragraph>{`Deadline: ${contract.terms.deadline}`}</Paragraph>
                  {contract.terms.deliver.map((deliverable, index) => (
                    <div key={index}>
                      <Paragraph>{`Deliver ${deliverable.unitsRequired}/${deliverable.unitsRequired} ${deliverable.tradeSymbol}`}</Paragraph>
                      <Paragraph>{`To: ${deliverable.destinationSymbol}`}</Paragraph>
                      <Paragraph>{`Accepted: ${contract.terms.payment.onAccepted}$`}</Paragraph>
                      <Paragraph>{`On delivery: ${contract.terms.payment.onFulfilled}$`}</Paragraph>
                    </div>
                  ))}
                </div>
                <Separator className={'m-2'} />
              </div>
            ))
          ) : (
            <p>No contracts</p>
          )}
        </CardContent>
      ) : (
        <p>Loading</p>
      )}
    </Card>
  );
}
