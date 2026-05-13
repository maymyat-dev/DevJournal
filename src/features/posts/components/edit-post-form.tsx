'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Post } from "../types/post";
import { updatePost } from "../actions/edit-posts";
import CardWrapper from "./card-wrapper";
import { postUpdateSchema } from "../schemas/post-update-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { useEffect } from "react";
import { toast } from "sonner";

type EditPostFormProps = {
    post: Post;
}

const EditPostForm = ({ post }: EditPostFormProps) => {
  const { execute, isExecuting, hasSucceeded } = useAction(updatePost)
 
  
  const form = useForm<z.infer<typeof postUpdateSchema>>({
    resolver: zodResolver(postUpdateSchema),
    defaultValues: {
      id: post.id as string,
      title: post.title,
      body: post.body,
    },
  })

  async function onSubmit(data: z.infer<typeof postUpdateSchema>) {
    const { id, title, body } = data;
    await execute({id, title, body})
   } 

  
  useEffect(() => {
    if (hasSucceeded) {
      toast.success('Post update successfully.')
    }
  },[hasSucceeded])

   
  return (
    <CardWrapper title="Update post" description="This will be update post.">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Bug Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="body"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="I'm having an issue with the login button on mobile."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
        </FieldGroup>
        <Button disabled={isExecuting}>Update</Button>
        </form>
    </CardWrapper>
  )
}

export default EditPostForm