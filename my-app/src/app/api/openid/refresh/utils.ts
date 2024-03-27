import { getProviderAccountByUserId } from "@/data/provider-account";

export async function getRefreshToken(userOauthId: string) {
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

  return refreshToken;
}

export async function fetchNewTokenSetResponse(refreshToken: string) {
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

  return response;
}
