"use client";

import { IFetchParams, useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { ReserveSeatForm } from "./ReserveSeatForm/ReserveSeatForm";
import Toast from "@/components/Toast/Toast";
import Navigation from "@/components/Navigation/Navigation";
import Link from "next/link";
import { useSelectSeatPage } from "./useSelectSeatPage";
interface Props {
  flightId: string;
}

export interface Seat {
  flightId: string;
  free: boolean;
  reservationDate: string;
  seatNumber: number;
}

export const SelectSeatPage = ({ flightId }: Props) => {
  const {
    fetchSeatsAvailability,
    rowResponse,
    selectNumberHandler,
    selectedNumber,
    response,
    fetchingStatus,
  } = useSelectSeatPage(flightId);
  return (
    <main>
      {!rowResponse?.ok && response?.message ? (
        <Toast>{response.message}</Toast>
      ) : null}
      <span className="absolute top-4 right-4">
        <Navigation />
      </span>
      {rowResponse?.status !== 403 ? (
        <>
          {" "}
          <h2>Select your seat</h2>
          <p>Flight id: {flightId}</p>
          <div className=" flex justify-between p-24">
            <section className="flex gap-3 flex-wrap w-1/3">
              {fetchingStatus === "succeeded" && rowResponse?.ok
                ? response?.seats.map((seat) =>
                    seat.free ? (
                      <span
                        key={seat.seatNumber}
                        onClick={() => selectNumberHandler(seat.seatNumber)}
                        className="p-4 bg-green-400 w-20 text-center clickable text-white rounded-md "
                      >
                        {seat.seatNumber}
                      </span>
                    ) : (
                      <span
                        key={seat.seatNumber}
                        className="p-4 bg-red-400 w-20 text-center text-white rounded-md"
                      >
                        {seat.seatNumber}
                      </span>
                    )
                  )
                : null}
            </section>
            {selectedNumber ? (
              <ReserveSeatForm
                flightId={flightId}
                selectedNumber={selectedNumber}
                onReservationSuccess={fetchSeatsAvailability}
              />
            ) : null}
          </div>
        </>
      ) : (
        <>
          <h2>You need to be logged</h2>
          <Link href="/login"> Login</Link>
        </>
      )}
    </main>
  );
};
