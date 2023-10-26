import { passwordValidation } from "@/application/passwordValidation/passwordValidation";
import { IFetchParams, useFetch } from "@/hooks/useFetch";
import { redirect } from "next/navigation";
import { useState } from "react";

interface RegisterResponse {
  message: string;
  token?: string;
  username: string;
}

export function useRegisterPage() {
  const { fetcher, fetchingStatus, response, rowResponse } =
    useFetch<RegisterResponse>();
  const [message, setMessage] = useState<string>();

  console.log(process.env);
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password") ?? "";
    const rePassword = formData.get("confirm-password");
    const username = formData.get("username");

    if (password !== rePassword) {
      setMessage("Password should match!");
      formData.set("password", "");
      formData.set("confirm-password", "");

      return;
    }
    const { valid, message } = passwordValidation(password.toString());
    if (!valid) {
      setMessage(message);

      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;

    const fetchParams = {
      url: `${baseUrl}/api/space-express/auth/register`,
      body: { email, password, username },
      method: "POST",
      headers: { "Content-Type": "application/json" },
    } as IFetchParams;

    fetcher(fetchParams);
    if (response?.token) window.localStorage.setItem("token", response?.token);
  };

  if (fetchingStatus === "succeeded" && rowResponse?.ok)
    redirect(`/${response?.username}/dashboard`);

  return { response, fetchingStatus, rowResponse, submitHandler, message };
}
