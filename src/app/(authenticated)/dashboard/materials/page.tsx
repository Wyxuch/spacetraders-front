'use client';

import { useState } from 'react';
import { BASE_URL } from '@consts/common';
import { SurveyData, SurveyResponse, Surveys} from '@api/types/survey';
import { useShipsContext } from '@context/ShipsContext';
import { useApi } from '@hooks/useApi';
import { useToast } from '@components/shadcn/ui/use-toast';
import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent } from '@components/shadcn/ui/card';
import Paragraph from '@components/atoms/Typography/Paragraph';

export default function Home() {
  const { ship, refreshShip } = useShipsContext();
  const fetch = useApi();
  const { toast } = useToast();
  const [surveyData, setSurveyData] = useState<SurveyData | undefined>();

  const createSurvey = () => {
    if (ship?.nav.status !== 'IN ORBIT'  && ship?.cooldown.remainingSeconds !== 0) {
      toast({
        title: 'Failed to create survey. Please try again later',
        description: 'sadge'
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

  const handleExtract = (survey: Surveys, depositIndex: number) => {
    if (ship?.nav.status === 'DOCKED') {
      handleOrbit();
    }
    fetch<SurveyResponse, Surveys>(`${BASE_URL}/my/ships/${ship.symbol}/extract/survey`, {
        signature: surveyData?.surveys[0]?.signature || "",
        symbol: surveyData?.surveys[0]?.symbol || "",
        expiration: surveyData?.surveys[0]?.expiration || "",
        deposits: surveyData?.surveys[0]?.deposits || [],
        size: surveyData?.surveys[0]?.size || "",
    }).then(() => {
      refreshShip();
    });
  };

  return (
    <Card className={'w-full h-full'}>
      <CardContent>
        {surveyData !== undefined ? (
          surveyData.surveys.map((survey, surveyIndex) => (
            <div key={survey.signature}>

              <h3 className={'mb-2 text-xl'}>Survey {survey.size}</h3>
              <div className={'grid grid-cols-4'}>
                <Paragraph>{`Symbol: ${survey.signature}`}</Paragraph>
                <Paragraph>{`Expiration: ${survey.expiration}`}</Paragraph>
                <Paragraph>{`Size: ${survey.size}`}</Paragraph>
                <Paragraph>{`Deposits: ${survey.deposits.length}`}</Paragraph>
              </div>
              <h4 className={'mt-4 mb-2 text-lg'}>Deposits</h4>
              <ul>
                {survey.deposits.map((deposit, depositIndex) => (
                  <li key={deposit.symbol}>
    {deposit.symbol}
                  </li>
                ))}
              </ul>
              <Button onClick={() => handleExtract(survey, surveyIndex)} className={'w-full'}>
                          Extract
                        </Button>
            </div>
            
          ))
        ) : (
          <Button onClick={createSurvey}>Create survey</Button>
        )}
      </CardContent>
    </Card>
  );
}
