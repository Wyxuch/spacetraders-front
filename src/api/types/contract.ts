import { Meta } from '@api/types/common';

interface Payment {
  onAccepted: number;
  onFulfilled: number;
}

interface Deliver {
  tradeSymbol: string;
  destinationSymbol: string;
  unitsRequired: number;
  unitsFulfilled: number;
}

interface Terms {
  deadline: string;
  payment: Payment;
  deliver: Deliver[];
}

export interface ContractData {
  id: string;
  factionSymbol: string;
  type: string;
  terms: Terms;
  accepted: boolean;
  fulfilled: boolean;
  expiration: string;
  deadlineToAccept: string;
}
export interface NoContractResponse {
  data: ContractData;
  meta: Meta;
  status: number;
}
export interface ContractResponse {
  data: ContractData[];
  meta: Meta;
}
