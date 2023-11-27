import { IFetchParams, useFetch } from "@/hooks/useFetch";
import { redirect } from "next/navigation";
import { useEffect } from "react";
interface ValidateResponse {
  message: string;
  isValid: boolean;
}

export const useDashboardPage = () => {
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

  return {};
};
