import Link from "next/link";
import React from "react";

interface Props {
  onAcceptCookies: () => void;
}

export function CookiesBanner({ onAcceptCookies }: Props) {
  return (
    <section className="w-full z-40 glassEffect absolute bottom-0 left-0 p-4">
      <h4>Cookies</h4>
      <p>This page uses cookies for login services</p>
      <div className="flex gap-8">
        <button onClick={() => onAcceptCookies()}>Accept</button>
        <Link className=" secondaryButton " href={"/"}>
          Refuse
        </Link>
      </div>
    </section>
  );
}
