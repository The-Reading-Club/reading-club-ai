import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import Google from "next-auth/providers/google";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";

import { getUserByEmail } from "@/data/account";
import { account_account_type as DBAccountType } from "@prisma/client";

type ExtendedUser = DefaultSession["user"] & {
  accountType: string;
};

declare module "next-auth" {
  interface Session {
    // for me an account is a user... but for this thing...
    user: ExtendedUser;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user }) {
      return true; // testing for now
      // console.log("SIGN IN CALLBACK");
      // user.id = Number(user.id);

      // I should probably extend the type because I know email is there
      // if (!user.email) return false;

      // const existingAccount = await getAccountByEmail(user.email);

      // if (!existingAccount || !existingAccount.verified) return false;

      // return true;
    },

    async jwt({ token, account }) {
      // In this case, account is the provider account
      // https://github.com/webdevcody/next-auth-convex/blob/main/src/pages/api/auth/%5B...nextauth%5D.ts
      if (account?.id_token) {
        token.id_token = account.id_token;
      }

      if (account?.refresh_token) {
        token.refresh_token = account.refresh_token;
      }

      // Include account type in token
      if (!token.email) return token;

      const existingUser = await getUserByEmail(token.email);

      if (!existingUser) return token;

      token.accountType = existingUser.account_type;

      return token;

      // token.customField = "customValue";
      // console.log({ token });
      // return token;
    },
    // jwt: ({ token, account }) => {
    //   if (account?.id_token) {
    //     token.id_token = account.id_token;
    //   }

    //   if (account?.refresh_token) {
    //     token.refresh_token = account.refresh_token;
    //   }

    //   return token;
    // },
    async session(sessionParams) {
      let token_;
      if ("token" in sessionParams) token_ = sessionParams.token;
      if (!token_) return sessionParams.session;

      const { session } = sessionParams;

      if (token_.accountType && session.user) {
        session.user.accountType = token_.accountType as DBAccountType;
      }

      // console.log("WHAT DO WE HAVE ALREADY?", session.user);
      // // Feels like dangerous code
      // if (session.user.email) {
      //   const fetchedUserInfo = await getUserByEmail(session.user.email);
      //   if (fetchedUserInfo) session.user.id = fetchedUserInfo.id;
      // }

      console.log({ sessionParams });

      return sessionParams.session;

      // const { session } = sessionParams;
      // // https://chat.openai.com/c/1db002f1-1c7a-4d87-8968-b1495331f73b
      // // Check if the 'token' property exists
      // if ("token" in sessionParams) {
      //   const { token } = sessionParams;
      //   if (session.user) {
      //     session.user.customField = token.customField;
      //   }
      //   console.log({
      //     sessionToken: sessionParams.token,
      //     session: sessionParams.session,
      //     // INTERESTING THAT THIS IS THE DEFAULT FORMAT OF A SESSION
      //     // It opinionatedly includes "name" "email" and "image" even though we don't have all fields in our database
      //     // session: {
      //     //   user: {
      //     //     name: undefined,
      //     //     email: 'testagain@example.com',
      //     //     image: undefined,
      //     //     customField: undefined
      //     //   },
      //     //   expires: '2024-02-26T03:51:05.490Z'
      //     // }
      //   });
      // } else {
      //   // Handle the case where 'token' does not exist
      //   console.log("Token not available, user object is present instead.");
      // }
      // return sessionParams.session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
