import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await db.user.findMany({
      orderBy: {
        register_date: "desc",
      },
      select: {
        id: true,
        name: true,
        // email: true,
        image: true,
        // register_date: true,
      },
      where: {
        //     // id is not null
        // NOT: {
        //   // id: null,
        //   //   name: null || "",
        //   name: null || "",
        //   image: null || "",
        //   //   emailVerified: null,
        // },
        AND: [
          { name: { not: { equals: null } } },
          { name: { not: { equals: "" } } },
          { image: { not: { equals: null } } },
          { image: { not: { equals: "" } } },
        ],
      },
    });

    // Go through every users and modify name field to be only the first word
    // users.forEach((user) => {
    //   // validate if user's name is null

    //   if (user.name === null) {
    //     //   user.name = "Anonymous";
    //     throw new Error("User name is null");
    //   }

    //   user.name = user.name.split(" ")[0];
    // });

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return new NextResponse("Not found", { status: 404 });
  }
}
