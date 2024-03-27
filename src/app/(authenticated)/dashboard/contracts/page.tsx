import { useToast } from "@components/shadcn/ui/use-toast";
import { useContractsContext} from "@context/ContractsContext";
import { useApi } from "@hooks/useApi";
import { Accordion } from "@components/shadcn/ui/accordion";
import { Card, CardContent } from "@components/shadcn/ui/card";
import { useState } from "react";
import Paragraph from "@components/atoms/Typography/Paragraph";
import { Separator } from "@components/shadcn/ui/separator";
export default function Home() {
  const fetch = useApi();
  const { contract, setCoolDown } = useContractsContext();{
  return (
    <Card className={'w-full h-full overflow-y-scroll'}>
      <CardContent className={'py-4'}>
                    {/*CONTRACTS*/}
                    <h3 className={'mb-2 text-xl'}>Crew</h3>
            <div className={'grid grid-cols-4'}>
              <Paragraph>{`Faction: ${contract.factionSymbol}`}</Paragraph>
              <Paragraph>{`Type: ${contract.type}`}</Paragraph>
              <Paragraph>{`Deadline: ${contract.terms.deadline}`}</Paragraph>
              <Paragraph>{`Deliver: ${contract.deliver.tradeSymbol}`}</Paragraph>
              <Paragraph>{`To: ${contract.deliver.destinationSymbol}`}</Paragraph>
            </div>
            <Separator className={'m-2'} />
            </CardContent>
            </Card>)}}