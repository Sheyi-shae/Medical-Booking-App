import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    const token = req.nextauth.token;
    const url = req.nextUrl.clone();
    
     //protected routes based on role access and shared access
     const protectedRoutes = {
      patient: "/patient",
      doctor: "/doctor",
      admin: "/admin",
      video: "/video", // Shared route for all authenticated users
    };
    // Redirect to /signin if the user is unauthenticated and tries to access a protected route
    if (Object.values(protectedRoutes).some((route) => url.pathname.startsWith(route))) {
      if (!token) {
        url.pathname = "/signin";
        return NextResponse.redirect(url);
      }

      // Handle role-specific routing within nested paths
      if (token.role === "patient" && url.pathname.startsWith(protectedRoutes.patient)) {
        return NextResponse.next(); // Allow access to /patient and any sub-routes
      } else if (token.role === "doctor" && url.pathname.startsWith(protectedRoutes.doctor)) {
        return NextResponse.next(); // Allow access to /doctor and any sub-routes
      } else if (token.role === "admin" && url.pathname.startsWith(protectedRoutes.admin)) {
        return NextResponse.next(); // Allow access to /admin and any sub-routes
      }

      // Allow universal access to shared routes (like /video) if authenticated
      if (url.pathname.startsWith(protectedRoutes.video)) {
        return NextResponse.next();
      }
        // If the role doesn't match the accessed route, redirect to role-specific path
        if (token.role === "patient") {
          url.pathname = "/patient";
          return NextResponse.redirect(url);
        } else if (token.role === "doctor") {
          url.pathname = "/doctor";
          return NextResponse.redirect(url);
        } else if (token.role === "admin") {
          url.pathname = "/admin";
          return NextResponse.redirect(url);
        }
      }
  
      return NextResponse.next(); // Allow access to all other routes
    },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/video/:path*", "/patient/:path*", "/doctor/:path*", "/admin/:path*"],
};
