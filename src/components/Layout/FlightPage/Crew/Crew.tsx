import { Crews } from "@/domain/Models/LaunchesModels/CrewInterfaces";
import React from "react";
interface Props {
  crews: Crews;
}
export default function Crew({ crews }: Props) {
  return (
    <div className="flex flex-col  gap-2 flex-wrap w-max ">
      <h3>Knew the crew</h3>
      <div className="flex gap-5">
        {crews.map((crew) => (
          <div
            className=" w-max flex flex-col items-center card w-36"
            key={crew.id}
          >
            <p className="text-sm">{crew.name}</p>
            <img className="w-20 rounded-md" src={crew.image} />
          </div>
        ))}
      </div>
    </div>
  );
}
