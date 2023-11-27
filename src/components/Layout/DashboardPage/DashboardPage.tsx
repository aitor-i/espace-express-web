"use client";

import Navigation from "@/components/Navigation/Navigation";
import Image from "next/image";
import BgImage from "@/../public/img/mart-2.jpeg";
import { ChangePassword } from "./ChangePassword/ChangePassword";
import { ReservedSeats } from "./ReservedSeats/ReservedSeats";
import { useDashboardPage } from "./useDasboardPage";
import { FlightChat } from "./FlightChat/FlightChat";
interface Props {
  username: string;
}

export default function DashboardPage({ username }: Props) {
  const {} = useDashboardPage();
  return (
    <main className="flex flex-col h-screen">
      <h2>{username.replace("%20", " ")}</h2>
      <div className="absolute top-4 right-14">
        <Navigation />
      </div>
      <Image
        className="absolute -z-10 image top-0 left-0 "
        src={BgImage}
        alt=""
      />
      <section className="glassEffectDark flex-1 overflow-y-scroll p-2 rounded-md overflow-y-scroll h-5/6">
        <ChangePassword />
        <FlightChat />
        <ReservedSeats />
      </section>
    </main>
  );
}
