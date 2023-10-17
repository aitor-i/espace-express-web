import Navigation from "@/components/Navigation/Navigation";
import React from "react";
import Image from "next/image";
import BgImage from "@/../public/img/mart-2.jpeg";
interface Props {
  username: string;
}
export default function DashboardPage({ username }: Props) {
  return (
    <main>
      <h2>{username}</h2>
      <div className="absolute top-4 right-14">
        <Navigation />
      </div>
      <Image
        className="absolute -z-10 h-screen w-screen top-0 left-0 "
        src={BgImage}
        alt=""
      />
    </main>
  );
}
