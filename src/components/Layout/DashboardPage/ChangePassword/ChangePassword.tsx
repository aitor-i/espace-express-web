import { IFetchParams, useFetch } from "@/hooks/useFetch";
import { redirect } from "next/navigation";
import React, { useState } from "react";

interface ChangePasswordResponse {
  message: string;
  isSuccess: boolean;
}

export function ChangePassword() {
  const { fetcher, fetchingStatus, response, rowResponse } =
    useFetch<ChangePasswordResponse>();
  const [message, setMessage] = useState<string>();
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const oldPassword = formData.get("old-password");
    const email = formData.get("email");
    const password = formData.get("password");
    const rePassword = formData.get("confirm-password");

    if (password !== rePassword) {
      setMessage("Password should match!");
      formData.set("password", "");
      formData.set("confirm-password", "");

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
  return (
    <section className="flex flex-col w-80">
      <h4>Change password</h4>
      <form onSubmit={submitHandler} action="" className="flex flex-col gap-8">
        <span className="flex flex-col">
          <label htmlFor="">Email</label>
          <input type="email" name="email" id="email" />
        </span>
        <span className="flex flex-col ">
          <label htmlFor="">Current Password</label>
          <input type="password" name="old-password" id="old-password" />
        </span>

        <span className="flex flex-col ">
          <label htmlFor="">New Password</label>
          <input type="password" name="password" id="password" />
        </span>
        <span className="flex flex-col ">
          <label htmlFor="">Confirm password</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
          />
          {message ? <p className="text-red-500 text-xs">{message}</p> : null}
        </span>

        {fetchingStatus === "loading" ? (
          <span className="loader" />
        ) : (
          <button className="primaryButton">Send</button>
        )}
      </form>
    </section>
  );
}
