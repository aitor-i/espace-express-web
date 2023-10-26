import { passwordValidation } from "@/application/passwordValidation/passwordValidation";
import { IFetchParams, useFetch } from "@/hooks/useFetch";
import { redirect } from "next/navigation";
import { useState } from "react";

interface ChangePasswordResponse {
  message: string;
  isSuccess: boolean;
}

export function useChangePassword() {
  const { fetcher, fetchingStatus, response, rowResponse } =
    useFetch<ChangePasswordResponse>();
  const [message, setMessage] = useState<string>();
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const oldPassword = formData.get("old-password");
    const email = formData.get("email");
    const password = formData.get("password") ?? "";
    const rePassword = formData.get("confirm-password");

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
      url: `${baseUrl}/api/space-express/auth/change-password`,
      body: { email, newPassword: password, oldPassword },
      method: "POST",
      headers: { "Content-Type": "application/json" },
    } as IFetchParams;

    fetcher(fetchParams);
  }
  if (fetchingStatus === "succeeded" && response?.isSuccess) redirect("/login");

  return { submitHandler, message, fetchingStatus };
}
