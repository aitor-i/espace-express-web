import { Capsules } from "@/domain/Models/LaunchesModels/CapsuleInterface";
import { Launch } from "@/domain/Models/LaunchesModels/LaunchesInterfaces";
import React from "react";

interface Prop {
  flight: Launch;
  capsules: Capsules;
}

export const FlightInfo = ({ flight, capsules }: Prop) => {
  return (
    <div>
      <h2>Flight info</h2>
      <p>Flight number: {flight.flight_number}</p>
      <p>Capsules: {capsules.length}</p>
      {capsules.map((capsule) => (
        <div key={capsule.id}>
          <p>Capsule serial number:{capsule.serial}</p>
          <p> Landings: {capsule.land_landings}</p>
        </div>
      ))}
    </div>
  );
};
