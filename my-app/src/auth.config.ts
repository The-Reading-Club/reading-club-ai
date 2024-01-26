import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";

import { LoginSchema } from "@/schemas";
import { getAccountByEmail } from "./data/account";

import bcryptjs from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = await LoginSchema.safeParse(credentials);

        // if (!validatedFields.success) {
        //   throw new Error("Invalid login");
        // }
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const account = await getAccountByEmail(email);

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

    Google,
  ],
} satisfies NextAuthConfig;
