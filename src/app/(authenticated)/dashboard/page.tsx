'use client';

import { BASE_URL } from '@consts/common';

import { ExtractionResponse } from '@api/types';
import { useShipsContext } from '@context/ShipsContext';
import { AnyObject } from '@utils/types';

import Paragraph from '@components/atoms/Typography/Paragraph';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@components/shadcn/ui/accordion';
import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent } from '@components/shadcn/ui/card';
import { Separator } from '@components/shadcn/ui/separator';
import { useToast } from '@components/shadcn/ui/use-toast';

import { useApi } from '@hooks/useApi';
import { Accordion } from '@radix-ui/react-accordion';

export default function Home() {
  const fetch = useApi();
  const { ship, refreshShip, setCoolDown } = useShipsContext();
  const { toast } = useToast();

  const handleDock = () => {
    if (!ship) {
      toast({
        title: 'Ship not found',
        description: 'Select Ship'
      });
      return;
    }
    fetch<undefined, undefined>(`${BASE_URL}/my/ships/${ship.symbol}/dock`, undefined, 'POST').then(res => {
      refreshShip();
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
    fetch<undefined, undefined>(`${BASE_URL}/my/ships/${ship.symbol}/orbit`, undefined, 'POST').then(res => {
      refreshShip();
    });
  };

  const handleExtract = () => {
    if (!ship) {
      toast({
        title: 'Ship not found',
        description: 'Select Ship'
      });
      return;
    }
    fetch<ExtractionResponse, undefined>(`${BASE_URL}/my/ships/${ship.symbol}/extract`, undefined, 'POST').then(res => {
      setCoolDown(res?.data.cooldown.remainingSeconds || 0);
      refreshShip();
    });
  };

  return (
    <Card className={'w-full h-full overflow-y-scroll'}>
      <CardContent className={'py-4'}>
        {/*SHIP*/}
        {ship ? (
          <div className={'mb-6'}>
            <div className={'flex justify-between items-center'}>
              <h2 className={'text-3xl'}>Ship</h2>
              <div className={'flex gap-4'}>
                <Button onClick={handleExtract}>Extract</Button>
                {ship.nav.status === 'DOCKED' ? (
                  <Button onClick={handleOrbit}>Orbit</Button>
                ) : (
                  <Button onClick={handleDock}>Dock</Button>
                )}
              </div>
            </div>
            <Separator className={'m-2'} />

            {/*CARGO*/}
            <h3 className={'mb-2 text-xl'}>{`Cargo ${ship.cargo.units}/${ship.cargo.capacity}`}</h3>
            <Accordion type={'single'}>{JSON.stringify(ship.cargo.inventory)}</Accordion>
            <Separator className={'m-2'} />

            {/*CREW*/}
            <h3 className={'mb-2 text-xl'}>Crew</h3>
            <div className={'grid grid-cols-4'}>
              <Paragraph>{`Capacity: ${ship.crew.current}/${ship.crew.capacity}/${ship.crew.required}`}</Paragraph>
              <Paragraph>{`Morale: ${ship.crew.morale}`}</Paragraph>
              <Paragraph>{`Wages: ${ship.crew.wages}`}</Paragraph>
              <Paragraph>{`Rotation: ${ship.crew.rotation}`}</Paragraph>
            </div>
            <Separator className={'m-2'} />

            {/*ENGINE*/}
            <h3 className={'mb-2 text-xl'}>{`Engine - ${ship.engine.name}`}</h3>
            <Paragraph className={'my-2'}>{ship.engine.description}</Paragraph>
            <div className={'grid grid-cols-4'}>
              <Paragraph>{`Speed: ${ship.engine.speed}`}</Paragraph>
              <Paragraph>{`Condition: ${ship.engine.condition}`}</Paragraph>
              <Paragraph>{`Integrity: ${ship.engine.integrity}`}</Paragraph>
              <Paragraph>{`Power: ${ship.engine.requirements.power}`}</Paragraph>
              <Paragraph>{`Crew: ${ship.engine.requirements.crew}`}</Paragraph>
            </div>
            <Separator className={'m-2'} />

            {/*FRAME*/}
            <h3 className={'mb-2 text-xl'}>{`Frame - ${ship.frame.name}`}</h3>
            <Paragraph className={'my-2'}>{ship.frame.description}</Paragraph>
            <div className={'grid grid-cols-4'}>
              <Paragraph>{`Module Slots: ${ship.frame.moduleSlots}`}</Paragraph>
              <Paragraph>{`Mounting Points: ${ship.frame.mountingPoints}`}</Paragraph>
              <Paragraph>{`Fuel Capacity: ${ship.frame.fuelCapacity}`}</Paragraph>
              <Paragraph>{`Condition: ${ship.frame.condition}`}</Paragraph>
              <Paragraph>{`Integrity: ${ship.frame.integrity}`}</Paragraph>
              <Paragraph>{`Power: ${ship.frame.requirements.power}`}</Paragraph>
              <Paragraph>{`Crew: ${ship.frame.requirements.crew}`}</Paragraph>
            </div>
            <Separator className={'m-2'} />

            {/*REACTOR*/}
            <h3 className={'mb-2 text-xl'}>{`Reactor - ${ship.reactor.name}`}</h3>
            <Paragraph className={'my-2'}>{ship.reactor.description}</Paragraph>
            <div className={'grid grid-cols-4'}>
              <Paragraph>{`Power Output: ${ship.reactor.powerOutput}`}</Paragraph>
              <Paragraph>{`Condition: ${ship.reactor.condition}`}</Paragraph>
              <Paragraph>{`Integrity: ${ship.reactor.integrity}`}</Paragraph>
              <Paragraph>{`Crew: ${ship.reactor.requirements.crew}`}</Paragraph>
            </div>
            <Separator className={'m-2'} />

            {/*MODULES*/}
            <h3 className={'mb-2 text-xl'}>Modules</h3>
            <Accordion type={'single'}>
              {ship.modules.map((module, index) => (
                <AccordionItem key={module.symbol + index} value={module.symbol + index}>
                  <AccordionTrigger className={'opacity-80'}>{module.name}</AccordionTrigger>
                  <AccordionContent>
                    {Object.keys(module).map(key => {
                      if (key !== 'name' && key !== 'symbol' && key !== 'requirements')
                        return (
                          <Paragraph key={key}>{`${key}: ${String((module as unknown as AnyObject)[key])}`}</Paragraph>
                        );
                      if (key === 'requirements') {
                        return (
                          <>
                            <Paragraph className={'mt-2'}>{`Requirements:`}</Paragraph>
                            <div key={key} className={'grid grid-cols-4'}>
                              {Object.keys(module[key]).map((reqKey, index) => (
                                <Paragraph
                                  key={reqKey + index}
                                >{`${reqKey}: ${String((module[key] as unknown as AnyObject)[reqKey])}`}</Paragraph>
                              ))}
                            </div>
                          </>
                        );
                      }
                    })}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Separator className={'m-2'} />

            {/*MOUNTS*/}
            <h3 className={'mb-2 text-xl'}>Mounts</h3>
            <Accordion type={'single'}>
              {ship.mounts.map((mount, index) => (
                <AccordionItem key={mount.symbol + index} value={mount.symbol + index}>
                  <AccordionTrigger className={'opacity-80'}>{mount.name}</AccordionTrigger>
                  <AccordionContent>
                    {Object.keys(mount).map(key => {
                      if (key !== 'name' && key !== 'symbol' && key !== 'requirements')
                        return (
                          <Paragraph key={key}>{`${key}: ${String((mount as unknown as AnyObject)[key])}`}</Paragraph>
                        );
                      if (key === 'requirements') {
                        return (
                          <>
                            <Paragraph className={'mt-2'}>{`Requirements:`}</Paragraph>
                            <div key={key} className={'grid grid-cols-4'}>
                              {Object.keys(mount[key]).map((reqKey, index) => (
                                <Paragraph
                                  key={reqKey + index}
                                >{`${reqKey}: ${String((mount[key] as unknown as AnyObject)[reqKey])}`}</Paragraph>
                              ))}
                            </div>
                          </>
                        );
                      }
                    })}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Separator className={'m-2'} />
          </div>
        ) : (
          <h3 className={'text-xl'}>Select ship</h3>
        )}
      </CardContent>
    </Card>
  );
}
