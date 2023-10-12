export type Crews = Crew[];

export interface Crew {
  name: string;
  agency: string;
  image: string;
  wikipedia: string;
  launches: string[];
  status: string;
  id: string;
}
