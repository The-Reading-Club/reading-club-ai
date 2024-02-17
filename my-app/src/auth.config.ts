import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";

import bcryptjs from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // https://github.com/nextauthjs/next-auth/discussions/2808
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = await LoginSchema.safeParse(credentials);

        // if (!validatedFields.success) {
        //   throw new Error("Invalid login");
        // }
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const account = await getUserByEmail(email);

          // could have just google account linked, so check for password
          if (!account || !account.password) return null;

          const passwordsMatch = await bcryptjs.compare(
            password,
            account.password
          );

          if (passwordsMatch) return account;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
