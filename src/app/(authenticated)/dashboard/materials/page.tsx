'use client';

import { useState } from 'react';

import { BASE_URL } from '@consts/common';

import { SurveyData, SurveyResponse, Surveys } from '@api/types/survey';
import { useShipsContext } from '@context/ShipsContext';

import Paragraph from '@components/atoms/Typography/Paragraph';
import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent } from '@components/shadcn/ui/card';
import { useToast } from '@components/shadcn/ui/use-toast';

import { useApi } from '@hooks/useApi';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';




export default function Home() {
  const { ship } = useShipsContext();
  const fetch = useApi();
  const { toast } = useToast();
  const [surveyData, setSurveyData] = useState<SurveyData | undefined>();

  const createSurvey = () => {
    if (!ship) {
      toast({
        title: 'Ship not found',
        description: 'Select a Ship'
      });
      return;
    }
    fetch<SurveyResponse, undefined>(`${BASE_URL}/my/ships/${ship.symbol}/survey`, undefined, 'POST')
      .then(res => setSurveyData(res?.data || ({} as SurveyData)))
      .catch(error => {
        console.error('Error creating survey:', error);
        toast({
          title: 'Error',
          description: 'Failed to create survey. Please try again later.'
        });
      });
  };
  const handleExtract = () => {
    if (!ship) {
      toast({
        title: 'Missing data',
        description: 'Select Ship and retry'
      });
      return;
    }
    fetch<undefined, SurveyResponse>(`${BASE_URL}/my/ships/${ship.symbol}/extract/survey`, {
      data: surveyData
    }).then(() => {
      createSurvey();
    });
  };
  return (
    <Card className={'w-full h-full'}>
      <CardContent>
        {surveyData ? (
          <>
            {surveyData ? (
              surveyData.surveys.map((surveys, index) => (
                <div key={surveys.signature}>
                  <h3 className={'mb-2 text-xl'}>Survey {index + 1}</h3>
                  <div className={'grid grid-cols-4'}>
                    <Paragraph>{`Symbol: ${surveys.signature}`}</Paragraph>
                    <Paragraph>{`Size: ${surveys.size}`}</Paragraph>
                    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link">{`extract resource ${index + 1}`}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Button onClick={handleExtract} className={'w-full'}>
          Extract
        </Button>
      </PopoverContent>
    </Popover>
                
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
