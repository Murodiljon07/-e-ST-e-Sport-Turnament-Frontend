// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJWT } from "../lib/jwt";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = ["/auth/login", "/auth/register"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Agar token bo'lmasa va public route bo'lmasa -> login ga
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Token bor bo'lsa, undan role ni o'qish
  let userRole = null;
  if (token) {
    const decoded = decodeJWT(token);
    userRole = decoded?.role || decoded?.Role || null;
  }

  // Agar token bo'lsa va public route bo'lsa -> role asosida redirect
  if (token && isPublicRoute) {
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (userRole === "user") {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }
  }

  // Admin route himoyasi - tokendan olingan role bo'yicha
  if (pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  // User route himoyasi
  if (pathname.startsWith("/user") && userRole !== "user") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
