import Navigation from "@/components/Navigation/Navigation";

import { FlightCard } from "./FlightCard/FlightCard";
import { useNextFlightPage } from "./useNextFlightPage";

export const NextFlightPage = () => {
  const { formattedLaunches } = useNextFlightPage();

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
