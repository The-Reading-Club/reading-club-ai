import { ConvexHttpClient } from "convex/browser";
import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { ID_TOKEN_DECODED, decodeJWT } from "@/lib/utils";
import {
  fetchNewTokenSetResponse,
  getRefreshToken,
} from "../../openid/refresh/utils";

// https://docs.convex.dev/api/classes/browser.ConvexHttpClient
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const revalidate = 30;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const documentId = params.id;

    const session = (await auth()) as Session;
    const id_token = session?.token.id_token;

    // Verify if it's expired
    const decoded = decodeJWT(id_token) as ID_TOKEN_DECODED;
    // expiration date?

    let token = id_token;

    if (decoded.exp < Date.now() / 1000) {
      // Refresh token

      const refreshToken = await getRefreshToken(decoded.sub);

      if (!refreshToken) {
        return new NextResponse("no user", { status: 400 });
      }

      const newTokenSetResponse = await fetchNewTokenSetResponse(refreshToken);

      const newTokenSet = await newTokenSetResponse.json();

      token = newTokenSet.id_token;
    }

    // return new NextResponse(JSON.stringify(decoded), {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    convex.setAuth(token);

    const document = await convex.query(api.documents.getById, {
      documentId: documentId as Id<"documents">,
    });

    return new NextResponse(JSON.stringify(document), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Bad request", { status: 400 });
  }
}
