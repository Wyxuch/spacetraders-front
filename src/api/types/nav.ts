import { Meta } from '@api/types/common';

interface Trait {
  symbol: string;
  name: string;
  description: string;
}

interface Chart {
  submittedBy: string;
  submittedOn: string;
}

interface Faction {
  symbol: string;
}

export interface Waypoint {
  systemSymbol: string;
  symbol: string;
  type: string;
  x: number;
  y: number;
  orbitals: any[];
  traits: Trait[];
  modifiers: any[];
  chart: Chart;
  faction: Faction;
  orbits: string;
  isUnderConstruction: boolean;
}

export interface WaypointResponse {
  data: Waypoint[];
  meta: Meta;
}

export interface NavigateBody {
  waypointSymbol: string;
}
