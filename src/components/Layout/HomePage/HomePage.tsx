import Navigation from "@/components/Navigation/Navigation";
import React from "react";

export const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="absolute top-4 right-14">
        <Navigation />
      </div>
      <h1 className="primary-color text-7xl">Space Express</h1>
    </main>
  );
};
