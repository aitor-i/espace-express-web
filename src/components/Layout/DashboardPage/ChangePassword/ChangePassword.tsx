import React, { useState } from "react";
import { useChangePassword } from "./useChangePassword";

export function ChangePassword() {
  const { submitHandler, fetchingStatus, message } = useChangePassword();
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
