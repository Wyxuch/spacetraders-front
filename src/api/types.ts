export interface Meta {
  total: number;
  page: number;
  limit: number;
}
export interface ContractData {
  cooldown: any;
  id: string
  factionSymbol: string
  type: string
  terms: Terms
  deliver: Deliver
  accepted: boolean
  fulfilled: boolean
  expiration: string
  deadlineToAccept: string
}
export interface Terms {
  deadline: string
  payment: Payment
}
export interface Deliver {
  tradeSymbol: string
  destinationSymbol: boolean
  unitsRequired: number
  unitsFulfilled: number

}
export interface Payment {
  onAccepted: number
  onFufilled: number
}
export interface ContractResponse {
  data: ContractData[];
  meta: Meta;
}
export interface ShipData {
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
  expiration?: string;
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

export interface ShipStatus {
  data: ShipData[];
  meta: Meta;
}

export interface SingleShipStatus {
  data: ShipData;
  meta: Meta;
}

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

interface Yield {
  symbol: string;
  units: number;
}

interface Extraction {
  shipSymbol: string;
  yield: Yield;
}

interface InventoryItem {
  symbol: string;
  name: string;
  description: string;
  units: number;
}

interface Cargo {
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
