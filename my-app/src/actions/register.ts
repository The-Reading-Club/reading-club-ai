"use server";

import * as z from "zod";

import { RegisterSchema } from "../schemas";

// What kind of black magic is this one?
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent!" };

  //   console.log(values);
};
