import React, { cache, use } from "react";

import Navigation from "@/components/Navigation/Navigation";
import {
  CREW_ENDPOINT,
  LAUNCHES_ENDPOINT,
  ROCKETS_ENDPOINT,
} from "@/domain/endpoints/spaceEndpoints";
import { Launches } from "@/domain/Models/LaunchesModels/LaunchesInterfaces";
import { FlightCard } from "./FlightCard/FlightCard";
import { Rockets } from "@/domain/Models/LaunchesModels/RocketInterfaces";
import { launchMapper } from "@/application/mappers/launchMapper/launchMapper";
import { Crews } from "@/domain/Models/LaunchesModels/CrewInterfaces";

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

export const NextFlightPage = () => {
  const launchesFromApi = use(fetchLaunches()) as Launches;
  const rocketsFromApi = use(fetchRockets()) as Rockets;
  const crewFromApi = use(serverFetching(CREW_ENDPOINT)) as Crews;

  const formattedLaunches = launchMapper(
    launchesFromApi,
    rocketsFromApi,
    crewFromApi
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="absolute top-4 right-14">
        <Navigation />
      </div>
      <h1 className="text-4xl self-start">Next Flights</h1>
      <div className="flex gap-10 flex-wrap ">
        {formattedLaunches &&
          formattedLaunches.map((launch) => (
            <FlightCard
              id={launch.id}
              key={launch.number}
              crew={launch.crew}
              date={launch.date}
              name={launch.name}
              rocket={launch.rocket}
            />
          ))}
      </div>
    </main>
  );
};
