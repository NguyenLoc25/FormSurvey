import { NextResponse } from "next/server";

export function checkAuth(req) {
  const userId = req.headers.get("user-id");
  console.log(userId);
  return userId;
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}