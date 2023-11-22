import { launchMapper } from "@/application/mappers/launchMapper/launchMapper";
import { Crews } from "@/domain/Models/LaunchesModels/CrewInterfaces";
import { Launches } from "@/domain/Models/LaunchesModels/LaunchesInterfaces";
import { Rockets } from "@/domain/Models/LaunchesModels/RocketInterfaces";
import {
  CREW_ENDPOINT,
  LAUNCHES_ENDPOINT,
  ROCKETS_ENDPOINT,
} from "@/domain/endpoints/spaceEndpoints";
import { cache, use } from "react";

export const useNextFlightPage = () => {
  const fetchLaunches = cache(() => {
    const endpoint = new URL(LAUNCHES_ENDPOINT);

    return fetch(endpoint).then((res) => res.json());
  });

  const fetchRockets = cache(() => {
    const endpoint = new URL(ROCKETS_ENDPOINT);

    return fetch(endpoint).then((res) => res.json());
  });

  const serverFetching = cache((url: string) => {
    const endpoint = new URL(url);

    return fetch(endpoint).then((res) => res.json());
  });

  const launchesFromApi = use(fetchLaunches()) as Launches;
  const rocketsFromApi = use(fetchRockets()) as Rockets;
  const crewFromApi = use(serverFetching(CREW_ENDPOINT)) as Crews;

  const formattedLaunches = launchMapper(
    launchesFromApi,
    rocketsFromApi,
    crewFromApi
  );

  return { formattedLaunches };
};
