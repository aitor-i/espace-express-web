import Image from "next/image";
import Earth from "@/../public/img/mart-1.jpeg";
import Navigation from "@/components/Navigation/Navigation";
import Toast from "@/components/Toast/Toast";
import { useLoginPage } from "./useLoginPage";

export const LoginPage = () => {
  const { fetchingStatus, response, rowResponse, submitHandler } =
    useLoginPage();
  return (
    <main className="flex justify-center items-center">
      {!rowResponse?.ok && fetchingStatus === "succeeded" ? (
        <Toast>{response?.message}</Toast>
      ) : null}
      <div className="absolute top-4 right-14">
        <Navigation />
      </div>
      <Image className="absolute -z-10 image" src={Earth} alt="" />
      <div className="p-8 w-96 pt-4 glassEffect rounded-sm">
        <h2>Login</h2>
        <form
          onSubmit={submitHandler}
          action=""
          className="flex flex-col gap-8"
        >
          <span className="flex flex-col ">
            <label htmlFor="">Email</label>
            <input type="email" name="email" id="email" />
          </span>
          <span className="flex flex-col ">
            <label htmlFor="">Password</label>
            <input type="password" name="password" id="password" />
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
