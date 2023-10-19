import Navigation from "@/components/Navigation/Navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import BgImage from "@/../public/img/mart-2.jpeg";
import { IFetchParams, useFetch } from "@/hooks/useFetch";
import { redirect } from "next/navigation";
import { ChangePassword } from "./ChangePassword/ChangePassword";
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

  if (fetchingStatus === "succeeded" && response?.isValid === false) {
    logOut();
  }

  useEffect(() => {
    validateToken();
  }, []);

  async function validateToken() {
    const token = window.localStorage.getItem("token");
    const body = { token };
    const validateSettings: IFetchParams = {
      method: "POST",
      url: `http://localhost:4000/api/space-express/auth/validate-token`,
      body,
      headers: { "Content-Type": "application/json" },
    };
    await fetcher(validateSettings);
  }

  function logOut() {
    window.localStorage.setItem("token", "");
    redirect("/login");
  }
  return (
    <main className="flex flex-col">
      <h2>{username.replace("%20", " ")}</h2>
      <div className="absolute top-4 right-14">
        <Navigation />
      </div>
      <Image
        className="absolute -z-10 h-screen w-screen top-0 left-0 "
        src={BgImage}
        alt=""
      />
      <section className="glassEffectDark flex-1 overflow-y-scroll p-2 rounded-md">
        <ChangePassword />
      </section>
    </main>
  );
}
