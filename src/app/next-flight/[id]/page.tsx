import React, { use } from "react";

import { FlightPage } from "@/components/Layout/FlightPage/FlightPage";

export interface PageParams {
  params: { id: string };
}

export default function page({ params }: PageParams) {
  const { id } = params;
  return <FlightPage id={id} />;
}
