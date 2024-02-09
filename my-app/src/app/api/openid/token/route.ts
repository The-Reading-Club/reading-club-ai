import { auth } from "@/auth";

export async function GET() {
  const session = auth();

  console.log("session", session);
  throw new Error("not implemented — THIS WILL BLOW UP TOKEN ROUTE");
}
