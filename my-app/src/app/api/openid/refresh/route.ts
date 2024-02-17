import { auth } from "@/auth";
import {
  getProviderAccountByIdToken,
  getProviderAccountByUserId,
} from "@/data/provider-account";

// que curiosa esta mierda
// https://authjs.dev/guides/basics/refresh-token-rotation
import { type TokenSet } from "@auth/core/types";
import { signOut } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();

  console.log("session", session);
  // the idea is to figure out what this session is giving me
  // hopefully the damn token
  //   throw new Error("Not implemented — THIS WILL BLOW UP REFRESH ROUTE");

  const token = session?.token;

  console.log("THIS IS THE TOKEN IN REFRESH ROUTE token", token);

  //   if (!session || !session.user || !session.user.id) {
  if (!session || !token || !token.id_token) {
    // return new NextResponse("no user", { status: 400 });

    console.log("NO ID TOKEN", session);

    // console.log("INITIATE SIGN OUT TOKEN ROUTE 1");
    // await signOut();

    return NextResponse.json(null);
  }

  const id_token = token.id_token;

  console.log("THIS IS THE ID TOKEN IN REFRESH ROUTE id_token", id_token);

  // Use the function
  //   const idToken = "YOUR.ID.TOKEN.HERE";
  const decoded = decodeJWT(id_token);
  console.log("DECODED ID TOKEN", decoded);

  const userOauthId = decoded.sub;

  const providerAccount = await getProviderAccountByUserId(userOauthId);

  console.log(
    "THIS IS THE PROVIDER ACCOUNT IN REFRESH ROUTE providerAccount",
    providerAccount
  );

  const refreshToken = providerAccount?.refresh_token;

  console.log(
    "THIS IS THE REFRESH TOKEN IN REFRESH ROUTE refreshToken",
    refreshToken
  );

  if (!refreshToken) {
    // return new NextResponse("no refresh token", { status: 400 });

    // console.log("INITIATE SIGN OUT REFRESH ROUTE 2");
    // await signOut();
    return NextResponse.json(null);
  }

  //   // chapus...
  //   const googleProvider = await db.account.findFirst({
  //     where: {
  //       userId: currentUser.id,
  //       provider: "google",
  //     },
  //   });
  //   console.log("googleProvider", googleProvider);
  //   if (!googleProvider?.refresh_token) {
  //     console.log("Is there a refresh token in current user", currentUser);
  //     // db.account.update({
  //     //   where: {
  //     //     id: googleProvider?.id,
  //     //   },
  //     //   data: {
  //     //     refresh_token:
  //     //   },
  //     // });
  //   }

  if (token) {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        // refresh_token: token.refresh_token,
        refresh_token: refreshToken,
      }),
      method: "POST",
    });

    const tokens = (await response.json()) as TokenSet;

    if (!response.ok) {
      //   console.log("INITIATE SIGN OUT REFRESH ROUTE 3");
      //   await signOut();

      return new NextResponse("error refreshing id token", { status: 500 });
    }

    // return new NextResponse(JSON.stringify(tokens), {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    console.log("THIS IS THE TOKENS IN REFRESH ROUTE tokens", tokens);
    console.log(
      "THIS IS THE TOKENS IN REFRESH ROUTE tokens.id_token",
      tokens.id_token
    );

    // I should probably update the database with the new id token...

    return NextResponse.json(tokens.id_token);
  } else {
    // console.log("INITIATE SIGN OUT REFRESH ROUTE 4");
    // await signOut();

    // return new NextResponse("no token", { status: 400 });
    return NextResponse.json(null);
  }
}

function decodeJWT(token: string) {
  const base64Url = token.split(".")[1]; // Get payload
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Convert Base64Url to Base64
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// https://chat.openai.com/c/f8ac70fc-9398-4f33-b2f4-7d9af02b5d4d
