import { auth } from "@/auth";
import { encodeToJWT } from "@/lib/utils-jwt";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET() {
  // Example of a hardcoded mock ID token
  // const mockIdToken =
  //   "eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJuYW1lIjogIkhhcnJ5IFBvdHRlciIsICJlbWFpbCI6ICJoYXJyeS5wb3R0ZXJAZXhhbXBsZS5jb20iLCAicGljdHVyZSI6ICJodHRwczovL2V4YW1wbGUuY29tL2hhcnJ5LmpwZyIsICJzdWIiOiAiY2x1YWs3YW5kMDAwMHBmb3VsaW1yam80NCIsICJwcm92aWRlciI6ICJjcmVkZW50aWFscyIsICJhY2NvdW50VHlwZSI6ICJzdGFuZGFyZCIsICJiaW8iOiAiSnVzdCBhIHdpemFyZCBsaXZpbmcgaW4gdGhlIG11Z2dsZSB3b3JsZCIsICJpYXQiOiAxNzExNTk0NjczLCAiZXhwIjogMTcxNDE4NjY3MywgImp0aSI6ICJjYmZlODAwNi1hYWNiLTQyNjgtODk4OC0zZGJiN2VmZmFiOTkiLCAiYXVkIjogInlvdXJBcHBDbGllbnRJZEhlcmUiLCAiaXNzIjogImh0dHBzOi8veW91cmF1dGhzZXJ2ZXIuZXhhbXBsZS5jb20iLCAiYXRfaGFzaCI6ICJzYW1wbGVBdEhhc2hIZXJlIiwgImVtYWlsX3ZlcmlmaWVkIjogdHJ1ZSwgImxvY2FsZSI6ICJlbiIsICJnaXZlbl9uYW1lIjogIkhhcnJ5IiwgImZhbWlseV9uYW1lIjogIlBvdHRlciJ9.signature";

  // return NextResponse.json({ id_token: mockIdToken });

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

  console.log("TEST JWT", jwt);
  // return NextResponse.json({ id_token: jwt });
  return NextResponse.json(jwt);

  const session = (await auth()) as Session;

  //   https://github.com/webdevcody/next-auth-convex/blob/main/src/pages/api/openid/token.ts

  console.log("ABOUT TO LOG SESSION IN TOKEN ROUTE");
  console.log("session", session);

  const token = session?.token;

  if (token) {
    // return token;
    // console.log("INITIATE SIGN OUT TOKEN ROUTE POR JODER");
    // await signOut();

    console.log(
      ">>>> THIS IS THE TOKEN RETURNED IN TOKEN ROUTE",
      token.id_token
    );
    return NextResponse.json(token.id_token);
  } else {
    // console.log("INITIATE SIGN OUT TOKEN ROUTE");
    // await signOut();
    return NextResponse.json(null);
    // return NextResponse.json({ error: "No token" });
  }

  throw new Error("Not implemented — THIS WILL BLOW UP TOKEN ROUTE");
}
