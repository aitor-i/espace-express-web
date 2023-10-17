import React from "react";

import Image from "next/image";
import Earth from "@/../public/img/mart-3.jpeg";
import Navigation from "@/components/Navigation/Navigation";
import { IFetchParams, useFetch } from "@/hooks/useFetch";

export const RegisterPage = () => {
  const { fetcher, fetchingStatus, response } = useFetch();
  console.log(process.env);
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const rePassword = formData.get("confirm-password");
    const username = formData.get("username");

    const fetchParams = {
      url: "http://localhost:4000/api/space-express/auth/register",
      body: { email, password, username },
      method: "POST",
      headers: { "Content-Type": "application/json" },
    } as IFetchParams;

    fetcher(fetchParams);
    console.log("Response", response);
  };

  return (
    <main className="flex justify-center items-center">
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
          </span>
          <button className="primaryButton">Send</button>
        </form>
      </div>
    </main>
  );
};
