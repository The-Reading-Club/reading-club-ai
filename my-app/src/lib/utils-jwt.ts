import { readFileSync } from "fs";
import * as jwt from "jsonwebtoken";

interface Payload {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
}

// This function takes the payload and secret key to return a JWT
export function encodeToJWT(
  payload: Payload
  // \, secretKey: string
): string {
  const secretKey = getPrivateKey();

  // Ensure the secret key is provided
  if (!secretKey) {
    throw new Error("Secret key is required");
  }

  // Encoding the payload to JWT
  const token = jwt.sign(payload, secretKey, {
    algorithm: "RS256", // Specifying the algorithm (ensure this matches your requirements)
  });

  return token;
}

// Function to read the private key from a file
function getPrivateKey(): string {
  // https://vercel.com/guides/loading-static-file-nextjs-api-route
  return readFileSync(process.cwd() + "/src/lib/private_key.pem", "utf8");
}
