import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        imageUrl?: string;
        isVerified?: boolean;
        adminVerified?: boolean;
      };
    }
}

declare module "next/server" {
  interface NextRequest {
    nextauth: {
      token: JWT | null;
    };
  }
}