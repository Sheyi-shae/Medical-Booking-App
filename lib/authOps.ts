import NextAuth, { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { compare } from "bcryptjs";

import prismaClient from "./db";
// import { UserRole } from "@prisma/client";
export const authOptions: AuthOptions={
  adapter: PrismaAdapter(prismaClient),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jb@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Authorize function recieved credentials:", credentials);
          // Check if user credentials are they are Not empty
          if (!credentials?.email || !credentials?.password) {
            throw { error: "No Inputs Found", status: 401 };
          }
          console.log("Passed Check 1 ");
          //Check if user exists
          const existingUser = await prismaClient.user.findUnique({
            where: { email: credentials.email },
          });
          if (!existingUser) {
            console.log("No user found");
            throw { error: "No user found", status: 401 };
          }

          console.log("Passed Check 2");

          //Check if Password is correct
          
          const passwordMatch = await compare(
            credentials.password,
            existingUser.password
          );
          if (!passwordMatch) {
            console.log("Password incorrect");
            throw { error: "Password Incorrect", status: 401 };
          }
          console.log("Pass 3 Checked");
          const user = {
            id: existingUser.id,
           firstName: existingUser.firstName,
           lastName: existingUser.lastName,
            email: existingUser.email,
            role: existingUser.role,
            imageUrl: existingUser.imageUrl,
            isVerified:existingUser.isVerified, 
            adminVerified: existingUser.adminVerified,
          };
          //
          console.log("User Compiled");
          // console.log(user);
          return user;
        } catch (error) {
          console.log("aLL Failed");
          console.log(error);
          throw { error: "Something went wrong", status: 401 };
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        console.log(`token:${token} in session`);
        session.user.id = token.id as string;
        session.user.firstName= token.firstName as string;
        session.user.lastName= token.lastName as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.imageUrl = token.imageUrl as string;
        session.user.isVerified=token.isVerified as boolean;
        session.user.adminVerified=token.adminVerified as boolean
      }
      console.log(`session:${session.user}`);
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.firstName=user.firstName;
         token.lastName=user.lastName;
        token.email = user.email;
        token.role = user.role;
         token.imageUrl= user.imageUrl;
        token.isVerified=user.isVerified; 
        token.adminVerified=user.adminVerified;
      }
      console.log(`token:${token}`);
      return token;
    },
  },
};