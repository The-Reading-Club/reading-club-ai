"use server";

import * as z from "zod";

import { RegisterSchema } from "../schemas";

import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

// What kind of black magic is this one?
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingAccount = await getUserByEmail(email);

  if (existingAccount) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      email: email,
      password: hashedPassword,
      hashed_password: hashedPassword,
    },
  });

  // TODO: Send email verification

  return { success: "Account created!" };

  //   console.log(values);
};
