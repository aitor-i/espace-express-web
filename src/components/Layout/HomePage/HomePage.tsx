import Navigation from "@/components/Navigation/Navigation";
import Image from "next/image";
import React, { Fragment } from "react";

import Earth from "@/../public/img/earth-1.jpeg";

export const HomePage = () => {
  return (
    <div className="h-screen overflow-y-hidden">
      <div className="flex h-full overflow-hidden flex-col items-center justify-between p-24 overflow-y-hidden glassEffect ">
        <div className="absolute top-4 right-14">
          <Navigation />
        </div>
        <h1 className="primary-color text-8xl z-10 font-bold">Space Express</h1>
      </div>
      <Image
        className="absolute -z-10 h-screen w-screen top-40 backgroundImgFit"
        src={Earth}
        alt=""
      />
    </div>
  );
};
