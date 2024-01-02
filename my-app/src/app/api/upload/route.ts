export async function POST(req: Request) {
  console.log("TESTING UPLOAD ROUTE");

  // Add 5 seconds delay for testing
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return new Response("WRONG WRONG WRONG", {
    status: 401,
  });
}
