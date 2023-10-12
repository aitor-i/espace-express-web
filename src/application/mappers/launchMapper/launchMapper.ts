import { Crew } from "@/domain/Models/LaunchesModels/CrewInterfaces";
import { Launches } from "@/domain/Models/LaunchesModels/LaunchesInterfaces";
import {
  Rocket,
  Rockets,
} from "@/domain/Models/LaunchesModels/RocketInterfaces";

interface FormattedLaunch {
  crew: Crew[];
  date: Date;
  name: string;
  rocket: Rocket;
  number: number;
  id: string;
}

export function launchMapper(
  launches: Launches,
  rockets: Rockets,
  crewList: Crew[]
): FormattedLaunch[] {
  const formattedLaunches = launches.map((launch) => {
    const date = new Date(launch.date_local);
    date.setFullYear(date.getFullYear() + 1);

    const rocket = rockets.find((rocket) => rocket.id === launch.rocket);
    const crew = launch.crew.map((crewMember) => {
      return crewList.find((crew) => crew.id == crewMember);
    });

    const formattedLaunch = {
      date,
      name: launch.name,
      rocket,
      number: launch.flight_number,
      crew,
      id: launch.id,
    } as FormattedLaunch;
    return formattedLaunch;
  });

  formattedLaunches.sort((a, b) => a.date.getTime() - b.date.getTime());

  return formattedLaunches as FormattedLaunch[];
}
