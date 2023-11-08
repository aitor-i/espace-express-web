"use client";
import { IFetchParams, useFetch } from "@/hooks/useFetch";
import { redirect } from "next/navigation";

interface LoginResponse {
  message: string;
  token?: string;
  username: string;
}

export function useLoginPage() {
  const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;

  const { fetcher, fetchingStatus, response, rowResponse } =
    useFetch<LoginResponse>();

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

  return { rowResponse, response, submitHandler, fetchingStatus };
}
