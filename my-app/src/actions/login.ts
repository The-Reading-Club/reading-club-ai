"use server";

import * as z from "zod";

import { LoginSchema } from "../schemas";

// What kind of black magic is this one?
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent!" };

  //   console.log(values);
};
