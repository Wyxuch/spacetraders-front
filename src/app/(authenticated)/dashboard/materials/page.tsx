'use client';

import { useState } from 'react';
import { BASE_URL } from '@consts/common';
import { SurveyData, SurveyResponse, Surveys } from '@api/types/survey';
import { useShipsContext } from '@context/ShipsContext';
import { useApi } from '@hooks/useApi';
import { useToast } from '@components/shadcn/ui/use-toast';
import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent } from '@components/shadcn/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import Paragraph from '@components/atoms/Typography/Paragraph';

export default function Home() {
  const { ship, refreshShip } = useShipsContext();
  const fetch = useApi();
  const { toast } = useToast();
  const [surveyData, setSurveyData] = useState<SurveyData | undefined>();

  const createSurvey = () => {
    if (ship?.nav.status === 'DOCKED') {
      toast({
        title: 'orbit bitch',
        description: 'you dick'
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

  const handleOrbit = () => {
    if (!ship) {
      toast({
        title: 'Ship not found',
        description: 'Select Ship'
      });
      return;
    }
    fetch<undefined, undefined>(`${BASE_URL}/my/ships/${ship.symbol}/orbit`, undefined, 'POST')
      .then(res => {
        refreshShip();
      });
  };

  const handleDock = () => {
    if (!ship) {
      toast({
        title: 'Ship not found',
        description: 'Select Ship'
      });
      return;
    }
    fetch<undefined, undefined>(`${BASE_URL}/my/ships/${ship.symbol}/dock`, undefined, 'POST')
      .then(res => {
        refreshShip();
      });
  };

  const handleExtract = (survey: Surveys, depositIndex: number) => {
    if (ship?.nav.status === 'IN_ORBIT') {
      handleDock();
    }
    fetch<undefined, SurveyResponse>(`${BASE_URL}/my/ships/${ship.symbol}/extract/survey`, {
      data: {
        signature: surveyData?.surveys[0].signature,
        symbol: surveyData?.surveys[0].symbol,
        expiration: surveyData?.surveys[0].expiration,
        deposits: surveyData?.surveys[0].deposits[depositIndex],
      }
    }).then(() => {
    });
  };

  return (
    <Card className={'w-full h-full'}>
      <CardContent>
        {surveyData !== undefined ? (
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
                        <Button onClick={() => handleExtract(survey, depositIndex)} className={'w-full'}>
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
}
