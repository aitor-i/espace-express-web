import React, { cache, use } from "react";

import Navigation from "@/components/Navigation/Navigation";
import { LAUNCHES_ENDPOINT } from "@/domain/endpoints/spaceEndpoints";
import { Launches } from "@/domain/Models/LaunchesModels/LaunchesInterfaces";

const fetchLaunches = cache(() => {
  const endpoint = new URL(LAUNCHES_ENDPOINT);

  return fetch(endpoint).then((res) => res.json());
});

export const NextFlightPage = () => {
  const launchesFromApi = use(fetchLaunches()) as Launches;
  const dateShortedLaunches = launchesFromApi.sort(
    (a, b) =>
      new Date(b.date_local).getTime() - new Date(a.date_local).getTime()
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="absolute top-4 right-14">
        <Navigation />
      </div>
      <h1 className="text-4xl self-start">Next Flights</h1>
      <div>
        {launchesFromApi &&
          dateShortedLaunches.map((launch) => (
            <p key={launch.flight_number}>
              Crew: {JSON.stringify(launch.date_local)} for flight:{" "}
              {launch.name}
            </p>
          ))}
      </div>
    </main>
  );
};
