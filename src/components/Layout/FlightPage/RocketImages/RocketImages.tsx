import { Rocket } from "@/domain/Models/LaunchesModels/RocketInterfaces";
import React from "react";

interface Props {
  rocket: Rocket;
}

export const RocketImages = ({ rocket }: Props) => {
  return (
    <div className="flex gap-1 overflow-x-auto">
      {rocket.flickr_images.map((image) => (
        <img key={image} className="w-4/6 rounded" src={image} />
      ))}
    </div>
  );
};
