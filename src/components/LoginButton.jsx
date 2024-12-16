"use client";
import { signIn } from "next-auth/react";

export default function LoginButton() {
 return<button
        onClick={() => signIn("google")} // Trigger Google SignIn
      >
        Sign in with Google
      </button>
}