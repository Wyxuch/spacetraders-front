export interface Meta {
  total: number;
  page: number;
  limit: number;
}

interface Data {
  symbol: string;
  nav: Nav;
  crew: Crew;
  fuel: Fuel;
  cooldown: Cooldown;
  frame: Frame;
  reactor: Reactor;
  engine: Engine;
  modules: Module[];
  mounts: Mount[];
  registration: Registration;
  cargo: Cargo;
}

interface Nav {
  systemSymbol: string;
  waypointSymbol: string;
  route: Route;
  status: string;
  flightMode: string;
}

interface Route {
  origin: OriginDestination;
  destination: OriginDestination;
  arrival: string;
  departureTime: string;
}

interface OriginDestination {
  symbol: string;
  type: string;
  systemSymbol: string;
  x: number;
  y: number;
}

interface Crew {
  current: number;
  capacity: number;
  required: number;
  rotation: string;
  morale: number;
  wages: number;
}

interface Fuel {
  current: number;
  capacity: number;
  consumed: Consumed;
}

interface Consumed {
  amount: number;
  timestamp: string;
}

interface Cooldown {
  shipSymbol: string;
  totalSeconds: number;
  remainingSeconds: number;
}

interface Frame {
  symbol: string;
  name: string;
  description: string;
  moduleSlots: number;
  mountingPoints: number;
  fuelCapacity: number;
  condition: number;
  integrity: number;
  requirements: Requirements;
}

interface Reactor {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  powerOutput: number;
  requirements: Requirements;
}

interface Engine {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  speed: number;
  requirements: Requirements;
}

interface Module {
  symbol: string;
  name: string;
  description: string;
  capacity?: number;
  requirements: Requirements;
}

interface Mount {
  symbol: string;
  name: string;
  description: string;
  strength: number;
  deposits?: string[];
  requirements: Requirements;
}

interface Requirements {
  power: number;
  crew: number;
  slots?: number;
}

interface Registration {
  name: string;
  factionSymbol: string;
  role: string;
}

interface Cargo {
  capacity: number;
  units: number;
  inventory: any[];
}

export interface ShipStatus {
  data: Data[];
  meta: Meta;
}
