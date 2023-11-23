import { Capsules } from "@/domain/Models/LaunchesModels/CapsuleInterface";
import { Crews } from "@/domain/Models/LaunchesModels/CrewInterfaces";
import { Launch } from "@/domain/Models/LaunchesModels/LaunchesInterfaces";
import { Rocket } from "@/domain/Models/LaunchesModels/RocketInterfaces";
import {
  CAPSULES_ENDPOINT,
  CREW_ENDPOINT,
  LAUNCHES_ENDPOINT,
  ROCKETS_ENDPOINT,
} from "@/domain/endpoints/spaceEndpoints";
import { serverFetching } from "@/hooks/serverFetching";
import { use } from "react";

export const useFlightPage = (id: string) => {
  const flight = use(serverFetching(`${LAUNCHES_ENDPOINT}/${id}`)) as Launch;
  const rocket = use(
    serverFetching(`${ROCKETS_ENDPOINT}/${flight.rocket}`)
  ) as Rocket;
  const crews = flight.crew.map((crew) =>
    use(serverFetching(`${CREW_ENDPOINT}/${crew}`))
  ) as Crews;

  const capsules = flight.capsules.map((capsule) => {
    console.log(capsule);
    return use(serverFetching(`${CAPSULES_ENDPOINT}/${capsule}`));
  }) as Capsules;

  return { flight, rocket, capsules, crews };
};
