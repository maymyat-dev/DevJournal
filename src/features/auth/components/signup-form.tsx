"use client"

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signUpSchema } from "../schemas"
import CardWrapper from "@/components/card-wrapper"
import { Button } from "@/components/ui/button"
import { useAction } from "next-safe-action/hooks"
import { signUp } from "../actions/signup"
import { toast } from "sonner"
import GithubOauthButton from "./github-oauth-button";
import { redirect } from "next/navigation";
import { loginPath } from "@/path";

export function SignUpForm() {
  const { execute, isExecuting, result } = useAction(signUp);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data: z.infer<typeof signUpSchema>) {
    const { name, email, password, confirmPassword } = data;
    execute({ name, email, password, confirmPassword})
  }
  useEffect(() => {
    const data = result?.data;

    if (data?.success) {
      toast.success("Sign up successfully.");
      redirect (loginPath)
    } 
    if (data?.error) {
      toast.error(data.error);
    }
  }, [ result ]);
  
  return (
    <CardWrapper title="Create account" description="Register with email and password">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
                      <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Email
                  </FieldLabel>
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
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
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
                      <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type = "password"
                    id="confirmPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your confirmPassword"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
                      />
                      
                      
          </FieldGroup>
        <Button className="w-full mt-5" disabled={isExecuting} >Register</Button>
      </form>
      <GithubOauthButton/>
    </CardWrapper>
  )
}
