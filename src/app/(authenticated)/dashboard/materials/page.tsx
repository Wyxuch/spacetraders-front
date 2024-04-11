'use client';

import { useState, useEffect } from 'react';

import { BASE_URL } from '@consts/common';

import { SurveyResponse } from '@api/types/survey';
import { useShipsContext } from '@context/ShipsContext';
import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent } from '@components/shadcn/ui/card';
import { useToast } from '@components/shadcn/ui/use-toast';
import Paragraph from '@components/atoms/Typography/Paragraph';
import { useApi } from '@hooks/useApi';

export default function Home() {
  const { ship } = useShipsContext();
  const fetch = useApi();
  const { toast } = useToast();
  const [surveyResponse, setSurveyResponse,] = useState<SurveyResponse | undefined>();

  const createSurvey = () => {
    if (!ship) {
      toast({
        title: 'Ship not found',
        description: 'Select a Ship'
      });
      return;
    }
    fetch(`${BASE_URL}/my/ships/${ship.symbol}/survey`, {
      method: 'POST'
    })
    .then(res =>  setSurveyResponse(res?.data || ({} as SurveyResponse)))
    .catch(error => {
      console.error('Error creating survey:', error);
      toast({
        title: 'Error',
        description: 'Failed to create survey. Please try again later.'
      });
    });
  };
  
  return (
    <Card className={'w-full h-full'}>
      <CardContent>
        {surveyResponse ? (
          <>
            {surveyResponse ? (
              surveyResponse.data.surveys.map((surveys, index) => ( 
                <div key={surveys.signature}>
                  <h3 className={'mb-2 text-xl'}>Survey {index + 1}</h3>
                  <div className={'grid grid-cols-4'}>
                    <Paragraph>{`Symbol: ${surveys.signature}`}</Paragraph>
                    <Paragraph>{`Size: ${surveys.size}`}</Paragraph>
                  </div>
                  <h4 className={'mt-4 mb-2 text-lg'}>Deposits</h4>
                  <ul>
                    {surveys.deposits.map(deposits => (
                      <li key={deposits.symbol}>{deposits.symbol}</li>
                    ))}
                  </ul>
                </div> 
              ))
            ) : (
              <Button onClick={createSurvey}>Create survey</Button>
            )}
          </>
        ) : (
          <Button onClick={createSurvey}>Create survey</Button>
        )}
      </CardContent>
    </Card>
  );
}