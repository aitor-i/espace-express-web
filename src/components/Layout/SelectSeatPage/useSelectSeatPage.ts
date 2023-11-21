import { IFetchParams, useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { Seat } from "./SelectSeatPage";

interface SeatsResponse {
  message: string;
  seats: Seat[];
}

export const useSelectSeatPage = (flightId: string) => {
  const [token, setToken] = useState<string>();
  console.log(token);

  const { fetcher, fetchingStatus, response, rowResponse } =
    useFetch<SeatsResponse>();
  const [selectedNumber, setSelectedNumber] = useState<number>();

  const selectNumberHandler = (seatNumber: number) => {
    setSelectedNumber(seatNumber);
  };

  const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
  const header = new Headers();
  header.append("token", token!);

  const fetchParams = {
    url: `${baseUrl}/api/space-express/select-seat/getSeats/`,
    method: "GET",
    headers: { "Content-Type": "application/json", token: token, id: flightId },
  } as IFetchParams;

  const fetchSeatsAvailability = () => {
    fetcher(fetchParams);
    setSelectedNumber(undefined);
  };

  useEffect(() => {
    setToken(window.localStorage.getItem("token") ?? "  ");
    if (token) fetchSeatsAvailability();
  }, [token]);

  return {
    rowResponse,
    selectNumberHandler,
    selectedNumber,
    fetchSeatsAvailability,
    response,
    fetchingStatus,
  };
};
