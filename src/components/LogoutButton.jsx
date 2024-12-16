"use client"; // Ensure this is a client-side component

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })} // Redirect to home after sign out
      style={{ padding: "10px 20px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px" }}
    >
      Logout
    </button>
  );
}