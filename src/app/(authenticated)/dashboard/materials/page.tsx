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
  const [surveyResponse, setSurveyResponse] = useState<SurveyResponse | undefined>();

  const createSurvey = () => {
    if (!ship) {
      toast({
        title: 'Ship not found',
        description: 'Select Ship'
      });
      return;
    }
    fetch<SurveyResponse, undefined>(`${BASE_URL}/my/ships/${ship.symbol}/survey`, undefined, 'POST').then(res => {
      setSurveyResponse(res?.data);
    });
     [createSurvey, fetch, ship];
  };
  return (
    <Card className={'w-full h-full'}>
      {surveyResponse &&} (
      <CardContent>
        <Button onClick={createSurvey}>Create survey</Button>
                  {/*Materials*/}
                    <h3 className={'mb-2 text-xl'}>Crew</h3>
            <div className={'grid grid-cols-4'}>
              <Paragraph>{`Capacity: ${deposit.symbol}`}</Paragraph>
              <Paragraph>{`Morale: ${ship.crew.morale}`}</Paragraph>
              <Paragraph>{`Wages: ${ship.crew.wages}`}</Paragraph>
              <Paragraph>{`Rotation: ${ship.crew.rotation}`}</Paragraph>
            </div>
                    )
      );
      </CardContent>
    </Card>
  );
};
