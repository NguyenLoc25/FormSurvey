import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const protectedRoutes = ["/manage-form", "/account"]; // Các route cần bảo vệ

  // console.log("Token:", token); // Kiểm tra token có được trả về không

  // Kiểm tra các route được bảo vệ
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      // console.error("Token is missing");
      // Nếu token không tồn tại, chuyển hướng đến trang đăng nhập
      const signInUrl = new URL("/api/auth/signin", req.url);
      signInUrl.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  const userId = token?._id;
  // console.log("User ID from token:", userId);

  if (!userId) {
    console.log("User ID is missing in the token:", token);
  }

  // Làm mới token nếu gần hết hạn
  const expiresAt = token?.exp * 1000; // `exp` là thời gian hết hạn (giây)
  const now = Date.now();
  if (expiresAt && expiresAt - now < 5 * 60 * 1000) {
    console.log("Token gần hết hạn, làm mới...");
    // Logic làm mới token nếu cần
  }

  // Thêm `user-id` vào header
  const modifiedRequest = NextResponse.next();
  modifiedRequest.headers.set("user-id", userId || "");
  return modifiedRequest;
}
