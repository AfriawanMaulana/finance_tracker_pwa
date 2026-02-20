// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { SESSION_COOKIE } from "./lib/auth/utils";

// // This function can be marked `async` if using `await` inside
// export function proxy(request: NextRequest) {
//   const sessionCookie = request.cookies.get(SESSION_COOKIE);
//   const pathname = request.nextUrl.pathname;

//   const authRoutes = ["/login", "/signup"];
//   const isAuthRoutes = authRoutes.includes(pathname);

//   if (!sessionCookie && !isAuthRoutes) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (sessionCookie && authRoutes) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/",
//     "/login",
//     "/signup",
//     "/milestones/:path*",
//     "/add",
//     "/stats",
//     "/profile",
//   ],
// };
