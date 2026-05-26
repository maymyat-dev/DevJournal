"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signInSchema } from "../schemas";
import CardWrapper from "@/components/card-wrapper";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { signIn } from "../actions/signin";
import Link from "next/link";
import { loginPath, postsPath, resetPasswordPath } from "@/path";
import GithubOauthButton from "./github-oauth-button";
import { redirect, useRouter } from "next/navigation";

export function SignInForm() {
  const { execute, isExecuting, result } = useAction(signIn);
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof signInSchema>) {
    const { email, password } = data;
    execute({ email, password });
  }
  useEffect(() => {
    const data = result?.data;

    if (data?.success) {
      toast.success("Sign in successfully.");
      router.push("/")
      router.refresh();
    }
    if (data?.error) {
      toast.error(data.error);
    } 
  }, [result]);

  return (
    <CardWrapper title="Sign in" description="Sign in your account">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  id="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Link href={resetPasswordPath} className="text-xs text-right hover:underline font-semibold">
            Forgot Password?
          </Link>
        </FieldGroup>
        <Button className="w-full mt-5" disabled={isExecuting}>
          {isExecuting ? "Signing in..." : "Login"}
        </Button>
      </form>
      <GithubOauthButton/>
    </CardWrapper>
  );
}
