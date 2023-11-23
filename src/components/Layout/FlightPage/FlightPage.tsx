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
import Link from "next/link";
import { useFlightPage } from "./useFlightPage";

interface Props {
  id: string;
}

export function FlightPage({ id }: Props) {
  const { flight, capsules, crews, rocket } = useFlightPage(id);

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
          <Link href={`/select-seat/${flight.id}`}>Buy flying pass</Link>
          <Crew crews={crews} />
        </div>
      </div>
    </main>
  );
}
