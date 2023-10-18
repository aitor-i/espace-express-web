import React, { useState } from "react";

import Image from "next/image";
import Earth from "@/../public/img/mart-3.jpeg";
import Navigation from "@/components/Navigation/Navigation";
import { IFetchParams, useFetch } from "@/hooks/useFetch";
import Toast from "@/components/Toast/Toast";
import { redirect } from "next/navigation";
interface RegisterResponse {
  message: string;
  token?: string;
  username: string;
}

export const RegisterPage = () => {
  const { fetcher, fetchingStatus, response, rowResponse } =
    useFetch<RegisterResponse>();
  const [message, setMessage] = useState<string>();

  console.log(process.env);
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const rePassword = formData.get("confirm-password");
    const username = formData.get("username");

    if (password !== rePassword) {
      setMessage("Password should match!");
      formData.set("password", "");
      formData.set("confirm-password", "");

      return;
    }

    const fetchParams = {
      url: "http://localhost:4000/api/space-express/auth/register",
      body: { email, password, username },
      method: "POST",
      headers: { "Content-Type": "application/json" },
    } as IFetchParams;

    fetcher(fetchParams);
    if (response?.token) window.localStorage.setItem("token", response?.token);
  };

  if (fetchingStatus === "succeeded" && rowResponse?.ok)
    redirect(`/${response?.username}/dashboard`);

  return (
    <main className="flex justify-center items-center">
      {!rowResponse?.ok && fetchingStatus === "succeeded" ? (
        <Toast>{response?.message}</Toast>
      ) : null}
      <div className="absolute top-4 right-14">
        <Navigation />
      </div>
      <Image className="absolute -z-10 h-screen w-screen " src={Earth} alt="" />
      <div className="p-16 pt-4 glassEffect rounded-sm">
        <h2>Register</h2>
        <form
          onSubmit={submitHandler}
          action=""
          className="flex flex-col gap-8"
        >
          <span className="flex flex-col">
            <label htmlFor="">Email</label>
            <input type="email" name="email" id="email" />
          </span>
          <span className="flex flex-col ">
            <label htmlFor="">Username</label>
            <input type="username" name="username" id="username" />
          </span>
          <span className="flex flex-col ">
            <label htmlFor="">Password</label>
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

          <button className="primaryButton">Send</button>
        </form>
      </div>
    </main>
  );
};
