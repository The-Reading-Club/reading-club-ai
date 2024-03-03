import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// https://nextjs.org/docs/app/building-your-application/caching
// https://vercel.com/docs/infrastructure/data-cache
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
// export const dynamic = "force-dynamic";

// https://chat.openai.com/c/a65f7b7b-c4b0-4012-b8d0-3867ec56d4e1

// 1 minute
export const revalidate = 60;

export async function GET() {
  try {
    // interestingly it doesnt complain anymore about null oauth ids

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
