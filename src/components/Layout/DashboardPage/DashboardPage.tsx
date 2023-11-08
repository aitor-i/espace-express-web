"use client";
import Navigation from "@/components/Navigation/Navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import BgImage from "@/../public/img/mart-2.jpeg";
import { IFetchParams, useFetch } from "@/hooks/useFetch";
import { redirect } from "next/navigation";
import { ChangePassword } from "./ChangePassword/ChangePassword";
import { ReserveSeatForm } from "../SelectSeatPage/ReserveSeatForm/ReserveSeatForm";
import { ReservedSeats } from "./ReservedSeats/ReservedSeats";
interface Props {
  username: string;
}

interface ValidateResponse {
  message: string;
  isValid: boolean;
}
export default function DashboardPage({ username }: Props) {
  const { fetcher, fetchingStatus, response, rowResponse } =
    useFetch<ValidateResponse>();

  if (
    fetchingStatus === "failed" ||
    (fetchingStatus === "succeeded" && response?.isValid === false)
  ) {
    logOut();
  }

  useEffect(() => {
    validateToken();
  }, []);
  const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
  async function validateToken() {
    const token = window.localStorage.getItem("token");
    const body = { token };
    const validateSettings: IFetchParams = {
      method: "POST",
      url: `${baseUrl}/api/space-express/auth/validate-token`,
      body,
      headers: { "Content-Type": "application/json" },
    };
    await fetcher(validateSettings);
  }

  function logOut() {
    window.localStorage.setItem("token", "");
    redirect("/login");
  }

  console.log(fetchingStatus);
  return (
    <main className="flex flex-col">
      <h2>{username.replace("%20", " ")}</h2>
      <div className="absolute top-4 right-14">
        <Navigation />
      </div>
      <Image
        className="absolute -z-10 image top-0 left-0 "
        src={BgImage}
        alt=""
      />
      <section className="glassEffectDark flex-1 overflow-y-scroll p-2 rounded-md">
        <ChangePassword />
        <ReservedSeats />
      </section>
    </main>
  );
}
