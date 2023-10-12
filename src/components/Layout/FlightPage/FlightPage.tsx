import React, { use } from "react";

import { Launch } from "@/domain/Models/LaunchesModels/LaunchesInterfaces";
import { LAUNCHES_ENDPOINT } from "@/domain/endpoints/spaceEndpoints";
import { serverFetching } from "@/hooks/serverFetching";

interface Props {
  id: string;
}

export function FlightPage({ id }: Props) {
  const flight = use(serverFetching(`${LAUNCHES_ENDPOINT}/${id}`)) as Launch;
  return (
    <main>
      <h1>{flight.name}</h1>
      <p>Crew</p>
      <p>{JSON.stringify(flight.crew)}</p>
      <p>Rocket</p>
      <p>{JSON.stringify(flight.rocket)}</p>
    </main>
  );
}
