export type Rockets = Rocket[];

export interface Rocket {
  height: Height;
  diameter: Diameter;
  mass: Mass;
  first_stage: FirstStage;
  second_stage: SecondStage;
  engines: Engines;
  landing_legs: LandingLegs;
  payload_weights: PayloadWeight[];
  flickr_images: string[];
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
  id: string;
}

export interface Height {
  meters: number;
  feet: number;
}

export interface Diameter {
  meters: number;
  feet: number;
}

export interface Mass {
  kg: number;
  lb: number;
}

export interface FirstStage {
  thrust_sea_level: ThrustSeaLevel;
  thrust_vacuum: ThrustVacuum;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec?: number;
}

export interface ThrustSeaLevel {
  kN: number;
  lbf: number;
}

export interface ThrustVacuum {
  kN: number;
  lbf: number;
}

export interface SecondStage {
  thrust: Thrust;
  payloads: Payloads;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec?: number;
}

export interface Thrust {
  kN: number;
  lbf: number;
}

export interface Payloads {
  composite_fairing: CompositeFairing;
  option_1: string;
}

export interface CompositeFairing {
  height: Height2;
  diameter: Diameter2;
}

export interface Height2 {
  meters?: number;
  feet?: number;
}

export interface Diameter2 {
  meters?: number;
  feet?: number;
}

export interface Engines {
  isp: Isp;
  thrust_sea_level: ThrustSeaLevel2;
  thrust_vacuum: ThrustVacuum2;
  number: number;
  type: string;
  version: string;
  layout?: string;
  engine_loss_max?: number;
  propellant_1: string;
  propellant_2: string;
  thrust_to_weight: number;
}

export interface Isp {
  sea_level: number;
  vacuum: number;
}

export interface ThrustSeaLevel2 {
  kN: number;
  lbf: number;
}

export interface ThrustVacuum2 {
  kN: number;
  lbf: number;
}

export interface LandingLegs {
  number: number;
  material?: string;
}

export interface PayloadWeight {
  id: string;
  name: string;
  kg: number;
  lb: number;
}
