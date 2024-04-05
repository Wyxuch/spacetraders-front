export interface Meta {
  total: number;
  page: number;
  limit: number;
}

export interface Cooldown {
  shipSymbol: string;
  totalSeconds: number;
  remainingSeconds: number;
  expiration?: string;
}

interface Yield {
  symbol: string;
  units: number;
}

interface Extraction {
  shipSymbol: string;
  yield: Yield;
}

export interface InventoryItem {
  symbol: string;
  name: string;
  description: string;
  units: number;
}

export interface Cargo {
  capacity: number;
  units: number;
  inventory: InventoryItem[];
}

export interface ExtractionData {
  extraction: Extraction;
  cooldown: Cooldown;
  cargo: Cargo;
  events: any[];
}

export interface ExtractionResponse {
  data: ExtractionData;
}
