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
import CardWrapper from "@/components/card-wrapper";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { resetPassword } from "../actions/reset-password";
import { resetPasswordSchema } from "../schemas/auth-reset-password";

export function ResetPasswordForm() {
  const { execute, isPending, hasSucceeded, hasErrored } =
    useAction(resetPassword);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    const { email } = data;
    execute({ email });
  }
  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("Reset password email sent successfully.");
    }
    if (hasErrored) {
      toast.error("Error reset password.");
    }
  }, [form, hasSucceeded, hasErrored]);

  return (
    <CardWrapper
      title="Reset Password"
      description="Rest password using your email."
    >
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
        </FieldGroup>
        <Button className="w-full mt-5" disabled={isPending}>
          Reset Password
        </Button>
      </form>
    </CardWrapper>
  );
}
