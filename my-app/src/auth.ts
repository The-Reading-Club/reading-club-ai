import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import Google from "next-auth/providers/google";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";

import { getUserByEmail } from "@/data/user";
import { account_account_type as DBAccountType } from "@prisma/client";
import { getProviderAccountByUserId } from "./data/provider-account";
import { decodeJWT, devAlert } from "./lib/utils";

type ExtendedUser = DefaultSession["user"] & {
  accountType: string;
  // refresh_token: string;
};

declare module "next-auth" {
  interface Session {
    // for me an account is a user... but for this thing...
    user: ExtendedUser;
    token: {
      // accountType: string;
      // refresh_token: string; // security bad practice
      id_token: string;
    };
    // error: string | undefined | null;
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
    async signIn(signInParams) {
      console.log("auth.ts SIGN IN CALLBACK");

      // if (signInParams.account && !signInParams.account.refresh_token) {
      //   return false;
      //   // I wond do it here
      //   // session.
      //   // await signOut();
      //   // https://chat.openai.com/c/f8ac70fc-9398-4f33-b2f4-7d9af02b5d4d
      //   // return null;
      //   // session.error = "Session invalid";
      // }

      return true; // testing for now
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
      const { session } = sessionParams;
      // session.error;

      let token_: any;
      if ("token" in sessionParams) token_ = sessionParams.token;
      if (!token_) return sessionParams.session;

      if (token_.accountType && session.user) {
        session.user.accountType = token_.accountType as DBAccountType;

        const decodedToken = decodeJWT(token_.id_token);
        // console.log("auth.ts ");
        // console.log({ decodedToken });

        // if (decodedToken) {
        //   session.user.email = decodedToken.email;
        //   session.user.name = decodedToken.name;
        //   session.user.image = decodedToken.picture;
        // }

        session.user.id = decodedToken.sub;
      }

      // console.log("WHAT DO WE HAVE ALREADY?", session.user);
      // // Feels like dangerous code
      // if (session.user.email) {
      //   const fetchedUserInfo = await getUserByEmail(session.user.email);
      //   if (fetchedUserInfo) session.user.id = fetchedUserInfo.id;
      // }

      // if (session.user) {
      //   // session.user.name = token_.name;
      //   // session.user.email = token_.email;
      //   // session.user.isOauth = token_.is;
      // }

      // console.log({ sessionParams });
      // console.log(session.user);

      // I don't see why not doing this
      // https://github.com/nextauthjs/next-auth/discussions/9120
      // https://github.com/nextauthjs/next-auth/issues/9122
      // Just do ts ignore
      // @ts-ignore
      // session.token = token_; // I don't want to exponse the refresh token
      session.token = { id_token: token_.id_token };
      // DO I REALLY NEED IT? Yes, I do.

      //  // If there's no refresh token, sign out
      if (token_ && !token_.refresh_token) {
        // Throw error and force sign out client side
        // requires good handling of errors on the client
        throw new Error("No refresh token");
        // return {};
        // I wond do it here
        // session.
        // await signOut();
        // https://chat.openai.com/c/f8ac70fc-9398-4f33-b2f4-7d9af02b5d4d
        // return null;
        // session.error = "Session invalid";
      }

      // Asynchronously, update db with token if it's not there
      const fixMissingRefreshToken = async () => {
        const userEmail = session.user.email;
        if (!userEmail) return;

        const existingUser = await getUserByEmail(userEmail);

        if (!existingUser) return;

        console.log("fixing missing refresh token");
        if (token_) {
          console.log("getting provider account by user id");
          const existingAccountProvider = await getProviderAccountByUserId(
            existingUser.id
          );

          // console.log("existingAccountProvider", existingAccountProvider);

          if (
            existingAccountProvider &&
            !existingAccountProvider.refresh_token
          ) {
            await db.account.update({
              where: {
                id: existingAccountProvider.id,
              },
              data: {
                refresh_token: token_.refresh_token,
              },
            });
          }
        } else {
          console.log("no token", token_);
        }
      };
      console.log("about to fix missing refresh token");
      // console.log("token", token_);

      try {
        fixMissingRefreshToken();
      } catch (error) {
        console.error("error fixing missing refresh token", error);
        devAlert("error fixing missing refresh token" + error);
      }

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
