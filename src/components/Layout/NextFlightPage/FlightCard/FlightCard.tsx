import { Crew } from "@/domain/Models/LaunchesModels/CrewInterfaces";
import { Rocket } from "@/domain/Models/LaunchesModels/RocketInterfaces";
import Link from "next/link";
import React from "react";

interface Props {
  id: string;
  crew: Crew[];
  date: Date;
  name: string;
  rocket: Rocket;
}

export const FlightCard = ({ crew, date, name, rocket, id }: Props) => {
  return (
    <Link
      href={`next-flight/${id}`}
      className="card flex flex-col w-80 cursor-pointer"
    >
      <h3 className="text-2xl text-ellipsis">{name}</h3>
      <div className="flex gap-2">
        <i>{date.getFullYear()}</i>
        <p>{date.getMonth()}</p>
        <p>{date.getDay()}</p>
      </div>
      <b>{rocket.name}</b>

      {crew.length === 0 ? (
        <i>No crew for this trip</i>
      ) : (
        crew.map((crewMember) => <p key={crewMember.id}>{crewMember.name}</p>)
      )}
    </Link>
  );
};
