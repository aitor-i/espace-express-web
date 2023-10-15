import React, { use } from "react";

import { Launch } from "@/domain/Models/LaunchesModels/LaunchesInterfaces";
import {
  CAPSULES_ENDPOINT,
  CREW_ENDPOINT,
  LAUNCHES_ENDPOINT,
  ROCKETS_ENDPOINT,
} from "@/domain/endpoints/spaceEndpoints";
import { serverFetching } from "@/hooks/serverFetching";
import { Rocket } from "@/domain/Models/LaunchesModels/RocketInterfaces";
import { Crews } from "@/domain/Models/LaunchesModels/CrewInterfaces";
import { Capsules } from "@/domain/Models/LaunchesModels/CapsuleInterface";
import Crew from "./Crew/Crew";
import { RocketImages } from "./RocketImages/RocketImages";
import { FlightInfo } from "./FlightInfo/FlightInfo";
import Navigation from "@/components/Navigation/Navigation";

interface Props {
  id: string;
}

export function FlightPage({ id }: Props) {
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

  return (
    <main className="flex gap-8 flex-col">
      <div className="absolute top-4 right-14">
        <Navigation />
      </div>{" "}
      <h1 className="text-6xl">{flight.name}</h1>
      <div className="flex gap-3 flex-col h-100  flex-1">
        <div className="flex-1">
          <RocketImages rocket={rocket} />
        </div>
        <div className="flex justify-between pr-8 pl-8">
          <FlightInfo capsules={capsules} flight={flight} />
          <Crew crews={crews} />
        </div>
      </div>
    </main>
  );
}
