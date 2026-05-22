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
import { signInSchema } from "../schemas"
import CardWrapper from "@/components/card-wrapper"
import { Button } from "@/components/ui/button"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"
import { signIn } from "../actions/signin";

export function SignInForm() {
  const { execute, isExecuting, hasSucceeded, hasErrored } = useAction(signIn);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof signInSchema>) {
    const {  email, password } = data;
    execute({  email, password})
  }
  useEffect(() => {
   if(hasSucceeded) {
    toast.success("Sign up successfully.");
   }
   if(hasErrored) {
    toast.error("Error sign up.");
   }
  }, [form, hasSucceeded, hasErrored])
  
  return (
    <CardWrapper title="Update post" description="This will be update post.">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} >
          <FieldGroup>
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
                      
                      
          </FieldGroup>
        <Button className="w-full mt-5" disabled={isExecuting} >Login</Button>
        </form>
    </CardWrapper>
  )
}
