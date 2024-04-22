import { auth } from "@/auth";
import {
  getProviderAccountByIdToken,
  getProviderAccountByUserId,
} from "@/data/provider-account";
import { decodeJWT } from "@/lib/utils";

// que curiosa esta mierda
// https://authjs.dev/guides/basics/refresh-token-rotation
import { type TokenSet } from "@auth/core/types";
import { signOut } from "next-auth/react";
import { NextResponse } from "next/server";
import { fetchNewTokenSetResponse, getRefreshToken } from "./utils";
import { encodeToJWT } from "@/lib/utils-jwt";

export async function GET(req: Request) {
  // Example of a refreshed hardcoded mock ID token

  // interface Payload {
  //   iss: string;
  //   azp: string;
  //   aud: string;
  //   sub: string;
  //   email: string;
  //   email_verified: boolean;
  //   at_hash: string;
  //   name: string;
  //   picture: string;
  //   given_name: string;
  //   family_name: string;
  //   iat: number;
  //   exp: number;
  // }

  // fill out based on payload format above

  const testPayload = {
    iss: "https://accounts.readingclub.ai",
    azp: "7890123456-trcapplication.apps.readingclub.ai",
    aud: "7890123456-trcapplication.apps.readingclub.ai",
    sub: "cluak7and0000pfoulimrjo44",
    email: "harry.potter@example.com",
    email_verified: true,
    at_hash: "exampleHashValue",
    name: "Harry Potter",
    picture: "https://example.com/picture.jpg",
    given_name: "Harry",
    family_name: "Potter",
    iat: Math.floor(Date.now() / 1000),
    // Setting the expiration to a date far in the future (e.g., year 9999)
    exp: new Date("9999-12-31").getTime() / 1000,
  };

  // console.log("private key", process.env.JWT_SECRET);
  const jwt = encodeToJWT(testPayload);

  // const refreshedMockIdToken =
  //   "eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJuYW1lIjogIkhhcnJ5IFBvdHRlciIsICJlbWFpbCI6ICJoYXJyeS5wb3R0ZXJAZXhhbXBsZS5jb20iLCAicGljdHVyZSI6ICJodHRwczovL2V4YW1wbGUuY29tL2hhcnJ5LmpwZyIsICJzdWIiOiAiY2x1YWs3YW5kMDAwMHBmb3VsaW1yam80NCIsICJwcm92aWRlciI6ICJjcmVkZW50aWFscyIsICJhY2NvdW50VHlwZSI6ICJzdGFuZGFyZCIsICJiaW8iOiAiSnVzdCBhIHdpemFyZCBsaXZpbmcgaW4gdGhlIG11Z2dsZSB3b3JsZCIsICJpYXQiOiAxNzExNTk0NjczLCAiZXhwIjogMTcxNDE4NjY3MywgImp0aSI6ICJjYmZlODAwNi1hYWNiLTQyNjgtODk4OC0zZGJiN2VmZmFiOTkiLCAiYXVkIjogInlvdXJBcHBDbGllbnRJZEhlcmUiLCAiaXNzIjogImh0dHBzOi8veW91cmF1dGhzZXJ2ZXIuZXhhbXBsZS5jb20iLCAiYXRfaGFzaCI6ICJzYW1wbGVBdEhhc2hIZXJlIiwgImVtYWlsX3ZlcmlmaWVkIjogdHJ1ZSwgImxvY2FsZSI6ICJlbiIsICJnaXZlbl9uYW1lIjogIkhhcnJ5IiwgImZhbWlseV9uYW1lIjogIlBvdHRlciJ9.signature";

  console.log("Test JWT", jwt);

  // return NextResponse.json({ id_token: jwt });
  return NextResponse.json(jwt);

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
  // Here you could refresh countless shit in the database if you need to

  // #region replaced by getRefreshToken

  // const userOauthId = decoded.sub;

  // const providerAccount = await getProviderAccountByUserId(userOauthId);

  // console.log(
  //   "THIS IS THE PROVIDER ACCOUNT IN REFRESH ROUTE providerAccount",
  //   providerAccount
  // );

  // const refreshToken = providerAccount?.refresh_token;

  // console.log(
  //   "THIS IS THE REFRESH TOKEN IN REFRESH ROUTE refreshToken",
  //   refreshToken
  // );

  //#endregion

  const refreshToken = await getRefreshToken(decoded.sub);

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
    const response = await fetchNewTokenSetResponse(refreshToken);

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
      ">>>> THIS IS THE TOKENS RETURNED IN REFRESH ROUTE tokens.id_token",
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

// function decodeJWT(token: string) {
//   const base64Url = token.split(".")[1]; // Get payload
//   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Convert Base64Url to Base64
//   const jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split("")
//       .map(function (c) {
//         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join("")
//   );

//   return JSON.parse(jsonPayload);
// }

// https://chat.openai.com/c/f8ac70fc-9398-4f33-b2f4-7d9af02b5d4d
