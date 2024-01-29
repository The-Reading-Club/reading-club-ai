// // https://github.com/AntonioErdeljac/next13-ai-saas/blob/master/lib/api-limit.ts

// import { auth } from "@/auth";
// import { db } from "./db";
// import { MAX_API_FREE_COUNTS } from "@/constants";

// // Actually I don't like this approach

// // I prefer redis cache

// export const increaseApiLimit = async () => {
//   const session = await auth();
//   const user = session?.user;

//   if (!user || !user.id) {
//     console.log("api-limit.ts No user found in session");
//     return;
//   }

//   const userApiLimit = await db.userApiLimit.findUnique({
//     where: {
//       userId: user.id,
//     },
//   });

//   if (userApiLimit) {
//     await db.userApiLimit.update({
//       where: {
//         userId: user.id,
//       },
//       data: {
//         count: userApiLimit.count + 1,
//       },
//     });
//   } else {
//     await db.userApiLimit.create({
//       data: {
//         userId: user.id,
//         count: 1,
//       },
//     });
//   }
// };

// export const checkApiLimit = async () => {
//   const session = await auth();
//   const user = session?.user;

//   console.log({ session, user });

//   if (!user || !user.id) {
//     console.log("api-limit.ts No user found in session");
//     return;
//   }

//   const userApiLimit = await db.userApiLimit.findUnique({
//     where: {
//       userId: user.id,
//     },
//   });

//   if (!userApiLimit || userApiLimit.count < MAX_API_FREE_COUNTS) {
//     return true;
//   }

//   return false;
// };
