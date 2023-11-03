"use client";
import { SelectSeatPage } from "@/components/Layout/SelectSeatPage/SelectSeatPage";
import React from "react";
interface Props {
  params: { id: string };
}
export default function page({ params }: Props) {
  const { id } = params;
  return <SelectSeatPage flightId={id} />;
}
