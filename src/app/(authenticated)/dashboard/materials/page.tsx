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
      data: {
        signature: surveyData?.surveys[0].signature,
        symbol: surveyData?.surveys[0].symbol,
        expiration: surveyData?.surveys[0].expiration,
        deposits: surveyData?.surveys[0].deposits,
      }
    }).then(() => {
      createSurvey();
    });
  };
  return (
    <Card className={'w-full h-full'}>
      <CardContent>
        {surveyData ? (
          surveyData.surveys.map((survey, surveyIndex) => (
            <div key={survey.signature}>
              <h3 className={'mb-2 text-xl'}>Survey {surveyIndex + 1}</h3>
              <div className={'grid grid-cols-4'}>
                <Paragraph>{`Symbol: ${survey.signature}`}</Paragraph>
                <Paragraph>{`Size: ${survey.size}`}</Paragraph>
              </div>
              <h4 className={'mt-4 mb-2 text-lg'}>Deposits</h4>
              <ul>
                {survey.deposits.map((deposit, depositIndex) => (
                  <li key={deposit.symbol}>
                    {deposit.symbol}
                    <Popover>
                      <PopoverTrigger asChild>
                        <span>
                          <Button variant="link">{`Extract resource ${surveyIndex + 1}.${depositIndex + 1}`}</Button>
                        </span>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <Button onClick={() => handleExtract} className={'w-full'}>
                          Extract
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <Button onClick={createSurvey}>Create survey</Button>
        )}
      </CardContent>
    </Card>
  );
  
};
