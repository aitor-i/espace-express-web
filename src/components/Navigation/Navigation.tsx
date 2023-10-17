import Link from "next/link";
import React from "react";

export default function Navigation() {
  return (
    <div className="flex gap-3">
      <Link href="/">Home</Link>
      <Link href="/next-flight">Next flights</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </div>
  );
}
