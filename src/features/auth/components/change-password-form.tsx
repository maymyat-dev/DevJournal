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
import { changePassword } from "../actions/change-password";
import { changePasswordSchema } from "../schemas/auth-change-password";
import { useSearchParams } from "next/navigation";

export function ChangePasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    throw new Error("token not found");
  }

  const { execute, isPending, hasSucceeded, hasErrored } =
    useAction(changePassword);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      token,
    },
  });

  function onSubmit(data: z.infer<typeof changePasswordSchema>) {
    const { newPassword, token } = data;
    execute({ newPassword, token });
  }
  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("your password change successfully.");
    }
    if (hasErrored) {
      toast.error("Error change password.");
    }
  }, [form, hasSucceeded, hasErrored]);

  return (
    <CardWrapper title="Change Password" description="Update your password">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">New Password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your new password"
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
          {isPending ? "Loading..." : "Submit"}
        </Button>
      </form>
    </CardWrapper>
  );
}
