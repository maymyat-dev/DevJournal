'use client'
import { Input } from "@/components/ui/input";
import { createPost } from "@/features/posts/actions/create-post";
import { useAction } from "next-safe-action/hooks";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import CardWrapper from "../../../components/card-wrapper";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";
import { postCreateSchema } from "../schemas/post-create-schema";

const CreatePostForm = () => {
  const { execute, isExecuting, hasSucceeded, hasErrored } = useAction(createPost);

  const form = useForm<z.infer<typeof postCreateSchema>>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  async function onSubmit(data: z.infer<typeof postCreateSchema>) {
    const { title, body } = data;
    await execute({title, body});
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset()
      toast.success('Post create successfully.')
    }
    if (hasErrored) {
      toast.error("Error deleting post")
    }
  },[form, hasSucceeded, hasErrored])

  return (
    <CardWrapper
      title="Create new post"
      description="This will be create a new post"
    >
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="post title"
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
                    placeholder="post description"
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button className="w-full mt-5" type="submit" disabled={isExecuting}> Create</Button>
      </form>
    </CardWrapper>
  );
};

export default CreatePostForm;
