"use client"; // Ensure this is a client-side component

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })} // Redirect to home after sign out
      className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-red-500 text-white font-semibold rounded-lg shadow-md transition-all duration-500 ease-in-out hover:from-red-500 hover:to-red-600 mt-4"
    >
      Logout
    </button>
  );
}
