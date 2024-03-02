import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// https://chat.openai.com/c/94709f44-ad64-4193-9845-ff76647f1869
export const db =
  globalThis.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
