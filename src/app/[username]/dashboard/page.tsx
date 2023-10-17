"use client";

import DashboardPage from "@/components/Layout/DashboardPage/DashboardPage";
import React from "react";

export interface PageParams {
  params: { username: string };
}

export default function page({ params }: PageParams) {
  return <DashboardPage username={params.username} />;
}
