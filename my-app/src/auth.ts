import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import Google from "next-auth/providers/google";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
