'use client';

import { useState } from 'react';

import { BASE_URL } from '@consts/common';

import { ShipStatus } from '@api/types';
import { useShipsContext } from '@context/ShipsContext';
import { AnyObject } from '@utils/types';

import Paragraph from '@components/atoms/Typography/Paragraph';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@components/shadcn/ui/accordion';
import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/shadcn/ui/card';
import { Separator } from '@components/shadcn/ui/separator';
import { useToast } from '@components/shadcn/ui/use-toast';

import { useApi } from '@hooks/useApi';
import { Accordion } from '@radix-ui/react-accordion';

export default function Home() {
  const fetch = useApi();
  const { ship, refreshShip } = useShipsContext();
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
  console.log(ship);

  return (
    <Card className={'w-full h-full overflow-y-scroll'}>
      <CardContent className={'py-4'}>
        {/*SHIP*/}
        {ship ? (
          <div className={'mb-6'}>
            <div className={'flex justify-between items-center'}>
              <h2 className={'text-3xl'}>Ship</h2>
              {ship.nav.status === 'DOCKED' ? (
                <Button onClick={handleOrbit}>Orbit</Button>
              ) : (
                <Button onClick={handleDock}>Dock</Button>
              )}
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

// {
//   "symbol": "CYBERGOOSE-1",
//     "nav": {
//   "systemSymbol": "X1-AF98",
//       "waypointSymbol": "X1-AF98-CZ5A",
//       "route": {
//     "origin": {
//       "symbol": "X1-AF98-A1",
//           "type": "PLANET",
//           "systemSymbol": "X1-AF98",
//           "x": 0,
//           "y": 26
//     },
//     "destination": {
//       "symbol": "X1-AF98-CZ5A",
//           "type": "ENGINEERED_ASTEROID",
//           "systemSymbol": "X1-AF98",
//           "x": -25,
//           "y": -2
//     },
//     "arrival": "2024-03-20T12:57:53.011Z",
//         "departureTime": "2024-03-20T12:57:06.011Z"
//   },
//   "status": "DOCKED",
//       "flightMode": "CRUISE"
// },
//   "crew": {
//   "current": 57,
//       "capacity": 80,
//       "required": 57,
//       "rotation": "STRICT",
//       "morale": 100,
//       "wages": 0
// },
//   "fuel": {
//   "current": 362,
//       "capacity": 400,
//       "consumed": {
//     "amount": 38,
//         "timestamp": "2024-03-20T12:57:06.026Z"
//   }
// },
//   "cooldown": {
//   "shipSymbol": "CYBERGOOSE-1",
//       "totalSeconds": 0,
//       "remainingSeconds": 0
// },
//   "frame": {
//   "symbol": "FRAME_FRIGATE",
//       "name": "Frigate",
//       "description": "A medium-sized, multi-purpose spacecraft, often used for combat, transport, or support operations.",
//       "moduleSlots": 8,
//       "mountingPoints": 5,
//       "fuelCapacity": 400,
//       "condition": 1,
//       "integrity": 1,
//       "requirements": {
//     "power": 8,
//         "crew": 25
//   }
// },
//   "reactor": {
//   "symbol": "REACTOR_FISSION_I",
//       "name": "Fission Reactor I",
//       "description": "A basic fission power reactor, used to generate electricity from nuclear fission reactions.",
//       "condition": 1,
//       "integrity": 1,
//       "powerOutput": 31,
//       "requirements": {
//     "crew": 8
//   }
// },
//   "engine": {
//   "symbol": "ENGINE_ION_DRIVE_II",
//       "name": "Ion Drive II",
//       "description": "An advanced propulsion system that uses ionized particles to generate high-speed, low-thrust acceleration, with improved efficiency and performance.",
//       "condition": 1,
//       "integrity": 1,
//       "speed": 30,
//       "requirements": {
//     "power": 6,
//         "crew": 8
//   }
// },
//   "modules": [
//   {
//     "symbol": "MODULE_CARGO_HOLD_II",
//     "name": "Expanded Cargo Hold",
//     "description": "An expanded cargo hold module that provides more efficient storage space for a ship's cargo.",
//     "capacity": 40,
//     "requirements": {
//       "crew": 2,
//       "power": 2,
//       "slots": 2
//     }
//   },
//   {
//     "symbol": "MODULE_CREW_QUARTERS_I",
//     "name": "Crew Quarters",
//     "description": "A module that provides living space and amenities for the crew.",
//     "capacity": 40,
//     "requirements": {
//       "crew": 2,
//       "power": 1,
//       "slots": 1
//     }
//   },
//   {
//     "symbol": "MODULE_CREW_QUARTERS_I",
//     "name": "Crew Quarters",
//     "description": "A module that provides living space and amenities for the crew.",
//     "capacity": 40,
//     "requirements": {
//       "crew": 2,
//       "power": 1,
//       "slots": 1
//     }
//   },
//   {
//     "symbol": "MODULE_MINERAL_PROCESSOR_I",
//     "name": "Mineral Processor",
//     "description": "Crushes and processes extracted minerals and ores into their component parts, filters out impurities, and containerizes them into raw storage units.",
//     "requirements": {
//       "crew": 0,
//       "power": 1,
//       "slots": 2
//     }
//   },
//   {
//     "symbol": "MODULE_GAS_PROCESSOR_I",
//     "name": "Gas Processor",
//     "description": "Filters and processes extracted gases into their component parts, filters out impurities, and containerizes them into raw storage units.",
//     "requirements": {
//       "crew": 0,
//       "power": 1,
//       "slots": 2
//     }
//   }
// ],
//     "mounts": [
//   {
//     "symbol": "MOUNT_SENSOR_ARRAY_II",
//     "name": "Sensor Array II",
//     "description": "An advanced sensor array that improves a ship's ability to detect and track other objects in space with greater accuracy and range.",
//     "strength": 4,
//     "requirements": {
//       "crew": 2,
//       "power": 2
//     }
//   },
//   {
//     "symbol": "MOUNT_GAS_SIPHON_II",
//     "name": "Gas Siphon II",
//     "description": "An advanced gas siphon that can extract gas from gas giants and other gas-rich bodies more efficiently and at a higher rate.",
//     "strength": 20,
//     "requirements": {
//       "crew": 2,
//       "power": 2
//     }
//   },
//   {
//     "symbol": "MOUNT_MINING_LASER_II",
//     "name": "Mining Laser II",
//     "description": "An advanced mining laser that is more efficient and effective at extracting valuable minerals from asteroids and other space objects.",
//     "strength": 5,
//     "requirements": {
//       "crew": 2,
//       "power": 2
//     }
//   },
//   {
//     "symbol": "MOUNT_SURVEYOR_II",
//     "name": "Surveyor II",
//     "description": "An advanced survey probe that can be used to gather information about a mineral deposit with greater accuracy.",
//     "strength": 2,
//     "deposits": [
//       "QUARTZ_SAND",
//       "SILICON_CRYSTALS",
//       "PRECIOUS_STONES",
//       "ICE_WATER",
//       "AMMONIA_ICE",
//       "IRON_ORE",
//       "COPPER_ORE",
//       "SILVER_ORE",
//       "ALUMINUM_ORE",
//       "GOLD_ORE",
//       "PLATINUM_ORE",
//       "DIAMONDS",
//       "URANITE_ORE"
//     ],
//     "requirements": {
//       "crew": 4,
//       "power": 3
//     }
//   }
// ],
//     "registration": {
//   "name": "CYBERGOOSE-1",
//       "factionSymbol": "COSMIC",
//       "role": "COMMAND"
// },
//   "cargo": {
//   "capacity": 40,
//       "units": 0,
//       "inventory": []
// }
// }
