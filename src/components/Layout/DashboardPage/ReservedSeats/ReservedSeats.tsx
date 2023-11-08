import { IFetchParams, useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { Seat } from "../../SelectSeatPage/SelectSeatPage";
import List from "@/components/List/List";

interface ListSeats extends Seat, Record<string, string | number | boolean> {}
interface ReservedSeatsResponse {
  message: string;
  seats: ListSeats[];
}

const columns = [
  { key: "flightId", header: "Flight Id" },
  { key: "reservationDate", header: "Reservation Date" },
  { key: "seatNumber", header: "Seat Number" },
];

export function ReservedSeats() {
  const { fetcher, fetchingStatus, response, rowResponse } =
    useFetch<ReservedSeatsResponse>();

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
    const token = window.localStorage.getItem("token");

    const fetchParams = {
      url: `${baseUrl}/api/space-express/select-seat/reservedSeatsByEmail`,
      method: "GET",
      headers: { "Content-Type": "application/json", token: token },
      credentials: "include",
    } as IFetchParams;

    fetcher(fetchParams);
  }, []);

  return (
    <div>
      <h3>Your next flights</h3>
      {response?.seats && <List columns={columns} data={response?.seats} />}
    </div>
  );
}
