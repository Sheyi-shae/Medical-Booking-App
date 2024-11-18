import { PrismaClient } from "@prisma/client";

// Extend the global object to include a `prisma` property of type PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

// Instantiate PrismaClient or use the existing instance
const  prismaClient = globalThis.prisma || new PrismaClient();

// In development mode, attach the PrismaClient instance to the global object to avoid multiple instances
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismaClient;
}

export default prismaClient;
