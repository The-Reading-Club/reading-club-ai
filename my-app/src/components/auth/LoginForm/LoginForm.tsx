"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import React, { useState, useTransition } from "react";
import CardWrapper from "../CardWrapper";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form/FormError";
import FormSuccess from "@/components/form/FormSuccess";
import { login } from "@/actions/login";

import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? // ? "You already have an account with this email. Please login with your existing account and link your social account in your settings."
        "Email already in use with different provider!"
      : // : undefined;
        "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    console.log(values);
    startTransition(() => {
      login(values).then((data) => {
        // if (data === undefined) {
        //   setError("An error occurred");
        //   setSuccess("");
        //   return;
        // }

        if (data?.error) {
          setError(data.error);
        }

        // Not using field in login action right now
        // if (data.success) {
        //   setSuccess(data.success);
        // }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      {false && (
        <Form {...form}>
          <form
            //   onSubmit={form.handleSubmit(() => {
            // this actually works well too, interesting
            //     // onSubmit(form.getValues());
            //   })}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              className="w-full bg-accent2 font-semibold"
              disabled={isPending}
            >
              Login
            </Button>
          </form>
        </Form>
      )}
      <FormError
        message={error || urlError}
        // Just for now while I am not using the email / password form
        extraMarginHack
      />
    </CardWrapper>
  );
};

export default LoginForm;
