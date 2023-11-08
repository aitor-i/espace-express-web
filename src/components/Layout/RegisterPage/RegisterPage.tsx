import React, { useState } from "react";

import Image from "next/image";
import Earth from "@/../public/img/mart-3.jpeg";
import Navigation from "@/components/Navigation/Navigation";
import Toast from "@/components/Toast/Toast";
import { useRegisterPage } from "./useRegisterPage";

export const RegisterPage = () => {
  const { response, fetchingStatus, rowResponse, submitHandler, message } =
    useRegisterPage();
  return (
    <main className="flex justify-center items-center">
      {!rowResponse?.ok && fetchingStatus === "succeeded" ? (
        <Toast>{response?.message}</Toast>
      ) : null}
      {fetchingStatus === "failed" ? (
        <Toast className="error">Error on register!!</Toast>
      ) : null}

      <div className="absolute top-4 right-14">
        <Navigation />
      </div>
      <Image
        className="absolute -z-10 image w-screen "
        src={Earth}
        alt=""
        placeholder="blur"
      />
      <div className="p-8 pt-4 w-96 glassEffect rounded-sm">
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

          {fetchingStatus === "loading" ? (
            <span className="loader" />
          ) : (
            <button className="primaryButton">Send</button>
          )}
        </form>
      </div>
    </main>
  );
};
