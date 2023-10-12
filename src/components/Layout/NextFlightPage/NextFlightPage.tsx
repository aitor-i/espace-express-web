import Navigation from "@/components/Navigation/Navigation";
import React from "react";

export const NextFlightPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="absolute top-4 right-14">
        <Navigation />
      </div>
      <h1 className="text-4xl self-start">Next Flights</h1>
    </main>
  );
};
