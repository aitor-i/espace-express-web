"use client";
import { IFetchParams, useFetch } from "@/hooks/useFetch";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface LoginResponse {
  message: string;
  token?: string;
  username: string;
}

export function useLoginPage() {
  const [isCookiesAccepted, setIsCookiesAccepted] = useState(false);

  const { fetcher, fetchingStatus, response, rowResponse } =
    useFetch<LoginResponse>();
  const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const fetchParams = {
      url: `${baseUrl}/api/space-express/auth/login`,
      body: { email, password },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    } as IFetchParams;

    fetcher(fetchParams);
  };

  if (rowResponse?.ok && fetchingStatus === "succeeded") {
    window.localStorage.setItem("token", response?.token ?? "");
    redirect(`/${response?.username}/dashboard`);
  }

  const acceptCookiesHandler = () => {
    console.log(isCookiesAccepted);
    window.localStorage.setItem("cookiesAccepted", "true");
    setIsCookiesAccepted(true);
  };

  useEffect(() => {
    if (window.localStorage.getItem("cookiesAccepted") === "true")
      setIsCookiesAccepted(true);
  }, []);

  return {
    rowResponse,
    response,
    submitHandler,
    fetchingStatus,
    acceptCookiesHandler,
    isCookiesAccepted,
  };
}
