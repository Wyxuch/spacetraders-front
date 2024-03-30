'use client';

import { useEffect, useState } from 'react';

import { BASE_URL } from '@consts/common';

import { ContractData, ContractResponse } from '@api/types';

import Paragraph from '@components/atoms/Typography/Paragraph';
import { Card, CardContent } from '@components/shadcn/ui/card';
import { Separator } from '@components/shadcn/ui/separator';

import { useApi } from '@hooks/useApi';

export default function Home() {
  const fetch = useApi();
  const [contract, setContract] = useState<ContractData[] | undefined>();

  useEffect(() => {
    if (!contract) {
      fetch<ContractResponse, undefined>(`${BASE_URL}/my/contracts`).then(res => {
        setContract(res?.data);
      });
    }
  }, [contract, fetch]);

  return (
    <Card className={'w-full h-full overflow-y-scroll'}>
      {contract ? (
        <CardContent className={'py-4'}>
          {/*CONTRACTS*/}

          {contract.length ? (
            contract.map((element, i) => (
              <>
                <h3 className={'mb-2 text-xl'}>Contract{i}</h3>
                <div className={'grid grid-cols-4'}>
                  <Paragraph>{`Faction: ${element.factionSymbol}`}</Paragraph>
                  <Paragraph>{`Type: ${element.type}`}</Paragraph>
                  <Paragraph>{`Deadline: ${element.terms.deadline}`}</Paragraph>
                  <Paragraph>{`Deliver: ${element.deliver.tradeSymbol}`}</Paragraph>
                  <Paragraph>{`To: ${element.deliver.destinationSymbol}`}</Paragraph>
                </div>
                <Separator className={'m-2'} />
              </>
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
